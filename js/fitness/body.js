// Front and back body diagram with the muscles an exercise works lit up (primary bright, secondary softer).
// Drawn from simple shapes in SVG, so there's no artwork to licence and it stays sharp at any size.
import { html } from '../ui.js';

// Body outline pieces (x is for the front figure; the back figure is shifted right by 130)
const SIL = html`
  <circle cx="60" cy="18" r="12" />
  <rect x="54" y="28" width="12" height="10" rx="4" />
  <rect x="37" y="36" width="46" height="78" rx="16" />
  <rect x="39" y="104" width="42" height="26" rx="10" />
  <rect x="23" y="42" width="15" height="46" rx="7.5" /><rect x="82" y="42" width="15" height="46" rx="7.5" />
  <rect x="19" y="84" width="13" height="40" rx="6.5" /><rect x="88" y="84" width="13" height="40" rx="6.5" />
  <rect x="39" y="122" width="20" height="58" rx="10" /><rect x="61" y="122" width="20" height="58" rx="10" />
  <rect x="41" y="176" width="16" height="52" rx="8" /><rect x="63" y="176" width="16" height="52" rx="8" />`;

// Muscle shapes: [muscle, view ('f' front | 'b' back), svg element]
const PARTS = [
  ['traps', 'f', html`<path d="M50 36 60 33 70 36 66 42H54z" />`],
  ['shoulders', 'f', html`<ellipse cx="38" cy="49" rx="9" ry="9.5" />`], ['shoulders', 'f', html`<ellipse cx="82" cy="49" rx="9" ry="9.5" />`],
  ['chest', 'f', html`<path d="M45 46h14v18c-6 2-11 1-15-3-2-6-1-11 1-15z" />`], ['chest', 'f', html`<path d="M75 46H61v18c6 2 11 1 15-3 2-6 1-11-1-15z" />`],
  ['biceps', 'f', html`<ellipse cx="30" cy="70" rx="5.5" ry="12" />`], ['biceps', 'f', html`<ellipse cx="90" cy="70" rx="5.5" ry="12" />`],
  ['forearms', 'f', html`<ellipse cx="25.5" cy="101" rx="5" ry="14" />`], ['forearms', 'f', html`<ellipse cx="94.5" cy="101" rx="5" ry="14" />`],
  ['abs', 'f', html`<rect x="52.5" y="68" width="15" height="40" rx="5" />`],
  ['obliques', 'f', html`<path d="M44 70c3 0 6 2 7 4v28c-3 1-6 0-8-2-2-10-1-20 1-30z" />`], ['obliques', 'f', html`<path d="M76 70c-3 0-6 2-7 4v28c3 1 6 0 8-2 2-10 1-20-1-30z" />`],
  ['quads', 'f', html`<path d="M41 126c5-3 13-2 17 1l-1 44c-3 4-10 4-13 0-3-14-4-31-3-45z" />`], ['quads', 'f', html`<path d="M79 126c-5-3-13-2-17 1l1 44c3 4 10 4 13 0 3-14 4-31 3-45z" />`],
  ['adductors', 'f', html`<path d="M57 128l2 26c-2 2-4 1-5-1l-1-24z" />`], ['adductors', 'f', html`<path d="M63 128l-2 26c2 2 4 1 5-1l1-24z" />`],
  ['calves', 'f', html`<ellipse cx="49" cy="196" rx="5.5" ry="15" />`], ['calves', 'f', html`<ellipse cx="71" cy="196" rx="5.5" ry="15" />`],
  // back
  ['traps', 'b', html`<path d="M50 36 60 33 70 36 66 60 60 64 54 60z" />`],
  ['shoulders', 'b', html`<ellipse cx="38" cy="49" rx="9" ry="9.5" />`], ['shoulders', 'b', html`<ellipse cx="82" cy="49" rx="9" ry="9.5" />`],
  ['upperback', 'b', html`<path d="M45 50l8 2 1 16-8 4c-2-7-2-15-1-22z" />`], ['upperback', 'b', html`<path d="M75 50l-8 2-1 16 8 4c2-7 2-15 1-22z" />`],
  ['lats', 'b', html`<path d="M43 66l11 6 2 22c-5 3-10 2-12-2-2-9-2-17-1-26z" />`], ['lats', 'b', html`<path d="M77 66l-11 6-2 22c5 3 10 2 12-2 2-9 2-17 1-26z" />`],
  ['lowerback', 'b', html`<rect x="54" y="88" width="12" height="20" rx="4" />`],
  ['triceps', 'b', html`<ellipse cx="30" cy="70" rx="5.5" ry="12" />`], ['triceps', 'b', html`<ellipse cx="90" cy="70" rx="5.5" ry="12" />`],
  ['forearms', 'b', html`<ellipse cx="25.5" cy="101" rx="5" ry="14" />`], ['forearms', 'b', html`<ellipse cx="94.5" cy="101" rx="5" ry="14" />`],
  ['glutes', 'b', html`<path d="M41 112c5-2 13-2 18 0v20c-5 3-13 3-18 0-1-7-1-14 0-20z" />`], ['glutes', 'b', html`<path d="M79 112c-5-2-13-2-18 0v20c5 3 13 3 18 0 1-7 1-14 0-20z" />`],
  ['hamstrings', 'b', html`<path d="M41 136c5 2 12 2 17 0l-1 36c-3 4-10 4-13 0-3-11-3-24-3-36z" />`], ['hamstrings', 'b', html`<path d="M79 136c-5 2-12 2-17 0l1 36c3 4 10 4 13 0 3-11 3-24 3-36z" />`],
  ['calves', 'b', html`<ellipse cx="49" cy="194" rx="6.5" ry="16" />`], ['calves', 'b', html`<ellipse cx="71" cy="194" rx="6.5" ry="16" />`],
];

// MuscleMap({ primary: 'chest', secondary: ['triceps'] }) or MuscleMap({ heat: { chest: 0..1 } }) for a heatmap
export function MuscleMap({ primary, secondary = [], heat, height = 220 }) {
  const level = (m) => (heat ? heat[m] || 0 : m === primary ? 1 : secondary.includes(m) ? 0.45 : 0);
  const fig = (view, dx) => html`<g transform=${`translate(${dx} 0)`}>
    <g class="mm-sil">${SIL}</g>
    ${PARTS.filter((p) => p[1] === view).map(([m, , el]) => {
      const v = level(m);
      return html`<g class=${v ? 'mm-on' : 'mm-off'} fill-opacity=${v ? 0.35 + v * 0.65 : 1}>${el}</g>`;
    })}
  </g>`;
  return html`<svg class="muscle-map" viewBox="0 0 250 246" height=${height} role="img" aria-label="Muscles worked">
    ${fig('f', 0)}${fig('b', 130)}
    <text x="60" y="243" class="mm-l" text-anchor="middle">Front</text><text x="190" y="243" class="mm-l" text-anchor="middle">Back</text>
  </svg>`;
}
