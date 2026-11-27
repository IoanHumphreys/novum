import { render, useState, useEffect, useLayoutEffect, useRef } from '../vendor/preact-htm.js';
import * as S from './store.js';
import { html, haptic, Icon, SheetHost } from './ui.js';
import { startPushSync, stopPushSync, adoptLegacyDevice } from './push.js';
import * as A from './api.js';
import { startSync, stopSync } from './sync.js';
import { AuthScreen, DayZero, consumeNewSignup } from './onboarding.js';
import { maybeWelcomeInstalled } from './install.js';
import { checkMilestones, celebrate, CelebrationHost } from './celebrate.js';
import { startShareSync, stopShareSync, resetBuddies } from './social.js';
import { startProfileSync, stopProfileSync } from './profile.js';
import { Home } from './tabs/home.js';
import { CheckIn } from './tabs/checkin.js';
import { Goals } from './tabs/goals.js';
import { Progress } from './tabs/progress.js';
import { Profile } from './tabs/me.js';
import { openActivity, resetActivity } from './activity.js';

const TABS = [
  { id: 'home', label: 'Home', icon: Icon.home },
  { id: 'checkin', label: 'Check-in', icon: Icon.checkin },
  { id: 'goals', label: 'Goals', icon: Icon.goals },
  { id: 'progress', label: 'Progress', icon: Icon.progress },
  { id: 'profile', label: 'Profile', icon: Icon.profile },
];

/* ============ APP SHELL ============ */
function TabBar({ tab, go, dot }) {
  return html`<nav class="tabbar" aria-label="Main">
    ${TABS.map((t) => html`<button class="tab ${tab === t.id ? 'on' : ''}" aria-current=${tab === t.id ? 'page' : undefined} onClick=${() => go(t.id)}>
      <span class="tab-ic">${t.icon()}${t.id === 'checkin' && dot && html`<i class="tab-dot"></i>`}</span><span class="tab-l">${t.label}</span></button>`)}
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
  if (/Script error|ResizeObserver|Load failed|NetworkError|Failed to fetch|AbortError/i.test(message)) return; // noise, offline or extensions
  reported.add(message);
  A.reportError(place, message, detail);
}
window.addEventListener('error', (e) => report(`${(e.filename || '').split('/').slice(-2).join('/')}:${e.lineno || 0}`, e.message, e.error?.stack));
window.addEventListener('unhandledrejection', (e) => report('promise', e.reason?.message || String(e.reason || ''), e.reason?.stack));

function App({ s }) {
  const initial = location.hash.slice(1);
  const [tab, setTab] = useState(TABS.some((t) => t.id === initial) ? initial : 'home');
  useEffect(() => { if (initial === 'activity') { history.replaceState(null, '', '#home'); setTimeout(openActivity, 400); } }, []);
  const scrolls = useRef({});
  const go = (t) => {
    if (t === tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    scrolls.current[tab] = window.scrollY;
    haptic(); setTab(t);
    history.replaceState(null, '', '#' + t);
  };
  useLayoutEffect(() => { window.scrollTo(0, scrolls.current[tab] || 0); onScroll(); }, [tab]);
  // Notification taps navigate to e.g. #checkin
  useEffect(() => {
    const on = () => {
      const h = location.hash.slice(1);
      if (h === 'activity') { setTab('home'); history.replaceState(null, '', '#home'); openActivity(); return; }
      if (TABS.some((t) => t.id === h)) setTab(h);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  useEffect(() => { const t = setTimeout(maybeWelcomeInstalled, 700); return () => clearTimeout(t); }, []);
  const Screen = { home: Home, checkin: CheckIn, goals: Goals, progress: Progress, profile: Profile }[tab];
  const needCheckin = !s.checkins[S.dayKey()]?.mood;
  // New milestones get a celebration (checked on open, then every minute)
  useEffect(() => {
    const run = () => celebrate(checkMilestones());
    const t = setTimeout(run, 1200);
    const iv = setInterval(run, 60000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);
  // Badge on the Novum icon until today's check-in is done
  useEffect(() => {
    try { if ('setAppBadge' in navigator) (needCheckin ? navigator.setAppBadge() : navigator.clearAppBadge()).catch(() => {}); } catch { /* not supported */ }
  }, [needCheckin]);
  return html`<div class="app">
    <main class="screen" key=${tab}><${Screen} s=${s} go=${go} /></main>
    <${TabBar} tab=${tab} go=${go} dot=${needCheckin} />
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
  return html`${body}<${CelebrationHost} /><${SheetHost} /><${UpdateBanner} />`;
}

render(html`<${Root} />`, document.getElementById('app'));
