import{a as me,b as he,c as Le,d as Ee,e as Me,f as Ne,g as B,h as xe,i as F,j as Be,k as Fe,l as H,m as He,p as Ie}from"./c-6Y37IDUQ.js";import{c as x,k as de,n as pe,o as ue,y as fe}from"./c-64SAQGNL.js";import"./c-E7ZIQIMY.js";import{c as Oe}from"./c-7Z6ZGD2Z.js";import{b as O,c as ge,d as Se,f as we,k as ke,l as Ae,o as Te,r as Ce,s as De,t as Pe}from"./c-INGTM4TJ.js";import{b as N,l as ie,m as re,o as ce,p as le}from"./c-LCQCBYH5.js";import{a as ye,b as be,c as ve}from"./c-B4QY5EBS.js";import"./c-2KPLHCVL.js";import{b as $e}from"./c-OCZ74QMI.js";import{b as M,d as oe,da as ae,p as se,q as ne}from"./c-HECOZTOP.js";import{Aa as f,Ga as X,I as S,Ia as q,J as K,Ja as ee,La as w,M as W,P as T,Ra as te,T as C,Ta as D,U as z,Ua as E,V,W as J,X as Y,Y as Z,Z as G,_ as Q,a as _,b,c as $,d as j,e as U,f as n,w as A,y as L,ya as v}from"./c-3SMB7GOA.js";function Re({s:t}){let i=S(),[s,r]=b(i),a=t.checkins[s]||{},u=e=>Y(o=>{o.checkins[s]={...o.checkins[s]||{},...e,t:Date.now()}}),m=e=>{let o=S(W(K(s),e));o<=i&&(v(),r(o))},d=s===i,p=t.goals.filter(e=>e.type==="habit"),y=Object.keys(t.checkins).sort().reverse().slice(0,7),c=e=>e==null?"Not logged":e===0?"None":e<=3?"Mild":e<=6?"Noticeable":e<=8?"Strong":"Intense";return n`<${q} title="Check-in" sub="A quick daily log. Patterns show up in Progress.">
    <div class="day-nav card">
      <button class="icon-btn" onClick=${()=>m(-1)} aria-label="Previous day">${f.left()}</button>
      <div class="day-nav-t"><b>${d?"Today":T(s,{weekday:"long"})}</b><span>${T(s,{day:"numeric",month:"long"})}</span></div>
      <button class="icon-btn" onClick=${()=>m(1)} disabled=${d} aria-label="Next day">${f.chevron()}</button>
    </div>

    <${w} header="Mood">
      <div class="moods">
        ${A.map(e=>n`<button class="mood ${a.mood===e.v?"on":""}" onClick=${()=>{v(10),u({mood:e.v})}} aria-pressed=${a.mood===e.v}>
          <span class="mood-e">${e.e}</span><span class="mood-l">${e.l}</span></button>`)}
      </div>
    <//>

    ${t.quits.length>0&&n`<${Fe} compact />`}

    ${t.quits.length>0&&n`<${w} header="Cravings" footer="0 = none, 10 = the strongest you’ve felt. Cravings usually pass within 5–10 minutes.">
      ${t.quits.map(e=>n`<div class="slider-row">
        <div class="slider-top"><span>${e.emoji} ${e.label}</span><span class="slider-v"><b>${a[e.id]??"–"}</b> ${c(a[e.id])}</span></div>
        <input type="range" min="0" max="10" step="1" value=${a[e.id]??0} style="--c:${e.color};--p:${(a[e.id]??0)/10*100}%"
          class=${a[e.id]==null?"unset":""} aria-label=${`${e.label} craving`}
          onInput=${o=>{let l=+o.target.value;l!==a[e.id]&&(v(4),u({[e.id]:l}))}} />
      </div>`)}
    <//>`}

    <${w} header="Sleep last night">
      <div class="pad"><${ee} options=${le.map((e,o)=>({value:o+1,label:e}))} value=${a.sleep} onChange=${e=>u({sleep:e})} /></div>
    <//>

    <${w} header="Notes">
      <${ce} key=${s} value=${a.note||""} onSave=${e=>u({note:e})} />
    <//>

    ${p.length>0&&n`<${w} header=${d?"Habits today":"Habits that day"}>
      ${p.map(e=>{let o=(e.ticks||[]).includes(s);return n`<div class="row" key=${e.id}>
          <span class="row-ic" style="background:${e.color}">${e.emoji}</span>
          <span class="row-main"><span class="row-title">${e.name}</span><span class="row-sub">${ie(e)}</span></span>
          <button class="tick ${o?"on":""}" style="--c:${e.color}" aria-pressed=${o} onClick=${()=>re(e.id,s)}>${f.check()}</button>
        </div>`})}
    <//>`}

    <section class="group">
      <h2 class="group-h">Calendar</h2>
      <${Je} s=${t} day=${s} onPick=${e=>{r(e),window.scrollTo({top:0,behavior:"smooth"})}} />
      <p class="group-f">Tap a day to see or change that check-in.</p>
    </section>
  <//>`}var Ve=["January","February","March","April","May","June","July","August","September","October","November","December"];function Je({s:t,day:i,onPick:s}){let r=S(),[a,u]=b(i.slice(0,7));$(()=>{u(i.slice(0,7))},[i.slice(0,7)]);let[m,d]=a.split("-").map(Number),p=(new Date(m,d-1,1).getDay()+6)%7,y=new Date(m,d,0).getDate(),c=o=>{let l=new Date(m,d-1+o,1),h=`${l.getFullYear()}-${N(l.getMonth()+1)}`;h<=r.slice(0,7)&&(v(),u(h))},e=Object.keys(t.checkins).filter(o=>o.startsWith(a)&&t.checkins[o].mood).length;return n`<div class="card cal">
    <div class="cal-top">
      <button class="icon-btn" onClick=${()=>c(-1)} aria-label="Previous month">${f.left()}</button>
      <div class="cal-t"><b>${Ve[d-1]} ${m}</b><span>${e} check-in${e===1?"":"s"}</span></div>
      <button class="icon-btn" onClick=${()=>c(1)} disabled=${a>=r.slice(0,7)} aria-label="Next month">${f.chevron()}</button>
    </div>
    <div class="cal-grid">
      ${["M","T","W","T","F","S","S"].map((o,l)=>n`<span class="cal-wd" key=${"w"+l}>${o}</span>`)}
      ${Array.from({length:p},(o,l)=>n`<span key=${"b"+l}></span>`)}
      ${Array.from({length:y},(o,l)=>{let h=`${a}-${N(l+1)}`,g=t.checkins[h],k=g?.mood,We=h>r;return n`<button key=${h} class="cal-d ${k?"has":""} ${h===r?"today":""} ${h===i?"sel":""}" disabled=${We}
          style=${k?`--mc:${L[k-1]}`:""} aria-label=${`${T(h,{weekday:"long",day:"numeric",month:"long"})}${k?`, ${A[k-1].l}`:""}`}
          onClick=${()=>{v(),s(h)}}>${l+1}${g?.note?n`<i class="cal-note"></i>`:""}</button>`})}
    </div>
    <div class="cal-key">${A.map((o,l)=>n`<span key=${o.v}><i style="background:${L[l]}"></i>${o.l}</span>`)}</div>
  </div>`}var _e=E(()=>import("./c-OVTBWQH5.js"),"openRecap");O();var je=()=>n`<div class="boot">NOVUM</div>`,Ye=D(()=>import("./c-IQYF2XYA.js"),"AuthScreen",je),Ze=D(()=>import("./c-IQYF2XYA.js"),"DayZero",je),Ge=D(()=>import("./c-DR63UHU6.js"),"Fitness",()=>n`<div class="page"><div class="lt"><h1 class="large-title">Fitness</h1></div></div>`),Qe=E(()=>import("./c-24WBN7R7.js"),"openLogger"),P=[{id:"home",label:"Home",icon:f.home},{id:"checkin",label:"Check-in",icon:f.checkin},{id:"fitness",label:"Fitness",icon:f.dumbbell},{id:"progress",label:"Progress",icon:f.progress},{id:"profile",label:"Profile",icon:f.profile}];function Xe({tab:t,go:i,dot:s,unread:r}){return n`<nav class="tabbar" aria-label="Main">
    ${P.map(a=>n`<button class="tab ${t===a.id?"on":""}" aria-current=${t===a.id?"page":void 0} onClick=${()=>i(a.id)}
      aria-label=${a.id==="home"&&r?`Home, ${r} new in Activity`:void 0}>
      <span class="tab-ic">${a.icon()}${a.id==="checkin"&&s&&n`<i class="tab-dot"></i>`}${a.id==="home"&&r>0&&n`<i class="tab-count">${r>9?"9+":r}</i>`}</span><span class="tab-l">${a.label}</span></button>`)}
  </nav>`}var I=document.documentElement;function Ue(){let t=window.scrollY;I.style.setProperty("--st",Math.max(0,Math.min(1,(t-10)/30)).toFixed(3)),I.style.setProperty("--ov",(1+Math.max(0,-t)*.0016).toFixed(4)),I.classList.toggle("scrolled",t>30)}window.addEventListener("scroll",Ue,{passive:!0});var R=new Set;function Ke(t,i,s){!i||R.size>=5||R.has(i)||/Script error|ResizeObserver|Load failed|NetworkError|Failed to fetch|AbortError|ethereum|cloudflareinsights/i.test(i)||/-extension:\/\//i.test(s||"")||(R.add(i),ae(t,i,s))}window.addEventListener("error",t=>Ke(`${(t.filename||"").split("/").slice(-2).join("/")}:${t.lineno||0}`,t.message,t.error?.stack));window.addEventListener("unhandledrejection",t=>Ke("promise",t.reason?.message||String(t.reason||""),t.reason?.stack));function qe({s:t}){let i=location.hash==="#reset"?"profile":location.hash==="#goals"?"fitness":location.hash.slice(1),[s,r]=b(P.some(c=>c.id===i)?i:"home");$(()=>{i==="activity"&&(history.replaceState(null,"","#home"),setTimeout(B,400)),i==="sos"&&(history.replaceState(null,"","#home"),setTimeout(H,400)),i==="plan"&&(history.replaceState(null,"","#home"),setTimeout(F,400)),i==="letters"&&(history.replaceState(null,"","#home"),setTimeout(x,400)),i==="recap"&&(history.replaceState(null,"","#home"),setTimeout(_e,400))},[]);let a=U({}),u=(c,{quiet:e}={})=>{if(c===s){e||window.scrollTo({top:0,behavior:"smooth"});return}if(a.current[s]=window.scrollY,e||v(),history.replaceState(null,"","#"+c),!document.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches){r(c);return}let o=P.map(g=>g.id);document.documentElement.dataset.tabDir=o.indexOf(c)>o.indexOf(s)?"fwd":"back";let l=document.startViewTransition(()=>(r(c),new Promise(g=>setTimeout(g,0)))),h=()=>{};l.ready.catch(h),l.finished.catch(h),l.updateCallbackDone.catch(h)};j(()=>{window.scrollTo(0,a.current[s]||0),Ue()},[s]),$(()=>{let c=()=>{let e=location.hash.slice(1);if(e==="activity"){r("home"),history.replaceState(null,"","#home"),B();return}if(e==="sos"){r("home"),history.replaceState(null,"","#home"),H();return}if(e==="plan"){r("home"),history.replaceState(null,"","#home"),F();return}if(e==="letters"){r("home"),history.replaceState(null,"","#home"),x();return}if(e==="recap"){r("home"),history.replaceState(null,"","#home"),_e();return}if(e==="goals"){r("fitness"),history.replaceState(null,"","#fitness");return}P.some(o=>o.id===e)&&r(e)};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]),$(()=>{let c=setTimeout(fe,700);return()=>clearTimeout(c)},[]),$(()=>{let c=()=>{let l=ge();if(l){if(Se(),l.toLowerCase()===(M()?.user?.username||"").toLowerCase()){te("That’s your own code. Show it to a friend to scan");return}Te(l)}};if(!t.tourDone)return;let e=setTimeout(c,900),o=()=>{O(),c()};return window.addEventListener("hashchange",o),()=>{clearTimeout(e),window.removeEventListener("hashchange",o)}},[t.tourDone]);let m={home:Ie,checkin:Re,fitness:Ge,progress:Be,profile:He}[s],d=!t.checkins[S()]?.mood;$(()=>{let c=()=>{be(ye()),we()},e=setTimeout(c,1200),o=setInterval(c,6e4);return()=>{clearTimeout(e),clearInterval(o)}},[]);let p=Me(),y=(p.unread||0)+(d?1:0);return $(()=>{try{"setAppBadge"in navigator&&(y?navigator.setAppBadge(y):navigator.clearAppBadge()).catch(()=>{})}catch{}},[y]),n`<div class="app">
    <main class="screen" key=${s}><${m} s=${t} go=${u} /></main>
    ${t.fitness?.active&&n`<button class="fx-bar" onClick=${Qe}><span class="fx-live-dot"></span><span>${t.fitness.active.name}</span><b>Resume</b></button>`}
    <${Xe} tab=${s} go=${u} dot=${d} unread=${p.unread||0} />
    <${Ne} />
    <${xe} s=${t} go=${u} />
  </div>`}function et(){let[t,i]=b(!!window.__novumUpdate);return $(()=>{let s=()=>i(!0);return window.addEventListener("novum-update",s),()=>window.removeEventListener("novum-update",s)},[]),t?n`<button class="update-bar" onClick=${()=>location.reload()}>✨ A new version of Novum is ready. <b>Tap to update</b></button>`:null}function tt(){let[t,i]=b(M()),[s,r]=b(C()),[a,u]=b(!1);$(()=>oe(i),[]),$(()=>z(p=>r(p)),[]),$(()=>{try{navigator.storage?.persist?.()}catch{}},[]);let m=t?.user?.id;$(()=>{if(!m){he(),ue(),Pe(),Ae(),Ce(),Le(),J({wipe:!1}),u(!0);return}if(V(m),Ee(),$e()){let p=G();p&&(Z({...p,setupDone:!1}),de(p.notify),Q())}u(C().setupDone),Promise.resolve(me(m)).finally(()=>u(!0)),pe(),De(),ke(),se().then(p=>{let y=C().profile.dob;p&&!p.dob&&y&&ne({dob:y}).catch(()=>{})}).catch(()=>{})},[m]);let d;return t?a?s.setupDone?d=n`<${qe} s=${s} />`:d=n`<${Ze} user=${t.user} />`:d=n`<div class="boot">NOVUM</div>`:d=n`<${Ye} />`,n`${d}<${ve} /><${Oe} /><${X} /><${et} />`}_(n`<${tt} />`,document.getElementById("app"));window.__novumBooted=!0;
