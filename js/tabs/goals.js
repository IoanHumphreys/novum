// Goals tab: goal list, goal detail, goal editor and New Year ideas.
import { useState } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, Icon, Ring, openSheet, SheetBar, Page, Segmented, Toggle, Group, Field, Empty, toast } from '../ui.js';
import { quitPresets, CATEGORIES, catById, COLORS, EMOJIS, PRESETS } from '../content.js';
import { DAY, NEW_YEAR, deadlineText, typeText, toggleTick, confirmSheet } from '../shared.js';
import { Profile, openWeightSheet } from './me.js';

/* ============ GOALS ============ */
export function Goals({ s }) {
  const [filter, setFilter] = useState('active');
  const all = s.goals.map((g) => ({ g, p: S.goalProgress(g, s) }));
  const list = all.filter(({ p }) => (filter === 'done' ? p.pct >= 1 : filter === 'active' ? p.pct < 1 : true));
  const addBtn = html`<button class="icon-btn accent" onClick=${() => openGoalEditor()} aria-label="New goal">${Icon.plus()}</button>`;

  return html`<${Page} title="Goals" right=${addBtn}>
    <button class="card ny-mini tap" onClick=${openNewYear}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${Icon.chevron()}</span>
    </button>

    ${s.goals.length === 0 ? html`<${Empty} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${html`<div class="empty-actions"><button class="btn btn-primary" onClick=${openNewYear}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${() => openGoalEditor()}>Create your own</button></div>`} />`
    : html`
      <div class="pad-x mb12"><${Segmented} options=${[{ value: 'active', label: 'Active' }, { value: 'done', label: 'Complete' }, { value: 'all', label: 'All' }]} value=${filter} onChange=${setFilter} /></div>
      ${list.length === 0 && html`<p class="muted center pad">${filter === 'done' ? 'Nothing complete yet. You’ll get there.' : 'Everything’s complete. Time for a new goal?'}</p>`}
      ${CATEGORIES.map((c) => {
        const items = list.filter(({ g }) => g.category === c.id);
        if (!items.length) return null;
        return html`<${Group} key=${c.id} header=${c.label}>
          ${items.map(({ g, p }) => html`<${GoalRow} key=${g.id} g=${g} p=${p} />`)}
        <//>`;
      })}`}
  <//>`;
}

export function GoalRow({ g, p }) {
  const today = (g.ticks || []).includes(S.dayKey());
  return html`<div class="row tap goal-row" role="button" tabindex="0" onClick=${() => openGoalDetail(g.id)}>
    <${Ring} pct=${p.pct} size=${46} stroke=${5} color=${g.color}><span class="ring-emoji">${g.emoji}</span><//>
    <span class="row-main">
      <span class="row-title">${g.name}</span>
      <span class="row-sub">${S.goalStartsLater(g) ? `Counts from ${S.fmtDate(S.goalWindow(g).start, { day: 'numeric', month: 'short' })}` : p.label} · ${deadlineText(g)}</span>
    </span>
    ${g.type === 'habit'
      ? html`<button class="tick ${today ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${today} aria-label="Done today"
          onClick=${(e) => { e.stopPropagation(); toggleTick(g.id); }}>${Icon.check()}</button>`
      : html`<span class="row-detail">${Math.round(p.pct * 100)}%</span><span class="row-chev">${Icon.chevron()}</span>`}
  </div>`;
}

export function openGoalDetail(id) { openSheet((close) => html`<${GoalDetail} id=${id} close=${close} />`, { tall: true }); }

export function GoalDetail({ id, close }) {
  const s = S.getState();
  const g = s.goals.find((x) => x.id === id);
  const [val, setVal] = useState('');
  if (!g) return html`<${SheetBar} title="Goal" right=${html`<button class="link b" onClick=${close}>Done</button>`} />`;
  const p = S.goalProgress(g, s);
  const cat = catById(g.category);
  const todayKey = S.dayKey();
  const del = () => confirmSheet({
    title: 'Delete goal', text: `Delete “${g.name}”? Its history will be removed too.`, confirm: 'Delete goal',
    onConfirm: () => { close(); S.update((d) => { d.goals = d.goals.filter((x) => x.id !== id); }); toast('Goal deleted'); },
  });
  const addEntry = () => {
    const v = parseFloat(val);
    if (Number.isNaN(v)) return;
    haptic(12);
    S.update((d) => { const x = d.goals.find((y) => y.id === id); x.entries = [...(x.entries || []), { id: S.uid(), date: todayKey, value: v }]; });
    setVal('');
  };

  let body = null;
  if (g.type === 'habit') {
    const done = (g.ticks || []).includes(todayKey);
    const st = S.habitStreak(g);
    const wk = S.weekTicks(g);
    const wkDone = wk.filter((x) => x.done).length;
    const ws = S.weekStart(new Date());
    const weeks = Array.from({ length: 12 }, (_, i) => S.addDays(ws, -7 * (11 - i)));
    const ticks = new Set(g.ticks || []);
    body = html`
      <button class="btn block big ${done ? 'btn-done' : 'btn-primary'}" style="--c:${g.color}" onClick=${() => toggleTick(id)}>
        ${done ? html`${Icon.check()} Done today` : 'Mark done today'}</button>
      <div class="stats3">
        <div><b>${st.value}</b><span>${st.unit} streak</span></div>
        ${g.perWeek >= 7 ? html`<div><b>${S.bestDailyStreak(g)}</b><span>best streak</span></div>` : html`<div><b>${wkDone}/${g.perWeek}</b><span>this week</span></div>`}
        <div><b>${(g.ticks || []).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${wk.map((x, i) => html`<button class="wd ${x.done ? 'on' : ''} ${x.key === todayKey ? 'today' : ''}" style="--c:${g.color}"
          disabled=${x.key > todayKey} onClick=${() => toggleTick(id, x.key)}><span>${'MTWTFSS'[i]}</span><i>${x.done ? Icon.check() : ''}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${g.color}">
          ${weeks.map((w) => html`<div class="heat-col">${Array.from({ length: 7 }, (_, d) => {
            const k = S.dayKey(S.addDays(w, d));
            return html`<i class="${ticks.has(k) ? 'on' : ''} ${k > todayKey ? 'future' : ''}" title=${S.fmtDate(k)}></i>`;
          })}</div>`)}
        </div>
      </div>`;
  } else if (g.type === 'numeric' && g.auto === 'money') {
    body = html`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${S.fmtDate(S.goalWindow(g).start)}.</div>`;
  } else if (g.type === 'numeric' && g.auto === 'weight') {
    body = html`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${openWeightSheet}>Log weight</button>`;
  } else if (g.type === 'numeric') {
    const entries = [...(g.entries || [])].reverse();
    body = html`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${g.mode === 'level' ? `New value${g.unit ? ' (' + g.unit + ')' : ''}` : g.unit === '£' ? 'Amount you saved (£)' : `Add amount${g.unit ? ' (' + g.unit + ')' : ''}`}
          value=${val} onInput=${(e) => setVal(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && addEntry()} />
        <button class="btn btn-primary sm" disabled=${val === ''} onClick=${addEntry}>${g.mode === 'level' ? 'Log' : 'Add'}</button>
      </div>
      ${entries.length > 0 && html`<${Group} header="History">
        ${entries.slice(0, 30).map((e) => html`<div class="row" key=${e.id}>
          <span class="row-main"><span class="row-title">${g.mode === 'level' ? '' : '+'}${e.value}${g.unit ? ' ' + g.unit : ''}</span><span class="row-sub">${S.fmtDate(e.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${() => S.update((d) => { const x = d.goals.find((y) => y.id === id); x.entries = x.entries.filter((y) => y.id !== e.id); })}>${Icon.trash()}</button>
        </div>`)}
      <//>`}`;
  } else if (g.type === 'quit') {
    const q = s.quits.find((x) => x.id === g.quitId) || s.quits[0];
    body = html`<div class="card pad info">${q.emoji} Linked to your ${q.label.toLowerCase()} counter. Every day you stay ${q.label.toLowerCase()}-free ${g.period === '2027' ? `from ${S.fmtDate(S.quitWindowStart(g, q))} to the end of 2027 ` : ''}fills this ring, including the days before you added this goal.</div>`;
  } else {
    body = html`<button class="btn block big ${g.done ? 'btn-done' : 'btn-primary'}" style="--c:${g.color}"
      onClick=${() => { haptic(15); S.update((d) => { const x = d.goals.find((y) => y.id === id); x.done = !x.done; x.doneDate = x.done ? todayKey : null; }); if (!g.done) toast('Milestone complete 🎉'); }}>
      ${g.done ? html`${Icon.check()} Completed` : 'Mark as complete'}</button>`;
  }

  return html`
    <${SheetBar} left=${html`<button class="link" onClick=${() => openGoalEditor(g)}>Edit</button>`}
      right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${Ring} pct=${p.pct} size=${168} stroke=${18} color=${g.color}>
          <div class="dh-in"><span class="dh-e">${g.emoji}</span><b>${Math.round(p.pct * 100)}%</b></div>
        <//>
        <h2 class="dh-name">${g.name}</h2>
        <div class="dh-label">${p.label} <span class="muted">${p.sub}</span></div>
        ${S.goalStartsLater(g) && html`<div class="dh-note">Counts from ${S.fmtDate(S.goalWindow(g).start)}. Ticks before then still build your streak.</div>`}
        <div class="chips"><span class="chip" style="--c:${cat.color}">${cat.label}</span><span class="chip">${typeText(g)}</span><span class="chip">${deadlineText(g)}</span></div>
      </div>
      ${body}
      <button class="btn btn-plain danger block mt16" onClick=${del}>Delete goal</button>
    </div>`;
}

export function openGoalEditor(goal) { openSheet((close) => html`<${GoalEditor} goal=${goal} close=${close} />`, { tall: true }); }

export function GoalEditor({ goal = {}, close }) {
  const isEdit = !!goal.id;
  const [f, setF] = useState(() => ({
    name: '', emoji: '🎯', color: '#3B9BFF', category: 'habits', type: 'habit', perWeek: 7, remindAt: '', period: '2027', end: '2027-12-31',
    mode: 'sum', auto: '', unit: '', target: '', startValue: '', quitId: S.getState().quits[0]?.id || '', ...goal,
  }));
  const set = (patch) => setF((x) => ({ ...x, ...patch }));
  const s = S.getState();
  const track = f.auto === 'weight' ? 'weight' : f.mode === 'level' ? 'level' : f.unit === '£' ? 'money' : 'sum';
  const setTrack = (t) => set(t === 'money' ? { auto: '', unit: '£', mode: 'sum' }
    : t === 'weight' ? { auto: 'weight', unit: 'kg', mode: 'level', startValue: f.startValue === '' ? +(S.latestWeight(s.profile) || 0).toFixed(1) : f.startValue }
      : { auto: '', mode: t, unit: f.auto || f.unit === '£' ? '' : f.unit });
  const numOk = f.type !== 'numeric' || (f.target !== '' && !Number.isNaN(parseFloat(f.target)));
  const valid = f.name.trim() && numOk && (f.period === '2027' || f.end);

  const save = () => {
    if (!valid) return;
    haptic(15);
    const clean = { ...f, name: f.name.trim(), target: f.target === '' ? '' : parseFloat(f.target), startValue: f.startValue === '' ? '' : parseFloat(f.startValue) };
    S.update((d) => {
      if (isEdit) { const i = d.goals.findIndex((x) => x.id === goal.id); if (i >= 0) d.goals[i] = { ...d.goals[i], ...clean }; }
      else d.goals.push({ ticks: [], entries: [], ...clean, id: S.uid(), start: S.dayKey(), createdAt: new Date().toISOString() });
    });
    close();
    toast(isEdit ? 'Goal updated' : 'Goal added');
  };

  return html`
    <${SheetBar} title=${isEdit ? 'Edit goal' : 'New goal'}
      left=${html`<button class="link" onClick=${close}>Cancel</button>`}
      right=${html`<button class="link b" disabled=${!valid} onClick=${save}>${isEdit ? 'Save' : 'Add'}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${f.color}">${f.emoji}</div>
        <input class="eh-name" placeholder="Goal name" value=${f.name} onInput=${(e) => set({ name: e.target.value })} maxlength="60" />
      </div>

      <${Group} header="Icon">
        <div class="emoji-grid">${EMOJIS.map((e) => html`<button class="emo ${f.emoji === e ? 'on' : ''}" onClick=${() => { haptic(); set({ emoji: e }); }}>${e}</button>`)}</div>
      <//>
      <${Group} header="Colour">
        <div class="swatches">${COLORS.map((c) => html`<button class="sw ${f.color === c ? 'on' : ''}" style="--c:${c}" aria-label=${c} onClick=${() => { haptic(); set({ color: c }); }}></button>`)}</div>
      <//>
      <${Group} header="Category">
        <div class="chip-row">${CATEGORIES.map((c) => html`<button class="chip big ${f.category === c.id ? 'on' : ''}" style="--c:${c.color}" onClick=${() => { haptic(); set({ category: c.id }); }}>${c.label}</button>`)}</div>
      <//>

      <${Group} header="Type" footer=${{ habit: 'Tick it off on the days you do it. Builds a streak.', numeric: 'Work towards a number, like km run, money saved or a weight.', milestone: 'A one-off achievement you mark as done.', quit: 'Fills automatically every day you stay quit.' }[f.type]}>
        <div class="pad"><${Segmented} options=${[{ value: 'habit', label: 'Habit' }, { value: 'numeric', label: 'Target' }, { value: 'milestone', label: 'Milestone' }, ...(S.getState().quits.length ? [{ value: 'quit', label: 'Stay quit' }] : [])]}
          value=${f.type} onChange=${(v) => set({ type: v })} /></div>
        ${f.type === 'habit' && html`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${f.perWeek >= 7 ? 'Every day' : `${f.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${f.perWeek <= 1} onClick=${() => { haptic(); set({ perWeek: Math.max(1, f.perWeek - 1) }); }} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${f.perWeek >= 7} onClick=${() => { haptic(); set({ perWeek: Math.min(7, f.perWeek + 1) }); }} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${f.type === 'habit' && html`<div class="row">
          <span class="row-main"><span class="row-title">Reminder</span>
            <span class="row-sub">${f.remindAt ? (f.perWeek >= 7 ? 'Every day, unless it’s ticked' : 'Only on days you still need it') : 'A nudge at a time you choose'}</span></span>
          ${f.remindAt && html`<input type="time" class="time-in" value=${f.remindAt} onChange=${(e) => e.target.value && set({ remindAt: e.target.value })} />`}
          <${Toggle} on=${!!f.remindAt} label="Reminder" onChange=${(v) => set({ remindAt: v ? '18:00' : '' })} />
        </div>`}
        ${f.type === 'numeric' && html`
          <div class="pad"><${Segmented} small options=${[{ value: 'sum', label: 'Add up' }, { value: 'level', label: 'Reach' }, { value: 'money', label: '£ Saved' }, { value: 'weight', label: 'Weight' }]}
            value=${track} onChange=${setTrack} /></div>
          ${!f.auto && track !== 'money' && html`<${Field} label="Unit"><input placeholder="km, books, hours…" value=${f.unit} onInput=${(e) => set({ unit: e.target.value })} /><//>`}
          ${(track === 'level' || track === 'weight') && html`<${Field} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${f.startValue} onInput=${(e) => set({ startValue: e.target.value })} /><//>`}
          <${Field} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${track === 'money' ? '1000' : '100'} value=${f.target} onInput=${(e) => set({ target: e.target.value })} /><//>
`}
        ${f.type === 'quit' && html`<div class="pad"><${Segmented} options=${s.quits.map((q) => ({ value: q.id, label: `${q.emoji} ${q.label}` }))} value=${f.quitId} onChange=${(v) => set({ quitId: v })} /></div>`}
      <//>

      <${Group} header="Deadline">
        <div class="pad"><${Segmented} options=${[{ value: '2027', label: 'Until end of 2027' }, { value: 'date', label: 'Pick a date' }]} value=${f.period} onChange=${(v) => set({ period: v })} /></div>
        ${f.period === 'date' && html`<${Field} label="Finish by"><input type="date" value=${f.end} min=${S.dayKey()} onInput=${(e) => set({ end: e.target.value })} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!valid} onClick=${save}>${isEdit ? 'Save changes' : 'Add goal'}</button>
    </div>`;
}

export function openNewYear() { openSheet((close) => html`<${NewYear} close=${close} />`, { tall: true }); }

export function NewYear({ close }) {
  const s = S.getState();
  const toNY = Math.ceil((NEW_YEAR - Date.now()) / DAY);
  const added = new Set(s.goals.map((g) => g.preset).filter(Boolean));
  const quickAdd = (p) => {
    haptic(15);
    S.update((d) => d.goals.push({ ticks: [], entries: [], ...p.make(d), preset: p.key, id: S.uid(), start: S.dayKey(), createdAt: new Date().toISOString() }));
    toast('Added to your goals');
  };
  // Untick: take it back off. Ask first if it already has progress.
  const removePreset = (p) => {
    const g = S.getState().goals.find((x) => x.preset === p.key);
    if (!g) return;
    const drop = () => { haptic(10); S.update((d) => { d.goals = d.goals.filter((x) => x.preset !== p.key); }); toast('Removed from your goals'); };
    if ((g.ticks || []).length || (g.entries || []).length || g.done) {
      confirmSheet({ title: 'Remove goal', text: `Remove “${g.name}”? Its progress so far will be deleted.`, confirm: 'Remove', onConfirm: drop });
    } else drop();
  };
  const desc = (g) => g.type === 'habit' ? `${g.perWeek >= 7 ? 'Daily' : g.perWeek + '× a week'} habit`
    : g.type === 'numeric' ? (g.unit === '£' ? `Log what you save · target £${Number(g.target).toLocaleString('en-GB')}` : g.auto === 'weight' ? `Target ${g.target} kg · edit to suit you` : `Target · ${g.target} ${g.unit}`)
      : g.type === 'quit' ? 'Linked to your quit counter' : 'One-off milestone';
  return html`
    <${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${toNY > 0 ? `${toNY} days until 1 January. ` : ''}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${CATEGORIES.map((c) => {
        const items = [...quitPresets(s), ...PRESETS].filter((p) => p.make(s).category === c.id);
        if (!items.length) return null;
        return html`<${Group} key=${c.id} header=${c.label}>
          ${items.map((p) => {
            const g = p.make(s);
            const has = added.has(p.key);
            const mine = s.goals.find((x) => x.preset === p.key);
            return html`<div class="row tap" key=${p.key} role="button" onClick=${() => (mine ? openGoalDetail(mine.id) : openGoalEditor({ ...g, preset: p.key }))}>
              <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
              <span class="row-main"><span class="row-title">${g.name}</span><span class="row-sub">${desc(g)}</span></span>
              <button class="add-pill ${has ? 'on' : ''}" aria-pressed=${has} aria-label=${has ? `Remove ${g.name}` : `Add ${g.name}`}
                onClick=${(e) => { e.stopPropagation(); has ? removePreset(p) : quickAdd(p); }}>${has ? Icon.check() : Icon.plus()}</button>
            </div>`;
          })}
        <//>`;
      })}
    </div>`;
}
