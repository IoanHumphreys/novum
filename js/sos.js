// Craving SOS (guided breathing and distractions) and My reasons.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, useNow, Icon, openSheet, SheetBar, Toggle, Group, toast, lazy } from './ui.js';
import { TRIGGERS, DISTRACTIONS, REASON_IDEAS } from './content.js';
import { DAY, pad2, fmtLeft, milestoneInfo } from './shared.js';
import * as A from './api.js';
import { CHEER_KINDS } from './content.js';
import { useBuddies } from './social.js';
import { Avatar } from './profile.js';
import { SosPlan } from './plans.js';
import { SosLetterButton } from './letters.js';

// The puzzle's code loads the first time someone opens it (it's cached for offline use either way)
const FlowGame = lazy(() => import('./game.js'), 'FlowGame', () => html`<div class="lazy-wait" role="status">Loading the puzzle…</div>`);

/* ============ CRAVING SOS ============ */
export const SOS_SECS = 300;

export const BREATH = ['Breathe in', 'Hold', 'Breathe out']; // 4s, 4s, 6s = 14s cycle

export function SosButton({ compact }) {
  return html`<button class="sos tap ${compact ? 'compact' : ''}" onClick=${openSos}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!compact && html`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${Icon.chevron()}</span>
  </button>`;
}

export function openSos() { openSheet((close) => html`<${Sos} close=${close} />`, { tall: true }); }

export function Sos({ close }) {
  const s = S.getState();
  const [t0] = useState(Date.now());
  const now = useNow(250);
  const [step, setStep] = useState('ride');
  const [mode, setMode] = useState('breathe'); // or 'game'
  const [beaten, setBeaten] = useState(true);
  const [quitIds, setQuitIds] = useState(s.quits.map((q) => q.id));
  const [triggers, setTriggers] = useState([]);
  const [restart, setRestart] = useState([]);
  const [secs, setSecs] = useState(0);
  const el = (now - t0) / 1000;
  const left = Math.max(0, SOS_SECS - Math.floor(el));
  const cyc = el % 14;
  const phase = cyc < 4 ? 0 : cyc < 8 ? 1 : 2;
  const lastPhase = useRef(phase);
  useEffect(() => { if (step === 'ride' && lastPhase.current !== phase) { lastPhase.current = phase; haptic(phase === 0 ? 12 : 6); } }, [phase]);

  // Cards that rotate under the breathing circle
  const [cards] = useState(() => {
    const sel = s.quits;
    const saved = sel.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q)), 0);
    const tips = [...DISTRACTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
    const reasons = s.reasons.map((r) => ({ k: 'Your reason', e: '💙', t: r.text }));
    const others = [{ k: 'Money saved', e: '💷', t: `${S.money(saved)} so far. This craving wants to take that back.` }];
    sel.forEach((q) => {
      const d = S.quitElapsed(q) / DAY;
      const mi = milestoneInfo(d);
      others.push({ k: `${q.label}-free`, e: q.emoji, t: `${Math.floor(d)} days in.${mi.next ? ` ${mi.next.label} in ${fmtLeft(mi.next.days - d)}. Don’t reset the clock for five minutes of nothing.` : ''}` });
    });
    tips.forEach((x) => others.push({ k: 'Try this now', e: x.e, t: x.t }));
    // alternate: reason, other, reason, other…
    const out = [];
    for (let i = 0; i < Math.max(reasons.length, others.length); i++) {
      if (reasons[i]) out.push(reasons[i]);
      if (others[i]) out.push(others[i]);
    }
    return out;
  });
  const card = cards[Math.floor(el / 9) % cards.length];

  // "You're not alone": an anonymous count of people riding out cravings (no names, nothing about you)
  const [pulse, setPulse] = useState(null);
  useEffect(() => { A.sosPulse('open').then(setPulse).catch(() => {}); }, []);
  const finish = (b) => { haptic(15); setBeaten(b); setSecs(Math.round(el)); setStep('log'); if (b) A.sosPulse('beaten').catch(() => {}); };
  const toggleIn = (list, set, v) => { haptic(); set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]); };
  const save = () => {
    const total = s.cravings.filter((c) => c.beaten).length + (beaten ? 1 : 0);
    S.update((d) => d.cravings.push({ id: S.uid(), t: Date.now(), quitIds, triggers, beaten, secs }));
    restart.forEach((id) => S.restartQuit(id));
    close();
    toast(beaten ? `Craving beaten. That’s ${total} 🛡️` : restart.length ? 'Counter restarted. Go again.' : 'Logged. Keep going.');
  };

  if (step === 'log') {
    return html`
      <${SheetBar} title=${beaten ? 'Craving beaten' : 'That’s okay'} right=${html`<button class="link b" onClick=${save}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${beaten ? '🛡️' : '🤝'}</div>
          <h2>${beaten ? 'You rode it out.' : 'One slip doesn’t undo the work.'}</h2>
          <p class="muted">${beaten
            ? `${secs < 60 ? 'Under a minute' : `${Math.round(secs / 60)} minute${Math.round(secs / 60) === 1 ? '' : 's'}`} and it passed. Every craving you beat makes the next one weaker.`
            : 'Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern.'}</p>
        </div>
        <${Group} header="Which craving?">
          <div class="chip-row">${s.quits.map((q) => html`<button class="chip big ${quitIds.includes(q.id) ? 'on' : ''}" style="--c:${q.color}" onClick=${() => toggleIn(quitIds, setQuitIds, q.id)}>${q.emoji} ${q.label}</button>`)}</div>
        <//>
        <${Group} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${TRIGGERS.map((t) => html`<button class="chip big ${triggers.includes(t) ? 'on' : ''}" style="--c:#3B9BFF" onClick=${() => toggleIn(triggers, setTriggers, t)}>${t}</button>`)}</div>
        <//>
        ${!beaten && html`<${Group} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${s.quits.filter((q) => quitIds.includes(q.id)).map((q) => html`<div class="row" key=${q.id}>
            <span class="row-ic" style="background:${q.color}">${q.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${q.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${Toggle} on=${restart.includes(q.id)} label=${`Restart ${q.label}`} onChange=${() => toggleIn(restart, setRestart, q.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${save}>Save</button>
      </div>`;
  }

  const mm = Math.floor(left / 60), ss = pad2(left % 60);
  return html`
    <${SheetBar} title="Craving SOS" left=${html`<button class="link" onClick=${close}>Close</button>`} />
    <div class="sheet-body sos-body">
      ${mode === 'game' ? html`<${FlowGame} onExit=${() => { haptic(); setMode('breathe'); }} />` : html`
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${BREATH[phase]}</div>
      </div>
      <div class="sos-timer">${left > 0 ? html`<b>${mm}:${ss}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`
        : html`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      ${pulse && html`<p class="sos-pulse">🌍 ${pulse.now > 0 ? html`<b>${pulse.now === 1 ? 'Someone else is' : `${pulse.now} others are`}</b> riding one out right now. ` : ''}${pulse.beaten > 0 ? html`<b>${pulse.beaten}</b> craving${pulse.beaten === 1 ? '' : 's'} beaten on Novum in the last day. You’re next.` : 'You’re not alone in this. Every craving passes.'}</p>`}
      <${SosLetterButton} s=${s} />
      <${SosPlan} s=${s} picked=${triggers} onPick=${(t) => setTriggers(triggers.includes(t) ? triggers.filter((x) => x !== t) : [...triggers, t])} />
      <div class="card sos-card" key=${card.t}>
        <span class="sos-card-e">${card.e}</span>
        <div><div class="sos-card-k">${card.k}</div><div class="sos-card-t">${card.t}</div></div>
      </div>
      <button class="sos-game" onClick=${() => { haptic(); setMode('game'); }}><span>🧩</span><span class="row-main"><b>Play a 2-minute puzzle instead</b><small>Keeping your eyes and mind busy weakens the craving</small></span></button>
      ${s.reasons.length === 0 && html`<button class="link sm center-link" onClick=${openReasons}>Add your reasons for quitting, so they show up here</button>`}`}
      <${SosSupport} />
      <div class="sos-actions">
        <button class="btn btn-primary block big ${left === 0 ? 'glow' : ''}" onClick=${() => finish(true)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${() => finish(false)}>I gave in</button>
      </div>
    </div>`;
}

export function openReasons() { openSheet((close) => html`<${Reasons} close=${close} />`, { tall: true }); }

export function Reasons({ close }) {
  const s = S.getState();
  const [txt, setTxt] = useState('');
  const add = (t) => {
    t = t.trim();
    if (!t) return;
    haptic(10);
    S.update((d) => d.reasons.push({ id: S.uid(), text: t }));
    setTxt('');
  };
  const have = new Set(s.reasons.map((r) => r.text));
  return html`
    <${SheetBar} title="My reasons" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${txt} maxlength="140" onInput=${(e) => setTxt(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && add(txt)} />
        <button class="btn btn-primary sm" disabled=${!txt.trim()} onClick=${() => add(txt)}>Add</button>
      </div>
      ${s.reasons.length > 0 && html`<${Group} header="Your reasons">
        ${s.reasons.map((r) => html`<div class="row" key=${r.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${r.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${() => S.update((d) => { d.reasons = d.reasons.filter((x) => x.id !== r.id); })}>${Icon.trash()}</button>
        </div>`)}
      <//>`}
      <${Group} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${REASON_IDEAS.filter((t) => !have.has(t)).map((t) => html`<button class="row tap" key=${t} onClick=${() => add(t)}>
          <span class="row-main"><span class="row-title">${t}</span></span>
          <span class="add-pill">${Icon.plus()}</span>
        </button>`)}
      <//>
    </div>`;
}

// "Ask my buddies": notifies them, then shows their cheers live while you breathe
function SosSupport() {
  const b = useBuddies();
  const [asked, setAsked] = useState(0);
  const [sent, setSent] = useState(0);
  const [cheers, setCheers] = useState([]);
  const [busy, setBusy] = useState(false);
  const seen = useRef(0);
  useEffect(() => {
    if (!asked) return undefined;
    const poll = async () => {
      try {
        const r = await A.activity();
        const fresh = r.items.filter((x) => x.kind === 'cheer' && x.at >= asked - 2000).reverse();
        if (fresh.length > seen.current) haptic([12, 40, 12]);
        seen.current = fresh.length;
        setCheers(fresh);
      } catch { /* offline: keep trying */ }
    };
    poll();
    const t = setInterval(poll, 6000);
    return () => clearInterval(t);
  }, [asked]);
  if (!b.loaded || !b.buddies.length) return null;
  const ask = async () => {
    if (busy) return;
    setBusy(true); haptic(12);
    // server time, so a phone clock that runs fast or slow can't hide cheers
    try { const r = await A.sos(); setSent(r.sent); setAsked(r.at || Date.now()); } catch (e) { toast(e.message); }
    setBusy(false);
  };
  if (!asked) return html`<button class="sos-ask" disabled=${busy} onClick=${ask}>
    <span>🤝</span><span class="row-main"><b>${busy ? 'Asking…' : 'Ask my buddies for support'}</b><small>They’ll get a notification and can cheer you on</small></span>
  </button>`;
  return html`<div class="card sos-cheers">
    <div class="sos-cheers-h">💙 Sent to ${sent} bud${sent === 1 ? 'dy' : 'dies'}. ${cheers.length ? 'They’re with you:' : 'Their cheers will pop up here.'}</div>
    ${cheers.map((c) => {
      const k = CHEER_KINDS.find((x) => x.kind === c.data.kind) || CHEER_KINDS[0];
      return html`<div class="sos-cheer" key=${c.id}><${Avatar} a=${c.who.avatar} name=${c.who.firstName} size=${30} /><span><b>${c.who.firstName}</b> ${k.e} ${k.l.toLowerCase()}</span></div>`;
    })}
  </div>`;
}
