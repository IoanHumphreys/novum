// Things you are quitting: add, edit, health timeline and the kind "I slipped" reset.
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, Icon, openSheet, SheetBar, Segmented, Group, Field, toast } from './ui.js';
import { HEALTH_NOTE, healthFor, ADDICTIONS, addictionByKind, TRIGGERS, minutesFor, MINUTES_RANGE } from './content.js';
import { openShareSheet, cardFor } from './celebrate.js';
import { DAY, fmtLeft, confirmSheet } from './shared.js';
import { Progress } from './tabs/progress.js';
import { openSos } from './sos.js';

/* ---------- add an addiction later ---------- */
export function openAddQuit() { openSheet((close) => html`<${AddQuit} close=${close} />`, { tall: true }); }

export function AddQuit({ close }) {
  const s = S.getState();
  const have = new Set(s.quits.map((q) => q.kind));
  const options = ADDICTIONS.filter((a) => !have.has(a.kind));
  const [kind, setKind] = useState(null);
  const [name, setName] = useState('');
  const [start, setStart] = useState(S.toLocalInput(new Date()));
  const [monthly, setMonthly] = useState('');
  const a = kind ? addictionByKind(kind) : null;
  const ok = kind && start && (kind !== 'other' || name.trim());
  const save = () => {
    haptic(15);
    S.update((d) => d.quits.push({
      id: kind, kind, label: kind === 'other' ? name.trim() : a.label, emoji: a.emoji, color: a.color,
      start, monthly: parseFloat(monthly) || 0, best: 0, resets: [],
    }));
    close();
    toast(`${kind === 'other' ? name.trim() : a.label} added`);
  };
  return html`
    <${SheetBar} title="Add something to quit" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${options.map((o) => html`<button class="pick ${kind === o.kind ? 'on' : ''}" style="--c:${o.color}" onClick=${() => { haptic(); setKind(o.kind); }}>
          <span class="pick-e">${o.emoji}</span><span class="pick-l">${o.label}</span><span class="pick-tick">${Icon.check()}</span></button>`)}
      </div>
      ${kind && html`
        <${Group} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${kind === 'other' && html`<${Field} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${name} onInput=${(e) => setName(e.target.value)} /><//>`}
          <${Field} label="Quit at"><input type="datetime-local" value=${start} onInput=${(e) => setStart(e.target.value)} /><//>
          <${Field} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${monthly} onInput=${(e) => setMonthly(e.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!ok} onClick=${save}>Add</button>`}
    </div>`;
}

export function openQuitEditor(id) { openSheet((close) => html`<${QuitEditor} id=${id} close=${close} />`, { tall: true }); }

export function QuitEditor({ id, close }) {
  const s = S.getState();
  const q = s.quits.find((x) => x.id === id);
  const [start, setStart] = useState(q?.start || '');
  const [monthly, setMonthly] = useState(String(q?.monthly ?? 0));
  const [minutes, setMinutes] = useState(String(q ? minutesFor(q) : 20));
  if (!q) return html`<${SheetBar} title="Removed" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const maxFuture = S.toLocalInput(S.addDays(new Date(), 60));
  const valid = start && !Number.isNaN(S.parseLocal(start).getTime()) && start <= maxFuture && parseFloat(monthly) >= 0;
  const save = () => {
    if (!valid) return;
    haptic(12);
    S.update((d) => { const x = d.quits.find((y) => y.id === id); x.start = start; x.monthly = parseFloat(monthly); const mn = parseFloat(minutes); if (Number.isFinite(mn) && mn >= 0) x.minutes = Math.min(1440, mn); });
    close();
  };
  const elapsed = S.quitElapsed(q);
  const best = Math.max(q.best || 0, elapsed);
  const remove = () => confirmSheet({
    title: `Remove ${q.label}`, danger: true,
    text: `This removes the ${q.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,
    confirm: 'Remove',
    onConfirm: () => { close(); S.update((d) => { d.quits = d.quits.filter((x) => x.id !== id); }); toast(`${q.label} removed`); },
  });
  const m = parseFloat(monthly) || 0;
  return html`
    <${SheetBar} title=${`${q.emoji} ${q.label}`} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!valid} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${Field} label="Quit at"><input type="datetime-local" value=${start} max=${maxFuture} onInput=${(e) => setStart(e.target.value)} /><//>
      <//>
      <${Group} header="What it cost you" footer=${`About ${S.money((m * 12) / 52)} a week, or ${S.money(m * 12, 0)} a year. If it varied, use a middle figure.`}>
        <${Field} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${monthly} onInput=${(e) => setMonthly(e.target.value)} /><//>
      <//>
      <${Group} header="Time it took" footer=${`Minutes a day, roughly: buying, using, recovering.${MINUTES_RANGE[q.kind] ? ` Usually ${MINUTES_RANGE[q.kind]} minutes for ${q.kind === 'weed' ? 'cannabis' : 'nicotine'}.` : ''} Used for “time reclaimed” on Home.`}>
        <${Field} label="Per day (min)"><input type="number" inputmode="numeric" min="0" max="1440" value=${minutes} onInput=${(e) => setMinutes(e.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(elapsed / DAY)}</b><span>days now</span></div>
        <div><b>${Math.floor(best / DAY)}</b><span>best run</span></div>
        <div><b>${(q.resets || []).length}</b><span>restarts</span></div>
      </div>
      ${healthFor(q) && html`<button class="btn btn-plain block" onClick=${() => openTimeline(id)}>See the health timeline</button>`}
      ${(q.resets || []).length > 0 && q.monthly > 0 && html`<p class="muted center tiny">Saved overall, slips included: <b>${S.money(S.lifetimeSaved(q), 0)}</b></p>`}
      ${elapsed > 0 && html`<button class="btn btn-tinted block" onClick=${() => openShareSheet(cardFor([q], elapsed / DAY, S.savedFor(q, elapsed)))}>Share my streak</button>`}
      ${elapsed > 0 && html`<button class="btn btn-plain block" onClick=${() => { close(); setTimeout(() => openSlip(id), 350); }}>I slipped</button>`}
      <button class="btn btn-plain danger block" onClick=${remove}>Remove from Novum</button>
    </div>`;
}

export function openTimeline(id) { openSheet((close) => html`<${Timeline} initial=${id} close=${close} />`, { tall: true }); }

export function Timeline({ initial, close }) {
  const s = S.getState();
  const opts = s.quits.filter((x) => healthFor(x));
  const [qid, setQid] = useState(initial);
  const q = opts.find((x) => x.id === qid) || opts[0];
  if (!q) return html`<${SheetBar} title="Recovery timeline" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const hours = S.quitElapsed(q) / 36e5;
  const items = healthFor(q) || [];
  const when = (h) => (h === 0 ? 'Before you start' : h < 1 ? `${Math.round(h * 60)} minutes` : h < 48 ? `${h} hours` : h < 336 ? `${Math.round(h / 24)} days` : h < 1440 ? `${Math.round(h / 168)} weeks` : h < 8760 ? `${Math.round(h / 730)} months` : '1 year');
  return html`
    <${SheetBar} title="Recovery timeline" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${opts.length > 1 && html`<div class="pad-b"><${Segmented} small=${opts.length > 3} options=${opts.map((x) => ({ value: x.id, label: `${x.emoji} ${x.label}` }))} value=${q.id} onChange=${setQid} /></div>`}
      <ol class="timeline" style="--c:${q.color}">
        ${items.map((it) => {
          const done = hours >= it.h;
          return html`<li class=${done ? 'done' : ''}>
            <span class="tl-dot">${done ? Icon.check() : ''}</span>
            <div class="tl-when">${when(it.h)} · ${it.area}${!done ? html` <em>in ${fmtLeft((it.h - hours) / 24)}</em>` : ''}</div>
            <div class="tl-title">${it.title}</div>
            <div class="tl-text">${it.text}</div>
          </li>`;
        })}
      </ol>
      <p class="disclaimer">${HEALTH_NOTE}</p>
    </div>`;
}

/* ============ I SLIPPED ============ */
// A kind reset: log what set it off, keep the best run on record, and show what you've still saved.
export function openSlip(id) { openSheet((close) => html`<${Slip} id=${id} close=${close} />`, { tall: true }); }

export function Slip({ id, close }) {
  const s = S.getState();
  const started = s.quits.filter((q) => S.quitStart(q) <= new Date());
  const [qid, setQid] = useState(id && started.some((q) => q.id === id) ? id : started[0]?.id);
  const [when, setWhen] = useState('now');
  const [at, setAt] = useState(S.toLocalInput(new Date()));
  const [trig, setTrig] = useState([]);
  const [note, setNote] = useState('');
  const [done, setDone] = useState(null);
  const q = s.quits.find((x) => x.id === qid);
  if (!q) return html`<${SheetBar} title="Slipped up" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body"><p class="muted center sheet-intro">There’s no running counter to reset yet.</p></div>`;

  if (done) return html`
    <${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body slip-done">
      <div class="wiz-emoji">🌱</div>
      <h2 class="auth-title center">Fresh start</h2>
      <p class="wiz-sub center">Your ${q.label.toLowerCase()} counter starts again now. That’s all a slip is: a restart, not a reset of you.</p>
      <div class="stats3">
        <div><b>${Math.floor(done.best / DAY)}</b><span>best run (days)</span></div>
        <div><b>${S.money(done.life, 0)}</b><span>saved overall</span></div>
        <div><b>1 day</b><span>next milestone</span></div>
      </div>
      <button class="btn btn-primary block big" onClick=${() => { close(); setTimeout(openSos, 300); }}>Breathe for a minute</button>
      <button class="btn btn-plain block big" onClick=${close}>I’m okay</button>
    </div>`;

  const atDate = when === 'now' ? new Date() : S.parseLocal(at);
  const validAt = when === 'now' || (!Number.isNaN(atDate.getTime()) && atDate <= new Date() && atDate >= S.quitStart(q));
  const runMs = Math.max(0, (validAt ? atDate : new Date()) - S.quitStart(q));
  const best = Math.max(q.best || 0, runMs);
  const pastMs = S.lifetimeMs(q) - S.quitElapsed(q);
  const life = S.savedFor(q, pastMs + runMs);
  const toggle = (t) => { haptic(6); setTrig(trig.includes(t) ? trig.filter((x) => x !== t) : [...trig, t]); };
  const confirm = () => {
    if (!validAt) return;
    S.restartQuit(q.id, { at: atDate, triggers: trig, note: note.trim() });
    haptic(15);
    setDone({ best, life });
  };
  return html`
    <${SheetBar} title="Slipped up" left=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      <div class="slip-hero">
        <div class="wiz-emoji">🤍</div>
        <h2 class="auth-title center">A slip isn’t starting over</h2>
        <p class="wiz-sub center">Most people who quit for good had a few goes first. What matters is the next hour, not the last one.</p>
      </div>
      ${started.length > 1 && html`<${Group} header="Which one">
        <div class="pad"><${Segmented} options=${started.map((x) => ({ value: x.id, label: `${x.emoji} ${x.label}` }))} value=${qid} onChange=${setQid} /></div>
      <//>`}
      <${Group} header="When" footer=${!validAt ? html`<span class="err">Pick a time after your quit date and not in the future.</span>` : ''}>
        <div class="pad"><${Segmented} options=${[{ value: 'now', label: 'Just now' }, { value: 'earlier', label: 'Earlier' }]} value=${when} onChange=${setWhen} /></div>
        ${when === 'earlier' && html`<${Field} label="At"><input type="datetime-local" value=${at} max=${S.toLocalInput(new Date())} onInput=${(e) => setAt(e.target.value)} /><//>`}
      <//>
      <${Group} header="What set it off?" footer="Optional. Spotting patterns is how next time goes differently. They show up in Progress.">
        <div class="chip-row">${TRIGGERS.map((t) => html`<button class="chip big ${trig.includes(t) ? 'on' : ''}" aria-pressed=${trig.includes(t)} onClick=${() => toggle(t)}>${t}</button>`)}</div>
      <//>
      <${Group} header="Anything else?">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="280" placeholder="What happened, how you felt, what might help next time…" value=${note} onInput=${(e) => setNote(e.target.value)}></textarea></div>
      <//>
      <div class="card pad slip-keep">
        <div><span>🏅</span><span>Your best run of <b>${Math.floor(best / DAY)} day${Math.floor(best / DAY) === 1 ? '' : 's'}</b> stays on record.</span></div>
        ${q.monthly > 0 && html`<div><span>💷</span><span>You’ve still saved <b>${S.money(life, 0)}</b> overall. That doesn’t go anywhere.</span></div>`}
      </div>
      <button class="btn btn-primary block big" disabled=${!validAt} onClick=${confirm}>Restart my counter</button>
    </div>`;
}
