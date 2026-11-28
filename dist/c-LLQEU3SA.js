import{e as xe,f as it,l as rt,p as lt,r as ct,s as ut,t as dt,v as Ae,x as pt}from"./c-QY4VOAUP.js";import{c as De,i as $t,j as Ee}from"./c-SN7DIM7B.js";import"./c-UA2VBOLU.js";import{a as Ie,d as mt,e as Re}from"./c-77WDBGBN.js";import{a as Ne,b as zt,c as pe,d as oe,e as ie,f as me,g as $e}from"./c-RARAZH47.js";import{K as ot,f as Ze,g as Qe,h as Ve,i as Xe,j as et,k as tt,l as ze,m as at,n as nt,q as st}from"./c-HECOZTOP.js";import{Aa as J,I as je,Ja as Ce,K as Oe,Ka as Ke,L as We,Q as Le,R as Be,Ra as ee,T as He,Ua as Je,X as Ue,b as i,c as ve,e as ue,f as a,g as ye,j as Fe,k as ke,la as Ye,ma as de,na as qe,oa as _e,v as Te,xa as Se,ya as I,za as Ge}from"./c-RJXFU2EW.js";var gt=Je(()=>import("./c-HLJCBISQ.js"),"openPrivacy"),Z=16,bt=/^[a-zA-Z0-9_.]{3,20}$/,wt=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;function Me({step:s,total:t,dir:o,onBack:m,badge:b,children:p}){return a`<div class="wiz">
    <div class="wiz-top">
      ${m?a`<button class="icon-btn" type="button" onClick=${m} aria-label="Back">${J.left()}</button>`:a`<span class="wiz-spacer"></span>`}
      <div class="wiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax=${t} aria-valuenow=${s+1}><i style="width:${(s+1)/t*100}%"></i></div>
      <span class="wiz-badge">${b||`${s+1}/${t}`}</span>
    </div>
    <div class="wiz-body ${o}" key=${s}>${p}</div>
  </div>`}function R({emoji:s,title:t,sub:o}){return a`${s&&a`<div class="wiz-emoji">${s}</div>`}<h1 class="wiz-q">${t}</h1>${o&&a`<p class="wiz-sub">${o}</p>`}`}function le(s){let t=ue();return ve(()=>{let o=setTimeout(()=>t.current?.focus({preventScroll:!0}),380);return()=>clearTimeout(o)},[s]),t}function E({inputRef:s,...t}){return a`<input class="wiz-in" ref=${s} ...${t} />`}function ce({children:s}){return s?a`<p class="wiz-err" role="alert">${s}</p>`:null}var be=null;function xt(){return window.turnstile?Promise.resolve(window.turnstile):(be||(be=new Promise((s,t)=>{let o=document.createElement("script");o.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",o.async=!0,o.onload=()=>s(window.turnstile),o.onerror=()=>{be=null,t(new Error("turnstile"))},document.head.appendChild(o)})),be)}function vt(){let s=ue(),t=ue({key:"",id:null,token:"",waiters:[]});return ve(()=>{let p=!1;return ot().then(async n=>{if(p||!n.turnstileSiteKey)return;t.current.key=n.turnstileSiteKey;let z=await xt();p||!s.current||(t.current.id=z.render(s.current,{sitekey:n.turnstileSiteKey,appearance:"interaction-only",theme:"dark",callback:d=>{t.current.token=d,t.current.waiters.splice(0).forEach(x=>x(d))},"expired-callback":()=>{t.current.token=""},"error-callback":()=>{t.current.token=""}}))}).catch(()=>{}),()=>{p=!0;try{t.current.id!=null&&window.turnstile?.remove(t.current.id)}catch{}}},[]),{box:s,getToken:()=>{let p=t.current;return p.key?p.token?Promise.resolve(p.token):new Promise(n=>{p.waiters.push(n),setTimeout(()=>n(""),15e3)}):Promise.resolve("")},reset:()=>{let p=t.current;p.token="";try{p.id!=null&&window.turnstile.reset(p.id)}catch{}},peek:()=>t.current.token}}function Yt(){let[s,t]=i(location.hash==="#reset"?"reset":ct()?"install":"welcome");return s==="reset"?a`<${ht} startReset back=${()=>{history.replaceState(null,"",location.pathname),t("welcome")}} toSignup=${()=>t("signup")} />`:s==="install"?a`<div class="auth ig-screen"><${dt} skipLabel=${lt().kind==="inapp"?"Continue here anyway":"Continue in the browser"} onSkip=${()=>{ut(),t("welcome")}} /></div>`:s==="signup"?a`<${It} back=${()=>t("welcome")} toLogin=${()=>t("login")} />`:s==="login"?a`<${ht} back=${()=>t("welcome")} toSignup=${()=>t("signup")} />`:a`<div class="auth welcome">
    <div class="wl-sky" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i></div>
    <div class="wl-hero">
      <div class="wl-mark">
        <svg class="wl-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" /><circle class="fg" cx="60" cy="60" r="54" /></svg>
        <img src="icons/icon-192.png" alt="" width="84" height="84" class="wl-logo" />
      </div>
      <h1 class="wl-name">NOVUM</h1>
      <p class="wl-tag">${ye.map((o,m)=>a`<span>${m===ye.length-1?a`<b>${o}</b>`:o}</span>`)}</p>
    </div>
    <${At} />
    <div class="wl-actions">
      ${De()&&a`<p class="add-hint">🤝 Sign up or log in and you can add <b>@${De()}</b> as your buddy straight away.</p>`}
      <button class="btn btn-primary block big glow" onClick=${()=>{I(),t("signup")}}>Get started. It’s free</button>
      <button class="btn btn-plain block big" onClick=${()=>{I(),t("login")}}>I already have an account</button>
      <p class="wl-fine">🔒 Private by default · Encrypted · <button type="button" class="link inline" onClick=${gt}>Privacy</button></p>
      <${Ae} />
    </div>
  </div>`}var Nt=Date.now()-(16*864e5+4*36e5+22*6e4);function At(){let t=Ge(1e3)-Nt,o=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),b=Math.floor(t%36e5/6e4),p=Math.floor(t%6e4/1e3),n=d=>String(d).padStart(2,"0"),z=45*t/864e5/30.4375;return a`<div class="wl-demo" aria-hidden="true">
    <div class="wd-card wd-streak">
      <div class="wd-k">💨 Vape-free</div>
      <div class="wd-time"><b>${o}</b><small>d</small> <b>${n(m)}</b><small>h</small> <b>${n(b)}</b><small>m</small> <b class="dim">${n(p)}</b><small>s</small></div>
    </div>
    <div class="wd-row">
      <div class="wd-card wd-money"><div class="wd-k">💷 Saved</div><b>£${z.toFixed(2)}</b></div>
      <div class="wd-card wd-badge"><span>🏅</span><div><b>2 weeks</b><small>unlocked</small></div></div>
    </div>
    <div class="wd-card wd-cheer"><span class="wd-av">J</span><span><b>Jamie</b> sent you 💪 <small>keep going</small></span></div>
  </div>`}var re=["name","dob","username","email","code","password"];function It({back:s,toLogin:t}){let[o,m]=i(0),[b,p]=i("fwd"),[n,z]=i({firstName:"",lastName:"",username:"",email:"",password:"",dob:""}),[d,x]=i(!1),[c,r]=i(""),[f,v]=i(!1),[y,M]=i(!1),[h,P]=i(""),[S,F]=i(0),[w,W]=i(""),[j,N]=i(""),[T,q]=i(!1),u=re[o],A=le(o),O=l=>$=>{r(""),z({...n,[l]:$.target.value})},D=l=>re.indexOf(l),L=l=>{I(),r(""),p(l>o?"fwd":"back"),m(l)},te=()=>o===0?s():L(u==="password"?D("email"):o-1),U=n.username.trim().replace(/^@/,""),k=n.email.trim().toLowerCase(),_={name:n.firstName.trim()&&n.lastName.trim(),dob:/^\d{4}-\d{2}-\d{2}$/.test(n.dob)&&de({dob:n.dob})>=Z,username:bt.test(U),email:wt.test(k),code:h.length===6,password:n.password.length>=8&&d}[u],G=/^\d{4}-\d{2}-\d{2}$/.test(n.dob)?de({dob:n.dob}):null,Y=vt(),K=async()=>{let l=await Y.getToken(),$;try{$=await Ve(k,n.firstName.trim(),l)}finally{Y.reset()}return $.skipped?(q(!0),!1):(F(Date.now()),P(""),!0)},Q=async(l=h)=>{if(!(f||l.length!==6)){v(!0),r("");try{let $=await Xe(k,l);W($.emailToken),N(k),v(!1),I(20),L(D("password"))}catch($){v(!1),r($.message),P("")}}},B=(()=>{let l=n.password,$=0;return l.length>=8&&$++,l.length>=12&&$++,/[A-Z]/.test(l)&&/[a-z]/.test(l)&&$++,(/\d/.test(l)||/[^\w]/.test(l))&&$++,[null,{l:"Weak",c:"#FF453A",w:25},{l:"Okay",c:"#FF9F0A",w:50},{l:"Good",c:"#30D158",w:75},{l:"Strong",c:"#30D158",w:100}][$]})(),ae=async()=>{v(!0),r("");try{Ne(!0),await Ze({firstName:n.firstName.trim(),lastName:n.lastName.trim(),username:U,email:k,password:n.password,emailToken:w,dob:n.dob,consent:d}),I(20)}catch(l){Ne(!1),v(!1);let $=l.message.toLowerCase(),X=l.data?.needsEmailCode?D("email"):l.data?.tooYoung?D("dob"):$.includes("username")?D("username"):$.includes("email")?D("email"):-1;l.data?.needsEmailCode&&(N(""),W("")),X>=0&&(p("back"),m(X)),r(l.message)}},V=async l=>{if(l?.preventDefault(),!(!_||f)){if(u==="code")return Q();if(u==="username"){v(!0);try{if((await Qe({username:U})).username===!1){v(!1),r(`@${U} is taken. Try another.`);return}}catch($){if(!$.offline){v(!1),r($.message);return}}v(!1)}if(u==="email"){if(j===k||T){L(D("password"));return}v(!0);try{let $=await K();v(!1),L(D($?"code":"password"))}catch($){v(!1),r($.message)}return}if(o===re.length-1)return ae();L(o+1)}},fe=T?re.length-1:re.length,ge=T&&o>D("code")?o-1:o;return a`<form class="auth" onSubmit=${V} novalidate>
    <${Me} step=${ge} total=${fe} dir=${b} onBack=${te}>
      ${u==="name"&&a`
        <${R} emoji="👋" title="First, what’s your name?" sub="This is how Novum will greet you." />
        <div class="wiz-pair">
          <${E} inputRef=${A} placeholder="First name" autocomplete="given-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${n.firstName} onInput=${l=>{r(""),z({...n,firstName:Se(l.target.value)})}} />
          <${E} placeholder="Last name" autocomplete="family-name" autocapitalize="words" enterkeyhint="next" maxlength="50" value=${n.lastName} onInput=${l=>{r(""),z({...n,lastName:Se(l.target.value)})}} />
        </div>`}

      ${u==="dob"&&a`
        <${R} emoji="🎂" title="When’s your birthday?" sub=${`Novum is for people aged ${Z} and over. Under 18? Your profile stays private and only buddies can see it.`} />
        <${yt} value=${n.dob} onChange=${l=>{r(""),z({...n,dob:l})}} />
        ${G!=null&&G<Z&&a`<p class="wiz-err">Sorry, Novum is for people aged ${Z} and over. If you want help quitting, talk to a parent, your GP or visit talktofrank.com.</p>`}`}

      ${u==="username"&&a`
        <${R} emoji="✨" title=${`Nice to meet you, ${n.firstName.trim()}. Pick a username.`} sub="You can log in with it. Letters, numbers, dots and underscores." />
        <div class="wiz-at"><span>@</span><${E} inputRef=${A} placeholder="yourname" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" maxlength="20" value=${n.username} onInput=${O("username")} /></div>
        ${U&&!bt.test(U)&&a`<p class="wiz-hint">3–20 characters, no spaces.</p>`}`}

      ${u==="email"&&a`
        <${R} emoji="✉️" title="What’s your email?" sub="Used to log in. Novum won’t send you marketing." />
        <${E} inputRef=${A} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${n.email} onInput=${O("email")} />
        ${$e(n.email)&&a`<button type="button" class="email-fix" onClick=${()=>{I(10),r(""),z({...n,email:$e(n.email)})}}>
          Did you mean <b>${$e(n.email)}</b>? <span>Use it</span></button>`}
        ${!T&&j!==k&&a`<p class="wiz-hint">We’ll email you a 6-digit code to confirm it’s you.</p>`}`}

      ${u==="code"&&a`
        <${R} emoji="📬" title="Check your email." sub=${a`We sent a 6-digit code to <b class="wiz-em">${k}</b>. It can take a minute, so check spam too.`} />
        <${me} email=${k} />
        <${oe} inputRef=${A} value=${h} onChange=${l=>{r(""),P(l)}} onComplete=${Q} />
        <${ie} sentAt=${S} onResend=${async()=>{r("");try{await K(),ee("New code sent")}catch(l){r(l.message)}}} />
        <p class="wiz-hint center">Already have a Novum account with this email? We’ll have emailed you to log in instead.</p>
        <button type="button" class="link center-link" onClick=${()=>L(D("email"))}>Wrong email? Change it</button>`}

      ${u==="password"&&a`
        <${R} emoji="🔒" title="Finally, create a password." sub="At least 8 characters. A short phrase is easy to remember and hard to guess." />
        <div class="wiz-pw">
          <${E} inputRef=${A} type=${y?"text":"password"} placeholder="Password" autocomplete="new-password" enterkeyhint="done" value=${n.password} onInput=${O("password")} />
          <${pe} on=${y} set=${M} />
        </div>
        ${n.password&&a`<div class="pw-meter"><i style="width:${B?B.w:10}%;background:${B?B.c:"#FF453A"}"></i></div>
          <p class="wiz-hint">${n.password.length<8?`${8-n.password.length} more character${8-n.password.length===1?"":"s"}`:B?.l}</p>`}
        <label class="consent">
          <input type="checkbox" checked=${d} onChange=${l=>{I(6),x(l.target.checked)}} />
          <span class="consent-box">${J.check()}</span>
          <span>I’ve read the <button type="button" class="link inline" onClick=${l=>{l.preventDefault(),gt()}}>privacy notice</button> and agree to Novum storing what I’m quitting, my check-ins and health details to run the app.</span>
        </label>
        <p class="wiz-fine">Your data is encrypted on Novum’s server. Export or delete everything any time in Profile.</p>`}

      <${ce}>${c}<//>
      <div class="ts-box" ref=${Y.box}></div>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!_||f}>
          ${f?{password:"Creating your account…",email:"Sending code…",code:"Confirming…"}[u]||"Checking…":u==="password"?"Create account":u==="code"?"Confirm":"Continue"}
        </button>
        ${u==="name"&&a`<button type="button" class="link center-link" onClick=${t}>Already have an account? Log in</button>`}
      </div>
    <//>
  </form>`}function ht({back:s,toSignup:t,startReset:o=!1}){let[m,b]=i(o);return m?a`<${Rt} back=${()=>b(!1)} />`:a`<${Dt} back=${s} toSignup=${t} forgot=${()=>b(!0)} />`}function Rt({back:s}){let[t,o]=i(0),[m,b]=i("fwd"),[p,n]=i(""),[z,d]=i(""),[x,c]=i(""),[r,f]=i(0),[v,y]=i(""),[M,h]=i(!1),P=le(t),S=p.trim().toLowerCase(),F=N=>{I(),y(""),b(N>t?"fwd":"back"),o(N)},w=async()=>{await et(S),f(Date.now()),d("")},W=async N=>{if(N?.preventDefault(),!M){h(!0),y("");try{if(t===0){await w(),h(!1),F(1);return}if(t===1){h(!1),F(2);return}await tt(S,z,x),I(20),ee("Password changed. You’re logged in.")}catch(T){h(!1),y(T.message),t===2&&/code/i.test(T.message)&&(b("back"),o(1),d(""))}}},j=[wt.test(S),z.length===6,x.length>=8][t];return a`<form class="auth" onSubmit=${W} novalidate>
    <${Me} step=${t} total=${3} dir=${m} onBack=${t===0?s:()=>F(t-1)} badge="Reset">
      ${t===0&&a`<${R} emoji="🔐" title="Forgot your password?" sub="Enter your account’s email and we’ll send you a code to set a new one." />
        <${E} inputRef=${P} type="email" inputmode="email" placeholder="you@example.com" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false" value=${p} onInput=${N=>{y(""),n(N.target.value)}} />`}
      ${t===1&&a`<${R} emoji="📬" title="Check your email." sub=${a`If there’s an account for <b class="wiz-em">${S}</b>, a 6-digit code is on its way. Check spam too.`} />
        <${me} email=${S} />
        <${oe} inputRef=${P} value=${z} onChange=${N=>{y(""),d(N)}} onComplete=${()=>F(2)} />
        <${ie} sentAt=${r} onResend=${async()=>{try{await w(),ee("New code sent")}catch(N){y(N.message)}}} />`}
      ${t===2&&a`<${R} emoji="🔒" title="Choose a new password." sub="At least 8 characters. You’ll be logged out on other devices." />
        <${E} inputRef=${P} type="password" placeholder="New password" autocomplete="new-password" value=${x} onInput=${N=>{y(""),c(N.target.value)}} />`}
      <${ce}>${v}<//>
      <div class="wiz-actions">
        <button class="btn btn-primary block big" type="submit" disabled=${!j||M}>${M?"One moment…":["Send code","Continue","Set password and log in"][t]}</button>
      </div>
    <//>
  </form>`}function Dt({back:s,toSignup:t,forgot:o}){let[m,b]=i(""),[p,n]=i(""),[z,d]=i(!1),[x,c]=i(""),[r,f]=i(!1),v=le(0),y=vt(),M=async u=>{if(u.preventDefault(),!(!m.trim()||!p||r)){c(""),f(!0);try{let A;try{A=await ze(m.trim(),p,y.peek())}catch(O){if(!O.data?.turnstile)throw O;y.reset();let D=await y.getToken();if(!D)throw new Error("Couldn’t confirm you’re a person. Wait a moment and try again.");A=await ze(m.trim(),p,D)}finally{y.reset()}if(A.codeRequired){P({ticket:A.ticket,emailHint:A.emailHint}),W(Date.now()),F(""),f(!1),I(10);return}I(20)}catch(A){c(A.message),f(!1)}}},[h,P]=i(null),[S,F]=i(""),[w,W]=i(0),[j,N]=i(!0),T=le(h?.ticket),q=async(u=S)=>{if(!(r||u.length!==6)){c(""),f(!0);try{await at(h.ticket,u,j),I(20)}catch(A){f(!1),F(""),c(A.message),A.status===401&&(P(null),n(""))}}};return h?a`<form class="auth" onSubmit=${u=>{u.preventDefault(),q()}} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${()=>{P(null),c(""),f(!1)}} aria-label="Back">${J.left()}</button></div>
      <div class="wiz-body fwd" key="code">
        <${R} emoji="📬" title="Check your email." sub=${a`To keep your account safe, we sent a 6-digit code to <b class="wiz-em">${h.emailHint}</b>. Check spam too.`} />
        <${me} email=${h.emailHint} />
        <${oe} inputRef=${T} value=${S} onChange=${u=>{c(""),F(u)}} onComplete=${q} />
        <div class="card list remember"><div class="row">
          <span class="row-main"><span class="row-title">Remember this device</span><span class="row-sub">Skip the code here for 30 days. Your password is still needed.</span></span>
          <${Ke} on=${j} label="Remember this device" onChange=${N} />
        </div></div>
        <${ie} sentAt=${w} onResend=${async()=>{try{await nt(h.ticket),W(Date.now()),F(""),ee("New code sent")}catch(u){c(u.message),u.status===401&&P(null)}}} />
        <${ce}>${x}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${S.length!==6||r}>${r?"Checking…":"Log in"}</button>
        </div>
      </div>
    </div>
  </form>`:a`<form class="auth" onSubmit=${M} novalidate>
    <div class="wiz">
      <div class="wiz-top"><button class="icon-btn" type="button" onClick=${s} aria-label="Back">${J.left()}</button></div>
      <div class="wiz-body fwd">
        <${R} emoji="🔑" title="Welcome back." sub="Log in with your username or email." />
        <${E} inputRef=${v} placeholder="Username or email" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="next" value=${m} onInput=${u=>{c(""),b(u.target.value)}} />
        <div class="wiz-pw mt12">
          <${E} type=${z?"text":"password"} placeholder="Password" autocomplete="current-password" enterkeyhint="go" value=${p} onInput=${u=>{c(""),n(u.target.value)}} />
          <${pe} on=${z} set=${d} />
        </div>
        <div class="ts-box" ref=${y.box}></div>
        <${ce}>${x}<//>
        <div class="wiz-actions">
          <button class="btn btn-primary block big" type="submit" disabled=${!m.trim()||!p||r}>${r?"Logging in…":"Log in"}</button>
          <button type="button" class="link center-link" onClick=${o}>Forgot your password?</button>
          <button type="button" class="link center-link" onClick=${t}>New here? Create an account</button>
        </div>
      </div>
    </div>
  </form>`}var Et=["January","February","March","April","May","June","July","August","September","October","November","December"];function yt({value:s,onChange:t}){let[o,m,b]=s?s.split("-"):["","",""],p=new Date().getFullYear(),n=Array.from({length:90},(c,r)=>p-10-r),z=o&&m?new Date(+o,+m,0).getDate():31,d=(c,r,f)=>{if(c&&r&&f){let v=new Date(+c,+r,0).getDate();t(`${c}-${r}-${String(Math.min(+f,v)).padStart(2,"0")}`)}else t(`${c||""}-${r||""}-${f||""}`)},x=(c,r,f,v,y)=>a`<label class="dob-f ${y} ${r?"set":""}">
    <span class="dob-l">${c}</span>
    <select value=${r} onChange=${M=>{I(4),v(M.target.value)}}>
      <option value="" disabled selected=${!r}>${c}</option>
      ${f.map(M=>a`<option value=${M.v}>${M.t}</option>`)}
    </select>
    <span class="dob-v">${r?f.find(M=>M.v===r)?.t:"–"}</span>
  </label>`;return a`<div class="dob">
    ${x("Day",b,Array.from({length:z},(c,r)=>({v:String(r+1).padStart(2,"0"),t:String(r+1)})),c=>d(o,m,c),"dob-d")}
    ${x("Month",m,Et.map((c,r)=>({v:String(r+1).padStart(2,"0"),t:c})),c=>d(o,c,b),"dob-m")}
    ${x("Year",o,n.map(c=>({v:String(c),t:String(c)})),c=>d(c,m,b),"dob-y")}
  </div>`}var he=["dob","height","weight","habits","details","why","look","ready"],ft=()=>We(new Date);function qt({user:s}){let t=He(),o=Ye(t.profile),m=!!s.dob,[b,p]=i(m?1:0),[n,z]=i("fwd"),d=he[b],x=le(b),[c,r]=i(t.profile.dob||s.dob||""),[f,v]=i("cm"),[y,M]=i("kg"),[h,P]=i(()=>{let e=t.profile.heightCm,C=e?e/2.54:0;return{cm:e?String(e):"",ft:e?String(Math.floor(C/12)):"",inch:e?String(Math.round(C%12)):""}}),[S,F]=i(()=>{let e=o?+o.toFixed(1):0,C=e*2.20462;return{kg:e?String(e):"",st:e?String(Math.floor(C/14)):"",lb:e?String(Math.round(C%14)):""}}),[w,W]=i(()=>t.quits.map(e=>e.kind)),[j,N]=i(()=>t.quits.find(e=>e.kind==="other")?.label||""),[T,q]=i(()=>Object.fromEntries(t.quits.map(e=>[e.kind,{start:e.start,monthly:String(e.monthly??"")}]))),[u,A]=i(()=>t.reasons.map(e=>e.text)),[O,D]=i(""),[L,te]=i(""),U=()=>Math.random().toString(36).slice(2,8),[k,_]=i(()=>({avatar:t.social?.avatar||{style:["adventurer","big-smile","lorelei","notionists"][Math.floor(Math.random()*4)],seed:U(),bg:["b6e3f4","c0aede","ffdfbf","c1f4c5"][Math.floor(Math.random()*4)]},banner:t.social?.banner||{style:["mesh","aurora"][Math.floor(Math.random()*2)],palette:Object.keys(Ie)[Math.floor(Math.random()*Object.keys(Ie).length)],seed:U()}})),G=f==="cm"?parseFloat(h.cm):(parseFloat(h.ft)||0)*30.48+(parseFloat(h.inch)||0)*2.54,Y=y==="kg"?parseFloat(S.kg):((parseFloat(S.st)||0)*14+(parseFloat(S.lb)||0))/2.20462,K=/^\d{4}-\d{2}-\d{2}$/.test(c),Q=K?de({dob:c}):null,B=e=>T[e]||{start:ft(),monthly:""},ae={dob:K&&Q>=Z,height:G>=100&&G<=250,weight:Y>=30&&Y<=300,habits:!w.includes("other")||j.trim(),details:w.every(e=>{let C=B(e);return C.start&&!Number.isNaN(Oe(C.start).getTime())}),why:!0,look:!0,ready:!0}[d],V=e=>{I(),z(e>b?"fwd":"back"),p(e),window.scrollTo(0,0)},fe=e=>{if(e?.preventDefault(),!!ae){if(d==="habits"&&w.length===0){V(he.indexOf("why"));return}V(b+1)}},ge=()=>{if(d==="why"&&w.length===0){V(he.indexOf("habits"));return}V(b-1)},l=e=>{if(I(),w.includes(e)){W(w.filter(C=>C!==e));return}W([...w,e]),T[e]||q({...T,[e]:{start:ft(),monthly:""}})},$=(e,C)=>q({...T,[e]:{...B(e),...C}}),X=e=>{e=e.trim(),!(!e||u.includes(e))&&(I(10),A([...u,e]),D(""))},kt=()=>{I(25),Ue(e=>{e.profile.dob=c,e.profile.heightCm=Math.round(G);let C=+Y.toFixed(1);if(!o||Math.abs(o-C)>=.05){let g=je();e.profile.weights=(e.profile.weights||[]).filter(se=>se.date!==g),e.profile.weights.push({date:g,kg:C})}let H=Object.fromEntries(e.quits.map(g=>[g.kind,g]));e.quits=w.map(g=>{let se=ke(g),Pe=B(g);return{best:0,resets:[],...H[g]||{},id:H[g]?.id||g,kind:g,label:g==="other"?j.trim():H[g]?.label||se.label,emoji:H[g]?.emoji||se.emoji,color:H[g]?.color||se.color,start:Pe.start,monthly:parseFloat(Pe.monthly)||0}});let ne=new Set(e.reasons.map(g=>g.text));u.filter(g=>!ne.has(g)).forEach(g=>e.reasons.push({id:Be(),text:g})),e.reasons=e.reasons.filter(g=>u.includes(g.text)),e.social={...e.social,avatar:k.avatar,banner:k.banner},e.setupDone=!0}),it()&&pt(),!s.dob&&c&&st({dob:c}).catch(()=>{}),ee(`Welcome to Novum, ${s.firstName} 💙`)},St=async()=>{te("");try{await rt(),te("on"),I(15)}catch(e){te(e.message)}},we=ae&&d==="weight"?qe(Y,G):null,Ct=d==="why"&&u.length===0?"Skip for now":d==="habits"&&w.length===0?"Nothing right now":"Continue";return a`<form class="auth" onSubmit=${fe} novalidate>
    <${Me} step=${b} total=${he.length} dir=${n} onBack=${b>(m?1:0)?ge:null} badge="Day Zero">
      ${d==="dob"&&a`
        <${R} emoji="🎂" title=${`Hi ${s.firstName}. When’s your birthday?`} sub="Day Zero sets your baseline. Only you can see this." />
        <${yt} value=${c} onChange=${r} />
        ${K&&a`<p class="wiz-big-note">${Q} years old</p>`}
        ${K&&Q<Z&&a`<${ce}>Novum is for ages ${Z} and up.<//>`}`}

      ${d==="height"&&a`
        <${R} emoji="📏" title="How tall are you?" />
        <div class="wiz-unit"><${Ce} options=${[{value:"cm",label:"cm"},{value:"ft",label:"ft & in"}]} value=${f} onChange=${v} /></div>
        ${f==="cm"?a`<div class="wiz-num"><${E} inputRef=${x} type="number" inputmode="decimal" placeholder="181" value=${h.cm} onInput=${e=>P({...h,cm:e.target.value})} /><span>cm</span></div>`:a`<div class="wiz-pair">
              <div class="wiz-num"><${E} inputRef=${x} type="number" inputmode="numeric" placeholder="5" value=${h.ft} onInput=${e=>P({...h,ft:e.target.value})} /><span>ft</span></div>
              <div class="wiz-num"><${E} type="number" inputmode="numeric" placeholder="11" value=${h.inch} onInput=${e=>P({...h,inch:e.target.value})} /><span>in</span></div></div>`}`}

      ${d==="weight"&&a`
        <${R} emoji="⚖️" title="And your weight?" sub="Used for BMI and to track changes over time." />
        <div class="wiz-unit"><${Ce} options=${[{value:"kg",label:"kg"},{value:"st",label:"st & lb"}]} value=${y} onChange=${M} /></div>
        ${y==="kg"?a`<div class="wiz-num"><${E} inputRef=${x} type="number" inputmode="decimal" step="0.1" placeholder="70.2" value=${S.kg} onInput=${e=>F({...S,kg:e.target.value})} /><span>kg</span></div>`:a`<div class="wiz-pair">
              <div class="wiz-num"><${E} inputRef=${x} type="number" inputmode="numeric" placeholder="11" value=${S.st} onInput=${e=>F({...S,st:e.target.value})} /><span>st</span></div>
              <div class="wiz-num"><${E} type="number" inputmode="decimal" placeholder="1" value=${S.lb} onInput=${e=>F({...S,lb:e.target.value})} /><span>lb</span></div></div>`}
        ${we&&a`<p class="wiz-big-note">BMI ${we.toFixed(1)} · ${_e(we).label}</p>`}`}

      ${d==="habits"&&a`
        <${R} emoji="🚪" title="What are you leaving behind?" sub="Pick everything you’re quitting. Each gets its own counter, milestones and money tracker." />
        <div class="pick-grid">
          ${Fe.map(e=>a`<button type="button" class="pick ${w.includes(e.kind)?"on":""}" style="--c:${e.color}" onClick=${()=>l(e.kind)} aria-pressed=${w.includes(e.kind)}>
            <span class="pick-e">${e.emoji}</span><span class="pick-l">${e.label}</span><span class="pick-tick">${J.check()}</span>
          </button>`)}
        </div>
        ${w.includes("other")&&a`<${E} class="wiz-in mt12" placeholder="What is it? e.g. Social media" maxlength="24" value=${j} onInput=${e=>N(e.target.value)} />`}`}

      ${d==="details"&&a`
        <${R} emoji="🗓️" title="When did you stop?" sub="The last time you used it. Quitting soon? Pick the date and Novum counts down to it." />
        ${w.map(e=>{let C=ke(e),H=B(e);return a`<div class="card dz-q" key=${e}>
            <div class="dz-q-h"><span class="row-ic" style="background:${C.color}">${C.emoji}</span><b>${e==="other"?j:C.label}</b></div>
            <label class="dz-f"><span>Quit</span><input type="datetime-local" value=${H.start} onInput=${ne=>$(e,{start:ne.target.value})} /></label>
            <label class="dz-f"><span>Cost per month</span><span class="dz-money">£<input type="number" inputmode="decimal" placeholder="0" value=${H.monthly} onInput=${ne=>$(e,{monthly:ne.target.value})} /></span></label>
            ${parseFloat(H.monthly)>0&&a`<p class="dz-save">${Le(parseFloat(H.monthly)*12,0)} a year back in your pocket</p>`}
          </div>`})}`}

      ${d==="why"&&a`
        <${R} emoji="💙" title="Why are you doing this?" sub="In your own words. Novum shows these when cravings hit." />
        <div class="wiz-add">
          <${E} inputRef=${x} placeholder="I’m doing this because…" maxlength="140" enterkeyhint="done" value=${O} onInput=${e=>D(e.target.value)}
            onKeyDown=${e=>{e.key==="Enter"&&(e.preventDefault(),X(O))}} />
          <button type="button" class="btn btn-primary sm" disabled=${!O.trim()} onClick=${()=>X(O)}>Add</button>
        </div>
        ${u.length>0&&a`<div class="card list mt12">${u.map(e=>a`<div class="row pop" key=${e}>
          <span class="row-main"><span class="row-title">${e}</span></span>
          <button type="button" class="icon-btn muted" aria-label="Remove" onClick=${()=>A(u.filter(C=>C!==e))}>${J.trash()}</button></div>`)}</div>`}
        <div class="chip-row dz-ideas">${Te.filter(e=>!u.includes(e)).slice(0,5).map(e=>a`<button type="button" class="chip big" onClick=${()=>X(e)}>+ ${e}</button>`)}</div>`}

      ${d==="look"&&a`
        <${R} emoji="🎨" title="Make it yours." sub="Pick a cartoon avatar and a banner. Only your buddies see your profile unless you make it public later." />
        <div class="ep-top dz-look">
          <button type="button" class="ep-banner" aria-label="Change banner" onClick=${()=>Re(k.banner,e=>_({...k,banner:e}))}><${mt} b=${k.banner} /><span class="ph-banner-edit">🎨</span></button>
          <button type="button" class="ep-av" aria-label="Change avatar" onClick=${()=>Ee(k.avatar,e=>_({...k,avatar:e}))}><${$t} a=${k.avatar} name=${s.firstName} size=${104} /></button>
          <div class="dz-look-name">${s.firstName} ${s.lastName}<span>@${s.username}</span></div>
        </div>
        <div class="dz-look-btns">
          <button type="button" class="btn btn-tinted" onClick=${()=>Ee(k.avatar,e=>_({...k,avatar:e}))}>Change avatar</button>
          <button type="button" class="btn btn-tinted" onClick=${()=>Re(k.banner,e=>_({...k,banner:e}))}>Change banner</button>
        </div>`}

      ${d==="ready"&&a`
        <div class="dz-ready">
          <div class="ready-ring"><span>✓</span></div>
          <h1 class="wiz-q center">You’re set, ${s.firstName}.</h1>
          <p class="wiz-sub center">${w.length?`Tracking ${w.length} ${w.length===1?"thing":"things"}. Every hour from here counts.`:"Head to Goals to plan your 2027."}</p>
        </div>
        <div class="card list">
          <div class="row"><span class="row-ic" style="background:#FF453A">🔔</span>
            <span class="row-main"><span class="row-title">Reminders and milestones</span>
              <span class="row-sub">${L==="on"?"On. You’re all set.":L||(xe()?"A nudge when you hit milestones and at check-in time.":"Add Novum to your Home Screen first, then turn these on in Profile.")}</span></span>
            ${xe()&&L!=="on"&&a`<button type="button" class="btn btn-tinted sm" onClick=${St}>Turn on</button>`}
          </div>
        </div>
        <${Ae} />`}

      <div class="wiz-actions">
        ${d==="ready"?a`<button type="button" class="btn btn-primary block big glow" onClick=${kt}>Start my new standard</button>`:a`<button type="submit" class="btn btn-primary block big" disabled=${!ae}>${Ct}</button>`}
      </div>
    <//>
  </form>`}export{Yt as AuthScreen,oe as CodeInput,qt as DayZero,pe as EyeButton,Z as MIN_AGE,ie as Resend,zt as consumeNewSignup};
