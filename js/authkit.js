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
