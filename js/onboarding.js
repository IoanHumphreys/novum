// Welcome, sign up, log in, and "Day Zero" (first-time setup).
import { useState } from '../vendor/preact-htm.js';
import * as S from './store.js';
import * as A from './api.js';
import { html, haptic, Icon, Segmented, toast } from './ui.js';
import { ADDICTIONS, addictionByKind, REASON_IDEAS } from './content.js';
import { enablePush, pushSupported, isIOS, isStandalone } from './push.js';

// Set just before a sign-up so the app can bring over pre-account data on this device
let newSignup = false;
export const consumeNewSignup = () => { const v = newSignup; newSignup = false; return v; };

/* ============ shared bits ============ */
function TextField({ label, hint, error, ...props }) {
  return html`<label class="tf ${error ? 'bad' : ''}">
    <span class="tf-l">${label}</span>
    <input class="tf-i" ...${props} />
    ${hint && html`<span class="tf-h">${hint}</span>`}
  </label>`;
}
function PasswordField({ label = 'Password', ...props }) {
  const [show, setShow] = useState(false);
  return html`<label class="tf">
    <span class="tf-l">${label}</span>
    <span class="tf-row">
      <input class="tf-i" type=${show ? 'text' : 'password'} ...${props} />
      <button type="button" class="tf-eye" onClick=${(e) => { e.preventDefault(); setShow(!show); }}>${show ? 'Hide' : 'Show'}</button>
    </span>
  </label>`;
}
function HomeScreenTip() {
  if (!isIOS() || isStandalone()) return null;
  return html`<div class="hs-tip">
    <b>Get the full app</b>
    <span>In Safari, tap <span class="hs-ic">${Icon.share()}</span> Share, then <b>Add to Home Screen</b>. Open Novum from there for notifications and full-screen.</span>
  </div>`;
}

/* ============ welcome / sign up / log in ============ */
export function AuthScreen() {
  const [mode, setMode] = useState('welcome');
  if (mode === 'signup') return html`<${SignUp} back=${() => setMode('welcome')} toLogin=${() => setMode('login')} />`;
  if (mode === 'login') return html`<${LogIn} back=${() => setMode('welcome')} toSignup=${() => setMode('signup')} />`;
  return html`<div class="auth welcome">
    <div class="wl-hero">
      <img src="icons/icon-192.png" alt="" width="96" height="96" class="wl-logo" />
      <h1 class="wl-name">NOVUM</h1>
      <p class="wl-tag">A new beginning.<br />A new standard.<br />A new you.</p>
    </div>
    <div class="wl-actions">
      <button class="btn btn-primary block big" onClick=${() => { haptic(); setMode('signup'); }}>Create account</button>
      <button class="btn btn-plain block big" onClick=${() => { haptic(); setMode('login'); }}>I already have an account</button>
      <${HomeScreenTip} />
    </div>
  </div>`;
}

function AuthHeader({ title, sub, back }) {
  return html`<div class="auth-head">
    <button class="icon-btn" onClick=${back} aria-label="Back">${Icon.left()}</button>
    <div><h1 class="auth-title">${title}</h1>${sub && html`<p class="muted">${sub}</p>`}</div>
  </div>`;
}

function SignUp({ back, toLogin }) {
  const [f, setF] = useState({ firstName: '', lastName: '', username: '', email: '', phone: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ready = f.firstName.trim() && f.lastName.trim() && f.username.trim() && f.email.trim() && f.phone.trim() && f.password.length >= 8;
  const submit = async (e) => {
    e.preventDefault();
    if (!ready || busy) return;
    setErr(''); setBusy(true);
    try {
      newSignup = true;
      await A.signup({ ...f, username: f.username.replace(/^@/, '') });
      haptic(15);
    } catch (x) { newSignup = false; setErr(x.message); setBusy(false); }
  };
  return html`<form class="auth" onSubmit=${submit}>
    <${AuthHeader} title="Create your account" sub="Your Novum, on any device." back=${back} />
    <div class="card tf-card">
      <div class="tf-pair">
        <${TextField} label="First name" autocomplete="given-name" value=${f.firstName} onInput=${set('firstName')} maxlength="50" />
        <${TextField} label="Last name" autocomplete="family-name" value=${f.lastName} onInput=${set('lastName')} maxlength="50" />
      </div>
      <${TextField} label="Username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="@yourname"
        hint="3–20 letters, numbers, dots or underscores" value=${f.username} onInput=${set('username')} maxlength="21" />
      <${TextField} label="Email" type="email" autocomplete="email" autocapitalize="none" inputmode="email" value=${f.email} onInput=${set('email')} />
      <${TextField} label="Phone number" type="tel" autocomplete="tel" inputmode="tel" placeholder="07700 900123" value=${f.phone} onInput=${set('phone')} />
      <${PasswordField} autocomplete="new-password" placeholder="At least 8 characters" value=${f.password} onInput=${set('password')} />
    </div>
    ${err && html`<p class="auth-err">${err}</p>`}
    <button class="btn btn-primary block big" type="submit" disabled=${!ready || busy}>${busy ? 'Creating account…' : 'Create account'}</button>
    <p class="auth-fine">Your data is encrypted on Novum’s server and only shown to you after you log in. You can delete your account at any time in Profile.</p>
    <button type="button" class="link center-link" onClick=${toLogin}>Already have an account? Log in</button>
  </form>`;
}

function LogIn({ back, toSignup }) {
  const [loginId, setLogin] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !pw || busy) return;
    setErr(''); setBusy(true);
    try { await A.login(loginId.trim(), pw); haptic(15); } catch (x) { setErr(x.message); setBusy(false); }
  };
  return html`<form class="auth" onSubmit=${submit}>
    <${AuthHeader} title="Welcome back" back=${back} />
    <div class="card tf-card">
      <${TextField} label="Email or username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${loginId} onInput=${(e) => setLogin(e.target.value)} />
      <${PasswordField} autocomplete="current-password" value=${pw} onInput=${(e) => setPw(e.target.value)} />
    </div>
    ${err && html`<p class="auth-err">${err}</p>`}
    <button class="btn btn-primary block big" type="submit" disabled=${!loginId.trim() || !pw || busy}>${busy ? 'Logging in…' : 'Log in'}</button>
    <p class="auth-fine">Forgot your password? Ask the person who invited you to Novum to reset it.</p>
    <button type="button" class="link center-link" onClick=${toSignup}>New here? Create an account</button>
  </form>`;
}

/* ============ Day Zero ============ */
const STEPS = ['about', 'habits', 'details', 'why', 'ready'];
const nowInput = () => S.toLocalInput(new Date());

export function DayZero({ user }) {
  const s = S.getState();
  const latest = S.latestWeight(s.profile);
  const [step, setStep] = useState(0);
  const [about, setAbout] = useState(() => {
    const cm = s.profile.heightCm || '';
    const kg = latest ? +latest.toFixed(1) : '';
    const totalIn = cm ? cm / 2.54 : 0;
    const totalLb = kg ? kg * 2.20462 : 0;
    return {
      dob: s.profile.dob || '', hUnit: 'cm', cm: cm ? String(cm) : '', ft: cm ? String(Math.floor(totalIn / 12)) : '', inch: cm ? String(Math.round(totalIn % 12)) : '',
      wUnit: 'kg', kg: kg ? String(kg) : '', st: kg ? String(Math.floor(totalLb / 14)) : '', lb: kg ? String(Math.round(totalLb % 14)) : '',
    };
  });
  const [picked, setPicked] = useState(() => s.quits.map((q) => q.kind));
  const [otherName, setOtherName] = useState(() => s.quits.find((q) => q.kind === 'other')?.label || '');
  const [details, setDetails] = useState(() => Object.fromEntries(s.quits.map((q) => [q.kind, { start: q.start, monthly: String(q.monthly ?? '') }])));
  const [reasons, setReasons] = useState(() => s.reasons.map((r) => r.text));
  const [reasonTxt, setReasonTxt] = useState('');
  const [pushMsg, setPushMsg] = useState('');

  const heightCm = about.hUnit === 'cm' ? parseFloat(about.cm) : (parseFloat(about.ft) || 0) * 30.48 + (parseFloat(about.inch) || 0) * 2.54;
  const weightKg = about.wUnit === 'kg' ? parseFloat(about.kg) : ((parseFloat(about.st) || 0) * 14 + (parseFloat(about.lb) || 0)) / 2.20462;
  const dobOk = /^\d{4}-\d{2}-\d{2}$/.test(about.dob) && S.parseDay(about.dob) < new Date() && S.parseDay(about.dob) > new Date(1900, 0, 1);
  const ageNow = dobOk ? S.ageOf({ dob: about.dob }) : null;
  const aboutOk = dobOk && ageNow >= 13 && heightCm >= 100 && heightCm <= 250 && weightKg >= 30 && weightKg <= 300;
  const habitsOk = !picked.includes('other') || otherName.trim();
  const detailFor = (k) => details[k] || { start: nowInput(), monthly: '' };
  const detailsOk = picked.every((k) => { const d = detailFor(k); return d.start && !Number.isNaN(S.parseLocal(d.start).getTime()); });
  const canNext = [aboutOk, habitsOk, detailsOk, true, true][step];

  const go = (n) => { haptic(); setStep(n); window.scrollTo(0, 0); };
  const toggle = (k) => {
    haptic();
    if (picked.includes(k)) { setPicked(picked.filter((x) => x !== k)); return; }
    setPicked([...picked, k]);
    if (!details[k]) setDetails({ ...details, [k]: { start: nowInput(), monthly: '' } });
  };
  const setDetail = (k, patch) => setDetails({ ...details, [k]: { ...detailFor(k), ...patch } });
  const addReason = (t) => { t = t.trim(); if (!t || reasons.includes(t)) return; haptic(10); setReasons([...reasons, t]); setReasonTxt(''); };

  const finish = () => {
    haptic(20);
    S.update((d) => {
      d.profile.dob = about.dob;
      d.profile.heightCm = Math.round(heightCm);
      const kg = +weightKg.toFixed(1);
      if (!latest || Math.abs(latest - kg) >= 0.05) {
        const today = S.dayKey();
        d.profile.weights = (d.profile.weights || []).filter((w) => w.date !== today);
        d.profile.weights.push({ date: today, kg });
      }
      const old = Object.fromEntries(d.quits.map((q) => [q.kind, q]));
      d.quits = picked.map((k) => {
        const a = addictionByKind(k);
        const det = detailFor(k);
        return {
          best: 0, resets: [], ...(old[k] || {}),
          id: old[k]?.id || k, kind: k,
          label: k === 'other' ? otherName.trim() : (old[k]?.label || a.label),
          emoji: old[k]?.emoji || a.emoji, color: old[k]?.color || a.color,
          start: det.start, monthly: parseFloat(det.monthly) || 0,
        };
      });
      const have = new Set(d.reasons.map((r) => r.text));
      reasons.filter((t) => !have.has(t)).forEach((t) => d.reasons.push({ id: S.uid(), text: t }));
      d.reasons = d.reasons.filter((r) => reasons.includes(r.text));
      d.setupDone = true;
    });
    toast(`Welcome to Novum, ${user.firstName} 💙`);
  };

  const turnOnPush = async () => {
    setPushMsg('');
    try { await enablePush(); setPushMsg('on'); haptic(15); } catch (e) { setPushMsg(e.message); }
  };

  const name = STEPS[step];
  return html`<div class="auth dz">
    <div class="dz-top">
      ${step > 0 ? html`<button class="icon-btn" onClick=${() => go(step - 1)} aria-label="Back">${Icon.left()}</button>` : html`<span class="dz-badge">Day Zero</span>`}
      <div class="dz-dots" aria-label=${`Step ${step + 1} of ${STEPS.length}`}>${STEPS.map((_, i) => html`<i class=${i <= step ? 'on' : ''}></i>`)}</div>
    </div>

    ${name === 'about' && html`
      <h1 class="auth-title">Hi ${user.firstName}. Let’s set your baseline.</h1>
      <p class="muted dz-sub">Day Zero is where your new standard starts. These help Novum work out your BMI and track progress. Only you can see them.</p>
      <div class="card tf-card">
        <${TextField} label="Date of birth" type="date" max=${S.dayKey()} value=${about.dob} onInput=${(e) => setAbout({ ...about, dob: e.target.value })}
          hint=${ageNow != null && ageNow >= 0 ? `${ageNow} years old` : ''} />
      </div>
      <div class="dz-label"><span>Height</span><${Segmented} small options=${[{ value: 'cm', label: 'cm' }, { value: 'ft', label: 'ft & in' }]} value=${about.hUnit} onChange=${(v) => setAbout({ ...about, hUnit: v })} /></div>
      <div class="card tf-card">
        ${about.hUnit === 'cm'
          ? html`<${TextField} label="Height (cm)" type="number" inputmode="decimal" placeholder="181" value=${about.cm} onInput=${(e) => setAbout({ ...about, cm: e.target.value })} />`
          : html`<div class="tf-pair"><${TextField} label="Feet" type="number" inputmode="numeric" placeholder="5" value=${about.ft} onInput=${(e) => setAbout({ ...about, ft: e.target.value })} />
              <${TextField} label="Inches" type="number" inputmode="numeric" placeholder="11" value=${about.inch} onInput=${(e) => setAbout({ ...about, inch: e.target.value })} /></div>`}
      </div>
      <div class="dz-label"><span>Weight</span><${Segmented} small options=${[{ value: 'kg', label: 'kg' }, { value: 'st', label: 'st & lb' }]} value=${about.wUnit} onChange=${(v) => setAbout({ ...about, wUnit: v })} /></div>
      <div class="card tf-card">
        ${about.wUnit === 'kg'
          ? html`<${TextField} label="Weight (kg)" type="number" inputmode="decimal" step="0.1" placeholder="70.2" value=${about.kg} onInput=${(e) => setAbout({ ...about, kg: e.target.value })} />`
          : html`<div class="tf-pair"><${TextField} label="Stone" type="number" inputmode="numeric" placeholder="11" value=${about.st} onInput=${(e) => setAbout({ ...about, st: e.target.value })} />
              <${TextField} label="Pounds" type="number" inputmode="decimal" placeholder="1" value=${about.lb} onInput=${(e) => setAbout({ ...about, lb: e.target.value })} /></div>`}
      </div>
      ${aboutOk && html`<p class="dz-calc">BMI ${S.bmi(weightKg, heightCm).toFixed(1)} · ${S.bmiBand(S.bmi(weightKg, heightCm)).label}</p>`}
      ${dobOk && ageNow < 13 && html`<p class="auth-err">Novum is for ages 13 and up.</p>`}`}

    ${name === 'habits' && html`
      <h1 class="auth-title">What are you leaving behind?</h1>
      <p class="muted dz-sub">Pick everything you’re quitting or cutting out. Each one gets its own counter, milestones and money tracker.</p>
      <div class="pick-grid">
        ${ADDICTIONS.map((a) => html`<button class="pick ${picked.includes(a.kind) ? 'on' : ''}" style="--c:${a.color}" onClick=${() => toggle(a.kind)} aria-pressed=${picked.includes(a.kind)}>
          <span class="pick-e">${a.emoji}</span><span class="pick-l">${a.label}</span><span class="pick-tick">${Icon.check()}</span>
        </button>`)}
      </div>
      ${picked.includes('other') && html`<div class="card tf-card mt16"><${TextField} label="What is it?" placeholder="e.g. Social media" maxlength="24" value=${otherName} onInput=${(e) => setOtherName(e.target.value)} /></div>`}
      ${picked.length === 0 && html`<p class="muted dz-note">Not quitting anything right now? That’s fine. Continue, and use Novum for goals and habits. You can add things later in Profile.</p>`}`}

    ${name === 'details' && html`
      <h1 class="auth-title">${picked.length ? 'When did you stop?' : 'Nothing to set up here'}</h1>
      <p class="muted dz-sub">${picked.length ? 'Pick the time you last used it. Quitting soon? Pick your quit date and Novum will count down to it. Spending works out how much you save.' : 'Carry on to the next step.'}</p>
      ${picked.map((k) => {
        const a = addictionByKind(k); const d = detailFor(k);
        return html`<div class="card tf-card dz-q" key=${k} style="--c:${a.color}">
          <div class="dz-q-h"><span class="row-ic" style="background:${a.color}">${a.emoji}</span><b>${k === 'other' ? otherName : a.label}</b></div>
          <${TextField} label="Quit date and time" type="datetime-local" value=${d.start} onInput=${(e) => setDetail(k, { start: e.target.value })} />
          <${TextField} label="What it cost you per month (£)" type="number" inputmode="decimal" placeholder="e.g. 45" value=${d.monthly} onInput=${(e) => setDetail(k, { monthly: e.target.value })}
            hint=${parseFloat(d.monthly) > 0 ? `That’s ${S.money(parseFloat(d.monthly) * 12, 0)} a year back in your pocket.` : 'Not sure? Use a rough middle figure.'} />
        </div>`;
      })}`}

    ${name === 'why' && html`
      <h1 class="auth-title">Why are you doing this?</h1>
      <p class="muted dz-sub">Write your reasons in your own words. Novum shows them when cravings hit. You can skip this and add them later.</p>
      <div class="card entry-add">
        <input placeholder="I’m doing this because…" maxlength="140" value=${reasonTxt} onInput=${(e) => setReasonTxt(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && addReason(reasonTxt)} />
        <button class="btn btn-primary sm" disabled=${!reasonTxt.trim()} onClick=${() => addReason(reasonTxt)}>Add</button>
      </div>
      ${reasons.length > 0 && html`<div class="card list mt16">${reasons.map((t) => html`<div class="row" key=${t}>
        <span class="row-ic" style="background:#3B9BFF">💙</span><span class="row-main"><span class="row-title">${t}</span></span>
        <button class="icon-btn muted" aria-label="Remove" onClick=${() => setReasons(reasons.filter((x) => x !== t))}>${Icon.trash()}</button></div>`)}</div>`}
      <div class="chip-row dz-ideas">${REASON_IDEAS.filter((t) => !reasons.includes(t)).map((t) => html`<button class="chip big" onClick=${() => addReason(t)}>+ ${t}</button>`)}</div>`}

    ${name === 'ready' && html`
      <div class="dz-ready">
        <div class="ny-year xl">Day Zero</div>
        <h1 class="auth-title center">You’re set, ${user.firstName}.</h1>
        <p class="muted center">${picked.length ? `Tracking ${picked.length} ${picked.length === 1 ? 'thing' : 'things'}. Every hour from here counts.` : 'Head to Goals to plan your 2027.'}</p>
      </div>
      <div class="card list">
        <div class="row"><span class="row-ic" style="background:#FF453A">🔔</span>
          <span class="row-main"><span class="row-title">Reminders and milestones</span>
            <span class="row-sub">${pushMsg === 'on' ? 'On. You’re all set.' : pushMsg || (pushSupported() ? 'Get a nudge when you hit milestones and at check-in time.' : 'Add Novum to your Home Screen first, then turn these on in Profile.')}</span></span>
          ${pushSupported() && pushMsg !== 'on' && html`<button class="btn btn-tinted sm" onClick=${turnOnPush}>Turn on</button>`}
        </div>
      </div>
      <${HomeScreenTip} />`}

    <div class="dz-foot">
      ${step < STEPS.length - 1
        ? html`<button class="btn btn-primary block big" disabled=${!canNext} onClick=${() => go(step + 1)}>${name === 'why' && reasons.length === 0 ? 'Skip for now' : 'Continue'}</button>`
        : html`<button class="btn btn-primary block big" onClick=${finish}>Start my new standard</button>`}
    </div>
  </div>`;
}
