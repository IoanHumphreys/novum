// Talks to the Novum server: accounts and authenticated requests.
import { PUSH } from './config.js';

const SESSION_KEY = 'novum.session';
const listeners = new Set();

export const serverURL = () => PUSH.server.replace(/\/$/, '');

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}
export function setSession(s) {
  try { s ? localStorage.setItem(SESSION_KEY, JSON.stringify(s)) : localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  listeners.forEach((f) => f(s));
}
export const onSession = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

export async function call(method, path, body) {
  const s = getSession();
  let res;
  try {
    res = await fetch(serverURL() + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(s?.token ? { Authorization: `Bearer ${s.token}` } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const e = new Error('Can’t reach Novum. Check your connection and try again.');
    e.offline = true;
    throw e;
  }
  let data = {};
  try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) {
    const e = new Error(data.error || `Something went wrong (${res.status}).`);
    e.status = res.status; e.data = data;
    // Session revoked or expired: sign out locally (only for authenticated calls)
    if (res.status === 401 && s?.token && !path.startsWith('/auth/')) setSession(null);
    throw e;
  }
  return data;
}

export async function signup(fields) {
  const r = await call('POST', '/auth/signup', { ...fields, device: deviceLabel() });
  setSession({ token: r.token, user: r.user });
  return r.user;
}
// { username: true/false, email: true/false } — true means free to use
export const checkAvailable = (fields) => call('POST', '/auth/available', fields);
// Email codes. sendEmailCode → { ok } or { skipped: true } when the server has email turned off
export const sendEmailCode = (email, firstName, turnstile) => call('POST', '/auth/email-code', { email, firstName, turnstile });
export const verifyEmailCode = (email, code) => call('POST', '/auth/email-verify', { email, code });
export const requestReset = (email) => call('POST', '/auth/reset-request', { email });
export async function resetPassword(email, code, password) {
  const r = await call('POST', '/auth/reset', { email, code, password, device: deviceLabel() });
  setSession({ token: r.token, user: r.user });
  return r.user;
}
// Step 1: password. Returns { codeRequired, ticket, emailHint } when the server wants an email code.
export async function login(loginId, password, turnstile = '') {
  // Devices you chose to remember skip the email code (the password is still checked).
  // turnstile: the bot check token, which the server asks for after a few attempts
  const r = await call('POST', '/auth/login', { login: loginId, password, device: deviceLabel(), trust: trustTokens(), ...(turnstile ? { turnstile } : {}) });
  if (r.codeRequired) return r;
  setSession({ token: r.token, user: r.user });
  return r;
}
// Step 2: the 6-digit code from the email
export async function loginCode(ticket, code, remember = false) {
  const r = await call('POST', '/auth/login-code', { ticket, code, remember, device: deviceLabel() });
  if (r.deviceToken) setTrust(r.user.id, r.deviceToken);
  setSession({ token: r.token, user: r.user });
  return r.user;
}
export const loginResend = (ticket) => call('POST', '/auth/login-resend', { ticket });
export async function logout() {
  try { await call('POST', '/auth/logout'); } catch { /* offline: token expires on its own */ }
  setSession(null);
}
export async function refreshMe() {
  const r = await call('GET', '/me');
  const s = getSession();
  if (s) setSession({ ...s, user: r.user });
  return r.user;
}
export async function updateMe(fields) {
  const r = await call('PATCH', '/me', fields);
  const s = getSession();
  if (s) setSession({ ...s, user: r.user });
  return r.user;
}
export const changePassword = (current, next) => call('POST', '/me/password', { current, next });
// Delete: password → code emailed (unless email is off on the server) → delete
export const deleteCode = (password) => call('POST', '/me/delete-code', { password });
export const deleteAccount = (password, code) => call('DELETE', '/me', { password, code });

/* ---------- this device ---------- */
// A friendly name for the logged-in devices list, e.g. "iPhone · Home Screen app"
export function deviceLabel() {
  const ua = navigator.userAgent;
  const ipad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const kind = ipad ? 'iPad' : /iPhone|iPod/.test(ua) ? 'iPhone' : /Android/.test(ua) ? 'Android phone' : /Mac/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows PC' : 'Computer';
  const app = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const browser = /CriOS|Chrome/.test(ua) && !/Edg/.test(ua) ? 'Chrome' : /FxiOS|Firefox/.test(ua) ? 'Firefox' : /EdgiOS|Edg/.test(ua) ? 'Edge' : /Safari/.test(ua) ? 'Safari' : 'Browser';
  return `${kind} · ${app ? 'Home Screen app' : browser}`;
}
// "Remember this device": one token per account, kept only on this device
const TRUST_KEY = 'novum.trust';
const readTrust = () => { try { return JSON.parse(localStorage.getItem(TRUST_KEY)) || {}; } catch { return {}; } };
export const trustTokens = () => Object.values(readTrust()).filter(Boolean).slice(0, 5);
export const myTrustToken = (userId) => readTrust()[userId] || '';
export function setTrust(userId, token) {
  const t = readTrust();
  if (token) t[userId] = token; else delete t[userId];
  try { localStorage.setItem(TRUST_KEY, JSON.stringify(t)); } catch { /* ignore */ }
}

/* ---------- logged-in devices ---------- */
export const sessions = () => call('GET', '/me/sessions');
export const endSession = (id) => call('POST', '/me/sessions/end', { id });
export const endOtherSessions = () => call('POST', '/me/sessions/end-others', { keepTrust: myTrustToken(getSession()?.user?.id) });

/* ---------- buddies ---------- */
export const buddies = () => call('GET', '/buddies');
export const buddyRequest = (username) => call('POST', '/buddies/request', { username });
export const buddyRespond = (username, accept) => call('POST', '/buddies/respond', { username, accept });
export const buddyRemove = (username) => call('POST', '/buddies/remove', { username });
// Cheers sent with no signal wait on the phone (per account) and go out by themselves once it's back online,
// when Novum opens, or when you come back to it. Kept for a day, at most 20.
const outboxKey = () => `novum.outbox:${getSession()?.user?.id || 'anon'}`;
function readOutbox() { try { return JSON.parse(localStorage.getItem(outboxKey())) || []; } catch { return []; } }
function writeOutbox(q) { try { q.length ? localStorage.setItem(outboxKey(), JSON.stringify(q)) : localStorage.removeItem(outboxKey()); } catch { /* storage full */ } }
export async function cheer(username, kind) {
  try { return await call('POST', '/buddies/cheer', { username, kind }); } catch (e) {
    if (!e.offline || !getSession()) throw e;
    const q = readOutbox();
    if (q.length < 20) { q.push({ username, kind, at: Date.now() }); writeOutbox(q); }
    const queued = new Error('No signal right now. Your cheer will send by itself when you’re back online 💙');
    queued.queued = true;
    throw queued;
  }
}
let flushing = false;
export async function flushOutbox() {
  if (flushing || !getSession() || !navigator.onLine) return;
  flushing = true;
  try {
    let q = readOutbox().filter((x) => Date.now() - x.at < 864e5);
    while (q.length) {
      try { await call('POST', '/buddies/cheer', { username: q[0].username, kind: q[0].kind }); } catch (e) {
        if (e.offline) break; // still no signal: try again later
        // anything else (no longer buddies, cheer limit reached): drop it
      }
      q = q.slice(1); writeOutbox(q);
    }
    writeOutbox(q);
  } finally { flushing = false; }
}
addEventListener('online', () => flushOutbox());
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') flushOutbox(); });
setTimeout(() => flushOutbox(), 3000);
export const putShareCard = (card) => call('PUT', '/me/share', { card });

/* ---------- admin ---------- */
export const adminOverview = () => call('GET', '/admin/overview');
export const adminResetPassword = (userId) => call('POST', '/admin/reset-password', { userId });

export const authConfig = () => call('GET', '/auth/config');

/* ---------- profiles and people ---------- */
export const putProfile = (p) => call('PUT', '/me/profile', p);
export const people = (q = '') => call('GET', `/people${q ? `?q=${encodeURIComponent(q)}` : ''}`);
export const person = (username) => call('GET', `/people/${encodeURIComponent(username)}`);
export const follows = () => call('GET', '/follows');
export const follow = (username) => call('POST', '/follow', { username });
export const unfollow = (username) => call('POST', '/unfollow', { username });
export const followRespond = (username, accept) => call('POST', '/follow/respond', { username, accept });
export const removeFollower = (username) => call('POST', '/followers/remove', { username });
export const block = (username) => call('POST', '/block', { username });
export const unblock = (username) => call('POST', '/unblock', { username });
export const report = (username, reason, note) => call('POST', '/report', { username, reason, note });

/* ---------- activity, SOS, milestones, error reports ---------- */
export const activity = () => call('GET', '/activity');
export const activityRead = () => call('POST', '/activity/read', {});
// Clear one notification ({ id }) or all of them (no id)
// Today's status for buddies: 'strong' | 'okay' | 'tough' | 'distract', or null to clear
export const setStatus = (kind) => call('PUT', '/me/status', { kind });
export const activityClear = (id) => call('POST', '/activity/clear', id ? { id } : {});
export const sos = () => call('POST', '/sos', {});
export const shareMilestone = (m) => call('POST', '/milestone', m);
// Fire-and-forget: tells the admin page something broke in the app
export function reportError(place, message, detail) {
  try {
    fetch(serverURL() + '/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(getSession()?.token ? { Authorization: `Bearer ${getSession().token}` } : {}) },
      body: JSON.stringify({ place, message, detail }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* never throw from the error reporter */ }
}
