// Web Push: subscribe this device and keep the server's copy of reminder settings in sync.
// The server only receives what it needs to time notifications: quit start times, reminder
// settings, today's check-in status and recent habit ticks. Notes and moods stay on the phone.
import { PUSH } from './config.js';
import * as S from './store.js';

export const pushConfigured = () => !!(PUSH.server && PUSH.vapidPublicKey);
export const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
export const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const permission = () => ('Notification' in window ? Notification.permission : 'unsupported');

const b64uToBytes = (s) => {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob((s + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function api(path, body) {
  const res = await fetch(PUSH.server.replace(/\/$/, '') + path, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Server said ${res.status}: ${await res.text()}`);
  return res.json().catch(() => ({}));
}

// What the server needs, nothing more
export function settingsPayload(s) {
  const n = s.notify;
  const since = S.dayKey(S.addDays(new Date(), -13));
  return {
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    name: s.profile.name,
    prefs: { milestones: n.milestones, checkin: n.checkin, checkinAt: n.checkinAt, habits: n.habits, habitsAt: n.habitsAt },
    quits: s.quits.map((q) => ({ id: q.id, label: q.label, emoji: q.emoji, startMs: S.quitStart(q).getTime(), monthly: q.monthly })),
    lastCheckin: Object.keys(s.checkins).filter((k) => s.checkins[k].mood).sort().pop() || null,
    habits: s.goals.filter((g) => g.type === 'habit').map((g) => ({
      name: g.name, emoji: g.emoji, perWeek: g.perWeek || 7, ticks: (g.ticks || []).filter((k) => k >= since),
    })),
  };
}

// Must be called from a tap (iOS only allows the permission prompt from a user gesture)
export async function enablePush() {
  if (!pushConfigured()) throw new Error('Notifications aren’t set up yet. Add the server address in js/config.js.');
  if (!pushSupported()) throw new Error(isIOS() && !isStandalone()
    ? 'On iPhone, open Novum from your home screen first, then turn notifications on.'
    : 'This browser doesn’t support push notifications.');
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Notifications are blocked. Turn them on in Settings → Notifications → Novum.');
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(PUSH.vapidPublicKey) });
  const s = S.getState();
  const deviceId = s.notify.deviceId || (crypto.randomUUID ? crypto.randomUUID() : S.uid() + S.uid());
  await api('/subscribe', { id: deviceId, subscription: sub.toJSON(), settings: settingsPayload(s) });
  S.update((d) => { d.notify.enabled = true; d.notify.deviceId = deviceId; });
  lastSent = JSON.stringify(settingsPayload(S.getState()));
}

export async function disablePush() {
  const s = S.getState();
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
  } catch { /* already gone */ }
  if (s.notify.deviceId && pushConfigured()) { try { await api('/unsubscribe', { id: s.notify.deviceId }); } catch { /* offline: server drops it on next failed send */ } }
  S.update((d) => { d.notify.enabled = false; });
}

export async function sendTest(delaySec = 0) {
  const s = S.getState();
  await api('/test', { id: s.notify.deviceId, delaySec });
}

// Debounced background sync whenever relevant data changes
let lastSent = '';
let timer;
export function startPushSync() {
  const run = async () => {
    const s = S.getState();
    if (!s.notify.enabled || !s.notify.deviceId || !pushConfigured() || !navigator.onLine) return;
    const body = JSON.stringify(settingsPayload(s));
    if (body === lastSent) return;
    try { await api('/sync', { id: s.notify.deviceId, settings: JSON.parse(body) }); lastSent = body; } catch (e) { console.warn('Novum push sync failed', e); }
  };
  S.subscribe(() => { clearTimeout(timer); timer = setTimeout(run, 1500); });
  window.addEventListener('online', run);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') run(); });
  run();
}
