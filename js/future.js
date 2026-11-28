// Home cards: the tip of the day (picked for what you're quitting) and "Future you",
// a look ahead at the money and health you'll have gained in 6 months or a year if you keep going.
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, useNow, Segmented, openSheet, SheetBar } from './ui.js';
import { MILESTONES, healthFor, tipsFor, minutesFor } from './content.js';

const DAY = 864e5;

/* ---------- tip of the day ---------- */
// Same tip all day (it changes at midnight); "Another" shows the next one in the list.
export function TipCard({ s }) {
  const [off, setOff] = useState(0);
  const pool = tipsFor(s.quits);
  if (!pool.length) return null;
  const d = new Date();
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY);
  const tip = pool[(day * 7 + off) % pool.length];
  return html`<section class="group">
    <div class="card tip-card">
      <div class="tip-top"><span class="tip-k">${off ? 'Another tip' : 'Tip of the day'}</span>
        <button class="link sm tip-next" onClick=${() => { haptic(); setOff(off + 1); }} aria-label="Show another tip">Another ↻</button></div>
      <div class="tip-body" key=${tip.t}><span class="tip-e" aria-hidden="true">${tip.e}</span><p class="tip-t">${tip.t}</p></div>
    </div>
  </section>`;
}

/* ---------- future you ---------- */
const HORIZONS = [{ value: 182, label: '6 months' }, { value: 365, label: '1 year' }];

export function project(s, horizonDays, now = Date.now()) {
  const at = now + horizonDays * DAY;
  const savedNow = s.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0);
  const savedThen = s.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, at)), 0);
  const unlocks = [];
  const milestones = [];
  for (const q of s.quits) {
    const eNow = S.quitElapsed(q, now), eThen = S.quitElapsed(q, at);
    for (const x of healthFor(q) || []) if (x.h * 36e5 > eNow && x.h * 36e5 <= eThen) unlocks.push({ q, x });
    const m = MILESTONES.filter((m) => m.days * DAY > eNow && m.days * DAY <= eThen).pop();
    if (m) milestones.push({ q, m, days: Math.floor(eThen / DAY) });
  }
  const wishes = [...s.wishlist].sort((a, b) => a.price - b.price).filter((w) => w.price > savedNow && w.price <= savedThen);
  const days = Math.max(0, ...s.quits.map((q) => Math.floor(S.quitElapsed(q, at) / DAY)));
  return { at, savedNow, savedThen, gain: savedThen - savedNow, unlocks, milestones, wishes, days };
}

export function FutureYou({ s }) {
  const now = useNow(60000);
  const [h, setH] = useState(182);
  if (!s.quits.length) return null;
  const p = project(s, h, now);
  const date = new Date(p.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const show = p.unlocks.slice(-4);
  return html`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Future you</h2>
      <${Segmented} small options=${HORIZONS} value=${h} onChange=${setH} /></div>
    <div class="card fy-card">
      <p class="fy-when">On <b>${date}</b>, if you keep going:</p>
      <div class="fy-stats">
        ${p.savedThen > 0 && html`<div class="fy-stat"><span class="fy-k">💷 Saved</span><b>${S.money(p.savedThen, 0)}</b><small>+${S.money(p.gain, 0)} from today</small></div>`}
        <div class="fy-stat"><span class="fy-k">🗓️ Free for</span><b>${p.days} days</b><small>${p.milestones.length ? `${p.milestones[p.milestones.length - 1].m.label} badge earned` : 'and counting'}</small></div>
      </div>
      ${show.length > 0 && html`<div class="fy-list">
        <div class="fy-lh">What your body will have done</div>
        ${show.map(({ q, x }) => html`<div class="fy-row" key=${q.id + x.h}>
          <span class="fy-ic" style="background:${q.color}">${q.emoji}</span>
          <span class="fy-main"><b>${x.title}</b><span>${x.text}</span></span>
        </div>`)}
        ${p.unlocks.length > show.length && html`<div class="fy-more">and ${p.unlocks.length - show.length} more changes before that</div>`}
      </div>`}
      ${p.wishes.length > 0 && html`<div class="fy-wish">🎁 Enough for ${p.wishes[p.wishes.length - 1].emoji} <b>${p.wishes[p.wishes.length - 1].name}</b>${p.wishes.length > 1 ? ` and ${p.wishes.length - 1} more on your list` : ''}</div>`}
    </div>
    <p class="group-f">Based on what you used to spend. Health changes are typical timings, not medical advice.</p>
  </section>`;
}

/* ---------- time reclaimed ---------- */
// Hours you'd have spent on it, from each quit's "time it took a day" (a guess you can change in its settings)
export function reclaimed(s, now = Date.now()) {
  const mins = s.quits.reduce((a, q) => a + (S.quitElapsed(q, now) / DAY) * minutesFor(q), 0);
  const perDay = s.quits.filter((q) => S.quitStart(q).getTime() <= now).reduce((a, q) => a + minutesFor(q), 0);
  return { hours: mins / 60, perDay };
}
const hm = (m) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${Math.round(m % 60)}m` : ''}` : `${Math.round(m)} min`);
function compare(h) {
  if (h < 1) return 'Every minute counts. It adds up fast.';
  if (h < 8) return `That’s about ${Math.max(1, Math.round((h * 60) / 45))} episodes of a show.`;
  if (h < 60) return `That’s about ${Math.round(h / 2)} films, or ${Math.round(h / 1.5)} football matches.`;
  if (h < 300) return `That’s ${Math.round(h / 24)} full days, or ${Math.round(h / 8)} working days.`;
  return `That’s ${Math.round(h / 24)} full days of your life back.`;
}
export function TimeReclaimed({ s }) {
  const now = useNow(60000);
  const r = reclaimed(s, now);
  if (!s.quits.length || !r.perDay) return null;
  return html`<section class="group">
    <h2 class="group-h">Time reclaimed</h2>
    <button class="card time-card tap" onClick=${openTimeSheet}>
      <div class="tc-big"><span class="tc-ic" aria-hidden="true">⏳</span><b>${r.hours >= 10 ? Math.round(r.hours) : r.hours.toFixed(1)}</b><span>hours of your life back</span></div>
      <div class="tc-sub">About ${hm(r.perDay)} a day you’re not spending on it. ${compare(r.hours)}</div>
    </button>
  </section>`;
}
function openTimeSheet() { haptic(); openSheet((close) => html`<${TimeSheet} close=${close} />`); }
function TimeSheet({ close }) {
  const s = S.getState();
  const [vals, setVals] = useState(Object.fromEntries(s.quits.map((q) => [q.id, String(minutesFor(q))])));
  const save = () => {
    haptic(12);
    S.update((d) => { d.quits.forEach((q) => { const v = parseFloat(vals[q.id]); if (Number.isFinite(v) && v >= 0) q.minutes = Math.min(1440, v); }); });
    close();
  };
  return html`
    <${SheetBar} title="Time it took" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Roughly how many minutes a day did each one take? Buying, using, being away, recovering. A middle guess is fine.</p>
      <div class="card list">${s.quits.map((q) => html`<label class="field" key=${q.id}><span class="field-l">${q.emoji} ${q.label}</span>
        <span class="field-c"><input type="number" inputmode="numeric" min="0" max="1440" value=${vals[q.id]} onInput=${(e) => setVals({ ...vals, [q.id]: e.target.value })} /> min</span></label>`)}</div>
    </div>`;
}
