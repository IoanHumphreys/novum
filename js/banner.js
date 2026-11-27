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

// A banner is a list of layers (top first). The same list draws the CSS banner and the canvas share card.
export function bannerLayers(b) {
  const { style, palette, seed } = b && PALETTES[b.palette] ? b : DEFAULT_BANNER;
  const [c0, c1, c2, c3] = PALETTES[palette];
  const r = rng(`${style}:${palette}:${seed}`);
  const pct = () => Math.round(r() * 100);
  const deg = () => Math.round(r() * 360);
  const pick = () => [c1, c2, c3][Math.floor(r() * 3)];
  switch (style) {
    case 'linear': {
      const a = deg(), p1 = 30 + pct() / 5, p2 = 65 + pct() / 5;
      return [{ t: 'linear', a, stops: [[c0, 0], [c1, p1], [c2, p2], [c3, 100]] }];
    }
    case 'radial': {
      const x = pct(), y = pct();
      return [{ t: 'radial', x, y, circle: true, stops: [[c3, 0], [c2, 22], [c1, 48], [c0, 85]] }];
    }
    case 'conic': {
      const from = deg(), x = 20 + pct() * 0.6, y = 20 + pct() * 0.6;
      return [{ t: 'conic', from, x, y, colors: [c0, c1, c2, c3, c1, c0] }];
    }
    case 'aurora': {
      const blobs = [0, 1, 2].map(() => ({ t: 'radial', w: 60 + pct() * 0.6, h: 30 + pct() * 0.3, x: pct(), y: pct(), stops: [[alpha(pick(), 0.75), 0], ['transparent', 70]] }));
      return [...blobs, { t: 'linear', a: 180, stops: [[c0, 0], ['#04060b', 100]] }];
    }
    case 'stripes': {
      const a = deg(), w = 14 + Math.round(r() * 26);
      return [{ t: 'stripes', a, w, color: 'rgba(255,255,255,0.10)' }, { t: 'linear', a: a + 90, stops: [[c1, 0], [c2, 60], [c3, 100]] }];
    }
    default: { // mesh
      const blobs = [c1, c2, c3, pick()].map((c) => ({ t: 'radial', x: pct(), y: pct(), stops: [[c, 0], ['transparent', 55]] }));
      return [...blobs, { t: 'solid', c: c0 }];
    }
  }
}

export function bannerCSS(b) {
  const st = (stops) => stops.map(([c, p]) => `${c} ${p}%`).join(', ');
  return bannerLayers(b).map((l) => {
    switch (l.t) {
      case 'solid': return l.c;
      case 'linear': return `linear-gradient(${l.a}deg, ${st(l.stops)})`;
      case 'radial': return `radial-gradient(${l.circle ? 'circle' : l.w ? `ellipse ${l.w}% ${l.h}%` : 'ellipse'} at ${l.x}% ${l.y}%, ${st(l.stops)})`;
      case 'conic': return `conic-gradient(from ${l.from}deg at ${l.x}% ${l.y}%, ${l.colors.join(', ')})`;
      case 'stripes': return `repeating-linear-gradient(${l.a}deg, ${l.color} 0 ${l.w}px, transparent ${l.w}px ${l.w * 2}px)`;
      default: return '';
    }
  }).join(', ');
}

// Paint the banner onto a canvas rectangle (for the share card). `scale` turns on-screen px into canvas px.
export function paintBanner(ctx, b, X, Y, W, H, scale = 3) {
  const layers = bannerLayers(b).slice().reverse(); // canvas paints bottom first
  const clear = (c) => (c === 'transparent' ? 'rgba(0,0,0,0)' : c);
  // CSS fades to "transparent" through the colour itself, not through black: copy the colour with alpha 0
  const fadeOf = (stops) => stops.map(([c, p], i) => [c === 'transparent' ? toAlpha0(stops[i - 1]?.[0] || stops[i + 1]?.[0]) : c, p]);
  ctx.save();
  ctx.beginPath(); ctx.rect(X, Y, W, H); ctx.clip();
  for (const l of layers) {
    if (l.t === 'solid') { ctx.fillStyle = l.c; ctx.fillRect(X, Y, W, H); continue; }
    if (l.t === 'linear') {
      // CSS angle: 0deg points up, clockwise; the line spans the box corners
      const rad = (l.a * Math.PI) / 180, dx = Math.sin(rad), dy = -Math.cos(rad);
      const half = (Math.abs(W * dx) + Math.abs(H * dy)) / 2, cx = X + W / 2, cy = Y + H / 2;
      const g = ctx.createLinearGradient(cx - dx * half, cy - dy * half, cx + dx * half, cy + dy * half);
      fadeOf(l.stops).forEach(([c, p]) => g.addColorStop(p / 100, clear(c)));
      ctx.fillStyle = g; ctx.fillRect(X, Y, W, H); continue;
    }
    if (l.t === 'radial') {
      const cx = X + (W * l.x) / 100, cy = Y + (H * l.y) / 100;
      let rx, ry;
      const fx = Math.max(cx - X, X + W - cx), fy = Math.max(cy - Y, Y + H - cy);
      if (l.circle) rx = ry = Math.hypot(fx, fy);
      else if (l.w) { rx = (W * l.w) / 100; ry = (H * l.h) / 100; }
      else { rx = fx * Math.SQRT2; ry = fy * Math.SQRT2; }
      ctx.save();
      ctx.translate(cx, cy); ctx.scale(1, ry / rx);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      fadeOf(l.stops).forEach(([c, p]) => g.addColorStop(p / 100, clear(c)));
      ctx.fillStyle = g; ctx.fillRect(-W * 3, -H * 3 * (rx / ry), W * 6, H * 6 * (rx / ry));
      ctx.restore(); continue;
    }
    if (l.t === 'conic' && ctx.createConicGradient) {
      const g = ctx.createConicGradient(((l.from - 90) * Math.PI) / 180, X + (W * l.x) / 100, Y + (H * l.y) / 100);
      l.colors.forEach((c, i) => g.addColorStop(i / (l.colors.length - 1), c));
      ctx.fillStyle = g; ctx.fillRect(X, Y, W, H); continue;
    }
    if (l.t === 'conic') { ctx.fillStyle = l.colors[1]; ctx.fillRect(X, Y, W, H); continue; }
    if (l.t === 'stripes') {
      const w = l.w * scale;
      ctx.save();
      ctx.translate(X + W / 2, Y + H / 2); ctx.rotate(((l.a - 90) * Math.PI) / 180);
      const R = Math.hypot(W, H);
      ctx.fillStyle = l.color;
      for (let x = -R; x < R; x += w * 2) ctx.fillRect(x, -R, w, R * 2);
      ctx.restore();
    }
  }
  ctx.restore();
}
function toAlpha0(c) {
  if (!c) return 'rgba(0,0,0,0)';
  if (c.startsWith('#')) return `${c.slice(0, 7)}00`;
  return c.replace(/rgba?\(([^)]+)\)/, (m, v) => `rgba(${v.split(',').slice(0, 3).join(',')},0)`);
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
