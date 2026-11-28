// Runs before the app: blocks zooming and registers the service worker (offline + notifications).
// Kept in its own file so the Content Security Policy can forbid inline scripts.

// Anti-clickjacking: if another site loads Novum inside a frame, hide everything and try to break out.
// (GitHub Pages can't send the frame-ancestors header that would block this outright.)
if (window.top !== window.self) {
  document.documentElement.style.display = 'none';
  try { window.top.location.replace(window.location.href); } catch { /* the browser blocked it: the page stays hidden */ }
}

// Startup errors: the app's own error reporting only works once it has started, so anything that stops it
// starting (a file that fails to load, a browser that doesn't support something) is sent from here.
// Same server as js/config.js; at most 3 reports per page load.
(() => {
  let sent = 0;
  // The release this phone has (newest "novum-vNN" offline copy), so the admin page can group errors by version
  const version = () => (window.caches ? caches.keys().then((ks) => ks.filter((k) => /^novum-v\d+$/.test(k)).sort((a, b) => b.slice(7) - a.slice(7))[0] || 'none') : Promise.resolve('none')).catch(() => 'none');
  const send = (place, message, detail) => version().then((v) => fetch('https://novum-push.ioanrhyshumph.workers.dev/errors', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
    body: JSON.stringify({ place, version: v, message: String(message || 'Unknown').slice(0, 300), detail: `${String(detail || '').slice(0, 900)}\n${location.href}` }),
  })).catch(() => {});
  const report = (message, detail) => {
    if (window.__novumBooted || sent >= 3) return;
    sent++;
    try { send('startup', message, detail); } catch { /* never let reporting break anything */ }
  };
  // Anything the security policy blocks (at most 3 per page load), so a too-strict rule is noticed quickly
  let csp = 0;
  addEventListener('securitypolicyviolation', (e) => {
    if (csp++ >= 3) return;
    try { send('csp', `Blocked ${e.effectiveDirective || e.violatedDirective}: ${String(e.blockedURI || 'inline').slice(0, 120)}`, `${e.sourceFile || ''}:${e.lineNumber || 0} ${String(e.sample || '').slice(0, 80)}`); } catch { /* ignore */ }
  });
  addEventListener('error', (e) => {
    // e.message for script errors; for a file that failed to load, e.target is the <script> or <link>
    if (e.target && e.target !== window && (e.target.src || e.target.href)) report('Failed to load ' + (e.target.src || e.target.href), '');
    else report(e.message, `${(e.filename || '').split('/').slice(-2).join('/')}:${e.lineno || 0}\n${e.error?.stack || ''}`);
  }, true);
  addEventListener('unhandledrejection', (e) => report(e.reason?.message || String(e.reason || ''), e.reason?.stack));
  // Nothing thrown, but the app still hasn't drawn anything after 6 seconds
  setTimeout(() => report('App did not start within 6 seconds', `SW: ${navigator.serviceWorker?.controller ? 'yes' : 'no'}`), 6000);
})();

// No pinch or double-tap zoom: Safari ignores user-scalable=no, so block its gesture events too
['gesturestart', 'gesturechange', 'gestureend'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

if ('serviceWorker' in navigator) {
  // If a page was already controlled and a new worker takes over, a new version is ready
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) return;
    // The app never started (see the self-repair below) and a fresh release just arrived: load it now
    if (!window.__novumBooted) { location.reload(); return; }
    window.__novumUpdate = true;
    window.dispatchEvent(new Event('novum-update'));
  });

  // Self-repair: app.js sets window.__novumBooted once it has drawn the screen. If the app was opened from
  // its offline copy and still hasn't started after 8 seconds, that copy is probably damaged (for example a
  // mix of two releases), so throw it away and reload once. Your data and notifications aren't affected.
  if (hadController) {
    setTimeout(() => {
      if (window.__novumBooted) return;
      try { if (sessionStorage.getItem('novum.repaired')) return; sessionStorage.setItem('novum.repaired', '1'); } catch { return; }
      caches.keys()
        .then((keys) => Promise.all(keys.filter((k) => !k.startsWith('novum-avatars')).map((k) => caches.delete(k))))
        .catch(() => {})
        .finally(() => location.reload());
    }, 8000);
  }
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((reg) => {
      // Check for updates whenever the app comes back to the foreground
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch((e) => console.warn('SW failed', e));
  });
}
