// Ways to connect with buddies: today's status, the "days quit together" streak, and a QR code / link
// that adds you as a buddy (novumdaily.com/#add=username).
import { useState } from '../vendor/preact-htm.js';
import qrcode from '../vendor/qrcode.js';
import * as S from './store.js';
import * as A from './api.js';
import { html, haptic, openSheet, SheetBar, toast } from './ui.js';
import { STATUSES, statusOf } from './content.js';

const DAY = 864e5;

/* ---------- today's status ---------- */
// Your own: shown under your name. Tap to set or change it; it fades after 24 hours.
export function MyStatus({ s }) {
  const st = statusOf(s.social?.status);
  return html`<button class="status-chip ${st ? 'set' : ''}" style=${st ? `--c:${st.c}` : ''} onClick=${openStatusPicker}>
    ${st ? html`<span>${st.e}</span>${st.l}` : html`<span>＋</span>Set today’s status`}
  </button>`;
}
export function openStatusPicker() { haptic(); openSheet((close) => html`<${StatusPicker} close=${close} />`); }
function StatusPicker({ close }) {
  const cur = statusOf(S.getState().social?.status);
  const set = async (kind) => {
    haptic(12);
    const prev = S.getState().social?.status || null;
    S.update((d) => { d.social = { ...d.social, status: kind ? { kind, at: Date.now() } : null }; });
    close();
    try { await A.setStatus(kind); toast(kind ? 'Your buddies can see it for 24 hours' : 'Status cleared'); } catch (e) {
      S.update((d) => { d.social = { ...d.social, status: prev }; });
      toast(e.offline ? 'You’re offline. Try again when you’re back.' : e.message);
    }
  };
  return html`
    <${SheetBar} title="Today’s status" right=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">How are you doing today? Your buddies see this for 24 hours, so they know when to send a cheer.</p>
      <div class="status-grid">
        ${STATUSES.map((x) => html`<button key=${x.kind} class="status-opt ${cur?.kind === x.kind ? 'on' : ''}" style=${`--c:${x.c}`} onClick=${() => set(x.kind)}>
          <span class="so-e">${x.e}</span><b>${x.l}</b></button>`)}
      </div>
      ${cur && html`<button class="btn btn-plain block mt12" onClick=${() => set(null)}>Clear my status</button>`}
    </div>`;
}
// A buddy's status, as a small coloured tag
export function StatusTag({ status, now }) {
  const st = statusOf(status, now);
  return st ? html`<span class="status-tag" style=${`--c:${st.c}`}>${st.e} ${st.l}</span>` : null;
}
export const isTough = (status, now) => statusOf(status, now)?.kind === 'tough';

/* ---------- buddy streak: days you've both stayed quit ---------- */
// Counts from the latest of: your most recent quit start, theirs, and when you became buddies.
// Needs them to be sharing their streaks (and you to have a quit counter).
export function togetherDays(s, buddy, now = Date.now()) {
  const mine = s.quits.map((q) => S.quitStart(q).getTime()).filter((t) => t <= now);
  const theirs = (buddy?.card?.quits || []).map((q) => q.startMs).filter((t) => t && t <= now);
  if (!mine.length || !theirs.length) return null;
  const from = Math.max(Math.max(...mine), Math.max(...theirs), buddy.since || 0);
  return Math.max(0, Math.floor((now - from) / DAY));
}
export function TogetherTag({ s, buddy, now, long }) {
  const d = togetherDays(s, buddy, now);
  if (d == null) return null;
  return html`<span class="together" title="Days you’ve both stayed quit">🔥 ${long ? `You and ${buddy.firstName}: ${d} day${d === 1 ? '' : 's'} quit together` : `${d}d together`}</span>`;
}

/* ---------- QR code and add-me link ---------- */
export const addLink = (username) => `https://novumdaily.com/#add=${encodeURIComponent(username)}`;
export function QrCode({ text, size = 220 }) {
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  const n = q.getModuleCount();
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`;
  // White background with a 4-module quiet zone, so any camera can read it
  return html`<svg class="qr" viewBox=${`0 0 ${n + 8} ${n + 8}`} width=${size} height=${size} role="img" aria-label="QR code to add you as a buddy" shape-rendering="crispEdges">
    <rect width="100%" height="100%" fill="#fff" /><path d=${d} fill="#0b0f19" />
  </svg>`;
}
export function openShareProfile() { haptic(); openSheet((close) => html`<${ShareProfile} close=${close} />`, { tall: true }); }
function ShareProfile({ close }) {
  const user = A.getSession()?.user || {};
  const link = addLink(user.username);
  const text = `Quit with me on Novum 💙 Tap to add me as a buddy: @${user.username}`;
  const share = async () => {
    haptic();
    try { if (navigator.share) { await navigator.share({ title: 'Novum', text, url: link }); return; } } catch (e) { if (e?.name === 'AbortError') return; }
    copy();
  };
  const copy = async () => { try { await navigator.clipboard.writeText(`${text}\n${link}`); toast('Link copied. Paste it to a friend'); } catch { toast(link); } };
  return html`
    <${SheetBar} title="Add me on Novum" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body share-me">
      <div class="qr-card">
        <${QrCode} text=${link} />
        <b>@${user.username}</b>
        <span>${user.firstName} ${user.lastName || ''}</span>
      </div>
      <p class="muted center">Ask a friend to scan this with their phone camera. It opens Novum and asks them to add you as a buddy.</p>
      <button class="btn btn-primary block" onClick=${share}>Share my link</button>
      <button class="btn btn-plain block" onClick=${copy}>Copy link</button>
    </div>`;
}

// novumdaily.com/#add=username: remember who, so it still works after signing up or logging in
const PENDING = 'novum.pendingAdd';
export function captureAddLink() {
  const m = location.hash.match(/^#add=([A-Za-z0-9_.]{3,20})$/);
  if (!m) return;
  try { localStorage.setItem(PENDING, JSON.stringify({ u: m[1], at: Date.now() })); } catch { /* private mode */ }
  history.replaceState(null, '', location.pathname + location.search);
}
export function pendingAdd() {
  try { const p = JSON.parse(localStorage.getItem(PENDING) || 'null'); return p && Date.now() - p.at < 7 * DAY ? p.u : null; } catch { return null; }
}
export function clearPendingAdd() { try { localStorage.removeItem(PENDING); } catch { /* ignore */ } }
