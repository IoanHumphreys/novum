import{Ea as i,Ha as l,La as o,f as s}from"./c-GZLUS7TI.js";var e="https://creativecommons.org/licenses/by/4.0/",t="https://creativecommons.org/publicdomain/zero/1.0/",c=[{n:"Adventurer",a:"Lisa Wischofsky",l:"CC BY 4.0",u:e,s:"adventurer"},{n:"Big Smile",a:"Ashley Seo",l:"CC BY 4.0",u:e,s:"big-smile"},{n:"Micah",a:"Micah Lanier",l:"CC BY 4.0",u:e,s:"micah"},{n:"Toon Head",a:"Johan Melin",l:"CC BY 4.0",u:e,s:"toon-head"},{n:"Personas",a:"Draftbit",l:"CC BY 4.0",u:e,s:"personas"},{n:"Fun Emoji",a:"Davis Uche",l:"CC BY 4.0",u:e,s:"fun-emoji"},{n:"Miniavs",a:"Webpixels",l:"CC BY 4.0",u:e,s:"miniavs"},{n:"Big Ears",a:"The Visual Team",l:"CC BY 4.0",u:e,s:"big-ears"},{n:"Dylan",a:"Natalia Spivak",l:"CC BY 4.0",u:e,s:"dylan"},{n:"Croodles",a:"vijay verma",l:"CC BY 4.0",u:e,s:"croodles"},{n:"Lorelei",a:"Lisa Wischofsky",l:"CC0 1.0",u:t,s:"lorelei"},{n:"Notionists",a:"Zoish",l:"CC0 1.0",u:t,s:"notionists"},{n:"Open Peeps",a:"Pablo Stanley",l:"CC0 1.0",u:t,s:"open-peeps"},{n:"Pixel Art",a:"DiceBear",l:"CC0 1.0",u:t,s:"pixel-art"},{n:"Thumbs",a:"DiceBear",l:"CC0 1.0",u:t,s:"thumbs"},{n:"Avataaars",a:"Pablo Stanley",l:"Free for personal and commercial use",u:"https://avataaars.com",s:"avataaars"},{n:"Bottts",a:"Pablo Stanley",l:"Free for personal and commercial use",u:"https://bottts.com",s:"bottts"}],u=[{n:"Preact",a:"Jason Miller and contributors",l:"MIT",u:"https://preactjs.com"},{n:"htm",a:"Google Inc.",l:"Apache 2.0",u:"https://github.com/developit/htm"},{n:"qrcode-generator",a:"Kazuhiko Arase",l:"MIT",u:"https://github.com/kazuhikoarase/qrcode-generator"},{n:"Lucide and Feather icons",a:"Lucide contributors and Cole Bemis",l:"ISC and MIT",u:"https://lucide.dev"}],n={target:"_blank",rel:"noopener noreferrer"};function C(){i(r=>s`<${p} close=${r} />`,{tall:!0})}function p({close:r}){return s`
    <${l} title="Credits & licences" right=${s`<button class="link b" onClick=${r}>Done</button>`} />
    <div class="sheet-body credits">
      <p class="muted center sheet-intro">Novum is built with work by these people. Thank you. 💙</p>
      <${o} header="Avatars" footer=${s`Drawn by <a href="https://www.dicebear.com" ...${n}>DiceBear</a> from these artists’ styles, on the background colour you pick, with no other changes.`}>
        ${c.map(a=>s`<a class="row tap credit" key=${a.s} href=${`https://www.dicebear.com/styles/${a.s}/`} ...${n}>
          <span class="row-main"><span class="row-title">“${a.n}” by ${a.a}</span><span class="row-sub">${a.l}</span></span>
        </a>`)}
      <//>
      <${o} header="Code, icons and badges">
        ${u.map(a=>s`<a class="row tap credit" key=${a.n} href=${a.u} ...${n}>
          <span class="row-main"><span class="row-title">${a.n}</span><span class="row-sub">${a.a} · ${a.l}</span></span>
        </a>`)}
      <//>
      <${o} footer="“QR Code” is a registered trademark of DENSO WAVE INCORPORATED.">
        <a class="row tap credit" href="THIRD-PARTY-NOTICES.txt" ...${n}><span class="row-main"><span class="row-title">Full licence texts</span></span></a>
      <//>
    </div>`}export{C as openCredits};
