// Routines: your saved workouts (start one in a tap), the starter plans to add, and the routine editor.
import { useState } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, toast } from '../ui.js';
import { confirmSheet } from '../shared.js';
import { PROGRAMMES, exById } from './data.js';
import { pickExercises, ExIcon } from './library.js';

// Copy a starter plan's workouts into your routines
export function addProgramme(id, { quiet } = {}) {
  const p = PROGRAMMES.find((x) => x.id === id);
  if (!p) return;
  S.update((d) => {
    p.r.forEach((r) => d.fitness.routines.push({ id: S.uid(), name: r.name, prog: p.id, ex: r.ex.map(([x, sets, reps]) => ({ x, sets, reps })) }));
  });
  if (!quiet) { haptic(15); toast(`${p.name} added to your routines`); }
}

export function openProgrammes() { openSheet((close) => html`<${Programmes} close=${close} />`, { tall: true }); }
function Programmes({ close }) {
  const s = S.getState();
  const have = new Set(s.fitness.routines.map((r) => r.prog).filter(Boolean));
  return html`
    <${SheetBar} title="Starter plans" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Ready-made plans. Adding one copies its workouts into your routines, where you can change anything.</p>
      ${PROGRAMMES.map((p) => html`<div class="card fx-prog" key=${p.id}>
        <div class="fx-prog-h"><span class="fx-prog-e">${p.e}</span><span class="row-main"><b>${p.name}</b><small>${p.days} · ${p.r.length} workout${p.r.length === 1 ? '' : 's'}</small></span></div>
        <p>${p.d}</p>
        <div class="fx-prog-r">${p.r.map((r) => html`<div key=${r.name}><b>${r.name}</b><span>${r.ex.map(([x]) => exById(x).n).join(' · ')}</span></div>`)}</div>
        ${have.has(p.id) ? html`<span class="pill ok">Added</span>` : html`<button class="btn btn-tinted sm" onClick=${() => { addProgramme(p.id); close(); }}>Add plan</button>`}
      </div>`)}
    </div>`;
}

/* ---------- edit a routine (or make a new one) ---------- */
export function openRoutineEditor(id = null) { openSheet((close) => html`<${RoutineEditor} id=${id} close=${close} />`, { tall: true }); }
function RoutineEditor({ id, close }) {
  const s = S.getState();
  const orig = s.fitness.routines.find((r) => r.id === id);
  const [name, setName] = useState(orig?.name || '');
  const [ex, setEx] = useState(() => (orig?.ex || []).map((e) => ({ ...e })));
  const ok = name.trim() && ex.length;
  const setAt = (i, patch) => setEx(ex.map((e, k) => (k === i ? { ...e, ...patch } : e)));
  const move = (i, d) => { const n = [...ex]; const [x] = n.splice(i, 1); n.splice(i + d, 0, x); setEx(n); haptic(); };
  const save = () => {
    if (!ok) return;
    S.update((d) => {
      const r = { id: id || S.uid(), name: name.trim().slice(0, 40), prog: orig?.prog, ex };
      if (id) d.fitness.routines = d.fitness.routines.map((x) => (x.id === id ? r : x));
      else d.fitness.routines.push(r);
    });
    haptic(15); toast(id ? 'Routine saved' : 'Routine made'); close();
  };
  const del = () => confirmSheet({
    title: 'Delete routine', text: `Delete “${orig.name}”? Workouts you’ve done with it stay in your history.`, confirm: 'Delete routine',
    onConfirm: () => { close(); S.update((d) => { d.fitness.routines = d.fitness.routines.filter((x) => x.id !== id); }); toast('Routine deleted'); },
  });
  return html`
    <${SheetBar} title=${id ? 'Edit routine' : 'New routine'} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <div class="card"><input class="fx-name in-card" placeholder="Routine name, e.g. Push day" maxlength="40" value=${name} onInput=${(e) => setName(e.target.value)} /></div>
      <${Group} header="Exercises" footer=${ex.length ? 'Sets and a target rep range for each. You can always do more or less on the day.' : ''}>
        ${ex.map((e, i) => {
          const x = exById(e.x, s);
          return html`<div class="row fx-rt" key=${`${e.x}-${i}`}>
            <${ExIcon} e=${x} />
            <span class="row-main"><span class="row-title">${x.n}</span>
              <span class="fx-rt-c">
                <span class="fx-step"><button aria-label="Fewer sets" disabled=${e.sets <= 1} onClick=${() => setAt(i, { sets: e.sets - 1 })}>−</button><b>${e.sets}</b><button aria-label="More sets" disabled=${e.sets >= 10} onClick=${() => setAt(i, { sets: e.sets + 1 })}>+</button></span>
                <span class="muted">sets ×</span>
                <input class="fx-reps" placeholder=${x.t === 't' ? '30 s' : '8–12'} maxlength="10" value=${e.reps || ''} onInput=${(ev) => setAt(i, { reps: ev.target.value })} aria-label="Target reps" />
              </span></span>
            <span class="fx-rt-m">
              <button class="icon-btn muted" aria-label="Move up" disabled=${i === 0} onClick=${() => move(i, -1)}>↑</button>
              <button class="icon-btn muted" aria-label="Remove" onClick=${() => setEx(ex.filter((_, k) => k !== i))}>${Icon.trash()}</button>
            </span>
          </div>`;
        })}
        <button class="row tap" onClick=${() => pickExercises((ids) => setEx([...ex, ...ids.map((x) => ({ x, sets: 3, reps: '' }))]))}>
          <span class="row-ic tinted" style="--c:#3B9BFF">${Icon.plus()}</span><span class="row-main"><span class="row-title">Add exercises</span></span>
        </button>
      <//>
      ${id && html`<button class="btn btn-plain danger block" onClick=${del}>Delete routine</button>`}
    </div>`;
}
