// Check-in tab: mood, cravings, sleep, notes, habits and the mood calendar.
import { useState, useEffect } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { GoalIcon } from '../goal-icons.js';
import { html, haptic, Icon, Page, Segmented, Group } from '../ui.js';
import { MOODS, MOOD_COLORS } from '../content.js';
import { pad2, typeText, toggleTick, NoteBox, SLEEP } from '../shared.js';
import { Progress } from './progress.js';
import { SosButton } from '../sos.js';

export function CheckIn({ s }) {
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
          <span class="row-ic tinted" style=${`--c:${g.color}`}><${GoalIcon} g=${g} /></span>
          <span class="row-main"><span class="row-title">${g.name}</span><span class="row-sub">${typeText(g)}</span></span>
          <button class="tick ${done ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${done} onClick=${() => toggleTick(g.id, day)}>${Icon.check()}</button>
        </div>`;
      })}
    <//>`}

    <section class="group">
      <h2 class="group-h">Calendar</h2>
      <${CheckinCalendar} s=${s} day=${day} onPick=${(k) => { setDay(k); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      <p class="group-f">Tap a day to see or change that check-in.</p>
    </section>
  <//>`;
}

/* ============ CHECK-IN CALENDAR ============ */
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function CheckinCalendar({ s, day, onPick }) {
  const today = S.dayKey();
  const [month, setMonth] = useState(day.slice(0, 7));
  useEffect(() => { setMonth(day.slice(0, 7)); }, [day.slice(0, 7)]);
  const [y, m] = month.split('-').map(Number);
  const lead = (new Date(y, m - 1, 1).getDay() + 6) % 7;
  const dim = new Date(y, m, 0).getDate();
  const shift = (n) => { const d = new Date(y, m - 1 + n, 1); const k = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; if (k <= today.slice(0, 7)) { haptic(); setMonth(k); } };
  const logged = Object.keys(s.checkins).filter((k) => k.startsWith(month) && s.checkins[k].mood).length;
  return html`<div class="card cal">
    <div class="cal-top">
      <button class="icon-btn" onClick=${() => shift(-1)} aria-label="Previous month">${Icon.left()}</button>
      <div class="cal-t"><b>${MONTH_NAMES[m - 1]} ${y}</b><span>${logged} check-in${logged === 1 ? '' : 's'}</span></div>
      <button class="icon-btn" onClick=${() => shift(1)} disabled=${month >= today.slice(0, 7)} aria-label="Next month">${Icon.chevron()}</button>
    </div>
    <div class="cal-grid">
      ${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => html`<span class="cal-wd" key=${'w' + i}>${d}</span>`)}
      ${Array.from({ length: lead }, (_, i) => html`<span key=${'b' + i}></span>`)}
      ${Array.from({ length: dim }, (_, i) => {
        const k = `${month}-${pad2(i + 1)}`;
        const c = s.checkins[k];
        const mood = c?.mood;
        const future = k > today;
        return html`<button key=${k} class="cal-d ${mood ? 'has' : ''} ${k === today ? 'today' : ''} ${k === day ? 'sel' : ''}" disabled=${future}
          style=${mood ? `--mc:${MOOD_COLORS[mood - 1]}` : ''} aria-label=${`${S.fmtDate(k, { weekday: 'long', day: 'numeric', month: 'long' })}${mood ? `, ${MOODS[mood - 1].l}` : ''}`}
          onClick=${() => { haptic(); onPick(k); }}>${i + 1}${c?.note ? html`<i class="cal-note"></i>` : ''}</button>`;
      })}
    </div>
    <div class="cal-key">${MOODS.map((md, i) => html`<span key=${md.v}><i style="background:${MOOD_COLORS[i]}"></i>${md.l}</span>`)}</div>
  </div>`;
}
