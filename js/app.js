import { render, useState, useEffect, useLayoutEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, Icon, SheetHost, lazy, lazyOpen, toast } from './ui.js';
import { startPushSync, stopPushSync, adoptLegacyDevice } from './push.js';
import * as A from './api.js';
import { startSync, stopSync } from './sync.js';
import { consumeNewSignup } from './authkit.js';
import { maybeWelcomeInstalled } from './install.js';
import { checkMilestones, celebrate, CelebrationHost } from './celebrate.js';
import { startShareSync, stopShareSync, resetBuddies } from './social.js';
import { startProfileSync, stopProfileSync } from './profile.js';
import { Home } from './tabs/home.js';
import { CheckIn } from './tabs/checkin.js';
import { Progress } from './tabs/progress.js';
import { Profile } from './tabs/me.js';
import { openActivity, resetActivity, reloadActivityCache, useActivity, ActivityPopup } from './activity.js';
import { openSos } from './sos.js';
import { openPlans } from './plans.js';
import { openLetters } from './letters.js';
// The Sunday recap notification opens "Your week" (#recap); its code loads only then
const openRecap = lazyOpen(() => import('./recap.js'), 'openRecap');
import { WrappedHost } from './wrapped-card.js';
import { Tour } from './tour.js';
import { checkNewBadges } from './badges.js';
import { captureAddLink, pendingAdd, clearPendingAdd } from './connect.js';
import { openPerson } from './profile.js';

// A friend's QR code or link (#add=username) opened Novum: remember who, before anything reads the hash
captureAddLink();

// The sign-up, log-in and setup screens are only needed when logged out or setting up, so their code
// (the biggest file in the app) loads then, not on every start. The splash shows while it loads.
const splash = () => html`<div class="boot">NOVUM</div>`;
const AuthScreen = lazy(() => import('./onboarding.js'), 'AuthScreen', splash);
const DayZero = lazy(() => import('./onboarding.js'), 'DayZero', splash);
// The Fitness tab (and its exercise library) loads the first time it's opened
const Fitness = lazy(() => import('./tabs/fitness.js'), 'Fitness', () => html`<div class="page"><div class="lt"><h1 class="large-title">Fitness</h1></div></div>`);
const openLogger = lazyOpen(() => import('./fitness/logger.js'), 'openLogger');

const TABS = [
  { id: 'home', label: 'Home', icon: Icon.home },
  { id: 'checkin', label: 'Check-in', icon: Icon.checkin },
  { id: 'fitness', label: 'Fitness', icon: Icon.dumbbell },
  { id: 'progress', label: 'Progress', icon: Icon.progress },
  { id: 'profile', label: 'Profile', icon: Icon.profile },
];

/* ============ APP SHELL ============ */
function TabBar({ tab, go, dot, unread }) {
  return html`<nav class="tabbar" aria-label="Main">
    ${TABS.map((t) => html`<button class="tab ${tab === t.id ? 'on' : ''}" aria-current=${tab === t.id ? 'page' : undefined} onClick=${() => go(t.id)}
      aria-label=${t.id === 'home' && unread ? `Home, ${unread} new in Activity` : undefined}>
      <span class="tab-ic">${t.icon()}${t.id === 'checkin' && dot && html`<i class="tab-dot"></i>`}${t.id === 'home' && unread > 0 && html`<i class="tab-count">${unread > 9 ? '9+' : unread}</i>`}</span><span class="tab-l">${t.label}</span></button>`)}
  </nav>`;
}

const root = document.documentElement;

function onScroll() {
  const y = window.scrollY;
  root.style.setProperty('--st', Math.max(0, Math.min(1, (y - 10) / 30)).toFixed(3));
  root.style.setProperty('--ov', (1 + Math.max(0, -y) * 0.0016).toFixed(4));
  root.classList.toggle('scrolled', y > 30);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Errors in the app get reported (at most 5 per visit, no duplicates) so the Admin page can show them
const reported = new Set();
function report(place, message, detail) {
  if (!message || reported.size >= 5 || reported.has(message)) return;
  if (/Script error|ResizeObserver|Load failed|NetworkError|Failed to fetch|AbortError|ethereum|cloudflareinsights/i.test(message) || /-extension:\/\//i.test(detail || '')) return; // noise, offline or extensions
  reported.add(message);
  A.reportError(place, message, detail);
}
window.addEventListener('error', (e) => report(`${(e.filename || '').split('/').slice(-2).join('/')}:${e.lineno || 0}`, e.message, e.error?.stack));
window.addEventListener('unhandledrejection', (e) => report('promise', e.reason?.message || String(e.reason || ''), e.reason?.stack));

function App({ s }) {
  // #reset comes from "This wasn't me" in a new-login email: when logged in, Profile has the password and devices settings
  // #goals is the old Goals tab (habit reminders still link to it): goals now live in Fitness
  const initial = location.hash === '#reset' ? 'profile' : location.hash === '#goals' ? 'fitness' : location.hash.slice(1);
  const [tab, setTab] = useState(TABS.some((t) => t.id === initial) ? initial : 'home');
  useEffect(() => {
    if (initial === 'activity') { history.replaceState(null, '', '#home'); setTimeout(openActivity, 400); }
    if (initial === 'sos') { history.replaceState(null, '', '#home'); setTimeout(openSos, 400); }
    if (initial === 'plan') { history.replaceState(null, '', '#home'); setTimeout(openPlans, 400); }
    if (initial === 'letters') { history.replaceState(null, '', '#home'); setTimeout(openLetters, 400); }
    if (initial === 'recap') { history.replaceState(null, '', '#home'); setTimeout(openRecap, 400); }
  }, []);
  const scrolls = useRef({});
  const go = (t, { quiet } = {}) => {
    if (t === tab) { if (!quiet) window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    scrolls.current[tab] = window.scrollY;
    if (!quiet) haptic();
    history.replaceState(null, '', '#' + t);
    // Smooth switch: the old tab fades out and the new one slides in from the side you tapped (iOS 18+ and
    // recent Chrome; others switch instantly, as before). Skipped when Reduce Motion is on.
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) { setTab(t); return; }
    const ids = TABS.map((x) => x.id);
    document.documentElement.dataset.tabDir = ids.indexOf(t) > ids.indexOf(tab) ? 'fwd' : 'back';
    // Preact draws the new tab a moment after setTab; wait for that before the "after" snapshot
    const vt = document.startViewTransition(() => { setTab(t); return new Promise((r) => setTimeout(r, 0)); });
    // Tapping tabs quickly cancels the previous transition, which is fine: don't report it as an error
    const ignore = () => {};
    vt.ready.catch(ignore); vt.finished.catch(ignore); vt.updateCallbackDone.catch(ignore);
  };
  useLayoutEffect(() => { window.scrollTo(0, scrolls.current[tab] || 0); onScroll(); }, [tab]);
  // Notification taps navigate to e.g. #checkin
  useEffect(() => {
    const on = () => {
      const h = location.hash.slice(1);
      if (h === 'activity') { setTab('home'); history.replaceState(null, '', '#home'); openActivity(); return; }
      if (h === 'sos') { setTab('home'); history.replaceState(null, '', '#home'); openSos(); return; }
      if (h === 'plan') { setTab('home'); history.replaceState(null, '', '#home'); openPlans(); return; }
      if (h === 'letters') { setTab('home'); history.replaceState(null, '', '#home'); openLetters(); return; }
      if (h === 'recap') { setTab('home'); history.replaceState(null, '', '#home'); openRecap(); return; }
      if (h === 'goals') { setTab('fitness'); history.replaceState(null, '', '#fitness'); return; }
      if (TABS.some((t) => t.id === h)) setTab(h);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  useEffect(() => { const t = setTimeout(maybeWelcomeInstalled, 700); return () => clearTimeout(t); }, []);
  // Opened from a friend's QR code or link: show their profile, with "Add buddy" (after the tour, if it's showing)
  useEffect(() => {
    const go = () => {
      const u = pendingAdd();
      if (!u) return;
      clearPendingAdd();
      if (u.toLowerCase() === (A.getSession()?.user?.username || '').toLowerCase()) { toast('That’s your own code. Show it to a friend to scan'); return; }
      openPerson(u);
    };
    if (!s.tourDone) return undefined; // runs again once the tour is finished
    const t = setTimeout(go, 900);
    const onHash = () => { captureAddLink(); go(); };
    window.addEventListener('hashchange', onHash);
    return () => { clearTimeout(t); window.removeEventListener('hashchange', onHash); };
  }, [s.tourDone]);
  const Screen = { home: Home, checkin: CheckIn, fitness: Fitness, progress: Progress, profile: Profile }[tab];
  const needCheckin = !s.checkins[S.dayKey()]?.mood;
  // New milestones get a celebration (checked on open, then every minute)
  useEffect(() => {
    const run = () => { celebrate(checkMilestones()); checkNewBadges(); };
    const t = setTimeout(run, 1200);
    const iv = setInterval(run, 60000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);
  // Number on the Novum app icon: unseen activity, plus 1 until today's check-in is done.
  // (Works on iPhone Home Screen apps and computers. Android shows a dot from the notifications instead.)
  const act = useActivity();
  const badgeN = (act.unread || 0) + (needCheckin ? 1 : 0);
  useEffect(() => {
    try { if ('setAppBadge' in navigator) (badgeN ? navigator.setAppBadge(badgeN) : navigator.clearAppBadge()).catch(() => {}); } catch { /* not supported */ }
  }, [badgeN]);
  return html`<div class="app">
    <main class="screen" key=${tab}><${Screen} s=${s} go=${go} /></main>
    ${s.fitness?.active && html`<button class="fx-bar" onClick=${openLogger}><span class="fx-live-dot"></span><span>${s.fitness.active.name}</span><b>Resume</b></button>`}
    <${TabBar} tab=${tab} go=${go} dot=${needCheckin} unread=${act.unread || 0} />
    <${ActivityPopup} />
    <${Tour} s=${s} go=${go} />
  </div>`;
}

// "A new version is ready" banner (set by index.html when a new service worker takes over)
function UpdateBanner() {
  const [show, setShow] = useState(!!window.__novumUpdate);
  useEffect(() => { const on = () => setShow(true); window.addEventListener('novum-update', on); return () => window.removeEventListener('novum-update', on); }, []);
  if (!show) return null;
  return html`<button class="update-bar" onClick=${() => location.reload()}>✨ A new version of Novum is ready. <b>Tap to update</b></button>`;
}

// Decides what to show: auth → loading → Day Zero → the app
function Root() {
  const [session, setSess] = useState(A.getSession());
  const [s, setS] = useState(S.getState());
  const [ready, setReady] = useState(false);
  useEffect(() => A.onSession(setSess), []);
  useEffect(() => S.subscribe((st) => setS(st)), []);
  useEffect(() => { try { navigator.storage?.persist?.(); } catch { /* not supported */ } }, []);

  const uid = session?.user?.id;
  useEffect(() => {
    if (!uid) { stopSync(); stopPushSync(); stopShareSync(); stopProfileSync(); resetBuddies(); resetActivity(); S.closeUser({ wipe: false }); setReady(true); return; }
    S.openUser(uid);
    reloadActivityCache();
    // New account on a device that already had pre-account Novum data: bring it across
    if (consumeNewSignup()) {
      const legacy = S.legacyState();
      if (legacy) {
        S.replaceState({ ...legacy, setupDone: false });
        adoptLegacyDevice(legacy.notify);
        S.clearLegacy();
      }
    }
    setReady(S.getState().setupDone);
    Promise.resolve(startSync(uid)).finally(() => setReady(true));
    startPushSync();
    startShareSync();
    startProfileSync();
    A.refreshMe().then((u) => {
      const dob = S.getState().profile.dob;
      if (u && !u.dob && dob) A.updateMe({ dob }).catch(() => { /* try again next open */ });
    }).catch(() => { /* offline or expired: handled by api.js */ });
  }, [uid]);

  let body;
  if (!session) body = html`<${AuthScreen} />`;
  else if (!ready) body = html`<div class="boot">NOVUM</div>`;
  else if (!s.setupDone) body = html`<${DayZero} user=${session.user} />`;
  else body = html`<${App} s=${s} />`;
  return html`${body}<${CelebrationHost} /><${WrappedHost} /><${SheetHost} /><${UpdateBanner} />`;
}

render(html`<${Root} />`, document.getElementById('app'));
// Tells boot.js the app started, so its self-repair doesn't kick in
window.__novumBooted = true;
