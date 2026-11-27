// Novum Wrapped's small parts: which year to show, the card on Progress, and the host that opens the story.
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
export function WrappedCard() {
  const { year, season } = wrappedYear();
  if (!season) return html`<button class="wr-peek" onClick=${() => { haptic(); openWrapped(); }}>✨ Peek at your ${year} Wrapped so far</button>`;
  return html`<button class="card wr-card tap" onClick=${() => { haptic(); openWrapped(); }}>
    <div class="wr-card-k">Novum Wrapped</div><div class="wr-card-y">${year}</div>
    <div class="wr-card-s">Your year in quitting, cravings beaten, money saved and the people who had your back.</div>
    <span class="btn btn-primary sm">Watch it</span>
  </button>`;
}
