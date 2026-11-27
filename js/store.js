// Novum: per-user data store, date helpers and derived calculations.
// The server holds each account's data (encrypted); this keeps a cached copy per user
// on the device so the app opens instantly and works offline. See sync.js.

const LEGACY_KEY = 'novum.v1'; // pre-accounts data on this device
let KEY = null;                // 'novum.v1:<userId>' while someone is logged in
const DAY = 864e5;
const MONTH_DAYS = 365.25 / 12;

/* ---------- dates ---------- */
const pad = (n) => String(n).padStart(2, '0');
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseDay = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
// 'YYYY-MM-DDTHH:mm' parsed as local time (avoids older Safari quirks)
export const parseLocal = (s) => {
  const [d, t = '00:00'] = s.split('T');
  const [y, m, dd] = d.split('-').map(Number);
  const [hh, mm] = t.split(':').map(Number);
  return new Date(y, m - 1, dd, hh || 0, mm || 0);
};
export const toLocalInput = (date) => `${dayKey(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const daysBetween = (a, b) => Math.round((parseDay(dayKey(b)) - parseDay(dayKey(a))) / DAY);
export const weekStart = (d) => { const x = parseDay(dayKey(d)); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); };
export const fmtDate = (d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  (typeof d === 'string' ? parseDay(d) : d).toLocaleDateString('en-GB', opts);
export const money = (n, dp = 2) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp });
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/* ---------- default state ---------- */
export const DEFAULT_PREFS = { milestones: true, checkin: true, checkinAt: '21:00', habits: true, habitsAt: '18:00' };

export function defaultState() {
  return {
    version: 2,
    setupDone: false, // Day Zero finished
    profile: { dob: '', heightCm: null, weights: [] },
    // { id, kind, label, emoji, color, start: 'YYYY-MM-DDTHH:mm', monthly, best, resets }
    quits: [],
    checkins: {},
    goals: [],
    reasons: [],
    // { id, t, quitIds, triggers, beaten, secs }
    cravings: [],
    notifyPrefs: { ...DEFAULT_PREFS },
    createdAt: new Date().toISOString(),
    savedAt: 0,
  };
}

/* ---------- store ---------- */
let state = defaultState();
const subs = new Set();
const emit = (info = {}) => subs.forEach((f) => f(state, info));

export function migrate(s) {
  const d = defaultState();
  const quits = (s.quits || []).map((q) => ({ best: 0, resets: [], monthly: 0, ...q, kind: q.kind || q.id }));
  return {
    ...d, ...s,
    version: 2,
    profile: { ...d.profile, ...(s.profile || {}) },
    quits, checkins: s.checkins || {}, goals: s.goals || [],
    reasons: s.reasons || [], cravings: s.cravings || [],
    notifyPrefs: { ...DEFAULT_PREFS, ...(s.notifyPrefs || {}), ...pickPrefs(s.notify) },
  };
}
const pickPrefs = (n) => (n ? Object.fromEntries(Object.keys(DEFAULT_PREFS).filter((k) => k in n).map((k) => [k, n[k]])) : {});

function save() {
  if (!KEY) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Novum: save failed', e); }
}
export const getState = () => state;
export const subscribe = (fn) => { subs.add(fn); return () => subs.delete(fn); };

// Switch to a logged-in user's cached data
export function openUser(userId) {
  KEY = `novum.v1:${userId}`;
  let next = defaultState();
  try { const raw = localStorage.getItem(KEY); if (raw) next = migrate(JSON.parse(raw)); } catch (e) { console.warn('Novum: could not read saved data', e); }
  state = next;
  emit({ remote: true });
}
// Log out: forget this user's cached data on the device
export function closeUser({ wipe = true } = {}) {
  if (KEY && wipe) { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
  KEY = null;
  state = defaultState();
  emit({ remote: true });
}

// update(draft => { ...mutate... })
export function update(fn) {
  const draft = JSON.parse(JSON.stringify(state));
  fn(draft);
  draft.savedAt = Date.now();
  state = draft;
  save();
  emit({});
}
// Replace everything. remote=true means it came from the server (don't sync it back).
export function replaceState(next, { remote = false } = {}) {
  state = migrate(next);
  if (!remote) state.savedAt = Date.now();
  save();
  emit({ remote });
}

/* ---------- data from before accounts ---------- */
export function legacyState() {
  try { const raw = localStorage.getItem(LEGACY_KEY); return raw ? migrate(JSON.parse(raw)) : null; } catch { return null; }
}
export function clearLegacy() { try { localStorage.removeItem(LEGACY_KEY); } catch { /* ignore */ } }

export function exportJSON() {
  return JSON.stringify({ app: 'novum', exportedAt: new Date().toISOString(), data: state }, null, 2);
}
export function importJSON(text) {
  const obj = JSON.parse(text);
  const data = obj && obj.app === 'novum' ? obj.data : obj;
  if (!data || !Array.isArray(data.quits) || !data.profile) throw new Error('This file is not a Novum backup.');
  replaceState({ ...data, setupDone: true });
}

/* ---------- quits ---------- */
export const quitStart = (q) => parseLocal(q.start);
export const quitElapsed = (q, now = Date.now()) => Math.max(0, now - quitStart(q).getTime());
export const savedFor = (q, ms) => (q.monthly || 0) * (ms / DAY) / MONTH_DAYS;
export function splitDuration(ms) {
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
// Money saved by a quit inside a [from, to] window (ms timestamps)
// "I slipped": keep the best run, log the reset, start again from now
export function restartQuit(id) {
  update((d) => {
    const x = d.quits.find((y) => y.id === id);
    if (!x) return;
    x.best = Math.max(x.best || 0, quitElapsed(x));
    x.resets = [...(x.resets || []), { from: x.start, to: toLocalInput(new Date()) }];
    x.start = toLocalInput(new Date());
  });
}
export function savedInWindow(q, from, to, now = Date.now()) {
  const a = Math.max(from, quitStart(q).getTime());
  const b = Math.min(to, now);
  return b > a ? savedFor(q, b - a) : 0;
}

/* ---------- profile ---------- */
export const latestWeight = (p) => {
  const w = [...(p.weights || [])].sort((a, b) => a.date.localeCompare(b.date));
  return w.length ? w[w.length - 1].kg : null;
};
export function ageOf(p) {
  if (p.dob) {
    const b = parseDay(p.dob), n = new Date();
    let a = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--;
    return a;
  }
  return p.age ?? null; // older data stored age directly
}
export const bmi = (kg, cm) => (kg && cm ? kg / Math.pow(cm / 100, 2) : null);
export function bmiBand(v) {
  if (v == null) return { label: '—', tone: 'muted' };
  if (v < 18.5) return { label: 'Below healthy range', tone: 'warn' };
  if (v < 25) return { label: 'Healthy range', tone: 'good' };
  if (v < 30) return { label: 'Above healthy range', tone: 'warn' };
  return { label: 'Well above healthy range', tone: 'bad' };
}

/* ---------- goals ---------- */
export function goalWindow(g) {
  // "Until the end of 2027": counts from the day it was added (or 1 Jan 2027 if added later)
  if (g.period === '2027') {
    const ny = parseDay('2027-01-01');
    const from = g.start ? parseDay(g.start) : ny;
    return { start: from < ny ? from : ny, end: parseDay('2027-12-31') };
  }
  return { start: parseDay(g.start || dayKey()), end: parseDay(g.end || '2027-12-31') };
}
const inWindow = (k, w) => { const d = parseDay(k); return d >= w.start && d <= w.end; };

export function habitStreak(g, today = new Date()) {
  const ticks = new Set(g.ticks || []);
  const per = g.perWeek || 7;
  if (per >= 7) {
    let d = parseDay(dayKey(today));
    if (!ticks.has(dayKey(d))) d = addDays(d, -1);
    let n = 0;
    while (ticks.has(dayKey(d))) { n++; d = addDays(d, -1); }
    return { value: n, unit: n === 1 ? 'day' : 'days' };
  }
  const count = (ws) => { let c = 0; for (let i = 0; i < 7; i++) if (ticks.has(dayKey(addDays(ws, i)))) c++; return c; };
  let ws = weekStart(today);
  let n = count(ws) >= per ? 1 : 0;
  ws = addDays(ws, -7);
  while (count(ws) >= per) { n++; ws = addDays(ws, -7); }
  return { value: n, unit: n === 1 ? 'week' : 'weeks' };
}
export function bestDailyStreak(g) {
  const keys = [...new Set(g.ticks || [])].sort();
  let best = 0, run = 0, prev = null;
  for (const k of keys) {
    const d = parseDay(k);
    run = prev && daysBetween(prev, d) === 1 ? run + 1 : 1;
    best = Math.max(best, run); prev = d;
  }
  return best;
}
export function weekTicks(g, today = new Date()) {
  const ticks = new Set(g.ticks || []);
  const ws = weekStart(today);
  return Array.from({ length: 7 }, (_, i) => { const k = dayKey(addDays(ws, i)); return { key: k, done: ticks.has(k) }; });
}

// Returns { pct (0..1), current, target, label, sub }
export function goalProgress(g, s = state, now = Date.now()) {
  const w = goalWindow(g);
  const winEnd = w.end.getTime() + DAY - 1;
  const totalDays = daysBetween(w.start, w.end) + 1;
  const clamp = (x) => Math.max(0, Math.min(1, x));
  if (g.type === 'habit') {
    const per = g.perWeek || 7;
    const ticks = (g.ticks || []).filter((k) => inWindow(k, w)).length;
    const need = per >= 7 ? totalDays : Math.max(1, Math.round((totalDays / 7) * per));
    return { pct: clamp(ticks / need), current: ticks, target: need, label: `${ticks} / ${need}`, sub: per >= 7 ? 'days ticked' : `sessions · ${per}× a week` };
  }
  if (g.type === 'numeric') {
    let current;
    if (g.auto === 'money') {
      const qs = s.quits.filter((q) => !g.quitId || g.quitId === 'all' || q.id === g.quitId);
      current = qs.reduce((a, q) => a + savedInWindow(q, w.start.getTime(), winEnd, now), 0);
    } else if (g.auto === 'weight') {
      current = latestWeight(s.profile) ?? g.startValue ?? 0;
    } else if (g.mode === 'level') {
      const e = [...(g.entries || [])].sort((a, b) => a.date.localeCompare(b.date));
      current = e.length ? e[e.length - 1].value : (g.startValue ?? 0);
    } else {
      current = (g.entries || []).reduce((a, e) => a + Number(e.value || 0), 0);
    }
    const level = g.mode === 'level' || g.auto === 'weight';
    const start = level ? Number(g.startValue ?? 0) : 0;
    const target = Number(g.target || 0);
    const pct = target === start ? (current === target ? 1 : 0) : clamp((current - start) / (target - start));
    const fmt = (v) => (g.unit === '£' ? money(v, v >= 100 ? 0 : 2) : `${+Number(v).toFixed(1)}${g.unit ? ' ' + g.unit : ''}`);
    return { pct, current, target, label: `${fmt(current)} / ${fmt(target)}`, sub: level ? `from ${fmt(start)}` : 'so far' };
  }
  if (g.type === 'quit') {
    const q = s.quits.find((x) => x.id === g.quitId) || s.quits[0];
    if (!q) return { pct: 0, current: 0, target: totalDays, label: 'No counter', sub: 'add one in Profile' };
    const a = Math.max(w.start.getTime(), quitStart(q).getTime());
    const b = Math.min(winEnd, now);
    const days = b > a ? Math.floor((b - a) / DAY) : 0;
    return { pct: clamp(days / totalDays), current: days, target: totalDays, label: `${days} / ${totalDays} days`, sub: `${q.label}-free` };
  }
  // milestone
  return { pct: g.done ? 1 : 0, current: g.done ? 1 : 0, target: 1, label: g.done ? 'Done' : 'Not yet', sub: g.done && g.doneDate ? `on ${fmtDate(g.doneDate)}` : 'one-off' };
}

export const isGoalDone = (g, s) => goalProgress(g, s).pct >= 1;
// Goals whose window hasn't begun yet (e.g. "all of 2027" before 1 Jan)
export const goalStartsLater = (g, now = new Date()) => goalWindow(g).start > parseDay(dayKey(now));
