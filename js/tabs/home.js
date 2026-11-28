// Home tab: streaks, support card, tip of the day, buddies, money saved (and what it could buy), future you,
// milestones, today, body.
import { useState } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, useNow, Icon, Ring, openSheet, SheetBar, Page, Segmented, Group, Legend } from '../ui.js';
import { MILESTONES, healthFor, MOODS, WISH_IDEAS, SLOGAN, ADDICTIONS } from '../content.js';
import { InstallBanner } from '../install.js';
import { BuddiesSection, refreshBuddies } from '../social.js';
import { ActivityBell, refreshActivity } from '../activity.js';
import { Avatar } from '../profile.js';
import { syncNow } from '../sync.js';
import { DAY, pad2, NEW_YEAR, fmtLeft, RING_LABEL, ringLeft, milestoneInfo, firstName, stageInfo, areaIcon, typeText, toggleTick } from '../shared.js';
import { openNewYear } from './goals.js';
import { openAddQuit, openQuitEditor, openTimeline, openSlip } from '../quits.js';
import { openSos, openReasons } from '../sos.js';
import { TipCard, FutureYou, TimeReclaimed } from '../future.js';
import { LetterCard } from '../letters.js';
import { EventsCard, openPlans } from '../plans.js';

/* ============ HOME ============ */
export function Home({ s, go }) {
  // Only the counters tick every second (inside QuitCard/MoneyTicker); the rest refreshes each minute
  const now = useNow(60000);
  const today = S.dayKey();
  const ci = s.checkins[today];
  const monthly = s.quits.reduce((a, q) => a + (q.monthly || 0), 0);
  const hr = new Date(now).getHours();
  const greet = hr < 5 ? 'Up late' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  const habits = s.goals.filter((g) => g.type === 'habit');
  const hasQuits = s.quits.length > 0;
  const sameStart = hasQuits && s.quits.every((q) => q.start === s.quits[0].start);
  const [badgeQuit, setBadgeQuit] = useState(null);
  const bq = s.quits.find((q) => q.id === badgeQuit) || s.quits[0];
  const bDays = bq ? S.quitElapsed(bq, now) / DAY : 0;
  const toNY = Math.ceil((NEW_YEAR - now) / DAY);
  const withHealth = s.quits.filter((q) => healthFor(q));

  // Pull down to refresh: sync data, buddies and activity
  const refresh = () => Promise.all([Promise.resolve(syncNow()).catch(() => {}), refreshBuddies(), refreshActivity()]);
  return html`<${Page} title="Novum" eyebrow=${new Date(now).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
      sub=${SLOGAN} titleRight=${html`<${ActivityBell} />`} onRefresh=${refresh}>
    <p class="greet"><button class="greet-av" aria-label="Your profile" onClick=${() => go('profile')}><${Avatar} a=${s.social?.avatar} name=${firstName()} size=${36} /></button><span>${greet}${firstName() ? `, ${firstName()}` : ''}.</span></p>
    <${InstallBanner} />

    <section class="group first">
      <h2 class="group-h">${hasQuits ? 'Your streaks' : 'Get started'}</h2>
      ${hasQuits ? html`<div class="stack">
        ${s.quits.map((q) => html`<${QuitCard} key=${q.id} q=${q} />`)}
        ${s.quits.length < ADDICTIONS.length && html`<${AddQuitCard} />`}
      </div>` : html`<button class="card add-first tap" onClick=${openAddQuit}>
        <span class="row-ic" style="background:#3B9BFF">${Icon.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${Icon.chevron()}</span>
      </button>`}
    </section>

    ${hasQuits && html`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${openSos}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${Icon.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${() => openSlip()}>
          <span class="sup-slip-e">🌱</span><span class="row-main">Slipped up? <b>Reset without the guilt</b></span><span class="row-chev">${Icon.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${openPlans}>
          <span class="sup-slip-e">🧭</span><span class="row-main">Tough day coming? <b>Plan ahead</b></span><span class="row-chev">${Icon.chevron()}</span>
        </button>
        ${s.reasons.length > 0
          ? html`<button class="sup-why" onClick=${openReasons}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${s.reasons[Math.floor(now / 864e5) % s.reasons.length].text}”</span>
            </button>`
          : html`<button class="sup-why add" onClick=${openReasons}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    <${LetterCard} s=${s} />

    ${hasQuits && html`<${EventsCard} s=${s} />`}

    ${hasQuits && html`<${TipCard} s=${s} />`}

    <${BuddiesSection} />

    ${monthly > 0 && html`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${openWishlist}>
        <${MoneyTicker} quits=${s.quits} />
        <div class="mc-sub">${S.money(monthly, 0)} a month back in your pocket · ${S.money(monthly * 12, 0)} a year</div>
        <${WishLine} s=${s} />
      </button>
    </section>`}

    ${hasQuits && html`<${TimeReclaimed} s=${s} />`}

    ${hasQuits && html`<${FutureYou} s=${s} />`}

    ${hasQuits && html`<section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!sameStart && html`<${Segmented} small options=${s.quits.map((q) => ({ value: q.id, label: q.label }))} value=${bq.id} onChange=${setBadgeQuit} />`}
      </div>
      <div class="badges">
        ${MILESTONES.map((m) => {
          const got = bDays >= m.days;
          return html`<div class="badge ${got ? 'got' : ''}">
            <div class="badge-medal">${got ? Icon.check() : m.short}</div>
            <div class="badge-l">${m.label}</div>
            <div class="badge-s">${got ? 'Earned' : `in ${fmtLeft(m.days - bDays)}`}</div>
          </div>`;
        })}
      </div>
      ${sameStart && s.quits.length > 1 && html`<p class="group-f">Counting for all of them, since you stopped at the same time.</p>`}
    </section>`}

    <section class="group">
      <h2 class="group-h">Today</h2>
      <button class="card checkin-card tap" onClick=${() => go('checkin')}>
        ${ci && ci.mood ? html`
          <span class="cc-emoji">${MOODS[ci.mood - 1].e}</span>
          <span class="cc-main"><b>Checked in · feeling ${MOODS[ci.mood - 1].l.toLowerCase()}</b>
            <span>${s.quits.map((q) => `${q.label} craving ${ci[q.id] ?? '–'}/10`).join(' · ')}</span></span>`
        : html`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${Icon.chevron()}</span>
      </button>
      ${habits.length > 0 && html`<div class="card list mt8">
        ${habits.map((g) => html`<${HabitTickRow} key=${g.id} g=${g} />`)}
      </div>`}
    </section>

    ${withHealth.length > 0 && html`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${withHealth.map((q) => {
          const h = S.quitElapsed(q, now) / 36e5;
          const st = stageInfo(q, h);
          return html`<button class="row tap body-row" onClick=${() => openTimeline(q.id)}>
            <span class="row-ic tint-ic" style="--c:${q.color}" title=${st.current ? st.current.area : "Getting started"}>${st.current ? areaIcon(st.current.area) : "🌱"}</span>
            <span class="row-main">
              <span class="row-title">${st.current ? st.current.title : 'Just getting started'}</span>
              <span class="row-sub">${st.current ? st.current.text : 'Your first changes start within hours.'}</span>
              ${st.next && html`<span class="row-next">Next: ${st.next.title.toLowerCase()} in ${fmtLeft(st.next.h / 24 - h / 24)}</span>`}
            </span>
            <span class="row-chev">${Icon.chevron()}</span>
          </button>`;
        })}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>`}

    ${toNY > 0 ? html`
      <button class="card ny-card tap" onClick=${openNewYear}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${toNY} day${toNY === 1 ? '' : 's'} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`
    : html`<button class="card ny-card tap" onClick=${() => go('progress')}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`;
}

export function MoneyTicker({ quits }) {
  const now = useNow(1000);
  return html`<div class="mc-big">${S.money(quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0))}</div>`;
}

// Same shape as a quit card, under your counters: tap to start another one
export function AddQuitCard() {
  return html`<button class="card quit-card qc-add tap" onClick=${openAddQuit} aria-label="Add something else to quit">
    <div class="qc-head"><span class="qc-add-ic">${Icon.plus()}</span><span class="qc-label">Quitting something else?</span></div>
    <div class="qc-body">
      <div class="qc-time" aria-hidden="true">
        <span><b>0</b><small>days</small></span><span><b>00</b><small>hrs</small></span><span><b>00</b><small>min</small></span>
      </div>
      <span class="qc-add-ring" aria-hidden="true">${Icon.plus()}</span>
    </div>
    <div class="qc-foot">Smoking, alcohol, gambling, energy drinks and more. Each gets its own counter.</div>
  </button>`;
}

export function QuitCard({ q }) {
  const now = useNow(1000);
  const startMs = S.quitStart(q).getTime();
  // Quit day set in the future: count down to it
  if (startMs > now) {
    const { d, h, m } = S.splitDuration(startMs - now);
    return html`<button class="card quit-card tap" onClick=${() => openQuitEditor(q.id)} style="--qc:${q.color}">
      <div class="qc-head"><span class="qc-emoji">${q.emoji}</span><span class="qc-label">${q.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${d}</b><small>${d === 1 ? 'day' : 'days'}</small></span><span><b>${pad2(h)}</b><small>hrs</small></span><span><b>${pad2(m)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${S.quitStart(q).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}. You’ve got this.</div>
    </button>`;
  }
  const ms = S.quitElapsed(q, now);
  const { d, h, m, s: sec } = S.splitDuration(ms);
  const days = ms / DAY;
  const mi = milestoneInfo(days);
  return html`<button class="card quit-card tap" onClick=${() => openQuitEditor(q.id)} style="--qc:${q.color}">
    <div class="qc-head"><span class="qc-emoji">${q.emoji}</span><span class="qc-label">${q.label}-free</span>
      ${q.monthly > 0 && html`<span class="qc-saved">${S.money(S.savedFor(q, ms))} saved</span>`}</div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${d}</b><small>${d === 1 ? 'day' : 'days'}</small></span>
        <span><b>${pad2(h)}</b><small>hrs</small></span>
        <span><b>${pad2(m)}</b><small>min</small></span>
        <span class="qc-sec"><b>${pad2(sec)}</b><small>sec</small></span>
      </div>
      <${Ring} pct=${mi.pct} size=${70} stroke=${8} color=${q.color}>
        ${mi.next
          ? html`<span class="ring-txt" aria-label=${`Next milestone ${RING_LABEL[mi.next.days]}, ${ringLeft(mi.next.days - days)} to go`}><small>next</small><b>${RING_LABEL[mi.next.days]}</b><small>in ${ringLeft(mi.next.days - days)}</small></span>`
          : html`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${mi.next ? `Next milestone: ${mi.next.label}, in ${fmtLeft(mi.next.days - days)}` : 'Every milestone earned. Legend.'}</div>
  </button>`;
}

export function HabitTickRow({ g }) {
  const done = (g.ticks || []).includes(S.dayKey());
  const st = S.habitStreak(g);
  return html`<div class="row">
    <span class="row-ic" style="background:${g.color}">${g.emoji}</span>
    <span class="row-main"><span class="row-title">${g.name}</span>
      <span class="row-sub">${st.value > 0 ? `🔥 ${st.value} ${st.unit} streak` : typeText(g)}</span></span>
    <button class="tick ${done ? 'on' : ''}" style="--c:${g.color}" aria-pressed=${done} aria-label=${`Mark ${g.name} done today`}
      onClick=${(e) => { e.stopPropagation(); toggleTick(g.id); }}>${Icon.check()}</button>
  </div>`;
}

/* ============ WHAT YOUR MONEY COULD BUY ============ */
export const savedNow = (s, now = Date.now()) => s.quits.reduce((a, q) => a + S.savedFor(q, S.quitElapsed(q, now)), 0);

export function WishLine({ s }) {
  const now = useNow(60000);
  const saved = savedNow(s, now);
  const items = [...s.wishlist].sort((a, b) => a.price - b.price);
  if (!items.length) return html`<div class="wish-line add">🎁 What could it buy? <b>Add something to save for</b></div>`;
  const got = items.filter((w) => w.price <= saved);
  const next = items.find((w) => w.price > saved);
  return html`<div class="wish-line">
    ${got.length > 0 && html`<div class="wl-got">✓ That’s ${got[got.length - 1].emoji} ${got[got.length - 1].name}${got.length > 1 ? ` and ${got.length - 1} more` : ''}</div>`}
    ${next && html`<div class="wl-next"><span>Next: ${next.emoji} ${next.name}</span><b>${Math.floor((saved / next.price) * 100)}%</b></div>
      <div class="wl-bar"><i style="width:${Math.min(100, (saved / next.price) * 100)}%"></i></div>`}
  </div>`;
}

export function openWishlist() { openSheet((close) => html`<${Wishlist} close=${close} />`, { tall: true }); }

export function Wishlist({ close }) {
  const s = S.getState();
  const now = useNow(1000);
  const saved = savedNow(s, now);
  const [emoji, setEmoji] = useState('🎁');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const items = [...s.wishlist].sort((a, b) => a.price - b.price);
  const have = new Set(s.wishlist.map((w) => w.name.toLowerCase()));
  const add = (w) => { haptic(10); S.update((d) => { d.wishlist.push({ id: S.uid(), emoji: w.emoji || '🎁', name: w.name.trim().slice(0, 40), price: +w.price }); }); };
  const valid = name.trim() && parseFloat(price) > 0;
  return html`
    <${SheetBar} title="What it could buy" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="wish-hero"><div class="kicker">Saved by quitting</div><div class="mc-big">${S.money(saved)}</div>
        <p class="muted">Money you’d have spent. Put some aside and treat yourself when you hit one.</p></div>
      ${items.length > 0 && html`<${Group} header="Saving for">
        ${items.map((w) => {
          const pct = Math.min(1, saved / w.price);
          return html`<div class="row wish-row" key=${w.id}>
            <span class="row-ic" style="background:var(--fill-2)">${w.emoji}</span>
            <span class="row-main"><span class="row-title">${w.name}</span>
              <span class="row-sub">${pct >= 1 ? '✓ You could buy this now' : `${S.money(w.price - saved, 0)} to go · ${Math.floor(pct * 100)}%`}</span>
              <span class="wl-bar"><i style="width:${pct * 100}%;${pct >= 1 ? 'background:var(--green)' : ''}"></i></span></span>
            <span class="row-detail">${S.money(w.price, 0)}</span>
            <button class="icon-btn muted" aria-label=${`Remove ${w.name}`} onClick=${() => S.update((d) => { d.wishlist = d.wishlist.filter((x) => x.id !== w.id); })}>${Icon.trash()}</button>
          </div>`;
        })}
      <//>`}
      <${Group} header="Add your own">
        <div class="wish-add">
          <input class="wish-emoji" aria-label="Emoji" maxlength="4" value=${emoji} onInput=${(e) => setEmoji(e.target.value)} />
          <input placeholder="e.g. Festival ticket" maxlength="40" value=${name} onInput=${(e) => setName(e.target.value)} />
          <span class="wish-price">£<input type="number" inputmode="decimal" placeholder="0" value=${price} onInput=${(e) => setPrice(e.target.value)} /></span>
          <button class="btn btn-primary sm" disabled=${!valid} onClick=${() => { add({ emoji, name, price: parseFloat(price) }); setName(''); setPrice(''); setEmoji('🎁'); }}>Add</button>
        </div>
      <//>
      ${WISH_IDEAS.some((w) => !have.has(w.name.toLowerCase())) && html`<${Group} header="Ideas" footer="Rough prices. Add one, then delete and re-add it with your own price if it’s different.">
        ${WISH_IDEAS.filter((w) => !have.has(w.name.toLowerCase())).map((w) => html`<button class="row tap" key=${w.name} onClick=${() => add(w)}>
          <span class="row-ic" style="background:var(--fill-2)">${w.emoji}</span>
          <span class="row-main"><span class="row-title">${w.name}</span></span>
          <span class="row-detail">${S.money(w.price, 0)}</span>
          <span class="add-pill">${Icon.plus()}</span>
        </button>`)}
      <//>`}
    </div>`;
}
