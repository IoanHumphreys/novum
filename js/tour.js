// A quick tour of the five tabs for people who've just joined. It walks through each tab (switching to it
// so they can see it behind the card) with an arrow pointing at its icon. Shown once after Day Zero;
// Profile → Help has "Show the tour again".
import { useState, useEffect, useLayoutEffect } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic } from './ui.js';

const STEPS = [
  { tab: 'home', e: '🏠', t: 'Home', d: 'Your streaks, money saved and what your body is doing right now. Craving? The big “Tap here” button gives you five minutes of guided breathing. The 🔔 at the top shows cheers from buddies.' },
  { tab: 'checkin', e: '✍️', t: 'Check-in', d: 'Twenty seconds a day: mood, cravings and sleep. The red dot means you haven’t checked in yet today. It’s how Novum spots your patterns.' },
  { tab: 'goals', e: '🎯', t: 'Goals', d: 'Habits you tick off, targets to work towards and one-off milestones, for 2027 or any date you choose.' },
  { tab: 'progress', e: '📈', t: 'Progress', d: 'Rings, charts and your check-in calendar, so you can see how far you’ve come.' },
  { tab: 'profile', e: '🤝', t: 'Profile', d: 'Add buddies by username, choose what they see, set up notifications and change your avatar. Quitting is easier together.' },
];

let subs = new Set();
let forced = false;
// Profile's "Show the tour again"
export function replayTour() { forced = true; subs.forEach((f) => f(true)); }

export function Tour({ s, go }) {
  const [on, setOn] = useState(!s.tourDone || forced);
  const [i, setI] = useState(0);
  const [arrow, setArrow] = useState(null);
  useEffect(() => { const f = (v) => { setI(0); setOn(v); }; subs.add(f); return () => subs.delete(f); }, []);
  // Switch to the step's tab, and point at its icon
  useEffect(() => { if (on) go(STEPS[i].tab, { quiet: true }); }, [on, i]);
  useLayoutEffect(() => {
    if (!on) { document.documentElement.classList.remove('touring'); return undefined; }
    document.documentElement.classList.add('touring');
    const place = () => {
      const el = document.querySelectorAll('.tabbar .tab')[i];
      if (el) { const r = el.getBoundingClientRect(); setArrow(r.left + r.width / 2); }
    };
    place();
    window.addEventListener('resize', place);
    return () => { window.removeEventListener('resize', place); document.documentElement.classList.remove('touring'); };
  }, [on, i]);
  if (!on) return null;
  const st = STEPS[i];
  const last = i === STEPS.length - 1;
  const finish = () => {
    haptic(15);
    forced = false;
    setOn(false);
    go('home', { quiet: true });
    if (!S.getState().tourDone) S.update((d) => { d.tourDone = true; });
  };
  const next = () => { haptic(); if (last) finish(); else setI(i + 1); };
  return html`<div class="tour" role="dialog" aria-modal="true" aria-label="Novum tour">
    <div class="tour-dim" onClick=${next}></div>
    <div class="tour-card" key=${i}>
      <div class="tour-top"><span class="tour-e">${st.e}</span><span class="tour-step">${i + 1} of ${STEPS.length}</span>
        ${!last && html`<button class="link sm tour-skip" onClick=${finish}>Skip</button>`}</div>
      <h3 class="tour-t">${st.t}</h3>
      <p class="tour-d">${st.d}</p>
      <div class="tour-foot">
        <div class="tour-dots">${STEPS.map((_, k) => html`<i class=${k === i ? 'on' : ''}></i>`)}</div>
        <div class="tour-btns">
          ${i > 0 && html`<button class="btn btn-plain sm" onClick=${() => { haptic(); setI(i - 1); }}>Back</button>`}
          <button class="btn btn-primary sm" onClick=${next}>${last ? 'Let’s go' : 'Next'}</button>
        </div>
      </div>
    </div>
    ${arrow != null && html`<i class="tour-arrow" key=${'a' + i} style=${`left:${arrow}px`}></i>`}
  </div>`;
}
