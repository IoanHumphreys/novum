// Milestone celebrations: a full-screen moment with confetti when you pass 1 day, 1 week, 1 month…
// plus a branded image card you can share to a Snapchat or Instagram story.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, toast } from './ui.js';
import * as S from './store.js';
import { MILESTONES } from './content.js';

const DAY = 864e5;
const joinNames = (xs) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
export const freeOf = (quits) => (quits.length === 1 ? `${quits[0].label.toLowerCase()}-free` : `free of ${joinNames(quits.map((q) => q.label.toLowerCase()))}`);

/* ---------- which milestones are new ---------- */
// Returns the celebration to show (or null) and records every milestone reached so none repeat.
// A quit seen for the first time only celebrates if its latest milestone was in the last 2 days.
export function checkMilestones(now = Date.now()) {
  const s = S.getState();
  const record = {};
  const fresh = [];
  for (const q of s.quits) {
    const startMs = S.quitStart(q).getTime();
    if (startMs > now) continue;
    const key = `${q.id}@${q.start}`;
    const days = (now - startMs) / DAY;
    const reached = MILESTONES.filter((m) => m.days <= days).pop();
    if (!reached) continue;
    const done = s.celebrated[key];
    if (done !== undefined && done >= reached.days) continue;
    record[key] = reached.days;
    const isNew = done !== undefined || now - (startMs + reached.days * DAY) < 2 * DAY;
    if (isNew) fresh.push({ q, m: reached });
  }
  if (Object.keys(record).length) S.update((d) => { d.celebrated = { ...d.celebrated, ...record }; });
  if (!fresh.length) return null;
  // Show the biggest milestone; group quits that hit it together
  const top = Math.max(...fresh.map((f) => f.m.days));
  const quits = fresh.filter((f) => f.m.days === top).map((f) => f.q);
  return { m: MILESTONES.find((x) => x.days === top), quits };
}

/* ---------- the full-screen moment ---------- */
let current = null;
const subs = new Set();
const setCurrent = (c) => { current = c; subs.forEach((f) => f(c)); };
export const celebrate = (c) => { if (c) setCurrent(c); };

export function CelebrationHost() {
  const [c, setC] = useState(current);
  useEffect(() => { subs.add(setC); return () => subs.delete(setC); }, []);
  if (!c) return null;
  return html`<${Celebration} key=${c.m.days + c.quits.map((q) => q.id).join()} c=${c} close=${() => setCurrent(null)} />`;
}

function Celebration({ c, close }) {
  const canvas = useRef();
  const [show, setShow] = useState(false);
  const saved = c.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q)), 0);
  const color = c.quits[0]?.color || '#3B9BFF';
  useEffect(() => {
    haptic([20, 60, 30]);
    const t = setTimeout(() => setShow(true), 30);
    const stop = confetti(canvas.current, [color, '#3B9BFF', '#FFD60A', '#30D158', '#FF375F', '#ffffff']);
    return () => { clearTimeout(t); stop(); };
  }, []);
  const share = () => { openShareSheet(cardFor(c.quits, c.m.days, saved)); };
  return html`<div class="cel ${show ? 'on' : ''}" role="dialog" aria-modal="true" aria-label=${`${c.m.label} ${freeOf(c.quits)}`}>
    <canvas ref=${canvas} class="cel-fx" aria-hidden="true"></canvas>
    <div class="cel-body">
      <div class="cel-ring" style="--c:${color}"><b>${c.m.days}</b><span>${c.m.days === 1 ? 'day' : 'days'}</span></div>
      <div class="cel-k">Milestone unlocked</div>
      <h1 class="cel-t">${c.m.label} ${freeOf(c.quits)}</h1>
      <p class="cel-s">${saved >= 1 ? `That’s ${S.money(saved, 0)} back in your pocket. ` : ''}Every hour of this was you. Be proud.</p>
      <div class="cel-actions">
        <button class="btn btn-primary block big glow" onClick=${share}>Share it</button>
        <button class="btn btn-plain block big" onClick=${() => { haptic(); close(); }}>Keep going</button>
      </div>
    </div>
  </div>`;
}

// Falling confetti on a canvas. Returns a stop function.
function confetti(cv, colors) {
  if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const ctx = cv.getContext('2d');
  const dpr = Math.min(2, devicePixelRatio || 1);
  const W = (cv.width = innerWidth * dpr), H = (cv.height = innerHeight * dpr);
  const bits = Array.from({ length: 160 }, (_, i) => ({
    x: Math.random() * W, y: -Math.random() * H * 0.6 - 20,
    vx: (Math.random() - 0.5) * 3 * dpr, vy: (2 + Math.random() * 3.5) * dpr,
    w: (6 + Math.random() * 6) * dpr, h: (8 + Math.random() * 10) * dpr,
    r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3, c: colors[i % colors.length], round: Math.random() < 0.3,
  }));
  let raf, t0 = performance.now(), alive = true;
  const tick = (t) => {
    if (!alive) return;
    const age = t - t0;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = age > 3200 ? Math.max(0, 1 - (age - 3200) / 900) : 1;
    for (const b of bits) {
      b.vy += 0.045 * dpr; b.x += b.vx + Math.sin((t + b.r * 500) / 400) * 0.6 * dpr; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
      if (b.round) { ctx.beginPath(); ctx.arc(0, 0, b.w / 2, 0, 6.28); ctx.fill(); } else ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r)));
      ctx.restore();
    }
    if (age < 4200) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(tick);
  return () => { alive = false; cancelAnimationFrame(raf); };
}

/* ---------- the share card ---------- */
// What goes on the card
export function cardFor(quits, days, saved) {
  const d = Math.floor(days);
  return { number: d, unit: d === 1 ? 'DAY' : 'DAYS', headline: freeOf(quits), saved, color: quits[0]?.color || '#3B9BFF', colors: quits.map((q) => q.color) };
}

const FONT = '-apple-system, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
let iconImg = null;
function loadIcon() {
  if (!iconImg) iconImg = new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = 'icons/icon-512.png'; });
  return iconImg;
}
function spaced(ctx, text, x, y, gap) {
  const chars = [...text];
  const w = chars.reduce((a, ch) => a + ctx.measureText(ch).width, 0) + gap * (chars.length - 1);
  let cx = x - w / 2;
  ctx.textAlign = 'left';
  for (const ch of chars) { ctx.fillText(ch, cx, y); cx += ctx.measureText(ch).width + gap; }
  ctx.textAlign = 'center';
}
function fitFont(ctx, text, weight, size, max) {
  let s = size;
  do { ctx.font = `${weight} ${s}px ${FONT}`; s -= 4; } while (ctx.measureText(text).width > max && s > 24);
}

// 1080×1920, the size of a phone story
export async function drawCard(card) {
  const W = 1080, H = 1920;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  // background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0c1a33'); bg.addColorStop(0.55, '#060a14'); bg.addColorStop(1, '#04060b');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(540, 900, 40, 540, 900, 620);
  glow.addColorStop(0, hexA(card.color, 0.32)); glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  // logo
  const icon = await loadIcon();
  if (icon) { ctx.save(); roundRect(ctx, 465, 150, 150, 150, 36); ctx.clip(); ctx.drawImage(icon, 465, 150, 150, 150); ctx.restore(); }
  ctx.fillStyle = '#ffffff'; ctx.font = `900 46px ${FONT}`;
  spaced(ctx, 'NOVUM', 540, 380, 18);
  // rings: one per quit, outermost first
  const colors = (card.colors && card.colors.length ? card.colors : [card.color]).slice(0, 3);
  colors.forEach((c, i) => {
    const r = 330 - i * 52;
    ctx.lineWidth = 40; ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.beginPath(); ctx.arc(540, 900, r, 0, Math.PI * 2); ctx.stroke();
    const g = ctx.createLinearGradient(540 - r, 900 - r, 540 + r, 900 + r);
    g.addColorStop(0, c); g.addColorStop(1, lighten(c));
    ctx.strokeStyle = g; ctx.beginPath(); ctx.arc(540, 900, r, -Math.PI / 2, Math.PI * 1.5 - 0.0001); ctx.stroke();
  });
  // number
  ctx.fillStyle = '#ffffff';
  fitFont(ctx, String(card.number), 900, card.number >= 1000 ? 200 : 260, 420 - (colors.length - 1) * 100);
  ctx.fillText(String(card.number), 540, 960);
  ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = `800 44px ${FONT}`;
  spaced(ctx, card.unit, 540, 1040, 12);
  // words
  ctx.fillStyle = '#ffffff';
  fitFont(ctx, card.headline, 800, 76, 920);
  ctx.fillText(card.headline, 540, 1370);
  if (card.saved >= 1) {
    ctx.fillStyle = '#5aaeff'; ctx.font = `800 58px ${FONT}`;
    ctx.fillText(`${S.money(card.saved, 0)} saved 💙`, 540, 1465);
  } else {
    ctx.font = `64px ${FONT}`; ctx.fillText('💙', 540, 1465);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = `500 36px ${FONT}`;
  ctx.fillText('A new beginning. A new standard. A new you.', 540, 1730);
  ctx.fillStyle = '#5aaeff'; ctx.font = `800 36px ${FONT}`;
  ctx.fillText('novumdaily.com', 540, 1800);
  return new Promise((ok) => cv.toBlob((b) => ok(b), 'image/png'));
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
const hexRGB = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hexA = (h, a) => { try { const [r, g, b] = hexRGB(h); return `rgba(${r},${g},${b},${a})`; } catch { return `rgba(59,155,255,${a})`; } };
const lighten = (h) => { try { const [r, g, b] = hexRGB(h).map((v) => Math.round(v + (255 - v) * 0.45)); return `rgb(${r},${g},${b})`; } catch { return '#9fd0ff'; } };

/* ---------- share sheet: preview, then Share (or save) ---------- */
// The image is made when the sheet opens, so tapping Share can open the share menu straight away
// (iPhone only allows that directly from a tap).
export function openShareSheet(card) {
  openSheet((close) => html`<${ShareSheet} card=${card} close=${close} />`, { tall: true });
}
function ShareSheet({ card, close }) {
  const [blob, setBlob] = useState(null);
  const [url, setUrl] = useState('');
  useEffect(() => {
    let u = '';
    drawCard(card).then((b) => { setBlob(b); u = URL.createObjectURL(b); setUrl(u); });
    return () => { if (u) URL.revokeObjectURL(u); };
  }, []);
  const file = blob && new File([blob], 'novum-streak.png', { type: 'image/png' });
  const canShare = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
  const share = async () => {
    haptic();
    try { await navigator.share({ files: [file] }); } catch (e) { if (e.name !== 'AbortError') toast('Couldn’t open sharing. Try Save image instead.'); }
  };
  const save = () => {
    const a = document.createElement('a');
    a.href = url; a.download = 'novum-streak.png';
    document.body.appendChild(a); a.click(); a.remove();
    toast('Image saved');
  };
  return html`
    <${SheetBar} title="Share your streak" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body share-sheet">
      <div class="share-preview">${url ? html`<img src=${url} alt=${`${card.number} ${card.unit.toLowerCase()} ${card.headline}`} />` : html`<div class="share-wait">Making your card…</div>`}</div>
      <p class="muted center tiny">Sized for a Snapchat or Instagram story.</p>
      ${canShare && html`<button class="btn btn-primary block big" onClick=${share}>Share</button>`}
      <button class="btn ${canShare ? 'btn-plain' : 'btn-primary'} block big" disabled=${!url} onClick=${save}>Save image</button>
    </div>`;
}
