// Home cards: the tip of the day (picked for what you're quitting) and "Future you",
// a look ahead at the money and health you'll have gained in 6 months or a year if you keep going.
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, useNow, Segmented } from './ui.js';
import { MILESTONES, healthFor, tipsFor } from './content.js';

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
