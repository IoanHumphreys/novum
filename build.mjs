// Builds the app for the live site: `npm run build`.
//
// The code you edit stays in js/, styles.css and vendor/. This bundles and minifies it into dist/ (one main
// file, plus a small file for each screen that loads only when it's opened), then points index.html and the
// service worker's offline list at the new files. Commit dist/ along with your changes: Cloudflare Pages
// serves the repo as it is, with no build step of its own.
//
// `npm run check` builds and then fails if dist/, index.html or sw.js changed, i.e. someone forgot to build
// before committing. The GitHub check runs it on every push.
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const OUT = 'dist';
const check = process.argv.includes('--check');
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

fs.rmSync(OUT, { recursive: true, force: true });

// The app: js/app.js and everything it imports. Each import('./x.js') becomes its own file.
const app = await esbuild.build({
  entryPoints: ['js/app.js'], bundle: true, splitting: true, format: 'esm', minify: true,
  target: 'es2020', outdir: OUT, entryNames: '[name]-[hash]', chunkNames: 'c-[hash]',
  legalComments: 'eof', metafile: true, logLevel: 'warning', charset: 'utf8',
});
// boot.js runs first as a plain script (before modules), so it's minified on its own
const boot = await esbuild.build({
  entryPoints: ['js/boot.js'], bundle: false, minify: true, target: 'es2020',
  outdir: OUT, entryNames: '[name]-[hash]', metafile: true, logLevel: 'warning', charset: 'utf8',
});
// Styles: minified only (no target, so modern CSS such as color-mix() is left alone)
const css = await esbuild.build({
  entryPoints: ['styles.css'], bundle: false, minify: true,
  outdir: OUT, entryNames: '[name]-[hash]', metafile: true, logLevel: 'warning', charset: 'utf8',
});

const outs = (r) => Object.keys(r.metafile.outputs).map((p) => p.replace(/\\/g, '/'));
const appFiles = outs(app);
const main = appFiles.find((p) => app.metafile.outputs[p]?.entryPoint === 'js/app.js');
const bootFile = outs(boot)[0];
const cssFile = outs(css)[0];

// index.html: point at the new files
let index = fs.readFileSync('index.html', 'utf8');
const swap = (re, to, what) => { if (!re.test(index)) throw new Error(`index.html: couldn't find the ${what} tag`); index = index.replace(re, to); };
swap(/<link rel="stylesheet" href="[^"]*">/, `<link rel="stylesheet" href="${cssFile}">`, 'stylesheet');
swap(/<link rel="modulepreload" href="[^"]*">/, `<link rel="modulepreload" href="${main}">`, 'modulepreload');
swap(/<script src="[^"]*boot[^"]*"><\/script>/, `<script src="${bootFile}"></script>`, 'boot script');
swap(/<script type="module" src="[^"]*"><\/script>/, `<script type="module" src="${main}"></script>`, 'app script');
fs.writeFileSync('index.html', index);

// sw.js: the offline copy is every built file plus the icons already listed
let sw = fs.readFileSync('sw.js', 'utf8');
const m = sw.match(/const ASSETS = \[\n([\s\S]*?)\n\];/);
if (!m) throw new Error('sw.js: couldn\'t find the ASSETS list');
const icons = m[1].split('\n').map((l) => l.trim().replace(/^'|',?$/g, '')).filter((f) => f.startsWith('icons/'));
const assets = ['./', 'manifest.json', cssFile, bootFile, main, ...appFiles.filter((f) => f !== main && f.endsWith('.js')).sort(), ...icons];
sw = sw.replace(m[0], `const ASSETS = [\n  // Written by build.mjs: edit the icons here, the rest is replaced on every build\n${assets.map((f) => `  '${f}',`).join('\n')}\n];`);
sw = sw.replace(/\n  \/\/ Written by build\.mjs[^\n]*\n(?=  \/\/ Written by build\.mjs)/, '\n');
fs.writeFileSync('sw.js', sw);

// Sizes
const size = (f) => fs.statSync(f).size;
const all = [cssFile, bootFile, ...appFiles.filter((f) => f.endsWith('.js'))];
const startup = [cssFile, bootFile, main, ...(app.metafile.outputs[main].imports || []).filter((i) => i.kind === 'import-statement').map((i) => i.path.replace(/\\/g, '/'))];
console.log(`Built ${all.length} files, ${kb(all.reduce((a, f) => a + size(f), 0))} in all. Loaded at start: ${kb([...new Set(startup)].reduce((a, f) => a + size(f), 0))} (main ${kb(size(main))}).`);

if (check) {
  const changed = execSync(`git status --porcelain -- ${OUT} index.html sw.js`, { encoding: 'utf8' }).trim();
  if (changed) {
    console.error(`\nThe built files are out of date. Run \`npm run build\` and commit the result.\n${changed}`);
    process.exit(1);
  }
  console.log('Built files are up to date.');
}
