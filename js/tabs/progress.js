// Progress tab: 2027 at a glance, tiles, charts and craving patterns.
import { useState } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, RingStack, Page, Segmented, LineChart, Legend, Icon, lazyOpen } from '../ui.js';
const openRecap = lazyOpen(() => import('../recap.js'), 'openRecap');
import { CATEGORIES, MOODS } from '../content.js';
import { DAY, pad2, NEW_YEAR, SLEEP } from '../shared.js';
import { Goals, openNewYear } from './goals.js';
import { openWeightSheet } from './me.js';
import { LungCard } from '../lungs.js';
import { WrappedCard } from '../wrapped-card.js';
import { CravingStats } from '../plans.js';

/* ============ PROGRESS ============ */
export function Progress({ s, go }) {
  const [range, setRange] = useState(30);
  const now = Date.now();
  const goals27 = s.goals.filter((g) => g.period === '2027');
  const byCat = CATEGORIES.map((c) => {
    const gs = goals27.filter((g) => g.category === c.id);
    return gs.length ? { ...c, pct: gs.reduce((a, g) => a + S.goalProgress(g, s).pct, 0) / gs.length, n: gs.length } : null;
  }).filter(Boolean);
  const overall = goals27.length ? goals27.reduce((a, g) => a + S.goalProgress(g, s).pct, 0) / goals27.length : 0;
  const yStart = NEW_YEAR.getTime();
  const dayOfYear = now >= yStart ? Math.min(365, Math.floor((now - yStart) / DAY) + 1) : 0;
  const toNY = Math.ceil((yStart - now) / DAY);
  const allProg = s.goals.map((g) => S.goalProgress(g, s));
  const complete = allProg.filter((p) => p.pct >= 1).length;
  const bestStreak = s.goals.filter((g) => g.type === 'habit').reduce((a, g) => Math.max(a, S.habitStreak(g).value), 0);
  const saved = s.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0);

  // chart data
  const keys = Array.from({ length: range }, (_, i) => S.dayKey(S.addDays(new Date(), i - range + 1)));
  const moodVals = keys.map((k) => s.checkins[k]?.mood ?? null);
  const cravSeries = s.quits.map((q) => ({ name: q.label, color: q.color, values: keys.map((k) => s.checkins[k]?.[q.id] ?? null) }));
  const ws = [...s.profile.weights].sort((a, b) => a.date.localeCompare(b.date));
  const wMin = ws.length ? Math.floor(Math.min(...ws.map((w) => w.kg)) - 2) : 60;
  const wMax = ws.length ? Math.ceil(Math.max(...ws.map((w) => w.kg)) + 2) : 80;

  // insight: avg craving, first 7 logged days vs last 7
  const insight = (() => {
    const logged = Object.keys(s.checkins).sort().filter((k) => s.quits.some((q) => s.checkins[k][q.id] != null));
    if (logged.length < 6) return null;
    const avg = (ks) => { const v = ks.flatMap((k) => s.quits.map((q) => s.checkins[k][q.id]).filter((x) => x != null)); return v.reduce((a, b) => a + b, 0) / v.length; };
    const half = Math.min(7, Math.floor(logged.length / 2));
    const a = avg(logged.slice(0, half)), b = avg(logged.slice(-half));
    if (a === 0) return null;
    const ch = Math.round(((b - a) / a) * 100);
    return ch < 0 ? `Cravings are down ${-ch}% compared with your first check-ins.` : ch > 0 ? `Cravings are up ${ch}% on your first check-ins. Tough patches are normal. Keep going.` : 'Cravings are holding steady.';
  })();

  // craving triggers, most common first
  const trigCount = {};
  s.cravings.forEach((c) => (c.triggers || []).forEach((t) => { trigCount[t] = (trigCount[t] || 0) + 1; }));
  const trig = Object.entries(trigCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const hours = Array(24).fill(0);
  s.cravings.forEach((c) => { hours[new Date(c.t).getHours()]++; });
  const ph = hours.indexOf(Math.max(...hours));
  const peakHour = `${pad2(ph)}:00–${pad2((ph + 1) % 24)}:00`;

  // monthly consistency in 2027 (days with a check-in or a habit tick)
  const activeDays = new Set([...Object.keys(s.checkins), ...s.goals.flatMap((g) => g.ticks || [])]);
  const months = Array.from({ length: 12 }, (_, m) => {
    const dim = new Date(2027, m + 1, 0).getDate();
    let c = 0; for (let d = 1; d <= dim; d++) if (activeDays.has(`2027-${pad2(m + 1)}-${pad2(d)}`)) c++;
    return { m, pct: c / dim, future: new Date(2027, m, 1) > now };
  });

  return html`<${Page} title="Progress">
    <${WrappedCard} />
    ${s.quits.length > 0 && html`<button class="card rc-card tap" onClick=${openRecap}>
      <span class="rc-card-ic">📅</span>
      <span class="row-main"><span class="row-title">Your week</span><span class="row-sub">Check-ins, cravings beaten, money saved and what your body did</span></span>
      <span class="row-chev">${Icon.chevron()}</span>
    </button>`}
    <section class="group">
      <h2 class="group-h">2027 at a glance</h2>
      <div class="card glance">
        ${goals27.length ? html`
          <div class="glance-top">
            <${RingStack} size=${150} stroke=${14} gap=${3} rings=${byCat.slice(0, 5).map((c) => ({ pct: c.pct, color: c.color }))}>
              <div class="gl-c"><b>${Math.round(overall * 100)}%</b><span>overall</span></div>
            <//>
            <div class="gl-legend">${byCat.map((c) => html`<div class="gl-li"><i style="background:${c.color}"></i><span>${c.label}</span><b>${Math.round(c.pct * 100)}%</b></div>`)}</div>
          </div>`
        : html`<div class="glance-empty"><p>Add goals for 2027 to see all your rings here.</p><button class="btn btn-primary sm" onClick=${openNewYear}>New Year ideas</button></div>`}
        <div class="year-bar">
          <div class="yb-t"><span>${dayOfYear ? `Day ${dayOfYear} of 365` : `2027 starts in ${toNY} day${toNY === 1 ? '' : 's'}`}</span><span>${Math.round((dayOfYear / 365) * 100)}% of the year</span></div>
          <div class="yb"><i style="width:${(dayOfYear / 365) * 100}%"></i></div>
        </div>
        <div class="months">${months.map((x) => html`<div class="mo ${x.future ? 'future' : ''}" title=${`${Math.round(x.pct * 100)}% of days active`}>
          <div class="mo-bar"><i style="height:${Math.max(x.future ? 0 : 4, x.pct * 100)}%"></i></div><span>${'JFMAMJJASOND'[x.m]}</span></div>`)}</div>
        <p class="tiny muted">Bars show the share of days each month with a check-in or a ticked habit.</p>
      </div>
    </section>

    <div class="tiles">
      ${s.quits.map((q) => html`<div class="tile"><span class="tile-k">${q.emoji} ${q.label}-free</span><b>${Math.floor(S.quitElapsed(q, now) / DAY)}</b><span class="tile-u">days</span></div>`)}
      <div class="tile"><span class="tile-k">💷 Saved</span><b>${S.money(saved, 0)}</b><span class="tile-u">so far</span></div>
      <div class="tile"><span class="tile-k">🎯 Goals</span><b>${complete}/${s.goals.length}</b><span class="tile-u">complete</span></div>
      <div class="tile"><span class="tile-k">🔥 Best streak</span><b>${bestStreak}</b><span class="tile-u">on a habit</span></div>
      <div class="tile"><span class="tile-k">✍️ Check-ins</span><b>${Object.keys(s.checkins).length}</b><span class="tile-u">logged</span></div>
      <div class="tile"><span class="tile-k">🛡️ Cravings beaten</span><b>${s.cravings.filter((c) => c.beaten).length}</b><span class="tile-u">with SOS</span></div>
      <div class="tile"><span class="tile-k">⏱️ SOS time</span><b>${Math.round(s.cravings.reduce((a, c) => a + (c.secs || 0), 0) / 60)}</b><span class="tile-u">minutes ridden out</span></div>
    </div>

    <${LungCard} s=${s} />

    <div class="pad-x mt16"><${Segmented} options=${[{ value: 14, label: '2 weeks' }, { value: 30, label: '30 days' }, { value: 90, label: '90 days' }]} value=${range} onChange=${setRange} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${LineChart} keys=${keys} series=${[{ name: 'Mood', color: '#5AC8FA', values: moodVals }]} yMin=${1} yMax=${5} yTicks=${[1, 3, 5]}
          yFmt=${(v) => MOODS[Math.round(v) - 1]?.e ?? v} height=${170} />
      </div>
    </section>

    ${cravSeries.length > 0 && html`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${cravSeries.length > 1 && html`<${Legend} series=${cravSeries} />`}
        <${LineChart} keys=${keys} series=${cravSeries} yMin=${0} yMax=${10} yTicks=${[0, 5, 10]} unit="/10" height=${190} />
        ${insight && html`<p class="insight">${insight}</p>`}
      </div>
    </section>`}

    <${CravingStats} s=${s} />

    <${CravingPatterns} s=${s} />

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Weight</h2><button class="link sm" onClick=${openWeightSheet}>Log weight</button></div>
      <div class="card chart-card">
        ${ws.length >= 2
          ? html`<${LineChart} keys=${ws.map((w) => w.date)} series=${[{ name: 'Weight', color: '#FF375F', values: ws.map((w) => w.kg) }]}
              yMin=${wMin} yMax=${wMax} yTicks=${[wMin, Math.round((wMin + wMax) / 2), wMax]} unit=" kg" height=${170} />`
          : html`<p class="muted pad">Log your weight now and then to see a trend. Latest: <b>${S.latestWeight(s.profile)?.toFixed(1) ?? '–'} kg</b>.</p>`}
      </div>
    </section>
  <//>`;
}

/* ============ CRAVING PATTERNS ============ */
export const BLOCKS = ['12–4am', '4–8am', '8am–12', '12–4pm', '4–8pm', '8pm–12'];

export const WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CravingPatterns({ s }) {
  // when: SOS cravings and slips, by weekday and time of day
  const times = [
    ...s.cravings.map((c) => new Date(c.t)),
    ...s.quits.flatMap((q) => (q.resets || []).map((r) => S.parseLocal(r.to))),
  ];
  const grid = Array.from({ length: 7 }, () => Array(6).fill(0));
  times.forEach((d) => { grid[(d.getDay() + 6) % 7][Math.floor(d.getHours() / 4)]++; });
  const max = Math.max(1, ...grid.flat());
  let peak = null;
  grid.forEach((row, w) => row.forEach((n, b) => { if (n && (!peak || n > peak.n)) peak = { n, w, b }; }));

  // what: SOS triggers and slip triggers
  const trigCount = {};
  s.cravings.forEach((c) => (c.triggers || []).forEach((t) => { trigCount[t] = (trigCount[t] || 0) + 1; }));
  s.quits.forEach((q) => (q.resets || []).forEach((r) => (r.triggers || []).forEach((t) => { trigCount[t] = (trigCount[t] || 0) + 1; })));
  const trig = Object.entries(trigCount).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // sleep: average craving the day after each kind of night
  const bySleep = SLEEP.map(() => []);
  Object.values(s.checkins).forEach((c) => {
    if (!c.sleep) return;
    const v = s.quits.map((q) => c[q.id]).filter((x) => typeof x === 'number');
    if (v.length) bySleep[c.sleep - 1].push(v.reduce((a, b) => a + b, 0) / v.length);
  });
  const avgs = bySleep.map((v) => (v.length ? v.reduce((a, b) => a + b, 0) / v.length : null));
  const poor = [...bySleep[0], ...bySleep[1]], good = [...bySleep[3], ...bySleep[4]];
  const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
  const sleepInsight = poor.length >= 2 && good.length >= 2
    ? `After good sleep your cravings average ${mean(good).toFixed(1)}/10, against ${mean(poor).toFixed(1)}/10 after a bad night.`
    : null;
  const hasSleep = avgs.filter((x) => x != null).length >= 2;

  if (times.length < 3 && !trig.length && !hasSleep) return null;
  return html`
    ${times.length >= 3 && html`<section class="group">
      <h2 class="group-h">When cravings hit</h2>
      <div class="card pad heatmap">
        <div class="heat-grid">
          <span></span>${BLOCKS.map((b) => html`<span class="heat-h" key=${b}>${b}</span>`)}
          ${grid.map((row, w) => html`<span class="heat-w" key=${'w' + w}>${WD[w]}</span>${row.map((n, b) => html`<i key=${w + '-' + b} title=${`${WD[w]} ${BLOCKS[b]}: ${n}`}
            style=${`--a:${n ? 0.18 + (n / max) * 0.82 : 0}`} class=${n ? 'on' : ''}>${n || ''}</i>`)}`)}
        </div>
        <p class="tiny muted">${peak ? `Your toughest time is ${WD[peak.w]} ${BLOCKS[peak.b]}. Plan something for then.` : ''} From ${times.length} craving${times.length === 1 ? '' : 's'} and slips you logged.</p>
      </div>
    </section>`}

    ${trig.length > 0 && html`<section class="group">
      <h2 class="group-h">What sets cravings off</h2>
      <div class="card pad bars">
        ${trig.map(([name, n]) => html`<div class="bar-row" key=${name}>
          <span class="bar-l">${name}</span>
          <span class="bar-t"><i style="width:${(n / trig[0][1]) * 100}%"></i></span>
          <b>${n}</b>
        </div>`)}
        <p class="tiny muted">From Craving SOS and any slips you logged.</p>
      </div>
    </section>`}

    ${hasSleep && html`<section class="group">
      <h2 class="group-h">Sleep and cravings</h2>
      <div class="card pad bars">
        ${SLEEP.map((l, i) => avgs[i] != null && html`<div class="bar-row" key=${l}>
          <span class="bar-l">${l} sleep</span>
          <span class="bar-t"><i style="width:${(avgs[i] / 10) * 100}%;background:#BF5AF2"></i></span>
          <b>${avgs[i].toFixed(1)}</b>
        </div>`)}
        <p class="tiny muted">${sleepInsight || 'Average craving (out of 10) on days after each kind of night. Keep logging sleep to see a pattern.'}</p>
      </div>
    </section>`}`;
}
