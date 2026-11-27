import { render, useState, useEffect, useLayoutEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import {
  html, haptic, useNow, Icon, Ring, RingStack, openSheet, SheetHost, SheetBar, Page, Segmented, Toggle,
  Group, Row, Field, LineChart, Legend, Empty, toast,
} from './ui.js';
import { MILESTONES, HEALTH, HEALTH_NOTE, CATEGORIES, catById, COLORS, EMOJIS, PRESETS, MOODS, TRIGGERS, DISTRACTIONS, REASON_IDEAS } from './content.js';
import { pushConfigured, pushSupported, isStandalone, isIOS, permission, enablePush, disablePush, sendTest, startPushSync } from './push.js';

const DAY = 864e5;
const pad2 = (n) => String(n).padStart(2, '0');
const NEW_YEAR = new Date(2027, 0, 1);
const TABS = [
  { id: 'home', label: 'Home', icon: Icon.home },
  { id: 'checkin', label: 'Check-in', icon: Icon.checkin },
  { id: 'goals', label: 'Goals', icon: Icon.goals },
  { id: 'progress', label: 'Progress', icon: Icon.progress },
  { id: 'profile', label: 'Profile', icon: Icon.profile },
];

/* ============ shared helpers ============ */
function fmtLeft(days) {
  if (days < 1) { const h = Math.max(1, Math.ceil(days * 24)); return `${h} hr${h === 1 ? '' : 's'}`; }
  const d = Math.ceil(days); return `${d} day${d === 1 ? '' : 's'}`;
}
const RING_LABEL = { 1: '1 day', 3: '3 days', 7: '1 wk', 14: '2 wks', 30: '1 mo', 90: '3 mo', 182: '6 mo', 365: '1 yr' };
// Compact time-left label for the ring centre: "14d" or "5h"
const ringLeft = (days) => (days < 1 ? `${Math.max(1, Math.ceil(days * 24))}h` : `${Math.ceil(days)}d`);
function milestoneInfo(days) {
  const next = MILESTONES.find((m) => m.days > days);
  const prev = [...MILESTONES].reverse().find((m) => m.days <= days);
  const from = prev ? prev.days : 0;
  return { next, prev, pct: next ? (days - from) / (next.days - from) : 1 };
}
function stageInfo(quitId, hours) {
  const list = HEALTH[quitId] || [];
  const reached = list.filter((x) => x.h <= hours);
  return { current: reached[reached.length - 1], next: list.find((x) => x.h > hours) };
}
const deadlineText = (g) => (g.period === '2027' ? 'All of 2027' : `By ${S.fmtDate(g.end)}`);
const typeText = (g) => ({ habit: g.perWeek >= 7 ? 'Daily habit' : `${g.perWeek}× a week`, numeric: 'Target', milestone: 'Milestone', quit: 'Stay quit' }[g.type]);

function toggleTick(goalId, key = S.dayKey()) {
  haptic(12);
  S.update((d) => {
    const g = d.goals.find((x) => x.id === goalId);
    if (!g) return;
    const t = new Set(g.ticks || []);
    t.has(key) ? t.delete(key) : t.add(key);
    g.ticks = [...t].sort();
  });
}

function confirmSheet({ title, text, confirm, danger = true, onConfirm }) {
  openSheet((close) => html`
    <${SheetBar} title=${title} right=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="confirm-text">${text}</p>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} block" onClick=${() => { haptic(15); onConfirm(); close(); }}>${confirm}</button>
      <button class="btn btn-plain block" onClick=${close}>Cancel</button>
    </div>`);
}

/* ============ HOME ============ */
function Home({ s, go }) {
  const now = useNow(1000);
  const today = S.dayKey();
  const ci = s.checkins[today];
  const totalSaved = s.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0);
  const monthly = s.quits.reduce((a, q) => a + (q.monthly || 0), 0);
  const hr = new Date(now).getHours();
  const greet = hr < 5 ? 'Up late' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  const habits = s.goals.filter((g) => g.type === 'habit');
  const sameStart = s.quits.every((q) => q.start === s.quits[0].start);
  const [badgeQuit, setBadgeQuit] = useState(s.quits[0].id);
  const bq = s.quits.find((q) => q.id === badgeQuit) || s.quits[0];
  const bDays = S.quitElapsed(bq, now) / DAY;
  const toNY = Math.ceil((NEW_YEAR - now) / DAY);

  return html`<${Page} title="Novum" eyebrow=${new Date(now).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
      sub="A new beginning. A new standard. A new you.">
    <p class="greet">${greet}, ${s.profile.name}.</p>

    <div class="stack">
      ${s.quits.map((q) => html`<${QuitCard} key=${q.id} q=${q} now=${now} />`)}
    </div>

    <${SosButton} />
    ${s.reasons.length > 0 && html`<button class="why tap" onClick=${openReasons}>
      <span class="why-k">Remember why</span>
      <span class="why-t">“${s.reasons[Math.floor(now / 864e5) % s.reasons.length].text}”</span>
    </button>`}

    <button class="card money-card tap" onClick=${() => go('profile')}>
      <div class="mc-l">
        <div class="kicker">${Icon.pound()} Money saved</div>
        <div class="mc-big">${S.money(totalSaved)}</div>
        <div class="mc-sub">${S.money(monthly, 0)} a month back in your pocket · ${S.money(monthly * 12, 0)} a year</div>
      </div>
    </button>

    <section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!sameStart && html`<${Segmented} small options=${s.quits.map((q) => ({ value: q.id, label: q.label }))} value=${bq.id} onChange=${setBadgeQuit} />`}
      </div>
      <div class="badges">
        ${MILESTONES.map((m) => {
          const got = bDays >= m.days;
          return html`<div class="badge ${got ? 'got' : ''}">
            <div class="badge-medal">${got ? Icon.check() : m.short}</div>
            <div class="badge-l">${m.label}</div>
            <div class="badge-s">${got ? 'Earned' : `in ${fmtLeft(m.days - bDays)}`}</div>
          </div>`;
        })}
      </div>
      ${sameStart && s.quits.length > 1 && html`<p class="group-f">Counting for both quits, since you stopped on the same day.</p>`}
    </section>

    <section class="group">
      <h2 class="group-h">Today</h2>
      <button class="card checkin-card tap" onClick=${() => go('checkin')}>
        ${ci && ci.mood ? html`
          <span class="cc-emoji">${MOODS[ci.mood - 1].e}</span>
          <span class="cc-main"><b>Checked in · feeling ${MOODS[ci.mood - 1].l.toLowerCase()}</b>
            <span>${s.quits.map((q) => `${q.label} craving ${ci[q.id] ?? '–'}/10`).join(' · ')}</span></span>`
        : html`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${Icon.chevron()}</span>
      </button>
      ${habits.length > 0 && html`<div class="card list mt8">
        ${habits.map((g) => html`<${HabitTickRow} key=${g.id} g=${g} />`)}
      </div>`}
    </section>

    <section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${s.quits.map((q) => {
          const h = S.quitElapsed(q, now) / 36e5;
          const st = stageInfo(q.id, h);
          return html`<button class="row tap body-row" onClick=${() => openTimeline(q.id)}>
            <span class="row-ic" style="background:${q.color}">${q.emoji}</span>
            <span class="row-main">
              <span class="row-title">${st.current ? st.current.title : 'Just getting started'}</span>
              <span class="row-sub">${st.current ? st.current.text : 'Your first changes start within hours.'}</span>
              ${st.next && html`<span class="row-next">Next: ${st.next.title.toLowerCase()} in ${fmtLeft(st.next.h / 24 - h / 24)}</span>`}
            </span>
            <span class="row-chev">${Icon.chevron()}</span>
          </button>`;
        })}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>

    ${toNY > 0 ? html`
      <button class="card ny-card tap" onClick=${openNewYear}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${toNY} day${toNY === 1 ? '' : 's'} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`
    : html`<button class="card ny-card tap" onClick=${() => go('progress')}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`;
}

function QuitCard({ q, now }) {
  const ms = S.quitElapsed(q, now);
  const { d, h, m, s: sec } = S.splitDuration(ms);
  const days = ms / DAY;
  const mi = milestoneInfo(days);
  return html`<button class="card quit-card tap" onClick=${() => openQuitEditor(q.id)} style="--qc:${q.color}">
    <div class="qc-head"><span class="qc-emoji">${q.emoji}</span><span class="qc-label">${q.label}-free</span>
      <span class="qc-saved">${S.money(S.savedFor(q, ms))} saved</span></div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${d}</b><small>${d === 1 ? 'day' : 'days'}</small></span>
        <span><b>${pad2(h)}</b><small>hrs</small></span>
        <span><b>${pad2(m)}</b><small>min</small></span>
        <span class="qc-sec"><b>${pad2(sec)}</b><small>sec</small></span>
      </div>
      <${Ring} pct=${mi.pct} size=${70} stroke=${8} color=${q.color}>
        ${mi.next
          ? html`<span class="ring-txt"><b>${ringLeft(mi.next.days - days)}</b><small>to ${RING_LABEL[mi.next.days]}</small></span>`
          : html`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${mi.next ? `Next milestone: ${mi.next.label}, in ${fmtLeft(mi.next.days - days)}` : 'Every milestone earned. Legend.'}</div>
  </button>`;
}

function HabitTickRow({ g }) {
  const done = (g.ticks || []).includes(S.dayKey());
  const st = S.habitStreak(g);
  return html`<div class="row">
    <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
    <span class="row-main"><span class="row-title">${g.name}</span>
      <span class="row-sub">${st.value > 0 ? `🔥 ${st.value} ${st.unit} streak` : typeText(g)}</span></span>
    <button class="tick ${done ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${done} aria-label=${`Mark ${g.name} done today`}
      onClick=${(e) => { e.stopPropagation(); toggleTick(g.id); }}>${Icon.check()}</button>
  </div>`;
}

/* ============ CHECK-IN ============ */
const SLEEP = ['Bad', 'Poor', 'OK', 'Good', 'Great'];
function CheckIn({ s }) {
  const todayKey = S.dayKey();
  const [day, setDay] = useState(todayKey);
  const entry = s.checkins[day] || {};
  const set = (patch) => S.update((d) => { d.checkins[day] = { ...(d.checkins[day] || {}), ...patch, t: Date.now() }; });
  const shift = (n) => { const k = S.dayKey(S.addDays(S.parseDay(day), n)); if (k <= todayKey) { haptic(); setDay(k); } };
  const isToday = day === todayKey;
  const habits = s.goals.filter((g) => g.type === 'habit');
  const recent = Object.keys(s.checkins).sort().reverse().slice(0, 7);
  const cravingWord = (v) => (v == null ? 'Not logged' : v === 0 ? 'None' : v <= 3 ? 'Mild' : v <= 6 ? 'Noticeable' : v <= 8 ? 'Strong' : 'Intense');

  return html`<${Page} title="Check-in" sub="A quick daily log. Patterns show up in Progress.">
    <div class="day-nav card">
      <button class="icon-btn" onClick=${() => shift(-1)} aria-label="Previous day">${Icon.left()}</button>
      <div class="day-nav-t"><b>${isToday ? 'Today' : S.fmtDate(day, { weekday: 'long' })}</b><span>${S.fmtDate(day, { day: 'numeric', month: 'long' })}</span></div>
      <button class="icon-btn" onClick=${() => shift(1)} disabled=${isToday} aria-label="Next day">${Icon.chevron()}</button>
    </div>

    <${Group} header="Mood">
      <div class="moods">
        ${MOODS.map((m) => html`<button class="mood ${entry.mood === m.v ? 'on' : ''}" onClick=${() => { haptic(10); set({ mood: m.v }); }} aria-pressed=${entry.mood === m.v}>
          <span class="mood-e">${m.e}</span><span class="mood-l">${m.l}</span></button>`)}
      </div>
    <//>

    <${SosButton} compact />

    <${Group} header="Cravings" footer="0 = none, 10 = the strongest you’ve felt. Cravings usually pass within 5–10 minutes.">
      ${s.quits.map((q) => html`<div class="slider-row">
        <div class="slider-top"><span>${q.emoji} ${q.label}</span><span class="slider-v"><b>${entry[q.id] ?? '–'}</b> ${cravingWord(entry[q.id])}</span></div>
        <input type="range" min="0" max="10" step="1" value=${entry[q.id] ?? 0} style="--c:${q.color};--p:${((entry[q.id] ?? 0) / 10) * 100}%"
          class=${entry[q.id] == null ? 'unset' : ''} aria-label=${`${q.label} craving`}
          onInput=${(e) => { const v = +e.target.value; if (v !== entry[q.id]) { haptic(4); set({ [q.id]: v }); } }} />
      </div>`)}
    <//>

    <${Group} header="Sleep last night">
      <div class="pad"><${Segmented} options=${SLEEP.map((l, i) => ({ value: i + 1, label: l }))} value=${entry.sleep} onChange=${(v) => set({ sleep: v })} /></div>
    <//>

    <${Group} header="Notes">
      <textarea class="note" rows="3" placeholder="Triggers, wins, how the day went…" value=${entry.note || ''}
        onInput=${(e) => set({ note: e.target.value })}></textarea>
    <//>

    ${habits.length > 0 && html`<${Group} header=${isToday ? 'Habits today' : 'Habits that day'}>
      ${habits.map((g) => {
        const done = (g.ticks || []).includes(day);
        return html`<div class="row" key=${g.id}>
          <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
          <span class="row-main"><span class="row-title">${g.name}</span><span class="row-sub">${typeText(g)}</span></span>
          <button class="tick ${done ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${done} onClick=${() => toggleTick(g.id, day)}>${Icon.check()}</button>
        </div>`;
      })}
    <//>`}

    ${recent.length > 0 && html`<${Group} header="Recent">
      ${recent.map((k) => {
        const c = s.checkins[k];
        return html`<${Row} key=${k} icon=${c.mood ? MOODS[c.mood - 1].e : '·'} iconBg="var(--fill)"
          title=${k === todayKey ? 'Today' : S.fmtDate(k, { weekday: 'short', day: 'numeric', month: 'short' })}
          sub=${[...s.quits.map((q) => (c[q.id] != null ? `${q.label} ${c[q.id]}/10` : null)), c.sleep ? `Sleep ${SLEEP[c.sleep - 1].toLowerCase()}` : null].filter(Boolean).join(' · ') || 'No details'}
          chevron onClick=${() => { haptic(); setDay(k); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />`;
      })}
    <//>`}
  <//>`;
}

/* ============ GOALS ============ */
function Goals({ s }) {
  const [filter, setFilter] = useState('active');
  const all = s.goals.map((g) => ({ g, p: S.goalProgress(g, s) }));
  const list = all.filter(({ p }) => (filter === 'done' ? p.pct >= 1 : filter === 'active' ? p.pct < 1 : true));
  const addBtn = html`<button class="icon-btn accent" onClick=${() => openGoalEditor()} aria-label="New goal">${Icon.plus()}</button>`;

  return html`<${Page} title="Goals" right=${addBtn}>
    <button class="card ny-mini tap" onClick=${openNewYear}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${Icon.chevron()}</span>
    </button>

    ${s.goals.length === 0 ? html`<${Empty} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${html`<div class="empty-actions"><button class="btn btn-primary" onClick=${openNewYear}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${() => openGoalEditor()}>Create your own</button></div>`} />`
    : html`
      <div class="pad-x mb12"><${Segmented} options=${[{ value: 'active', label: 'Active' }, { value: 'done', label: 'Complete' }, { value: 'all', label: 'All' }]} value=${filter} onChange=${setFilter} /></div>
      ${list.length === 0 && html`<p class="muted center pad">${filter === 'done' ? 'Nothing complete yet. You’ll get there.' : 'Everything’s complete. Time for a new goal?'}</p>`}
      ${CATEGORIES.map((c) => {
        const items = list.filter(({ g }) => g.category === c.id);
        if (!items.length) return null;
        return html`<${Group} key=${c.id} header=${c.label}>
          ${items.map(({ g, p }) => html`<${GoalRow} key=${g.id} g=${g} p=${p} />`)}
        <//>`;
      })}`}
  <//>`;
}

function GoalRow({ g, p }) {
  const today = (g.ticks || []).includes(S.dayKey());
  return html`<div class="row tap goal-row" role="button" tabindex="0" onClick=${() => openGoalDetail(g.id)}>
    <${Ring} pct=${p.pct} size=${46} stroke=${5} color=${g.color}><span class="ring-emoji">${g.emoji}</span><//>
    <span class="row-main">
      <span class="row-title">${g.name}</span>
      <span class="row-sub">${p.label} · ${deadlineText(g)}</span>
    </span>
    ${g.type === 'habit'
      ? html`<button class="tick ${today ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${today} aria-label="Done today"
          onClick=${(e) => { e.stopPropagation(); toggleTick(g.id); }}>${Icon.check()}</button>`
      : html`<span class="row-detail">${Math.round(p.pct * 100)}%</span><span class="row-chev">${Icon.chevron()}</span>`}
  </div>`;
}

function openGoalDetail(id) { openSheet((close) => html`<${GoalDetail} id=${id} close=${close} />`, { tall: true }); }

function GoalDetail({ id, close }) {
  const s = S.getState();
  const g = s.goals.find((x) => x.id === id);
  const [val, setVal] = useState('');
  if (!g) return html`<${SheetBar} title="Goal" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const p = S.goalProgress(g, s);
  const cat = catById(g.category);
  const todayKey = S.dayKey();
  const del = () => confirmSheet({
    title: 'Delete goal', text: `Delete “${g.name}”? Its history will be removed too.`, confirm: 'Delete goal',
    onConfirm: () => { close(); S.update((d) => { d.goals = d.goals.filter((x) => x.id !== id); }); toast('Goal deleted'); },
  });
  const addEntry = () => {
    const v = parseFloat(val);
    if (Number.isNaN(v)) return;
    haptic(12);
    S.update((d) => { const x = d.goals.find((y) => y.id === id); x.entries = [...(x.entries || []), { id: S.uid(), date: todayKey, value: v }]; });
    setVal('');
  };

  let body = null;
  if (g.type === 'habit') {
    const done = (g.ticks || []).includes(todayKey);
    const st = S.habitStreak(g);
    const wk = S.weekTicks(g);
    const wkDone = wk.filter((x) => x.done).length;
    const ws = S.weekStart(new Date());
    const weeks = Array.from({ length: 12 }, (_, i) => S.addDays(ws, -7 * (11 - i)));
    const ticks = new Set(g.ticks || []);
    body = html`
      <button class="btn block big ${done ? 'btn-done' : 'btn-primary'}" style="--c:${g.color}" onClick=${() => toggleTick(id)}>
        ${done ? html`${Icon.check()} Done today` : 'Mark done today'}</button>
      <div class="stats3">
        <div><b>${st.value}</b><span>${st.unit} streak</span></div>
        ${g.perWeek >= 7 ? html`<div><b>${S.bestDailyStreak(g)}</b><span>best streak</span></div>` : html`<div><b>${wkDone}/${g.perWeek}</b><span>this week</span></div>`}
        <div><b>${(g.ticks || []).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${wk.map((x, i) => html`<button class="wd ${x.done ? 'on' : ''} ${x.key === todayKey ? 'today' : ''}" style="--c:${g.color}"
          disabled=${x.key > todayKey} onClick=${() => toggleTick(id, x.key)}><span>${'MTWTFSS'[i]}</span><i>${x.done ? Icon.check() : ''}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${g.color}">
          ${weeks.map((w) => html`<div class="heat-col">${Array.from({ length: 7 }, (_, d) => {
            const k = S.dayKey(S.addDays(w, d));
            return html`<i class="${ticks.has(k) ? 'on' : ''} ${k > todayKey ? 'future' : ''}" title=${S.fmtDate(k)}></i>`;
          })}</div>`)}
        </div>
      </div>`;
  } else if (g.type === 'numeric' && g.auto === 'money') {
    body = html`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it.${g.period === '2027' && Date.now() < NEW_YEAR ? ' Counting starts on 1 January 2027.' : ''}</div>`;
  } else if (g.type === 'numeric' && g.auto === 'weight') {
    body = html`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${openWeightSheet}>Log weight</button>`;
  } else if (g.type === 'numeric') {
    const entries = [...(g.entries || [])].reverse();
    body = html`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${g.mode === 'level' ? `New value${g.unit ? ' (' + g.unit + ')' : ''}` : `Add amount${g.unit ? ' (' + g.unit + ')' : ''}`}
          value=${val} onInput=${(e) => setVal(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && addEntry()} />
        <button class="btn btn-primary sm" disabled=${val === ''} onClick=${addEntry}>${g.mode === 'level' ? 'Log' : 'Add'}</button>
      </div>
      ${entries.length > 0 && html`<${Group} header="History">
        ${entries.slice(0, 30).map((e) => html`<div class="row" key=${e.id}>
          <span class="row-main"><span class="row-title">${g.mode === 'level' ? '' : '+'}${e.value}${g.unit ? ' ' + g.unit : ''}</span><span class="row-sub">${S.fmtDate(e.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${() => S.update((d) => { const x = d.goals.find((y) => y.id === id); x.entries = x.entries.filter((y) => y.id !== e.id); })}>${Icon.trash()}</button>
        </div>`)}
      <//>`}`;
  } else if (g.type === 'quit') {
    const q = s.quits.find((x) => x.id === g.quitId) || s.quits[0];
    body = html`<div class="card pad info">${q.emoji} Linked to your ${q.label.toLowerCase()} counter. Every day you stay ${q.label.toLowerCase()}-free ${g.period === '2027' ? 'in 2027 ' : ''}fills this ring. ${Date.now() < NEW_YEAR && g.period === '2027' ? 'It starts on 1 January.' : ''}</div>`;
  } else {
    body = html`<button class="btn block big ${g.done ? 'btn-done' : 'btn-primary'}" style="--c:${g.color}"
      onClick=${() => { haptic(15); S.update((d) => { const x = d.goals.find((y) => y.id === id); x.done = !x.done; x.doneDate = x.done ? todayKey : null; }); if (!g.done) toast('Milestone complete 🎉'); }}>
      ${g.done ? html`${Icon.check()} Completed` : 'Mark as complete'}</button>`;
  }

  return html`
    <${SheetBar} left=${html`<button class="link" onClick=${() => openGoalEditor(g)}>Edit</button>`}
      right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${Ring} pct=${p.pct} size=${168} stroke=${18} color=${g.color}>
          <div class="dh-in"><span class="dh-e">${g.emoji}</span><b>${Math.round(p.pct * 100)}%</b></div>
        <//>
        <h2 class="dh-name">${g.name}</h2>
        <div class="dh-label">${p.label} <span class="muted">${p.sub}</span></div>
        <div class="chips"><span class="chip" style="--c:${cat.color}">${cat.label}</span><span class="chip">${typeText(g)}</span><span class="chip">${deadlineText(g)}</span></div>
      </div>
      ${body}
      <button class="btn btn-plain danger block mt16" onClick=${del}>Delete goal</button>
    </div>`;
}

function openGoalEditor(goal) { openSheet((close) => html`<${GoalEditor} goal=${goal} close=${close} />`, { tall: true }); }

function GoalEditor({ goal = {}, close }) {
  const isEdit = !!goal.id;
  const [f, setF] = useState(() => ({
    name: '', emoji: '🎯', color: '#3B9BFF', category: 'habits', type: 'habit', perWeek: 7, period: '2027', end: '2027-12-31',
    mode: 'sum', auto: '', unit: '', target: '', startValue: '', quitId: 'vape', ...goal,
  }));
  const set = (patch) => setF((x) => ({ ...x, ...patch }));
  const s = S.getState();
  const track = f.auto === 'money' ? 'money' : f.auto === 'weight' ? 'weight' : f.mode === 'level' ? 'level' : 'sum';
  const setTrack = (t) => set(t === 'money' ? { auto: 'money', unit: '£', mode: 'sum', quitId: 'all' }
    : t === 'weight' ? { auto: 'weight', unit: 'kg', mode: 'level', startValue: f.startValue === '' ? +(S.latestWeight(s.profile) || 0).toFixed(1) : f.startValue }
      : { auto: '', mode: t, unit: f.auto ? '' : f.unit });
  const numOk = f.type !== 'numeric' || (f.target !== '' && !Number.isNaN(parseFloat(f.target)));
  const valid = f.name.trim() && numOk && (f.period === '2027' || f.end);

  const save = () => {
    if (!valid) return;
    haptic(15);
    const clean = { ...f, name: f.name.trim(), target: f.target === '' ? '' : parseFloat(f.target), startValue: f.startValue === '' ? '' : parseFloat(f.startValue) };
    S.update((d) => {
      if (isEdit) { const i = d.goals.findIndex((x) => x.id === goal.id); if (i >= 0) d.goals[i] = { ...d.goals[i], ...clean }; }
      else d.goals.push({ ticks: [], entries: [], ...clean, id: S.uid(), start: S.dayKey(), createdAt: new Date().toISOString() });
    });
    close();
    toast(isEdit ? 'Goal updated' : 'Goal added');
  };

  return html`
    <${SheetBar} title=${isEdit ? 'Edit goal' : 'New goal'}
      left=${html`<button class="link" onClick=${close}>Cancel</button>`}
      right=${html`<button class="link b" disabled=${!valid} onClick=${save}>${isEdit ? 'Save' : 'Add'}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${f.color}">${f.emoji}</div>
        <input class="eh-name" placeholder="Goal name" value=${f.name} onInput=${(e) => set({ name: e.target.value })} maxlength="60" />
      </div>

      <${Group} header="Icon">
        <div class="emoji-grid">${EMOJIS.map((e) => html`<button class="emo ${f.emoji === e ? 'on' : ''}" onClick=${() => { haptic(); set({ emoji: e }); }}>${e}</button>`)}</div>
      <//>
      <${Group} header="Colour">
        <div class="swatches">${COLORS.map((c) => html`<button class="sw ${f.color === c ? 'on' : ''}" style="--c:${c}" aria-label=${c} onClick=${() => { haptic(); set({ color: c }); }}></button>`)}</div>
      <//>
      <${Group} header="Category">
        <div class="chip-row">${CATEGORIES.map((c) => html`<button class="chip big ${f.category === c.id ? 'on' : ''}" style="--c:${c.color}" onClick=${() => { haptic(); set({ category: c.id }); }}>${c.label}</button>`)}</div>
      <//>

      <${Group} header="Type" footer=${{ habit: 'Tick it off on the days you do it. Builds a streak.', numeric: 'Work towards a number, like km run, money saved or a weight.', milestone: 'A one-off achievement you mark as done.', quit: 'Fills automatically every day you stay quit.' }[f.type]}>
        <div class="pad"><${Segmented} options=${[{ value: 'habit', label: 'Habit' }, { value: 'numeric', label: 'Target' }, { value: 'milestone', label: 'Milestone' }, { value: 'quit', label: 'Stay quit' }]}
          value=${f.type} onChange=${(v) => set({ type: v })} /></div>
        ${f.type === 'habit' && html`<div class="row">
          <span class="row-main"><span class="row-title">How often</span></span>
          <div class="stepper">
            <button onClick=${() => { haptic(); set({ perWeek: Math.max(1, f.perWeek - 1) }); }} aria-label="Less often">−</button>
            <span>${f.perWeek >= 7 ? 'Every day' : `${f.perWeek}× a week`}</span>
            <button onClick=${() => { haptic(); set({ perWeek: Math.min(7, f.perWeek + 1) }); }} aria-label="More often">+</button>
          </div>
        </div>`}
        ${f.type === 'numeric' && html`
          <div class="pad"><${Segmented} small options=${[{ value: 'sum', label: 'Add up' }, { value: 'level', label: 'Reach' }, { value: 'money', label: '£ Saved' }, { value: 'weight', label: 'Weight' }]}
            value=${track} onChange=${setTrack} /></div>
          ${!f.auto && html`<${Field} label="Unit"><input placeholder="km, books, hours…" value=${f.unit} onInput=${(e) => set({ unit: e.target.value })} /><//>`}
          ${(track === 'level' || track === 'weight') && html`<${Field} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${f.startValue} onInput=${(e) => set({ startValue: e.target.value })} /><//>`}
          <${Field} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${track === 'money' ? '1000' : '100'} value=${f.target} onInput=${(e) => set({ target: e.target.value })} /><//>
          ${track === 'money' && html`<div class="pad"><${Segmented} small options=${[{ value: 'all', label: 'Both' }, ...s.quits.map((q) => ({ value: q.id, label: q.label }))]} value=${f.quitId || 'all'} onChange=${(v) => set({ quitId: v })} /></div>`}`}
        ${f.type === 'quit' && html`<div class="pad"><${Segmented} options=${s.quits.map((q) => ({ value: q.id, label: `${q.emoji} ${q.label}` }))} value=${f.quitId} onChange=${(v) => set({ quitId: v })} /></div>`}
      <//>

      <${Group} header="Deadline">
        <div class="pad"><${Segmented} options=${[{ value: '2027', label: 'All of 2027' }, { value: 'date', label: 'Pick a date' }]} value=${f.period} onChange=${(v) => set({ period: v })} /></div>
        ${f.period === 'date' && html`<${Field} label="Finish by"><input type="date" value=${f.end} min=${S.dayKey()} onInput=${(e) => set({ end: e.target.value })} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!valid} onClick=${save}>${isEdit ? 'Save changes' : 'Add goal'}</button>
    </div>`;
}

function openNewYear() { openSheet((close) => html`<${NewYear} close=${close} />`, { tall: true }); }
function NewYear({ close }) {
  const s = S.getState();
  const toNY = Math.ceil((NEW_YEAR - Date.now()) / DAY);
  const added = new Set(s.goals.map((g) => g.preset).filter(Boolean));
  const quickAdd = (p) => {
    haptic(15);
    S.update((d) => d.goals.push({ ticks: [], entries: [], ...p.make(d), preset: p.key, id: S.uid(), start: S.dayKey(), createdAt: new Date().toISOString() }));
    toast('Added to your goals');
  };
  const desc = (g) => g.type === 'habit' ? `${g.perWeek >= 7 ? 'Daily' : g.perWeek + '× a week'} habit`
    : g.type === 'numeric' ? (g.auto === 'money' ? 'Fills itself from your quit counters' : g.auto === 'weight' ? `Target ${g.target} kg · edit to suit you` : `Target · ${g.target} ${g.unit}`)
      : g.type === 'quit' ? 'Linked to your quit counter' : 'One-off milestone';
  return html`
    <${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${toNY > 0 ? `${toNY} days until 1 January. ` : ''}Tap <b>+</b> to add a goal as it is, or tap a goal to change it first.</p>
      </div>
      ${CATEGORIES.map((c) => {
        const items = PRESETS.filter((p) => p.make(s).category === c.id);
        if (!items.length) return null;
        return html`<${Group} key=${c.id} header=${c.label}>
          ${items.map((p) => {
            const g = p.make(s);
            const has = added.has(p.key);
            return html`<div class="row tap" key=${p.key} role="button" onClick=${() => !has && openGoalEditor({ ...g, preset: p.key })}>
              <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
              <span class="row-main"><span class="row-title">${g.name}</span><span class="row-sub">${desc(g)}</span></span>
              <button class="add-pill ${has ? 'on' : ''}" disabled=${has} aria-label=${has ? 'Added' : `Add ${g.name}`}
                onClick=${(e) => { e.stopPropagation(); quickAdd(p); }}>${has ? Icon.check() : Icon.plus()}</button>
            </div>`;
          })}
        <//>`;
      })}
    </div>`;
}

/* ============ PROGRESS ============ */
function Progress({ s, go }) {
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

    <div class="pad-x mt16"><${Segmented} options=${[{ value: 14, label: '2 weeks' }, { value: 30, label: '30 days' }, { value: 90, label: '90 days' }]} value=${range} onChange=${setRange} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${LineChart} keys=${keys} series=${[{ name: 'Mood', color: '#5AC8FA', values: moodVals }]} yMin=${1} yMax=${5} yTicks=${[1, 3, 5]}
          yFmt=${(v) => MOODS[Math.round(v) - 1]?.e ?? v} height=${170} />
      </div>
    </section>

    <section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        <${Legend} series=${cravSeries} />
        <${LineChart} keys=${keys} series=${cravSeries} yMin=${0} yMax=${10} yTicks=${[0, 5, 10]} unit="/10" height=${190} />
        ${insight && html`<p class="insight">${insight}</p>`}
      </div>
    </section>

    ${trig.length > 0 && html`<section class="group">
      <h2 class="group-h">What sets cravings off</h2>
      <div class="card pad bars">
        ${trig.map(([name, n]) => html`<div class="bar-row">
          <span class="bar-l">${name}</span>
          <span class="bar-t"><i style="width:${(n / trig[0][1]) * 100}%"></i></span>
          <b>${n}</b>
        </div>`)}
        <p class="tiny muted">From ${s.cravings.length} craving${s.cravings.length === 1 ? '' : 's'} logged with SOS. Most common time: ${peakHour}.</p>
      </div>
    </section>`}

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

/* ============ PROFILE ============ */
function Profile({ s }) {
  const p = s.profile;
  const kg = S.latestWeight(p);
  const b = S.bmi(kg, p.heightCm);
  const band = S.bmiBand(b);
  const fileRef = useRef();
  const pos = b ? Math.max(0, Math.min(100, ((b - 15) / (35 - 15)) * 100)) : 0;

  const onImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const text = await file.text();
    let meta = '';
    try { const o = JSON.parse(text); meta = o.exportedAt ? ` from ${S.fmtDate(new Date(o.exportedAt))}` : ''; } catch { toast('That file isn’t valid JSON'); return; }
    confirmSheet({
      title: 'Restore backup', text: `Replace everything on this device with the backup${meta}? Your current data will be overwritten.`, confirm: 'Restore backup',
      onConfirm: () => { try { S.importJSON(text); toast('Backup restored'); } catch (err) { toast(err.message); } },
    });
  };

  return html`<${Page} title="Profile">
    <button class="card profile-card tap" onClick=${openProfileEditor}>
      <span class="avatar">${(p.name || '?')[0].toUpperCase()}</span>
      <span class="row-main"><span class="pc-name">${p.name}</span><span class="row-sub">${p.age} · ${p.heightCm} cm · ${kg?.toFixed(1) ?? '–'} kg</span></span>
      <span class="row-chev">${Icon.chevron()}</span>
    </button>

    <${Group} header="Body" footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
      <${Row} icon="⚖️" iconBg="#FF375F" title="Weight" detail=${kg ? `${kg.toFixed(1)} kg` : 'Add'} chevron onClick=${openWeightSheet} />
      <div class="bmi">
        <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${b ? b.toFixed(1) : '–'}</div></div><span class="pill ${band.tone}">${band.label}</span></div>
        <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${b && html`<b style="left:${pos}%"></b>`}</div>
        <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
      </div>
    <//>

    <${Group} header="Quit counters" footer="Tap a counter to change the quit date and time, or what you used to spend.">
      ${s.quits.map((q) => html`<${Row} key=${q.id} icon=${q.emoji} iconBg=${q.color} title=${q.label}
        sub=${`Since ${S.parseLocal(q.start).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
        detail=${`${S.money(q.monthly, 0)}/mo`} chevron onClick=${() => openQuitEditor(q.id)} />`)}
    <//>

    <${Group} header="Staying quit">
      <${Row} icon="💙" iconBg="#3B9BFF" title="My reasons" sub=${s.reasons.length ? `${s.reasons.length} reason${s.reasons.length === 1 ? '' : 's'} · shown during SOS` : 'Why you quit, for the hard moments'} chevron onClick=${openReasons} />
      <${Row} icon="🫁" iconBg="#5AC8FA" title="Recovery timeline" sub="What’s improving, stage by stage" chevron onClick=${() => openTimeline('vape')} />
    <//>

    <${NotifySettings} s=${s} />

    <${Group} header="Your data" footer="Everything stays on this phone. Export a backup now and then, especially before changing phone or clearing Safari data.">
      <${Row} icon=${Icon.share()} iconBg="#3B9BFF" title="Export backup" sub="Saves a .json file" chevron onClick=${doExport} />
      <${Row} icon=${Icon.download()} iconBg="#30D158" title="Import backup" sub="Restore from a .json file" chevron onClick=${() => fileRef.current.click()} />
      <${Row} icon=${Icon.trash()} iconBg="#FF453A" title="Erase all data" danger onClick=${() => confirmSheet({
        title: 'Erase all data', text: 'This deletes every check-in, goal and setting on this device. Export a backup first if you might want it back.', confirm: 'Erase everything',
        onConfirm: () => { S.resetAll(); toast('All data erased'); },
      })} />
      <input type="file" accept="application/json,.json" ref=${fileRef} onChange=${onImport} hidden />
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>A new beginning. A new standard. A new you.</span>
      <span class="tiny">Version 1.0</span>
    </div>
  <//>`;
}

async function doExport() {
  const text = S.exportJSON();
  const name = `novum-backup-${S.dayKey()}.json`;
  const file = new File([text], name, { type: 'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Novum backup' }); return; }
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  toast('Backup saved');
}

function openProfileEditor() { openSheet((close) => html`<${ProfileEditor} close=${close} />`); }
function ProfileEditor({ close }) {
  const p = S.getState().profile;
  const [f, setF] = useState({ name: p.name, age: p.age, heightCm: p.heightCm });
  const ok = f.name.trim() && +f.age > 0 && +f.heightCm > 50;
  const save = () => { S.update((d) => { d.profile.name = f.name.trim(); d.profile.age = +f.age; d.profile.heightCm = +f.heightCm; }); haptic(12); close(); };
  return html`
    <${SheetBar} title="Profile" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group}>
        <${Field} label="Name"><input value=${f.name} onInput=${(e) => setF({ ...f, name: e.target.value })} /><//>
        <${Field} label="Age"><input type="number" inputmode="numeric" value=${f.age} onInput=${(e) => setF({ ...f, age: e.target.value })} /><//>
        <${Field} label="Height (cm)"><input type="number" inputmode="decimal" value=${f.heightCm} onInput=${(e) => setF({ ...f, heightCm: e.target.value })} /><//>
      <//>
    </div>`;
}

function openWeightSheet() { openSheet((close) => html`<${WeightSheet} close=${close} />`, { tall: true }); }
function WeightSheet({ close }) {
  const s = S.getState();
  const [kg, setKg] = useState('');
  const [date, setDate] = useState(S.dayKey());
  const list = [...s.profile.weights].sort((a, b) => b.date.localeCompare(a.date));
  const add = () => {
    const v = parseFloat(kg);
    if (!(v > 20 && v < 400)) return;
    haptic(12);
    S.update((d) => { d.profile.weights = d.profile.weights.filter((w) => w.date !== date); d.profile.weights.push({ date, kg: v }); });
    setKg('');
    toast('Weight logged');
  };
  return html`
    <${SheetBar} title="Weight" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <${Group}>
        <${Field} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${S.latestWeight(s.profile)?.toFixed(1) ?? '70.0'} value=${kg}
          onInput=${(e) => setKg(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && add()} /><//>
        <${Field} label="Date"><input type="date" value=${date} max=${S.dayKey()} onInput=${(e) => setDate(e.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(kg) > 20)} onClick=${add}>Log weight</button>
      <${Group} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${list.map((w) => html`<div class="row" key=${w.date}>
          <span class="row-main"><span class="row-title">${w.kg.toFixed(1)} kg</span><span class="row-sub">${S.fmtDate(w.date)}</span></span>
          <span class="row-detail">BMI ${S.bmi(w.kg, s.profile.heightCm).toFixed(1)}</span>
          ${list.length > 1 && html`<button class="icon-btn muted" aria-label="Delete entry" onClick=${() => S.update((d) => { d.profile.weights = d.profile.weights.filter((x) => x.date !== w.date); })}>${Icon.trash()}</button>`}
        </div>`)}
      <//>
    </div>`;
}

function openQuitEditor(id) { openSheet((close) => html`<${QuitEditor} id=${id} close=${close} />`, { tall: true }); }
function QuitEditor({ id, close }) {
  const s = S.getState();
  const q = s.quits.find((x) => x.id === id);
  const [start, setStart] = useState(q.start);
  const [monthly, setMonthly] = useState(String(q.monthly));
  const valid = start && !Number.isNaN(S.parseLocal(start).getTime()) && S.parseLocal(start) <= new Date() && parseFloat(monthly) >= 0;
  const save = () => {
    if (!valid) return;
    haptic(12);
    S.update((d) => { const x = d.quits.find((y) => y.id === id); x.start = start; x.monthly = parseFloat(monthly); });
    close();
  };
  const elapsed = S.quitElapsed(q);
  const best = Math.max(q.best || 0, elapsed);
  const restart = () => confirmSheet({
    title: 'Restart counter', danger: true,
    text: `A slip isn’t a failure. Most people who quit for good had a few tries first. Your best run (${Math.floor(best / DAY)} days) stays on record, and the counter starts again from now.`,
    confirm: 'Restart from now',
    onConfirm: () => { S.restartQuit(id); close(); toast('Counter restarted. You’ve got this.'); },
  });
  const m = parseFloat(monthly) || 0;
  return html`
    <${SheetBar} title=${`${q.emoji} ${q.label}`} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!valid} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} header="Quit date and time">
        <${Field} label="Quit at"><input type="datetime-local" value=${start} max=${S.toLocalInput(new Date())} onInput=${(e) => setStart(e.target.value)} /><//>
      <//>
      <${Group} header="What you used to spend" footer=${`About ${S.money((m * 12) / 52)} a week, or ${S.money(m * 12, 0)} a year. If it varied, use a middle figure.`}>
        <${Field} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${monthly} onInput=${(e) => setMonthly(e.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(elapsed / DAY)}</b><span>days now</span></div>
        <div><b>${Math.floor(best / DAY)}</b><span>best run</span></div>
        <div><b>${(q.resets || []).length}</b><span>restarts</span></div>
      </div>
      <button class="btn btn-plain block" onClick=${() => openTimeline(id)}>See the health timeline</button>
      <button class="btn btn-plain danger block" onClick=${restart}>I slipped. Restart the counter</button>
    </div>`;
}

function openTimeline(id) { openSheet((close) => html`<${Timeline} initial=${id} close=${close} />`, { tall: true }); }
function Timeline({ initial, close }) {
  const s = S.getState();
  const [qid, setQid] = useState(initial);
  const q = s.quits.find((x) => x.id === qid) || s.quits[0];
  const hours = S.quitElapsed(q) / 36e5;
  const items = HEALTH[q.id] || [];
  const when = (h) => (h < 1 ? `${Math.round(h * 60)} minutes` : h < 48 ? `${h} hours` : h < 336 ? `${Math.round(h / 24)} days` : h < 1440 ? `${Math.round(h / 168)} weeks` : h < 8760 ? `${Math.round(h / 730)} months` : '1 year');
  return html`
    <${SheetBar} title="Recovery timeline" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="pad-b"><${Segmented} options=${s.quits.map((x) => ({ value: x.id, label: `${x.emoji} ${x.label}` }))} value=${qid} onChange=${setQid} /></div>
      <ol class="timeline" style="--c:${q.color}">
        ${items.map((it) => {
          const done = hours >= it.h;
          return html`<li class=${done ? 'done' : ''}>
            <span class="tl-dot">${done ? Icon.check() : ''}</span>
            <div class="tl-when">${when(it.h)} · ${it.area}${!done ? html` <em>in ${fmtLeft((it.h - hours) / 24)}</em>` : ''}</div>
            <div class="tl-title">${it.title}</div>
            <div class="tl-text">${it.text}</div>
          </li>`;
        })}
      </ol>
      <p class="disclaimer">${HEALTH_NOTE}</p>
    </div>`;
}

/* ============ CRAVING SOS ============ */
const SOS_SECS = 300;
const BREATH = ['Breathe in', 'Hold', 'Breathe out']; // 4s, 4s, 6s = 14s cycle

function SosButton({ compact }) {
  return html`<button class="sos tap ${compact ? 'compact' : ''}" onClick=${openSos}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!compact && html`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${Icon.chevron()}</span>
  </button>`;
}

function openSos() { openSheet((close) => html`<${Sos} close=${close} />`, { tall: true }); }

function Sos({ close }) {
  const s = S.getState();
  const [t0] = useState(Date.now());
  const now = useNow(250);
  const [step, setStep] = useState('ride');
  const [beaten, setBeaten] = useState(true);
  const [quitIds, setQuitIds] = useState(s.quits.map((q) => q.id));
  const [triggers, setTriggers] = useState([]);
  const [restart, setRestart] = useState([]);
  const [secs, setSecs] = useState(0);
  const el = (now - t0) / 1000;
  const left = Math.max(0, SOS_SECS - Math.floor(el));
  const cyc = el % 14;
  const phase = cyc < 4 ? 0 : cyc < 8 ? 1 : 2;
  const lastPhase = useRef(phase);
  useEffect(() => { if (step === 'ride' && lastPhase.current !== phase) { lastPhase.current = phase; haptic(phase === 0 ? 12 : 6); } }, [phase]);

  // Cards that rotate under the breathing circle
  const [cards] = useState(() => {
    const sel = s.quits;
    const saved = sel.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q)), 0);
    const tips = [...DISTRACTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
    const reasons = s.reasons.map((r) => ({ k: 'Your reason', e: '💙', t: r.text }));
    const others = [{ k: 'Money saved', e: '💷', t: `${S.money(saved)} so far. This craving wants to take that back.` }];
    sel.forEach((q) => {
      const d = S.quitElapsed(q) / DAY;
      const mi = milestoneInfo(d);
      others.push({ k: `${q.label}-free`, e: q.emoji, t: `${Math.floor(d)} days in.${mi.next ? ` ${mi.next.label} in ${fmtLeft(mi.next.days - d)}. Don’t reset the clock for five minutes of nothing.` : ''}` });
    });
    tips.forEach((x) => others.push({ k: 'Try this now', e: x.e, t: x.t }));
    // alternate: reason, other, reason, other…
    const out = [];
    for (let i = 0; i < Math.max(reasons.length, others.length); i++) {
      if (reasons[i]) out.push(reasons[i]);
      if (others[i]) out.push(others[i]);
    }
    return out;
  });
  const card = cards[Math.floor(el / 9) % cards.length];

  const finish = (b) => { haptic(15); setBeaten(b); setSecs(Math.round(el)); setStep('log'); };
  const toggleIn = (list, set, v) => { haptic(); set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]); };
  const save = () => {
    const total = s.cravings.filter((c) => c.beaten).length + (beaten ? 1 : 0);
    S.update((d) => d.cravings.push({ id: S.uid(), t: Date.now(), quitIds, triggers, beaten, secs }));
    restart.forEach((id) => S.restartQuit(id));
    close();
    toast(beaten ? `Craving beaten. That’s ${total} 🛡️` : restart.length ? 'Counter restarted. Go again.' : 'Logged. Keep going.');
  };

  if (step === 'log') {
    return html`
      <${SheetBar} title=${beaten ? 'Craving beaten' : 'That’s okay'} right=${html`<button class="link b" onClick=${save}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${beaten ? '🛡️' : '🤝'}</div>
          <h2>${beaten ? 'You rode it out.' : 'One slip doesn’t undo the work.'}</h2>
          <p class="muted">${beaten
            ? `${secs < 60 ? 'Under a minute' : `${Math.round(secs / 60)} minute${Math.round(secs / 60) === 1 ? '' : 's'}`} and it passed. Every craving you beat makes the next one weaker.`
            : 'Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern.'}</p>
        </div>
        <${Group} header="Which craving?">
          <div class="chip-row">${s.quits.map((q) => html`<button class="chip big ${quitIds.includes(q.id) ? 'on' : ''}" style="--c:${q.color}" onClick=${() => toggleIn(quitIds, setQuitIds, q.id)}>${q.emoji} ${q.label}</button>`)}</div>
        <//>
        <${Group} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${TRIGGERS.map((t) => html`<button class="chip big ${triggers.includes(t) ? 'on' : ''}" style="--c:#3B9BFF" onClick=${() => toggleIn(triggers, setTriggers, t)}>${t}</button>`)}</div>
        <//>
        ${!beaten && html`<${Group} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${s.quits.filter((q) => quitIds.includes(q.id)).map((q) => html`<div class="row" key=${q.id}>
            <span class="row-ic" style="background:${q.color}">${q.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${q.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${Toggle} on=${restart.includes(q.id)} label=${`Restart ${q.label}`} onChange=${() => toggleIn(restart, setRestart, q.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${save}>Save</button>
      </div>`;
  }

  const mm = Math.floor(left / 60), ss = pad2(left % 60);
  return html`
    <${SheetBar} title="Craving SOS" left=${html`<button class="link" onClick=${close}>Close</button>`} />
    <div class="sheet-body sos-body">
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${BREATH[phase]}</div>
      </div>
      <div class="sos-timer">${left > 0 ? html`<b>${mm}:${ss}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`
        : html`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      <div class="card sos-card" key=${card.t}>
        <span class="sos-card-e">${card.e}</span>
        <div><div class="sos-card-k">${card.k}</div><div class="sos-card-t">${card.t}</div></div>
      </div>
      ${s.reasons.length === 0 && html`<button class="link sm center-link" onClick=${openReasons}>Add your reasons for quitting, so they show up here</button>`}
      <div class="sos-actions">
        <button class="btn btn-primary block big ${left === 0 ? 'glow' : ''}" onClick=${() => finish(true)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${() => finish(false)}>I gave in</button>
      </div>
    </div>`;
}

function openReasons() { openSheet((close) => html`<${Reasons} close=${close} />`, { tall: true }); }
function Reasons({ close }) {
  const s = S.getState();
  const [txt, setTxt] = useState('');
  const add = (t) => {
    t = t.trim();
    if (!t) return;
    haptic(10);
    S.update((d) => d.reasons.push({ id: S.uid(), text: t }));
    setTxt('');
  };
  const have = new Set(s.reasons.map((r) => r.text));
  return html`
    <${SheetBar} title="My reasons" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${txt} maxlength="140" onInput=${(e) => setTxt(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && add(txt)} />
        <button class="btn btn-primary sm" disabled=${!txt.trim()} onClick=${() => add(txt)}>Add</button>
      </div>
      ${s.reasons.length > 0 && html`<${Group} header="Your reasons">
        ${s.reasons.map((r) => html`<div class="row" key=${r.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${r.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${() => S.update((d) => { d.reasons = d.reasons.filter((x) => x.id !== r.id); })}>${Icon.trash()}</button>
        </div>`)}
      <//>`}
      <${Group} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${REASON_IDEAS.filter((t) => !have.has(t)).map((t) => html`<button class="row tap" key=${t} onClick=${() => add(t)}>
          <span class="row-main"><span class="row-title">${t}</span></span>
          <span class="add-pill">${Icon.plus()}</span>
        </button>`)}
      <//>
    </div>`;
}

/* ============ NOTIFICATIONS ============ */
function NotifySettings({ s }) {
  const n = s.notify;
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const setN = (patch) => S.update((d) => Object.assign(d.notify, patch));
  const configured = pushConfigured();
  const toggleMain = async (on) => {
    if (busy) return;
    setErr(''); setBusy(true);
    try {
      if (on) { await enablePush(); toast('Notifications on 🔔'); } else { await disablePush(); toast('Notifications off'); }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const test = async () => {
    setErr('');
    try { await sendTest(); toast('Test sent. Check your notifications'); } catch (e) { setErr(e.message); }
  };
  let footer;
  if (!configured) footer = 'Notifications need the free Novum push server. Follow the guide in the novum-push folder, then add its address to js/config.js.';
  else if (isIOS() && !isStandalone()) footer = 'On iPhone, notifications only work when Novum is opened from your home screen.';
  else if (!pushSupported()) footer = 'This browser doesn’t support push notifications.';
  else if (permission() === 'denied') footer = 'Notifications are blocked. Turn them on in Settings → Notifications → Novum.';
  else footer = 'Sent by your own Novum server. It only knows your quit times, reminder times and which habits you’ve ticked. Notes and moods stay on this phone.';

  return html`<${Group} header="Notifications" footer=${err ? html`<span class="err">${err}</span>` : footer}>
    <div class="row">
      <span class="row-ic" style="background:#FF453A">🔔</span>
      <span class="row-main"><span class="row-title">Notifications</span>${busy && html`<span class="row-sub">Working…</span>`}</span>
      ${configured ? html`<${Toggle} on=${n.enabled} label="Notifications" onChange=${toggleMain} />` : html`<span class="row-detail">Not set up</span>`}
    </div>
    ${n.enabled && configured && html`
      <div class="row">
        <span class="row-ic" style="background:#FFD60A">🏅</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${Toggle} on=${n.milestones} label="Milestones" onChange=${(v) => setN({ milestones: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#30D158">✍️</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin && html`<input type="time" class="time-in" value=${n.checkinAt} onChange=${(e) => e.target.value && setN({ checkinAt: e.target.value })} />`}
        <${Toggle} on=${n.checkin} label="Check-in reminder" onChange=${(v) => setN({ checkin: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#BF5AF2">🎯</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits && html`<input type="time" class="time-in" value=${n.habitsAt} onChange=${(e) => e.target.value && setN({ habitsAt: e.target.value })} />`}
        <${Toggle} on=${n.habits} label="Habit nudges" onChange=${(v) => setN({ habits: v })} />
      </div>
      <${Row} icon="📨" iconBg="#3B9BFF" title="Send a test notification" chevron onClick=${test} />`}
  <//>`;
}

/* ============ APP SHELL ============ */
function TabBar({ tab, go, dot }) {
  return html`<nav class="tabbar" aria-label="Main">
    ${TABS.map((t) => html`<button class="tab ${tab === t.id ? 'on' : ''}" aria-current=${tab === t.id ? 'page' : undefined} onClick=${() => go(t.id)}>
      <span class="tab-ic">${t.icon()}${t.id === 'checkin' && dot && html`<i class="tab-dot"></i>`}</span><span class="tab-l">${t.label}</span></button>`)}
  </nav>`;
}

const root = document.documentElement;
function onScroll() {
  const y = window.scrollY;
  root.style.setProperty('--st', Math.max(0, Math.min(1, (y - 10) / 30)).toFixed(3));
  root.style.setProperty('--ov', (1 + Math.max(0, -y) * 0.0016).toFixed(4));
  root.classList.toggle('scrolled', y > 30);
}
window.addEventListener('scroll', onScroll, { passive: true });

function App() {
  const [s, setS] = useState(S.getState());
  useEffect(() => S.subscribe(setS), []);
  const initial = location.hash.slice(1);
  const [tab, setTab] = useState(TABS.some((t) => t.id === initial) ? initial : 'home');
  const scrolls = useRef({});
  const go = (t) => {
    if (t === tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    scrolls.current[tab] = window.scrollY;
    haptic(); setTab(t);
    history.replaceState(null, '', '#' + t);
  };
  useLayoutEffect(() => { window.scrollTo(0, scrolls.current[tab] || 0); onScroll(); }, [tab]);
  // Notification taps navigate to e.g. #checkin
  useEffect(() => {
    const on = () => { const h = location.hash.slice(1); if (TABS.some((t) => t.id === h)) setTab(h); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const Screen = { home: Home, checkin: CheckIn, goals: Goals, progress: Progress, profile: Profile }[tab];
  const needCheckin = !s.checkins[S.dayKey()]?.mood;
  return html`<div class="app">
    <main class="screen" key=${tab}><${Screen} s=${s} go=${go} /></main>
    <${TabBar} tab=${tab} go=${go} dot=${needCheckin} />
    <${SheetHost} />
  </div>`;
}

render(html`<${App} />`, document.getElementById('app'));
startPushSync();
