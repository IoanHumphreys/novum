// The row of cheers you can send a buddy: one-line pills that wrap neatly on small screens,
// with a tick on the one you sent. Used on buddy cards, profiles and in Activity.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, toast } from './ui.js';
import * as A from './api.js';
import { CHEER_KINDS } from './content.js';

export function CheerBar({ who, small, onSent, class: cls = '' }) {
  const [sent, setSent] = useState(null);
  const t = useRef();
  useEffect(() => () => clearTimeout(t.current), []);
  const send = async (c) => {
    if (sent) return;
    haptic(12);
    setSent(c.kind);
    try {
      await A.cheer(who.username, c.kind);
      toast(`Sent ${c.e} to ${who.firstName}`);
      onSent?.(c);
    } catch (e) {
      toast(e.message);
      // Offline: it's queued and goes when you're back, so it still counts as sent
      if (!e.queued) { setSent(null); return; }
      onSent?.(c, true);
    }
    clearTimeout(t.current);
    t.current = setTimeout(() => setSent(null), 2500);
  };
  return html`<div class="cheer-bar ${small ? 'sm' : ''} ${cls}" role="group" aria-label=${`Send ${who.firstName} a cheer`}>
    ${CHEER_KINDS.map((c) => html`<button key=${c.kind} class="cheer-pill ${sent === c.kind ? 'sent' : ''}" disabled=${!!sent && sent !== c.kind}
      aria-label=${`Send ${c.l}`} onClick=${() => send(c)}>
      <span class="cp-e" aria-hidden="true">${sent === c.kind ? '✓' : c.e}</span><span class="cp-l">${sent === c.kind ? 'Sent' : c.l}</span>
    </button>`)}
  </div>`;
}

// A buddy's quits as small coloured chips: "💨 12d"
export function StreakChips({ card, now }) {
  const DAY = 864e5;
  if (!card) return html`<span class="schips muted">Not sharing streaks</span>`;
  const q = card.quits || [];
  if (!q.length) return html`<span class="schips muted">${card.checkinStreak ? `✍️ ${card.checkinStreak}-day check-in streak` : 'Nothing tracked yet'}</span>`;
  return html`<span class="schips">${q.map((x) => {
    const d = x.startMs > now ? null : Math.floor((now - x.startMs) / DAY);
    return html`<span class="schip" key=${x.label} style="--c:${x.color || '#3B9BFF'}" title=${x.label}>${x.emoji} ${d == null ? 'soon' : `${d}d`}</span>`;
  })}</span>`;
}
