// "Your week": the last 7 days at a glance (check-ins, cravings beaten, money saved, mood and cravings
// compared with the week before, and what your body did), with a story-sized card to share.
// The Sunday evening recap notification opens it (#recap), and so does Progress.
import { html, haptic, openSheet, SheetBar, Group } from './ui.js';
import * as S from './store.js';
import { MOODS, healthFor, SLOGAN } from './content.js';
import { areaIcon } from './shared.js';
import { PALETTES, DEFAULT_BANNER, paintBanner } from './banner.js';
import { openImageShare, FONT, spaced, fitFont, roundRect, hexA } from './celebrate.js';

const DAY = 864e5;
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export function weekStats(s, now = Date.now()) {
  const keys = Array.from({ length: 7 }, (_, i) => S.dayKey(S.addDays(new Date(now), i - 6)));
  const prev = Array.from({ length: 7 }, (_, i) => S.dayKey(S.addDays(new Date(now), i - 13)));
  const moods = (ks) => ks.map((k) => s.checkins[k]?.mood).filter((x) => typeof x === 'number' && x > 0);
  const crav = (ks) => ks.flatMap((k) => s.quits.map((q) => s.checkins[k]?.[q.id])).filter((x) => typeof x === 'number');
  const from = now - 7 * DAY;
  const cr = s.cravings.filter((c) => c.t > from && c.t <= now);
  const started = s.quits.filter((q) => S.quitStart(q).getTime() < now);
  const body = [];
  for (const q of started) {
    const t0 = S.quitStart(q).getTime();
    for (const x of healthFor(q) || []) {
      const at = t0 + x.h * 3600e3;
      if (x.h > 0 && at > from && at <= now) body.push({ ...x, at, q });
    }
  }
  body.sort((a, b) => b.at - a.at);
  const nextUp = started.flatMap((q) => (healthFor(q) || []).filter((x) => S.quitStart(q).getTime() + x.h * 3600e3 > now).slice(0, 1).map((x) => ({ ...x, q, at: S.quitStart(q).getTime() + x.h * 3600e3 })))
    .sort((a, b) => a.at - b.at)[0] || null;
  const longest = [...started].sort((a, b) => S.quitStart(a) - S.quitStart(b))[0];
  return {
    from, to: now,
    checkins: moods(keys).length,
    mood: avg(moods(keys)), moodPrev: avg(moods(prev)),
    craving: avg(crav(keys)), cravingPrev: avg(crav(prev)),
    beaten: cr.filter((c) => c.beaten).length, sos: cr.length,
    saved: started.reduce((a, q) => a + S.savedInWindow(q, from, now, now), 0),
    habits: s.goals.filter((g) => g.type === 'habit').reduce((a, g) => a + (g.ticks || []).filter((k) => keys.includes(k)).length, 0),
    body, nextUp,
    days: longest ? Math.floor(S.quitElapsed(longest, now) / DAY) : 0,
    longest,
  };
}

const moodOf = (v) => (v == null ? null : MOODS[Math.min(MOODS.length, Math.max(1, Math.round(v))) - 1]);
function trend(a, b, lowerIsBetter) {
  if (a == null || b == null || b === 0) return null;
  const ch = Math.round(((a - b) / b) * 100);
  if (Math.abs(ch) < 5) return { t: 'steady', good: null };
  return { t: `${ch < 0 ? 'down' : 'up'} ${Math.abs(ch)}%`, good: lowerIsBetter ? ch < 0 : ch > 0 };
}
const range = (a, b) => `${new Date(a).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${new Date(b).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;

export function openRecap() { haptic(); openSheet((close) => html`<${Recap} close=${close} />`, { tall: true }); }

function Recap({ close }) {
  const s = S.getState();
  const w = weekStats(s);
  const [, c1, c2] = PALETTES[s.social?.banner?.palette] || PALETTES[DEFAULT_BANNER.palette];
  const m = moodOf(w.mood);
  const ct = trend(w.craving, w.cravingPrev, true);
  const mt = trend(w.mood, w.moodPrev, false);
  const share = () => openImageShare(() => drawRecap(s, w), `My week in Novum: ${w.checkins} of 7 check-ins, ${w.beaten} cravings beaten, ${S.money(w.saved, 0)} saved`, 'Share your week');
  return html`
    <${SheetBar} title="Your week" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="rc-hero" style=${`--b1:${c1};--b2:${c2}`}>
        <div class="kicker">${range(w.from, w.to)}</div>
        <div class="rc-big">${w.longest ? html`Day <b>${w.days}</b> ${w.longest.label.toLowerCase()}-free` : 'Your week in Novum'}</div>
        <p class="rc-sub">${w.beaten ? `You beat ${w.beaten} craving${w.beaten === 1 ? '' : 's'} this week. That’s strength.` : w.checkins >= 5 ? 'You showed up nearly every day. That’s how change sticks.' : 'Every day you keep going counts. Here’s how this one went.'}</p>
      </div>
      <div class="tiles rc-tiles">
        <div class="tile rc-t1"><span class="tile-k">✍️ Check-ins</span><b>${w.checkins}/7</b><span class="tile-u">${w.checkins === 7 ? 'every single day' : 'days this week'}</span></div>
        <div class="tile rc-t2"><span class="tile-k">🛡️ Cravings beaten</span><b>${w.beaten}</b><span class="tile-u">${w.sos ? `of ${w.sos} in SOS` : 'none needed SOS'}</span></div>
        <div class="tile rc-t3"><span class="tile-k">💷 Saved</span><b>${S.money(w.saved, 0)}</b><span class="tile-u">this week</span></div>
        <div class="tile rc-t4"><span class="tile-k">${m ? m.e : '🙂'} Mood</span><b>${m ? m.l : '–'}</b><span class="tile-u">${mt ? `${mt.t} on last week` : 'on average'}</span></div>
      </div>
      ${ct && html`<div class="card pad rc-trend ${ct.good ? 'good' : ct.good === false ? 'bad' : ''}">
        <b>Cravings ${ct.t}</b> compared with the week before${ct.good ? '. They really do fade 💙' : ct.good === false ? '. Tough weeks happen; SOS is always one tap away.' : '.'}
      </div>`}
      ${w.body.length > 0 && html`<${Group} header="What your body did this week">
        ${w.body.slice(0, 6).map((x) => html`<div class="row" key=${x.q.id + x.h}>
          <span class="row-ic tint-ic" style=${`--c:${x.q.color}`}>${areaIcon(x.area)}</span>
          <span class="row-main"><span class="row-title">${x.title}</span><span class="row-sub">${x.text}</span></span>
        </div>`)}
      <//>`}
      ${w.nextUp && html`<p class="group-f rc-next">Next up: <b>${w.nextUp.title.toLowerCase()}</b> (${w.nextUp.q.label.toLowerCase()}), ${new Date(w.nextUp.at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}.</p>`}
      <button class="btn btn-primary block big mt8" onClick=${share}>Share my week</button>
    </div>`;
}

/* ---------- the share card: 1080×1920 ---------- */
export async function drawRecap(s, w) {
  const W = 1080, H = 1920;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const [, c1, c2] = PALETTES[s.social?.banner?.palette] || PALETTES[DEFAULT_BANNER.palette];
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0c1a33'); bg.addColorStop(0.5, '#060a14'); bg.addColorStop(1, '#04060b');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  paintBanner(ctx, s.social?.banner, 0, 0, W, 520, W / 360);
  const fade = ctx.createLinearGradient(0, 200, 0, 520);
  fade.addColorStop(0, 'rgba(6,10,20,0)'); fade.addColorStop(1, 'rgba(6,10,20,1)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, W, 522);
  ctx.textAlign = 'center';
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 18;
  ctx.fillStyle = '#fff'; ctx.font = `900 40px ${FONT}`; spaced(ctx, 'NOVUM', 540, 120, 16);
  ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = `800 40px ${FONT}`; spaced(ctx, 'MY WEEK', 540, 420, 12);
  ctx.fillStyle = '#fff';
  const head = w.longest ? `Day ${w.days} ${w.longest.label.toLowerCase()}-free` : 'My week in Novum';
  fitFont(ctx, head, 900, 92, 940); ctx.fillText(head, 540, 530);
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = `600 36px ${FONT}`; ctx.fillText(range(w.from, w.to), 540, 595);
  // 2×2 stat tiles, each with a gradient in the banner colours
  const m = moodOf(w.mood);
  const tiles = [
    ['✍️', `${w.checkins}/7`, 'check-ins'],
    ['🛡️', String(w.beaten), w.beaten === 1 ? 'craving beaten' : 'cravings beaten'],
    ['💷', S.money(w.saved, 0), 'saved'],
    [m ? m.e : '🙂', m ? m.l : '–', 'average mood'],
  ];
  const TW = 440, TH = 300, GX = 60, X0 = (W - TW * 2 - GX) / 2, Y0 = 670;
  tiles.forEach(([e, big, label], i) => {
    const x = X0 + (i % 2) * (TW + GX), y = Y0 + Math.floor(i / 2) * (TH + GX);
    const g = ctx.createLinearGradient(x, y, x + TW, y + TH);
    g.addColorStop(0, hexA(i % 2 ? c2 : c1, 0.42)); g.addColorStop(1, hexA(i % 2 ? c1 : c2, 0.12));
    roundRect(ctx, x, y, TW, TH, 48); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.textAlign = 'left'; ctx.font = `64px ${FONT}`; ctx.fillText(e, x + 40, y + 100);
    ctx.fillStyle = '#fff'; fitFont(ctx, big, 900, 96, TW - 80); ctx.fillText(big, x + 40, y + 205);
    ctx.fillStyle = 'rgba(255,255,255,0.65)'; ctx.font = `700 34px ${FONT}`; ctx.fillText(label, x + 40, y + 255);
  });
  // what my body did
  ctx.textAlign = 'center';
  let y = Y0 + TH * 2 + GX + 90;
  if (w.body.length) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = `800 32px ${FONT}`; spaced(ctx, 'MY BODY THIS WEEK', 540, y, 8);
    ctx.fillStyle = '#fff';
    for (const x of w.body.slice(0, 2)) { y += 74; const t = `${areaIcon(x.area)} ${x.title}`; fitFont(ctx, t, 800, 52, 940); ctx.fillText(t, 540, y); }
  } else {
    ctx.fillStyle = '#fff'; ctx.font = `800 52px ${FONT}`; ctx.fillText('One day at a time 💙', 540, y + 40);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = `500 36px ${FONT}`; ctx.fillText(SLOGAN, 540, 1760);
  ctx.fillStyle = '#5aaeff'; ctx.font = `800 36px ${FONT}`; ctx.fillText('novumdaily.com', 540, 1830);
  return new Promise((ok) => cv.toBlob((b) => ok(b), 'image/png'));
}
