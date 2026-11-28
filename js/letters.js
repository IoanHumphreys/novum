// Letters to future you: write (or record) something on a good day, and it unlocks later: when you hit a
// milestone, on a date, or from Craving SOS when you're struggling. Voice notes stay short (40 seconds, at most
// two kept) because they're saved with the rest of your data.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, Row, Segmented, toast } from './ui.js';
import { MILESTONES } from './content.js';
import { confirmSheet } from './shared.js';

const DAY = 864e5;
const MAX_SECS = 40;
const MAX_VOICE = 2;
const fmt = (t) => new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// When a letter unlocks (ms), or null for "when I'm struggling" / a quit that no longer exists
export function unlockAt(l, s = S.getState()) {
  if (l.unlock?.type === 'date') return S.parseDay(l.unlock.date).getTime() + 9 * 3600e3; // 9am that day
  if (l.unlock?.type === 'days') {
    const q = s.quits.find((x) => x.id === l.unlock.quitId) || s.quits[0];
    return q ? S.quitStart(q).getTime() + l.unlock.days * DAY : null;
  }
  return null;
}
export const isUnlocked = (l, s, now = Date.now()) => l.unlock?.type === 'sos' || (unlockAt(l, s) != null && now >= unlockAt(l, s));
function unlockText(l, s) {
  if (l.unlock?.type === 'sos') return 'Opens from Craving SOS';
  if (l.unlock?.type === 'date') return `Opens ${fmt(S.parseDay(l.unlock.date))}`;
  const q = s.quits.find((x) => x.id === l.unlock?.quitId) || s.quits[0];
  const m = MILESTONES.find((x) => x.days === l.unlock?.days);
  return `Opens at ${m ? m.label : `${l.unlock?.days} days`}${q ? ` ${q.label.toLowerCase()}-free` : ''}`;
}

/* ---------- Home: a letter has just unlocked ---------- */
export function LetterCard({ s }) {
  const now = Date.now();
  const ready = s.letters.filter((l) => !l.openedAt && l.unlock?.type !== 'sos' && isUnlocked(l, s, now));
  if (!ready.length) return null;
  const l = ready[0];
  return html`<section class="group">
    <button class="card letter-card tap" onClick=${() => openLetter(l.id)}>
      <span class="lc-env" aria-hidden="true">💌</span>
      <span class="row-main"><b>A letter from past you</b><span>Written ${fmt(l.at)}. It just unlocked.${ready.length > 1 ? ` (${ready.length} waiting)` : ''}</span></span>
      <span class="btn btn-primary sm">Open</span>
    </button>
  </section>`;
}

/* ---------- SOS: "open this when you want to give in" ---------- */
export function SosLetterButton({ s }) {
  const sos = s.letters.filter((l) => l.unlock?.type === 'sos');
  if (!sos.length) return null;
  const pick = sos.find((l) => !l.openedAt) || sos[Math.floor(Date.now() / 60000) % sos.length];
  return html`<button class="sos-letter" onClick=${() => openLetter(pick.id)}>
    <span>💌</span><span class="row-main"><b>Open a letter from past you</b><small>You wrote this for exactly this moment</small></span>
  </button>`;
}

/* ---------- the list ---------- */
export function openLetters() { haptic(); openSheet((close) => html`<${Letters} close=${close} />`, { tall: true }); }
function Letters({ close }) {
  const [s, setS] = useState(S.getState());
  useEffect(() => S.subscribe((st) => setS(st)), []);
  const now = Date.now();
  const sorted = [...s.letters].sort((a, b) => b.at - a.at);
  return html`
    <${SheetBar} title="Letters to future you" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Write to yourself on a good day. Future you will open it at a milestone, on a date, or in the middle of a craving.</p>
      <button class="btn btn-primary block" onClick=${() => openWrite()}>✍️ Write a letter</button>
      ${sorted.length > 0 && html`<${Group} header="Your letters">
        ${sorted.map((l) => {
          const open = isUnlocked(l, s, now);
          return html`<${Row} key=${l.id} icon=${open ? (l.openedAt ? '📖' : '💌') : '🔒'} iconBg=${open ? '#FF375F' : '#8E8E93'}
            title=${`Written ${fmt(l.at)}${l.audio ? ' · 🎙️' : ''}`} sub=${open && l.unlock?.type !== 'sos' ? (l.openedAt ? 'Opened' : 'Ready to open') : unlockText(l, s)}
            chevron=${open} onClick=${open ? () => openLetter(l.id) : () => toast(`${unlockText(l, s)}. No peeking 😉`)} />`;
        })}
      <//>`}
    </div>`;
}

/* ---------- writing one ---------- */
export function openWrite() { openSheet((close) => html`<${Write} close=${close} />`, { tall: true }); }
function Write({ close }) {
  const s = S.getState();
  const started = s.quits.filter((q) => S.quitStart(q).getTime() <= Date.now());
  const q0 = started.sort((a, b) => S.quitElapsed(b) - S.quitElapsed(a))[0] || s.quits[0];
  const curDays = q0 ? S.quitElapsed(q0) / DAY : 0;
  const nextMs = MILESTONES.filter((m) => m.days > curDays && m.days >= 7);
  const [type, setType] = useState(q0 && nextMs.length ? 'days' : 'sos');
  const [days, setDays] = useState(nextMs[0]?.days || 30);
  const [date, setDate] = useState(S.dayKey(S.addDays(new Date(), 30)));
  const [text, setText] = useState('');
  const [audio, setAudio] = useState(null);
  const voiceCount = s.letters.filter((l) => l.audio).length;
  const ok = (text.trim() || audio) && (type !== 'date' || date > S.dayKey());
  const save = () => {
    if (!ok) return;
    haptic(20);
    const unlock = type === 'days' ? { type, days, quitId: q0?.id } : type === 'date' ? { type, date } : { type: 'sos' };
    S.update((d) => { d.letters = [...d.letters, { id: S.uid(), at: Date.now(), text: text.trim().slice(0, 2000), audio: audio || null, unlock, openedAt: null }]; });
    toast('Sealed 💌 Future you will thank you');
    close();
  };
  return html`
    <${SheetBar} title="Write to future you" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Seal</button>`} />
    <div class="sheet-body">
      <${Group} header="Dear future me…" footer="Why you started, how today feels, what you want to remember when it gets hard.">
        <textarea class="note letter-text" rows="7" maxlength="2000" placeholder="If you’re reading this, you made it this far. Remember why you started…" value=${text} onInput=${(e) => setText(e.target.value)}></textarea>
      <//>
      <${Group} header="Or record your voice" footer=${voiceCount >= MAX_VOICE && !audio ? `You’ve kept ${MAX_VOICE} voice letters already. Delete one to record another.` : `Up to ${MAX_SECS} seconds. Hearing your own voice hits differently.`}>
        <${Recorder} value=${audio} onChange=${setAudio} disabled=${voiceCount >= MAX_VOICE && !audio} />
      <//>
      <${Group} header="When should it open?">
        <div class="pad"><${Segmented} options=${[...(q0 && nextMs.length ? [{ value: 'days', label: 'Milestone' }] : []), { value: 'date', label: 'Date' }, { value: 'sos', label: 'In SOS' }]} value=${type} onChange=${setType} /></div>
        ${type === 'days' && html`<div class="chip-row pad-chips">${nextMs.map((m) => html`<button key=${m.days} class="chip ${days === m.days ? 'on' : ''}" style="--c:#FF375F" onClick=${() => { haptic(); setDays(m.days); }}>${m.label}</button>`)}</div>
          <p class="group-f in">Opens when you reach ${MILESTONES.find((m) => m.days === days)?.label} ${q0.label.toLowerCase()}-free. A slip moves it later, never sooner.</p>`}
        ${type === 'date' && html`<label class="field"><span class="field-l">Open on</span><span class="field-c"><input type="date" min=${S.dayKey(S.addDays(new Date(), 1))} value=${date} onInput=${(e) => setDate(e.target.value)} /></span></label>`}
        ${type === 'sos' && html`<p class="group-f in">Shows up in Craving SOS as “Open a letter from past you”. You can open it as often as you need.</p>`}
      <//>
    </div>`;
}

// Tap to record, tap to stop; play it back; delete to try again
function Recorder({ value, onChange, disabled }) {
  const [rec, setRec] = useState(null);
  const [secs, setSecs] = useState(0);
  const timer = useRef();
  useEffect(() => () => { clearInterval(timer.current); rec?.stream.getTracks().forEach((t) => t.stop()); }, [rec]);
  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') { toast('Recording isn’t supported on this phone. Write it instead.'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
      const mr = new MediaRecorder(stream, { ...(type ? { mimeType: type } : {}), audioBitsPerSecond: 24000 });
      const chunks = [];
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: mr.mimeType || type || 'audio/webm' });
        const fr = new FileReader();
        fr.onload = () => { onChange(fr.result); setRec(null); };
        fr.readAsDataURL(blob);
      };
      mr.start();
      haptic(15);
      setSecs(0); setRec({ mr, stream });
      const t0 = Date.now();
      timer.current = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 1000);
        setSecs(s);
        if (s >= MAX_SECS) { clearInterval(timer.current); mr.state === 'recording' && mr.stop(); }
      }, 250);
    } catch { toast('Allow the microphone for Novum to record a voice letter.'); }
  };
  const stop = () => { haptic(10); clearInterval(timer.current); rec?.mr.state === 'recording' && rec.mr.stop(); };
  if (value) return html`<div class="rec-row"><audio controls src=${value} preload="metadata"></audio>
    <button class="icon-btn muted" aria-label="Delete recording" onClick=${() => onChange(null)}>${Icon.trash()}</button></div>`;
  return html`<div class="rec-row">
    <button class="rec-btn ${rec ? 'on' : ''}" disabled=${disabled} onClick=${rec ? stop : start} aria-label=${rec ? 'Stop recording' : 'Record'}><i></i></button>
    <span class="rec-l">${rec ? html`Recording… <b>0:${String(secs).padStart(2, '0')}</b> / 0:${MAX_SECS}` : 'Tap to record'}</span>
  </div>`;
}

/* ---------- opening one ---------- */
export function openLetter(id) { openSheet((close) => html`<${Letter} id=${id} close=${close} />`, { tall: true }); }
function Letter({ id, close }) {
  const s = S.getState();
  const l = s.letters.find((x) => x.id === id);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!l) return undefined;
    const t = setTimeout(() => { setOpened(true); haptic(20); }, 650);
    if (!l.openedAt) S.update((d) => { d.letters = d.letters.map((x) => (x.id === id ? { ...x, openedAt: Date.now() } : x)); });
    return () => clearTimeout(t);
  }, []);
  if (!l) return html`<${SheetBar} title="Letter" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const days = Math.floor((Date.now() - l.at) / DAY);
  const del = () => confirmSheet({ title: 'Delete this letter?', text: 'Past you wrote this for you. It can’t be brought back.', confirm: 'Delete', onConfirm: () => { S.update((d) => { d.letters = d.letters.filter((x) => x.id !== id); }); close(); } });
  return html`
    <${SheetBar} title="From past you" left=${html`<button class="link danger" onClick=${del}>Delete</button>`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="letter ${opened ? 'open' : ''}">
        <div class="letter-env" aria-hidden="true">💌</div>
        <div class="letter-paper">
          <div class="lp-k">Written ${fmt(l.at)}${days > 0 ? ` · ${days} day${days === 1 ? '' : 's'} ago` : ''}</div>
          ${l.audio && html`<audio controls autoplay src=${l.audio} preload="auto"></audio>`}
          ${l.text && html`<p class="lp-text">${l.text}</p>`}
          <div class="lp-sign">— You</div>
        </div>
      </div>
      <button class="btn btn-tinted block mt12" onClick=${() => { close(); setTimeout(openWrite, 350); }}>Write the next one</button>
    </div>`;
}
