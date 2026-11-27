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
  const r = await call('POST', '/auth/signup', fields);
  setSession({ token: r.token, user: r.user });
  return r.user;
}
export async function login(loginId, password) {
  const r = await call('POST', '/auth/login', { login: loginId, password });
  setSession({ token: r.token, user: r.user });
  return r.user;
}
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
export const deleteAccount = (password) => call('DELETE', '/me', { password });
