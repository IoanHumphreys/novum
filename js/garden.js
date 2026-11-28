// Your recovery garden: a little world drawn from your own progress. Grass grows every day you stay quit,
// each craving beaten with SOS plants a flower, each milestone grows a tree, and £100 saved digs a pond.
// A slip doesn't destroy anything (it all uses your best run and lifetime totals). Buddies can visit it on
// your profile and water it, which arrives like a cheer.
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import * as A from './api.js';
import { html, haptic, openSheet, SheetBar, toast, Toggle } from './ui.js';
import { MILESTONES } from './content.js';

const DAY = 864e5;

// The numbers a garden is drawn from (also shared with buddies in your streak card)
export function gardenOf(s, now = Date.now()) {
  const best = Math.max(0, ...s.quits.map((q) => S.bestRun(q, now)));
  const cur = Math.max(0, ...s.quits.map((q) => S.quitElapsed(q, now)));
  const saved = s.quits.reduce((a, q) => a + S.lifetimeSaved(q, now), 0);
  return {
    days: Math.floor(cur / DAY),
    flowers: s.cravings.filter((c) => c.beaten).length,
    trees: MILESTONES.filter((m) => m.days >= 7 && best >= m.days * DAY).map((m) => m.days),
    pond: saved >= 100,
  };
}

// Small seeded random numbers, so a garden looks the same every time (and on a buddy's phone)
function rng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const PETALS = ['#FF6B9A', '#FFD60A', '#BF5AF2', '#FF9F0A', '#FFFFFF', '#5AC8FA', '#FF453A'];
const TREE = { 7: 0.55, 14: 0.65, 30: 0.8, 90: 0.95, 100: 1, 182: 1.15, 365: 1.35 };

export function Garden({ g, seed = 'novum', watered = false, height = 170 }) {
  const r = rng(seed);
  const W = 360, H = 180, ground = 118;
  const night = new Date().getHours() >= 20 || new Date().getHours() < 6;
  const grass = Math.min(90, Math.round(g.days * 1.6));
  const flowers = Math.min(70, g.flowers);
  // Fixed places so things don't overlap too badly
  const spots = Array.from({ length: 200 }, () => ({ x: 8 + r() * (W - 16), y: ground + 10 + r() * (H - ground - 16) })).sort((a, b) => a.y - b.y);
  // Each garden's colours get their own ids, so two on one screen don't borrow each other's
  const gid = `g${String(seed).replace(/W/g, '')}${watered ? 'w' : ''}${g.days ? 'd' : ''}${night ? 'n' : ''}`;
  const treeX = g.trees.map((_, i) => 30 + ((i + 0.5) / Math.max(1, g.trees.length)) * (W - 60) + (r() - 0.5) * 18);
  return html`<svg class="garden ${watered ? 'watered' : ''}" viewBox=${`0 0 ${W} ${H}`} width="100%" height=${height} preserveAspectRatio="xMidYMid slice" role="img"
    aria-label=${`A garden with ${g.trees.length} tree${g.trees.length === 1 ? '' : 's'}, ${flowers} flower${flowers === 1 ? '' : 's'}${g.pond ? ' and a pond' : ''}`}>
    <defs>
      <linearGradient id=${`${gid}s`} x1="0" y1="0" x2="0" y2="1">
        ${night ? html`<stop offset="0" stop-color="#0b1330" /><stop offset="1" stop-color="#1d2b55" />` : html`<stop offset="0" stop-color="#3a7bd5" /><stop offset="1" stop-color="#9ad0ec" />`}
      </linearGradient>
      <linearGradient id=${`${gid}g`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${watered ? '#2fae4f' : g.days ? '#3c9a4a' : '#7a5b3a'} /><stop offset="1" stop-color=${watered ? '#1d7a35' : g.days ? '#24692f' : '#4e3a26'} />
      </linearGradient>
    </defs>
    <rect width=${W} height=${H} fill=${`url(#${gid}s)`} />
    ${night ? html`<circle cx="300" cy="36" r="14" fill="#f4f1d0" /><circle cx="306" cy="32" r="13" fill="#1a2650" />
      ${Array.from({ length: 14 }, () => html`<circle cx=${r() * W} cy=${r() * 80} r=${0.6 + r()} fill="#fff" opacity=${0.4 + r() * 0.5} />`)}`
    : html`<circle cx="300" cy="38" r="18" fill="#ffe27a" /><circle cx="300" cy="38" r="26" fill="#ffe27a" opacity="0.25" />`}
    <path d=${`M0 ${ground - 18} Q 90 ${ground - 46} 180 ${ground - 22} T 360 ${ground - 26} V ${H} H 0 Z`} fill=${watered ? '#2c8a44' : g.days ? '#2f7d3d' : '#5d4630'} opacity="0.7" />
    ${g.trees.map((d, i) => {
      const s = TREE[d] || 1, x = treeX[i], base = ground - 4, h = 46 * s;
      return html`<g key=${'t' + d} class="g-tree">
        <rect x=${x - 3 * s} y=${base - h} width=${6 * s} height=${h} rx="2" fill="#6b4a2b" />
        <circle cx=${x} cy=${base - h} r=${18 * s} fill="#2e8b3e" /><circle cx=${x - 12 * s} cy=${base - h + 8 * s} r=${13 * s} fill="#37a04a" /><circle cx=${x + 12 * s} cy=${base - h + 6 * s} r=${14 * s} fill="#2a7f38" />
        ${d >= 365 && [0, 1, 2, 3, 4].map((k) => html`<circle cx=${x + (r() - 0.5) * 30 * s} cy=${base - h + (r() - 0.5) * 22 * s} r="2.6" fill="#ffb7d5" />`)}
        ${d >= 100 && d < 365 && [0, 1, 2].map(() => html`<circle cx=${x + (r() - 0.5) * 26 * s} cy=${base - h + (r() - 0.5) * 18 * s} r="2.4" fill="#ff5a5a" />`)}
      </g>`;
    })}
    <rect y=${ground} width=${W} height=${H - ground} fill=${`url(#${gid}g)`} />
    ${g.pond && html`<ellipse cx="70" cy=${ground + 34} rx="38" ry="11" fill="#4fb3e8" /><ellipse cx="62" cy=${ground + 31} rx="16" ry="3" fill="#bfe8ff" opacity="0.7" />`}
    ${Array.from({ length: grass }, (_, i) => { const p = spots[(i * 7) % spots.length]; const x = p.x + (r() - 0.5) * 6; return html`<path d=${`M${x} ${p.y} q ${-2 + r() * 4} -7 ${-3 + r() * 6} -${8 + r() * 6}`} stroke=${r() > 0.5 ? '#7fd36a' : '#59b54f'} stroke-width="1.4" fill="none" stroke-linecap="round" />`; })}
    ${Array.from({ length: flowers }, (_, i) => {
      const p = spots[(i * 13 + 5) % spots.length]; const c = PETALS[Math.floor(r() * PETALS.length)]; const y = p.y - 6;
      return html`<g key=${'f' + i} class="g-flower" style=${`animation-delay:${(i % 10) * 0.07}s`}>
        <path d=${`M${p.x} ${p.y} V ${y}`} stroke="#3f8f3a" stroke-width="1.2" />
        ${[0, 72, 144, 216, 288].map((a) => html`<circle cx=${p.x + Math.cos((a * Math.PI) / 180) * 2.6} cy=${y + Math.sin((a * Math.PI) / 180) * 2.6} r="2.1" fill=${c} />`)}
        <circle cx=${p.x} cy=${y} r="1.5" fill="#ffd60a" />
      </g>`;
    })}
    ${g.days === 0 && html`<g><path d=${`M180 ${ground + 22} q -1 -8 0 -14`} stroke="#5cc05a" stroke-width="2" fill="none" /><ellipse cx="175" cy=${ground + 8} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(-25 175 ${ground + 8})`} /><ellipse cx="185" cy=${ground + 9} rx="5" ry="2.6" fill="#6fd36a" transform=${`rotate(25 185 ${ground + 9})`} /></g>`}
    ${g.days >= 14 && !night && html`<g class="g-fly"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ffd60a" /></g>
      <g class="g-fly two"><path d="M0 0 c -4 -5 -9 -2 -6 2 c -3 4 2 6 6 -2 c 4 8 9 6 6 2 c 3 -4 -2 -7 -6 -2" fill="#ff9fcf" /></g>`}
    ${night && g.days >= 14 && Array.from({ length: 6 }, () => html`<circle class="g-firefly" cx=${20 + r() * (W - 40)} cy=${ground - 10 + r() * 40} r="1.6" fill="#fff6a0" style=${`animation-delay:${r() * 3}s`} />`)}
    ${watered && Array.from({ length: 8 }, () => html`<path class="g-drop" d=${`M${20 + r() * (W - 40)} ${10 + r() * 60} q -3 5 0 7 q 3 -2 0 -7`} fill="#9fd8ff" style=${`animation-delay:${r() * 1.5}s`} />`)}
  </svg>`;
}

const legend = (g) => [
  g.days ? `🌿 ${g.days} day${g.days === 1 ? '' : 's'} of growth` : '🌱 Just planted',
  `🌸 ${g.flowers} flower${g.flowers === 1 ? '' : 's'} = cravings beaten`,
  `🌳 ${g.trees.length} tree${g.trees.length === 1 ? '' : 's'} = milestones`,
  g.pond ? '💧 A pond, from £100 saved' : null,
].filter(Boolean);

/* ---------- your own garden (Profile) ---------- */
export function MyGarden({ s, waterers = [] }) {
  const g = gardenOf(s);
  const user = A.getSession()?.user || {};
  const shown = s.social?.showGarden !== false;
  return html`<button class="card garden-card tap" onClick=${() => openGarden(g, user.username, waterers)}>
    <${Garden} g=${g} seed=${user.username} watered=${waterers.length > 0} height=${150} />
    <div class="gc-foot"><b>Your garden <small class="gc-vis">${shown ? '🌍 On your profile' : '🔒 Hidden'}</small></b><span>${waterers.length ? `💧 Watered by ${waterers.slice(0, 2).join(' and ')}${waterers.length > 2 ? ` and ${waterers.length - 2} more` : ''}` : `${g.flowers} flower${g.flowers === 1 ? '' : 's'} · ${g.trees.length} tree${g.trees.length === 1 ? '' : 's'}`}</span></div>
  </button>`;
}
function openGarden(g, seed, waterers) {
  haptic();
  openSheet((close) => html`
    <${SheetBar} title="Your garden" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="card garden-big"><${Garden} g=${g} seed=${seed} watered=${waterers.length > 0} height=${240} /></div>
      <ul class="garden-legend">${legend(g).map((x) => html`<li key=${x}>${x}</li>`)}</ul>
      <${ShowToggle} />
      <p class="muted center tiny">It grows every day you stay quit. A slip doesn’t take anything away. Buddies can water it from your profile 💧</p>
    </div>`, { tall: true });
}

// Show or hide the garden on your profile (it's on by default, for anyone who opens your profile)
function ShowToggle() {
  const [on, setOn] = useState(S.getState().social?.showGarden !== false);
  const set = (v) => { setOn(v); S.update((d) => { d.social = { ...d.social, showGarden: v }; }); toast(v ? 'Your garden is on your profile 🌍' : 'Garden hidden from your profile'); };
  return html`<div class="card list"><div class="row">
    <span class="row-ic" style="background:#30D158">🌍</span>
    <span class="row-main"><span class="row-title">Show on my profile</span><span class="row-sub">Anyone who opens your profile can see it, even if it’s private: flowers for cravings beaten, trees for milestones.</span></span>
    <${Toggle} on=${on} label="Show my garden on my profile" onChange=${set} />
  </div></div>`;
}

/* ---------- someone's garden (their profile) ---------- */
export function BuddyGarden({ g, person }) {
  const [sent, setSent] = useState(false);
  if (!g) return null;
  const water = async () => {
    if (sent) return;
    haptic(15); setSent(true);
    try { await A.cheer(person.username, 'water'); toast(`💧 You watered ${person.firstName}’s garden`); } catch (e) { toast(e.message); if (!e.queued) setSent(false); }
  };
  return html`<section class="group">
    <h2 class="group-h">${person.firstName}’s garden</h2>
    <div class="card garden-card">
      <${Garden} g=${g} seed=${person.username} watered=${sent} height=${150} />
      <div class="gc-foot"><span>${legend(g).slice(1, 3).join(' · ')}</span>
        ${person.relation?.buddy && html`<button class="btn btn-tinted sm" disabled=${sent} onClick=${water}>${sent ? '💧 Watered' : '💧 Water it'}</button>`}</div>
    </div>
  </section>`;
}
