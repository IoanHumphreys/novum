// Keeps the device's cached copy and the server's encrypted copy of a user's data in step.
// Rules: pull on open / when the app comes back to the foreground; push a couple of seconds
// after any local change. If both changed, the most recently edited copy wins.
import * as S from './store.js';
import { call, getSession } from './api.js';

const metaKey = (uid) => `novum.sync:${uid}`;
const listeners = new Set();
let status = { state: 'idle', at: 0, error: '' }; // idle | syncing | synced | offline | error
let uid = null, timer = null, running = false, again = false, unsub = null;

const readMeta = () => { try { return JSON.parse(localStorage.getItem(metaKey(uid))) || { version: 0, dirty: false }; } catch { return { version: 0, dirty: false }; } };
const writeMeta = (m) => { try { localStorage.setItem(metaKey(uid), JSON.stringify(m)); } catch { /* ignore */ } };
const setStatus = (s) => { status = { ...status, ...s }; listeners.forEach((f) => f(status)); };
export const syncStatus = () => status;
export const onSyncStatus = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

async function push(meta) {
  const r = await call('PUT', '/data', { data: S.getState(), baseVersion: meta.version });
  writeMeta({ version: r.version, dirty: false });
}

// One full reconcile with the server
export async function syncNow() {
  if (!uid || !getSession()) return;
  if (running) { again = true; return; }
  running = true;
  setStatus({ state: 'syncing' });
  try {
    let meta = readMeta();
    const remote = await call('GET', '/data');
    if (remote.version > meta.version) {
      const local = S.getState();
      if (!meta.dirty || (remote.data?.savedAt || 0) >= (local.savedAt || 0)) {
        S.replaceState(remote.data, { remote: true });
        meta = { version: remote.version, dirty: false };
        writeMeta(meta);
      } else {
        // local edits are newer: overwrite the server copy
        meta = { version: remote.version, dirty: true };
        await push(meta);
      }
    } else if (meta.dirty || remote.version === 0) {
      await push({ ...meta, version: remote.version });
    }
    setStatus({ state: 'synced', at: Date.now(), error: '' });
  } catch (e) {
    if (e.status === 409) { again = true; }
    else setStatus({ state: e.offline ? 'offline' : 'error', error: e.message });
  } finally {
    running = false;
    if (again) { again = false; setTimeout(syncNow, 300); }
  }
}

const onVisible = () => { if (document.visibilityState === 'visible') syncNow(); };

export function startSync(userId) {
  stopSync();
  uid = userId;
  unsub = S.subscribe((_, info) => {
    if (info.remote) return;
    const m = readMeta(); if (!m.dirty) writeMeta({ ...m, dirty: true });
    clearTimeout(timer);
    timer = setTimeout(syncNow, 2000);
  });
  window.addEventListener('online', syncNow);
  document.addEventListener('visibilitychange', onVisible);
  return syncNow();
}
export function stopSync() {
  if (unsub) unsub();
  unsub = null;
  clearTimeout(timer);
  window.removeEventListener('online', syncNow);
  document.removeEventListener('visibilitychange', onVisible);
  uid = null;
  status = { state: 'idle', at: 0, error: '' };
}
// Push any pending changes now (used before logging out)
export async function flush() { clearTimeout(timer); if (uid && readMeta().dirty) await syncNow(); }
// Called when an account's data is wiped from this phone (log out with wipe, or account deleted).
// Also drops the saved activity feed (see activity.js).
export function forgetMeta(userId) { try { localStorage.removeItem(metaKey(userId)); localStorage.removeItem(`novum.activity.${userId}`); } catch { /* ignore */ } }
export const hasPending = () => uid ? readMeta().dirty : false;
