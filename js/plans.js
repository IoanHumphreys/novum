// Planning ahead: if-then plans for each trigger ("If I'm stressed, I'll go for a walk"), shown in SOS when
// you say what set a craving off; tough days coming up (a party, exams) with a plan and a reminder; and
// craving stats for Progress (how long cravings last, how many you beat, the trend).
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, Row, toast } from './ui.js';
import { TRIGGERS, PLAN_IDEAS, EVENT_EMOJIS } from './content.js';

const DAY = 864e5;
const shortDate = (k) => S.parseDay(k).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

/* ============ the "Plan ahead" sheet ============ */
export function openPlans() { haptic(); openSheet((close) => html`<${Plans} close=${close} />`, { tall: true }); }
function Plans({ close }) {
  const [s, setS] = useState(S.getState());
  const refresh = () => setS(S.getState());
  const today = S.dayKey();
  const upcoming = s.events.filter((e) => e.date >= today && !e.outcome).sort((a, b) => a.date.localeCompare(b.date));
  const planned = TRIGGERS.filter((t) => s.plans[t]);
  return html`
    <${SheetBar} title="Plan ahead" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Deciding what you’ll do <i>before</i> a craving hits makes you far more likely to stick to it.</p>
      <${Group} header="Tough days coming up" footer="Novum reminds you the evening before and on the morning, then asks how it went.">
        ${upcoming.map((e) => html`<${Row} key=${e.id} icon=${e.emoji} iconBg="#FF9F0A" title=${e.title} detail=${e.date === today ? 'Today' : shortDate(e.date)} chevron
          onClick=${() => openEvent(e, refresh)} />`)}
        <${Row} icon=${Icon.plus()} iconBg="#FF9F0A" title="Add a tough day" chevron onClick=${() => openEvent(null, refresh)} />
      <//>
      <${Group} header="If-then plans" footer="When you use Craving SOS and say what set it off, your plan shows straight away.">
        ${planned.map((t) => html`<${Row} key=${t} icon="🧭" iconBg="#5E5CE6" title=${`If: ${t.toLowerCase()}`} sub=${`Then: ${s.plans[t]}`} chevron onClick=${() => openPlanEditor(t, refresh)} />`)}
        ${TRIGGERS.filter((t) => !s.plans[t]).length > 0 && html`<div class="plan-add">
          <span class="plan-add-k">Add a plan for…</span>
          <div class="chip-row">${TRIGGERS.filter((t) => !s.plans[t]).map((t) => html`<button key=${t} class="chip" style="--c:#5E5CE6" onClick=${() => openPlanEditor(t, refresh)}>${t}</button>`)}</div>
        </div>`}
      <//>
    </div>`;
}

/* ---------- one if-then plan ---------- */
export function openPlanEditor(trigger, onDone) { openSheet((close) => html`<${PlanEditor} trigger=${trigger} close=${() => { close(); onDone?.(); }} />`); }
function PlanEditor({ trigger, close }) {
  const [text, setText] = useState(S.getState().plans[trigger] || '');
  const save = () => {
    haptic(12);
    S.update((d) => { d.plans = { ...d.plans }; if (text.trim()) d.plans[trigger] = text.trim().slice(0, 120); else delete d.plans[trigger]; });
    toast(text.trim() ? 'Plan saved 🧭' : 'Plan removed');
    close();
  };
  return html`
    <${SheetBar} title=${`If: ${trigger.toLowerCase()}`} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} header="Then I’ll…">
        <textarea class="note" rows="2" maxlength="120" placeholder="e.g. go for a 10-minute walk" value=${text} onInput=${(e) => setText(e.target.value)}></textarea>
      <//>
      <${Group} header="Ideas">
        <div class="chip-row">${(PLAN_IDEAS[trigger] || PLAN_IDEAS.Other).map((x) => html`<button key=${x} class="chip ${text === x ? 'on' : ''}" style="--c:#5E5CE6" onClick=${() => { haptic(); setText(x); }}>${x}</button>`)}</div>
      <//>
      ${S.getState().plans[trigger] && html`<button class="btn btn-plain danger block" onClick=${() => { setText(''); S.update((d) => { d.plans = { ...d.plans }; delete d.plans[trigger]; }); toast('Plan removed'); close(); }}>Remove this plan</button>`}
    </div>`;
}

/* ---------- one tough day ---------- */
export function openEvent(ev, onDone) { openSheet((close) => html`<${EventEditor} ev=${ev} close=${() => { close(); onDone?.(); }} />`, { tall: true }); }
function EventEditor({ ev, close }) {
  const [f, setF] = useState(ev || { title: '', emoji: '🎉', date: S.dayKey(S.addDays(new Date(), 1)), trigger: '', plan: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ok = f.title.trim() && f.date;
  const save = () => {
    if (!ok) return;
    haptic(12);
    const clean = { ...f, title: f.title.trim().slice(0, 40), plan: (f.plan || '').trim().slice(0, 160) };
    S.update((d) => {
      if (ev) d.events = d.events.map((x) => (x.id === ev.id ? { ...x, ...clean } : x));
      else d.events = [...d.events, { ...clean, id: S.uid(), outcome: null }];
    });
    toast(ev ? 'Saved' : 'Added. You’ll get a reminder the evening before 📅');
    close();
  };
  const ideas = f.trigger ? PLAN_IDEAS[f.trigger] || [] : [];
  const fromPlan = f.trigger && S.getState().plans[f.trigger];
  return html`
    <${SheetBar} title=${ev ? 'Tough day' : 'Add a tough day'} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} header="What’s happening?">
        <div class="ev-title"><input class="ev-emoji-in" aria-label="Emoji" maxlength="4" value=${f.emoji} onInput=${set('emoji')} />
          <input placeholder="e.g. Jake’s party" maxlength="40" value=${f.title} onInput=${set('title')} /></div>
        <div class="emoji-strip">${EVENT_EMOJIS.map((e) => html`<button key=${e} class=${f.emoji === e ? 'on' : ''} onClick=${() => setF({ ...f, emoji: e })}>${e}</button>`)}</div>
      <//>
      <${Group} header="When?">
        <label class="field"><span class="field-l">Date</span><span class="field-c"><input type="date" min=${S.dayKey()} value=${f.date} onInput=${set('date')} /></span></label>
      <//>
      <${Group} header="What might set you off?">
        <div class="chip-row">${TRIGGERS.map((t) => html`<button key=${t} class="chip ${f.trigger === t ? 'on' : ''}" style="--c:#FF9F0A" onClick=${() => { haptic(); setF({ ...f, trigger: f.trigger === t ? '' : t }); }}>${t}</button>`)}</div>
      <//>
      <${Group} header="My plan" footer=${fromPlan && !f.plan ? html`Your if-then plan for ${f.trigger.toLowerCase()}: <b>${fromPlan}</b>. <button class="link sm" onClick=${() => setF({ ...f, plan: fromPlan })}>Use it</button>` : 'Shown on the day and in your reminder.'}>
        <textarea class="note" rows="3" maxlength="160" placeholder="e.g. Leave by 11, stick to soft drinks, text Amy if it gets hard" value=${f.plan} onInput=${set('plan')}></textarea>
        ${ideas.length > 0 && html`<div class="chip-row pad-chips">${ideas.map((x) => html`<button key=${x} class="chip" style="--c:#FF9F0A" onClick=${() => { haptic(); setF({ ...f, plan: f.plan ? `${f.plan.replace(/[.\s]*$/, '')}. ${x}` : x }); }}>＋ ${x}</button>`)}</div>`}
      <//>
      ${ev && html`<button class="btn btn-plain danger block" onClick=${() => { S.update((d) => { d.events = d.events.filter((x) => x.id !== ev.id); }); toast('Removed'); close(); }}>Delete</button>`}
    </div>`;
}

/* ============ Home: today's plan, what's coming, and "how did it go?" ============ */
export function EventsCard({ s }) {
  const today = S.dayKey();
  const yesterdayish = S.dayKey(S.addDays(new Date(), -3));
  const soon = S.dayKey(S.addDays(new Date(), 14));
  const ask = s.events.filter((e) => !e.outcome && e.date < today && e.date >= yesterdayish);
  const now = s.events.filter((e) => !e.outcome && e.date === today);
  const next = s.events.filter((e) => !e.outcome && e.date > today && e.date <= soon).sort((a, b) => a.date.localeCompare(b.date));
  if (!ask.length && !now.length && !next.length) return null;
  const outcome = (e, o) => {
    haptic(o === 'quit' ? 20 : 10);
    S.update((d) => { d.events = d.events.map((x) => (x.id === e.id ? { ...x, outcome: o } : x)); });
    toast(o === 'quit' ? `You got through ${e.title} 💪 That’s huge.` : 'Thanks for being honest. Next time, adjust the plan.');
  };
  return html`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Plan ahead</h2><button class="link sm" onClick=${openPlans}>See all</button></div>
    <div class="stack">
      ${ask.map((e) => html`<div class="card ev-card ask" key=${e.id}>
        <div class="ev-top"><span class="ev-e">${e.emoji}</span><span class="row-main"><b>How did ${e.title} go?</b><small>${shortDate(e.date)}</small></span></div>
        <div class="act-btns"><button class="btn btn-primary sm" onClick=${() => outcome(e, 'quit')}>Stayed quit 💪</button><button class="btn btn-plain sm" onClick=${() => outcome(e, 'slip')}>I slipped</button></div>
      </div>`)}
      ${now.map((e) => html`<button class="card ev-card today tap" key=${e.id} onClick=${() => openEvent(e)}>
        <div class="ev-top"><span class="ev-e">${e.emoji}</span><span class="row-main"><span class="ev-k">Today</span><b>${e.title}</b></span></div>
        ${e.plan ? html`<p class="ev-plan"><span>Your plan</span>${e.plan}</p>` : html`<p class="ev-plan empty">No plan yet. Tap to add one.</p>`}
      </button>`)}
      ${next.length > 0 && html`<div class="card list">${next.map((e) => {
        const d = S.daysBetween(new Date(), S.parseDay(e.date));
        return html`<${Row} key=${e.id} icon=${e.emoji} iconBg="#FF9F0A" title=${e.title} detail=${d === 1 ? 'Tomorrow' : `in ${d} days`} chevron onClick=${() => openEvent(e)} />`;
      })}</div>`}
    </div>
  </section>`;
}

/* ============ SOS: what set it off, and your plan for it ============ */
export function SosPlan({ s, picked, onPick }) {
  const plan = picked.map((t) => s.plans[t] && { t, p: s.plans[t] }).filter(Boolean)[0];
  const order = [...TRIGGERS].sort((a, b) => (s.plans[b] ? 1 : 0) - (s.plans[a] ? 1 : 0));
  return html`<div class="sos-plan">
    <div class="sos-plan-k">What set it off?</div>
    <div class="sos-plan-chips">${order.map((t) => html`<button key=${t} class="chip sm ${picked.includes(t) ? 'on' : ''} ${s.plans[t] ? 'has' : ''}" style="--c:#5E5CE6" onClick=${() => { haptic(); onPick(t); }}>${s.plans[t] ? '🧭 ' : ''}${t}</button>`)}</div>
    ${plan ? html`<div class="card sos-plan-card" key=${plan.t}><span class="spc-k">Your plan for ${plan.t.toLowerCase()}</span><b>${plan.p}</b></div>`
    : picked.length > 0 ? html`<button class="link sm sos-plan-add" onClick=${() => openPlanEditor(picked[0])}>No plan for ${picked[0].toLowerCase()} yet. Make one for next time</button>` : null}
  </div>`;
}

/* ============ Progress: craving stats ============ */
const median = (xs) => { const a = [...xs].sort((x, y) => x - y); const n = a.length; return n ? (n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2) : null; };
const mins = (secs) => (secs < 60 ? `${Math.max(1, Math.round(secs))} sec` : `${Math.round(secs / 60)} min`);

export function cravingStats(s, now = Date.now()) {
  const all = s.cravings.filter((c) => c.t <= now);
  const beaten = all.filter((c) => c.beaten);
  const timed = beaten.filter((c) => c.secs > 5);
  // Last 8 weeks, oldest first: how many cravings, and how long beaten ones took (median)
  const wk0 = S.weekStart(new Date(now)).getTime();
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const from = wk0 - (7 - i) * 7 * DAY, to = from + 7 * DAY;
    const xs = all.filter((c) => c.t >= from && c.t < to);
    return { from, n: xs.length, secs: median(xs.filter((c) => c.beaten && c.secs > 5).map((c) => c.secs)) };
  });
  // Trend: first third of timed cravings vs the latest third
  let trend = null;
  if (timed.length >= 6) {
    const k = Math.floor(timed.length / 3);
    const sorted = [...timed].sort((a, b) => a.t - b.t);
    const a = median(sorted.slice(0, k).map((c) => c.secs)), b = median(sorted.slice(-k).map((c) => c.secs));
    trend = { from: a, to: b };
  }
  return { total: all.length, beaten: beaten.length, typical: median(timed.map((c) => c.secs)), weeks, trend };
}

export function CravingStats({ s }) {
  const st = cravingStats(s);
  if (!st.total) return null;
  const max = Math.max(1, ...st.weeks.map((w) => w.n));
  const pct = Math.round((st.beaten / st.total) * 100);
  const line = st.trend && st.trend.to < st.trend.from * 0.85 ? `Your cravings are getting shorter: from about ${mins(st.trend.from)} to ${mins(st.trend.to)}.`
    : st.trend && st.trend.to > st.trend.from * 1.15 ? `Cravings have been lasting a bit longer lately (${mins(st.trend.to)}). Tough patches pass. Keep using SOS.`
    : st.typical ? `Most of your cravings pass in about ${mins(st.typical)}. You only ever have to outlast this one.` : 'Use Craving SOS when one hits to see how long they last.';
  return html`<section class="group">
    <h2 class="group-h">Craving SOS</h2>
    <div class="card pad cstats">
      <div class="cs-tiles">
        <div><b>${st.typical ? mins(st.typical) : '–'}</b><span>typical craving</span></div>
        <div><b>${st.beaten}<small>/${st.total}</small></b><span>beaten (${pct}%)</span></div>
      </div>
      <div class="cs-chart" aria-label="Cravings per week, last 8 weeks">
        ${st.weeks.map((w, i) => html`<div class="cs-col" key=${i}>
          <span class="cs-n">${w.n || ''}</span>
          <span class="cs-bar" style=${`height:${(w.n / max) * 100}%`}></span>
          <span class="cs-d">${i === 7 ? 'Now' : new Date(w.from).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).replace(' ', ' ')}</span>
        </div>`)}
      </div>
      <p class="insight">${line}</p>
      <p class="tiny muted">Cravings per week from Craving SOS. Typical time is from opening SOS to tapping “I beat it”.</p>
    </div>
  </section>`;
}
