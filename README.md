# NOVUM

*Turn intentions into transformation.*

Novum is an iPhone-style web app for quitting vaping and weed. It counts time free and money saved, and has a daily check-in, Craving SOS, goals and habits, buddies, a recovery garden and Novum Rewind. It's installed from the browser to the Home Screen and works offline.

- **Live:** <https://novumdaily.com> (Cloudflare Pages project `novum`)
- **Preview:** <https://preview.novum-8ym.pages.dev> (the `preview` branch, not indexed by search engines)
- **Server:** the `novum-push` repo, a Cloudflare Worker with D1, KV and Brevo email. It handles accounts, encrypted sync, social features, push notifications, error reports and admin. See its own README.

## How it fits together

```text
 phone (PWA)                                   Cloudflare
 ┌──────────────────────────┐   HTTPS / JSON   ┌───────────────────────────────┐
 │ index.html + dist/       │ ───────────────▶ │ novum-push Worker             │
 │ service worker (sw.js)   │                  │  D1 novum-db: users, profiles,│
 │ localStorage cache       │ ◀─────────────── │  buddies, encrypted user data │
 └──────────────────────────┘   Web Push       │  KV SUBS: push subscriptions  │
                                               └───────────────────────────────┘
```

- The app is plain ES modules with [Preact + htm](https://github.com/developit/htm) (in `vendor/`), and there's no framework. esbuild bundles it into `dist/`.
- Each user's data is cached in `localStorage` on the phone and synced to the server, where it's stored encrypted (`js/sync.js`).
- The service worker serves one release cache-first, so the app opens offline. It also repairs itself if a cached copy is broken (see `js/boot.js`).

## Working on it

```sh
npm install          # once: installs esbuild
npm run build        # bundles js/ + styles.css into dist/ and updates index.html and sw.js
npx serve .          # any static server; open the address it prints
```

Service workers need `http://localhost` or HTTPS, so opening `index.html` straight from disk won't work offline.

Edit `js/`, `styles.css` and `vendor/`, and never edit `dist/` by hand. `npm run check` builds and then fails if the committed `dist/` is out of date. The GitHub **Check** action runs it on every push.

## Releasing

1. Bump `VERSION` in `sw.js` (for example `novum-v48` → `novum-v49`). Phones only fetch the new release when this changes.
2. Run `npm run build`, then commit everything, including `dist/` and the old `dist/` files the build deleted.
3. Push to preview first: `git push origin main:preview`. Check it on a phone at the preview address. It uses the live server.
4. Push `main`. Cloudflare Pages publishes it to novumdaily.com within about a minute.
5. If the server changed too, deploy `novum-push` (`npx wrangler deploy`). Apply any new migrations before deploying the server. Server changes go live straight away, so they must still work with the app that's already on people's phones.

Phones pick up the new version the next time Novum is opened. Sometimes it takes closing and reopening it twice.

## Security headers

`_headers` sets a strict Content Security Policy. Scripts and styles must come from Novum itself, and the only outside hosts allowed are the server, DiceBear avatars and Cloudflare Turnstile. The same policy is in `index.html`.

- Add a host to `connect-src` before anything (including the service worker) fetches from it. Otherwise it fails silently.
- Don't add inline `<script>` or `<style>` tags. Inline `style=` values set from code are fine.
- Cloudflare Web Analytics is switched off because its script isn't allowed by the policy.

## Errors and admin

- **Reporting:** errors on people's phones are sent to the server's `/errors` route. `js/boot.js` sends startup problems and CSP blocks, and `js/app.js` sends errors that happen while the app runs.
- **Noise:** browser extensions, crypto wallets, the bare "Script error." and Cloudflare's analytics beacon are ignored on both the phone and the server.
- **Admin:** accounts listed in the server's `ADMIN_EMAILS` see an **Admin** row in Profile, which is unlocked with an emailed code for 30 minutes. It shows errors grouped by app version, startup problems, people, reports, recent emails and backups.

## Files

| Path | What it does |
| --- | --- |
| `index.html` | Shell, iOS meta tags, CSP, loads `dist/` |
| `styles.css` | Dark theme and every component's styles |
| `sw.js` | Offline copy of the current release, push notifications |
| `build.mjs` | esbuild bundle into `dist/`, `--check` mode for CI |
| `_headers` | Security headers and caching for Cloudflare Pages |
| `manifest.json`, `icons/` | Install details and app icons |
| `vendor/` | Preact + htm, QR code generator |
| `js/app.js` | App frame, tab bar, routing, error reporting |
| `js/boot.js` | Runs first: startup error reports, service worker, self-repair |
| `js/ui.js` | Shared UI: icons, rows, sheets, rings, charts, toasts |
| `js/store.js` | Data model, dates and calculations (money, streaks, BMI) |
| `js/sync.js`, `js/api.js` | Encrypted sync and every server call |
| `js/config.js` | Server address and the public push key |
| `js/tabs/` | Home, Check-in, Goals, Progress and Profile |
| `js/onboarding.js`, `js/authkit.js`, `js/tour.js` | Sign up, log in, Day Zero setup and the first-run tour |
| `js/quits.js` | Things you're quitting, recovery timeline, slips |
| `js/sos.js`, `js/game.js`, `js/plans.js` | Craving SOS, the Flow puzzle, if-then plans |
| `js/profile.js`, `js/banner.js`, `js/social.js`, `js/connect.js`, `js/cheers.js`, `js/activity.js` | Profiles, banners, buddies, follows, cheers, activity feed |
| `js/garden.js`, `js/badges.js`, `js/celebrate.js`, `js/letters.js`, `js/future.js` | Recovery garden, badges, milestone cards, letters to future you, Future you |
| `js/recap.js`, `js/wrapped.js`, `js/wrapped-card.js` | Your week and Novum Rewind |
| `js/lungs.js`, `js/lungtest.js` | Lung test using the microphone |
| `js/push.js`, `js/install.js` | Notifications and the Add to Home Screen guide |
| `js/admin.js` | Admin page |
| `js/privacy.js`, `js/credits.js` | Privacy notice, credits and licences |

## Credits

Novum uses other people's work, including Preact, htm, qrcode-generator, Lucide and Feather icons, and DiceBear avatars. Each is credited in the app under **Profile → Your data & privacy → Credits & licences**, and the full licence texts are in `THIRD-PARTY-NOTICES.txt`.
