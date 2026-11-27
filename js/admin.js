// Admin page (only for accounts listed in the server's ADMIN_EMAILS): who's signed up,
// how email delivery is going, and a password reset for anyone locked out.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, openSheet, SheetBar, Group, Row, toast, Skeleton } from './ui.js';
import * as A from './api.js';

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
  const load = async () => { setErr(''); try { setD(await A.adminOverview()); } catch (e) { setErr(e.message); } };
  useEffect(() => { load(); }, []);
  return html`
    <${SheetBar} title="Admin" left=${html`<button class="link" onClick=${load}>Refresh</button>`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      ${err && html`<p class="auth-err center">${err}</p>`}
      ${!d && !err && html`<${Skeleton} rows=${4} avatar />`}
      ${d && html`
        <div class="tiles admin-tiles">
          <div class="tile"><span class="tile-k">👥 Accounts</span><b>${d.users.length}/${d.maxUsers}</b><span class="tile-u">spaces used</span></div>
          <div class="tile"><span class="tile-k">🟢 Active</span><b>${d.users.filter((u) => u.lastSeen && Date.now() - u.lastSeen < 7 * 864e5).length}</b><span class="tile-u">this week</span></div>
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

function openUser(u) { openSheet((close) => html`<${UserSheet} u=${u} close=${close} />`); }
function UserSheet({ u, close }) {
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const reset = async () => {
    setBusy(true);
    try { const r = await A.adminResetPassword(u.id); setPw(r.password); haptic(15); } catch (e) { toast(e.message); }
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
