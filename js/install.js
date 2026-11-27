// "Add to Home Screen" guide. Works out where Novum is open (Safari, Chrome, an in-app browser
// like Snapchat's, Android) and shows the right steps. On iPhone, notifications only work once
// Novum is on the Home Screen, so this matters.
import { useState, useEffect } from '../vendor/preact-htm.js';
import { html, haptic, Icon, openSheet, SheetBar, toast } from './ui.js';
import { isIOS, isStandalone, pushConfigured, pushSupported, permission, deviceState, enablePush } from './push.js';

const ua = navigator.userAgent;
const IN_APPS = [
  ['Snapchat', /Snapchat/i], ['Instagram', /Instagram/i], ['TikTok', /musical_ly|TikTok|Bytedance/i],
  ['Messenger', /MessengerForiOS|FB_IAB\/MESSENGER/i], ['Facebook', /FBAN|FBAV|FB_IAB/i], ['LinkedIn', /LinkedInApp/i],
  ['Discord', /Discord/i], ['Telegram', /Telegram/i], ['Line', /\bLine\//i], ['X', /Twitter/i],
];

// Where are we? { kind: 'installed' | 'ios' | 'inapp' | 'android' | 'desktop', ... }
export function installEnv() {
  if (isStandalone()) return { kind: 'installed' };
  const ios = isIOS();
  const android = /Android/i.test(ua);
  const app = IN_APPS.find(([, re]) => re.test(ua));
  if (app && (ios || android)) return { kind: 'inapp', app: app[0], ios };
  if (ios) {
    // iOS app web views leave "Safari/" out of the user agent; real browsers keep it
    if (!/Safari\//.test(ua)) return { kind: 'inapp', app: null, ios: true };
    const browser = /CriOS/.test(ua) ? 'Chrome' : /FxiOS/.test(ua) ? 'Firefox' : /EdgiOS/.test(ua) ? 'Edge' : /OPiOS|OPT\//.test(ua) ? 'Opera' : /Ddg/.test(ua) ? 'DuckDuckGo' : 'Safari';
    const v = +(ua.match(/Version\/(\d+)/)?.[1] || 0);
    return { kind: 'ios', browser, ios26: browser === 'Safari' && v >= 26 };
  }
  if (android) return { kind: 'android' };
  return { kind: 'desktop' };
}
// A phone that isn't running the Home Screen version yet
export const canInstall = () => ['ios', 'inapp', 'android'].includes(installEnv().kind);

/* ---------- Android: Chrome's own install prompt ---------- */
let deferred = null;
const promptSubs = new Set();
addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; promptSubs.forEach((f) => f()); });
addEventListener('appinstalled', () => { deferred = null; promptSubs.forEach((f) => f()); });
function useInstallPrompt() {
  const [, force] = useState(0);
  useEffect(() => { const f = () => force((x) => x + 1); promptSubs.add(f); return () => promptSubs.delete(f); }, []);
  return deferred;
}

/* ---------- remembering "later" (per device, not per account) ---------- */
const KEY = 'novum.install';
const DAY = 864e5;
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const write = (patch) => { try { localStorage.setItem(KEY, JSON.stringify({ ...read(), ...patch })); } catch { /* private mode */ } };
// Welcome screen: show the full guide first unless they chose "continue in the browser" in the last 3 days
export const guideFirst = () => canInstall() && Date.now() - (read().later || 0) > 3 * DAY;
export const skipGuide = () => write({ later: Date.now() });
// Home banner: hidden for a week after ×
export const showBanner = () => canInstall() && Date.now() - (read().banner || 0) > 7 * DAY;
export const hideBanner = () => write({ banner: Date.now() });

/* ---------- the steps ---------- */
const svg = (d) => html`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const G = {
  // Safari's page menu on iOS 26: a puzzle piece with two lines under it
  page: () => svg(html`<path d="M7 4h3.2a1.8 1.8 0 1 1 3.6 0H17v3.2a1.8 1.8 0 1 1 0 3.6V13H7z"/><path d="M6 17h12M6 20.5h12"/>`),
  down: () => svg(html`<path d="m6 9 6 6 6-6"/>`),
  dots: () => svg(html`<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>`),
  kebab: () => svg(html`<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>`),
  addSq: () => svg(html`<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>`),
  compass: () => svg(html`<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>`),
  copy: () => svg(html`<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>`),
  book: () => svg(html`<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/><path d="M12 6v13.5"/>`),
  tabs: () => svg(html`<rect x="4" y="7" width="12" height="12" rx="2.5"/><path d="M8 4h9a3 3 0 0 1 3 3v9"/>`),
};

function stepsFor(env, hasPrompt) {
  const open = { t: 'Open Novum from your Home Screen', s: 'Sign up or log in there. That’s the version that can send you notifications.', art: 'home' };
  if (env.kind === 'inapp') return [
    { t: 'Tap ··· or the menu', s: `${env.app || 'This app'} opened Novum in its own browser, which can’t add apps to your Home Screen. The menu is usually in a top corner.`, art: 'inapp' },
    { t: `Choose “Open in ${env.ios ? 'Safari' : 'browser'}”`, s: 'It might say Open in browser or Open in external browser. No menu? Copy the link below and paste it into Safari.', art: 'browser' },
    { t: 'Add it to your Home Screen', s: 'Novum shows you how once it’s open in Safari.', art: 'add' },
  ];
  if (env.kind === 'android') return hasPrompt ? [
    { t: 'Tap Install Novum below', s: 'Then tap Install on the pop-up.', art: 'install' }, open,
  ] : [
    { t: 'Tap ⋮ at the top right', s: 'Chrome’s menu, next to the address bar.', art: 'kebab' },
    { t: 'Tap Add to Home screen', s: 'It might say Install app. Then tap Install or Add.', art: 'install' }, open,
  ];
  // iOS 26 Safari: puzzle-piece menu → Share → View More → Add to Home Screen
  if (env.ios26) return [
    { t: 'Tap the puzzle-piece icon', s: 'The puzzle piece with two lines under it, on the left of the address bar.', art: 'bar26' },
    { t: 'Tap Share', s: 'It’s the first option at the top of the menu.', art: 'menu26' },
    { t: 'Tap View More', s: 'The row with the down arrow.', art: 'more26' },
    { t: 'Tap Add to Home Screen, then Add', s: 'Leave “Open as Web App” switched on.', art: 'menu' },
    open,
  ];
  // Older iOS and other browsers
  const first = env.browser === 'Safari'
    ? { t: 'Tap the Share button', s: 'The square with an arrow, in Safari’s toolbar. On iOS 26 it’s under the puzzle-piece icon left of the address bar.', art: 'bar' }
    : env.browser === 'Chrome'
      ? { t: 'Tap Share in the address bar', s: 'The square with an arrow, at the top right.', art: 'bar' }
      : { t: 'Open the menu and tap Share', s: `Can’t find it in ${env.browser}? Open novumdaily.com in Safari instead.`, art: 'bar' };
  return [
    first,
    { t: 'Tap Add to Home Screen', s: 'Scroll down the list. Not there? Tap View More or Edit Actions.', art: 'menu' },
    { t: 'Tap Add', s: 'Leave “Open as Web App” switched on.', art: 'add' },
    open,
  ];
}

// Little drawings of what to look for. The thing to tap pulses.
function Art({ kind }) {
  const hot = (x) => html`<i class="ig-hot">${x}</i>`;
  switch (kind) {
    case 'bar': return html`<div class="ig-art"><div class="ig-bar">${Icon.left()}${Icon.chevron()}${hot(Icon.share())}${G.book()}${G.tabs()}</div></div>`;
    case 'bar26': return html`<div class="ig-art"><div class="ig-bar">${hot(G.page())}<span class="ig-url">novumdaily.com</span></div></div>`;
    case 'menu26': return html`<div class="ig-art"><div class="ig-menu">
      <span class="on">Share ${Icon.share()}</span><span>Add to Bookmarks ${G.book()}</span><span>Add Bookmark to… ${G.book()}</span></div></div>`;
    case 'more26': return html`<div class="ig-art"><div class="ig-menu">
      <span>Copy ${G.copy()}</span><span>Add to Reading List ${G.book()}</span><span class="on">View More ${G.down()}</span></div></div>`;
    case 'menu': return html`<div class="ig-art"><div class="ig-menu">
      <span>Add to Reading List ${G.book()}</span><span>Add Bookmark ${G.book()}</span><span class="on">Add to Home Screen ${G.addSq()}</span></div></div>`;
    case 'add': return html`<div class="ig-art"><div class="ig-menu">
      <span class="ig-head"><em>Cancel</em><b>Add to Home Screen</b>${hot(html`<b class="ig-add">Add</b>`)}</span>
      <span class="ig-app"><img src="icons/icon-192.png" alt="" width="28" height="28" />Novum</span>
      <span>Open as Web App <i class="ig-tog"></i></span></div></div>`;
    case 'home': return html`<div class="ig-art"><div class="ig-home">
      ${['#FF9F0A', '#30D158', '#5AC8FA'].map((c) => html`<i style="background:${c}"></i>`)}
      <img class="ig-hot" src="icons/icon-192.png" alt="" width="40" height="40" /></div></div>`;
    case 'inapp': return html`<div class="ig-art"><div class="ig-bar top"><span class="ig-url">novumdaily.com</span>${hot(G.dots())}</div></div>`;
    case 'browser': return html`<div class="ig-art"><div class="ig-menu"><span>Copy link ${G.copy()}</span><span class="on">Open in browser ${G.compass()}</span></div></div>`;
    case 'kebab': return html`<div class="ig-art"><div class="ig-bar top"><span class="ig-url">novumdaily.com</span>${hot(G.kebab())}</div></div>`;
    case 'install': return html`<div class="ig-art"><div class="ig-menu"><span>New tab</span><span class="on">Add to Home screen ${G.addSq()}</span></div></div>`;
    default: return null;
  }
}

/* ---------- the guide (full screen on welcome, or inside a sheet) ---------- */
export function InstallGuide({ onSkip, skipLabel = 'Not now', compact }) {
  const env = installEnv();
  const prompt = useInstallPrompt();
  const steps = stepsFor(env, !!prompt);
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [done, setDone] = useState(false);
  // Walk through the steps on a loop until they tap one
  useEffect(() => {
    if (manual || done) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 3400);
    return () => clearInterval(t);
  }, [manual, done, steps.length]);

  if (env.kind === 'installed') return html`<div class="ig-done"><div class="ready-ring"><span>✓</span></div>
    <h2 class="auth-title center">Novum’s on your Home Screen</h2><p class="wiz-sub center">You’re using the app version. Nothing else to do.</p></div>`;
  if (env.kind === 'desktop') return html`<div class="ig-done"><div class="wiz-emoji">📱</div>
    <h2 class="auth-title center">Open Novum on your phone</h2><p class="wiz-sub center">Go to <b>novumdaily.com</b> in Safari on your iPhone (or Chrome on Android) and follow the steps there.</p></div>`;

  const install = async () => {
    haptic();
    try { prompt.prompt(); const r = await prompt.userChoice; if (r?.outcome === 'accepted') setDone(true); } catch { /* dismissed */ }
  };
  const copy = async () => {
    const link = location.origin + '/';
    try { await navigator.clipboard.writeText(link); toast('Link copied. Paste it into Safari'); } catch { toast(link); }
    haptic(10);
  };

  if (done) return html`<div class="ig-done">
    <${Art} kind="home" />
    <h2 class="auth-title center">Now open it from your Home Screen</h2>
    <p class="wiz-sub center">Find the Novum icon and open it. ${env.kind === 'ios' ? 'You can close this Safari tab.' : ''} You’ll sign in there.</p>
    <button class="link center-link" onClick=${() => setDone(false)}>Show the steps again</button>
    ${onSkip && html`<button class="link center-link" onClick=${onSkip}>${skipLabel}</button>`}
  </div>`;

  const title = env.kind === 'inapp' ? 'Open Novum in Safari' : 'Add Novum to your Home Screen';
  return html`<div class="ig ${compact ? 'compact' : ''}">
    ${!compact && html`<div class="ig-hero">
      <img src="icons/icon-192.png" alt="" width="72" height="72" class="wl-logo" />
      <h1 class="auth-title center">${title}</h1>
      <p class="wiz-sub center">${env.kind === 'inapp'
        ? 'You’re inside another app’s browser. Open Novum in Safari so you can add it to your Home Screen.'
        : 'Takes 10 seconds. Novum then opens full-screen like a normal app, and it’s the only way your phone lets it send you notifications.'}</p>
      <div class="ig-perks"><span>🔔 Notifications</span><span>📱 Full-screen</span><span>⚡ Opens instantly</span></div>
    </div>`}
    <ol class="ig-steps">
      ${steps.map((st, k) => html`<li key=${k} class="ig-step ${k === active ? 'on' : ''}">
        <button type="button" onClick=${() => { haptic(6); setManual(true); setActive(k); }} aria-expanded=${k === active}>
          <span class="ig-n">${k + 1}</span><span class="ig-t">${st.t}</span>
        </button>
        <div class="ig-more"><div><p>${st.s}</p><${Art} kind=${st.art} /></div></div>
      </li>`)}
    </ol>
    <div class="ig-actions">
      ${env.kind === 'android' && prompt && html`<button class="btn btn-primary block big glow" onClick=${install}>Install Novum</button>`}
      ${env.kind === 'inapp' && html`<button class="btn btn-primary block big" onClick=${copy}><span class="hs-ic">${G.copy()}</span> Copy the Novum link</button>`}
      ${env.kind !== 'inapp' && !(env.kind === 'android' && prompt) && html`<button class="btn btn-primary block big" onClick=${() => { haptic(10); setDone(true); }}>I’ve added it</button>`}
      ${onSkip && html`<button class="btn btn-plain block big" onClick=${() => { haptic(); onSkip(); }}>${skipLabel}</button>`}
    </div>
  </div>`;
}

export function openInstallGuide() {
  openSheet((close) => html`
    <${SheetBar} title="Add to Home Screen" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body"><${InstallGuide} /></div>`, { tall: true });
}

/* ---------- small entry points ---------- */
// Tappable card for the welcome screen and the end of Day Zero
export function HomeScreenTip() {
  if (!canInstall()) return null;
  const inapp = installEnv().kind === 'inapp';
  return html`<button type="button" class="hs-tip tap" onClick=${openInstallGuide}>
    <span class="hs-tip-ic">📲</span>
    <span class="row-main"><b>${inapp ? 'Open Novum in Safari' : 'Add Novum to your Home Screen'}</b>
      <span>For notifications and full-screen. Show me how.</span></span>
    <span class="row-chev">${Icon.chevron()}</span>
  </button>`;
}

// Slim banner at the top of Home
export function InstallBanner() {
  const [show, setShow] = useState(showBanner());
  if (!show) return null;
  return html`<div class="ig-banner">
    <button class="ig-banner-main" onClick=${openInstallGuide}>
      <span>📲</span><span><b>Get notifications</b> · Add Novum to your Home Screen</span>
    </button>
    <button class="icon-btn muted" aria-label="Hide for now" onClick=${() => { hideBanner(); setShow(false); haptic(); }}>×</button>
  </div>`;
}

/* ---------- first launch from the Home Screen ---------- */
const WELCOMED = 'novum.welcomed';
export const markWelcomed = () => { try { localStorage.setItem(WELCOMED, '1'); } catch { /* ignore */ } };
// Call once the app is showing. Offers notifications the first time Novum runs as a Home Screen app.
export function maybeWelcomeInstalled() {
  if (!isStandalone()) return;
  try { if (localStorage.getItem(WELCOMED)) return; } catch { return; }
  markWelcomed();
  if (!pushConfigured() || !pushSupported() || deviceState().enabled || permission() === 'denied') return;
  openSheet((close) => html`<${WelcomeSheet} close=${close} />`);
}
function WelcomeSheet({ close }) {
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const on = async () => {
    setErr(''); setBusy(true);
    try { await enablePush(); haptic(15); toast('Notifications on 🔔'); close(); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  return html`<div class="sheet-body ig-welcome">
    <div class="ready-ring"><span>✓</span></div>
    <h2 class="auth-title center">Novum’s on your Home Screen</h2>
    <p class="wiz-sub center">One last thing: turn on notifications so you hear about milestones and get a nudge at check-in time. You can change these in Profile.</p>
    ${err && html`<p class="auth-err center">${err}</p>`}
    <button class="btn btn-primary block big glow" disabled=${busy} onClick=${on}>${busy ? 'Turning on…' : 'Turn on notifications'}</button>
    <button class="btn btn-plain block big" onClick=${close}>Not now</button>
  </div>`;
}
