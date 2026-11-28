// Badges: earned from what's already in your data (time free, money saved, cravings beaten with SOS,
// check-in streaks, goals, reasons). Once earned they stay, even after a slip (time badges use your best run).
// Buddies see them on your profile when "Share my streaks" is on.
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, openSheet, SheetBar, toast } from './ui.js';

const DAY = 864e5;

export const BADGES = [
  { id: 'd1', e: '🌱', t: 'First day', d: '24 hours free', c: '#30D158', days: 1 },
  { id: 'd7', e: '📅', t: 'One week', d: '7 days free', c: '#30D158', days: 7 },
  { id: 'd30', e: '🗓️', t: 'One month', d: '30 days free', c: '#30D158', days: 30 },
  { id: 'd100', e: '💯', t: '100 days', d: '100 days free', c: '#FF453A', days: 100 },
  { id: 'd182', e: '🌗', t: 'Six months', d: 'Half a year free', c: '#BF5AF2', days: 182 },
  { id: 'd365', e: '🏆', t: 'One year', d: 'A full year free', c: '#FFD60A', days: 365 },
  { id: 'm50', e: '💷', t: '£50 saved', d: 'Money you didn’t spend', c: '#FFD60A', money: 50 },
  { id: 'm100', e: '🪙', t: '£100 saved', d: 'Money you didn’t spend', c: '#FFD60A', money: 100 },
  { id: 'm500', e: '💰', t: '£500 saved', d: 'Money you didn’t spend', c: '#FF9F0A', money: 500 },
  { id: 'm1000', e: '💎', t: '£1,000 saved', d: 'Money you didn’t spend', c: '#5AC8FA', money: 1000 },
  { id: 'sos1', e: '🫁', t: 'Rode it out', d: 'Beat a craving with SOS', c: '#5AC8FA', sos: 1 },
  { id: 'sos10', e: '🌊', t: 'Wave rider', d: 'Beat 10 cravings with SOS', c: '#3B9BFF', sos: 10 },
  { id: 'ci7', e: '✍️', t: 'Week of check-ins', d: 'Check in 7 days in a row', c: '#30D158', ci: 7 },
  { id: 'ci30', e: '📓', t: 'Month of check-ins', d: 'Check in 30 days in a row', c: '#BF5AF2', ci: 30 },
  { id: 'goal1', e: '🎯', t: 'Goal getter', d: 'Complete a goal', c: '#FF375F', goal: 1 },
  { id: 'why3', e: '💙', t: 'Know your why', d: 'Write 3 reasons for quitting', c: '#3B9BFF', reasons: 3 },
];
export const badgeById = (id) => BADGES.find((b) => b.id === id);

// The day a run of check-ins first reached n days (or null)
function checkinRunReached(s, n) {
  const days = Object.keys(s.checkins).filter((k) => s.checkins[k]?.mood).sort();
  let run = 0, prev = null;
  for (const k of days) {
    run = prev && S.daysBetween(S.parseDay(prev), S.parseDay(k)) === 1 ? run + 1 : 1;
    prev = k;
    if (run >= n) return S.parseDay(k).getTime();
  }
  return null;
}

// [{ id, at }] for every badge earned; `at` is when, where it can be worked out
export function earnedBadges(s, now = Date.now()) {
  const out = [];
  const best = Math.max(0, ...s.quits.map((q) => S.bestRun(q, now)));
  const saved = s.quits.reduce((a, q) => a + S.lifetimeSaved(q, now), 0);
  const beaten = s.cravings.filter((c) => c.beaten).sort((a, b) => a.t - b.t);
  for (const b of BADGES) {
    let ok = false, at = null;
    if (b.days) {
      ok = best >= b.days * DAY;
      // Earned during the current run: we know exactly when
      const cur = s.quits.filter((q) => S.quitElapsed(q, now) >= b.days * DAY).map((q) => S.quitStart(q).getTime() + b.days * DAY);
      if (cur.length) at = Math.min(...cur);
    } else if (b.money) ok = saved >= b.money;
    else if (b.sos) { ok = beaten.length >= b.sos; if (ok) at = beaten[b.sos - 1].t; }
    else if (b.ci) { at = checkinRunReached(s, b.ci); ok = at != null; }
    else if (b.goal) { const done = s.goals.filter((g) => S.isGoalDone(g, s)); ok = done.length >= b.goal; if (ok && done[0].doneDate) at = S.parseDay(done[0].doneDate).getTime(); }
    else if (b.reasons) ok = s.reasons.length >= b.reasons;
    if (ok) out.push({ id: b.id, at: at && at <= now ? at : null });
  }
  return out;
}

// What's left for a locked badge, in a few words
function progressText(b, s, now = Date.now()) {
  if (b.days) { const best = Math.max(0, ...s.quits.map((q) => S.bestRun(q, now))) / DAY; return `${Math.max(1, Math.ceil(b.days - best))} days to go`; }
  if (b.money) { const saved = s.quits.reduce((a, q) => a + S.lifetimeSaved(q, now), 0); return `${S.money(Math.max(0, b.money - saved), 0)} to go`; }
  if (b.sos) return `${b.sos - s.cravings.filter((c) => c.beaten).length} more to go`;
  if (b.ci) return `Current streak ${S.checkinStreak(s)} of ${b.ci}`;
  if (b.reasons) return `${s.reasons.length} of ${b.reasons} written`;
  return b.d;
}

// New badges since last time: a toast (checked with the milestones, every minute).
// The first run after this update marks what's already earned without a fuss.
export function checkNewBadges(now = Date.now()) {
  const s = S.getState();
  const ids = earnedBadges(s, now).map((x) => x.id);
  const seen = s.badgesSeen;
  if (!Array.isArray(seen)) { S.update((d) => { d.badgesSeen = ids; }); return; }
  const fresh = ids.filter((id) => !seen.includes(id));
  if (!fresh.length) return;
  S.update((d) => { d.badgesSeen = [...new Set([...(d.badgesSeen || []), ...fresh])]; });
  const b = badgeById(fresh[fresh.length - 1]);
  haptic(20);
  toast(`🏅 New badge: ${b.e} ${b.t}`);
}

const when = (t) => new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Microsoft Fluent Emoji 3D artwork (MIT licence), in icons/badges/<id>.webp
export function Medal({ b, size = 52, locked }) {
  return html`<span class="medal ${locked ? 'locked' : ''}" style=${`--c:${b.c};width:${size}px;height:${size}px`} aria-hidden="true">
    <img src=${`icons/badges/${b.id}.webp`} alt="" width=${Math.round(size * 0.74)} height=${Math.round(size * 0.74)} decoding="async" draggable="false" />
  </span>`;
}

// A row of earned badges. Your own profile can tap through to all of them; others' is read-only.
export function BadgeShelf({ earned, mine, s, name }) {
  const list = earned.map((x) => ({ ...x, b: badgeById(x.id) })).filter((x) => x.b);
  if (!mine && !list.length) return null;
  const open = () => { haptic(); mine ? openBadges() : openSheet((close) => html`<${TheirBadges} list=${list} name=${name} close=${close} />`, { tall: true }); };
  return html`<button class="card badge-shelf tap" onClick=${open}>
    <div class="bs-top"><span class="bs-h">Badges</span><span class="bs-n">${list.length} of ${BADGES.length} ›</span></div>
    ${list.length ? html`<div class="bs-row">${list.slice(-4).reverse().map((x) => html`<span class="bs-item" key=${x.id}><${Medal} b=${x.b} size=${46} /><small>${x.b.t}</small></span>`)}</div>`
    : html`<p class="bs-empty">Your first one is ${s && s.quits.length ? 'only a day away' : 'waiting'}. Badges for days free, money saved, cravings beaten and check-ins.</p>`}
  </button>`;
}

export function openBadges() { openSheet((close) => html`<${MyBadges} close=${close} />`, { tall: true }); }
function MyBadges({ close }) {
  const s = S.getState();
  const [now] = useState(Date.now());
  const earned = Object.fromEntries(earnedBadges(s, now).map((x) => [x.id, x]));
  const got = BADGES.filter((b) => earned[b.id]);
  const left = BADGES.filter((b) => !earned[b.id]);
  return html`
    <${SheetBar} title="Badges" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">${got.length} of ${BADGES.length} earned. Once you’ve earned one it stays, even after a slip.</p>
      ${got.length > 0 && html`<h3 class="act-gh">Earned</h3><div class="badge-grid">
        ${got.map((b) => html`<div class="bg-item" key=${b.id}><${Medal} b=${b} size=${60} /><b>${b.t}</b><small>${earned[b.id].at ? when(earned[b.id].at) : b.d}</small></div>`)}
      </div>`}
      ${left.length > 0 && html`<h3 class="act-gh">Still to earn</h3><div class="badge-grid">
        ${left.map((b) => html`<div class="bg-item" key=${b.id}><${Medal} b=${b} size=${60} locked /><b>${b.t}</b><small>${progressText(b, s, now)}</small></div>`)}
      </div>`}
    </div>`;
}
function TheirBadges({ list, name, close }) {
  return html`
    <${SheetBar} title=${`${name}’s badges`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body"><div class="badge-grid mt12">
      ${list.map((x) => html`<div class="bg-item" key=${x.id}><${Medal} b=${x.b} size=${60} /><b>${x.b.t}</b><small>${x.at ? when(x.at) : x.b.d}</small></div>`)}
    </div></div>`;
}
