// Admin page (only for accounts listed in the server’s ADMIN_EMAILS): a health check (active people, startup
// problems, notification delivery), who’s signed up,
// how email delivery is going, and a password reset for anyone locked out.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, Group, Row, toast, Skeleton } from './ui.js';
import * as A from './api.js';
import { CodeInput, JunkHint } from './authkit.js';

const ago = (t) => {
  if (!t) return 'never';
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? '' : 's'} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? '' : 's'} ago`;
};
const when = (t) => new Date(t).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const EVENT = { delivered: '✅ Delivered', requests: '📤 Sent', opened: '👀 Opened', clicks: '👆 Clicked', softBounces: '⚠️ Soft bounce', hardBounces: '❌ Bounced', blocked: '⛔ Blocked', spam: '🚫 Marked spam', error: '❌ Error', deferred: '⏳ Delayed', invalid: '❌ Invalid address' };

export function openAdmin() { openSheet((close) => html`<${Admin} close=${close} />`, { tall: true }); }

function Admin({ close }) {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [locked, setLocked] = useState(false);
  const load = async () => { setErr(''); try { setD(await A.adminOverview()); setLocked(false); } catch (e) { if (e.data?.adminCode) setLocked(true); else setErr(e.message); } };
  useEffect(() => { load(); }, []);
  return html`
    <${SheetBar} title="Admin" left=${html`<button class="link" onClick=${load}>Refresh</button>`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${locked && html`<${Unlock} onDone=${load} />`}
      ${err && html`<p class="auth-err center">${err}</p>`}
      ${!d && !err && !locked && html`<${Skeleton} rows=${4} avatar />`}
      ${d && html`
        ${d.health && html`<${Health} h=${d.health} />`}
        <div class="tiles admin-tiles">
          <div class="tile"><span class="tile-k">👥 Accounts</span><b>${d.users.length}/${d.maxUsers}</b><span class="tile-u">spaces used</span></div>
          <div class="tile"><span class="tile-k">✉️ Email codes</span><b>${d.emailCodes ? 'On' : 'Off'}</b><span class="tile-u">Brevo</span></div>
          <div class="tile"><span class="tile-k">🤖 Bot check</span><b>${d.turnstile ? 'On' : 'Off'}</b><span class="tile-u">Turnstile</span></div>
          <div class="tile ${d.errorsToday ? 'warn' : ''}"><span class="tile-k">⚠️ Errors</span><b>${d.errorsToday ?? 0}</b><span class="tile-u">in the last 24 hours</span></div>
          <div class="tile"><span class="tile-k">🚩 Reports</span><b>${d.reports?.length ?? 0}</b><span class="tile-u">to look at</span></div>
        </div>

        <${Group} header="People" footer="Tap someone to reset their password if they’re locked out.">
          ${d.users.map((u) => html`<${Row} key=${u.id} icon=${(u.name || '?')[0]} iconBg="#3B9BFF" title=${`${u.name} · @${u.username}`}
            sub=${`Seen ${ago(u.lastSeen)} · ${u.devices} notif. device${u.devices === 1 ? '' : 's'} · ${u.buddies} buddies`} chevron onClick=${() => openUser(u)} />`)}
        <//>

        ${d.reports?.length > 0 && html`<${Group} header="Reports" footer="Reported people are blocked for the reporter if they chose to. Reset a password or ask them to delete their account if needed.">
          ${d.reports.map((r, i) => html`<div class="row" key=${i}>
            <span class="row-ic" style="background:#FF9F0A">🚩</span>
            <span class="row-main"><span class="row-title">@${r.reported} · ${r.reason}</span><span class="row-sub">From @${r.reporter} · ${when(r.at)}${r.note ? ` · “${r.note}”` : ''}</span></span>
          </div>`)}
        <//>`}

        ${d.versions?.length > 0 && html`<${Group} header="App errors by version (7 days)" footer="Newest release first. If a new version suddenly has lots of errors from several people, something in that update broke.">
          ${d.versions.map((v, i) => {
            const bad = i === 0 && (v.people >= 3 || v.startup >= 2);
            return html`<div class="row" key=${v.version}>
              <span class="row-ic" style=${`background:${bad ? '#FF453A' : v.n ? '#FF9F0A' : '#30D158'}`}>${bad ? '🔥' : '🏷️'}</span>
              <span class="row-main"><span class="row-title">${v.version.replace('novum-', '')} · ${v.n} error${v.n === 1 ? '' : 's'} from ${v.people || 'no'} ${v.people === 1 ? 'person' : 'people'}${v.startup ? ` · ${v.startup} startup` : ''}</span>
                <span class="row-sub">${v.top ? `Most common: ${v.top}` : ''}${v.top ? ' · ' : ''}last ${ago(v.last)}</span></span>
            </div>`;
          })}
        <//>`}

        <${Backups} list=${d.backups || []} />

        ${d.errors?.length > 0 && html`<${Group} header="Errors (last 14 days)" footer="“App” errors happened on someone’s phone; “server” errors on Novum’s server. Send me the message if one keeps happening.">
          ${d.errors.map((e, i) => html`<div class="row" key=${i}>
            <span class="row-ic" style="background:${e.side === 'server' ? '#FF453A' : '#FF9F0A'}">⚠️</span>
            <span class="row-main"><span class="row-title">${e.message}</span><span class="row-sub">${e.side === 'server' ? 'Server' : 'App'} · ${e.place || '?'} · ${when(e.at)}</span></span>
          </div>`)}
        <//>`}

        <${Group} header="Recent emails (7 days)" footer="Codes are hidden. If someone says a code never came, look for their address here.">
          ${d.mail.length ? d.mail.map((m, i) => html`<div class="row" key=${i}>
            <span class="row-main"><span class="row-title">${EVENT[m.event] || m.event} · ${m.to}</span><span class="row-sub">${when(m.at)} · ${m.subject}</span></span>
          </div>`) : html`<div class="row"><span class="row-main"><span class="row-sub">No emails in the last week.</span></span></div>`}
        <//>`}
    </div>`;
}

/* ---------- health check: is Novum working for people? ---------- */
const pct = (r) => (r == null ? '–' : `${Math.round(r * 100)}%`);
const dayName = (ymd) => new Date(`${ymd}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short' });
function Health({ h }) {
  const ok = !h.issues.length;
  const max = Math.max(1, ...h.push.days.map((x) => x.ok + x.failed + x.gone));
  return html`<section class="group first">
    <div class="ah-status ${ok ? 'ok' : 'warn'}">
      <span class="ah-ic">${ok ? '✅' : '⚠️'}</span>
      <span class="row-main"><b>${ok ? 'All good' : 'Needs a look'}</b>
        <span>${ok ? 'No startup problems today and notifications are getting through.' : h.issues.join(' · ')}</span></span>
    </div>
    <div class="tiles admin-tiles">
      <div class="tile"><span class="tile-k">🟢 Active</span><b>${h.active.day}</b><span class="tile-u">today · ${h.active.week} this week · ${h.active.month} this month</span></div>
      <div class="tile ${h.push.rate != null && h.push.rate < 0.9 ? 'warn' : ''}"><span class="tile-k">🔔 Delivered</span><b>${pct(h.push.rate)}</b><span class="tile-u">${h.push.tracked ? `${h.push.ok} of ${h.push.ok + h.push.failed} notifications, 7 days` : 'starts after the server update'}</span></div>
      <div class="tile ${h.startup.day ? 'warn' : ''}"><span class="tile-k">🚀 Startup problems</span><b>${h.startup.day}</b><span class="tile-u">today · ${h.startup.total} in 14 days</span></div>
      <div class="tile"><span class="tile-k">📱 Phones</span><b>${h.devices.total}</b><span class="tile-u">with notifications, ${h.devices.people} people</span></div>
    </div>
    ${h.push.tracked && html`<div class="card pad ah-push">
      <div class="ah-h">Notifications, last 7 days</div>
      <div class="ah-bars">${h.push.days.map((x) => {
        const n = x.ok + x.failed + x.gone;
        return html`<div class="ah-bar" key=${x.day} title=${`${x.ok} delivered, ${x.failed} failed, ${x.gone} expired`}>
          <span class="ah-n">${n || ''}</span>
          <span class="ah-col" style=${`height:${(n / max) * 100}%`}>
            ${x.gone > 0 && html`<i class="g" style=${`flex:${x.gone}`}></i>`}${x.failed > 0 && html`<i class="f" style=${`flex:${x.failed}`}></i>`}${x.ok > 0 && html`<i class="o" style=${`flex:${x.ok}`}></i>`}
          </span>
          <span class="ah-d">${dayName(x.day)}</span>
        </div>`;
      })}</div>
      <div class="ah-key"><span><i class="o"></i>Delivered</span><span><i class="f"></i>Failed</span><span><i class="g"></i>Expired phone</span></div>
    </div>`}
    ${h.startup.list.length > 0 && html`<${Group} header="Startup problems (14 days)" footer="Sent when the app couldn’t start on someone’s phone. Lots from the same device after a release usually means a bad offline copy: ask them to close and reopen Novum twice.">
      ${h.startup.list.map((e, i) => html`<div class="row" key=${i}>
        <span class="row-ic" style="background:#FF9F0A">🚀</span>
        <span class="row-main"><span class="row-title">${e.message}</span><span class="row-sub">${e.device} · ${when(e.at)}</span></span>
      </div>`)}
    <//>`}
  </section>`;
}

/* ---------- backups: made every Monday at 3am, kept for 5 weeks ---------- */
const size = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
function Backups({ list: initial }) {
  const [list, setList] = useState(initial);
  const [busy, setBusy] = useState('');
  const now = async () => {
    setBusy('new');
    try { const r = await A.adminBackupNow(); setList([r.backup, ...list]); haptic(15); toast('Backup made'); } catch (e) { toast(e.message); }
    setBusy('');
  };
  const download = async (b) => {
    setBusy(b.id);
    try {
      const r = await A.adminBackup(b.id);
      const bytes = Uint8Array.from(atob(r.data), (c) => c.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/gzip' }));
      const a = document.createElement('a');
      a.href = url; a.download = `novum-backup-${b.id}.json.gz`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      toast('Backup saved');
    } catch (e) { toast(e.message); }
    setBusy('');
  };
  const last = list[0];
  const stale = !last || Date.now() - last.at > 8 * 864e5;
  return html`<${Group} header="Backups" footer="Every table in the database, made each Monday at 3am and kept for 5 weeks. App data inside is still encrypted. To restore one, save it and follow “Restoring a backup” in the server’s README.">
    ${list.length ? list.map((b) => html`<div class="row" key=${b.id}>
      <span class="row-ic" style="background:#30D158">💾</span>
      <span class="row-main"><span class="row-title">${when(b.at)}</span><span class="row-sub">${size(b.bytes)} · ${b.rows} rows · ${ago(b.at)}</span></span>
      <button class="link sm" disabled=${!!busy} onClick=${() => download(b)}>${busy === b.id ? 'Saving…' : 'Save'}</button>
    </div>`) : html`<div class="row"><span class="row-main"><span class="row-sub">No backups yet. The first one is made next Monday, or tap below.</span></span></div>`}
    <div class="row">
      <span class="row-ic" style=${`background:${stale ? '#FF9F0A' : '#8E8E93'}`}>${stale ? '⚠️' : '➕'}</span>
      <span class="row-main"><span class="row-title">${stale && list.length ? 'Last backup is over a week old' : 'Back up now'}</span></span>
      <button class="link sm b" disabled=${!!busy} onClick=${now}>${busy === 'new' ? 'Backing up…' : 'Back up'}</button>
    </div>
  <//>`;
}

// Admin needs a code from your email first, so a stolen password alone can't open it
function Unlock({ onDone }) {
  const [hint, setHint] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const send = async () => { setBusy(true); setErr(''); try { const r = await A.adminUnlockCode(); setHint(r.emailHint); haptic(10); } catch (e) { setErr(e.message); } setBusy(false); };
  const verify = async (c = code) => {
    if (c.length !== 6 || busy) return;
    setBusy(true); setErr('');
    try { await A.adminUnlock(c); haptic(20); toast('Admin unlocked for 30 minutes'); onDone(); } catch (e) { setErr(e.message); setCode(''); }
    setBusy(false);
  };
  return html`<div class="admin-lock">
    <div class="wiz-emoji">🔐</div>
    <h2 class="auth-title center">${hint ? 'Check your email' : 'Admin is locked'}</h2>
    <p class="wiz-sub center">${hint ? html`We sent a 6-digit code to <b class="wiz-em">${hint}</b>.` : 'To keep everyone’s details safe, Admin needs a code from your email. It then stays open on this device for 30 minutes.'}</p>
    ${hint ? html`<${JunkHint} email=${hint} /><${CodeInput} value=${code} onChange=${(v) => { setErr(''); setCode(v); }} onComplete=${verify} />
      <button class="link center-link" disabled=${busy} onClick=${send}>Send a new code</button>`
    : html`<button class="btn btn-primary block" disabled=${busy} onClick=${send}>${busy ? 'Sending…' : 'Email me a code'}</button>`}
    ${err && html`<p class="auth-err center">${err}</p>`}
  </div>`;
}

function openUser(u) { openSheet((close) => html`<${UserSheet} u=${u} close=${close} />`); }
function UserSheet({ u, close }) {
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const reset = async () => {
    setBusy(true);
    try { const r = await A.adminResetPassword(u.id); setPw(r.password); haptic(15); } catch (e) { toast(e.data?.adminCode ? 'Admin locked again. Close Admin and unlock it.' : e.message); }
    setBusy(false);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(pw); toast('Copied'); } catch { toast(pw); } };
  return html`
    <${SheetBar} title=${u.name} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <${Group}>
        <${Row} title="Username" detail=${`@${u.username}`} />
        <${Row} title="Email" detail=${u.email} />
        <${Row} title="Joined" detail=${new Date(u.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} />
        <${Row} title="Last seen" detail=${ago(u.lastSeen)} />
        <${Row} title="Logged in on" detail=${`${u.sessions} device${u.sessions === 1 ? '' : 's'}`} />
      <//>
      ${pw ? html`<div class="card pad admin-pw">
          <p class="muted">Temporary password for @${u.username}. Send it to them privately. They’re logged out everywhere and should change it in Account after logging in.</p>
          <div class="admin-pw-v">${pw}</div>
          <button class="btn btn-tinted block" onClick=${copy}>Copy</button>
        </div>`
      : html`<button class="btn btn-danger block" disabled=${busy} onClick=${reset}>${busy ? 'Resetting…' : 'Reset password'}</button>
        <p class="muted center tiny mt8">Makes a temporary password and logs them out of every device.</p>`}
    </div>`;
}
