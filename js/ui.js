// Shared UI: rings, bottom sheets, charts, controls, icons, haptics.
import { html, useState, useEffect, useRef, useLayoutEffect } from '../vendor/preact-htm.js';
import { uid, fmtDate } from './store.js';

export { html };

/* ---------- haptics ---------- */
// Android: Vibration API. iOS 18+: toggling a hidden <input switch> fires a system haptic.
let hapticLabel;
// Capital at the start of each word ("mary-jane o'neil" → "Mary-Jane O'neil"); never lowercases anything
export const capName = (v) => v.replace(/(^|[\s-])(\p{Ll})/gu, (_, a, b) => a + b.toUpperCase());

export function haptic(ms = 8) {
  try {
    if (navigator.vibrate) { navigator.vibrate(ms); return; }
    if (!hapticLabel) {
      const input = document.createElement('input');
      input.type = 'checkbox'; input.setAttribute('switch', ''); input.id = '__haptic'; input.style.display = 'none';
      hapticLabel = document.createElement('label'); hapticLabel.htmlFor = '__haptic'; hapticLabel.style.display = 'none';
      document.body.append(input, hapticLabel);
    }
    hapticLabel.click();
  } catch { /* no haptics available */ }
}

/* ---------- hooks ---------- */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), interval); return () => clearInterval(id); }, [interval]);
  return now;
}
function useWidth(ref, fallback = 320) {
  const [w, setW] = useState(fallback);
  useLayoutEffect(() => {
    if (!ref.current) return;
    setW(ref.current.clientWidth || fallback);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return w;
}

/* ---------- icons (SF Symbols-ish, 24px stroke) ---------- */
const I = (d, extra = '') => html`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ...${extra ? { style: extra } : {}}>${d}</svg>`;
export const Icon = {
  home: () => I(html`<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`),
  checkin: () => I(html`<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/>`),
  goals: () => I(html`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>`),
  progress: () => I(html`<path d="M5 20V12M12 20V5M19 20v-9"/>`),
  profile: () => I(html`<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>`),
  plus: () => I(html`<path d="M12 5v14M5 12h14"/>`),
  chevron: () => I(html`<path d="m9 5 7 7-7 7"/>`),
  left: () => I(html`<path d="m15 5-7 7 7 7"/>`),
  check: () => I(html`<path d="m5 12.5 4.5 4.5L19 7.5"/>`),
  trash: () => I(html`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>`),
  share: () => I(html`<path d="M12 3v12M7 8l5-5 5 5M5 13v7h14v-7"/>`),
  download: () => I(html`<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>`),
  heart: () => I(html`<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>`),
  sparkle: () => I(html`<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>`),
  clock: () => I(html`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  pound: () => I(html`<path d="M16 6.5A3.5 3.5 0 0 0 9 7v10M6 12h7M6 19h11"/>`),
};

/* ---------- progress rings ---------- */
export function Ring({ pct = 0, size = 64, stroke = 8, color = '#3B9BFF', children, className = '' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [p, setP] = useState(0);
  useEffect(() => { const id = requestAnimationFrame(() => setP(pct)); return () => cancelAnimationFrame(id); }, [pct]);
  const v = Math.max(0, Math.min(1, p));
  return html`<div class="ring ${className}" style="width:${size}px;height:${size}px">
    <svg width=${size} height=${size} viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke=${color} stroke-opacity="0.2" stroke-width=${stroke} />
      <circle class="ring-fg" cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke=${color} stroke-width=${stroke}
        stroke-linecap="round" stroke-dasharray=${c} stroke-dashoffset=${c * (1 - v)}
        transform="rotate(-90 ${size / 2} ${size / 2})" style=${v < 0.002 ? 'opacity:0' : ''} />
    </svg>
    ${children != null && html`<div class="ring-c">${children}</div>`}
  </div>`;
}
// Concentric Activity-style rings, outermost first
export function RingStack({ rings, size = 160, stroke = 16, gap = 3, children }) {
  return html`<div class="ring-stack" style="width:${size}px;height:${size}px">
    ${rings.map((r, i) => {
      const s = size - i * 2 * (stroke + gap);
      return s > stroke * 2 ? html`<div class="ring-abs" style="inset:${i * (stroke + gap)}px"><${Ring} pct=${r.pct} size=${s} stroke=${stroke} color=${r.color} /></div>` : null;
    })}
    ${children != null && html`<div class="ring-c">${children}</div>`}
  </div>`;
}

/* ---------- bottom sheets ---------- */
let sheets = [];
const sheetSubs = new Set();
const emitSheets = () => sheetSubs.forEach((f) => f());
export function openSheet(render, opts = {}) {
  const id = uid();
  sheets = [...sheets, { id, render, opts, closing: false }];
  emitSheets(); haptic(6);
  return () => closeSheet(id);
}
export function closeAllSheets() { sheets.forEach((s) => closeSheet(s.id)); }
export function closeSheet(id) {
  sheets = sheets.map((s) => (s.id === id ? { ...s, closing: true } : s));
  emitSheets();
  setTimeout(() => { sheets = sheets.filter((s) => s.id !== id); emitSheets(); }, 420);
}
export function SheetHost() {
  const [, force] = useState(0);
  useEffect(() => { const f = () => force((x) => x + 1); sheetSubs.add(f); return () => sheetSubs.delete(f); }, []);
  useEffect(() => { document.documentElement.classList.toggle('sheet-open', sheets.some((s) => !s.closing)); });
  return sheets.map((s, i) => html`<${Sheet} key=${s.id} sheet=${s} stacked=${i < sheets.length - 1 && !sheets[sheets.length - 1].closing} />`);
}
function Sheet({ sheet, stacked }) {
  const [open, setOpen] = useState(false);
  const [dy, setDy] = useState(0);
  const drag = useRef(null);
  useEffect(() => {
    // Two frames so the closed position paints first; timer fallback in case rAF is throttled.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    const t = setTimeout(() => setOpen(true), 60);
    return () => { cancelAnimationFrame(id); clearTimeout(t); };
  }, []);
  const close = () => closeSheet(sheet.id);
  const shown = open && !sheet.closing;

  const onStart = (e) => {
    const t = e.target;
    if (!t.closest('.sheet-drag') || t.closest('button,input,select,textarea,a')) return;
    drag.current = { y: e.touches[0].clientY, t: performance.now(), last: 0 };
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const d = Math.max(0, e.touches[0].clientY - drag.current.y);
    drag.current.last = d; setDy(d);
  };
  const onEnd = () => {
    if (!drag.current) return;
    const { last, t } = drag.current;
    const v = last / Math.max(1, performance.now() - t);
    drag.current = null;
    if (last > 120 || v > 0.7) close();
    setDy(0);
  };
  const style = shown ? `transform: translate3d(0, ${dy}px, 0)` : 'transform: translate3d(0, 100%, 0)';
  return html`<div class="sheet-layer ${shown ? 'open' : ''} ${stacked ? 'stacked' : ''}" role="dialog" aria-modal="true">
    <div class="sheet-backdrop" onClick=${close}></div>
    <div class="sheet ${drag.current ? 'dragging' : ''} ${sheet.opts.tall ? 'tall' : ''}" style=${style}
      onTouchStart=${onStart} onTouchMove=${onMove} onTouchEnd=${onEnd} onTouchCancel=${onEnd}>
      <div class="sheet-drag grabber-zone"><div class="grabber"></div></div>
      ${sheet.render(close)}
    </div>
  </div>`;
}
export function SheetBar({ title, left, right }) {
  return html`<div class="sheet-bar sheet-drag">
    <div class="sb-side">${left}</div>
    <div class="sb-title">${title}</div>
    <div class="sb-side sb-right">${right}</div>
  </div>`;
}

/* ---------- page with iOS large title ---------- */
// Pull down at the top of a page to refresh (Home and Profile)
function usePullToRefresh(onRefresh) {
  const [pull, setPull] = useState(0);
  const [busy, setBusy] = useState(false);
  const st = useRef({ y0: null, d: 0, busy: false });
  const fn = useRef(onRefresh);
  fn.current = onRefresh;
  const on = !!onRefresh;
  useEffect(() => {
    if (!on) return undefined;
    const start = (e) => {
      if (window.scrollY > 0 || st.current.busy || document.documentElement.classList.contains('sheet-open')) return;
      st.current.y0 = e.touches[0].clientY; st.current.d = 0;
    };
    const move = (e) => {
      if (st.current.y0 == null) return;
      const d = Math.max(0, e.touches[0].clientY - st.current.y0);
      if (window.scrollY > 0 && d === 0) { st.current.y0 = null; return; }
      const damped = Math.min(96, d * 0.45);
      if (damped >= 64 && st.current.d < 64) haptic(8);
      st.current.d = damped; setPull(damped);
    };
    const end = async () => {
      if (st.current.y0 == null) return;
      const d = st.current.d; st.current.y0 = null;
      if (d < 64) { setPull(0); return; }
      st.current.busy = true; setBusy(true); setPull(56);
      const t0 = Date.now();
      try { await fn.current(); } catch { /* offline: nothing to do */ }
      await new Promise((r) => setTimeout(r, Math.max(0, 600 - (Date.now() - t0))));
      st.current.busy = false; setBusy(false); setPull(0); haptic(6);
    };
    addEventListener('touchstart', start, { passive: true });
    addEventListener('touchmove', move, { passive: true });
    addEventListener('touchend', end);
    addEventListener('touchcancel', end);
    return () => { removeEventListener('touchstart', start); removeEventListener('touchmove', move); removeEventListener('touchend', end); removeEventListener('touchcancel', end); };
  }, [on]);
  return { pull, busy };
}

export function Page({ title, eyebrow, sub, right, titleRight, children, onRefresh }) {
  const { pull, busy } = usePullToRefresh(onRefresh);
  return html`<div class="page">
    ${onRefresh && html`<div class="ptr ${busy ? 'busy' : ''} ${pull >= 64 ? 'ready' : ''}" style=${`height:${pull}px;opacity:${Math.min(1, pull / 48)}`} aria-hidden=${!busy}>
      <svg viewBox="0 0 24 24" style=${busy ? '' : `transform:rotate(${pull * 4}deg)`}><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/></svg>
    </div>`}
    <header class="nav">
      <div class="nav-inner"><div class="nav-title">${title}</div><div class="nav-right">${right}</div></div>
    </header>
    <div class="lt">
      ${eyebrow && html`<div class="eyebrow">${eyebrow}</div>`}
      ${titleRight ? html`<div class="lt-row"><h1 class="large-title">${title}</h1>${titleRight}</div>` : html`<h1 class="large-title">${title}</h1>`}
      ${sub && html`<div class="lt-sub">${sub}</div>`}
    </div>
    ${children}
  </div>`;
}

/* ---------- controls ---------- */
export function Segmented({ options, value, onChange, small }) {
  const idx = options.findIndex((o) => o.value === value);
  return html`<div class="seg ${small ? 'seg-sm' : ''}" role="tablist" style="--n:${options.length};--i:${Math.max(0, idx)}">
    ${idx >= 0 && html`<div class="seg-thumb"></div>`}
    ${options.map((o) => html`<button type="button" role="tab" aria-selected=${o.value === value} class=${o.value === value ? 'on' : ''}
      onClick=${() => { if (o.value !== value) { haptic(); onChange(o.value); } }}>${o.label}</button>`)}
  </div>`;
}
export function Toggle({ on, onChange, label }) {
  return html`<button type="button" class="toggle ${on ? 'on' : ''}" role="switch" aria-checked=${on} aria-label=${label}
    onClick=${() => { haptic(); onChange(!on); }}><span></span></button>`;
}
export function Group({ header, footer, children, className = '' }) {
  return html`<section class="group ${className}">
    ${header && html`<h2 class="group-h">${header}</h2>`}
    <div class="card list">${children}</div>
    ${footer && html`<p class="group-f">${footer}</p>`}
  </section>`;
}
export function Row({ icon, iconBg, title, sub, detail, chevron, onClick, children, danger, className = '' }) {
  const Tag = onClick ? 'button' : 'div';
  return html`<${Tag} type=${onClick ? 'button' : undefined} class="row ${onClick ? 'tap' : ''} ${danger ? 'danger' : ''} ${className}" onClick=${onClick}>
    ${icon && html`<span class="row-ic" style=${iconBg ? `background:${iconBg}` : ''}>${icon}</span>`}
    <span class="row-main"><span class="row-title">${title}</span>${sub && html`<span class="row-sub">${sub}</span>`}</span>
    ${detail != null && html`<span class="row-detail">${detail}</span>`}
    ${children}
    ${chevron && html`<span class="row-chev">${Icon.chevron()}</span>`}
  </${Tag}>`;
}
export function Field({ label, children, hint }) {
  return html`<label class="field"><span class="field-l">${label}</span><span class="field-c">${children}</span>${hint && html`<span class="field-h">${hint}</span>`}</label>`;
}

/* ---------- line chart (plain SVG) ---------- */
// series: [{ name, color, values: (number|null)[] }], keys: dayKey[] aligned with values
export function LineChart({ series, keys, yMin = 0, yMax = 10, yTicks = [0, 5, 10], yFmt = (v) => v, height = 180, unit = '' }) {
  const ref = useRef();
  const w = useWidth(ref);
  const [hover, setHover] = useState(null);
  const multi = series.length > 1;
  const P = { l: 30, r: multi ? 44 : 12, t: 12, b: 24 };
  const iw = Math.max(10, w - P.l - P.r), ih = height - P.t - P.b;
  const n = keys.length;
  const x = (i) => P.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v) => P.t + ih - ((v - yMin) / (yMax - yMin)) * ih;
  const pathFor = (vals) => {
    let d = '', pen = false;
    vals.forEach((v, i) => { if (v == null) { pen = false; return; } d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`; pen = true; });
    return d;
  };
  const lastIdx = (vals) => { for (let i = vals.length - 1; i >= 0; i--) if (vals[i] != null) return i; return -1; };
  const hasData = series.some((s) => s.values.some((v) => v != null));
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const i = Math.round(((px - P.l) / iw) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };
  const xl = n > 1 ? [0, Math.floor((n - 1) / 2), n - 1] : [0];
  const tipLeft = hover != null ? Math.max(4, Math.min(w - 132, x(hover) - 64)) : 0;
  return html`<div class="chart" ref=${ref}>
    <svg width=${w} height=${height} role="img" aria-label=${series.map((s) => s.name).join(' and ') + ' chart'}
      onPointerMove=${onMove} onPointerDown=${onMove} onPointerLeave=${() => setHover(null)} onTouchMove=${onMove} onTouchEnd=${() => setHover(null)}>
      ${yTicks.map((t) => html`<g><line x1=${P.l} x2=${P.l + iw} y1=${y(t)} y2=${y(t)} class="grid" /><text x=${P.l - 8} y=${y(t) + 4} class="axis" text-anchor="end">${yFmt(t)}</text></g>`)}
      ${xl.map((i) => html`<text x=${x(i)} y=${height - 6} class="axis" text-anchor=${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}>${fmtDate(keys[i], { day: 'numeric', month: 'short' })}</text>`)}
      ${series.map((s) => html`<path d=${pathFor(s.values)} fill="none" stroke=${s.color} stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />`)}
      ${series.map((s) => s.values.map((v, i) => {
        const isolated = v != null && s.values[i - 1] == null && s.values[i + 1] == null;
        return isolated ? html`<circle cx=${x(i)} cy=${y(v)} r="4" fill=${s.color} stroke="var(--card)" stroke-width="2" />` : null;
      }))}
      ${multi && series.map((s) => { const i = lastIdx(s.values); return i < 0 ? null : html`<text x=${x(i) + 6} y=${y(s.values[i]) + 4} class="dlabel">${s.name}</text>`; })}
      ${hover != null && html`<g>
        <line x1=${x(hover)} x2=${x(hover)} y1=${P.t} y2=${P.t + ih} class="cross" />
        ${series.map((s) => s.values[hover] != null && html`<circle cx=${x(hover)} cy=${y(s.values[hover])} r="5" fill=${s.color} stroke="var(--card)" stroke-width="2" />`)}
      </g>`}
    </svg>
    ${!hasData && html`<div class="chart-empty">No check-ins yet. Your trend will show up here.</div>`}
    ${hover != null && hasData && html`<div class="tip" style="left:${tipLeft}px">
      <div class="tip-d">${fmtDate(keys[hover], { weekday: 'short', day: 'numeric', month: 'short' })}</div>
      ${series.map((s) => html`<div class="tip-r"><i style="background:${s.color}"></i>${s.name}<b>${s.values[hover] == null ? '—' : yFmt(s.values[hover]) + unit}</b></div>`)}
    </div>`}
  </div>`;
}
export function Legend({ series }) {
  return html`<div class="legend">${series.map((s) => html`<span><i style="background:${s.color}"></i>${s.name}</span>`)}</div>`;
}

/* ---------- misc ---------- */
export function Empty({ emoji, title, text, action }) {
  return html`<div class="empty"><div class="empty-e">${emoji}</div><div class="empty-t">${title}</div><div class="empty-x">${text}</div>${action}</div>`;
}
export function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 2200);
}

/* ---------- loading placeholders ---------- */
export function Skeleton({ rows = 3, avatar = false }) {
  return html`<div class="card list skel" aria-label="Loading" role="status">${Array.from({ length: rows }, (_, i) => html`<div class="row" key=${i}>
    ${avatar && html`<i class="sk sk-av"></i>`}<span class="row-main"><i class="sk sk-l" style=${`width:${55 + ((i * 17) % 35)}%`}></i><i class="sk sk-s"></i></span>
  </div>`)}</div>`;
}
