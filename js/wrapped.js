// Novum Rewind (code name "wrapped"): your year as tap-through story slides. Worked out on the phone from your own data
// (plus cheer counts from the server). Every slide can be shared to a story as an image.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, toast } from './ui.js';
import * as S from './store.js';
import * as A from './api.js';
import { wrappedYear, closeWrapped } from './wrapped-card.js';
import { MOODS, SLOGAN } from './content.js';
import { Avatar } from './profile.js';
import { openImageShare } from './celebrate.js';

const DAY = 864e5;
const lc = (t) => (t ? t[0].toLowerCase() + t.slice(1) : t);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Time quit-free inside [from, to], counting every run (slips included)
function freeMsIn(q, from, to, now) {
  const runs = [...(q.resets || []).map((r) => [S.parseLocal(r.from).getTime(), S.parseLocal(r.to).getTime()]), [S.quitStart(q).getTime(), now]];
  return runs.reduce((a, [x, y]) => a + Math.max(0, Math.min(y, to) - Math.max(x, from)), 0);
}

export function buildSlides(s, year, server, user, now = Date.now()) {
  const from = new Date(year, 0, 1).getTime();
  const to = Math.min(now, new Date(year + 1, 0, 1).getTime());
  const soFar = now < new Date(year, 11, 31).getTime();
  const inYear = (t) => t >= from && t < to;
  const keys = Object.keys(s.checkins).filter((k) => inYear(S.parseDay(k).getTime()));
  const slides = [];

  slides.push({ kind: 'intro', colors: ['#1f6bff', '#7d5cff'], emoji: '✨', kicker: `Novum Rewind ${year}${soFar ? ' · so far' : ''}`, big: user.firstName || 'Your year', label: soFar ? 'Here’s your year so far.' : 'Here’s your year.', sub: 'Tap to go through it →' });

  // days free
  const perQuit = s.quits.map((q) => ({ q, ms: freeMsIn(q, from, to, now) })).filter((x) => x.ms > 0).sort((a, b) => b.ms - a.ms);
  if (perQuit.length) {
    const top = perQuit[0];
    slides.push({
      kind: 'days', colors: [top.q.color, '#0b2a5c'], emoji: top.q.emoji, kicker: 'Days free',
      num: Math.floor(top.ms / DAY), label: `days ${top.q.label.toLowerCase()}-free this year`,
      sub: perQuit.length > 1 ? perQuit.slice(1).map((x) => `${x.q.emoji} ${Math.floor(x.ms / DAY)} days ${x.q.label.toLowerCase()}-free`).join(' · ') : 'Every one of them was a choice you made.',
    });
  }

  // money
  const saved = s.quits.reduce((a, q) => a + S.savedFor(q, freeMsIn(q, from, to, now)), 0);
  if (saved >= 1) {
    const items = [...(s.wishlist || [])].sort((a, b) => b.price - a.price);
    const thing = items.find((w) => w.price <= saved) || { emoji: '🍔', name: 'takeaways', price: 25, plural: true };
    const times = Math.floor(saved / thing.price);
    slides.push({
      kind: 'money', colors: ['#11998e', '#0d3b3b'], emoji: '💷', kicker: 'Money saved', num: Math.round(saved), prefix: '£', label: 'not spent on it this year',
      sub: thing.plural ? `That’s about ${times} ${thing.name} with mates.` : times > 1 ? `That’s ${thing.emoji} ${lc(thing.name)} ×${times}.` : `That’s ${thing.emoji} ${lc(thing.name)}, covered.`,
    });
  }

  // cravings beaten
  const cr = s.cravings.filter((c) => inYear(c.t));
  const beaten = cr.filter((c) => c.beaten).length;
  if (cr.length) {
    const mins = Math.round(cr.reduce((a, c) => a + (c.secs || 0), 0) / 60);
    slides.push({ kind: 'cravings', colors: ['#ff375f', '#3b1c4a'], emoji: '🛡️', kicker: 'Cravings beaten', num: beaten, label: `out of ${cr.length} you fought with SOS`, sub: `${mins} minute${mins === 1 ? '' : 's'} spent riding them out instead of giving in.` });
  }

  // check-ins
  if (keys.length) {
    let best = 0, run = 0, prev = null;
    keys.filter((k) => s.checkins[k].mood).sort().forEach((k) => { const d = S.parseDay(k); run = prev && S.daysBetween(prev, d) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; });
    const moods = keys.map((k) => s.checkins[k].mood).filter(Boolean);
    const common = moods.length ? +Object.entries(moods.reduce((a, m) => ({ ...a, [m]: (a[m] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0][0] : null;
    slides.push({ kind: 'checkins', colors: ['#5ac8fa', '#1c2541'], emoji: '✍️', kicker: 'Check-ins', num: keys.length, label: 'days you checked in', sub: `Longest run: ${best} day${best === 1 ? '' : 's'} in a row.${common ? ` Most days you felt ${MOODS[common - 1].l.toLowerCase()} ${MOODS[common - 1].e}` : ''}` });
  }

  // toughest month
  const pressure = Array(12).fill(0);
  cr.forEach((c) => { pressure[new Date(c.t).getMonth()] += 1; });
  s.quits.forEach((q) => (q.resets || []).forEach((r) => { const t = S.parseLocal(r.to).getTime(); if (inYear(t)) pressure[new Date(t).getMonth()] += 3; }));
  keys.forEach((k) => { const c = s.checkins[k]; const v = s.quits.map((q) => c[q.id]).filter((x) => typeof x === 'number'); if (v.length) pressure[S.parseDay(k).getMonth()] += Math.max(...v) / 5; });
  const worst = pressure.indexOf(Math.max(...pressure));
  if (pressure[worst] > 2) {
    slides.push({ kind: 'tough', colors: ['#ff512f', '#2b0f0e'], emoji: '⛈️', kicker: 'Your toughest month', big: MONTHS[worst], label: 'was the hardest stretch', sub: 'And you got through it. That’s the bit that counts.' });
  }

  // biggest cheerleader
  if (server?.topCheerer) {
    const t = server.topCheerer;
    slides.push({ kind: 'cheer', colors: ['#ff9f0a', '#3b1c4a'], avatar: t.avatar, avatarName: t.firstName, kicker: 'Your biggest cheerleader', big: t.firstName, label: `sent you ${t.n} cheer${t.n === 1 ? '' : 's'}`, sub: server.cheersSent ? `You sent ${server.cheersSent} cheer${server.cheersSent === 1 ? '' : 's'} back out. Good teammate.` : 'Maybe send them one back 💙' });
  }

  // you vs the start
  const byMonth = {};
  keys.forEach((k) => {
    const c = s.checkins[k]; const v = s.quits.map((q) => c[q.id]).filter((x) => typeof x === 'number');
    if (!v.length) return;
    const m = S.parseDay(k).getMonth();
    (byMonth[m] = byMonth[m] || []).push(v.reduce((a, b) => a + b, 0) / v.length);
  });
  const ms = Object.keys(byMonth).map(Number).sort((a, b) => a - b);
  if (ms.length >= 2) {
    const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
    const a = avg(byMonth[ms[0]]), b = avg(byMonth[ms[ms.length - 1]]);
    if (a > 0) {
      const ch = Math.round(((a - b) / a) * 100);
      slides.push({ kind: 'vs', colors: ['#845ef7', '#071a2e'], emoji: ch > 0 ? '📉' : '📈', kicker: `You vs ${MONTHS[ms[0]]}`, num: Math.abs(ch), suffix: '%', label: ch > 0 ? 'fewer cravings' : 'more cravings', sub: ch > 0 ? `From ${a.toFixed(1)}/10 in ${MONTHS[ms[0]]} to ${b.toFixed(1)}/10 in ${MONTHS[ms[ms.length - 1]]}.` : 'Some months are heavier. You’re still here, still trying.' });
    }
  }

  // lungs
  const lt = (s.lungTests || []).filter((x) => inYear(x.t));
  if (lt.length >= 2 && lt[lt.length - 1].score > lt[0].score) {
    slides.push({ kind: 'lungs', colors: ['#00c9a7', '#071a2e'], emoji: '🫁', kicker: 'Lung test', num: lt[lt.length - 1].score - lt[0].score, prefix: '+', label: 'points since your first test', sub: `From ${lt[0].score} to ${lt[lt.length - 1].score} out of 100.` });
  }

  // finale
  const total = perQuit.length ? Math.floor(perQuit[0].ms / DAY) : 0;
  slides.push({
    kind: 'end', colors: ['#3b9bff', '#04060b'], emoji: '💙', kicker: `${year} in Novum`, big: soFar ? 'Keep going.' : `Here’s to ${year + 1}.`,
    label: SLOGAN,
    grid: [total && ['Days free', total], saved >= 1 && ['Saved', S.money(saved, 0)], beaten && ['Cravings beaten', beaten], keys.length && ['Check-ins', keys.length]].filter(Boolean),
  });
  return slides;
}

/* ---------- the story viewer ---------- */
export function Wrapped() {
  const { year } = wrappedYear();
  const user = A.getSession()?.user || {};
  const [server, setServer] = useState(undefined);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { A.call('GET', `/wrapped?year=${year}`).then(setServer).catch(() => setServer(null)); }, []);
  const slides = buildSlides(S.getState(), year, server, user);
  const slide = slides[Math.min(i, slides.length - 1)];
  const next = () => { haptic(4); if (i < slides.length - 1) setI(i + 1); else closeWrapped(); };
  const prev = () => { haptic(4); setI(Math.max(0, i - 1)); };
  // auto-advance every 6 seconds unless you're holding
  useEffect(() => {
    if (paused || server === undefined || slide.kind === 'end') return undefined;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [i, paused, server === undefined]);
  if (server === undefined) return html`<div class="wr"><div class="wr-load">✨</div></div>`;
  const share = () => openImageShare(() => drawSlide(slide, year), `${slide.kicker}: ${slide.big ?? `${slide.prefix || ''}${slide.num}${slide.suffix || ''}`} ${slide.label}`, 'Share this slide');
  return html`<div class="wr" style=${`--c1:${slide.colors[0]};--c2:${slide.colors[1]}`} role="dialog" aria-modal="true" aria-label=${`Novum Rewind ${year}`}>
    <div class="wr-bars">${slides.map((_, k) => html`<i class=${k < i ? 'done' : k === i ? (paused ? 'now paused' : 'now') : ''} key=${k + '-' + (k === i ? i : '')}></i>`)}</div>
    <button class="wr-x" aria-label="Close" onClick=${closeWrapped}>✕</button>
    <div class="wr-tap left" onClick=${prev}></div>
    <div class="wr-tap right" onClick=${next} onPointerDown=${() => setPaused(true)} onPointerUp=${() => setPaused(false)} onPointerLeave=${() => setPaused(false)}></div>
    <div class="wr-slide" key=${i}>
      ${slide.avatar !== undefined ? html`<div class="wr-av"><${Avatar} a=${slide.avatar} name=${slide.avatarName} size=${120} /></div>` : html`<div class="wr-emoji">${slide.emoji}</div>`}
      <div class="wr-kicker">${slide.kicker}</div>
      <div class=${`wr-big ${typeof slide.big === "string" && slide.big.length > 7 ? "txt" : ""}`}>${slide.big ?? html`${slide.prefix || ''}<${Count} to=${slide.num} />${slide.suffix || ''}`}</div>
      <div class="wr-label">${slide.label}</div>
      ${slide.sub && html`<div class="wr-sub">${slide.sub}</div>`}
      ${slide.grid && html`<div class="wr-grid">${slide.grid.map(([k, v]) => html`<div><b>${v}</b><span>${k}</span></div>`)}</div>`}
    </div>
    <button class="wr-share" onClick=${(e) => { e.stopPropagation(); setPaused(true); share(); }}>Share this slide</button>
  </div>`;
}

// Numbers count up when a slide appears
function Count({ to }) {
  const [n, setN] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return undefined; }
    const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1100); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to]);
  return html`${n.toLocaleString('en-GB')}`;
}

/* ---------- one slide as a story image ---------- */
const FONT = '-apple-system, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
async function drawSlide(sl, year) {
  const W = 1080, H = 1920;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
  g.addColorStop(0, sl.colors[0]); g.addColorStop(1, sl.colors[1]);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const v = ctx.createRadialGradient(W / 2, H * 0.42, 50, W / 2, H * 0.42, 900);
  v.addColorStop(0, 'rgba(255,255,255,0.10)'); v.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
  ctx.font = `800 40px ${FONT}`; ctx.globalAlpha = 0.85;
  ctx.fillText(`NOVUM REWIND ${year}`, W / 2, 170); ctx.globalAlpha = 1;
  const fit = (text, weight, size, max) => { let s = size; do { ctx.font = `${weight} ${s}px ${FONT}`; s -= 6; } while (ctx.measureText(text).width > max && s > 30); };
  const wrap = (text, y, size, alpha) => {
    ctx.font = `600 ${size}px ${FONT}`; ctx.globalAlpha = alpha;
    const words = String(text).split(' '); let line = ''; const lines = [];
    words.forEach((w) => { const t = line ? `${line} ${w}` : w; if (ctx.measureText(t).width > 880) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line);
    lines.forEach((l, k) => ctx.fillText(l, W / 2, y + k * size * 1.35)); ctx.globalAlpha = 1;
    return y + lines.length * size * 1.35;
  };
  ctx.font = `200px ${FONT}`; ctx.fillText(sl.emoji || '✨', W / 2, 620);
  ctx.font = `800 46px ${FONT}`; ctx.globalAlpha = 0.8; ctx.fillText(sl.kicker.toUpperCase(), W / 2, 790); ctx.globalAlpha = 1;
  const big = sl.big ?? `${sl.prefix || ''}${Number(sl.num).toLocaleString('en-GB')}${sl.suffix || ''}`;
  fit(big, 900, 230, 960); ctx.fillText(big, W / 2, 1020);
  let y = wrap(sl.label, 1130, 56, 0.95);
  if (sl.sub) wrap(sl.sub, y + 40, 42, 0.75);
  if (sl.grid) sl.grid.forEach(([k, val], n) => { ctx.font = `800 64px ${FONT}`; ctx.fillText(String(val), W / 2, 1380 + n * 120); ctx.font = `600 34px ${FONT}`; ctx.globalAlpha = 0.7; ctx.fillText(k, W / 2, 1420 + n * 120); ctx.globalAlpha = 1; });
  ctx.font = `800 38px ${FONT}`; ctx.fillText('novumdaily.com', W / 2, 1830);
  return new Promise((ok) => cv.toBlob((b) => ok(b), 'image/png'));
}
