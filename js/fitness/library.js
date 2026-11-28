// Exercise library: browse and search, an exercise's page (muscles, how-to, your bests and history),
// the picker used when adding exercises to a workout or routine, and making your own exercise.
import { useState } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, Field, Segmented, toast } from '../ui.js';
import { MUSCLES, GROUPS, EQUIPMENT, TYPES, allExercises, exById, exerciseLog, bestSet, setText } from './data.js';
import { MuscleMap } from './body.js';

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
function useFilter(s) {
  const [q, setQ] = useState('');
  const [g, setG] = useState('all');
  const group = GROUPS.find((x) => x.id === g);
  const words = norm(q).split(' ').filter(Boolean);
  const list = allExercises(s).filter((e) => {
    if (group && !group.m.includes(e.m)) return false;
    if (!words.length) return true;
    const hay = norm(`${e.n} ${MUSCLES[e.m]} ${EQUIPMENT[e.eq]}`);
    return words.every((w) => hay.includes(w));
  }).sort((a, b) => a.n.localeCompare(b.n));
  const bar = html`
    <div class="card search"><span class="search-ic">${Icon.search()}</span><input placeholder="Search exercises" autocapitalize="none" autocorrect="off" spellcheck="false" value=${q} onInput=${(e) => setQ(e.target.value)} /></div>
    <div class="chip-row fx-groups">${[{ id: 'all', label: 'All' }, ...GROUPS].map((x) => html`<button key=${x.id} class="chip ${g === x.id ? 'on' : ''}" onClick=${() => { haptic(); setG(x.id); }}>${x.label}</button>`)}</div>`;
  return { list, bar };
}

const exSub = (e) => `${MUSCLES[e.m]} · ${EQUIPMENT[e.eq]}`;
export const ExIcon = ({ e }) => html`<span class="row-ic tinted fx-ex-ic" style=${`--c:${groupColor(e.m)}`}>${MUSCLES[e.m].slice(0, 2)}</span>`;
const COLORS = { chest: '#FF453A', back: '#3B9BFF', shoulders: '#FF9F0A', arms: '#BF5AF2', legs: '#30D158', glutes: '#FF375F', core: '#5AC8FA' };
export const groupColor = (m) => COLORS[GROUPS.find((x) => x.m.includes(m))?.id] || '#8E8E93';

/* ---------- browse ---------- */
export function openLibrary() { openSheet((close) => html`<${Library} close=${close} />`, { tall: true }); }
function Library({ close }) {
  const s = S.getState();
  const { list, bar } = useFilter(s);
  return html`
    <${SheetBar} title="Exercises" left=${html`<button class="link" onClick=${() => openCustomEditor()}>New</button>`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${bar}
      <div class="card list mt8">
        ${list.length ? list.map((e) => html`<button class="row tap" key=${e.id} onClick=${() => openExercise(e.id)}>
          <${ExIcon} e=${e} /><span class="row-main"><span class="row-title">${e.n}</span><span class="row-sub">${exSub(e)}</span></span><span class="row-chev">${Icon.chevron()}</span>
        </button>`) : html`<div class="row"><span class="row-main"><span class="row-sub">Nothing matches. Tap New to add your own exercise.</span></span></div>`}
      </div>
      <p class="tiny muted center">${list.length} exercise${list.length === 1 ? '' : 's'}</p>
    </div>`;
}

/* ---------- one exercise ---------- */
export function openExercise(id) { openSheet((close) => html`<${Exercise} id=${id} close=${close} />`, { tall: true }); }
function Exercise({ id, close }) {
  const s = S.getState();
  const e = exById(id, s);
  const log = exerciseLog(s, id);
  const best = bestSet(s, id);
  const custom = id.startsWith('c_');
  const del = () => { close(); S.update((d) => { d.fitness.custom = d.fitness.custom.filter((x) => x.id !== id); }); toast('Exercise deleted'); };
  return html`
    <${SheetBar} title=${e.n} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="card fx-map"><${MuscleMap} primary=${e.m} secondary=${e.s} />
        <div class="fx-tags"><span class="pill">${MUSCLES[e.m]}</span>${e.s.map((m) => html`<span class="pill muted" key=${m}>${MUSCLES[m]}</span>`)}<span class="pill muted">${EQUIPMENT[e.eq]}</span></div>
      </div>
      ${e.how?.length > 0 && html`<${Group} header="How to do it"><ol class="fx-how">${e.how.map((x, i) => html`<li key=${i}>${x}</li>`)}</ol><//>`}
      <${Group} header="Your record" footer=${log.length ? '' : 'Log this exercise in a workout and your bests show up here.'}>
        <div class="row"><span class="row-main"><span class="row-title">Best set</span></span><span class="row-detail">${best ? setText(best.set, e.t) : '–'}</span></div>
        <div class="row"><span class="row-main"><span class="row-title">Times done</span></span><span class="row-detail">${log.length}</span></div>
      <//>
      ${log.length > 0 && html`<${Group} header="History">
        ${log.slice(0, 12).map((x) => html`<div class="row" key=${x.at}><span class="row-main"><span class="row-title">${setText(x.top, e.t)}${x.pb ? ' 🏆' : ''}</span>
          <span class="row-sub">${S.fmtDate(new Date(x.at))} · ${x.sets} set${x.sets === 1 ? '' : 's'}</span></span></div>`)}
      <//>`}
      ${custom && html`<button class="btn btn-plain danger block" onClick=${del}>Delete this exercise</button>`}
    </div>`;
}

/* ---------- picker: choose one or more exercises ---------- */
export function pickExercises(onPick, { title = 'Add exercises' } = {}) {
  openSheet((close) => html`<${Picker} title=${title} close=${close} onPick=${onPick} />`, { tall: true });
}
function Picker({ title, close, onPick }) {
  const s = S.getState();
  const { list, bar } = useFilter(s);
  const [sel, setSel] = useState([]);
  const toggle = (id) => { haptic(); setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]); };
  const add = () => { close(); onPick(sel); };
  return html`
    <${SheetBar} title=${title} left=${html`<button class="link" onClick=${close}>Cancel</button>`}
      right=${html`<button class="link b" disabled=${!sel.length} onClick=${add}>Add${sel.length ? ` (${sel.length})` : ''}</button>`} />
    <div class="sheet-body">
      ${bar}
      <div class="card list mt8">
        ${list.map((e) => html`<button class="row tap ${sel.includes(e.id) ? 'fx-sel' : ''}" key=${e.id} onClick=${() => toggle(e.id)}>
          <${ExIcon} e=${e} /><span class="row-main"><span class="row-title">${e.n}</span><span class="row-sub">${exSub(e)}</span></span>
          <span class="fx-check ${sel.includes(e.id) ? 'on' : ''}">${sel.includes(e.id) ? sel.indexOf(e.id) + 1 : ''}</span>
        </button>`)}
      </div>
      <button class="btn btn-plain block" onClick=${() => openCustomEditor((id) => setSel([...sel, id]))}>${Icon.plus()} Make your own exercise</button>
    </div>`;
}

/* ---------- your own exercise ---------- */
export function openCustomEditor(onSaved) { openSheet((close) => html`<${CustomEditor} close=${close} onSaved=${onSaved} />`, { tall: true }); }
function CustomEditor({ close, onSaved }) {
  const [f, setF] = useState({ n: '', m: 'chest', eq: 'machine', t: 'w' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ok = f.n.trim().length >= 2;
  const save = () => {
    if (!ok) return;
    const id = `c_${S.uid()}`;
    S.update((d) => { d.fitness.custom = [...d.fitness.custom, { id, n: f.n.trim().slice(0, 40), m: f.m, s: [], eq: f.eq, t: f.t, how: [] }]; });
    haptic(15); toast('Exercise added'); close(); onSaved?.(id);
  };
  return html`
    <${SheetBar} title="New exercise" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group}>
        <${Field} label="Name"><input placeholder="e.g. Cable Y-raise" maxlength="40" value=${f.n} onInput=${set('n')} /><//>
        <${Field} label="Muscle"><select value=${f.m} onChange=${set('m')}>${Object.entries(MUSCLES).map(([k, v]) => html`<option value=${k}>${v}</option>`)}</select><//>
        <${Field} label="Equipment"><select value=${f.eq} onChange=${set('eq')}>${Object.entries(EQUIPMENT).map(([k, v]) => html`<option value=${k}>${v}</option>`)}</select><//>
      <//>
      <${Group} header="How you log it">
        <div class="pad"><${Segmented} options=${Object.entries(TYPES).map(([value, label]) => ({ value, label: label.split(' ')[0] }))} value=${f.t} onChange=${(t) => setF({ ...f, t })} /></div>
        <p class="group-f">${TYPES[f.t]}${f.t === 'b' ? ', with extra weight if you add some' : f.t === 't' ? ', with weight if you hold some' : ''}.</p>
      <//>
    </div>`;
}
