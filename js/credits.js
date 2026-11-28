// Credits & licences: the people whose work Novum uses. The full licence texts are in THIRD-PARTY-NOTICES.txt.
import { html, openSheet, SheetBar, Group } from './ui.js';

const CC_BY = 'https://creativecommons.org/licenses/by/4.0/';
const CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/';
const AVATARS = [
  { n: 'Adventurer', a: 'Lisa Wischofsky', l: 'CC BY 4.0', u: CC_BY, s: 'adventurer' },
  { n: 'Big Smile', a: 'Ashley Seo', l: 'CC BY 4.0', u: CC_BY, s: 'big-smile' },
  { n: 'Micah', a: 'Micah Lanier', l: 'CC BY 4.0', u: CC_BY, s: 'micah' },
  { n: 'Toon Head', a: 'Johan Melin', l: 'CC BY 4.0', u: CC_BY, s: 'toon-head' },
  { n: 'Personas', a: 'Draftbit', l: 'CC BY 4.0', u: CC_BY, s: 'personas' },
  { n: 'Fun Emoji', a: 'Davis Uche', l: 'CC BY 4.0', u: CC_BY, s: 'fun-emoji' },
  { n: 'Miniavs', a: 'Webpixels', l: 'CC BY 4.0', u: CC_BY, s: 'miniavs' },
  { n: 'Big Ears', a: 'The Visual Team', l: 'CC BY 4.0', u: CC_BY, s: 'big-ears' },
  { n: 'Dylan', a: 'Natalia Spivak', l: 'CC BY 4.0', u: CC_BY, s: 'dylan' },
  { n: 'Croodles', a: 'vijay verma', l: 'CC BY 4.0', u: CC_BY, s: 'croodles' },
  { n: 'Lorelei', a: 'Lisa Wischofsky', l: 'CC0 1.0', u: CC0, s: 'lorelei' },
  { n: 'Notionists', a: 'Zoish', l: 'CC0 1.0', u: CC0, s: 'notionists' },
  { n: 'Open Peeps', a: 'Pablo Stanley', l: 'CC0 1.0', u: CC0, s: 'open-peeps' },
  { n: 'Pixel Art', a: 'DiceBear', l: 'CC0 1.0', u: CC0, s: 'pixel-art' },
  { n: 'Thumbs', a: 'DiceBear', l: 'CC0 1.0', u: CC0, s: 'thumbs' },
  { n: 'Avataaars', a: 'Pablo Stanley', l: 'Free for personal and commercial use', u: 'https://avataaars.com', s: 'avataaars' },
  { n: 'Bottts', a: 'Pablo Stanley', l: 'Free for personal and commercial use', u: 'https://bottts.com', s: 'bottts' },
];
const CODE = [
  { n: 'Preact', a: 'Jason Miller and contributors', l: 'MIT', u: 'https://preactjs.com' },
  { n: 'htm', a: 'Google Inc.', l: 'Apache 2.0', u: 'https://github.com/developit/htm' },
  { n: 'qrcode-generator', a: 'Kazuhiko Arase', l: 'MIT', u: 'https://github.com/kazuhikoarase/qrcode-generator' },
  { n: 'Lucide icons (goal icons and line icons)', a: 'Lucide Icons and Contributors; some shapes from Feather by Cole Bemis', l: 'ISC and MIT', u: 'https://lucide.dev' },
];

const ext = { target: '_blank', rel: 'noopener noreferrer' };
export function openCredits() { openSheet((close) => html`<${Credits} close=${close} />`, { tall: true }); }
function Credits({ close }) {
  return html`
    <${SheetBar} title="Credits & licences" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body credits">
      <p class="muted center sheet-intro">Novum is built with work by these people. Thank you. 💙</p>
      <${Group} header="Avatars" footer=${html`Drawn by <a href="https://www.dicebear.com" ...${ext}>DiceBear</a> from these artists’ styles, on the background colour you pick, with no other changes.`}>
        ${AVATARS.map((x) => html`<a class="row tap credit" key=${x.s} href=${`https://www.dicebear.com/styles/${x.s}/`} ...${ext}>
          <span class="row-main"><span class="row-title">“${x.n}” by ${x.a}</span><span class="row-sub">${x.l}</span></span>
        </a>`)}
      <//>
      <${Group} header="Code, icons and badges">
        ${CODE.map((x) => html`<a class="row tap credit" key=${x.n} href=${x.u} ...${ext}>
          <span class="row-main"><span class="row-title">${x.n}</span><span class="row-sub">${x.a} · ${x.l}</span></span>
        </a>`)}
      <//>
      <${Group} footer="“QR Code” is a registered trademark of DENSO WAVE INCORPORATED.">
        <a class="row tap credit" href="THIRD-PARTY-NOTICES.txt" ...${ext}><span class="row-main"><span class="row-title">Full licence texts</span></span></a>
      <//>
    </div>`;
}
