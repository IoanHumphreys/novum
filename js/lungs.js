// Lung test: blow steadily at the phone and Novum measures how long, how strongly and how steadily,
// using the microphone and the phone's built-in audio analysis. Nothing leaves the phone. For motivation,
// not a medical test: phones, distance and rooms differ, so the trend matters more than the number.
import { html, openSheet, LineChart, lazy } from './ui.js';
import * as S from './store.js';

export const DAY = 864e5;
export const TARGET = 20;   // seconds of steady blowing for full marks on duration
export const MAX = 30;      // stop listening after this long

export const scoreWord = (n) => (n >= 85 ? 'Excellent' : n >= 70 ? 'Strong' : n >= 50 ? 'Good' : n >= 30 ? 'Building up' : 'Getting started');
export const strengthWord = (x) => (x >= 0.8 ? 'Powerful' : x >= 0.55 ? 'Strong' : x >= 0.3 ? 'Steady' : 'Gentle');

// Score out of 100: duration counts most, then strength, then how steady the breath was
export function lungScore(dur, strength, steady) {
  return Math.round(Math.min(1, dur / TARGET) * 60 + Math.min(1, strength) * 25 + Math.min(1, Math.max(0, steady)) * 15);
}

/* ---------- Progress card ---------- */
export function LungCard({ s }) {
  const tests = s.lungTests || [];
  const last = tests[tests.length - 1];
  const first = tests[0];
  const daysSince = last ? Math.floor((Date.now() - last.t) / DAY) : null;
  return html`<section class="group">
    <h2 class="group-h">Lung test</h2>
    <div class="card lung-card">
      ${!last ? html`
        <div class="lung-intro"><span class="lung-e">🫁</span><div><b>How are your lungs doing?</b>
          <p class="muted">Blow into your phone for up to 30 seconds. Do it weekly and watch your score climb as your lungs recover.</p></div></div>
        <button class="btn btn-primary block" onClick=${openLungTest}>Take the test</button>`
      : html`
        <div class="lung-top">
          <div><div class="lung-score">${last.score}<small>/100</small></div><div class="lung-word">${scoreWord(last.score)}</div></div>
          ${tests.length > 1 && html`<div class="lung-delta ${last.score >= first.score ? 'up' : 'down'}">${last.score >= first.score ? '▲' : '▼'} ${Math.abs(last.score - first.score)}<small>since your first test</small></div>`}
        </div>
        ${tests.length > 1 && html`<${LineChart} keys=${tests.map((x) => S.dayKey(new Date(x.t)))} series=${[{ name: 'Lung score', color: '#5AC8FA', values: tests.map((x) => x.score) }]}
          yMin=${0} yMax=${100} yTicks=${[0, 50, 100]} height=${130} />`}
        <div class="lung-meta">${last.dur.toFixed(1)}s · ${strengthWord(last.strength).toLowerCase()} breath · ${daysSince === 0 ? 'today' : `${daysSince} day${daysSince === 1 ? '' : 's'} ago`}</div>
        <button class="btn ${daysSince >= 7 ? 'btn-primary' : 'btn-tinted'} block" onClick=${openLungTest}>${daysSince >= 7 ? 'Time for this week’s test' : 'Test again'}</button>`}
      <p class="tiny muted">For motivation, not a medical test. Use the same spot and distance each time for a fair comparison.</p>
    </div>
  </section>`;
}

/* ---------- the test ---------- */
// The test itself (microphone, analysis, results) is in lungtest.js and loads the first time it's opened
const LungTest = lazy(() => import('./lungtest.js'), 'LungTest', () => html`<div class="lazy-wait" role="status">Getting the test ready…</div>`);
export function openLungTest() { openSheet((close) => html`<${LungTest} close=${close} />`, { tall: true }); }
