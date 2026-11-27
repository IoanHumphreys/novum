// Novum service worker: precache the app shell, serve cache-first, refresh in the background.
// Bump VERSION when you deploy changes so old caches are cleared.
const VERSION = 'novum-v21';
// Cartoon avatars from DiceBear are kept here (separately, so updates don't wipe them) for instant, offline loading
const AVATARS = 'novum-avatars';
const ASSETS = [
  './',
  'index.html',
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
  // Check-in reminders put a badge on the Novum icon until you check in
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
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') {
          await c.put(req, res.clone());
          c.keys().then((ks) => ks.length > 300 && Promise.all(ks.slice(0, ks.length - 300).map((k) => c.delete(k))));
        }
        return res;
      } catch { return hit || Response.error(); }
    })());
    return;
  }
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Page loads: serve the cached shell when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Everything else: stale-while-revalidate
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const network = fetch(req)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
