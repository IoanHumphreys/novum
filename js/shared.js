// Helpers shared by several screens: dates, milestone maths, goal labels, confirm sheet, note box.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, openSheet, SheetBar } from './ui.js';
import { MILESTONES, healthFor } from './content.js';
import * as A from './api.js';

export const DAY = 864e5;

export const pad2 = (n) => String(n).padStart(2, '0');

export const NEW_YEAR = new Date(2027, 0, 1);

/* ============ shared helpers ============ */
export function fmtLeft(days) {
  if (days < 1) { const h = Math.max(1, Math.ceil(days * 24)); return `${h} hr${h === 1 ? '' : 's'}`; }
  const d = Math.ceil(days); return `${d} day${d === 1 ? '' : 's'}`;
}

export const RING_LABEL = { 1: '1 day', 3: '3 days', 7: '1 wk', 14: '2 wks', 30: '1 mo', 90: '3 mo', 100: '100 d', 182: '6 mo', 365: '1 yr' };

// Compact time-left label for the ring centre: "14d" or "5h"
export const ringLeft = (days) => (days < 1 ? `${Math.max(1, Math.ceil(days * 24))}h` : `${Math.ceil(days)}d`);

export function milestoneInfo(days) {
  const next = MILESTONES.find((m) => m.days > days);
  const prev = [...MILESTONES].reverse().find((m) => m.days <= days);
  const from = prev ? prev.days : 0;
  return { next, prev, pct: next ? (days - from) / (next.days - from) : 1 };
}

export const firstName = () => A.getSession()?.user?.firstName || '';

// The body part each health stage is about, for the "Right now in your body" rows
export const AREA_ICON = {
  Appetite: '🍽️', Blood: '🩸', Body: '💪', Brain: '🧠', Breathing: '🌬️', Circulation: '🩸', Dreams: '💭', Energy: '⚡',
  Fitness: '🏃', Head: '🧠', Heart: '❤️', Liver: '🩺', 'Long term': '🌱', Lungs: '🫁', Mind: '🧘', Mood: '😊',
  Safety: '🛡️', Senses: '👃', 'Sleep & mood': '😴', Sleep: '😴', Stomach: '🍽️',
};
export const areaIcon = (area) => AREA_ICON[area] || '✨';

export function stageInfo(q, hours) {
  const list = healthFor(q) || [];
  const reached = list.filter((x) => x.h <= hours);
  return { current: reached[reached.length - 1], next: list.find((x) => x.h > hours) };
}

export const deadlineText = (g) => (g.period === '2027' ? (S.goalWindow(g).start < NEW_YEAR ? 'Until end of 2027' : 'All of 2027') : `By ${S.fmtDate(g.end)}`);

export const typeText = (g) => ({ habit: g.perWeek >= 7 ? 'Daily habit' : `${g.perWeek}× a week`, numeric: 'Target', milestone: 'Milestone', quit: 'Stay quit' }[g.type]);

export function toggleTick(goalId, key = S.dayKey()) {
  haptic(12);
  S.update((d) => {
    const g = d.goals.find((x) => x.id === goalId);
    if (!g) return;
    const t = new Set(g.ticks || []);
    t.has(key) ? t.delete(key) : t.add(key);
    g.ticks = [...t].sort();
  });
}

export function confirmSheet({ title, text, confirm, danger = true, onConfirm }) {
  openSheet((close) => html`
    <${SheetBar} title=${title} right=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="confirm-text">${text}</p>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} block" onClick=${() => { haptic(15); onConfirm(); close(); }}>${confirm}</button>
      <button class="btn btn-plain block" onClick=${close}>Cancel</button>
    </div>`);
}

/* ============ CHECK-IN ============ */
// Saves half a second after typing stops (and on blur), not on every keystroke
export function NoteBox({ value, onSave }) {
  const [txt, setTxt] = useState(value);
  const t = useRef();
  const saved = useRef(value);
  const commit = (v) => { clearTimeout(t.current); if (v !== saved.current) { saved.current = v; onSave(v); } };
  useEffect(() => () => clearTimeout(t.current), []);
  return html`<textarea class="note" rows="3" placeholder="Triggers, wins, how the day went…" value=${txt}
    onInput=${(e) => { const v = e.target.value; setTxt(v); clearTimeout(t.current); t.current = setTimeout(() => commit(v), 500); }}
    onBlur=${(e) => commit(e.target.value)}></textarea>`;
}

export const SLEEP = ['Bad', 'Poor', 'OK', 'Good', 'Great'];
