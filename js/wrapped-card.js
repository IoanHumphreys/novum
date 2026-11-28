// Novum Rewind's small parts (code name "wrapped"): which year to show, the card on Progress, and the host that opens the story.
// The story itself (slides, sharing images) is in wrapped.js and loads the first time it's opened.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, lazy } from './ui.js';

const Wrapped = lazy(() => import('./wrapped.js'), 'Wrapped', () => html`<div class="wr"><div class="wr-load">✨</div></div>`);

// Which year to show, and whether it's the proper end-of-year moment (December and January)
export function wrappedYear(now = new Date()) {
  if (now.getMonth() === 11) return { year: now.getFullYear(), season: true };
  if (now.getMonth() === 0) return { year: now.getFullYear() - 1, season: true };
  return { year: now.getFullYear(), season: false };
}

/* ---------- opening and closing the story ---------- */
let open = null;
const subs = new Set();
export function openWrapped() { open = { at: Date.now() }; subs.forEach((f) => f(open)); }
export const closeWrapped = () => { open = null; subs.forEach((f) => f(open)); };
export function WrappedHost() {
  const [o, setO] = useState(open);
  useEffect(() => { subs.add(setO); return () => subs.delete(setO); }, []);
  return o ? html`<${Wrapped} key=${o.at} />` : null;
}

/* ---------- Progress card ---------- */
// This year's numbers for the teaser card: days free (longest quit, counted from 1 Jan), cravings beaten
// with SOS and workouts. Without a quit, check-ins take the first slot.
function soFar(s, year, now = Date.now()) {
  const from = new Date(year, 0, 1).getTime();
  const inYear = (t) => t >= from && t <= now;
  const quits = s?.quits || [];
  const days = quits.length ? Math.max(0, ...quits.map((q) => Math.floor((now - Math.max(from, parseStart(q.start))) / 864e5))) : null;
  return [
    days != null ? { n: days, l: days === 1 ? 'day free' : 'days free' } : { n: Object.keys(s?.checkins || {}).filter((k) => k.startsWith(String(year))).length, l: 'check-ins' },
    { n: (s?.cravings || []).filter((c) => c.beaten && inYear(c.t)).length, l: 'cravings beaten' },
    { n: (s?.fitness?.workouts || []).filter((w) => inYear(w.start)).length, l: 'workouts' },
  ];
}
const parseStart = (v) => { const [d, t = '00:00'] = String(v || '').split('T'); const [y, m, dd] = d.split('-').map(Number); const [h, mi] = t.split(':').map(Number); return new Date(y, (m || 1) - 1, dd || 1, h || 0, mi || 0).getTime(); };

export function WrappedCard({ s }) {
  const { year, season } = wrappedYear();
  if (!season) {
    const stats = soFar(s, year);
    const opens = new Date(year, 11, 1);
    const left = Math.max(0, Math.ceil((opens - Date.now()) / 864e5));
    return html`<button class="card wr-tease tap" onClick=${() => { haptic(); openWrapped(); }}>
      <span class="wr-tease-glow" aria-hidden="true"></span>
      <div class="wr-tease-k">Novum Rewind · building</div>
      <div class="wr-tease-t">Your ${year} so far</div>
      <div class="wr-tease-n">${stats.map((x) => html`<div key=${x.l}><b>${x.n.toLocaleString('en-GB')}</b><span>${x.l}</span></div>`)}</div>
      <div class="wr-tease-f"><span>${left > 0 ? `Opens in ${left} day${left === 1 ? '' : 's'}` : 'Opens soon'}</span><span class="wr-tease-btn">Peek ›</span></div>
    </button>`;
  }
  return html`<button class="card wr-card tap" onClick=${() => { haptic(); openWrapped(); }}>
    <div class="wr-card-k">Novum Rewind</div><div class="wr-card-y">${year}</div>
    <div class="wr-card-s">Your year in quitting, cravings beaten, money saved and the people who had your back.</div>
    <span class="btn btn-primary sm">Watch it</span>
  </button>`;
}
