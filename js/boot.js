// Runs before the app: blocks zooming and registers the service worker (offline + notifications).
// Kept in its own file so the Content Security Policy can forbid inline scripts.

// Anti-clickjacking: if another site loads Novum inside a frame, hide everything and try to break out.
// (GitHub Pages can't send the frame-ancestors header that would block this outright.)
if (window.top !== window.self) {
  document.documentElement.style.display = 'none';
  try { window.top.location.replace(window.location.href); } catch { /* the browser blocked it: the page stays hidden */ }
}

// No pinch or double-tap zoom: Safari ignores user-scalable=no, so block its gesture events too
['gesturestart', 'gesturechange', 'gestureend'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

if ('serviceWorker' in navigator) {
  // If a page was already controlled and a new worker takes over, a new version is ready
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) return;
    window.__novumUpdate = true;
    window.dispatchEvent(new Event('novum-update'));
  });
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((reg) => {
      // Check for updates whenever the app comes back to the foreground
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch((e) => console.warn('SW failed', e));
  });
}
