// Web Push for the logged-in user on this device.
// Whether this phone receives notifications is a device setting (stored locally);
// reminder times are part of the user's synced data (state.notifyPrefs).
import { PUSH } from './config.js';
import { call, getSession } from './api.js';
import * as S from './store.js';

export const pushConfigured = () => !!(PUSH.server && PUSH.vapidPublicKey);
export const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
export const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const permission = () => ('Notification' in window ? Notification.permission : 'unsupported');
// What to tell someone when notifications won't switch on
export function blockedMessage(perm = permission()) {
  if (perm === 'default') return 'You didn’t choose Allow. Tap the switch again and pick Allow on the pop-up.';
  if (isIOS()) return 'Your iPhone is blocking notifications for this copy of Novum. Check Settings → Notifications → Novum (if there are two, it’s the newer one). If it’s already on, swipe Novum away in the app switcher and open it again. Still stuck? Delete Novum from your Home Screen, add it again, and choose Allow.';
  return 'Notifications are blocked. Allow them for novumdaily.com in your browser’s site settings, then try again.';
}

const devKey = () => `novum.push:${getSession()?.user?.id || 'anon'}`;
export function deviceState() {
  try { return JSON.parse(localStorage.getItem(devKey())) || { enabled: false, deviceId: '' }; } catch { return { enabled: false, deviceId: '' }; }
}
function setDevice(d) { try { localStorage.setItem(devKey(), JSON.stringify(d)); } catch { /* ignore */ } }
// Carry over a phone that had notifications on before accounts existed
export function adoptLegacyDevice(n) { if (n?.enabled && n.deviceId && !deviceState().enabled) setDevice({ enabled: true, deviceId: n.deviceId }); }

// navigator.serviceWorker.ready never settles if the worker failed to install, so give up after a few seconds
const swReady = (ms = 4000) => Promise.race([
  navigator.serviceWorker.ready,
  new Promise((_, no) => setTimeout(() => no(new Error('Novum’s offline helper isn’t running. Close Novum fully and open it again.')), ms)),
]);
const b64uToBytes = (s) => {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob((s + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36));

// Your usual tough times (weekday + hour with 3+ cravings or slips in the last 60 days), for the heads-up nudge
export function cravingPeaks(s, now = Date.now()) {
  const since = now - 60 * 864e5;
  const times = [...s.cravings.map((c) => c.t), ...s.quits.flatMap((q) => (q.resets || []).map((r) => S.parseLocal(r.to).getTime()))].filter((t) => t >= since);
  const n = {};
  times.forEach((t) => { const d = new Date(t); const k = `${(d.getDay() + 6) % 7}:${d.getHours()}`; n[k] = (n[k] || 0) + 1; });
  return Object.entries(n).filter(([, c]) => c >= 3).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([k]) => { const [wd, hour] = k.split(':').map(Number); return { wd, hour }; });
}

// Only what the server needs to time notifications
export function settingsPayload(s) {
  const since = S.dayKey(S.addDays(new Date(), -13));
  return {
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    name: getSession()?.user?.firstName || '',
    prefs: s.notifyPrefs,
    quits: s.quits.map((q) => ({ id: q.id, label: q.label, emoji: q.emoji, startMs: S.quitStart(q).getTime(), monthly: q.monthly })),
    lastCheckin: Object.keys(s.checkins).filter((k) => s.checkins[k].mood).sort().pop() || null,
    habits: s.goals.filter((g) => g.type === 'habit').map((g) => ({ id: g.id, name: g.name, emoji: g.emoji, perWeek: g.perWeek || 7, remindAt: g.remindAt || '', ticks: (g.ticks || []).filter((k) => k >= since) })),
    peaks: cravingPeaks(s),
    // For the Sunday recap: last 2 weeks of moods (m) and average craving (c), nothing else
    days: Object.fromEntries(Object.keys(s.checkins).filter((k) => k >= since).map((k) => {
      const c = s.checkins[k];
      const v = s.quits.map((q) => c[q.id]).filter((x) => typeof x === 'number');
      return [k, { m: c.mood || 0, c: v.length ? +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : null }];
    })),
  };
}

// Give up on a step that never answers, with a message saying what to do, instead of "Working…" forever
const within = (ms, p, message) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error(message)), ms))]);

async function register(deviceId) {
  const reg = await swReady();
  let sub = await reg.pushManager.getSubscription();
  // The phone asks Google's or Apple's push service for an address. Usually instant, but it can hang
  // (no signal, or Android without Google Play services)
  if (!sub) sub = await within(15000, reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(PUSH.vapidPublicKey) }),
    'Your phone’s notification service didn’t answer. Check your connection, then tap the switch again.');
  await within(15000, call('POST', '/subscribe', { id: deviceId, subscription: sub.toJSON(), settings: settingsPayload(S.getState()) }),
    'Novum’s server didn’t answer. Check your connection, then tap the switch again.');
  lastSent = JSON.stringify(settingsPayload(S.getState()));
}

// Must be called from a tap: iOS only shows the permission prompt after a user gesture
export async function enablePush() {
  if (!pushConfigured()) throw new Error('Notifications aren’t set up on the server yet.');
  if (!pushSupported()) throw new Error(isIOS() && !isStandalone()
    ? 'On iPhone, add Novum to your Home Screen and open it from there, then turn notifications on.'
    : 'This browser doesn’t support push notifications.');
  // Only ask when we don't already have permission (asking again can report "denied" on iPhone)
  let perm = permission();
  if (perm !== 'granted') perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error(blockedMessage(perm));
  const d = deviceState();
  const deviceId = d.deviceId || newId();
  try { await register(deviceId); } catch (e) {
    if (e?.name === 'NotAllowedError') throw new Error(blockedMessage('denied'));
    throw e;
  }
  setDevice({ enabled: true, deviceId });
}

export async function disablePush() {
  const d = deviceState();
  try { const reg = await swReady(); const sub = await reg.pushManager.getSubscription(); if (sub) await sub.unsubscribe(); } catch { /* already gone */ }
  if (d.deviceId) { try { await call('POST', '/unsubscribe', { id: d.deviceId }); } catch { /* offline */ } }
  setDevice({ enabled: false, deviceId: d.deviceId });
}

export const sendTest = (delaySec = 0) => call('POST', '/test', { id: deviceState().deviceId, delaySec });

// On every app open: make sure this phone is still registered (Apple can rotate subscriptions)
export async function ensurePush() {
  const d = deviceState();
  if (!d.enabled || !pushConfigured() || !pushSupported() || permission() !== 'granted' || !navigator.onLine) return;
  try { await register(d.deviceId || newId()); } catch (e) { console.warn('Novum: push re-register failed', e); }
}

// Keep the server's copy of reminder settings current
let lastSent = '';
let timer;
let unsub = null;
export function startPushSync() {
  stopPushSync();
  const run = async () => {
    const d = deviceState();
    if (!d.enabled || !d.deviceId || !pushConfigured() || !navigator.onLine || !getSession()) return;
    const body = JSON.stringify(settingsPayload(S.getState()));
    if (body === lastSent) return;
    try { await call('POST', '/sync', { id: d.deviceId, settings: JSON.parse(body) }); lastSent = body; }
    catch (e) { if (e.status === 404) ensurePush(); else console.warn('Novum: push sync failed', e); }
  };
  unsub = S.subscribe(() => { clearTimeout(timer); timer = setTimeout(run, 1500); });
  ensurePush();
}
export function stopPushSync() { if (unsub) unsub(); unsub = null; clearTimeout(timer); lastSent = ''; }
