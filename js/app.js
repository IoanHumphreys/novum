import { render, useState, useEffect, useLayoutEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import {
  html, haptic, capName, useNow, Icon, Ring, RingStack, openSheet, closeAllSheets, SheetHost, SheetBar, Page, Segmented, Toggle,
  Group, Row, Field, LineChart, Legend, Empty, toast,
} from './ui.js';
import { MILESTONES, HEALTH_NOTE, healthFor, ADDICTIONS, addictionByKind, quitPresets, CATEGORIES, catById, COLORS, EMOJIS, PRESETS, MOODS, TRIGGERS, DISTRACTIONS, REASON_IDEAS } from './content.js';
import { pushConfigured, pushSupported, isStandalone, isIOS, permission, blockedMessage, enablePush, disablePush, sendTest, startPushSync, stopPushSync, deviceState, adoptLegacyDevice } from './push.js';
import * as A from './api.js';
import { startSync, stopSync, flush, forgetMeta, syncStatus, onSyncStatus, syncNow } from './sync.js';
import { AuthScreen, DayZero, consumeNewSignup, CodeInput, Resend, EyeButton } from './onboarding.js';
import { InstallBanner, openInstallGuide, canInstall, installEnv, maybeWelcomeInstalled } from './install.js';

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
const firstName = () => A.getSession()?.user?.firstName || '';
function stageInfo(q, hours) {
  const list = healthFor(q) || [];
  const reached = list.filter((x) => x.h <= hours);
  return { current: reached[reached.length - 1], next: list.find((x) => x.h > hours) };
}
const deadlineText = (g) => (g.period === '2027' ? (S.goalWindow(g).start < NEW_YEAR ? 'Until end of 2027' : 'All of 2027') : `By ${S.fmtDate(g.end)}`);
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
  // Only the counters tick every second (inside QuitCard/MoneyTicker); the rest refreshes each minute
  const now = useNow(60000);
  const today = S.dayKey();
  const ci = s.checkins[today];
  const monthly = s.quits.reduce((a, q) => a + (q.monthly || 0), 0);
  const hr = new Date(now).getHours();
  const greet = hr < 5 ? 'Up late' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  const habits = s.goals.filter((g) => g.type === 'habit');
  const hasQuits = s.quits.length > 0;
  const sameStart = hasQuits && s.quits.every((q) => q.start === s.quits[0].start);
  const [badgeQuit, setBadgeQuit] = useState(null);
  const bq = s.quits.find((q) => q.id === badgeQuit) || s.quits[0];
  const bDays = bq ? S.quitElapsed(bq, now) / DAY : 0;
  const toNY = Math.ceil((NEW_YEAR - now) / DAY);
  const withHealth = s.quits.filter((q) => healthFor(q));

  return html`<${Page} title="Novum" eyebrow=${new Date(now).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
      sub="A new beginning. A new standard. A new you.">
    <p class="greet">${greet}${firstName() ? `, ${firstName()}` : ''}.</p>
    <${InstallBanner} />

    <section class="group first">
      <h2 class="group-h">${hasQuits ? 'Your streaks' : 'Get started'}</h2>
      ${hasQuits ? html`<div class="stack">
        ${s.quits.map((q) => html`<${QuitCard} key=${q.id} q=${q} />`)}
      </div>` : html`<button class="card add-first tap" onClick=${openAddQuit}>
        <span class="row-ic" style="background:#3B9BFF">${Icon.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${Icon.chevron()}</span>
      </button>`}
    </section>

    ${hasQuits && html`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${openSos}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${Icon.chevron()}</span>
        </button>
        ${s.reasons.length > 0
          ? html`<button class="sup-why" onClick=${openReasons}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${s.reasons[Math.floor(now / 864e5) % s.reasons.length].text}”</span>
            </button>`
          : html`<button class="sup-why add" onClick=${openReasons}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    ${monthly > 0 && html`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${() => go('progress')}>
        <${MoneyTicker} quits=${s.quits} />
        <div class="mc-sub">${S.money(monthly, 0)} a month back in your pocket · ${S.money(monthly * 12, 0)} a year</div>
      </button>
    </section>`}

    ${hasQuits && html`<section class="group">
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
      ${sameStart && s.quits.length > 1 && html`<p class="group-f">Counting for all of them, since you stopped at the same time.</p>`}
    </section>`}

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

    ${withHealth.length > 0 && html`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${withHealth.map((q) => {
          const h = S.quitElapsed(q, now) / 36e5;
          const st = stageInfo(q, h);
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
    </section>`}

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

function MoneyTicker({ quits }) {
  const now = useNow(1000);
  return html`<div class="mc-big">${S.money(quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0))}</div>`;
}

function QuitCard({ q }) {
  const now = useNow(1000);
  const startMs = S.quitStart(q).getTime();
  // Quit day set in the future: count down to it
  if (startMs > now) {
    const { d, h, m } = S.splitDuration(startMs - now);
    return html`<button class="card quit-card tap" onClick=${() => openQuitEditor(q.id)} style="--qc:${q.color}">
      <div class="qc-head"><span class="qc-emoji">${q.emoji}</span><span class="qc-label">${q.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${d}</b><small>${d === 1 ? 'day' : 'days'}</small></span><span><b>${pad2(h)}</b><small>hrs</small></span><span><b>${pad2(m)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${S.quitStart(q).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}. You’ve got this.</div>
    </button>`;
  }
  const ms = S.quitElapsed(q, now);
  const { d, h, m, s: sec } = S.splitDuration(ms);
  const days = ms / DAY;
  const mi = milestoneInfo(days);
  return html`<button class="card quit-card tap" onClick=${() => openQuitEditor(q.id)} style="--qc:${q.color}">
    <div class="qc-head"><span class="qc-emoji">${q.emoji}</span><span class="qc-label">${q.label}-free</span>
      ${q.monthly > 0 && html`<span class="qc-saved">${S.money(S.savedFor(q, ms))} saved</span>`}</div>
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
// Saves half a second after typing stops (and on blur), not on every keystroke
function NoteBox({ value, onSave }) {
  const [txt, setTxt] = useState(value);
  const t = useRef();
  const saved = useRef(value);
  const commit = (v) => { clearTimeout(t.current); if (v !== saved.current) { saved.current = v; onSave(v); } };
  useEffect(() => () => clearTimeout(t.current), []);
  return html`<textarea class="note" rows="3" placeholder="Triggers, wins, how the day went…" value=${txt}
    onInput=${(e) => { const v = e.target.value; setTxt(v); clearTimeout(t.current); t.current = setTimeout(() => commit(v), 500); }}
    onBlur=${(e) => commit(e.target.value)}></textarea>`;
}
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

    ${s.quits.length > 0 && html`<${SosButton} compact />`}

    ${s.quits.length > 0 && html`<${Group} header="Cravings" footer="0 = none, 10 = the strongest you’ve felt. Cravings usually pass within 5–10 minutes.">
      ${s.quits.map((q) => html`<div class="slider-row">
        <div class="slider-top"><span>${q.emoji} ${q.label}</span><span class="slider-v"><b>${entry[q.id] ?? '–'}</b> ${cravingWord(entry[q.id])}</span></div>
        <input type="range" min="0" max="10" step="1" value=${entry[q.id] ?? 0} style="--c:${q.color};--p:${((entry[q.id] ?? 0) / 10) * 100}%"
          class=${entry[q.id] == null ? 'unset' : ''} aria-label=${`${q.label} craving`}
          onInput=${(e) => { const v = +e.target.value; if (v !== entry[q.id]) { haptic(4); set({ [q.id]: v }); } }} />
      </div>`)}
    <//>`}

    <${Group} header="Sleep last night">
      <div class="pad"><${Segmented} options=${SLEEP.map((l, i) => ({ value: i + 1, label: l }))} value=${entry.sleep} onChange=${(v) => set({ sleep: v })} /></div>
    <//>

    <${Group} header="Notes">
      <${NoteBox} key=${day} value=${entry.note || ''} onSave=${(note) => set({ note })} />
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
      <span class="row-sub">${S.goalStartsLater(g) ? `Counts from ${S.fmtDate(S.goalWindow(g).start, { day: 'numeric', month: 'short' })}` : p.label} · ${deadlineText(g)}</span>
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
    body = html`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${S.fmtDate(S.goalWindow(g).start)}.</div>`;
  } else if (g.type === 'numeric' && g.auto === 'weight') {
    body = html`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${openWeightSheet}>Log weight</button>`;
  } else if (g.type === 'numeric') {
    const entries = [...(g.entries || [])].reverse();
    body = html`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${g.mode === 'level' ? `New value${g.unit ? ' (' + g.unit + ')' : ''}` : g.unit === '£' ? 'Amount you saved (£)' : `Add amount${g.unit ? ' (' + g.unit + ')' : ''}`}
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
    body = html`<div class="card pad info">${q.emoji} Linked to your ${q.label.toLowerCase()} counter. Every day you stay ${q.label.toLowerCase()}-free ${g.period === '2027' ? `from ${S.fmtDate(S.quitWindowStart(g, q))} to the end of 2027 ` : ''}fills this ring, including the days before you added this goal.</div>`;
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
        ${S.goalStartsLater(g) && html`<div class="dh-note">Counts from ${S.fmtDate(S.goalWindow(g).start)}. Ticks before then still build your streak.</div>`}
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
    mode: 'sum', auto: '', unit: '', target: '', startValue: '', quitId: S.getState().quits[0]?.id || '', ...goal,
  }));
  const set = (patch) => setF((x) => ({ ...x, ...patch }));
  const s = S.getState();
  const track = f.auto === 'weight' ? 'weight' : f.mode === 'level' ? 'level' : f.unit === '£' ? 'money' : 'sum';
  const setTrack = (t) => set(t === 'money' ? { auto: '', unit: '£', mode: 'sum' }
    : t === 'weight' ? { auto: 'weight', unit: 'kg', mode: 'level', startValue: f.startValue === '' ? +(S.latestWeight(s.profile) || 0).toFixed(1) : f.startValue }
      : { auto: '', mode: t, unit: f.auto || f.unit === '£' ? '' : f.unit });
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
        <div class="pad"><${Segmented} options=${[{ value: 'habit', label: 'Habit' }, { value: 'numeric', label: 'Target' }, { value: 'milestone', label: 'Milestone' }, ...(S.getState().quits.length ? [{ value: 'quit', label: 'Stay quit' }] : [])]}
          value=${f.type} onChange=${(v) => set({ type: v })} /></div>
        ${f.type === 'habit' && html`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${f.perWeek >= 7 ? 'Every day' : `${f.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${f.perWeek <= 1} onClick=${() => { haptic(); set({ perWeek: Math.max(1, f.perWeek - 1) }); }} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${f.perWeek >= 7} onClick=${() => { haptic(); set({ perWeek: Math.min(7, f.perWeek + 1) }); }} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${f.type === 'numeric' && html`
          <div class="pad"><${Segmented} small options=${[{ value: 'sum', label: 'Add up' }, { value: 'level', label: 'Reach' }, { value: 'money', label: '£ Saved' }, { value: 'weight', label: 'Weight' }]}
            value=${track} onChange=${setTrack} /></div>
          ${!f.auto && track !== 'money' && html`<${Field} label="Unit"><input placeholder="km, books, hours…" value=${f.unit} onInput=${(e) => set({ unit: e.target.value })} /><//>`}
          ${(track === 'level' || track === 'weight') && html`<${Field} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${f.startValue} onInput=${(e) => set({ startValue: e.target.value })} /><//>`}
          <${Field} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${track === 'money' ? '1000' : '100'} value=${f.target} onInput=${(e) => set({ target: e.target.value })} /><//>
`}
        ${f.type === 'quit' && html`<div class="pad"><${Segmented} options=${s.quits.map((q) => ({ value: q.id, label: `${q.emoji} ${q.label}` }))} value=${f.quitId} onChange=${(v) => set({ quitId: v })} /></div>`}
      <//>

      <${Group} header="Deadline">
        <div class="pad"><${Segmented} options=${[{ value: '2027', label: 'Until end of 2027' }, { value: 'date', label: 'Pick a date' }]} value=${f.period} onChange=${(v) => set({ period: v })} /></div>
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
  // Untick: take it back off. Ask first if it already has progress.
  const removePreset = (p) => {
    const g = S.getState().goals.find((x) => x.preset === p.key);
    if (!g) return;
    const drop = () => { haptic(10); S.update((d) => { d.goals = d.goals.filter((x) => x.preset !== p.key); }); toast('Removed from your goals'); };
    if ((g.ticks || []).length || (g.entries || []).length || g.done) {
      confirmSheet({ title: 'Remove goal', text: `Remove “${g.name}”? Its progress so far will be deleted.`, confirm: 'Remove', onConfirm: drop });
    } else drop();
  };
  const desc = (g) => g.type === 'habit' ? `${g.perWeek >= 7 ? 'Daily' : g.perWeek + '× a week'} habit`
    : g.type === 'numeric' ? (g.unit === '£' ? `Log what you save · target £${Number(g.target).toLocaleString('en-GB')}` : g.auto === 'weight' ? `Target ${g.target} kg · edit to suit you` : `Target · ${g.target} ${g.unit}`)
      : g.type === 'quit' ? 'Linked to your quit counter' : 'One-off milestone';
  return html`
    <${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${toNY > 0 ? `${toNY} days until 1 January. ` : ''}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${CATEGORIES.map((c) => {
        const items = [...quitPresets(s), ...PRESETS].filter((p) => p.make(s).category === c.id);
        if (!items.length) return null;
        return html`<${Group} key=${c.id} header=${c.label}>
          ${items.map((p) => {
            const g = p.make(s);
            const has = added.has(p.key);
            const mine = s.goals.find((x) => x.preset === p.key);
            return html`<div class="row tap" key=${p.key} role="button" onClick=${() => (mine ? openGoalDetail(mine.id) : openGoalEditor({ ...g, preset: p.key }))}>
              <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
              <span class="row-main"><span class="row-title">${g.name}</span><span class="row-sub">${desc(g)}</span></span>
              <button class="add-pill ${has ? 'on' : ''}" aria-pressed=${has} aria-label=${has ? `Remove ${g.name}` : `Add ${g.name}`}
                onClick=${(e) => { e.stopPropagation(); has ? removePreset(p) : quickAdd(p); }}>${has ? Icon.check() : Icon.plus()}</button>
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

    ${cravSeries.length > 0 && html`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${cravSeries.length > 1 && html`<${Legend} series=${cravSeries} />`}
        <${LineChart} keys=${keys} series=${cravSeries} yMin=${0} yMax=${10} yTicks=${[0, 5, 10]} unit="/10" height=${190} />
        ${insight && html`<p class="insight">${insight}</p>`}
      </div>
    </section>`}

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
function SyncRow() {
  const [st, setSt] = useState(syncStatus());
  useEffect(() => onSyncStatus(setSt), []);
  useNow(30000);
  const ago = (t) => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} hr ago`; };
  const label = { syncing: 'Saving…', synced: `Saved to your account ${ago(st.at)}`, offline: 'Offline. Changes save when you’re back online', error: st.error || 'Couldn’t save. Tap to retry', idle: 'Waiting to save' }[st.state];
  const icon = { syncing: '🔄', synced: '☁️', offline: '📴', error: '⚠️', idle: '☁️' }[st.state];
  return html`<${Row} icon=${icon} iconBg=${st.state === 'error' ? '#FF453A' : '#3B9BFF'} title="Account sync" sub=${label} onClick=${() => { haptic(); syncNow(); }} />`;
}

function Profile({ s }) {
  const p = s.profile;
  const user = A.getSession()?.user || {};
  const kg = S.latestWeight(p);
  const b = S.bmi(kg, p.heightCm);
  const band = S.bmiBand(b);
  const age = S.ageOf(p);
  const fileRef = useRef();
  const pos = b ? Math.max(0, Math.min(100, ((b - 15) / (35 - 15)) * 100)) : 0;
  const withHealth = s.quits.filter((q) => healthFor(q));
  const initials = `${(user.firstName || '?')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase();

  const onImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const text = await file.text();
    let meta = '';
    try { const o = JSON.parse(text); meta = o.exportedAt ? ` from ${S.fmtDate(new Date(o.exportedAt))}` : ''; } catch { toast('That file isn’t valid JSON'); return; }
    confirmSheet({
      title: 'Restore backup', text: `Replace everything in your account with the backup${meta}? Your current data will be overwritten on every device.`, confirm: 'Restore backup',
      onConfirm: () => { try { S.importJSON(text); toast('Backup restored'); } catch (err) { toast(err.message); } },
    });
  };

  return html`<${Page} title="Profile">
    <button class="card profile-card tap" onClick=${openAccount}>
      <span class="avatar">${initials}</span>
      <span class="row-main"><span class="pc-name">${user.firstName} ${user.lastName}</span><span class="row-sub">@${user.username}</span></span>
      <span class="row-chev">${Icon.chevron()}</span>
    </button>

    <${Group} header="Body" footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
      <${Row} icon="🎂" iconBg="#BF5AF2" title="Age and height" detail=${`${age ?? '–'} · ${p.heightCm ? `${p.heightCm} cm` : '–'}`} chevron onClick=${openBodyEditor} />
      <${Row} icon="⚖️" iconBg="#FF375F" title="Weight" detail=${kg ? `${kg.toFixed(1)} kg` : 'Add'} chevron onClick=${openWeightSheet} />
      <div class="bmi">
        <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${b ? b.toFixed(1) : '–'}</div></div><span class="pill ${band.tone}">${band.label}</span></div>
        <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${b && html`<b style="left:${pos}%"></b>`}</div>
        <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
      </div>
    <//>

    <${Group} header="What you’re quitting" footer="Tap one to change its quit date, what it cost you, or to remove it.">
      ${s.quits.map((q) => html`<${Row} key=${q.id} icon=${q.emoji} iconBg=${q.color} title=${q.label}
        sub=${`${S.quitStart(q) > new Date() ? 'Quit day' : 'Since'} ${S.quitStart(q).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
        detail=${q.monthly ? `${S.money(q.monthly, 0)}/mo` : ''} chevron onClick=${() => openQuitEditor(q.id)} />`)}
      ${s.quits.length < ADDICTIONS.length && html`<${Row} icon=${Icon.plus()} iconBg="#3B9BFF" title="Add something to quit" chevron onClick=${openAddQuit} />`}
    <//>

    <${Group} header="Staying quit">
      <${Row} icon="💙" iconBg="#3B9BFF" title="My reasons" sub=${s.reasons.length ? `${s.reasons.length} reason${s.reasons.length === 1 ? '' : 's'} · shown during SOS` : 'Why you quit, for the hard moments'} chevron onClick=${openReasons} />
      ${withHealth.length > 0 && html`<${Row} icon="🫁" iconBg="#5AC8FA" title="Recovery timeline" sub="What’s improving, stage by stage" chevron onClick=${() => openTimeline(withHealth[0].id)} />`}
    <//>

    <${NotifySettings} s=${s} />

    <${Group} header="Your data" footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
      <${SyncRow} />
      <${Row} icon=${Icon.share()} iconBg="#3B9BFF" title="Export a copy" sub="Saves a .json file" chevron onClick=${doExport} />
      <${Row} icon=${Icon.download()} iconBg="#30D158" title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${() => fileRef.current.click()} />
      <${Row} icon="↺" iconBg="#FF9F0A" title="Start over" sub="Clears your data and reruns Day Zero" onClick=${() => confirmSheet({
        title: 'Start over', text: 'This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.', confirm: 'Clear and start over',
        onConfirm: () => { S.replaceState(S.defaultState()); toast('Fresh start'); },
      })} />
      <input type="file" accept="application/json,.json" ref=${fileRef} onChange=${onImport} hidden />
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>A new beginning. A new standard. A new you.</span>
      <span class="tiny">Version 2.0</span>
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

function openBodyEditor() { openSheet((close) => html`<${BodyEditor} close=${close} />`); }
function BodyEditor({ close }) {
  const p = S.getState().profile;
  const [dob, setDob] = useState(p.dob || '');
  const [cm, setCm] = useState(p.heightCm ? String(p.heightCm) : '');
  const dobOk = /^\d{4}-\d{2}-\d{2}$/.test(dob) && S.parseDay(dob) < new Date();
  const ok = dobOk && +cm >= 100 && +cm <= 250;
  const save = () => { S.update((d) => { d.profile.dob = dob; d.profile.heightCm = Math.round(+cm); }); haptic(12); close(); };
  return html`
    <${SheetBar} title="Age and height" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} footer=${dobOk ? `${S.ageOf({ dob })} years old` : ''}>
        <${Field} label="Date of birth"><input type="date" max=${S.dayKey()} value=${dob} onInput=${(e) => setDob(e.target.value)} /><//>
        <${Field} label="Height (cm)"><input type="number" inputmode="decimal" value=${cm} onInput=${(e) => setCm(e.target.value)} /><//>
      <//>
    </div>`;
}

/* ---------- account ---------- */
function openAccount() { openSheet((close) => html`<${Account} close=${close} />`, { tall: true }); }
function Account({ close }) {
  const user = A.getSession()?.user || {};
  const [f, setF] = useState({ firstName: user.firstName || '', lastName: user.lastName || '', username: user.username || '' });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const changed = Object.keys(f).some((k) => f[k].trim() !== (user[k] || ''));
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = async () => {
    setBusy(true); setMsg(null);
    const patch = Object.fromEntries(Object.keys(f).filter((k) => f[k].trim() !== (user[k] || '')).map((k) => [k, f[k].trim()]));
    try { await A.updateMe(patch); haptic(15); toast('Account updated'); setMsg(null); } catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const doLogout = () => confirmSheet({
    title: 'Log out', danger: false, confirm: 'Log out',
    text: 'Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.',
    onConfirm: async () => { close(); await logOutEverywhereLocal(); },
  });
  return html`
    <${SheetBar} title="Account" left=${html`<button class="link" onClick=${close}>Close</button>`} right=${html`<button class="link b" disabled=${!changed || busy} onClick=${save}>${busy ? 'Saving…' : 'Save'}</button>`} />
    <div class="sheet-body">
      <${Group} header="Your details" footer=${msg?.err ? html`<span class="err">${msg.err}</span>` : `Member since ${user.createdAt ? S.fmtDate(new Date(user.createdAt)) : '–'}`}>
        <${Field} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${f.firstName} onInput=${(e) => setF({ ...f, firstName: capName(e.target.value) })} /><//>
        <${Field} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${f.lastName} onInput=${(e) => setF({ ...f, lastName: capName(e.target.value) })} /><//>
        <${Field} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${f.username} onInput=${set('username')} /><//>
        <${Row} title="Email" detail=${user.email} chevron onClick=${openChangeEmail} />
      <//>
      <${Group}>
        <${Row} icon="🔑" iconBg="#8E8E93" title="Change password" chevron onClick=${openPassword} />
        <${Row} icon="↪" iconBg="#3B9BFF" title="Log out" chevron onClick=${doLogout} />
      <//>
      <${Group} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${Row} icon=${Icon.trash()} iconBg="#FF453A" title="Delete account" danger onClick=${openDeleteAccount} />
      <//>
    </div>`;
}

async function logOutEverywhereLocal() {
  const uid = A.getSession()?.user?.id;
  try { await flush(); } catch { /* offline: unsynced changes stay on this device */ }
  try { await disablePush(); } catch { /* ignore */ }
  stopPushSync(); stopSync();
  await A.logout();
  S.closeUser({ wipe: true });
  if (uid) forgetMeta(uid);
}

function openChangeEmail() { openSheet((close) => html`<${ChangeEmail} close=${close} />`); }
function ChangeEmail({ close }) {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('email'); // email | code
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const em = email.trim().toLowerCase();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em) && em !== (A.getSession()?.user?.email || '').toLowerCase();
  const save = async (emailToken) => { await A.updateMe({ email: em, emailToken }); haptic(20); toast('Email updated'); close(); };
  const start = async () => {
    setBusy(true); setErr('');
    try {
      const r = await A.sendEmailCode(em, A.getSession()?.user?.firstName);
      if (r.skipped) await save(); else { setSentAt(Date.now()); setStage('code'); }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const confirm = async (c = code) => {
    if (busy || c.length !== 6) return;
    setBusy(true); setErr('');
    try { const r = await A.verifyEmailCode(em, c); await save(r.emailToken); } catch (e) { setErr(e.message); setCode(''); setBusy(false); }
  };
  return html`
    <${SheetBar} title="Change email" left=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      ${stage === 'email' ? html`
        <${Group} footer=${err ? html`<span class="err">${err}</span>` : 'We’ll send a code to the new address to confirm it’s yours.'}>
          <${Field} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${email} onInput=${(e) => { setErr(''); setEmail(e.target.value); }} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!ok || busy} onClick=${start}>${busy ? 'Sending…' : 'Send code'}</button>`
      : html`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${em}</b>.</p>
        <${CodeInput} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${confirm} />
        ${err && html`<p class="wiz-err">${err}</p>`}
        <button class="btn btn-primary block" disabled=${code.length !== 6 || busy} onClick=${() => confirm()}>${busy ? 'Confirming…' : 'Confirm'}</button>
        <${Resend} sentAt=${sentAt} onResend=${start} />`}
    </div>`;
}

function openPassword() { openSheet((close) => html`<${PasswordSheet} close=${close} />`); }
function PasswordSheet({ close }) {
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const ok = cur && next.length >= 8;
  const save = async () => {
    setBusy(true); setErr('');
    try { await A.changePassword(cur, next); haptic(15); toast('Password changed'); close(); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  return html`
    <${SheetBar} title="Change password" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok || busy} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} footer=${err ? html`<span class="err">${err}</span>` : 'At least 8 characters. You’ll stay logged in here; other devices are logged out.'}>
        <${Field} label="Current"><input type="password" autocomplete="current-password" value=${cur} onInput=${(e) => setCur(e.target.value)} /><//>
        <${Field} label="New"><input type="password" autocomplete="new-password" value=${next} onInput=${(e) => setNext(e.target.value)} /><//>
      <//>
    </div>`;
}

function openDeleteAccount() { openSheet((close) => html`<${DeleteAccount} close=${close} />`); }
function DeleteAccount({ close }) {
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [codeFor, setCodeFor] = useState(null); // { emailHint } once the code is sent
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const codeRef = useRef();
  useEffect(() => { if (codeFor) setTimeout(() => codeRef.current?.focus({ preventScroll: true }), 350); }, [codeFor]);

  // Gone: stop everything on this phone, clear its data and go back to the welcome screen
  const finish = async () => {
    const uid = A.getSession()?.user?.id;
    stopPushSync(); stopSync();
    closeAllSheets();
    A.setSession(null);
    S.closeUser({ wipe: true });
    if (uid) forgetMeta(uid);
    try { localStorage.removeItem(`novum.push:${uid}`); } catch { /* ignore */ }
    history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);
    toast('Account deleted');
  };
  const del = async (c = code) => {
    if (busy) return;
    setBusy(true); setErr('');
    try {
      try { await disablePush(); } catch { /* ignore */ }
      await A.deleteAccount(pw, c);
      haptic(20);
      await finish();
    } catch (e) {
      setBusy(false); setCode('');
      setErr(e.message);
      if (e.data?.needsCode) setCodeFor(codeFor || { emailHint: 'your email' });
    }
  };
  // Step 1: check the password and email a code
  const sendCode = async () => {
    if (busy || !pw) return;
    setBusy(true); setErr('');
    try {
      const r = await A.deleteCode(pw);
      if (r.skipped) { setBusy(false); return del(''); }
      setCodeFor({ emailHint: r.emailHint }); setSentAt(Date.now()); setCode('');
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return html`
    <${SheetBar} title="Delete account" left=${html`<button class="link" onClick=${codeFor ? () => { setCodeFor(null); setErr(''); setCode(''); } : close}>${codeFor ? 'Back' : 'Cancel'}</button>`} />
    <div class="sheet-body">
      ${!codeFor ? html`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${Group} header="Step 1 of 2 · Your password" footer=${err ? html`<span class="err">${err}</span>` : 'Then we’ll email you a code to make sure it’s really you.'}>
          <${Field} label="Password"><div class="tf-row"><input type=${showPw ? 'text' : 'password'} autocomplete="current-password" value=${pw}
            onInput=${(e) => { setErr(''); setPw(e.target.value); }} onKeyDown=${(e) => e.key === 'Enter' && sendCode()} />
            <${EyeButton} on=${showPw} set=${setShowPw} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!pw || busy} onClick=${sendCode}>${busy ? 'Checking…' : 'Continue'}</button>`
      : html`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${codeFor.emailHint}</b>. Enter it to delete your account for good.</p>
          <${CodeInput} inputRef=${codeRef} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} />
          <${Resend} sentAt=${sentAt} onResend=${async () => { try { await A.deleteCode(pw); setSentAt(Date.now()); setCode(''); toast('New code sent'); } catch (e) { setErr(e.message); } }} />
          ${err && html`<p class="auth-err center">${err}</p>`}
          <button class="btn btn-danger block" disabled=${code.length !== 6 || busy} onClick=${() => del()}>${busy ? 'Deleting…' : 'Delete my account'}</button>
        </div>`}
    </div>`;
}

/* ---------- add an addiction later ---------- */
function openAddQuit() { openSheet((close) => html`<${AddQuit} close=${close} />`, { tall: true }); }
function AddQuit({ close }) {
  const s = S.getState();
  const have = new Set(s.quits.map((q) => q.kind));
  const options = ADDICTIONS.filter((a) => !have.has(a.kind));
  const [kind, setKind] = useState(null);
  const [name, setName] = useState('');
  const [start, setStart] = useState(S.toLocalInput(new Date()));
  const [monthly, setMonthly] = useState('');
  const a = kind ? addictionByKind(kind) : null;
  const ok = kind && start && (kind !== 'other' || name.trim());
  const save = () => {
    haptic(15);
    S.update((d) => d.quits.push({
      id: kind, kind, label: kind === 'other' ? name.trim() : a.label, emoji: a.emoji, color: a.color,
      start, monthly: parseFloat(monthly) || 0, best: 0, resets: [],
    }));
    close();
    toast(`${kind === 'other' ? name.trim() : a.label} added`);
  };
  return html`
    <${SheetBar} title="Add something to quit" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${options.map((o) => html`<button class="pick ${kind === o.kind ? 'on' : ''}" style="--c:${o.color}" onClick=${() => { haptic(); setKind(o.kind); }}>
          <span class="pick-e">${o.emoji}</span><span class="pick-l">${o.label}</span><span class="pick-tick">${Icon.check()}</span></button>`)}
      </div>
      ${kind && html`
        <${Group} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${kind === 'other' && html`<${Field} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${name} onInput=${(e) => setName(e.target.value)} /><//>`}
          <${Field} label="Quit at"><input type="datetime-local" value=${start} onInput=${(e) => setStart(e.target.value)} /><//>
          <${Field} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${monthly} onInput=${(e) => setMonthly(e.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!ok} onClick=${save}>Add</button>`}
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
  const [start, setStart] = useState(q?.start || '');
  const [monthly, setMonthly] = useState(String(q?.monthly ?? 0));
  if (!q) return html`<${SheetBar} title="Removed" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const maxFuture = S.toLocalInput(S.addDays(new Date(), 60));
  const valid = start && !Number.isNaN(S.parseLocal(start).getTime()) && start <= maxFuture && parseFloat(monthly) >= 0;
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
  const remove = () => confirmSheet({
    title: `Remove ${q.label}`, danger: true,
    text: `This removes the ${q.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,
    confirm: 'Remove',
    onConfirm: () => { close(); S.update((d) => { d.quits = d.quits.filter((x) => x.id !== id); }); toast(`${q.label} removed`); },
  });
  const m = parseFloat(monthly) || 0;
  return html`
    <${SheetBar} title=${`${q.emoji} ${q.label}`} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!valid} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${Field} label="Quit at"><input type="datetime-local" value=${start} max=${maxFuture} onInput=${(e) => setStart(e.target.value)} /><//>
      <//>
      <${Group} header="What it cost you" footer=${`About ${S.money((m * 12) / 52)} a week, or ${S.money(m * 12, 0)} a year. If it varied, use a middle figure.`}>
        <${Field} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${monthly} onInput=${(e) => setMonthly(e.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(elapsed / DAY)}</b><span>days now</span></div>
        <div><b>${Math.floor(best / DAY)}</b><span>best run</span></div>
        <div><b>${(q.resets || []).length}</b><span>restarts</span></div>
      </div>
      ${healthFor(q) && html`<button class="btn btn-plain block" onClick=${() => openTimeline(id)}>See the health timeline</button>`}
      <button class="btn btn-plain danger block" onClick=${restart}>I slipped. Restart the counter</button>
      <button class="btn btn-plain danger block" onClick=${remove}>Remove from Novum</button>
    </div>`;
}

function openTimeline(id) { openSheet((close) => html`<${Timeline} initial=${id} close=${close} />`, { tall: true }); }
function Timeline({ initial, close }) {
  const s = S.getState();
  const opts = s.quits.filter((x) => healthFor(x));
  const [qid, setQid] = useState(initial);
  const q = opts.find((x) => x.id === qid) || opts[0];
  if (!q) return html`<${SheetBar} title="Recovery timeline" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const hours = S.quitElapsed(q) / 36e5;
  const items = healthFor(q) || [];
  const when = (h) => (h === 0 ? 'Before you start' : h < 1 ? `${Math.round(h * 60)} minutes` : h < 48 ? `${h} hours` : h < 336 ? `${Math.round(h / 24)} days` : h < 1440 ? `${Math.round(h / 168)} weeks` : h < 8760 ? `${Math.round(h / 730)} months` : '1 year');
  return html`
    <${SheetBar} title="Recovery timeline" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${opts.length > 1 && html`<div class="pad-b"><${Segmented} small=${opts.length > 3} options=${opts.map((x) => ({ value: x.id, label: `${x.emoji} ${x.label}` }))} value=${q.id} onChange=${setQid} /></div>`}
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
  const n = s.notifyPrefs;
  const [dev, setDev] = useState(deviceState());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const setN = (patch) => S.update((d) => { d.notifyPrefs = { ...d.notifyPrefs, ...patch }; });
  const configured = pushConfigured();
  // Re-check when coming back from Settings so a permission change shows straight away
  const [, recheck] = useState(0);
  useEffect(() => {
    const on = () => { if (document.visibilityState === 'visible') { setDev(deviceState()); recheck((x) => x + 1); } };
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  const toggleMain = async (on) => {
    if (busy) return;
    setErr(''); setBusy(true);
    try {
      if (on) { await enablePush(); toast('Notifications on 🔔'); } else { await disablePush(); toast('Notifications off'); }
    } catch (e) { setErr(e.message); }
    setDev(deviceState());
    setBusy(false);
  };
  const test = async () => {
    setErr('');
    try { await sendTest(10); toast('Arrives in 10s. Leave Novum now'); } catch (e) { setErr(e.message); }
  };
  let footer;
  if (!configured) footer = 'Notifications aren’t set up on the server yet.';
  else if (isIOS() && !isStandalone()) footer = 'On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.';
  else if (!pushSupported()) footer = 'This browser doesn’t support push notifications.';
  else if (permission() === 'denied' && !dev.enabled) footer = blockedMessage('denied');
  else footer = 'On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times and habit ticks to time these.';

  return html`<${Group} header="Notifications" footer=${err ? html`<span class="err">${err}</span>` : footer}>
    <div class="row">
      <span class="row-ic" style="background:#FF453A">🔔</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${busy && html`<span class="row-sub">Working…</span>`}</span>
      ${configured ? html`<${Toggle} on=${dev.enabled} label="Notifications" onChange=${toggleMain} />` : html`<span class="row-detail">Not set up</span>`}
    </div>
    ${canInstall() && html`<${Row} icon="📲" iconBg="#3B9BFF" title=${installEnv().kind === 'inapp' ? 'Open Novum in Safari' : 'Add to Home Screen'} sub="Needed for notifications. Shows you how" chevron onClick=${openInstallGuide} />`}
    ${dev.enabled && configured && html`
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
      <${Row} icon="📨" iconBg="#3B9BFF" title="Send a test notification" sub="Arrives after 10 seconds. Close Novum or open another app to see the banner" chevron onClick=${test} />`}
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

function App({ s }) {
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
  useEffect(() => { const t = setTimeout(maybeWelcomeInstalled, 700); return () => clearTimeout(t); }, []);
  const Screen = { home: Home, checkin: CheckIn, goals: Goals, progress: Progress, profile: Profile }[tab];
  const needCheckin = !s.checkins[S.dayKey()]?.mood;
  return html`<div class="app">
    <main class="screen" key=${tab}><${Screen} s=${s} go=${go} /></main>
    <${TabBar} tab=${tab} go=${go} dot=${needCheckin} />
  </div>`;
}

// "A new version is ready" banner (set by index.html when a new service worker takes over)
function UpdateBanner() {
  const [show, setShow] = useState(!!window.__novumUpdate);
  useEffect(() => { const on = () => setShow(true); window.addEventListener('novum-update', on); return () => window.removeEventListener('novum-update', on); }, []);
  if (!show) return null;
  return html`<button class="update-bar" onClick=${() => location.reload()}>✨ A new version of Novum is ready. <b>Tap to update</b></button>`;
}

// Decides what to show: auth → loading → Day Zero → the app
function Root() {
  const [session, setSess] = useState(A.getSession());
  const [s, setS] = useState(S.getState());
  const [ready, setReady] = useState(false);
  useEffect(() => A.onSession(setSess), []);
  useEffect(() => S.subscribe((st) => setS(st)), []);
  useEffect(() => { try { navigator.storage?.persist?.(); } catch { /* not supported */ } }, []);

  const uid = session?.user?.id;
  useEffect(() => {
    if (!uid) { stopSync(); stopPushSync(); S.closeUser({ wipe: false }); setReady(true); return; }
    S.openUser(uid);
    // New account on a device that already had pre-account Novum data: bring it across
    if (consumeNewSignup()) {
      const legacy = S.legacyState();
      if (legacy) {
        S.replaceState({ ...legacy, setupDone: false });
        adoptLegacyDevice(legacy.notify);
        S.clearLegacy();
      }
    }
    setReady(S.getState().setupDone);
    Promise.resolve(startSync(uid)).finally(() => setReady(true));
    startPushSync();
    A.refreshMe().catch(() => { /* offline or expired: handled by api.js */ });
  }, [uid]);

  let body;
  if (!session) body = html`<${AuthScreen} />`;
  else if (!ready) body = html`<div class="boot">NOVUM</div>`;
  else if (!s.setupDone) body = html`<${DayZero} user=${session.user} />`;
  else body = html`<${App} s=${s} />`;
  return html`${body}<${SheetHost} /><${UpdateBanner} />`;
}

render(html`<${Root} />`, document.getElementById('app'));
