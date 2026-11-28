// Fitness tab: start a workout (empty or from a routine), this week at a glance, recent workouts,
// the exercise library, rest timer setting, and your goals & habits (which used to have their own tab).
import * as S from '../store.js';
import { html, haptic, Icon, Page, Group, Segmented, openSheet, SheetBar, toast, useNow } from '../ui.js';
import { confirmSheet } from '../shared.js';
import { EXERCISES, exById, history, workoutStats, weekWorkouts, nextRoutine, setText } from '../fitness/data.js';
import { startWorkout, openLogger, Elapsed } from '../fitness/logger.js';
import { openLibrary, ExIcon } from '../fitness/library.js';
import { openProgrammes, openRoutineEditor } from '../fitness/routines.js';
import { GoalsBody, openGoalEditor } from './goals.js';

const DAY = 864e5;
const ago = (t, now) => {
  const d = S.daysBetween(new Date(t), new Date(now));
  return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : d < 7 ? `${d} days ago` : S.fmtDate(new Date(t), { day: 'numeric', month: 'short' });
};
const volText = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)} t` : `${Math.round(v)} kg`);

export function Fitness({ s }) {
  const now = useNow(60000);
  const f = s.fitness;
  const a = f.active;
  const ws = S.weekStart(new Date(now)).getTime();
  const week = weekWorkouts(s, ws);
  const wstats = week.reduce((t, w) => { const x = workoutStats(w, s); return { sets: t.sets + x.sets, mins: t.mins + x.mins, volume: t.volume + x.volume }; }, { sets: 0, mins: 0, volume: 0 });
  const days = Array.from({ length: 7 }, (_, i) => { const k = S.dayKey(new Date(ws + i * DAY)); return { k, on: week.some((w) => S.dayKey(new Date(w.start)) === k), today: k === S.dayKey(new Date(now)) }; });
  // Weeks in a row with at least one workout (this week counts once it has one)
  let streak = 0;
  for (let w = week.length ? ws : ws - 7 * DAY; weekWorkouts(s, w).length; w -= 7 * DAY) streak++;
  const recent = history(s).slice(0, 5);
  const next = nextRoutine(s);
  const startBtn = html`<button class="icon-btn accent" aria-label="Start an empty workout" onClick=${() => startWorkout()}>${Icon.plus()}</button>`;

  return html`<${Page} title="Fitness" right=${startBtn}>
    ${a ? html`<button class="card fx-live tap" onClick=${openLogger}>
        <span class="fx-live-dot"></span>
        <span class="row-main"><span class="row-title">${a.name}</span><span class="row-sub">In progress · <${Elapsed} start=${a.start} /></span></span>
        <span class="btn btn-primary sm">Resume</span>
      </button>`
    : html`<button class="card fx-hero tap" onClick=${() => startWorkout(next)}>
        <span class="fx-hero-k">${next ? 'Up next' : 'Ready when you are'}</span>
        <b>${next ? next.name : 'Start a workout'}</b>
        <span class="fx-hero-s">${next ? `${next.ex.length} exercise${next.ex.length === 1 ? '' : 's'} · ${next.ex.slice(0, 3).map((e) => exById(e.x, s).n).join(', ')}${next.ex.length > 3 ? '…' : ''}` : 'Log sets as you go. Add exercises on the fly.'}</span>
        <span class="btn fx-hero-btn">${Icon.plus()} Start</span>
      </button>`}

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">This week</h2>${streak > 0 && html`<span class="pill sm fx-streak">🔥 ${streak} week${streak === 1 ? '' : 's'} in a row</span>`}</div>
      <div class="card fx-week">
        <div class="fx-days">${days.map((d, i) => html`<span key=${d.k} class="${d.on ? 'on' : ''} ${d.today ? 'today' : ''}"><i>${d.on ? Icon.check() : ''}</i><small>${'MTWTFSS'[i]}</small></span>`)}</div>
        <div class="fx-wstats">
          <div><b>${week.length}</b><span>workout${week.length === 1 ? '' : 's'}</span></div>
          <div><b>${wstats.sets}</b><span>sets</span></div>
          <div><b>${wstats.mins}</b><span>minute${wstats.mins === 1 ? '' : 's'}</span></div>
          <div><b>${volText(wstats.volume)}</b><span>lifted</span></div>
        </div>
      </div>
    </section>

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Routines</h2><button class="link sm b" onClick=${() => openRoutineEditor()}>${Icon.plus()} New</button></div>
      ${f.routines.length ? html`<div class="fx-routines">
        ${f.routines.map((r) => {
          const last = history(s).find((w) => w.rid === r.id);
          return html`<div class="card fx-routine" key=${r.id}>
            <button class="fx-routine-main" onClick=${() => openRoutineEditor(r.id)}>
              <b>${r.name}</b>
              <span>${r.ex.map((e) => exById(e.x, s).n).join(' · ')}</span>
              <small>${last ? `Last done ${ago(last.start, now).toLowerCase()}` : 'Not done yet'}</small>
            </button>
            <button class="btn btn-tinted sm" disabled=${!!a} onClick=${() => startWorkout(r)}>Start</button>
          </div>`;
        })}
        </div>
        <button class="link sm b fx-more" onClick=${openProgrammes}>Browse starter plans</button>`
      : html`<div class="card fx-empty">
          <b>Pick a plan or build your own</b>
          <p>Starter plans for beginners, strength, push/pull/legs, upper/lower and home workouts.</p>
          <div class="fx-empty-b"><button class="btn btn-primary sm" onClick=${openProgrammes}>Starter plans</button><button class="btn btn-tinted sm" onClick=${() => openRoutineEditor()}>Build a routine</button></div>
        </div>`}
    </section>

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Recent workouts</h2>${history(s).length > 5 && html`<button class="link sm b" onClick=${openHistory}>See all</button>`}</div>
      <div class="card list">
        ${recent.length ? recent.map((w) => html`<${WorkoutRow} key=${w.id} w=${w} s=${s} now=${now} />`)
        : html`<div class="row"><span class="row-main"><span class="row-sub">Your finished workouts show up here.</span></span></div>`}
      </div>
    </section>

    <${Group} header="Library and settings">
      <button class="row tap" onClick=${openLibrary}>
        <span class="row-ic tinted" style="--c:#30D158">${Icon.search()}</span>
        <span class="row-main"><span class="row-title">Exercises</span><span class="row-sub">${EXERCISES.length + f.custom.length} with how-to steps and the muscles they work</span></span>
        <span class="row-chev">${Icon.chevron()}</span>
      </button>
      <div class="row"><span class="row-ic tinted" style="--c:#A2A8B8">${Icon.clock()}</span>
        <span class="row-main"><span class="row-title">Rest timer</span><span class="row-sub">Starts when you tick off a set</span></span></div>
      <div class="pad fx-rest-pick"><${Segmented} small options=${[60, 90, 120, 180].map((v) => ({ value: v, label: v < 120 ? `${v} s` : `${v / 60} min` }))} value=${f.rest || 90} onChange=${(v) => S.update((d) => { d.fitness.rest = v; })} /></div>
    <//>

    <section class="group fx-goals">
      <div class="group-h-row"><h2 class="group-h">Goals & habits</h2><button class="link sm b" onClick=${() => openGoalEditor()}>${Icon.plus()} New</button></div>
      <${GoalsBody} s=${s} />
    </section>
  <//>`;
}

function WorkoutRow({ w, s, now }) {
  const st = workoutStats(w, s);
  return html`<button class="row tap" onClick=${() => openWorkout(w.id)}>
    <span class="row-ic tinted" style="--c:#30D158">${Icon.check()}</span>
    <span class="row-main"><span class="row-title">${w.name}${w.ex.some((e) => e.sets.some((x) => x.pb)) ? ' 🏆' : ''}</span>
      <span class="row-sub">${ago(w.start, now)} · ${st.mins} min · ${st.sets} sets${st.volume ? ` · ${volText(st.volume)}` : ''}</span></span>
    <span class="row-chev">${Icon.chevron()}</span>
  </button>`;
}

function openHistory() {
  openSheet((close) => {
    const s = S.getState();
    const now = Date.now();
    return html`<${SheetBar} title="All workouts" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
      <div class="sheet-body"><div class="card list">${history(s).map((w) => html`<${WorkoutRow} key=${w.id} w=${w} s=${s} now=${now} />`)}</div></div>`;
  }, { tall: true });
}

/* ---------- one finished workout ---------- */
function openWorkout(id) { openSheet((close) => html`<${Workout} id=${id} close=${close} />`, { tall: true }); }
function Workout({ id, close }) {
  const s = S.getState();
  const w = s.fitness.workouts.find((x) => x.id === id);
  if (!w) return null;
  const st = workoutStats(w, s);
  const asRoutine = { id: w.rid, name: w.name, ex: w.ex.map((e) => ({ x: e.x, sets: e.sets.length, reps: '' })) };
  const del = () => confirmSheet({
    title: 'Delete workout', text: `Delete “${w.name}” from your history? Any bests set in it go too.`, confirm: 'Delete workout',
    onConfirm: () => { close(); S.update((d) => { d.fitness.workouts = d.fitness.workouts.filter((x) => x.id !== id); }); toast('Workout deleted'); },
  });
  const save = () => { S.update((d) => { d.fitness.routines.push({ id: S.uid(), name: w.name, ex: asRoutine.ex }); }); haptic(15); toast('Saved as a routine'); };
  return html`
    <${SheetBar} title=${w.name} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center">${S.fmtDate(new Date(w.start), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${st.mins} min · ${st.sets} sets${st.volume ? ` · ${volText(st.volume)}` : ''}</p>
      ${w.ex.map((e, i) => {
        const x = exById(e.x, s);
        return html`<div class="card fx-wex" key=${i}>
          <div class="fx-wex-h"><${ExIcon} e=${x} /><b>${x.n}</b></div>
          ${e.sets.map((y, j) => html`<div class="fx-wset ${y.pb ? 'pb' : ''}" key=${j}><span>${y.w ? 'W' : e.sets.slice(0, j).filter((z) => !z.w).length + 1}</span><span>${setText(y, x.t)}</span>${y.pb && html`<span class="pill sm fx-pb">Best</span>`}</div>`)}
        </div>`;
      })}
      <button class="btn btn-primary block" disabled=${!!s.fitness.active} onClick=${() => { close(); setTimeout(() => startWorkout(asRoutine), 350); }}>Do this workout again</button>
      ${!w.rid && html`<button class="btn btn-tinted block" onClick=${save}>Save as a routine</button>`}
      <button class="btn btn-plain danger block" onClick=${del}>Delete workout</button>
    </div>`;
}
