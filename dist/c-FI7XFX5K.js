import{a as gt}from"./c-C2L5Y3OO.js";import{c as ft}from"./c-AMQR2HX4.js";import{e as Ae,f as lt,l as ct,p as ut,r as dt,s as pt,t as mt,v as Re,x as $t}from"./c-V6TNC5B7.js";import{c as Pe,i as ht,j as Me}from"./c-BI6QCAY5.js";import"./c-JNCYY6XI.js";import{a as De,d as bt,e as Ee}from"./c-2ZSCUEZM.js";import{a as Ie,b as It,c as $e,d as ie,e as re,f as be,g as he}from"./c-6IGSU4ZM.js";import{K as rt,f as Ve,g as Xe,h as et,i as tt,j as at,k as nt,l as Ne,m as st,n as ot,q as it}from"./c-HECOZTOP.js";import{H as Le,Ia as xe,J as Be,Ja as Ze,K as Ye,P as He,Q as Ue,Qa as X,S as Ce,Ta as Qe,W as qe,b as i,c as ye,e as pe,f as a,g as ke,j as Oe,k as Se,ka as _e,la as me,ma as Ge,na as Ke,u as We,wa as ze,xa as x,ya as Je,za as _}from"./c-64P324KW.js";var kt=Qe(()=>import("./c-5E4HNI4E.js"),"openPrivacy"),Z=16,wt=/^[a-zA-Z0-9_.]{3,20}$/,St=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;function Fe({step:s,total:t,dir:o,onBack:m,badge:b,children:p}){return a`<div class="wiz">
    <div class="wiz-top">
      ${m?a`<button class="icon-btn" type="button" onClick=${m} aria-label="Back">${_.left()}</button>`:a`<span class="wiz-spacer"></span>`}
      <div class="wiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax=${t} aria-valuenow=${s+1}><i style="width:${(s+1)/t*100}%"></i></div>
      <span class="wiz-badge">${b||`${s+1}/${t}`}</span>
    </div>
    <div class="wiz-body ${o}" key=${s}>${p}</div>
  </div>`}function I({emoji:s,title:t,sub:o}){return a`${s&&a`<div class="wiz-emoji">${s}</div>`}<h1 class="wiz-q">${t}</h1>${o&&a`<p class="wiz-sub">${o}</p>`}`}function ce(s){let t=pe();return ye(()=>{let o=setTimeout(()=>t.current?.focus({preventScroll:!0}),380);return()=>clearTimeout(o)},[s]),t}function D({inputRef:s,...t}){return a`<input class="wiz-in" ref=${s} ...${t} />`}function ue({children:s}){return s?a`<p class="wiz-err" role="alert">${s}</p>`:null}var fe=null;function Rt(){return window.turnstile?Promise.resolve(window.turnstile):(fe||(fe=new Promise((s,t)=>{let o=document.createElement("script");o.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",o.async=!0,o.onload=()=>s(window.turnstile),o.onerror=()=>{fe=null,t(new Error("turnstile"))},document.head.appendChild(o)})),fe)}function Ct(){let s=pe(),t=pe({key:"",id:null,token:"",waiters:[]});return ye(()=>{let p=!1;return rt().then(async n=>{if(p||!n.turnstileSiteKey)return;t.current.key=n.turnstileSiteKey;let C=await Rt();p||!s.current||(t.current.id=C.render(s.current,{sitekey:n.turnstileSiteKey,appearance:"interaction-only",theme:"dark",callback:d=>{t.current.token=d,t.current.waiters.splice(0).forEach(z=>z(d))},"expired-callback":()=>{t.current.token=""},"error-callback":()=>{t.current.token=""}}))}).catch(()=>{}),()=>{p=!0;try{t.current.id!=null&&window.turnstile?.remove(t.current.id)}catch{}}},[]),{box:s,getToken:()=>{let p=t.current;return p.key?p.token?Promise.resolve(p.token):new Promise(n=>{p.waiters.push(n),setTimeout(()=>n(""),15e3)}):Promise.resolve("")},reset:()=>{let p=t.current;p.token="";try{p.id!=null&&window.turnstile.reset(p.id)}catch{}},peek:()=>t.current.token}}function Zt(){let[s,t]=i(location.hash==="#reset"?"reset":dt()?"install":"welcome");return s==="reset"?a`<${vt} startReset back=${()=>{history.replaceState(null,"",location.pathname),t("welcome")}} toSignup=${()=>t("signup")} />`:s==="install"?a`<div class="auth ig-screen"><${mt} skipLabel=${ut().kind==="inapp"?"Continue here anyway":"Continue in the browser"} onSkip=${()=>{pt(),t("welcome")}} /></div>`:s==="signup"?a`<${Pt} back=${()=>t("welcome")} toLogin=${()=>t("login")} />`:s==="login"?a`<${vt} back=${()=>t("welcome")} toSignup=${()=>t("signup")} />`:a`<div class="auth welcome">
    <div class="wl-sky" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i></div>
    <div class="wl-hero">
      <div class="wl-mark">
        <svg class="wl-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" /><circle class="fg" cx="60" cy="60" r="54" /></svg>
        <img src="icons/icon-192.png" alt="" width="84" height="84" class="wl-logo" />
      </div>
      <h1 class="wl-name">NOVUM</h1>
      <p class="wl-tag">${ke.map((o,m)=>a`<span>${m===ke.length-1?a`<b>${o}</b>`:o}</span>`)}</p>
    </div>
    <${Et} />
    <div class="wl-actions">
      ${Pe()&&a`<p class="add-hint">🤝 Sign up or log in and you can add <b>@${Pe()}</b> as your buddy straight away.</p>`}
      <button class="btn btn-primary block big glow" onClick=${()=>{x(),t("signup")}}>Get started. It’s free</button>
      <button class="btn btn-plain block big" onClick=${()=>{x(),t("login")}}>I already have an account</button>
      <p class="wl-fine">🔒 Private by default · Encrypted · <button type="button" class="link inline" onClick=${kt}>Privacy</button></p>
      <${Re} />
    </div>
  </div>`}var Dt=Date.now()-(16*864e5+4*36e5+22*6e4);function Et(){let t=Je(1e3)-Dt,o=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),b=Math.floor(t%36e5/6e4),p=Math.floor(t%6e4/1e3),n=d=>String(d).padStart(2,"0"),C=45*t/864e5/30.4375;return a`<div class="wl-demo" aria-hidden="true">
    <div class="wd-card wd-streak">
      <div class="wd-k">💨 Vape-free</div>
      <div class="wd-time"><b>${o}</b><small>d</small> <b>${n(m)}</b><small>h</small> <b>${n(b)}</b><small>m</small> <b class="dim">${n(p)}</b><small>s</small></div>
    </div>
    <div class="wd-row">
      <div class="wd-card wd-money"><div class="wd-k">💷 Saved</div><b>£${C.toFixed(2)}</b></div>
      <div class="wd-card wd-badge"><span>🏅</span><div><b>2 weeks</b><small>unlocked</small></div></div>
    </div>
    <div class="wd-card wd-cheer"><span class="wd-av">J</span><span><b>Jamie</b> sent you 💪 <small>keep going</small></span></div>
  </div>`}var le=["name","dob","username","email","code","password"];function Pt({back:s,toLogin:t}){let[o,m]=i(0),[b,p]=i("fwd"),[n,C]=i({firstName:"",lastName:"",username:"",email:"",password:"",dob:""}),[d,z]=i(!1),[c,r]=i(""),[f,v]=i(!1),[y,E]=i(!1),[h,P]=i(""),[k,M]=i(0),[g,B]=i(""),[O,N]=i(""),[j,G]=i(!1),u=le[o],A=ce(o),W=l=>$=>{r(""),C({...n,[l]:$.target.value})},R=l=>le.indexOf(l),Y=l=>{x(),r(""),p(l>o?"fwd":"back"),m(l)},ee=()=>o===0?s():Y(u==="password"?R("email"):o-1),F=n.username.trim().replace(/^@/,""),L=n.email.trim().toLowerCase(),te={name:n.firstName.trim()&&n.lastName.trim(),dob:/^\d{4}-\d{2}-\d{2}$/.test(n.dob)&&me({dob:n.dob})>=Z,username:wt.test(F),email:St.test(L),code:h.length===6,password:n.password.length>=8&&d}[u],T=/^\d{4}-\d{2}-\d{2}$/.test(n.dob)?me({dob:n.dob}):null,q=Ct(),K=async()=>{let l=await q.getToken(),$;try{$=await et(L,n.firstName.trim(),l)}finally{q.reset()}return $.skipped?(G(!0),!1):(M(Date.now()),P(""),!0)},J=async(l=h)=>{if(!(f||l.length!==6)){v(!0),r("");try{let $=await tt(L,l);B($.emailToken),N(L),v(!1),x(20),Y(R("password"))}catch($){v(!1),r($.message),P("")}}},H=(()=>{let l=n.password,$=0;return l.length>=8&&$++,l.length>=12&&$++,/[A-Z]/.test(l)&&/[a-z]/.test(l)&&$++,(/\d/.test(l)||/[^\w]/.test(l))&&$++,[null,{l:"Weak",c:"#FF453A",w:25},{l:"Okay",c:"#FF9F0A",w:50},{l:"Good",c:"#30D158",w:75},{l:"Strong",c:"#30D158",w:100}][$]})(),ae=async()=>{v(!0),r("");try{Ie(!0),await Ve({firstName:n.firstName.trim(),lastName:n.lastName.trim(),username:F,email:L,password:n.password,emailToken:g,dob:n.dob,consent:d}),x(20)}catch(l){Ie(!1),v(!1);let $=l.message.toLowerCase(),de=l.data?.needsEmailCode?R("email"):l.data?.tooYoung?R("dob"):$.includes("username")?R("username"):$.includes("email")?R("email"):-1;l.data?.needsEmailCode&&(N(""),B("")),de>=0&&(p("back"),m(de)),r(l.message)}},Q=async l=>{if(l?.preventDefault(),!(!te||f)){if(u==="code")return J();if(u==="username"){v(!0);try{if((await Xe({username:F})).username===!1){v(!1),r(`@${F} is taken. Try another.`);return}}catch($){if(!$.offline){v(!1),r($.message);return}}v(!1)}if(u==="email"){if(O===L||j){Y(R("password"));return}v(!0);try{let $=await K();v(!1),Y(R($?"code":"password"))}catch($){v(!1),r($.message)}return}if(o===le.length-1)return ae();Y(o+1)}},ne=j?le.length-1:le.length,V=j&&o>R("code")?o-1:o;return a`<form class="auth" onSubmit=${Q} novalidate>
    <${Fe} step=${V} total=${ne} dir=${b} onBack=${ee}>
      ${u==="name"&&a`
        <${I} emoji="👋" title="First, what’s your name?" sub="This is how Novum will greet you." />
        <div class="wiz-pair">
          <${D} inputRef=${A} placeholder="First name" autocomplete="given-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${n.firstName} onInput=${l=>{r(""),C({...n,firstName:ze(l.target.value)})}} />
          <${D} placeholder="Last name" autocomplete="family-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${n.lastName} onInput=${l=>{r(""),C({...n,lastName:ze(l.target.value)})}} />
        </div>`}

      ${u==="dob"&&a`
        <${I} emoji="🎂" title="When’s your birthday?" sub=${`Novum is for people aged ${Z} and over. Under 18? Your profile stays private and only buddies can see it.`} />
        <${zt} value=${n.dob} onChange=${l=>{r(""),C({...n,dob:l})}} />
        ${T!=null&&T<Z&&a`<p class="wiz-err">Sorry, Novum is for people aged ${Z} and over. If you want help quitting, talk to a parent, your GP or visit talktofrank.com.</p>`}`}

      ${u==="username"&&a`
        <${I} emoji="✨" title=${`Nice to meet you, ${n.firstName.trim()}. Pick a username.`} sub="You can log in with it. Letters, numbers, dots and underscores." />
        <div class="wiz-at"><span>@</span><${D} inputRef=${A} placeholder="yourname" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" maxlength="20" value=${n.username} onInput=${W("username")} /></div>
        ${F&&!wt.test(F)&&a`<p class="wiz-hint">3–20 characters, no spaces.</p>`}`}

      ${u==="email"&&a`
        <${I} emoji="✉️" title="What’s your email?" sub="Used to log in. Novum won’t send you marketing." />
        <${D} inputRef=${A} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${n.email} onInput=${W("email")} />
        ${he(n.email)&&a`<button type="button" class="email-fix" onClick=${()=>{x(10),r(""),C({...n,email:he(n.email)})}}>
          Did you mean <b>${he(n.email)}</b>? <span>Use it</span></button>`}
        ${!j&&O!==L&&a`<p class="wiz-hint">We’ll email you a 6-digit code to confirm it’s you.</p>`}`}

      ${u==="code"&&a`
        <${I} emoji="📬" title="Check your email." sub=${a`We sent a 6-digit code to <b class="wiz-em">${L}</b>. It can take a minute, so check spam too.`} />
        <${be} email=${L} />
        <${ie} inputRef=${A} value=${h} onChange=${l=>{r(""),P(l)}} onComplete=${J} />
        <${re} sentAt=${k} onResend=${async()=>{r("");try{await K(),X("New code sent")}catch(l){r(l.message)}}} />
        <p class="wiz-hint center">Already have a Novum account with this email? We’ll have emailed you to log in instead.</p>
        <button type="button" class="link center-link" onClick=${()=>Y(R("email"))}>Wrong email? Change it</button>`}

      ${u==="password"&&a`
        <${I} emoji="🔒" title="Finally, create a password." sub="At least 8 characters. A short phrase is easy to remember and hard to guess." />
        <div class="wiz-pw">
          <${D} inputRef=${A} type=${y?"text":"password"} placeholder="Password" autocomplete="new-password" enterkeyhint="done" value=${n.password} onInput=${W("password")} />
          <${$e} on=${y} set=${E} />
        </div>
        ${n.password&&a`<div class="pw-meter"><i style="width:${H?H.w:10}%;background:${H?H.c:"#FF453A"}"></i></div>
          <p class="wiz-hint">${n.password.length<8?`${8-n.password.length} more character${8-n.password.length===1?"":"s"}`:H?.l}</p>`}
        <label class="consent">
          <input type="checkbox" checked=${d} onChange=${l=>{x(6),z(l.target.checked)}} />
          <span class="consent-box">${_.check()}</span>
          <span>I’ve read the <button type="button" class="link inline" onClick=${l=>{l.preventDefault(),kt()}}>privacy notice</button> and agree to Novum storing what I’m quitting, my check-ins and health details to run the app.</span>
        </label>
        <p class="wiz-fine">Your data is encrypted on Novum’s server. Export or delete everything any time in Profile.</p>`}

      <${ue}>${c}<//>
      <div class="ts-box" ref=${q.box}></div>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!te||f}>
          ${f?{password:"Creating your account…",email:"Sending code…",code:"Confirming…"}[u]||"Checking…":u==="password"?"Create account":u==="code"?"Confirm":"Continue"}
        </button>
        ${u==="name"&&a`<button type="button" class="link center-link" onClick=${t}>Already have an account? Log in</button>`}
      </div>
    <//>
  </form>`}function vt({back:s,toSignup:t,startReset:o=!1}){let[m,b]=i(o);return m?a`<${Mt} back=${()=>b(!1)} />`:a`<${Ft} back=${s} toSignup=${t} forgot=${()=>b(!0)} />`}function Mt({back:s}){let[t,o]=i(0),[m,b]=i("fwd"),[p,n]=i(""),[C,d]=i(""),[z,c]=i(""),[r,f]=i(0),[v,y]=i(""),[E,h]=i(!1),P=ce(t),k=p.trim().toLowerCase(),M=N=>{x(),y(""),b(N>t?"fwd":"back"),o(N)},g=async()=>{await at(k),f(Date.now()),d("")},B=async N=>{if(N?.preventDefault(),!E){h(!0),y("");try{if(t===0){await g(),h(!1),M(1);return}if(t===1){h(!1),M(2);return}await nt(k,C,z),x(20),X("Password changed. You’re logged in.")}catch(j){h(!1),y(j.message),t===2&&/code/i.test(j.message)&&(b("back"),o(1),d(""))}}},O=[St.test(k),C.length===6,z.length>=8][t];return a`<form class="auth" onSubmit=${B} novalidate>
    <${Fe} step=${t} total=${3} dir=${m} onBack=${t===0?s:()=>M(t-1)} badge="Reset">
      ${t===0&&a`<${I} emoji="🔐" title="Forgot your password?" sub="Enter your account’s email and we’ll send you a code to set a new one." />
        <${D} inputRef=${P} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" value=${p} onInput=${N=>{y(""),n(N.target.value)}} />`}
      ${t===1&&a`<${I} emoji="📬" title="Check your email." sub=${a`If there’s an account for <b class="wiz-em">${k}</b>, a 6-digit code is on its way. Check spam too.`} />
        <${be} email=${k} />
        <${ie} inputRef=${P} value=${C} onChange=${N=>{y(""),d(N)}} onComplete=${()=>M(2)} />
        <${re} sentAt=${r} onResend=${async()=>{try{await g(),X("New code sent")}catch(N){y(N.message)}}} />`}
      ${t===2&&a`<${I} emoji="🔒" title="Choose a new password." sub="At least 8 characters. You’ll be logged out on other devices." />
        <${D} inputRef=${P} type="password" placeholder="New password" autocomplete="new-password" value=${z} onInput=${N=>{y(""),c(N.target.value)}} />`}
      <${ue}>${v}<//>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!O||E}>${E?"One moment…":["Send code","Continue","Set password and log in"][t]}</button>
      </div>
    <//>
  </form>`}function Ft({back:s,toSignup:t,forgot:o}){let[m,b]=i(""),[p,n]=i(""),[C,d]=i(!1),[z,c]=i(""),[r,f]=i(!1),v=ce(0),y=Ct(),E=async u=>{if(u.preventDefault(),!(!m.trim()||!p||r)){c(""),f(!0);try{let A;try{A=await Ne(m.trim(),p,y.peek())}catch(W){if(!W.data?.turnstile)throw W;y.reset();let R=await y.getToken();if(!R)throw new Error("Couldn’t confirm you’re a person. Wait a moment and try again.");A=await Ne(m.trim(),p,R)}finally{y.reset()}if(A.codeRequired){P({ticket:A.ticket,emailHint:A.emailHint}),B(Date.now()),M(""),f(!1),x(10);return}x(20)}catch(A){c(A.message),f(!1)}}},[h,P]=i(null),[k,M]=i(""),[g,B]=i(0),[O,N]=i(!0),j=ce(h?.ticket),G=async(u=k)=>{if(!(r||u.length!==6)){c(""),f(!0);try{await st(h.ticket,u,O),x(20)}catch(A){f(!1),M(""),c(A.message),A.status===401&&(P(null),n(""))}}};return h?a`<form class="auth" onSubmit=${u=>{u.preventDefault(),G()}} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${()=>{P(null),c(""),f(!1)}} aria-label="Back">${_.left()}</button></div>
      <div class="wiz-body fwd" key="code">
        <${I} emoji="📬" title="Check your email." sub=${a`To keep your account safe, we sent a 6-digit code to <b class="wiz-em">${h.emailHint}</b>. Check spam too.`} />
        <${be} email=${h.emailHint} />
        <${ie} inputRef=${j} value=${k} onChange=${u=>{c(""),M(u)}} onComplete=${G} />
        <div class="card list remember"><div class="row">
          <span class="row-main"><span class="row-title">Remember this device</span><span class="row-sub">Skip the code here for 30 days. Your password is still needed.</span></span>
          <${Ze} on=${O} label="Remember this device" onChange=${N} />
        </div></div>
        <${re} sentAt=${g} onResend=${async()=>{try{await ot(h.ticket),B(Date.now()),M(""),X("New code sent")}catch(u){c(u.message),u.status===401&&P(null)}}} />
        <${ue}>${z}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${k.length!==6||r}>${r?"Checking…":"Log in"}</button>
        </div>
      </div>
    </div>
  </form>`:a`<form class="auth" onSubmit=${E} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${s} aria-label="Back">${_.left()}</button></div>
      <div class="wiz-body fwd">
        <${I} emoji="🔑" title="Welcome back." sub="Log in with your username or email." />
        <${D} inputRef=${v} placeholder="Username or email" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${m} onInput=${u=>{c(""),b(u.target.value)}} />
        <div class="wiz-pw mt12">
          <${D} type=${C?"text":"password"} placeholder="Password" autocomplete="current-password" enterkeyhint="go" value=${p} onInput=${u=>{c(""),n(u.target.value)}} />
          <${$e} on=${C} set=${d} />
        </div>
        <div class="ts-box" ref=${y.box}></div>
        <${ue}>${z}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${!m.trim()||!p||r}>${r?"Logging in…":"Log in"}</button>
          <button type="button" class="link center-link" onClick=${o}>Forgot your password?</button>
          <button type="button" class="link center-link" onClick=${t}>New here? Create an account</button>
        </div>
      </div>
    </div>
  </form>`}var Tt=["January","February","March","April","May","June","July","August","September","October","November","December"];function zt({value:s,onChange:t}){let[o,m,b]=s?s.split("-"):["","",""],p=new Date().getFullYear(),n=Array.from({length:90},(c,r)=>p-10-r),C=o&&m?new Date(+o,+m,0).getDate():31,d=(c,r,f)=>{if(c&&r&&f){let v=new Date(+c,+r,0).getDate();t(`${c}-${r}-${String(Math.min(+f,v)).padStart(2,"0")}`)}else t(`${c||""}-${r||""}-${f||""}`)},z=(c,r,f,v,y)=>a`<label class="dob-f ${y} ${r?"set":""}">
    <span class="dob-l">${c}</span>
    <select value=${r} onChange=${E=>{x(4),v(E.target.value)}}>
      <option value="" disabled selected=${!r}>${c}</option>
      ${f.map(E=>a`<option value=${E.v}>${E.t}</option>`)}
    </select>
    <span class="dob-v">${r?f.find(E=>E.v===r)?.t:"–"}</span>
  </label>`;return a`<div class="dob">
    ${z("Day",b,Array.from({length:C},(c,r)=>({v:String(r+1).padStart(2,"0"),t:String(r+1)})),c=>d(o,m,c),"dob-d")}
    ${z("Month",m,Tt.map((c,r)=>({v:String(r+1).padStart(2,"0"),t:c})),c=>d(o,c,b),"dob-m")}
    ${z("Year",o,n.map(c=>({v:String(c),t:String(c)})),c=>d(c,m,b),"dob-y")}
  </div>`}var ge=["dob","height","weight","habits","details","why","train","look","ready"],yt=()=>Ye(new Date);function Qt({user:s}){let t=Ce(),o=_e(t.profile),m=!!s.dob,[b,p]=i(m?1:0),[n,C]=i("fwd"),d=ge[b],z=ce(b),[c,r]=i(t.profile.dob||s.dob||""),[f,v]=i("cm"),[y,E]=i("kg"),[h,P]=i(()=>{let e=t.profile.heightCm,S=e?e/2.54:0;return{cm:e?String(e):"",ft:e?String(Math.floor(S/12)):"",inch:e?String(Math.round(S%12)):""}}),[k,M]=i(()=>{let e=o?+o.toFixed(1):0,S=e*2.20462;return{kg:e?String(e):"",st:e?String(Math.floor(S/14)):"",lb:e?String(Math.round(S%14)):""}}),[g,B]=i(()=>t.quits.map(e=>e.kind)),[O,N]=i(()=>t.quits.find(e=>e.kind==="other")?.label||""),[j,G]=i(()=>Object.fromEntries(t.quits.map(e=>[e.kind,{start:e.start,monthly:String(e.monthly??"")}]))),[u,A]=i(()=>t.reasons.map(e=>e.text)),[W,R]=i(""),[Y,ee]=i(""),[F,L]=i(""),te=()=>Math.random().toString(36).slice(2,8),[T,q]=i(()=>({avatar:t.social?.avatar||{style:["adventurer","big-smile","lorelei","notionists"][Math.floor(Math.random()*4)],seed:te(),bg:["b6e3f4","c0aede","ffdfbf","c1f4c5"][Math.floor(Math.random()*4)]},banner:t.social?.banner||{style:["mesh","aurora"][Math.floor(Math.random()*2)],palette:Object.keys(De)[Math.floor(Math.random()*Object.keys(De).length)],seed:te()}})),K=f==="cm"?parseFloat(h.cm):(parseFloat(h.ft)||0)*30.48+(parseFloat(h.inch)||0)*2.54,J=y==="kg"?parseFloat(k.kg):((parseFloat(k.st)||0)*14+(parseFloat(k.lb)||0))/2.20462,H=/^\d{4}-\d{2}-\d{2}$/.test(c),ae=H?me({dob:c}):null,Q=e=>j[e]||{start:yt(),monthly:""},ne={dob:H&&ae>=Z,height:K>=100&&K<=250,weight:J>=30&&J<=300,habits:!g.includes("other")||O.trim(),details:g.every(e=>{let S=Q(e);return S.start&&!Number.isNaN(Be(S.start).getTime())}),why:!0,train:!0,look:!0,ready:!0}[d],V=e=>{x(),C(e>b?"fwd":"back"),p(e),window.scrollTo(0,0)},l=e=>{if(e?.preventDefault(),!!ne){if(d==="habits"&&g.length===0){V(ge.indexOf("train"));return}V(b+1)}},$=()=>{if(d==="train"&&g.length===0){V(ge.indexOf("habits"));return}V(b-1)},de=e=>{if(x(),g.includes(e)){B(g.filter(S=>S!==e));return}B([...g,e]),j[e]||G({...j,[e]:{start:yt(),monthly:""}})},Te=(e,S)=>G({...j,[e]:{...Q(e),...S}}),we=e=>{e=e.trim(),!(!e||u.includes(e))&&(x(10),A([...u,e]),R(""))},xt=()=>{x(25),qe(e=>{e.profile.dob=c,e.profile.heightCm=Math.round(K);let S=+J.toFixed(1);if(!o||Math.abs(o-S)>=.05){let w=Le();e.profile.weights=(e.profile.weights||[]).filter(oe=>oe.date!==w),e.profile.weights.push({date:w,kg:S})}let U=Object.fromEntries(e.quits.map(w=>[w.kind,w]));e.quits=g.map(w=>{let oe=Se(w),je=Q(w);return{best:0,resets:[],...U[w]||{},id:U[w]?.id||w,kind:w,label:w==="other"?O.trim():U[w]?.label||oe.label,emoji:U[w]?.emoji||oe.emoji,color:U[w]?.color||oe.color,start:je.start,monthly:parseFloat(je.monthly)||0}});let se=new Set(e.reasons.map(w=>w.text));u.filter(w=>!se.has(w)).forEach(w=>e.reasons.push({id:Ue(),text:w})),e.reasons=e.reasons.filter(w=>u.includes(w.text)),e.social={...e.social,avatar:T.avatar,banner:T.banner},e.setupDone=!0}),F&&!Ce().fitness.routines.some(e=>e.prog===F)&&gt(F,{quiet:!0}),lt()&&$t(),!s.dob&&c&&it({dob:c}).catch(()=>{}),X(`Welcome to Novum, ${s.firstName} 💙`)},Nt=async()=>{ee("");try{await ct(),ee("on"),x(15)}catch(e){ee(e.message)}},ve=ne&&d==="weight"?Ge(J,K):null,At=d==="why"&&u.length===0?"Skip for now":d==="habits"&&g.length===0?"Nothing, I’m here for fitness":d==="train"&&!F?"Not now":"Continue";return a`<form class="auth" onSubmit=${l} novalidate>
    <${Fe} step=${b} total=${ge.length} dir=${n} onBack=${b>(m?1:0)?$:null} badge="Day Zero">
      ${d==="dob"&&a`
        <${I} emoji="🎂" title=${`Hi ${s.firstName}. When’s your birthday?`} sub="Day Zero sets your baseline. Only you can see this." />
        <${zt} value=${c} onChange=${r} />
        ${H&&a`<p class="wiz-big-note">${ae} years old</p>`}
        ${H&&ae<Z&&a`<${ue}>Novum is for ages ${Z} and up.<//>`}`}

      ${d==="height"&&a`
        <${I} emoji="📏" title="How tall are you?" />
        <div class="wiz-unit"><${xe} options=${[{value:"cm",label:"cm"},{value:"ft",label:"ft & in"}]} value=${f} onChange=${v} /></div>
        ${f==="cm"?a`<div class="wiz-num"><${D} inputRef=${z} type="number" inputmode="decimal" placeholder="181" value=${h.cm} onInput=${e=>P({...h,cm:e.target.value})} /><span>cm</span></div>`:a`<div class="wiz-pair">
              <div class="wiz-num"><${D} inputRef=${z} type="number" inputmode="numeric" placeholder="5" value=${h.ft} onInput=${e=>P({...h,ft:e.target.value})} /><span>ft</span></div>
              <div class="wiz-num"><${D} type="number" inputmode="numeric" placeholder="11" value=${h.inch} onInput=${e=>P({...h,inch:e.target.value})} /><span>in</span></div></div>`}`}

      ${d==="weight"&&a`
        <${I} emoji="⚖️" title="And your weight?" sub="Used for BMI and to track changes over time." />
        <div class="wiz-unit"><${xe} options=${[{value:"kg",label:"kg"},{value:"st",label:"st & lb"}]} value=${y} onChange=${E} /></div>
        ${y==="kg"?a`<div class="wiz-num"><${D} inputRef=${z} type="number" inputmode="decimal" step="0.1" placeholder="70.2" value=${k.kg} onInput=${e=>M({...k,kg:e.target.value})} /><span>kg</span></div>`:a`<div class="wiz-pair">
              <div class="wiz-num"><${D} inputRef=${z} type="number" inputmode="numeric" placeholder="11" value=${k.st} onInput=${e=>M({...k,st:e.target.value})} /><span>st</span></div>
              <div class="wiz-num"><${D} type="number" inputmode="decimal" placeholder="1" value=${k.lb} onInput=${e=>M({...k,lb:e.target.value})} /><span>lb</span></div></div>`}
        ${ve&&a`<p class="wiz-big-note">BMI ${ve.toFixed(1)} · ${Ke(ve).label}</p>`}`}

      ${d==="habits"&&a`
        <${I} emoji="🚪" title="What are you leaving behind?" sub="Pick everything you’re quitting. Each gets its own counter, milestones and money tracker." />
        <div class="pick-grid">
          ${Oe.map(e=>a`<button type="button" class="pick ${g.includes(e.kind)?"on":""}" style="--c:${e.color}" onClick=${()=>de(e.kind)} aria-pressed=${g.includes(e.kind)}>
            <span class="pick-e">${e.emoji}</span><span class="pick-l">${e.label}</span><span class="pick-tick">${_.check()}</span>
          </button>`)}
        </div>
        ${g.includes("other")&&a`<${D} class="wiz-in mt12" placeholder="What is it? e.g. Social media" maxlength="24" value=${O} onInput=${e=>N(e.target.value)} />`}`}

      ${d==="details"&&a`
        <${I} emoji="🗓️" title="When did you stop?" sub="The last time you used it. Quitting soon? Pick the date and Novum counts down to it." />
        ${g.map(e=>{let S=Se(e),U=Q(e);return a`<div class="card dz-q" key=${e}>
            <div class="dz-q-h"><span class="row-ic" style="background:${S.color}">${S.emoji}</span><b>${e==="other"?O:S.label}</b></div>
            <label class="dz-f"><span>Quit</span><input type="datetime-local" value=${U.start} onInput=${se=>Te(e,{start:se.target.value})} /></label>
            <label class="dz-f"><span>Cost per month</span><span class="dz-money">£<input type="number" inputmode="decimal" placeholder="0" value=${U.monthly} onInput=${se=>Te(e,{monthly:se.target.value})} /></span></label>
            ${parseFloat(U.monthly)>0&&a`<p class="dz-save">${He(parseFloat(U.monthly)*12,0)} a year back in your pocket</p>`}
          </div>`})}`}

      ${d==="why"&&a`
        <${I} emoji="💙" title="Why are you doing this?" sub="In your own words. Novum shows these when cravings hit." />
        <div class="wiz-add">
          <${D} inputRef=${z} placeholder="I’m doing this because…" maxlength="140" enterkeyhint="done" value=${W} onInput=${e=>R(e.target.value)}
            onKeyDown=${e=>{e.key==="Enter"&&(e.preventDefault(),we(W))}} />
          <button type="button" class="btn btn-primary sm" disabled=${!W.trim()} onClick=${()=>we(W)}>Add</button>
        </div>
        ${u.length>0&&a`<div class="card list mt12">${u.map(e=>a`<div class="row pop" key=${e}>
          <span class="row-main"><span class="row-title">${e}</span></span>
          <button type="button" class="icon-btn muted" aria-label="Remove" onClick=${()=>A(u.filter(S=>S!==e))}>${_.trash()}</button></div>`)}</div>`}
        <div class="chip-row dz-ideas">${We.filter(e=>!u.includes(e)).slice(0,5).map(e=>a`<button type="button" class="chip big" onClick=${()=>we(e)}>+ ${e}</button>`)}</div>`}

      ${d==="train"&&a`
        <${I} emoji="🏋️" title=${g.length?"Want to train too?":"Let’s get you training."} sub="Pick a starter plan and it’ll be waiting in Fitness. You can change it, or build your own, any time." />
        <div class="dz-plans">
          ${ft.map(e=>a`<button type="button" key=${e.id} class="card dz-plan ${F===e.id?"on":""}" aria-pressed=${F===e.id} onClick=${()=>{x(),L(F===e.id?"":e.id)}}>
            <span class="dz-plan-e">${e.e}</span><span class="row-main"><b>${e.name}</b><small>${e.days} · ${e.d}</small></span><span class="pick-tick">${_.check()}</span>
          </button>`)}
        </div>`}

      ${d==="look"&&a`
        <${I} emoji="🎨" title="Make it yours." sub="Pick a cartoon avatar and a banner. Only your buddies see your profile unless you make it public later." />
        <div class="ep-top dz-look">
          <button type="button" class="ep-banner" aria-label="Change banner" onClick=${()=>Ee(T.banner,e=>q({...T,banner:e}))}><${bt} b=${T.banner} /><span class="ph-banner-edit">🎨</span></button>
          <button type="button" class="ep-av" aria-label="Change avatar" onClick=${()=>Me(T.avatar,e=>q({...T,avatar:e}))}><${ht} a=${T.avatar} name=${s.firstName} size=${104} /></button>
          <div class="dz-look-name">${s.firstName} ${s.lastName}<span>@${s.username}</span></div>
        </div>
        <div class="dz-look-btns">
          <button type="button" class="btn btn-tinted" onClick=${()=>Me(T.avatar,e=>q({...T,avatar:e}))}>Change avatar</button>
          <button type="button" class="btn btn-tinted" onClick=${()=>Ee(T.banner,e=>q({...T,banner:e}))}>Change banner</button>
        </div>`}

      ${d==="ready"&&a`
        <div class="dz-ready">
          <div class="ready-ring"><span>✓</span></div>
          <h1 class="wiz-q center">You’re set, ${s.firstName}.</h1>
          <p class="wiz-sub center">${g.length?`Tracking ${g.length} ${g.length===1?"thing":"things"}. Every hour from here counts.`:`${F?"Your training plan is waiting in Fitness.":"Head to Fitness to start your first workout."}`}</p>
        </div>
        <div class="card list">
          <div class="row"><span class="row-ic" style="background:#FF453A">🔔</span>
            <span class="row-main"><span class="row-title">Reminders and milestones</span>
              <span class="row-sub">${Y==="on"?"On. You’re all set.":Y||(Ae()?"A nudge when you hit milestones and at check-in time.":"Add Novum to your Home Screen first, then turn these on in Profile.")}</span></span>
            ${Ae()&&Y!=="on"&&a`<button type="button" class="btn btn-tinted sm" onClick=${Nt}>Turn on</button>`}
          </div>
        </div>
        <${Re} />`}

      <div class="wiz-actions">
        ${d==="ready"?a`<button type="button" class="btn btn-primary block big glow" onClick=${xt}>Start my new standard</button>`:a`<button type="submit" class="btn btn-primary block big" disabled=${!ne}>${At}</button>`}
      </div>
    <//>
  </form>`}export{Zt as AuthScreen,ie as CodeInput,Qt as DayZero,$e as EyeButton,Z as MIN_AGE,re as Resend,It as consumeNewSignup};
