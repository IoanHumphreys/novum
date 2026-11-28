// Activity feed: cheers, buddy and follow requests, new followers, SOS calls and buddy milestones,
// kept in the app so nothing is lost if you miss the notification. The 🔔 on Home opens it.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, toast, useNow, Skeleton, Segmented } from './ui.js';
import * as A from './api.js';
import { CHEER_KINDS } from './content.js';
import { CheerBar } from './cheers.js';
import { confirmSheet } from './shared.js';
import { Avatar, openPerson } from './profile.js';
import { refreshBuddies } from './social.js';

// The last feed that loaded is kept on the phone (per account), so it shows instantly on open,
// offline, or when the server can't be reached.
const cacheKey = () => { const id = A.getSession()?.user?.id; return id ? `novum.activity.${id}` : ''; };
function readCache() {
  try { const c = JSON.parse(localStorage.getItem(cacheKey()) || 'null'); return c && Array.isArray(c.items) ? c : null; } catch { return null; }
}
function writeCache(d) {
  try { if (cacheKey()) localStorage.setItem(cacheKey(), JSON.stringify({ items: d.items, unread: d.unread, at: Date.now() })); } catch { /* storage full: not important */ }
}
const fresh = () => { const c = readCache(); return c ? { items: c.items, unread: c.unread, loaded: true, cachedAt: c.at } : { items: [], unread: 0, loaded: false }; };

let data = fresh();
// Notifications cleared in the last few seconds (Undo still possible): hidden even if the feed refreshes
const pendingClear = new Set();
let loadedAt = 0;
let pending = null;
const subs = new Set();
const emit = () => subs.forEach((f) => f(data));
export function refreshActivity() {
  // One request at a time: the bell, the sheet and the timer can all ask at once
  if (pending) return pending;
  data = { ...data, refreshing: true }; emit();
  pending = (async () => {
    try {
      const got = await A.activity();
      const items = got.items.filter((x) => !pendingClear.has(x.id));
      data = { ...got, items, unread: items.filter((x) => !x.read).length, loaded: true, error: '' }; loadedAt = Date.now(); writeCache(data);
    }
    catch (e) { data = { ...data, loaded: true, error: e.offline ? 'You’re offline.' : 'Couldn’t load your activity right now.' }; }
    data = { ...data, refreshing: false };
    pending = null;
    emit();
    return data;
  })();
  return pending;
}
// Logged out: clear the screen (the saved feed stays, like the rest of the account's data on this phone)
export function resetActivity() { data = { items: [], unread: 0, loaded: false }; loadedAt = 0; seen = null; emit(); }
// After logging in as someone (else), show that account's saved feed
export function reloadActivityCache() { data = fresh(); loadedAt = 0; seen = null; emit(); }

// Checking for new activity: one shared timer while anything is showing it (the app shell always is),
// every 45 seconds while Novum is on screen, and straight away when you come back to it.
const POLL = 45e3;
let timer = null;
const onVis = () => { if (document.visibilityState === 'visible' && Date.now() - loadedAt > 5000) refreshActivity(); };
function startPolling() {
  if (timer) return;
  timer = setInterval(() => { if (document.visibilityState === 'visible') refreshActivity(); }, POLL);
  document.addEventListener('visibilitychange', onVis);
}
function stopPolling() { clearInterval(timer); timer = null; document.removeEventListener('visibilitychange', onVis); }
export function useActivity() {
  const [d, setD] = useState(data);
  useEffect(() => {
    subs.add(setD);
    startPolling();
    if (Date.now() - loadedAt > POLL) refreshActivity();
    return () => { subs.delete(setD); if (!subs.size) stopPolling(); };
  }, []);
  return d;
}

// Pop-up banner when something new arrives while Novum is open, on whichever screen you're on.
// Tapping it opens Activity. Things already in the feed when the app opened don't pop up.
let seen = null;
let sheetOpen = false;
export function ActivityPopup() {
  const d = useActivity();
  const [pop, setPop] = useState(null);
  useEffect(() => {
    if (!d.loaded || d.error) return;
    if (seen === null) { seen = new Set(d.items.map((x) => x.id)); return; }
    const fresh = d.items.filter((x) => !seen.has(x.id) && !x.read);
    d.items.forEach((x) => seen.add(x.id));
    if (fresh.length && !sheetOpen) { haptic(12); setPop({ x: fresh[0], more: fresh.length - 1, at: Date.now() }); }
  }, [d.items]);
  useEffect(() => {
    if (!pop) return undefined;
    const t = setTimeout(() => setPop(null), 6000);
    return () => clearTimeout(t);
  }, [pop]);
  if (!pop) return null;
  const { x, more } = pop;
  return html`<button class="act-pop" key=${pop.at} role="status" onClick=${() => { haptic(); setPop(null); openActivity(); }}>
    <${Avatar} a=${x.who.avatar} name=${x.who.firstName} size=${38} />
    <span class="act-pop-t">${words(x)}${more > 0 && html` <span class="muted">and ${more} more</span>`}</span>
    <span class="act-pop-x" aria-label="Dismiss" onClick=${(e) => { e.stopPropagation(); setPop(null); }}>✕</span>
  </button>`;
}

// The bell for the top of Home
export function ActivityBell() {
  const d = useActivity();
  return html`<button class="icon-btn bell" aria-label=${`Activity${d.unread ? `, ${d.unread} new` : ''}`} onClick=${openActivity}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    ${d.unread > 0 && html`<i class="bell-dot">${d.unread > 9 ? '9+' : d.unread}</i>`}
  </button>`;
}

const ago = (t, now) => {
  const m = Math.floor((now - t) / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 7 ? `${d}d ago` : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
const WATER = { kind: 'water', e: '💧', l: 'Watered your garden' };
const cheerOf = (x) => (x.data?.kind === 'water' ? WATER : CHEER_KINDS.find((c) => c.kind === x.data?.kind) || CHEER_KINDS[0]);
// The little badge on each avatar, and which filter each kind belongs to
const KIND = {
  cheer: { c: '#FF375F', f: 'cheers' },
  buddy_request: { e: '🤝', c: '#3B9BFF', f: 'requests' },
  buddy_accepted: { e: '🤝', c: '#30D158', f: 'requests' },
  follow: { e: '👤', c: '#BF5AF2', f: 'requests' },
  follow_request: { e: '👤', c: '#BF5AF2', f: 'requests' },
  follow_accepted: { e: '✓', c: '#30D158', f: 'requests' },
  sos: { e: '🫁', c: '#64D2FF', f: 'buddies' },
  milestone: { e: '🎉', c: '#FFD60A', f: 'buddies' },
};
const badgeOf = (x) => (x.kind === 'cheer' ? cheerOf(x).e : x.kind === 'milestone' && x.data?.emoji === '💷' ? '💷' : KIND[x.kind]?.e || '🔔');
function words(x) {
  const n = html`<b>${x.who.firstName}</b>`;
  switch (x.kind) {
    case 'cheer': { if (x.data?.kind === 'water') return html`${n} watered your garden 💧`; const k = cheerOf(x); return html`${n} sent you ${k.e} <i>${k.l.toLowerCase()}</i>`; }
    case 'buddy_request': return html`${n} wants to be buddies`;
    case 'buddy_accepted': return html`You and ${n} are now buddies`;
    case 'follow': return html`${n} started following you`;
    case 'follow_request': return html`${n} wants to follow you`;
    case 'follow_accepted': return html`${n} accepted your follow request`;
    case 'sos': return html`${n} was having a craving and asked for support`;
    case 'milestone': return html`${n} hit <b class="act-hl">${x.data.label}</b> ${x.data.quit}`;
    default: return html`${n}`;
  }
}
// "Amy", "Amy and Bob", "Amy, Bob and 2 others"
function names(items) {
  const seen = [...new Map(items.map((x) => [x.who.username, x.who.firstName])).values()];
  if (seen.length === 1) return html`<b>${seen[0]}</b>`;
  if (seen.length === 2) return html`<b>${seen[0]}</b> and <b>${seen[1]}</b>`;
  return html`<b>${seen[0]}</b>, <b>${seen[1]}</b> and ${seen.length - 2} other${seen.length === 3 ? '' : 's'}`;
}

// Today / Yesterday / This week / Earlier
function bucketOf(t, now) {
  const d0 = new Date(now); d0.setHours(0, 0, 0, 0);
  const start = d0.getTime();
  if (t >= start) return 'Today';
  if (t >= start - 864e5) return 'Yesterday';
  if (t >= start - 6 * 864e5) return 'This week';
  return 'Earlier';
}
// Within each day group, several cheers (or new followers) become one row, placed where the newest one was
const GROUPABLE = { cheer: 1, follow: 1 };
function buildGroups(items, now) {
  const out = [];
  for (const x of items) {
    const b = bucketOf(x.at, now);
    if (!out.length || out[out.length - 1].b !== b) out.push({ b, rows: [] });
    out[out.length - 1].rows.push(x);
  }
  for (const g of out) {
    const rows = [];
    const byKind = {};
    for (const x of g.rows) {
      if (GROUPABLE[x.kind] && g.rows.filter((y) => y.kind === x.kind).length >= 2) {
        if (!byKind[x.kind]) { byKind[x.kind] = { group: true, kind: x.kind, id: `g:${g.b}:${x.kind}`, items: [], at: x.at }; rows.push(byKind[x.kind]); }
        byKind[x.kind].items.push(x);
      } else rows.push(x);
    }
    g.rows = rows;
  }
  return out;
}

/* ---------- clearing (with Undo) and read / unread ---------- */
const recount = (items) => items.filter((x) => !x.read).length;
function setItems(items) { data = { ...data, items, unread: recount(items) }; writeCache(data); emit(); }
// Cleared items wait a few seconds before the server forgets them, so Undo can bring them back.
// While waiting they're hidden even if the feed refreshes.
const UNDO_MS = 4500;
function clearItems(ids, msg) {
  const gone = data.items.filter((i) => ids.includes(i.id));
  if (!gone.length) return;
  ids.forEach((id) => pendingClear.add(id));
  setItems(data.items.filter((i) => !ids.includes(i.id)));
  let undone = false;
  // Clearing everything: one request, and only for what was there when you tapped (not anything newer)
  const all = !data.items.length && ids.length > 1;
  const before = Math.max(...gone.map((i) => i.at));
  toast(msg, {
    ms: UNDO_MS,
    action: { label: 'Undo', onClick: () => { undone = true; ids.forEach((id) => pendingClear.delete(id)); setItems([...data.items, ...gone].sort((a, b) => b.at - a.at)); } },
  });
  setTimeout(async () => {
    if (undone) return;
    try { await (all ? A.activityClear(null, before) : Promise.all(ids.map((id) => A.activityClear(id)))); } catch (e) {
      ids.forEach((id) => pendingClear.delete(id));
      setItems([...data.items, ...gone].sort((a, b) => b.at - a.at));
      toast(e.offline ? 'You’re offline, so nothing was cleared.' : 'Couldn’t clear that. Try again.');
      return;
    }
    ids.forEach((id) => pendingClear.delete(id));
  }, UNDO_MS + 200);
}
function clearAll() {
  confirmSheet({
    title: 'Clear all notifications?',
    text: 'This empties Activity on all your devices. Buddy and follow requests still wait for you in Buddies and Profile.',
    confirm: 'Clear all',
    onConfirm: () => { haptic(15); clearItems(data.items.map((i) => i.id), 'All cleared'); },
  });
}
// Swipe right: read ↔ unread. Unread again puts it back on the app icon's count as a reminder.
async function toggleRead(ids) {
  const items = data.items.filter((i) => ids.includes(i.id));
  if (!items.length) return;
  const unread = items.every((i) => i.read);
  haptic(10);
  setItems(data.items.map((i) => (ids.includes(i.id) ? { ...i, read: !unread } : i)));
  try { await Promise.all(ids.map((id) => A.activityMark(id, unread))); } catch (e) {
    setItems(data.items.map((i) => (ids.includes(i.id) ? { ...i, read: unread } : i)));
    toast(e.offline ? 'You’re offline. Try again when you’re back.' : 'Couldn’t update that. Try again.');
  }
}

// Swipe left to clear (a long swipe clears straight away), swipe right to mark read or unread.
const OPEN = 88;
function Swipe({ onClear, onToggle, unread, children }) {
  const [x, setX] = useState(0);
  const [drag, setDrag] = useState(false);
  const [gone, setGone] = useState(false);
  const st = useRef(null);
  const pos = useRef(0);
  const set = (v) => { pos.current = v; setX(v); };
  const clear = () => { haptic(12); setGone(true); setTimeout(onClear, 260); };
  const toggle = () => { set(0); onToggle(); };
  const start = (e) => { const t = e.touches[0]; st.current = { x: t.clientX, y: t.clientY, base: pos.current, dir: null }; };
  const move = (e) => {
    const s = st.current; if (!s) return;
    const t = e.touches[0]; const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (!s.dir) { if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { s.dir = 'h'; setDrag(true); } else if (Math.abs(dy) > 8) s.dir = 'v'; }
    if (s.dir === 'h') set(Math.max(-220, Math.min(140, s.base + dx)));
  };
  const end = () => {
    const s = st.current; st.current = null; setDrag(false);
    if (!s || s.dir !== 'h') return;
    if (pos.current > 70) toggle();
    else if (pos.current < -160) clear();
    else set(pos.current < -OPEN / 2 ? -OPEN : 0);
  };
  return html`<div class="act-swipe ${gone ? 'gone' : ''} ${x < 0 || drag ? 'open' : ''} ${x > 0 ? 'right' : ''}">
    <span class="act-mark ${x > 70 ? 'go' : ''}" aria-hidden="true">${unread ? '✓ Read' : '● Unread'}</span>
    <button class="act-clear" tabindex=${x < 0 ? 0 : -1} aria-hidden=${x < 0 ? 'false' : 'true'} onClick=${clear}>Clear</button>
    <div class="act-slide ${drag ? 'drag' : ''}" style=${`transform:translateX(${gone ? -420 : x}px)`}
      onTouchStart=${start} onTouchMove=${move} onTouchEnd=${end} onTouchCancel=${end}
      onClickCapture=${(e) => { if (pos.current) { e.stopPropagation(); e.preventDefault(); set(0); } }}>
      ${children}
    </div>
  </div>`;
}

const FILTERS = [{ value: 'all', label: 'All' }, { value: 'cheers', label: 'Cheers' }, { value: 'requests', label: 'Requests' }, { value: 'buddies', label: 'Buddies' }];

export function openActivity() { openSheet((close) => html`<${Activity} close=${close} />`, { tall: true }); }
function Activity({ close }) {
  const d = useActivity();
  const now = useNow(60000);
  const [done, setDone] = useState({});
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState({});
  useEffect(() => { sheetOpen = true; return () => { sheetOpen = false; }; }, []);
  // Opening Activity clears the count on the app icon; the blue "new" dots stay until you swipe or leave
  useEffect(() => {
    refreshActivity().then((x) => { if (x.unread) A.activityRead().then(() => { data = { ...data, unread: 0 }; emit(); }).catch(() => {}); });
  }, []);
  const act = async (x, fn, msg) => {
    haptic(10);
    try { await fn(); setDone((o) => ({ ...o, [x.id]: msg })); toast(msg); refreshBuddies(); } catch (e) {
      toast(e.message);
      if (e.queued) setDone((o) => ({ ...o, [x.id]: 'Will send when you’re back online' }));
    }
  };
  const shown = d.items.filter((x) => filter === 'all' || KIND[x.kind]?.f === filter);
  const groups = buildGroups(shown, now);

  const actions = (x) => {
    if (done[x.id]) return html`<div class="act-done">✓ ${done[x.id]}</div>`;
    if (x.kind === 'sos' && x.who.buddy) {
      return html`<${CheerBar} who=${x.who} small class="act-cheers"
        onSent=${(c, queued) => setDone((o) => ({ ...o, [x.id]: queued ? 'Will send when you’re back online' : `Sent ${c.e} ${c.l.toLowerCase()}` }))} />`;
    }
    if (x.kind === 'cheer' && x.who.buddy) return html`<button class="act-chip" onClick=${() => act(x, () => A.cheer(x.who.username, 'heart'), `Sent 💙 back to ${x.who.firstName}`)}>💙 Send one back</button>`;
    if (x.kind === 'buddy_request') return html`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${() => act(x, () => A.buddyRespond(x.who.username, true), `You and ${x.who.firstName} are buddies`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${() => act(x, () => A.buddyRespond(x.who.username, false), 'Declined')}>Decline</button></div>`;
    if (x.kind === 'follow_request') return html`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${() => act(x, () => A.followRespond(x.who.username, true), `${x.who.firstName} can now see your profile`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${() => act(x, () => A.followRespond(x.who.username, false), 'Declined')}>Decline</button></div>`;
    return null;
  };

  // A normal notification
  const item = (x) => html`<div class="act-item ${x.read ? '' : 'new'} ${x.kind === 'sos' ? 'act-sos' : ''}">
    <button class="act-av" aria-label=${`Open ${x.who.firstName}’s profile`} onClick=${() => openPerson(x.who.username)}>
      <${Avatar} a=${x.who.avatar} name=${x.who.firstName} size=${44} />
      <i class="act-kind" style=${`background:${KIND[x.kind]?.c || '#3B9BFF'}`} aria-hidden="true">${badgeOf(x)}</i>
    </button>
    <div class="act-main">
      <div class="act-t">${words(x)}</div>
      <div class="act-when">${ago(x.at, now)}</div>
      ${actions(x)}
    </div>
    ${!x.read && html`<i class="act-dot" aria-label="New"></i>`}
  </div>`;

  // A buddy's milestone: a celebration card
  const milestone = (x) => {
    const money = x.data?.emoji === '💷';
    return html`<div class="act-ms-card ${money ? 'money' : ''} ${x.read ? '' : 'new'}">
      <span class="ms-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <div class="ms-top">
        <button class="act-av" aria-label=${`Open ${x.who.firstName}’s profile`} onClick=${() => openPerson(x.who.username)}><${Avatar} a=${x.who.avatar} name=${x.who.firstName} size=${36} /></button>
        <span class="ms-who"><b>${x.who.firstName}</b> hit a milestone · ${ago(x.at, now)}</span>
        ${!x.read && html`<i class="act-dot static" aria-label="New"></i>`}
      </div>
      <div class="ms-big">${money ? '💷' : '🎉'} ${x.data.label}</div>
      <div class="ms-sub">${x.data.quit}</div>
      ${done[x.id] ? html`<div class="act-done">✓ ${done[x.id]}</div>`
      : x.who.buddy && html`<${CheerBar} who=${x.who} small class="ms-cheers"
          onSent=${(c, queued) => setDone((o) => ({ ...o, [x.id]: queued ? 'Will send when you’re back online' : `Sent ${c.e} ${c.l.toLowerCase()}` }))} />`}
    </div>`;
  };

  // Several cheers or new followers: one row with stacked avatars; tap to see each one
  const group = (g) => {
    const isOpen = open[g.id];
    const unread = g.items.some((x) => !x.read);
    const kinds = [...new Set(g.items.map((x) => (g.kind === 'cheer' ? cheerOf(x).e : '👤')))].slice(0, 3).join('');
    return html`<div class="act-group-row">
      <button class="act-item act-stack ${unread ? 'new' : ''}" aria-expanded=${!!isOpen} onClick=${() => { haptic(); setOpen((o) => ({ ...o, [g.id]: !o[g.id] })); }}>
        <span class="stack-avs" aria-hidden="true">${[...new Map(g.items.map((x) => [x.who.username, x])).values()].slice(0, 3).map((x, i) => html`<span class="stack-av" key=${x.id} style=${`z-index:${3 - i}`}><${Avatar} a=${x.who.avatar} name=${x.who.firstName} size=${34} /></span>`)}</span>
        <span class="act-main">
          <span class="act-t">${names(g.items)} ${g.kind === 'cheer' ? html`sent you ${g.items.length} cheers ${kinds}` : html`started following you`}</span>
          <span class="act-when">${ago(g.items[0].at, now)} · ${isOpen ? 'Hide' : 'Show all'}</span>
        </span>
        ${unread && html`<i class="act-dot" aria-label="New"></i>`}
      </button>
      ${isOpen && html`<div class="stack-list">${g.items.map((x) => html`<${Swipe} key=${x.id} unread=${!x.read} onClear=${() => clearItems([x.id], 'Cleared')} onToggle=${() => toggleRead([x.id])}>${item(x)}<//>`)}</div>`}
    </div>`;
  };

  return html`
    <${SheetBar} title="Activity"
      left=${d.items.length > 0 ? html`<button class="link act-clear-all" onClick=${clearAll}>Clear all</button>` : null}
      right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body act-sheet">
      ${d.items.length > 0 && html`<div class="act-filter"><${Segmented} small options=${FILTERS} value=${filter} onChange=${setFilter} /></div>`}
      ${d.error && d.items.length > 0 && html`<div class="act-stale" role="status">
        <span>📡 ${d.error === 'You’re offline.' ? 'You’re offline.' : 'Couldn’t refresh.'} Showing your last update.</span>
        <button class="link sm" disabled=${d.refreshing} onClick=${() => { haptic(); refreshActivity(); }}>${d.refreshing ? 'Trying…' : 'Try again'}</button>
      </div>`}
      ${!d.loaded ? html`<${Skeleton} rows=${5} avatar />`
      : d.error && d.items.length === 0 ? html`<div class="act-empty"><div class="act-empty-ic">📡</div><b>${d.error}</b><p class="muted">Your cheers and requests are safe. They’ll show up once Novum can reach the server.</p><button class="btn btn-tinted sm mt12" disabled=${d.refreshing} onClick=${() => { haptic(); refreshActivity(); }}>${d.refreshing ? 'Trying…' : 'Try again'}</button></div>`
      : d.items.length === 0 ? html`<div class="act-empty"><div class="act-empty-ic">🔔</div><b>You’re all caught up</b><p class="muted">Cheers, requests and your buddies’ milestones will show up here.</p></div>`
      : shown.length === 0 ? html`<div class="act-empty sm"><b>Nothing here</b><p class="muted">No ${FILTERS.find((f) => f.value === filter).label.toLowerCase()} in the last 60 days.</p></div>`
      : groups.map((g) => html`<section class="act-group" key=${g.b}>
          <h3 class="act-gh">${g.b}</h3>
          <div class="act-card">
            ${g.rows.map((r) => r.group
              ? html`<${Swipe} key=${r.id} unread=${r.items.some((x) => !x.read)} onClear=${() => clearItems(r.items.map((x) => x.id), `Cleared ${r.items.length}`)} onToggle=${() => toggleRead(r.items.map((x) => x.id))}>${group(r)}<//>`
              : html`<${Swipe} key=${r.id} unread=${!r.read} onClear=${() => clearItems([r.id], 'Cleared')} onToggle=${() => toggleRead([r.id])}>${r.kind === 'milestone' ? milestone(r) : item(r)}<//>`)}
          </div>
        </section>`)}
      ${d.items.length > 0 && html`<p class="muted center tiny act-foot">Swipe left to clear, right to mark as read or unread. Kept for 60 days.</p>`}
    </div>`;
}
