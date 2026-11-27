// Activity feed: cheers, buddy and follow requests, new followers, SOS calls and buddy milestones,
// kept in the app so nothing is lost if you miss the notification. The 🔔 on Home opens it.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, Group, toast, useNow, Skeleton } from './ui.js';
import * as A from './api.js';
import { CHEER_KINDS } from './content.js';
import { Avatar, openPerson } from './profile.js';
import { refreshBuddies } from './social.js';

let data = { items: [], unread: 0, loaded: false };
let loadedAt = 0;
const subs = new Set();
const emit = () => subs.forEach((f) => f(data));
export async function refreshActivity() {
  try { data = { ...(await A.activity()), loaded: true }; loadedAt = Date.now(); emit(); } catch { /* offline: keep what we had */ }
  return data;
}
export function resetActivity() { data = { items: [], unread: 0, loaded: false }; loadedAt = 0; emit(); }
export function useActivity() {
  const [d, setD] = useState(data);
  useEffect(() => {
    subs.add(setD);
    if (Date.now() - loadedAt > 45e3) refreshActivity();
    const onVis = () => { if (document.visibilityState === 'visible') refreshActivity(); };
    document.addEventListener('visibilitychange', onVis);
    const t = setInterval(() => { if (document.visibilityState === 'visible') refreshActivity(); }, 90e3);
    return () => { subs.delete(setD); document.removeEventListener('visibilitychange', onVis); clearInterval(t); };
  }, []);
  return d;
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
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return d < 7 ? `${d}d` : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
function words(x) {
  const n = html`<b>${x.who.firstName}</b>`;
  switch (x.kind) {
    case 'cheer': { const k = CHEER_KINDS.find((c) => c.kind === x.data.kind) || CHEER_KINDS[0]; return html`${n} sent you ${k.e} <i>${k.l.toLowerCase()}</i>`; }
    case 'buddy_request': return html`${n} wants to be buddies`;
    case 'buddy_accepted': return html`You and ${n} are now buddies 🤝`;
    case 'follow': return html`${n} started following you`;
    case 'follow_request': return html`${n} wants to follow you`;
    case 'follow_accepted': return html`${n} accepted your follow request`;
    case 'sos': return html`💙 ${n} was having a craving and asked for support`;
    case 'milestone': return html`🎉 ${n} hit <b>${x.data.label}</b> ${x.data.quit}`;
    default: return html`${n}`;
  }
}

export function openActivity() { openSheet((close) => html`<${Activity} close=${close} />`, { tall: true }); }
function Activity({ close }) {
  const d = useActivity();
  const now = useNow(60000);
  const [done, setDone] = useState({});
  useEffect(() => {
    refreshActivity().then((x) => { if (x.unread) A.activityRead().then(() => { data = { ...data, unread: 0 }; emit(); }).catch(() => {}); });
  }, []);
  const act = async (x, fn, msg) => {
    haptic(10);
    try { await fn(); setDone({ ...done, [x.id]: msg }); toast(msg); refreshBuddies(); } catch (e) { toast(e.message); }
  };
  const cheerRow = (x) => html`<div class="act-cheers">${CHEER_KINDS.map((c) => html`<button class="cheer sm" onClick=${() => act(x, () => A.cheer(x.who.username, c.kind), `Sent ${c.e} to ${x.who.firstName}`)}><span>${c.e}</span>${c.l}</button>`)}</div>`;
  return html`
    <${SheetBar} title="Activity" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${!d.loaded ? html`<${Skeleton} rows=${5} avatar />`
      : d.items.length === 0 ? html`<div class="act-empty"><div class="wiz-emoji">🔔</div><b>Nothing yet</b><p class="muted">Cheers, requests and buddy milestones will show up here.</p></div>`
      : html`<${Group}>
        ${d.items.map((x) => html`<div class="act ${x.read ? '' : 'new'}" key=${x.id}>
          <button class="act-av" aria-label=${`Open ${x.who.firstName}’s profile`} onClick=${() => openPerson(x.who.username)}><${Avatar} a=${x.who.avatar} name=${x.who.firstName} size=${40} /></button>
          <div class="act-main">
            <div class="act-t">${words(x)} <span class="act-when">${ago(x.at, now)}</span></div>
            ${done[x.id] ? html`<div class="act-done">✓ ${done[x.id]}</div>`
            : (x.kind === 'sos' || x.kind === 'milestone') && x.who.buddy ? cheerRow(x)
            : x.kind === 'cheer' && x.who.buddy ? html`<button class="link sm" onClick=${() => act(x, () => A.cheer(x.who.username, 'heart'), `Sent 💙 back to ${x.who.firstName}`)}>Send 💙 back</button>`
            : x.kind === 'buddy_request' ? html`<div class="act-btns">
                <button class="btn btn-tinted sm" onClick=${() => act(x, () => A.buddyRespond(x.who.username, true), `You and ${x.who.firstName} are buddies`)}>Accept</button>
                <button class="btn btn-plain sm" onClick=${() => act(x, () => A.buddyRespond(x.who.username, false), 'Declined')}>Decline</button></div>`
            : x.kind === 'follow_request' ? html`<div class="act-btns">
                <button class="btn btn-tinted sm" onClick=${() => act(x, () => A.followRespond(x.who.username, true), `${x.who.firstName} can now see your profile`)}>Accept</button>
                <button class="btn btn-plain sm" onClick=${() => act(x, () => A.followRespond(x.who.username, false), 'Declined')}>Decline</button></div>`
            : null}
          </div>
        </div>`)}
      <//>`}
      <p class="muted center tiny">Kept for 60 days.</p>
    </div>`;
}
