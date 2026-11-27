# NOVUM

*A new beginning. A new standard. A new you.*

A personal, offline-first iPhone web app for staying off vaping and weed, tracking health and money saved, and planning 2027 goals.

No build step: plain ES modules plus [Preact + htm](https://github.com/developit/htm) (13 KB, saved in `vendor/`). All data stays in this browser's `localStorage`.

## Run it locally

Any static server works, for example:

```sh
npx serve .
# or
python -m http.server 8080
```

Then open the printed address. Service workers need `http://localhost` or HTTPS, so opening `index.html` directly from disk won't run it offline.

## Put it on GitHub Pages

1. Create a new repository on GitHub, e.g. `novum`.
2. Upload every file in this folder, including the hidden `.nojekyll` file. Don't upload `_frame.html` if it's still there; it's a test page.
   ```sh
   git init
   git add .
   git commit -m "Novum"
   git branch -M main
   git remote add origin https://github.com/<your-username>/novum.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages → Build and deployment**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, then Save.
4. After about a minute it's live at `https://<your-username>.github.io/novum/`.

## Install on iPhone

1. Open the Pages URL in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. Open Novum from the home screen. It runs full-screen and works offline.

Home-screen apps on iOS keep their own storage, separate from Safari tabs. Use the home-screen app as your main copy, and export backups from **Profile → Export backup** now and then.

## Shipping updates

When you change files, bump `VERSION` in `sw.js` (e.g. `novum-v2`) so phones fetch the new version. Close and reopen the app, sometimes twice, to see it.

## Files

| Path | What it does |
|---|---|
| `index.html` | Shell, iOS meta tags, service worker registration |
| `styles.css` | Dark blue theme, iOS-style components, animations |
| `js/app.js` | Screens: Home, Check-in, Goals, Progress, Profile, and all sheets |
| `js/ui.js` | Rings, bottom sheets, SVG charts, controls, haptics |
| `js/store.js` | Data model, localStorage, goal/quit/BMI calculations, backup |
| `js/content.js` | Milestones, health timeline text, New Year presets, SOS content |
| `js/push.js` | Push notification subscribe and settings sync |
| `js/config.js` | Push server address and public key (fill in after setting up `novum-push`) |
| `sw.js` | Offline caching |
| `manifest.json`, `icons/` | Install metadata and icons |

## Defaults set for you

- Vaping and weed quit time: 11 Nov 2026, 00:00. Change the exact time in **Profile → Quit counters**.
- Spend: £45/month on vapes and £40/month on weed, the middle of the ranges you gave. Both are editable.
- Profile: 19, 181 cm, 70.2 kg, which gives a BMI of 21.4.
