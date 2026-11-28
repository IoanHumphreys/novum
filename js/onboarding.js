// Welcome, step-by-step sign up, log in, and the "Day Zero" setup.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import * as A from './api.js';
import { html, haptic, Icon, Segmented, Toggle, toast, useNow, capName } from './ui.js';
import { ADDICTIONS, addictionByKind, REASON_IDEAS, SLOGAN_WORDS } from './content.js';
import { enablePush, pushSupported, isStandalone } from './push.js';
import { InstallGuide, HomeScreenTip, guideFirst, skipGuide, markWelcomed, installEnv } from './install.js';
import { openPrivacy } from './privacy.js';
import { Avatar, openAvatarPicker } from './profile.js';
import { Banner, openBannerPicker, PALETTES } from './banner.js';
import { EyeButton, CodeInput, Resend, setNewSignup, JunkHint, suggestEmail } from './authkit.js';
export { EyeButton, CodeInput, Resend, consumeNewSignup } from './authkit.js';

export const MIN_AGE = 16;

const USERNAME_RE = /^[a-zA-Z0-9_.]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ============ the setup shell ============ */
// One question per screen. `dir` picks the slide direction; content rises in with a stagger.
function Wizard({ step, total, dir, onBack, badge, children }) {
  return html`<div class="wiz">
    <div class="wiz-top">
      ${onBack ? html`<button class="icon-btn" type="button" onClick=${onBack} aria-label="Back">${Icon.left()}</button>` : html`<span class="wiz-spacer"></span>`}
      <div class="wiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax=${total} aria-valuenow=${step + 1}><i style="width:${((step + 1) / total) * 100}%"></i></div>
      <span class="wiz-badge">${badge || `${step + 1}/${total}`}</span>
    </div>
    <div class="wiz-body ${dir}" key=${step}>${children}</div>
  </div>`;
}
function Q({ emoji, title, sub }) {
  return html`${emoji && html`<div class="wiz-emoji">${emoji}</div>`}<h1 class="wiz-q">${title}</h1>${sub && html`<p class="wiz-sub">${sub}</p>`}`;
}
// Focus the first input when a step appears (opens the keyboard where the browser allows)
function useAutoFocus(dep) {
  const ref = useRef();
  useEffect(() => { const t = setTimeout(() => ref.current?.focus({ preventScroll: true }), 380); return () => clearTimeout(t); }, [dep]);
  return ref;
}
function BigInput({ inputRef, ...props }) {
  return html`<input class="wiz-in" ref=${inputRef} ...${props} />`;
}
function Err({ children }) { return children ? html`<p class="wiz-err" role="alert">${children}</p>` : null; }

// Cloudflare Turnstile: an invisible "are you a person" check before the first email goes out.
// Only switches on when the server has a site key; otherwise it does nothing.
let tsScript = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!tsScript) {
    tsScript = new Promise((ok, no) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = () => ok(window.turnstile);
      s.onerror = () => { tsScript = null; no(new Error('turnstile')); };
      document.head.appendChild(s);
    });
  }
  return tsScript;
}
function useTurnstile() {
  const box = useRef();
  const st = useRef({ key: '', id: null, token: '', waiters: [] });
  useEffect(() => {
    let dead = false;
    A.authConfig().then(async (c) => {
      if (dead || !c.turnstileSiteKey) return;
      st.current.key = c.turnstileSiteKey;
      const ts = await loadTurnstile();
      if (dead || !box.current) return;
      st.current.id = ts.render(box.current, {
        sitekey: c.turnstileSiteKey, appearance: 'interaction-only', theme: 'dark',
        callback: (t) => { st.current.token = t; st.current.waiters.splice(0).forEach((f) => f(t)); },
        'expired-callback': () => { st.current.token = ''; },
        'error-callback': () => { st.current.token = ''; },
      });
    }).catch(() => { /* offline or blocked: the server will say if it needs the check */ });
    return () => { dead = true; try { if (st.current.id != null) window.turnstile?.remove(st.current.id); } catch { /* ignore */ } };
  }, []);
  const getToken = () => {
    const s = st.current;
    if (!s.key) return Promise.resolve('');
    if (s.token) return Promise.resolve(s.token);
    return new Promise((ok) => { s.waiters.push(ok); setTimeout(() => ok(''), 15000); });
  };
  const reset = () => { const s = st.current; s.token = ''; try { if (s.id != null) window.turnstile.reset(s.id); } catch { /* ignore */ } };
  // The token if the check has already finished (no waiting)
  const peek = () => st.current.token;
  return { box, getToken, reset, peek };
}

/* ============ welcome ============ */
export function AuthScreen() {
  // On a phone that hasn't added Novum yet, show how first: signing up inside the Home Screen app means only doing it once
  // novumdaily.com/#reset (the "This wasn't me" button in new-login emails) goes straight to Forgot password
  const [mode, setMode] = useState(location.hash === '#reset' ? 'reset' : guideFirst() ? 'install' : 'welcome');
  if (mode === 'reset') return html`<${LogIn} startReset back=${() => { history.replaceState(null, '', location.pathname); setMode('welcome'); }} toSignup=${() => setMode('signup')} />`;
  if (mode === 'install') return html`<div class="auth ig-screen"><${InstallGuide} skipLabel=${installEnv().kind === 'inapp' ? 'Continue here anyway' : 'Continue in the browser'} onSkip=${() => { skipGuide(); setMode('welcome'); }} /></div>`;
  if (mode === 'signup') return html`<${SignUp} back=${() => setMode('welcome')} toLogin=${() => setMode('login')} />`;
  if (mode === 'login') return html`<${LogIn} back=${() => setMode('welcome')} toSignup=${() => setMode('signup')} />`;
  return html`<div class="auth welcome">
    <div class="wl-sky" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i></div>
    <div class="wl-hero">
      <div class="wl-mark">
        <svg class="wl-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" /><circle class="fg" cx="60" cy="60" r="54" /></svg>
        <img src="icons/icon-192.png" alt="" width="84" height="84" class="wl-logo" />
      </div>
      <h1 class="wl-name">NOVUM</h1>
      <p class="wl-tag">${SLOGAN_WORDS.map((w) => html`<span><b>${w[0]}</b>${w.slice(1)}</span>`)}</p>
    </div>
    <${WelcomeDemo} />
    <div class="wl-actions">
      <button class="btn btn-primary block big glow" onClick=${() => { haptic(); setMode('signup'); }}>Get started. It’s free</button>
      <button class="btn btn-plain block big" onClick=${() => { haptic(); setMode('login'); }}>I already have an account</button>
      <p class="wl-fine">🔒 Private by default · Encrypted · <button type="button" class="link inline" onClick=${openPrivacy}>Privacy</button></p>
      <${HomeScreenTip} />
    </div>
  </div>`;
}

// A live preview of what Novum does: a ticking streak, money adding up, a milestone and a cheer
const DEMO_START = Date.now() - (16 * 864e5 + 4 * 36e5 + 22 * 6e4);
function WelcomeDemo() {
  const now = useNow(1000);
  const ms = now - DEMO_START;
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4), sec = Math.floor((ms % 6e4) / 1000);
  const p2 = (n) => String(n).padStart(2, '0');
  const saved = (45 * ms) / 864e5 / 30.4375;
  return html`<div class="wl-demo" aria-hidden="true">
    <div class="wd-card wd-streak">
      <div class="wd-k">💨 Vape-free</div>
      <div class="wd-time"><b>${d}</b><small>d</small> <b>${p2(h)}</b><small>h</small> <b>${p2(m)}</b><small>m</small> <b class="dim">${p2(sec)}</b><small>s</small></div>
    </div>
    <div class="wd-row">
      <div class="wd-card wd-money"><div class="wd-k">💷 Saved</div><b>£${saved.toFixed(2)}</b></div>
      <div class="wd-card wd-badge"><span>🏅</span><div><b>2 weeks</b><small>unlocked</small></div></div>
    </div>
    <div class="wd-card wd-cheer"><span class="wd-av">J</span><span><b>Jamie</b> sent you 💪 <small>keep going</small></span></div>
  </div>`;
}

/* ============ sign up, one step at a time ============ */
const SIGNUP_STEPS = ['name', 'dob', 'username', 'email', 'code', 'password'];

function SignUp({ back, toLogin }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState('fwd');
  const [f, setF] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', dob: '' });
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const [emailToken, setEmailToken] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [noCodes, setNoCodes] = useState(false); // server has email codes turned off
  const step = SIGNUP_STEPS[i];
  const focusRef = useAutoFocus(i);
  const set = (k) => (e) => { setErr(''); setF({ ...f, [k]: e.target.value }); };
  const at = (name) => SIGNUP_STEPS.indexOf(name);

  const go = (n) => { haptic(); setErr(''); setDir(n > i ? 'fwd' : 'back'); setI(n); };
  // Going back past the code step skips it (the email is already confirmed or codes are off)
  const prev = () => (i === 0 ? back() : go(step === 'password' ? at('email') : i - 1));

  const uname = f.username.trim().replace(/^@/, '');
  const email = f.email.trim().toLowerCase();
  const valid = {
    name: f.firstName.trim() && f.lastName.trim(),
    dob: /^\d{4}-\d{2}-\d{2}$/.test(f.dob) && S.ageOf({ dob: f.dob }) >= MIN_AGE,
    username: USERNAME_RE.test(uname),
    email: EMAIL_RE.test(email),
    code: code.length === 6,
    password: f.password.length >= 8 && consent,
  }[step];
  const signupAge = /^\d{4}-\d{2}-\d{2}$/.test(f.dob) ? S.ageOf({ dob: f.dob }) : null;

  const ts = useTurnstile();
  const sendCode = async () => {
    const token = await ts.getToken();
    let r;
    try { r = await A.sendEmailCode(email, f.firstName.trim(), token); } finally { ts.reset(); }
    if (r.skipped) { setNoCodes(true); return false; }
    setSentAt(Date.now()); setCode('');
    return true;
  };
  const verify = async (c = code) => {
    if (busy || c.length !== 6) return;
    setBusy(true); setErr('');
    try {
      const r = await A.verifyEmailCode(email, c);
      setEmailToken(r.emailToken); setVerifiedEmail(email);
      setBusy(false); haptic(20); go(at('password'));
    } catch (x) { setBusy(false); setErr(x.message); setCode(''); }
  };

  const strength = (() => {
    const p = f.password; let n = 0;
    if (p.length >= 8) n++; if (p.length >= 12) n++; if (/[A-Z]/.test(p) && /[a-z]/.test(p)) n++; if (/\d/.test(p) || /[^\w]/.test(p)) n++;
    return [null, { l: 'Weak', c: '#FF453A', w: 25 }, { l: 'Okay', c: '#FF9F0A', w: 50 }, { l: 'Good', c: '#30D158', w: 75 }, { l: 'Strong', c: '#30D158', w: 100 }][n];
  })();

  const submitAll = async () => {
    setBusy(true); setErr('');
    try {
      setNewSignup(true);
      await A.signup({ firstName: f.firstName.trim(), lastName: f.lastName.trim(), username: uname, email, password: f.password, emailToken, dob: f.dob, consent });
      haptic(20);
    } catch (x) {
      setNewSignup(false);
      setBusy(false);
      const m = x.message.toLowerCase();
      const back = x.data?.needsEmailCode ? at('email') : x.data?.tooYoung ? at('dob') : m.includes('username') ? at('username') : m.includes('email') ? at('email') : -1;
      if (x.data?.needsEmailCode) { setVerifiedEmail(''); setEmailToken(''); }
      if (back >= 0) { setDir('back'); setI(back); }
      setErr(x.message);
    }
  };

  const next = async (e) => {
    e?.preventDefault();
    if (!valid || busy) return;
    if (step === 'code') return verify();
    if (step === 'username') {
      setBusy(true);
      try {
        const r = await A.checkAvailable({ username: uname });
        if (r.username === false) { setBusy(false); setErr(`@${uname} is taken. Try another.`); return; }
      } catch (x) { if (!x.offline) { setBusy(false); setErr(x.message); return; } }
      setBusy(false);
    }
    if (step === 'email') {
      if (verifiedEmail === email || noCodes) { go(at('password')); return; }
      setBusy(true);
      try {
        const sent = await sendCode();
        setBusy(false);
        go(sent ? at('code') : at('password'));
      } catch (x) { setBusy(false); setErr(x.message); }
      return;
    }
    if (i === SIGNUP_STEPS.length - 1) return submitAll();
    go(i + 1);
  };
  const total = noCodes ? SIGNUP_STEPS.length - 1 : SIGNUP_STEPS.length;
  const shown = noCodes && i > at('code') ? i - 1 : i;

  return html`<form class="auth" onSubmit=${next} novalidate>
    <${Wizard} step=${shown} total=${total} dir=${dir} onBack=${prev}>
      ${step === 'name' && html`
        <${Q} emoji="👋" title="First, what’s your name?" sub="This is how Novum will greet you." />
        <div class="wiz-pair">
          <${BigInput} inputRef=${focusRef} placeholder="First name" autocomplete="given-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${f.firstName} onInput=${(e) => { setErr(''); setF({ ...f, firstName: capName(e.target.value) }); }} />
          <${BigInput} placeholder="Last name" autocomplete="family-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${f.lastName} onInput=${(e) => { setErr(''); setF({ ...f, lastName: capName(e.target.value) }); }} />
        </div>`}

      ${step === 'dob' && html`
        <${Q} emoji="🎂" title="When’s your birthday?" sub=${`Novum is for people aged ${MIN_AGE} and over. Under 18? Your profile stays private and only buddies can see it.`} />
        <${DobPicker} value=${f.dob} onChange=${(v) => { setErr(''); setF({ ...f, dob: v }); }} />
        ${signupAge != null && signupAge < MIN_AGE && html`<p class="wiz-err">Sorry, Novum is for people aged ${MIN_AGE} and over. If you want help quitting, talk to a parent, your GP or visit talktofrank.com.</p>`}`}

      ${step === 'username' && html`
        <${Q} emoji="✨" title=${`Nice to meet you, ${f.firstName.trim()}. Pick a username.`} sub="You can log in with it. Letters, numbers, dots and underscores." />
        <div class="wiz-at"><span>@</span><${BigInput} inputRef=${focusRef} placeholder="yourname" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" maxlength="20" value=${f.username} onInput=${set('username')} /></div>
        ${uname && !USERNAME_RE.test(uname) && html`<p class="wiz-hint">3–20 characters, no spaces.</p>`}`}

      ${step === 'email' && html`
        <${Q} emoji="✉️" title="What’s your email?" sub="Used to log in. Novum won’t send you marketing." />
        <${BigInput} inputRef=${focusRef} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${f.email} onInput=${set('email')} />
        ${suggestEmail(f.email) && html`<button type="button" class="email-fix" onClick=${() => { haptic(10); setErr(''); setF({ ...f, email: suggestEmail(f.email) }); }}>
          Did you mean <b>${suggestEmail(f.email)}</b>? <span>Use it</span></button>`}
        ${!noCodes && verifiedEmail !== email && html`<p class="wiz-hint">We’ll email you a 6-digit code to confirm it’s you.</p>`}`}

      ${step === 'code' && html`
        <${Q} emoji="📬" title="Check your email." sub=${html`We sent a 6-digit code to <b class="wiz-em">${email}</b>. It can take a minute, so check spam too.`} />
        <${JunkHint} email=${email} />
        <${CodeInput} inputRef=${focusRef} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${verify} />
        <${Resend} sentAt=${sentAt} onResend=${async () => { setErr(''); try { await sendCode(); toast('New code sent'); } catch (x) { setErr(x.message); } }} />
        <p class="wiz-hint center">Already have a Novum account with this email? We’ll have emailed you to log in instead.</p>
        <button type="button" class="link center-link" onClick=${() => go(at('email'))}>Wrong email? Change it</button>`}

      ${step === 'password' && html`
        <${Q} emoji="🔒" title="Finally, create a password." sub="At least 8 characters. A short phrase is easy to remember and hard to guess." />
        <div class="wiz-pw">
          <${BigInput} inputRef=${focusRef} type=${showPw ? 'text' : 'password'} placeholder="Password" autocomplete="new-password" enterkeyhint="done" value=${f.password} onInput=${set('password')} />
          <${EyeButton} on=${showPw} set=${setShowPw} />
        </div>
        ${f.password && html`<div class="pw-meter"><i style="width:${strength ? strength.w : 10}%;background:${strength ? strength.c : '#FF453A'}"></i></div>
          <p class="wiz-hint">${f.password.length < 8 ? `${8 - f.password.length} more character${8 - f.password.length === 1 ? '' : 's'}` : strength?.l}</p>`}
        <label class="consent">
          <input type="checkbox" checked=${consent} onChange=${(e) => { haptic(6); setConsent(e.target.checked); }} />
          <span class="consent-box">${Icon.check()}</span>
          <span>I’ve read the <button type="button" class="link inline" onClick=${(e) => { e.preventDefault(); openPrivacy(); }}>privacy notice</button> and agree to Novum storing what I’m quitting, my check-ins and health details to run the app.</span>
        </label>
        <p class="wiz-fine">Your data is encrypted on Novum’s server. Export or delete everything any time in Profile.</p>`}

      <${Err}>${err}<//>
      <div class="ts-box" ref=${ts.box}></div>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!valid || busy}>
          ${busy ? ({ password: 'Creating your account…', email: 'Sending code…', code: 'Confirming…' }[step] || 'Checking…')
            : step === 'password' ? 'Create account' : step === 'code' ? 'Confirm' : 'Continue'}
        </button>
        ${step === 'name' && html`<button type="button" class="link center-link" onClick=${toLogin}>Already have an account? Log in</button>`}
      </div>
    <//>
  </form>`;
}

/* ============ log in ============ */
function LogIn({ back, toSignup, startReset = false }) {
  const [resetting, setResetting] = useState(startReset);
  if (resetting) return html`<${ResetPassword} back=${() => setResetting(false)} />`;
  return html`<${LogInForm} back=${back} toSignup=${toSignup} forgot=${() => setResetting(true)} />`;
}

function ResetPassword({ back }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState('fwd');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pw, setPw] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const focusRef = useAutoFocus(i);
  const em = email.trim().toLowerCase();
  const go = (n) => { haptic(); setErr(''); setDir(n > i ? 'fwd' : 'back'); setI(n); };
  const send = async () => { await A.requestReset(em); setSentAt(Date.now()); setCode(''); };
  const submit = async (e) => {
    e?.preventDefault();
    if (busy) return;
    setBusy(true); setErr('');
    try {
      if (i === 0) { await send(); setBusy(false); go(1); return; }
      if (i === 1) { setBusy(false); go(2); return; }
      await A.resetPassword(em, code, pw);
      haptic(20); toast('Password changed. You’re logged in.');
    } catch (x) {
      setBusy(false); setErr(x.message);
      if (i === 2 && /code/i.test(x.message)) { setDir('back'); setI(1); setCode(''); }
    }
  };
  const valid = [EMAIL_RE.test(em), code.length === 6, pw.length >= 8][i];
  return html`<form class="auth" onSubmit=${submit} novalidate>
    <${Wizard} step=${i} total=${3} dir=${dir} onBack=${i === 0 ? back : () => go(i - 1)} badge="Reset">
      ${i === 0 && html`<${Q} emoji="🔐" title="Forgot your password?" sub="Enter your account’s email and we’ll send you a code to set a new one." />
        <${BigInput} inputRef=${focusRef} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" value=${email} onInput=${(e) => { setErr(''); setEmail(e.target.value); }} />`}
      ${i === 1 && html`<${Q} emoji="📬" title="Check your email." sub=${html`If there’s an account for <b class="wiz-em">${em}</b>, a 6-digit code is on its way. Check spam too.`} />
        <${JunkHint} email=${em} />
        <${CodeInput} inputRef=${focusRef} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${() => go(2)} />
        <${Resend} sentAt=${sentAt} onResend=${async () => { try { await send(); toast('New code sent'); } catch (x) { setErr(x.message); } }} />`}
      ${i === 2 && html`<${Q} emoji="🔒" title="Choose a new password." sub="At least 8 characters. You’ll be logged out on other devices." />
        <${BigInput} inputRef=${focusRef} type="password" placeholder="New password" autocomplete="new-password" value=${pw} onInput=${(e) => { setErr(''); setPw(e.target.value); }} />`}
      <${Err}>${err}<//>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!valid || busy}>${busy ? 'One moment…' : ['Send code', 'Continue', 'Set password and log in'][i]}</button>
      </div>
    <//>
  </form>`;
}

function LogInForm({ back, toSignup, forgot }) {
  const [loginId, setLogin] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const focusRef = useAutoFocus(0);
  // Bot check: runs invisibly while you type. The server only insists on it after a few tries, and then
  // we wait for it and try again by ourselves.
  const ts = useTurnstile();
  const submit = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !pw || busy) return;
    setErr(''); setBusy(true);
    try {
      let r;
      try { r = await A.login(loginId.trim(), pw, ts.peek()); } catch (x) {
        if (!x.data?.turnstile) throw x;
        ts.reset();
        const token = await ts.getToken();
        if (!token) throw new Error('Couldn’t confirm you’re a person. Wait a moment and try again.');
        r = await A.login(loginId.trim(), pw, token);
      } finally { ts.reset(); }
      if (r.codeRequired) { setPending({ ticket: r.ticket, emailHint: r.emailHint }); setSentAt(Date.now()); setCode(''); setBusy(false); haptic(10); return; }
      haptic(20);
    } catch (x) { setErr(x.message); setBusy(false); }
  };
  // Step 2: prove it's you with the code sent to your email
  const [pending, setPending] = useState(null);
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const [remember, setRemember] = useState(true);
  const codeRef = useAutoFocus(pending?.ticket);
  const verify = async (c = code) => {
    if (busy || c.length !== 6) return;
    setErr(''); setBusy(true);
    try { await A.loginCode(pending.ticket, c, remember); haptic(20); }
    catch (x) {
      setBusy(false); setCode(''); setErr(x.message);
      if (x.status === 401) { setPending(null); setPw(''); }
    }
  };
  if (pending) return html`<form class="auth" onSubmit=${(e) => { e.preventDefault(); verify(); }} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${() => { setPending(null); setErr(''); setBusy(false); }} aria-label="Back">${Icon.left()}</button></div>
      <div class="wiz-body fwd" key="code">
        <${Q} emoji="📬" title="Check your email." sub=${html`To keep your account safe, we sent a 6-digit code to <b class="wiz-em">${pending.emailHint}</b>. Check spam too.`} />
        <${JunkHint} email=${pending.emailHint} />
        <${CodeInput} inputRef=${codeRef} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${verify} />
        <div class="card list remember"><div class="row">
          <span class="row-main"><span class="row-title">Remember this device</span><span class="row-sub">Skip the code here for 30 days. Your password is still needed.</span></span>
          <${Toggle} on=${remember} label="Remember this device" onChange=${setRemember} />
        </div></div>
        <${Resend} sentAt=${sentAt} onResend=${async () => { try { await A.loginResend(pending.ticket); setSentAt(Date.now()); setCode(''); toast('New code sent'); } catch (x) { setErr(x.message); if (x.status === 401) setPending(null); } }} />
        <${Err}>${err}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${code.length !== 6 || busy}>${busy ? 'Checking…' : 'Log in'}</button>
        </div>
      </div>
    </div>
  </form>`;
  return html`<form class="auth" onSubmit=${submit} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${back} aria-label="Back">${Icon.left()}</button></div>
      <div class="wiz-body fwd">
        <${Q} emoji="🔑" title="Welcome back." sub="Log in with your username or email." />
        <${BigInput} inputRef=${focusRef} placeholder="Username or email" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${loginId} onInput=${(e) => { setErr(''); setLogin(e.target.value); }} />
        <div class="wiz-pw mt12">
          <${BigInput} type=${show ? 'text' : 'password'} placeholder="Password" autocomplete="current-password" enterkeyhint="go" value=${pw} onInput=${(e) => { setErr(''); setPw(e.target.value); }} />
          <${EyeButton} on=${show} set=${setShow} />
        </div>
        <div class="ts-box" ref=${ts.box}></div>
        <${Err}>${err}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${!loginId.trim() || !pw || busy}>${busy ? 'Logging in…' : 'Log in'}</button>
          <button type="button" class="link center-link" onClick=${forgot}>Forgot your password?</button>
          <button type="button" class="link center-link" onClick=${toSignup}>New here? Create an account</button>
        </div>
      </div>
    </div>
  </form>`;
}

/* ============ date of birth: day / month / year wheels ============ */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function DobPicker({ value, onChange }) {
  const [y, m, d] = value ? value.split('-') : ['', '', ''];
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 90 }, (_, k) => thisYear - 10 - k);
  const dim = y && m ? new Date(+y, +m, 0).getDate() : 31;
  const emit = (ny, nm, nd) => {
    if (ny && nm && nd) {
      const maxD = new Date(+ny, +nm, 0).getDate();
      onChange(`${ny}-${nm}-${String(Math.min(+nd, maxD)).padStart(2, '0')}`);
    } else onChange(`${ny || ''}-${nm || ''}-${nd || ''}`);
  };
  const sel = (label, val, opts, on, cls) => html`<label class="dob-f ${cls} ${val ? 'set' : ''}">
    <span class="dob-l">${label}</span>
    <select value=${val} onChange=${(e) => { haptic(4); on(e.target.value); }}>
      <option value="" disabled selected=${!val}>${label}</option>
      ${opts.map((o) => html`<option value=${o.v}>${o.t}</option>`)}
    </select>
    <span class="dob-v">${val ? opts.find((o) => o.v === val)?.t : '–'}</span>
  </label>`;
  return html`<div class="dob">
    ${sel('Day', d, Array.from({ length: dim }, (_, k) => ({ v: String(k + 1).padStart(2, '0'), t: String(k + 1) })), (v) => emit(y, m, v), 'dob-d')}
    ${sel('Month', m, MONTHS.map((t, k) => ({ v: String(k + 1).padStart(2, '0'), t })), (v) => emit(y, v, d), 'dob-m')}
    ${sel('Year', y, years.map((v) => ({ v: String(v), t: String(v) })), (v) => emit(v, m, d), 'dob-y')}
  </div>`;
}

/* ============ Day Zero, one step at a time ============ */
const DZ = ['dob', 'height', 'weight', 'habits', 'details', 'why', 'look', 'ready'];
const nowInput = () => S.toLocalInput(new Date());

export function DayZero({ user }) {
  const s = S.getState();
  const latest = S.latestWeight(s.profile);
  const dobKnown = !!user.dob;
  const [i, setI] = useState(dobKnown ? 1 : 0);
  const [dir, setDir] = useState('fwd');
  const step = DZ[i];
  const focusRef = useAutoFocus(i);

  const [dob, setDob] = useState(s.profile.dob || user.dob || '');
  const [hUnit, setHUnit] = useState('cm');
  const [wUnit, setWUnit] = useState('kg');
  const [h, setH] = useState(() => {
    const cm = s.profile.heightCm; const tin = cm ? cm / 2.54 : 0;
    return { cm: cm ? String(cm) : '', ft: cm ? String(Math.floor(tin / 12)) : '', inch: cm ? String(Math.round(tin % 12)) : '' };
  });
  const [w, setW] = useState(() => {
    const kg = latest ? +latest.toFixed(1) : 0; const tlb = kg * 2.20462;
    return { kg: kg ? String(kg) : '', st: kg ? String(Math.floor(tlb / 14)) : '', lb: kg ? String(Math.round(tlb % 14)) : '' };
  });
  const [picked, setPicked] = useState(() => s.quits.map((q) => q.kind));
  const [otherName, setOtherName] = useState(() => s.quits.find((q) => q.kind === 'other')?.label || '');
  const [details, setDetails] = useState(() => Object.fromEntries(s.quits.map((q) => [q.kind, { start: q.start, monthly: String(q.monthly ?? '') }])));
  const [reasons, setReasons] = useState(() => s.reasons.map((r) => r.text));
  const [reasonTxt, setReasonTxt] = useState('');
  const [pushMsg, setPushMsg] = useState('');
  // A random avatar and banner to start with, so no profile starts blank
  const rnd = () => Math.random().toString(36).slice(2, 8);
  const [look, setLook] = useState(() => ({
    avatar: s.social?.avatar || { style: ['adventurer', 'big-smile', 'lorelei', 'notionists'][Math.floor(Math.random() * 4)], seed: rnd(), bg: ['b6e3f4', 'c0aede', 'ffdfbf', 'c1f4c5'][Math.floor(Math.random() * 4)] },
    banner: s.social?.banner || { style: ['mesh', 'aurora'][Math.floor(Math.random() * 2)], palette: Object.keys(PALETTES)[Math.floor(Math.random() * Object.keys(PALETTES).length)], seed: rnd() },
  }));

  const heightCm = hUnit === 'cm' ? parseFloat(h.cm) : (parseFloat(h.ft) || 0) * 30.48 + (parseFloat(h.inch) || 0) * 2.54;
  const weightKg = wUnit === 'kg' ? parseFloat(w.kg) : ((parseFloat(w.st) || 0) * 14 + (parseFloat(w.lb) || 0)) / 2.20462;
  const dobOk = /^\d{4}-\d{2}-\d{2}$/.test(dob);
  const age = dobOk ? S.ageOf({ dob }) : null;
  const detailFor = (k) => details[k] || { start: nowInput(), monthly: '' };
  const valid = {
    dob: dobOk && age >= MIN_AGE,
    height: heightCm >= 100 && heightCm <= 250,
    weight: weightKg >= 30 && weightKg <= 300,
    habits: !picked.includes('other') || otherName.trim(),
    details: picked.every((k) => { const d = detailFor(k); return d.start && !Number.isNaN(S.parseLocal(d.start).getTime()); }),
    why: true, look: true, ready: true,
  }[step];

  const go = (n) => { haptic(); setDir(n > i ? 'fwd' : 'back'); setI(n); window.scrollTo(0, 0); };
  const next = (e) => { e?.preventDefault(); if (!valid) return; if (step === 'habits' && picked.length === 0) { go(DZ.indexOf('why')); return; } go(i + 1); };
  const prev = () => { if (step === 'why' && picked.length === 0) { go(DZ.indexOf('habits')); return; } go(i - 1); };
  const toggle = (k) => {
    haptic();
    if (picked.includes(k)) { setPicked(picked.filter((x) => x !== k)); return; }
    setPicked([...picked, k]);
    if (!details[k]) setDetails({ ...details, [k]: { start: nowInput(), monthly: '' } });
  };
  const setDetail = (k, patch) => setDetails({ ...details, [k]: { ...detailFor(k), ...patch } });
  const addReason = (t) => { t = t.trim(); if (!t || reasons.includes(t)) return; haptic(10); setReasons([...reasons, t]); setReasonTxt(''); };

  const finish = () => {
    haptic(25);
    S.update((d) => {
      d.profile.dob = dob;
      d.profile.heightCm = Math.round(heightCm);
      const kg = +weightKg.toFixed(1);
      if (!latest || Math.abs(latest - kg) >= 0.05) {
        const today = S.dayKey();
        d.profile.weights = (d.profile.weights || []).filter((x) => x.date !== today);
        d.profile.weights.push({ date: today, kg });
      }
      const old = Object.fromEntries(d.quits.map((q) => [q.kind, q]));
      d.quits = picked.map((k) => {
        const a = addictionByKind(k); const det = detailFor(k);
        return {
          best: 0, resets: [], ...(old[k] || {}), id: old[k]?.id || k, kind: k,
          label: k === 'other' ? otherName.trim() : (old[k]?.label || a.label),
          emoji: old[k]?.emoji || a.emoji, color: old[k]?.color || a.color,
          start: det.start, monthly: parseFloat(det.monthly) || 0,
        };
      });
      const have = new Set(d.reasons.map((r) => r.text));
      reasons.filter((t) => !have.has(t)).forEach((t) => d.reasons.push({ id: S.uid(), text: t }));
      d.reasons = d.reasons.filter((r) => reasons.includes(r.text));
      d.social = { ...d.social, avatar: look.avatar, banner: look.banner };
      d.setupDone = true;
    });
    // The ready step already offered notifications, so skip the "you added it" welcome in the Home Screen app
    if (isStandalone()) markWelcomed();
    if (!user.dob && dob) A.updateMe({ dob }).catch(() => { /* sent again on next open */ });
    toast(`Welcome to Novum, ${user.firstName} 💙`);
  };
  const turnOnPush = async () => { setPushMsg(''); try { await enablePush(); setPushMsg('on'); haptic(15); } catch (e) { setPushMsg(e.message); } };

  const bmiNow = valid && step === 'weight' ? S.bmi(weightKg, heightCm) : null;
  const cta = step === 'why' && reasons.length === 0 ? 'Skip for now' : step === 'habits' && picked.length === 0 ? 'Nothing right now' : 'Continue';

  return html`<form class="auth" onSubmit=${next} novalidate>
    <${Wizard} step=${i} total=${DZ.length} dir=${dir} onBack=${i > (dobKnown ? 1 : 0) ? prev : null} badge="Day Zero">
      ${step === 'dob' && html`
        <${Q} emoji="🎂" title=${`Hi ${user.firstName}. When’s your birthday?`} sub="Day Zero sets your baseline. Only you can see this." />
        <${DobPicker} value=${dob} onChange=${setDob} />
        ${dobOk && html`<p class="wiz-big-note">${age} years old</p>`}
        ${dobOk && age < MIN_AGE && html`<${Err}>Novum is for ages ${MIN_AGE} and up.<//>`}`}

      ${step === 'height' && html`
        <${Q} emoji="📏" title="How tall are you?" />
        <div class="wiz-unit"><${Segmented} options=${[{ value: 'cm', label: 'cm' }, { value: 'ft', label: 'ft & in' }]} value=${hUnit} onChange=${setHUnit} /></div>
        ${hUnit === 'cm'
          ? html`<div class="wiz-num"><${BigInput} inputRef=${focusRef} type="number" inputmode="decimal" placeholder="181" value=${h.cm} onInput=${(e) => setH({ ...h, cm: e.target.value })} /><span>cm</span></div>`
          : html`<div class="wiz-pair">
              <div class="wiz-num"><${BigInput} inputRef=${focusRef} type="number" inputmode="numeric" placeholder="5" value=${h.ft} onInput=${(e) => setH({ ...h, ft: e.target.value })} /><span>ft</span></div>
              <div class="wiz-num"><${BigInput} type="number" inputmode="numeric" placeholder="11" value=${h.inch} onInput=${(e) => setH({ ...h, inch: e.target.value })} /><span>in</span></div></div>`}`}

      ${step === 'weight' && html`
        <${Q} emoji="⚖️" title="And your weight?" sub="Used for BMI and to track changes over time." />
        <div class="wiz-unit"><${Segmented} options=${[{ value: 'kg', label: 'kg' }, { value: 'st', label: 'st & lb' }]} value=${wUnit} onChange=${setWUnit} /></div>
        ${wUnit === 'kg'
          ? html`<div class="wiz-num"><${BigInput} inputRef=${focusRef} type="number" inputmode="decimal" step="0.1" placeholder="70.2" value=${w.kg} onInput=${(e) => setW({ ...w, kg: e.target.value })} /><span>kg</span></div>`
          : html`<div class="wiz-pair">
              <div class="wiz-num"><${BigInput} inputRef=${focusRef} type="number" inputmode="numeric" placeholder="11" value=${w.st} onInput=${(e) => setW({ ...w, st: e.target.value })} /><span>st</span></div>
              <div class="wiz-num"><${BigInput} type="number" inputmode="decimal" placeholder="1" value=${w.lb} onInput=${(e) => setW({ ...w, lb: e.target.value })} /><span>lb</span></div></div>`}
        ${bmiNow && html`<p class="wiz-big-note">BMI ${bmiNow.toFixed(1)} · ${S.bmiBand(bmiNow).label}</p>`}`}

      ${step === 'habits' && html`
        <${Q} emoji="🚪" title="What are you leaving behind?" sub="Pick everything you’re quitting. Each gets its own counter, milestones and money tracker." />
        <div class="pick-grid">
          ${ADDICTIONS.map((a) => html`<button type="button" class="pick ${picked.includes(a.kind) ? 'on' : ''}" style="--c:${a.color}" onClick=${() => toggle(a.kind)} aria-pressed=${picked.includes(a.kind)}>
            <span class="pick-e">${a.emoji}</span><span class="pick-l">${a.label}</span><span class="pick-tick">${Icon.check()}</span>
          </button>`)}
        </div>
        ${picked.includes('other') && html`<${BigInput} class="wiz-in mt12" placeholder="What is it? e.g. Social media" maxlength="24" value=${otherName} onInput=${(e) => setOtherName(e.target.value)} />`}`}

      ${step === 'details' && html`
        <${Q} emoji="🗓️" title="When did you stop?" sub="The last time you used it. Quitting soon? Pick the date and Novum counts down to it." />
        ${picked.map((k) => {
          const a = addictionByKind(k); const d = detailFor(k);
          return html`<div class="card dz-q" key=${k}>
            <div class="dz-q-h"><span class="row-ic" style="background:${a.color}">${a.emoji}</span><b>${k === 'other' ? otherName : a.label}</b></div>
            <label class="dz-f"><span>Quit</span><input type="datetime-local" value=${d.start} onInput=${(e) => setDetail(k, { start: e.target.value })} /></label>
            <label class="dz-f"><span>Cost per month</span><span class="dz-money">£<input type="number" inputmode="decimal" placeholder="0" value=${d.monthly} onInput=${(e) => setDetail(k, { monthly: e.target.value })} /></span></label>
            ${parseFloat(d.monthly) > 0 && html`<p class="dz-save">${S.money(parseFloat(d.monthly) * 12, 0)} a year back in your pocket</p>`}
          </div>`;
        })}`}

      ${step === 'why' && html`
        <${Q} emoji="💙" title="Why are you doing this?" sub="In your own words. Novum shows these when cravings hit." />
        <div class="wiz-add">
          <${BigInput} inputRef=${focusRef} placeholder="I’m doing this because…" maxlength="140" enterkeyhint="done" value=${reasonTxt} onInput=${(e) => setReasonTxt(e.target.value)}
            onKeyDown=${(e) => { if (e.key === 'Enter') { e.preventDefault(); addReason(reasonTxt); } }} />
          <button type="button" class="btn btn-primary sm" disabled=${!reasonTxt.trim()} onClick=${() => addReason(reasonTxt)}>Add</button>
        </div>
        ${reasons.length > 0 && html`<div class="card list mt12">${reasons.map((t) => html`<div class="row pop" key=${t}>
          <span class="row-main"><span class="row-title">${t}</span></span>
          <button type="button" class="icon-btn muted" aria-label="Remove" onClick=${() => setReasons(reasons.filter((x) => x !== t))}>${Icon.trash()}</button></div>`)}</div>`}
        <div class="chip-row dz-ideas">${REASON_IDEAS.filter((t) => !reasons.includes(t)).slice(0, 5).map((t) => html`<button type="button" class="chip big" onClick=${() => addReason(t)}>+ ${t}</button>`)}</div>`}

      ${step === 'look' && html`
        <${Q} emoji="🎨" title="Make it yours." sub="Pick a cartoon avatar and a banner. Only your buddies see your profile unless you make it public later." />
        <div class="ep-top dz-look">
          <button type="button" class="ep-banner" aria-label="Change banner" onClick=${() => openBannerPicker(look.banner, (b) => setLook({ ...look, banner: b }))}><${Banner} b=${look.banner} /><span class="ph-banner-edit">🎨</span></button>
          <button type="button" class="ep-av" aria-label="Change avatar" onClick=${() => openAvatarPicker(look.avatar, (a) => setLook({ ...look, avatar: a }))}><${Avatar} a=${look.avatar} name=${user.firstName} size=${104} /></button>
          <div class="dz-look-name">${user.firstName} ${user.lastName}<span>@${user.username}</span></div>
        </div>
        <div class="dz-look-btns">
          <button type="button" class="btn btn-tinted" onClick=${() => openAvatarPicker(look.avatar, (a) => setLook({ ...look, avatar: a }))}>Change avatar</button>
          <button type="button" class="btn btn-tinted" onClick=${() => openBannerPicker(look.banner, (b) => setLook({ ...look, banner: b }))}>Change banner</button>
        </div>`}

      ${step === 'ready' && html`
        <div class="dz-ready">
          <div class="ready-ring"><span>✓</span></div>
          <h1 class="wiz-q center">You’re set, ${user.firstName}.</h1>
          <p class="wiz-sub center">${picked.length ? `Tracking ${picked.length} ${picked.length === 1 ? 'thing' : 'things'}. Every hour from here counts.` : 'Head to Goals to plan your 2027.'}</p>
        </div>
        <div class="card list">
          <div class="row"><span class="row-ic" style="background:#FF453A">🔔</span>
            <span class="row-main"><span class="row-title">Reminders and milestones</span>
              <span class="row-sub">${pushMsg === 'on' ? 'On. You’re all set.' : pushMsg || (pushSupported() ? 'A nudge when you hit milestones and at check-in time.' : 'Add Novum to your Home Screen first, then turn these on in Profile.')}</span></span>
            ${pushSupported() && pushMsg !== 'on' && html`<button type="button" class="btn btn-tinted sm" onClick=${turnOnPush}>Turn on</button>`}
          </div>
        </div>
        <${HomeScreenTip} />`}

      <div class="wiz-actions">
        ${step === 'ready'
          ? html`<button type="button" class="btn btn-primary block big glow" onClick=${finish}>Start my new standard</button>`
          : html`<button type="submit" class="btn btn-primary block big" disabled=${!valid}>${cta}</button>`}
      </div>
    <//>
  </form>`;
}
