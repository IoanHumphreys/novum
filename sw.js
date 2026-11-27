// Novum service worker: keeps a complete copy of one release of the app for instant, offline starts.
// Bump VERSION when you deploy changes: phones then download the whole new release and drop the old one.
const VERSION = 'novum-v27';
// Cartoon avatars from DiceBear are kept here (separately, so updates don't wipe them) for instant, offline loading
const AVATARS = 'novum-avatars-2'; // renamed so any broken copies kept by the old version are dropped
const ASSETS = [
  './',
  'styles.css',
  'manifest.json',
  'js/app.js',
  'js/store.js',
  'js/ui.js',
  'js/content.js',
  'js/push.js',
  'js/config.js',
  'js/api.js',
  'js/sync.js',
  'js/onboarding.js',
  'js/install.js',
  'js/celebrate.js',
  'js/social.js',
  'js/admin.js',
  'js/profile.js',
  'js/privacy.js',
  'js/banner.js',
  'js/shared.js',
  'js/activity.js',
  'js/lungs.js',
  'js/game.js',
  'js/wrapped.js',
  'js/wrapped-card.js',
  'js/lungtest.js',
  'js/authkit.js',
  'js/quits.js',
  'js/sos.js',
  'js/tabs/home.js',
  'js/tabs/checkin.js',
  'js/tabs/goals.js',
  'js/tabs/progress.js',
  'js/tabs/me.js',
  'js/boot.js',
  'vendor/preact-htm.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
];

self.addEventListener('install', (e) => {
  // cache: 'reload' bypasses the browser's HTTP cache so a new version gets fresh files
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== AVATARS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Push: the server sends { title, body, url, tag }
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch { data = { body: e.data && e.data.text() }; }
  const show = self.registration.showNotification(data.title || 'Novum', {
    body: data.body || '',
    tag: data.tag,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    data: { url: data.url || './' },
  });
  // The number on the Novum icon: unseen activity (+1 for a check-in reminder), worked out by the server
  const badge = data.badge && self.navigator.setAppBadge ? self.navigator.setAppBadge(data.badge).catch(() => {}) : null;
  e.waitUntil(Promise.all([show, badge]));
});

// Tap a notification: focus the open app (or open it) on the right tab
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL(e.notification.data?.url || './', self.registration.scope).href;
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) {
      if (w.url.startsWith(self.registration.scope)) { await w.focus(); if ('navigate' in w) await w.navigate(url); return; }
    }
    await self.clients.openWindow(url);
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method === 'GET' && new URL(req.url).hostname === 'api.dicebear.com') {
    e.respondWith((async () => {
      const c = await caches.open(AVATARS);
      const hit = await c.match(req.url);
      if (hit) return hit;
      try {
        // Fetched with CORS (DiceBear allows it) so we can see whether it worked, and only good ones are kept.
        // (Needs api.dicebear.com in connect-src: this worker follows the policy sent with sw.js.)
        const res = await fetch(req.url, { mode: 'cors', credentials: 'omit' });
        if (res.ok) {
          await c.put(req.url, res.clone());
          c.keys().then((ks) => ks.length > 300 && Promise.all(ks.slice(0, ks.length - 300).map((k) => c.delete(k))));
        }
        return res;
      } catch { return Response.error(); }
    })());
    return;
  }
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Page loads: always the latest page from the network, the cached one when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { if (res.ok && !res.redirected) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('./', copy)); } return res; })
        .catch(() => caches.match('./'))
    );
    return;
  }

  // App files: always from this version's cache, so every file comes from the same release.
  // Never refresh them in the background: that once mixed yesterday's and today's files (the phone's own
  // browser cache handed back old copies) and the app couldn't start. New versions arrive by bumping VERSION.
  // Files not cached yet are fetched fresh, skipping the browser cache, and kept.
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req, { cache: 'no-cache' });
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch {
      return (await caches.match(req, { ignoreSearch: true })) || Response.error();
    }
  })());
});
