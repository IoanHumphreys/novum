// Small pieces shared by the sign-up screens (onboarding.js) and the Profile tab: the 6-digit code boxes,
// "Send again", the show-password eye, and the new-sign-up flag. Kept apart so the Profile tab doesn't
// have to load all of onboarding.js, which only loads when someone is logged out or setting up.
import { html, haptic, useNow } from './ui.js';

// Set just before a sign-up so the app can bring over pre-account data on this device
let newSignup = false;
export const setNewSignup = (v) => { newSignup = v; };
export const consumeNewSignup = () => { const v = newSignup; newSignup = false; return v; };

// Show/Hide for password fields. Toggles on touch-down and keeps the field focused: on iPhone a normal tap
// first closes the keyboard, the page jumps, and the tap lands on nothing.
export function EyeButton({ on, set }) {
  return html`<button type="button" class="tf-eye" aria-pressed=${on} aria-label=${on ? 'Hide password' : 'Show password'}
    onPointerDown=${(e) => { e.preventDefault(); haptic(6); set(!on); }}
    onMouseDown=${(e) => e.preventDefault()}
    onClick=${(e) => { if (e.detail === 0) set(!on); }}>${on ? 'Hide' : 'Show'}</button>`;
}

// Six boxes over one hidden input; iOS can autofill the code straight from Mail
export function CodeInput({ value, onChange, onComplete, inputRef }) {
  return html`<label class="code">
    <input ref=${inputRef} class="code-in" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]*" maxlength="6" aria-label="6-digit code"
      value=${value} onInput=${(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 6); onChange(v); if (v.length === 6) { haptic(10); onComplete?.(v); } }} />
    <span class="code-boxes" aria-hidden="true">${Array.from({ length: 6 }, (_, k) => html`<i class=${`${k < value.length ? 'filled' : ''} ${k === Math.min(value.length, 5) ? 'cur' : ''}`}>${value[k] || ''}</i>`)}</span>
  </label>`;
}

// "Send again" with a 30-second cooldown
export function Resend({ sentAt, onResend }) {
  const now = useNow(1000);
  const left = Math.max(0, 30 - Math.floor((now - sentAt) / 1000));
  return html`<button type="button" class="link center-link" disabled=${left > 0} onClick=${onResend}>${left > 0 ? `Send a new code in ${left}s` : 'Didn’t get it? Send a new code'}</button>`;
}

// Hotmail, Outlook, Live and MSN put mail from new senders in Junk more often than other providers,
// so people using them get a nudge to look there. Works with masked addresses too ("jo••@hotmail.com").
const MICROSOFT = /@(hotmail|outlook|live|msn|windowslive|passport)\.[a-z.]+$/i;
export const isMicrosoftMail = (email) => MICROSOFT.test(String(email || '').trim());
export function JunkHint({ email }) {
  if (!isMicrosoftMail(email)) return null;
  return html`<div class="junk-hint" role="note">
    <span class="junk-ic" aria-hidden="true">📥</span>
    <span><b>Using Hotmail or Outlook?</b> Check your <b>Junk</b> folder. If the code is there, tap <b>Not junk</b> so the next one lands in your inbox.</span>
  </div>`;
}

// "Did you mean …@gmail.com?" for common email domain typos (gmial.com, hotmail.co, outlok.com…).
// Only suggests a fix when the domain is one letter or two away from a well-known provider.
const DOMAINS = ['gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'live.co.uk', 'msn.com',
  'yahoo.com', 'yahoo.co.uk', 'icloud.com', 'me.com', 'aol.com', 'btinternet.com', 'sky.com', 'virginmedia.com', 'protonmail.com', 'proton.me'];
function editDistance(a, b) {
  // Damerau–Levenshtein (adjacent swaps count as one edit, so "gmial" is one away from "gmail")
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}
export function suggestEmail(email) {
  const m = String(email || '').trim().toLowerCase().match(/^([^\s@]+)@([^\s@]+\.[^\s@]+)$/);
  if (!m || DOMAINS.includes(m[2])) return null;
  let best = null, bestD = 3;
  for (const dom of DOMAINS) {
    const dist = editDistance(m[2], dom);
    if (dist < bestD) { best = dom; bestD = dist; }
  }
  // Short domains (me.com, sky.com) only match a one-letter slip
  if (!best || (bestD === 2 && best.length < 9)) return null;
  return `${m[1]}@${best}`;
}
