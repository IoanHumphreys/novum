// Profile tab: profile header, body, account, devices, notifications and your data.
import { useState, useEffect, useRef } from '../../vendor/preact-htm.js';
import * as S from '../store.js';
import { html, haptic, capName, useNow, Icon, openSheet, closeAllSheets, SheetBar, Page, Toggle, Group, Row, Field, toast, Skeleton } from '../ui.js';
import { healthFor, ADDICTIONS, SLOGAN } from '../content.js';
import { pushConfigured, pushSupported, isStandalone, isIOS, permission, blockedMessage, enablePush, disablePush, stopPushSync, deviceState } from '../push.js';
import * as A from '../api.js';
import { stopSync, flush, forgetMeta, syncStatus, onSyncStatus, syncNow } from '../sync.js';
import { CodeInput, Resend, EyeButton, JunkHint } from '../authkit.js';
import { openInstallGuide, canInstall, installEnv } from '../install.js';
import { openBuddies, refreshBuddies } from '../social.js';
import { refreshActivity } from '../activity.js';
import { openAdmin } from '../admin.js';
import { ProfileHeader, openPeople } from '../profile.js';
import { openPrivacy } from '../privacy.js';
import { replayTour } from '../tour.js';
import { firstName, confirmSheet } from '../shared.js';
import { Home, openWishlist } from './home.js';
import { openAddQuit, openQuitEditor, openTimeline } from '../quits.js';
import { openReasons } from '../sos.js';

/* ============ PROFILE ============ */
export function SyncRow() {
  const [st, setSt] = useState(syncStatus());
  useEffect(() => onSyncStatus(setSt), []);
  useNow(30000);
  const ago = (t) => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} hr ago`; };
  const label = { syncing: 'Saving…', synced: `Saved to your account ${ago(st.at)}`, offline: 'Offline. Changes save when you’re back online', error: st.error || 'Couldn’t save. Tap to retry', idle: 'Waiting to save' }[st.state];
  const icon = { syncing: '🔄', synced: '☁️', offline: '📴', error: '⚠️', idle: '☁️' }[st.state];
  return html`<${Row} icon=${icon} iconBg=${st.state === 'error' ? '#FF453A' : '#3B9BFF'} title="Account sync" sub=${label} onClick=${() => { haptic(); syncNow(); }} />`;
}

export function Profile({ s }) {
  const [headerKey, setHeaderKey] = useState(0);
  const refreshProfile = async () => {
    await Promise.all([Promise.resolve(syncNow()).catch(() => {}), A.refreshMe().catch(() => {}), refreshBuddies(), refreshActivity()]);
    setHeaderKey((k) => k + 1);
  };
  const p = s.profile;
  const user = A.getSession()?.user || {};
  const kg = S.latestWeight(p);
  const b = S.bmi(kg, p.heightCm);
  const band = S.bmiBand(b);
  const age = S.ageOf(p);
  const fileRef = useRef();
  const pos = b ? Math.max(0, Math.min(100, ((b - 15) / (35 - 15)) * 100)) : 0;
  const withHealth = s.quits.filter((q) => healthFor(q));
  const initials = `${(user.firstName || '?')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase();

  const onImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const text = await file.text();
    let meta = '';
    try { const o = JSON.parse(text); meta = o.exportedAt ? ` from ${S.fmtDate(new Date(o.exportedAt))}` : ''; } catch { toast('That file isn’t valid JSON'); return; }
    confirmSheet({
      title: 'Restore backup', text: `Replace everything in your account with the backup${meta}? Your current data will be overwritten on every device.`, confirm: 'Restore backup',
      onConfirm: () => { try { S.importJSON(text); toast('Backup restored'); } catch (err) { toast(err.message); } },
    });
  };

  return html`<${Page} title="Profile" onRefresh=${refreshProfile}>
    <${ProfileHeader} key=${headerKey} s=${s} onAccount=${openAccount} />

    <${Group} header="Body" footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
      <${Row} icon="🎂" iconBg="#BF5AF2" title="Age and height" detail=${`${age ?? '–'} · ${p.heightCm ? `${p.heightCm} cm` : '–'}`} chevron onClick=${openBodyEditor} />
      <${Row} icon="⚖️" iconBg="#FF375F" title="Weight" detail=${kg ? `${kg.toFixed(1)} kg` : 'Add'} chevron onClick=${openWeightSheet} />
      <div class="bmi">
        <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${b ? b.toFixed(1) : '–'}</div></div><span class="pill ${band.tone}">${band.label}</span></div>
        <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${b && html`<b style="left:${pos}%"></b>`}</div>
        <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
      </div>
    <//>

    <${Group} header="What you’re quitting" footer="Tap one to change its quit date, what it cost you, or to remove it.">
      ${s.quits.map((q) => html`<${Row} key=${q.id} icon=${q.emoji} iconBg=${q.color} title=${q.label}
        sub=${`${S.quitStart(q) > new Date() ? 'Quit day' : 'Since'} ${S.quitStart(q).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
        detail=${q.monthly ? `${S.money(q.monthly, 0)}/mo` : ''} chevron onClick=${() => openQuitEditor(q.id)} />`)}
      ${s.quits.length < ADDICTIONS.length && html`<${Row} icon=${Icon.plus()} iconBg="#3B9BFF" title="Add something to quit" chevron onClick=${openAddQuit} />`}
    <//>

    <${Group} header="Staying quit">
      <${Row} icon="💙" iconBg="#3B9BFF" title="My reasons" sub=${s.reasons.length ? `${s.reasons.length} reason${s.reasons.length === 1 ? '' : 's'} · shown during SOS` : 'Why you quit, for the hard moments'} chevron onClick=${openReasons} />
      ${withHealth.length > 0 && html`<${Row} icon="🫁" iconBg="#5AC8FA" title="Recovery timeline" sub="What’s improving, stage by stage" chevron onClick=${() => openTimeline(withHealth[0].id)} />`}
      <${Row} icon="👥" iconBg="#5E5CE6" title="People" sub="Find friends, followers and who you follow" chevron onClick=${() => openPeople('discover')} />
      <${Row} icon="🤝" iconBg="#FF9F0A" title="Buddies" sub=${s.shareStreaks ? 'Sharing your streaks' : 'Quit with friends and cheer each other on'} chevron onClick=${openBuddies} />
      ${s.quits.some((q) => q.monthly > 0) && html`<${Row} icon="🎁" iconBg="#FFD60A" title="What it could buy" sub=${s.wishlist.length ? `${s.wishlist.length} thing${s.wishlist.length === 1 ? '' : 's'} you’re saving for` : 'Turn money saved into something real'} chevron onClick=${openWishlist} />`}
    <//>

    ${user.isAdmin && html`<${Group} header="Admin">
      <${Row} icon="🛠️" iconBg="#8E8E93" title="Admin" sub="Health check, people, email delivery and password resets" chevron onClick=${openAdmin} />
    <//>`}

    <${NotifySettings} s=${s} />

    <${Group} header="Help">
      <${Row} icon="🧭" iconBg="#5AC8FA" title="Show the tour again" sub="A quick look at what each tab does" chevron onClick=${replayTour} />
    <//>

    <${Group} header="Your data" footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
      <${SyncRow} />
      <${Row} icon="🔒" iconBg="#8E8E93" title="Privacy notice" sub="What’s stored, who can see it, your rights" chevron onClick=${openPrivacy} />
      <${Row} icon=${Icon.share()} iconBg="#3B9BFF" title="Export a copy" sub="Everything: account, profile, check-ins, goals" chevron onClick=${doExport} />
      <${Row} icon=${Icon.download()} iconBg="#30D158" title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${() => fileRef.current.click()} />
      <${Row} icon="↺" iconBg="#FF9F0A" title="Start over" sub="Clears your data and reruns Day Zero" onClick=${() => confirmSheet({
        title: 'Start over', text: 'This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.', confirm: 'Clear and start over',
        onConfirm: () => { S.replaceState(S.defaultState()); toast('Fresh start'); },
      })} />
      <input type="file" accept="application/json,.json" ref=${fileRef} onChange=${onImport} hidden />
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>${SLOGAN}</span>
      <span class="tiny">Version 2.0</span>
    </div>
  <//>`;
}

export async function doExport() {
  const u = A.getSession()?.user || {};
  const text = S.exportJSON({ firstName: u.firstName, lastName: u.lastName, username: u.username, email: u.email, dob: u.dob, memberSince: u.createdAt ? new Date(u.createdAt).toISOString() : '' });
  const name = `novum-backup-${S.dayKey()}.json`;
  const file = new File([text], name, { type: 'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Novum backup' }); return; }
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  toast('Backup saved');
}

export function openBodyEditor() { openSheet((close) => html`<${BodyEditor} close=${close} />`); }

export function BodyEditor({ close }) {
  const p = S.getState().profile;
  const [dob, setDob] = useState(p.dob || '');
  const [cm, setCm] = useState(p.heightCm ? String(p.heightCm) : '');
  const dobOk = /^\d{4}-\d{2}-\d{2}$/.test(dob) && S.parseDay(dob) < new Date();
  const ok = dobOk && +cm >= 100 && +cm <= 250;
  const save = async () => {
    if (dob !== p.dob) {
      try { await A.updateMe({ dob }); } catch (e) { toast(e.message); return; }
    }
    S.update((d) => { d.profile.dob = dob; d.profile.heightCm = Math.round(+cm); }); haptic(12); close();
  };
  return html`
    <${SheetBar} title="Age and height" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} footer=${dobOk ? `${S.ageOf({ dob })} years old` : ''}>
        <${Field} label="Date of birth"><input type="date" max=${S.dayKey()} value=${dob} onInput=${(e) => setDob(e.target.value)} /><//>
        <${Field} label="Height (cm)"><input type="number" inputmode="decimal" value=${cm} onInput=${(e) => setCm(e.target.value)} /><//>
      <//>
    </div>`;
}

/* ---------- account ---------- */
export function openAccount() { openSheet((close) => html`<${Account} close=${close} />`, { tall: true }); }

export function Account({ close }) {
  const user = A.getSession()?.user || {};
  const [f, setF] = useState({ firstName: user.firstName || '', lastName: user.lastName || '', username: user.username || '' });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const changed = Object.keys(f).some((k) => f[k].trim() !== (user[k] || ''));
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = async () => {
    setBusy(true); setMsg(null);
    const patch = Object.fromEntries(Object.keys(f).filter((k) => f[k].trim() !== (user[k] || '')).map((k) => [k, f[k].trim()]));
    try { await A.updateMe(patch); haptic(15); toast('Account updated'); setMsg(null); } catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const doLogout = () => confirmSheet({
    title: 'Log out', danger: false, confirm: 'Log out',
    text: 'Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.',
    onConfirm: async () => { close(); await logOutEverywhereLocal(); },
  });
  return html`
    <${SheetBar} title="Account" left=${html`<button class="link" onClick=${close}>Close</button>`} right=${html`<button class="link b" disabled=${!changed || busy} onClick=${save}>${busy ? 'Saving…' : 'Save'}</button>`} />
    <div class="sheet-body">
      <${Group} header="Your details" footer=${msg?.err ? html`<span class="err">${msg.err}</span>` : `Member since ${user.createdAt ? S.fmtDate(new Date(user.createdAt)) : '–'}`}>
        <${Field} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${f.firstName} onInput=${(e) => setF({ ...f, firstName: capName(e.target.value) })} /><//>
        <${Field} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${f.lastName} onInput=${(e) => setF({ ...f, lastName: capName(e.target.value) })} /><//>
        <${Field} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${f.username} onInput=${set('username')} /><//>
        <${Row} title="Email" detail=${user.email} chevron onClick=${openChangeEmail} />
      <//>
      <${Group}>
        <${Row} icon="🔑" iconBg="#8E8E93" title="Change password" chevron onClick=${openPassword} />
        <${Row} icon="📱" iconBg="#30D158" title="Logged-in devices" chevron onClick=${openSessions} />
        <${Row} icon="↪" iconBg="#3B9BFF" title="Log out" chevron onClick=${doLogout} />
      <//>
      <${Group} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${Row} icon=${Icon.trash()} iconBg="#FF453A" title="Delete account" danger onClick=${openDeleteAccount} />
      <//>
    </div>`;
}

export async function logOutEverywhereLocal() {
  const uid = A.getSession()?.user?.id;
  try { await flush(); } catch { /* offline: unsynced changes stay on this device */ }
  try { await disablePush(); } catch { /* ignore */ }
  stopPushSync(); stopSync();
  await A.logout();
  S.closeUser({ wipe: true });
  if (uid) forgetMeta(uid);
}

export function openChangeEmail() { openSheet((close) => html`<${ChangeEmail} close=${close} />`); }

export function ChangeEmail({ close }) {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('email'); // email | code
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const em = email.trim().toLowerCase();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em) && em !== (A.getSession()?.user?.email || '').toLowerCase();
  const save = async (emailToken) => { await A.updateMe({ email: em, emailToken }); haptic(20); toast('Email updated'); close(); };
  const start = async () => {
    setBusy(true); setErr('');
    try {
      const r = await A.sendEmailCode(em, A.getSession()?.user?.firstName);
      if (r.skipped) await save(); else { setSentAt(Date.now()); setStage('code'); }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const confirm = async (c = code) => {
    if (busy || c.length !== 6) return;
    setBusy(true); setErr('');
    try { const r = await A.verifyEmailCode(em, c); await save(r.emailToken); } catch (e) { setErr(e.message); setCode(''); setBusy(false); }
  };
  return html`
    <${SheetBar} title="Change email" left=${html`<button class="link" onClick=${close}>Cancel</button>`} />
    <div class="sheet-body">
      ${stage === 'email' ? html`
        <${Group} footer=${err ? html`<span class="err">${err}</span>` : 'We’ll send a code to the new address to confirm it’s yours.'}>
          <${Field} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${email} onInput=${(e) => { setErr(''); setEmail(e.target.value); }} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!ok || busy} onClick=${start}>${busy ? 'Sending…' : 'Send code'}</button>`
      : html`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${em}</b>.</p>
        <${CodeInput} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${confirm} />
        ${err && html`<p class="wiz-err">${err}</p>`}
        <button class="btn btn-primary block" disabled=${code.length !== 6 || busy} onClick=${() => confirm()}>${busy ? 'Confirming…' : 'Confirm'}</button>
        <${Resend} sentAt=${sentAt} onResend=${start} />`}
    </div>`;
}

export function openPassword() { openSheet((close) => html`<${PasswordSheet} close=${close} />`); }

export function PasswordSheet({ close }) {
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const ok = cur && next.length >= 8;
  const save = async () => {
    setBusy(true); setErr('');
    try { await A.changePassword(cur, next); haptic(15); toast('Password changed'); close(); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  return html`
    <${SheetBar} title="Change password" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!ok || busy} onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <${Group} footer=${err ? html`<span class="err">${err}</span>` : 'At least 8 characters. You’ll stay logged in here; other devices are logged out.'}>
        <${Field} label="Current"><input type="password" autocomplete="current-password" value=${cur} onInput=${(e) => setCur(e.target.value)} /><//>
        <${Field} label="New"><input type="password" autocomplete="new-password" value=${next} onInput=${(e) => setNext(e.target.value)} /><//>
      <//>
    </div>`;
}

export function openDeleteAccount() { openSheet((close) => html`<${DeleteAccount} close=${close} />`); }

export function DeleteAccount({ close }) {
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [codeFor, setCodeFor] = useState(null); // { emailHint } once the code is sent
  const [code, setCode] = useState('');
  const [sentAt, setSentAt] = useState(0);
  const codeRef = useRef();
  useEffect(() => { if (codeFor) setTimeout(() => codeRef.current?.focus({ preventScroll: true }), 350); }, [codeFor]);

  // Gone: stop everything on this phone, clear its data and go back to the welcome screen
  const finish = async () => {
    const uid = A.getSession()?.user?.id;
    stopPushSync(); stopSync();
    closeAllSheets();
    A.setSession(null);
    S.closeUser({ wipe: true });
    if (uid) { forgetMeta(uid); A.setTrust(uid, null); }
    try { localStorage.removeItem(`novum.push:${uid}`); } catch { /* ignore */ }
    history.replaceState(null, '', location.pathname);
    window.scrollTo(0, 0);
    toast('Account deleted');
  };
  const del = async (c = code) => {
    if (busy) return;
    setBusy(true); setErr('');
    try {
      try { await disablePush(); } catch { /* ignore */ }
      await A.deleteAccount(pw, c);
      haptic(20);
      await finish();
    } catch (e) {
      setBusy(false); setCode('');
      setErr(e.message);
      if (e.data?.needsCode) setCodeFor(codeFor || { emailHint: 'your email' });
    }
  };
  // Step 1: check the password and email a code
  const sendCode = async () => {
    if (busy || !pw) return;
    setBusy(true); setErr('');
    try {
      const r = await A.deleteCode(pw);
      if (r.skipped) { setBusy(false); return del(''); }
      setCodeFor({ emailHint: r.emailHint }); setSentAt(Date.now()); setCode('');
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return html`
    <${SheetBar} title="Delete account" left=${html`<button class="link" onClick=${codeFor ? () => { setCodeFor(null); setErr(''); setCode(''); } : close}>${codeFor ? 'Back' : 'Cancel'}</button>`} />
    <div class="sheet-body">
      ${!codeFor ? html`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${Group} header="Step 1 of 2 · Your password" footer=${err ? html`<span class="err">${err}</span>` : 'Then we’ll email you a code to make sure it’s really you.'}>
          <${Field} label="Password"><div class="tf-row"><input type=${showPw ? 'text' : 'password'} autocomplete="current-password" value=${pw}
            onInput=${(e) => { setErr(''); setPw(e.target.value); }} onKeyDown=${(e) => e.key === 'Enter' && sendCode()} />
            <${EyeButton} on=${showPw} set=${setShowPw} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!pw || busy} onClick=${sendCode}>${busy ? 'Checking…' : 'Continue'}</button>`
      : html`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${codeFor.emailHint}</b>. Enter it to delete your account for good.</p>
          <${JunkHint} email=${codeFor.emailHint} />
          <${CodeInput} inputRef=${codeRef} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} />
          <${Resend} sentAt=${sentAt} onResend=${async () => { try { await A.deleteCode(pw); setSentAt(Date.now()); setCode(''); toast('New code sent'); } catch (e) { setErr(e.message); } }} />
          ${err && html`<p class="auth-err center">${err}</p>`}
          <button class="btn btn-danger block" disabled=${code.length !== 6 || busy} onClick=${() => del()}>${busy ? 'Deleting…' : 'Delete my account'}</button>
        </div>`}
    </div>`;
}

export function openWeightSheet() { openSheet((close) => html`<${WeightSheet} close=${close} />`, { tall: true }); }

export function WeightSheet({ close }) {
  const s = S.getState();
  const [kg, setKg] = useState('');
  const [date, setDate] = useState(S.dayKey());
  const list = [...s.profile.weights].sort((a, b) => b.date.localeCompare(a.date));
  const add = () => {
    const v = parseFloat(kg);
    if (!(v > 20 && v < 400)) return;
    haptic(12);
    S.update((d) => { d.profile.weights = d.profile.weights.filter((w) => w.date !== date); d.profile.weights.push({ date, kg: v }); });
    setKg('');
    toast('Weight logged');
  };
  return html`
    <${SheetBar} title="Weight" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <${Group}>
        <${Field} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${S.latestWeight(s.profile)?.toFixed(1) ?? '70.0'} value=${kg}
          onInput=${(e) => setKg(e.target.value)} onKeyDown=${(e) => e.key === 'Enter' && add()} /><//>
        <${Field} label="Date"><input type="date" value=${date} max=${S.dayKey()} onInput=${(e) => setDate(e.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(kg) > 20)} onClick=${add}>Log weight</button>
      <${Group} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${list.map((w) => html`<div class="row" key=${w.date}>
          <span class="row-main"><span class="row-title">${w.kg.toFixed(1)} kg</span><span class="row-sub">${S.fmtDate(w.date)}</span></span>
          <span class="row-detail">BMI ${S.bmi(w.kg, s.profile.heightCm).toFixed(1)}</span>
          ${list.length > 1 && html`<button class="icon-btn muted" aria-label="Delete entry" onClick=${() => S.update((d) => { d.profile.weights = d.profile.weights.filter((x) => x.date !== w.date); })}>${Icon.trash()}</button>`}
        </div>`)}
      <//>
    </div>`;
}

/* ============ LOGGED-IN DEVICES ============ */
export const agoText = (t) => {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 2) return 'active now';
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? '' : 's'} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? '' : 's'} ago`;
};

export function openSessions() { openSheet((close) => html`<${Sessions} close=${close} />`, { tall: true }); }

export function Sessions({ close }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const load = async () => { setErr(''); try { setD(await A.sessions()); } catch (e) { setErr(e.message); } };
  useEffect(() => { load(); }, []);
  const end = async (x) => { haptic(); try { await A.endSession(x.id); toast(`Logged out of ${x.device}`); load(); } catch (e) { toast(e.message); } };
  const endOthers = () => confirmSheet({
    title: 'Log out other devices', confirm: 'Log out others',
    text: 'Every other phone or computer is logged out and will need your password (and an email code) to get back in. This one stays logged in.',
    onConfirm: async () => { try { await A.endOtherSessions(); toast('Other devices logged out'); load(); } catch (e) { toast(e.message); } },
  });
  const others = d ? d.sessions.filter((x) => !x.current).length : 0;
  return html`
    <${SheetBar} title="Logged-in devices" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${err && html`<p class="auth-err center">${err}</p>`}
      ${!d && !err && html`<${Skeleton} rows=${2} avatar />`}
      ${d && html`<${Group} footer=${d.trusted ? `${d.trusted} device${d.trusted === 1 ? ' is' : 's are'} remembered, so ${d.trusted === 1 ? 'it skips' : 'they skip'} the login code for 30 days.` : 'If you don’t recognise a device, log it out and change your password.'}>
        ${d.sessions.map((x) => html`<div class="row" key=${x.id}>
          <span class="row-ic" style="background:${x.current ? '#30D158' : 'var(--fill-2)'}">${/iPhone|Android|iPad/.test(x.device) ? '📱' : '💻'}</span>
          <span class="row-main"><span class="row-title">${x.device}</span>
            <span class="row-sub">${x.current ? 'This device' : `Last active ${agoText(x.lastSeen)}`} · since ${S.fmtDate(new Date(x.createdAt), { day: 'numeric', month: 'short' })}</span></span>
          ${!x.current && html`<button class="link sm danger" onClick=${() => end(x)}>Log out</button>`}
        </div>`)}
      <//>
      ${others > 0 && html`<button class="btn btn-plain danger block" onClick=${endOthers}>Log out all other devices</button>`}`}
    </div>`;
}

/* ============ NOTIFICATIONS ============ */
export function NotifySettings({ s }) {
  const n = s.notifyPrefs;
  const [dev, setDev] = useState(deviceState());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const setN = (patch) => S.update((d) => { d.notifyPrefs = { ...d.notifyPrefs, ...patch }; });
  const configured = pushConfigured();
  // Re-check when coming back from Settings so a permission change shows straight away
  const [, recheck] = useState(0);
  useEffect(() => {
    const on = () => { if (document.visibilityState === 'visible') { setDev(deviceState()); recheck((x) => x + 1); } };
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  const toggleMain = async (on) => {
    if (busy) return;
    setErr(''); setBusy(true);
    try {
      if (on) { await enablePush(); toast('Notifications on 🔔'); } else { await disablePush(); toast('Notifications off'); }
    } catch (e) { setErr(e.message); }
    setDev(deviceState());
    setBusy(false);
  };
  let footer;
  if (!configured) footer = 'Notifications aren’t set up on the server yet.';
  else if (isIOS() && !isStandalone()) footer = 'On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.';
  else if (!pushSupported()) footer = 'This browser doesn’t support push notifications.';
  else if (permission() === 'denied' && !dev.enabled) footer = blockedMessage('denied');
  else footer = 'On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times and habit ticks to time these.';

  return html`<${Group} header="Notifications" footer=${err ? html`<span class="err">${err}</span>` : footer}>
    <div class="row">
      <span class="row-ic" style="background:#FF453A">🔔</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${busy && html`<span class="row-sub">Working…</span>`}</span>
      ${configured ? html`<${Toggle} on=${dev.enabled} label="Notifications" onChange=${toggleMain} />` : html`<span class="row-detail">Not set up</span>`}
    </div>
    ${canInstall() && html`<${Row} icon="📲" iconBg="#3B9BFF" title=${installEnv().kind === 'inapp' ? 'Open Novum in Safari' : 'Add to Home Screen'} sub="Needed for notifications. Shows you how" chevron onClick=${openInstallGuide} />`}
    ${dev.enabled && configured && html`
      <div class="row">
        <span class="row-ic" style="background:#FFD60A">🏅</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${Toggle} on=${n.milestones} label="Milestones" onChange=${(v) => setN({ milestones: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#30D158">✍️</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin && html`<input type="time" class="time-in" value=${n.checkinAt} onChange=${(e) => e.target.value && setN({ checkinAt: e.target.value })} />`}
        <${Toggle} on=${n.checkin} label="Check-in reminder" onChange=${(v) => setN({ checkin: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#BF5AF2">🎯</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits && html`<input type="time" class="time-in" value=${n.habitsAt} onChange=${(e) => e.target.value && setN({ habitsAt: e.target.value })} />`}
        <${Toggle} on=${n.habits} label="Habit nudges" onChange=${(v) => setN({ habits: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#5AC8FA">📊</span>
        <span class="row-main"><span class="row-title">Weekly recap</span><span class="row-sub">Sundays: check-ins, cravings and money saved</span></span>
        ${n.recap && html`<input type="time" class="time-in" value=${n.recapAt} onChange=${(e) => e.target.value && setN({ recapAt: e.target.value })} />`}
        <${Toggle} on=${n.recap} label="Weekly recap" onChange=${(v) => setN({ recap: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#FF9F0A">🤝</span>
        <span class="row-main"><span class="row-title">Buddies and followers</span><span class="row-sub">Requests, new followers and cheers</span></span>
        <${Toggle} on=${n.buddies} label="Buddy notifications" onChange=${(v) => setN({ buddies: v })} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#BF5AF2">🔮</span>
        <span class="row-main"><span class="row-title">Heads-up before tough times</span><span class="row-sub">Learns when cravings usually hit and nudges you 20 minutes before</span></span>
        <${Toggle} on=${n.nudges !== false} label="Heads-up before tough times" onChange=${(v) => setN({ nudges: v })} />
      </div>`}
  <//>`;
}
