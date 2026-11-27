// Buddies: add friends by username, see each other's streaks (only if you choose to share),
// and send a quick cheer that arrives as a notification.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, Row, Toggle, toast, useNow, Skeleton } from './ui.js';
import * as S from './store.js';
import * as A from './api.js';
import { CHEER_KINDS } from './content.js';
import { Avatar, openPerson } from './profile.js';

const DAY = 864e5;

/* ---------- buddy list, shared across screens ---------- */
let data = { buddies: [], incoming: [], outgoing: [], sharing: false, loaded: false };
let loadedAt = 0;
const subs = new Set();
const emit = () => subs.forEach((f) => f(data));
export async function refreshBuddies() {
  try { data = { ...(await A.buddies()), loaded: true, error: '' }; loadedAt = Date.now(); }
  catch (e) { data = { ...data, loaded: data.loaded, error: e.offline ? 'You’re offline.' : 'Couldn’t load buddies right now.' }; }
  emit();
  return data;
}
export function useBuddies() {
  const [d, setD] = useState(data);
  useEffect(() => {
    subs.add(setD);
    if (Date.now() - loadedAt > 60e3) refreshBuddies();
    const onVis = () => { if (document.visibilityState === 'visible' && Date.now() - loadedAt > 30e3) refreshBuddies(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { subs.delete(setD); document.removeEventListener('visibilitychange', onVis); };
  }, []);
  return d;
}
export function resetBuddies() { data = { buddies: [], incoming: [], outgoing: [], sharing: false, loaded: false }; loadedAt = 0; emit(); }

/* ---------- what buddies can see of me ---------- */
// Only when "Share my streaks" is on: each quit's name, emoji, colour, start time and best run.
function myCard(s) {
  return {
    quits: s.quits.map((q) => ({ label: q.label, emoji: q.emoji, color: q.color, startMs: S.quitStart(q).getTime(), bestMs: q.best || 0 })),
    checkinStreak: S.checkinStreak(s),
  };
}
let unsubShare = null, shareTimer = null, lastShared = null;
export function startShareSync() {
  stopShareSync();
  const run = async () => {
    const s = S.getState();
    if (!A.getSession() || !navigator.onLine) return;
    const body = s.shareStreaks ? JSON.stringify(myCard(s)) : 'off';
    if (body === lastShared) return;
    try { await A.putShareCard(s.shareStreaks ? JSON.parse(body) : null); lastShared = body; } catch { /* try again on the next change */ }
  };
  unsubShare = S.subscribe(() => { clearTimeout(shareTimer); shareTimer = setTimeout(run, 2000); });
  shareTimer = setTimeout(run, 3000);
}
export function stopShareSync() { if (unsubShare) unsubShare(); unsubShare = null; clearTimeout(shareTimer); lastShared = null; }

/* ---------- small pieces ---------- */
const initial = (b) => (b.firstName || b.username || '?')[0].toUpperCase();
function streakLine(b, now) {
  if (!b.card) return 'Not sharing streaks';
  const q = b.card.quits || [];
  if (!q.length) return b.card.checkinStreak ? `✍️ ${b.card.checkinStreak}-day check-in streak` : 'Nothing tracked yet';
  return q.map((x) => {
    if (x.startMs > now) return `${x.emoji} quit day soon`;
    const d = Math.floor((now - x.startMs) / DAY);
    return `${x.emoji} ${d} day${d === 1 ? '' : 's'}`;
  }).join(' · ');
}
async function sendCheer(b, kind) {
  haptic(12);
  const c = CHEER_KINDS.find((x) => x.kind === kind) || CHEER_KINDS[0];
  try { await A.cheer(b.username, c.kind); toast(`Sent ${c.e} to ${b.firstName}`); } catch (e) { toast(e.message); }
}
async function respond(b, accept) {
  haptic();
  try { await A.buddyRespond(b.username, accept); toast(accept ? `You and ${b.firstName} are buddies 🤝` : 'Request declined'); } catch (e) { toast(e.message); }
  refreshBuddies();
}

/* ---------- Home section ---------- */
export function BuddiesSection() {
  const d = useBuddies();
  const now = useNow(60000);
  if (!d.loaded) return null;
  const none = !d.buddies.length && !d.incoming.length;
  return html`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Buddies</h2>${!none && html`<button class="link sm" onClick=${openBuddies}>See all</button>`}</div>
    ${d.incoming.map((b) => html`<div class="card buddy-req" key=${'in' + b.username}>
      <${Avatar} a=${b.avatar} name=${b.firstName} size=${36} />
      <span class="row-main"><span class="row-title">${b.firstName} wants to be buddies</span><span class="row-sub">@${b.username}</span></span>
      <button class="btn btn-tinted sm" onClick=${() => respond(b, true)}>Accept</button>
      <button class="icon-btn muted" aria-label="Decline" onClick=${() => respond(b, false)}>×</button>
    </div>`)}
    ${none ? html`<button class="card buddy-empty tap" onClick=${openBuddies}>
        <span class="buddy-e">🤝</span>
        <span class="row-main"><span class="row-title">Quit with a mate</span><span class="row-sub">Add friends by username, see each other’s streaks and send a cheer when it gets hard.</span></span>
        <span class="row-chev">${Icon.chevron()}</span>
      </button>`
    : d.buddies.length > 0 && html`<div class="card list">
        ${d.buddies.slice(0, 4).map((b) => html`<div class="row buddy-row" key=${b.username}>
          <button class="buddy-who" onClick=${() => openPerson(b.username)}>
            <${Avatar} a=${b.avatar} name=${b.firstName} size=${40} />
            <span class="row-main"><span class="row-title">${b.firstName}</span><span class="row-sub">${streakLine(b, now)}</span></span>
          </button>
          <button class="cheer-btn" aria-label=${`Send ${b.firstName} a cheer`} onClick=${() => sendCheer(b, 'keepgoing')}>💪</button>
        </div>`)}
      </div>`}
  </section>`;
}

/* ---------- full buddies sheet ---------- */
export function openBuddies() { openSheet((close) => html`<${Buddies} close=${close} />`, { tall: true }); }
function Buddies({ close }) {
  const d = useBuddies();
  const now = useNow(60000);
  const s = S.getState();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [sharing, setSharing] = useState(s.shareStreaks);
  const [shareMs, setShareMs] = useState(!!s.social?.shareMilestones);
  const setMs = (v) => { setShareMs(v); S.update((x) => { x.social = { ...x.social, shareMilestones: v }; }); toast(v ? 'Buddies will hear about your milestones' : 'Milestones stay private'); };
  const add = async () => {
    const u = name.trim().replace(/^@/, '');
    if (!u || busy) return;
    setBusy(true); setErr('');
    try {
      const r = await A.buddyRequest(u);
      haptic(15); setName('');
      toast(r.status === 'accepted' ? 'You’re buddies now 🤝' : `Request sent to @${u}`);
      refreshBuddies();
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const setShare = (v) => { setSharing(v); S.update((x) => { x.shareStreaks = v; }); toast(v ? 'Buddies can see your streaks' : 'Your streaks are hidden'); };
  const remove = async (b, pending) => {
    haptic();
    try { await A.buddyRemove(b.username); toast(pending ? 'Request cancelled' : `Removed ${b.firstName}`); } catch (e) { toast(e.message); }
    refreshBuddies();
  };
  return html`
    <${SheetBar} title="Buddies" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <${Group} footer="Buddies (and anyone who can see your profile) see each quit’s name, emoji and how long it’s been. Never your check-ins, notes, money or weight.">
        <div class="row">
          <span class="row-ic" style="background:#3B9BFF">👀</span>
          <span class="row-main"><span class="row-title">Share my streaks with buddies</span></span>
          <${Toggle} on=${sharing} label="Share my streaks" onChange=${setShare} />
        </div>
        <div class="row">
          <span class="row-ic" style="background:#FFD60A">🎉</span>
          <span class="row-main"><span class="row-title">Tell buddies about my milestones</span><span class="row-sub">“Ioan hit 1 month vaping-free” with a button to cheer</span></span>
          <${Toggle} on=${shareMs} label="Tell buddies about milestones" onChange=${setMs} />
        </div>
      <//>

      <${Group} header="Add a buddy" footer=${err ? html`<span class="err">${err}</span>` : `Ask your friend for their Novum username. Yours is @${A.getSession()?.user?.username || ''}.`}>
        <div class="entry-add plain">
          <input placeholder="@username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${name}
            onInput=${(e) => { setErr(''); setName(e.target.value); }} onKeyDown=${(e) => e.key === 'Enter' && add()} />
          <button class="btn btn-primary sm" disabled=${!name.trim() || busy} onClick=${add}>${busy ? '…' : 'Add'}</button>
        </div>
      <//>

      ${d.incoming.length > 0 && html`<${Group} header="Requests">
        ${d.incoming.map((b) => html`<div class="row" key=${b.username}>
          <${Avatar} a=${b.avatar} name=${b.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${b.firstName}</span><span class="row-sub">@${b.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${() => respond(b, true)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${() => respond(b, false)}>×</button>
        </div>`)}
      <//>`}

      ${d.buddies.length > 0 && html`<${Group} header="Your buddies" footer="Cheers arrive as a notification. You can send each buddy up to five a day.">
        ${d.buddies.map((b) => html`<div class="buddy-card" key=${b.username}>
          <div class="row">
            <button class="buddy-who" onClick=${() => openPerson(b.username)}>
              <${Avatar} a=${b.avatar} name=${b.firstName} size=${40} />
              <span class="row-main"><span class="row-title">${b.firstName}</span><span class="row-sub">@${b.username} · ${streakLine(b, now)}</span></span>
            </button>
            <button class="icon-btn muted" aria-label=${`Remove ${b.firstName}`} onClick=${() => remove(b)}>${Icon.trash()}</button>
          </div>
          ${b.card && b.card.quits.some((q) => q.bestMs > 0) && html`<p class="buddy-best">Best run: ${b.card.quits.filter((q) => q.bestMs > 0).map((q) => `${q.emoji} ${Math.floor(Math.max(q.bestMs, now - q.startMs) / DAY)} days`).join(' · ')}</p>`}
          <div class="cheers">${CHEER_KINDS.map((c) => html`<button class="cheer" onClick=${() => sendCheer(b, c.kind)}><span>${c.e}</span>${c.l}</button>`)}</div>
        </div>`)}
      <//>`}

      ${d.outgoing.length > 0 && html`<${Group} header="Waiting for them">
        ${d.outgoing.map((b) => html`<div class="row" key=${b.username}>
          <${Avatar} a=${b.avatar} name=${b.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${b.firstName}</span><span class="row-sub">@${b.username} · request sent</span></span>
          <button class="link sm" onClick=${() => remove(b, true)}>Cancel</button>
        </div>`)}
      <//>`}

      ${!d.loaded && !d.error && html`<${Skeleton} rows=${2} avatar />`}
      ${!d.loaded && d.error && html`<div class="act-empty"><b>${d.error}</b><button class="btn btn-tinted sm mt12" onClick=${() => refreshBuddies()}>Try again</button></div>`}
      ${d.loaded && !d.buddies.length && !d.incoming.length && !d.outgoing.length && html`<p class="muted center sheet-intro">No buddies yet. Quitting is easier with someone in your corner.</p>`}
    </div>`;
}
