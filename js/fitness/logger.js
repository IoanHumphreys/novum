// The workout in progress: sets × reps × weight with last time's numbers beside each set, a rest timer that
// keeps counting if you leave the app, personal-best moments, then a summary when you finish.
// The workout lives in s.fitness.active, so closing the sheet (or the app) never loses it.
import { useState, useEffect, useRef } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, Icon, openSheet, SheetBar, toast, useNow, closeAllSheets } from '../ui.js';
import { confirmSheet } from '../shared.js';
import { exById, lastSets, bestSet, setScore, setText, workoutStats, fmtKg } from './data.js';
import { pickExercises, openExercise, ExIcon } from './library.js';

const now = () => Date.now();
// Keeps a sheet in step with the store
function useApp() {
  const [s, setS] = useState(S.getState());
  useEffect(() => S.subscribe(setS), []);
  return s;
}
// Change the workout in progress
const act = (fn) => S.update((d) => { if (d.fitness.active) fn(d.fitness.active, d); });

/* ---------- start ---------- */
// A blank workout, or one from a routine with last time's weights ready to go
export function startWorkout(routine = null) {
  const s = S.getState();
  if (s.fitness.active) {
    confirmSheet({
      title: 'Workout in progress', text: `You’ve already got “${s.fitness.active.name}” going. Finish or discard it first.`, confirm: 'Open it', danger: false,
      onConfirm: () => setTimeout(openLogger, 350),
    });
    return;
  }
  haptic(15);
  const ex = (routine?.ex || []).map((r) => ({ x: r.x, reps: r.reps || '', sets: Array.from({ length: Math.max(1, r.sets || 3) }, () => ({})) }));
  const hr = new Date().getHours();
  const name = routine?.name || (hr < 11 ? 'Morning workout' : hr < 17 ? 'Afternoon workout' : 'Evening workout');
  S.update((d) => { d.fitness.active = { id: S.uid(), start: now(), name, rid: routine?.id || null, note: '', ex }; });
  openLogger();
}

export function openLogger() { openSheet((close) => html`<${Logger} close=${close} />`, { tall: true }); }

/* ---------- clocks (their own components so typing isn't interrupted every second) ---------- */
const clock = (ms) => { const t = Math.max(0, Math.floor(ms / 1000)); const h = Math.floor(t / 3600); const m = Math.floor((t % 3600) / 60); const sec = String(t % 60).padStart(2, '0'); return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`; };
export function Elapsed({ start }) { const n = useNow(1000); return clock(n - start); }

function RestBar({ restEnd, rest }) {
  const n = useNow(250);
  const left = restEnd ? restEnd - n : 0;
  const buzzed = useRef(0);
  useEffect(() => {
    if (restEnd && left <= 0 && buzzed.current !== restEnd) { buzzed.current = restEnd; haptic(300); act((a) => { delete a.restEnd; }); }
  }, [left <= 0, restEnd]);
  if (!restEnd || left <= 0) return null;
  const pct = Math.max(0, Math.min(1, left / (rest * 1000)));
  const add = (sec) => { haptic(); act((a) => { a.restEnd = Math.max(now() + 1000, (a.restEnd || now()) + sec * 1000); }); };
  return html`<div class="fx-rest" role="timer" aria-live="off">
    <i style=${`width:${pct * 100}%`}></i>
    <button class="fx-rest-b" onClick=${() => add(-15)}>−15</button>
    <span class="fx-rest-t"><small>Rest</small>${clock(left + 999)}</span>
    <button class="fx-rest-b" onClick=${() => add(15)}>+15</button>
    <button class="fx-rest-b skip" onClick=${() => { haptic(); act((a) => { delete a.restEnd; }); }}>Skip</button>
  </div>`;
}

/* ---------- the logger ---------- */
function Logger({ close }) {
  const s = useApp();
  const a = s.fitness.active;
  if (!a) return html`<${SheetBar} title="Workout" right=${html`<button class="link b" onClick=${close}>Done</button>`} /><div class="sheet-body"><p class="muted center pad">No workout in progress.</p></div>`;
  const doneSets = a.ex.reduce((n, e) => n + e.sets.filter((x) => x.d).length, 0);
  const addEx = () => pickExercises((ids) => { act((w) => { ids.forEach((x) => w.ex.push({ x, sets: [{}, {}, {}] })); }); });
  const discard = () => confirmSheet({
    title: 'Discard workout', text: 'Throw this workout away? Nothing from it will be saved.', confirm: 'Discard workout',
    onConfirm: () => { closeAllSheets(); S.update((d) => { d.fitness.active = null; }); toast('Workout discarded'); },
  });
  const finish = () => {
    const open = a.ex.reduce((n, e) => n + e.sets.filter((x) => !x.d).length, 0);
    if (!doneSets) { confirmSheet({ title: 'Nothing ticked yet', text: 'Tick off at least one set to save this workout, or discard it.', confirm: 'Discard workout', onConfirm: () => { closeAllSheets(); S.update((d) => { d.fitness.active = null; }); } }); return; }
    const save = () => {
      const id = a.id;
      S.update((d) => {
        const w = d.fitness.active;
        const { restEnd, ...rest } = w;
        d.fitness.workouts.push({ ...rest, end: now(), ex: w.ex.map(({ reps, ...e }) => ({ ...e, sets: e.sets.filter((x) => x.d) })).filter((e) => e.sets.length) });
        d.fitness.active = null;
      });
      haptic(30); close(); setTimeout(() => openSummary(id), 380);
    };
    if (open) confirmSheet({ title: 'Finish workout?', text: `${open} set${open === 1 ? ' isn’t' : 's aren’t'} ticked. Unticked sets won’t be saved.`, confirm: 'Finish', danger: false, onConfirm: save });
    else save();
  };
  return html`
    <${SheetBar} title=${html`<span class="fx-clock"><${Elapsed} start=${a.start} /></span>`}
      left=${html`<button class="link" aria-label="Minimise" onClick=${close}>Hide</button>`}
      right=${html`<button class="btn btn-primary sm fx-finish" onClick=${finish}>Finish</button>`} />
    <div class="sheet-body fx-logger">
      <input class="fx-name" value=${a.name} maxlength="40" aria-label="Workout name" onChange=${(e) => act((w) => { w.name = e.target.value.trim().slice(0, 40) || w.name; })} />
      <p class="fx-meta">${S.fmtDate(new Date(a.start), { weekday: 'long', day: 'numeric', month: 'long' })} · ${doneSets} set${doneSets === 1 ? '' : 's'} done</p>
      ${a.ex.map((e, i) => html`<${ExerciseCard} key=${`${e.x}-${i}`} e=${e} i=${i} s=${s} count=${a.ex.length} />`)}
      ${!a.ex.length && html`<p class="muted center pad">Add your first exercise to get going.</p>`}
      <button class="btn btn-tinted block" onClick=${addEx}>${Icon.plus()} Add exercises</button>
      <button class="btn btn-plain danger block" onClick=${discard}>Discard workout</button>
      <div class="fx-rest-space"></div>
    </div>
    <${RestBar} restEnd=${a.restEnd} rest=${s.fitness.rest || 90} />`;
}

function ExerciseCard({ e, i, s, count }) {
  const ex = exById(e.x, s);
  const prev = lastSets(s, e.x);
  const t = ex.t;
  const more = () => openSheet((c) => html`
    <${SheetBar} title=${ex.n} right=${html`<button class="link b" onClick=${c}>Close</button>`} />
    <div class="sheet-body"><div class="card list">
      <button class="row tap" onClick=${() => { c(); setTimeout(() => openExercise(e.x), 350); }}><span class="row-main"><span class="row-title">How to do it and history</span></span><span class="row-chev">${Icon.chevron()}</span></button>
      ${i > 0 && html`<button class="row tap" onClick=${() => { c(); act((w) => { const [x] = w.ex.splice(i, 1); w.ex.splice(i - 1, 0, x); }); }}><span class="row-main"><span class="row-title">Move up</span></span></button>`}
      ${i < count - 1 && html`<button class="row tap" onClick=${() => { c(); act((w) => { const [x] = w.ex.splice(i, 1); w.ex.splice(i + 1, 0, x); }); }}><span class="row-main"><span class="row-title">Move down</span></span></button>`}
      <button class="row tap" onClick=${() => { c(); setTimeout(() => pickExercises((ids) => ids[0] && act((w) => { w.ex[i] = { x: ids[0], sets: w.ex[i].sets.map(() => ({})) }; }), { title: 'Swap for' }), 350); }}><span class="row-main"><span class="row-title">Swap exercise</span></span></button>
      <button class="row tap danger" onClick=${() => { c(); act((w) => { w.ex.splice(i, 1); }); }}><span class="row-main"><span class="row-title">Remove from workout</span></span></button>
    </div></div>`);
  const cols = t === 't' ? ['kg', 'Secs'] : t === 'b' ? ['+kg', 'Reps'] : ['kg', 'Reps'];
  return html`<div class="card fx-ex">
    <div class="fx-ex-h">
      <button class="fx-ex-name" onClick=${() => openExercise(e.x)}><${ExIcon} e=${ex} /><span><b>${ex.n}</b>${e.reps && html`<small>Target ${e.reps}${/\d$/.test(e.reps) && t !== 't' ? ' reps' : ''}</small>`}</span></button>
      <button class="icon-btn muted" aria-label="More" onClick=${more}>•••</button>
    </div>
    <div class="fx-grid fx-grid-h"><span>Set</span><span>Previous</span><span>${cols[0]}</span><span>${cols[1]}</span><span></span></div>
    ${e.sets.map((x, j) => html`<${SetRow} key=${j} x=${x} j=${j} i=${i} t=${t} prev=${prev[j] || prev[prev.length - 1]} warmIdx=${e.sets.slice(0, j).filter((y) => !y.w).length + 1} />`)}
    <div class="fx-ex-f">
      <button class="link sm" onClick=${() => { haptic(); act((w) => { const sets = w.ex[i].sets; const last = sets[sets.length - 1] || {}; sets.push({ kg: last.kg, r: undefined, s: undefined }); }); }}>${Icon.plus()} Add set</button>
      ${e.sets.length > 1 && html`<button class="link sm muted" onClick=${() => act((w) => { w.ex[i].sets.pop(); })}>Remove set</button>`}
    </div>
  </div>`;
}

const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return Number.isFinite(n) && n >= 0 ? Math.min(n, 9999) : undefined; };

function SetRow({ x, j, i, t, prev, warmIdx }) {
  const k2 = t === 't' ? 's' : 'r';
  const ph1 = prev?.kg != null ? fmtKg(prev.kg) : t === 'w' ? '0' : '–';
  const ph2 = prev ? (t === 't' ? String(prev.s || '') : String(prev.r || '')) : '';
  const setVal = (k, v) => act((w) => { const y = w.ex[i]?.sets[j]; if (y) { if (v === undefined) delete y[k]; else y[k] = v; } });
  const tick = () => {
    const s = S.getState();
    const a = s.fitness.active;
    const y = a?.ex[i]?.sets[j];
    if (!y) return;
    if (y.d) { haptic(); act((w) => { const z = w.ex[i].sets[j]; z.d = false; delete z.pb; }); return; }
    // Empty boxes take last time's numbers, so repeating a set is one tap
    const kg = y.kg ?? (prev?.kg ?? (t === 'w' ? undefined : 0));
    const v2 = y[k2] ?? (prev ? prev[k2] : undefined);
    if ((t === 'w' && !(kg >= 0 && kg !== undefined)) || !v2) { toast(t === 't' ? 'Add the time first' : t === 'w' ? 'Add the weight and reps first' : 'Add the reps first'); return; }
    // Personal best: better than every finished workout and every earlier set today (only once there's history to beat)
    const exId = a.ex[i].x;
    const before = bestSet(s, exId, a.start);
    const cand = { kg, [k2]: v2 };
    const score = setScore(cand, t);
    const today = Math.max(0, ...a.ex.flatMap((e) => (e.x === exId ? e.sets.filter((z) => z.d && !z.w && z !== y).map((z) => setScore(z, t)) : [])));
    const pb = !y.w && before && score > before.score && score > today;
    haptic(pb ? [20, 40, 30] : 18);
    act((w) => {
      const z = w.ex[i].sets[j];
      Object.assign(z, cand, { d: true });
      if (pb) { w.ex.forEach((e) => e.x === exId && e.sets.forEach((q) => delete q.pb)); z.pb = true; }
      w.restEnd = now() + (S.getState().fitness.rest || 90) * 1000;
    });
    if (pb) toast(`🏆 New best on ${exById(exId, s).n}: ${setText(cand, t)}`);
  };
  const label = x.w ? 'W' : warmIdx;
  return html`<div class="fx-grid fx-set ${x.d ? 'done' : ''} ${x.pb ? 'pb' : ''}">
    <button class="fx-setno ${x.w ? 'warm' : ''}" aria-label="Warm-up set" title="Tap to mark as a warm-up" onClick=${() => { haptic(); act((w) => { const z = w.ex[i].sets[j]; z.w = !z.w; if (z.w) delete z.pb; }); }}>${label}</button>
    <span class="fx-prev">${prev ? setText(prev, t) : '–'}</span>
    <input type="number" inputmode="decimal" step="any" enterkeyhint="next" placeholder=${ph1} value=${x.kg ?? ''} aria-label=${t === 'b' ? 'Extra weight in kg' : 'Weight in kg'}
      onChange=${(ev) => setVal('kg', num(ev.target.value))} />
    <input type="number" inputmode=${t === 't' ? 'numeric' : 'numeric'} step="1" enterkeyhint="done" placeholder=${ph2} value=${x[k2] ?? ''} aria-label=${t === 't' ? 'Seconds' : 'Reps'}
      onChange=${(ev) => setVal(k2, num(ev.target.value) !== undefined ? Math.round(num(ev.target.value)) : undefined)} />
    <button class="fx-tick ${x.d ? 'on' : ''}" aria-pressed=${!!x.d} aria-label="Set done" onClick=${tick}>${Icon.check()}</button>
  </div>`;
}

/* ---------- after finishing ---------- */
export function openSummary(id) { openSheet((close) => html`<${Summary} id=${id} close=${close} />`, { tall: true }); }
function Summary({ id, close }) {
  const s = useApp();
  const w = s.fitness.workouts.find((x) => x.id === id);
  if (!w) return null;
  const st = workoutStats(w, s);
  const pbs = w.ex.flatMap((e) => e.sets.filter((x) => x.pb).map((x) => ({ n: exById(e.x, s).n, text: setText(x, exById(e.x, s).t) })));
  const count = s.fitness.workouts.length;
  const saveRoutine = () => {
    S.update((d) => { d.fitness.routines.push({ id: S.uid(), name: w.name, ex: w.ex.map((e) => ({ x: e.x, sets: e.sets.filter((x) => !x.w).length || 1, reps: '' })) }); });
    toast('Saved as a routine'); haptic(15);
  };
  return html`
    <${SheetBar} title="Workout done" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="fx-done"><div class="ready-ring fx-ring"><span>✓</span></div>
        <h2>${w.name}</h2><p class="muted">Workout number ${count}. Nice work.</p></div>
      <div class="tiles fx-tiles">
        <div class="tile"><span class="tile-k">Time</span><b>${st.mins}</b><span class="tile-u">minute${st.mins === 1 ? '' : 's'}</span></div>
        <div class="tile"><span class="tile-k">Sets</span><b>${st.sets}</b><span class="tile-u">done</span></div>
        <div class="tile"><span class="tile-k">Volume</span><b>${st.volume >= 1000 ? `${(st.volume / 1000).toFixed(1)}t` : Math.round(st.volume)}</b><span class="tile-u">${st.volume >= 1000 ? 'tonnes lifted' : 'kg lifted'}</span></div>
      </div>
      ${pbs.length > 0 && html`<div class="card list mt12">${pbs.map((p, k) => html`<div class="row" key=${k}><span class="row-ic tinted" style="--c:#FFC21A">🏆</span>
        <span class="row-main"><span class="row-title">New best: ${p.n}</span><span class="row-sub">${p.text}</span></span></div>`)}</div>`}
      ${!w.rid && html`<button class="btn btn-tinted block" onClick=${saveRoutine}>Save as a routine</button>`}
    </div>`;
}

