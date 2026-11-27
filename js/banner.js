// Profile banners: abstract gradients drawn entirely in CSS from { style, palette, seed }.
// No images or outside services, so every banner is original and there's nothing to moderate.
import { useState } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, Group } from './ui.js';

export const BANNER_STYLES = [
  { id: 'mesh', l: 'Mesh' }, { id: 'aurora', l: 'Aurora' }, { id: 'linear', l: 'Linear' },
  { id: 'radial', l: 'Radial' }, { id: 'conic', l: 'Conic' }, { id: 'stripes', l: 'Stripes' },
];
// Original colour sets (base, then accents)
export const PALETTES = {
  ocean: ['#0b2a5c', '#1e88e5', '#5ac8fa', '#a0e9ff'],
  sunset: ['#3b1c4a', '#ff5f6d', '#ffc371', '#ff9a8b'],
  aurora: ['#071a2e', '#00c9a7', '#845ef7', '#4dabf7'],
  ember: ['#2b0f0e', '#ff512f', '#f09819', '#dd2476'],
  forest: ['#0f2027', '#134e5e', '#71b280', '#a8e063'],
  berry: ['#2a0845', '#8e2de2', '#ff6a88', '#ffb199'],
  mint: ['#0d3b3b', '#11998e', '#38f9d7', '#c2ffd8'],
  dusk: ['#1c2541', '#4b6cb7', '#fd746c', '#ff9068'],
  candy: ['#6d5bd0', '#f9a8d4', '#a5b4fc', '#fde68a'],
  mono: ['#0b0f19', '#334155', '#94a3b8', '#e2e8f0'],
  neon: ['#0a0a1f', '#08f7fe', '#fe53bb', '#f5d300'],
};
const PALETTE_NAMES = { ocean: 'Ocean', sunset: 'Sunset', aurora: 'Aurora', ember: 'Ember', forest: 'Forest', berry: 'Berry', mint: 'Mint', dusk: 'Dusk', candy: 'Candy', mono: 'Mono', neon: 'Neon' };
export const DEFAULT_BANNER = { style: 'mesh', palette: 'ocean', seed: 'novum' };
const newSeed = () => Math.random().toString(36).slice(2, 8);

// The same seed always gives the same banner on every phone
function rng(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
const alpha = (hex, a) => `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

export function bannerCSS(b) {
  const { style, palette, seed } = b && PALETTES[b.palette] ? b : DEFAULT_BANNER;
  const [c0, c1, c2, c3] = PALETTES[palette];
  const r = rng(`${style}:${palette}:${seed}`);
  const pct = () => Math.round(r() * 100);
  const deg = () => Math.round(r() * 360);
  const pick = () => [c1, c2, c3][Math.floor(r() * 3)];
  switch (style) {
    case 'linear':
      return `linear-gradient(${deg()}deg, ${c0} 0%, ${c1} ${30 + pct() / 5}%, ${c2} ${65 + pct() / 5}%, ${c3} 100%)`;
    case 'radial':
      return `radial-gradient(circle at ${pct()}% ${pct()}%, ${c3} 0%, ${c2} 22%, ${c1} 48%, ${c0} 85%)`;
    case 'conic':
      return `conic-gradient(from ${deg()}deg at ${20 + pct() * 0.6}% ${20 + pct() * 0.6}%, ${c0}, ${c1}, ${c2}, ${c3}, ${c1}, ${c0})`;
    case 'aurora':
      return [0, 1, 2].map(() => `radial-gradient(ellipse ${60 + pct() * 0.6}% ${30 + pct() * 0.3}% at ${pct()}% ${pct()}%, ${alpha(pick(), 0.75)} 0%, transparent 70%)`).join(', ') + `, linear-gradient(180deg, ${c0}, #04060b)`;
    case 'stripes': {
      const a = deg(), w = 14 + Math.round(r() * 26);
      return `repeating-linear-gradient(${a}deg, rgba(255,255,255,0.10) 0 ${w}px, transparent ${w}px ${w * 2}px), linear-gradient(${a + 90}deg, ${c1}, ${c2} 60%, ${c3})`;
    }
    default: // mesh
      return [c1, c2, c3, pick()].map((c) => `radial-gradient(at ${pct()}% ${pct()}%, ${c} 0px, transparent 55%)`).join(', ') + `, ${c0}`;
  }
}

export function Banner({ b, className = '', children }) {
  return html`<div class="banner ${className}" style=${`background:${bannerCSS(b)}`}>${children}</div>`;
}

export function openBannerPicker(current, onPick) { openSheet((close) => html`<${BannerPicker} current=${current} onPick=${onPick} close=${close} />`, { tall: true }); }
function BannerPicker({ current, onPick, close }) {
  const start = current || { ...DEFAULT_BANNER, seed: newSeed() };
  const [style, setStyle] = useState(start.style);
  const [palette, setPalette] = useState(start.palette);
  const [seeds, setSeeds] = useState(() => [start.seed, ...Array.from({ length: 5 }, newSeed)]);
  const [seed, setSeed] = useState(start.seed);
  const chosen = { style, palette, seed };
  const shuffle = () => { haptic(); const next = Array.from({ length: 6 }, newSeed); setSeeds(next); setSeed(next[0]); };
  return html`
    <${SheetBar} title="Choose your banner" left=${html`<button class="link" onClick=${close}>Cancel</button>`}
      right=${html`<button class="link b" onClick=${() => { haptic(12); onPick(chosen); close(); }}>Done</button>`} />
    <div class="sheet-body">
      <${Banner} b=${chosen} className="bp-hero" />
      <div class="chip-row avp-styles">${BANNER_STYLES.map((x) => html`<button class="chip big ${style === x.id ? 'on' : ''}" onClick=${() => { haptic(); setStyle(x.id); }}>${x.l}</button>`)}</div>
      <div class="bp-grid">
        ${seeds.map((sd) => html`<button key=${style + palette + sd} class="bp-opt ${seed === sd ? 'on' : ''}" aria-label="Banner option" onClick=${() => { haptic(6); setSeed(sd); }}>
          <${Banner} b=${{ style, palette, seed: sd }} /></button>`)}
      </div>
      <button class="btn btn-tinted block" onClick=${shuffle}>🎲 Shuffle</button>
      <${Group} header="Colours">
        <div class="bp-pals">${Object.keys(PALETTES).map((p) => html`<button key=${p} class="bp-pal ${palette === p ? 'on' : ''}" onClick=${() => { haptic(); setPalette(p); }}>
          <i style=${`background:linear-gradient(135deg, ${PALETTES[p][1]}, ${PALETTES[p][2]} 55%, ${PALETTES[p][3]})`}></i><span>${PALETTE_NAMES[p]}</span></button>`)}</div>
      <//>
      <p class="muted center tiny">Banners are drawn by Novum itself, so every one is original.</p>
    </div>`;
}
