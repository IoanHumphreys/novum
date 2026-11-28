import{a as Ba,b as Oa,c as at,d as $s,e as Ra,f as ja,g as Wa,h as Ya,i as Ha,j as nt,k as Ga,l as Ka,m as xt,n as za,o as ot,p as Va,q as Ja,u as Za,w as Xa,y as en}from"./c-QY4VOAUP.js";import{f as yn}from"./c-Y4G4ER33.js";import{c as kn,d as wn}from"./c-YZCADKHP.js";import{a as bs,b as vs,c as nn,d as on,e as rn,f as ln,g as cn,h as dn,i as ve,k as un,l as pn,m as $n,n as hn,o as it,p as Ye,q as Lt,r as mn,s as bn,t as vn,u as fn,v as gn}from"./c-SN7DIM7B.js";import{a as z,b as J,c as je,d as ye,e as ds,f as us,g as Mt,h as Nt,i as La,j as Pa,k as ps,l as We,m as ke,n as ne,o as qa,p as st}from"./c-UA2VBOLU.js";import{a as tn,b as sn,c as an,d as It,j as Ft}from"./c-DCL4XFSM.js";import"./c-77WDBGBN.js";import{b as _a,c as Ua,d as hs,e as ms,f as Qa}from"./c-RARAZH47.js";import{$ as ls,A as is,C as Ma,R as rs,W as Tt,X as Na,Y as xa,aa as Ia,b as X,ba as cs,c as fa,d as ga,da as Fa,e as ns,h as ya,i as ka,o as wa,p as Et,q as Re,r as Sa,s as os,t as Ca,u as Aa,v as Da,w as Ea,x as Ta}from"./c-HECOZTOP.js";import{$ as ia,Aa as g,B as Xs,Ca as et,Da as ha,E as kt,Ea as B,F as ea,Fa as ss,G as Vt,Ga as ma,H as Le,Ha as M,I as R,Ia as $e,J as Ae,Ja as K,K as Je,Ka as ae,L as Ze,La as D,M as te,Ma as F,N as ta,Na as H,O as wt,Oa as as,P as V,Pa as ba,Q as G,Qa as va,R as ce,Ra as E,S as sa,Sa as Dt,T as N,Ta as tt,U as Pe,Ua as ge,V as aa,W as Xe,X as x,Y as qe,Z as na,_ as oa,a as Hs,aa as ra,b as f,ba as se,c as q,ca as W,d as ft,da as Z,e as le,ea as Jt,f as t,fa as St,ga as la,h as gt,ha as ca,i as yt,j as xe,ja as da,k as Gs,l as Ks,la as Be,m as ue,ma as Zt,n as Ie,na as Ct,o as zs,oa as Xt,p as _s,pa as At,q as Us,qa as Oe,r as Qs,ra as ua,s as Vs,sa as pa,t as pe,ta as De,u as Js,ua as $a,v as Zs,w as be,wa as es,x as Ut,xa as ts,y as Qt,ya as S,z as Fe,za as U}from"./c-RJXFU2EW.js";var ks=e=>`novum.sync:${e}`,ys=new Set,rt={state:"idle",at:0,error:""},He=null,Bt=null,fs=!1,Pt=!1,qt=null,ws=()=>{try{return JSON.parse(localStorage.getItem(ks(He)))||{version:0,dirty:!1}}catch{return{version:0,dirty:!1}}},Ss=e=>{try{localStorage.setItem(ks(He),JSON.stringify(e))}catch{}},gs=e=>{rt={...rt,...e},ys.forEach(s=>s(rt))},Cn=()=>rt,An=e=>(ys.add(e),()=>ys.delete(e));async function Sn(e){let s=await ns("PUT","/data",{data:N(),baseVersion:e.version});Ss({version:s.version,dirty:!1})}async function oe(){if(!(!He||!X())){if(fs){Pt=!0;return}fs=!0,gs({state:"syncing"});try{let e=ws(),s=await ns("GET","/data");if(s.version>e.version){let n=N();!e.dirty||(s.data?.savedAt||0)>=(n.savedAt||0)?(qe(s.data,{remote:!0}),e={version:s.version,dirty:!1},Ss(e)):(e={version:s.version,dirty:!0},await Sn(e))}else(e.dirty||s.version===0)&&await Sn({...e,version:s.version});gs({state:"synced",at:Date.now(),error:""})}catch(e){e.status===409?Pt=!0:gs({state:e.offline?"offline":"error",error:e.message})}finally{fs=!1,Pt&&(Pt=!1,setTimeout(oe,300))}}}var Dn=()=>{document.visibilityState==="visible"&&oe()};function En(e){return Ge(),He=e,qt=Pe((s,n)=>{if(n.remote)return;let a=ws();a.dirty||Ss({...a,dirty:!0}),clearTimeout(Bt),Bt=setTimeout(oe,2e3)}),window.addEventListener("online",oe),document.addEventListener("visibilitychange",Dn),oe()}function Ge(){qt&&qt(),qt=null,clearTimeout(Bt),window.removeEventListener("online",oe),document.removeEventListener("visibilitychange",Dn),He=null,rt={state:"idle",at:0,error:""}}async function Tn(){clearTimeout(Bt),He&&ws().dirty&&await oe()}function Cs(e){try{localStorage.removeItem(ks(e)),localStorage.removeItem(`novum.activity.${e}`)}catch{}}var Ts=()=>{let e=X()?.user?.id;return e?`novum.activity.${e}`:""};function co(){try{let e=JSON.parse(localStorage.getItem(Ts())||"null");return e&&Array.isArray(e.items)?e:null}catch{return null}}function In(e){try{Ts()&&localStorage.setItem(Ts(),JSON.stringify({items:e.items,unread:e.unread,at:Date.now()}))}catch{}}var Fn=()=>{let e=co();return e?{items:e.items,unread:e.unread,loaded:!0,cachedAt:e.at}:{items:[],unread:0,loaded:!1}},Y=Fn(),ct=new Set,ut=0,lt=null,Ot=new Set,ze=()=>Ot.forEach(e=>e(Y));function he(){return lt||(Y={...Y,refreshing:!0},ze(),lt=(async()=>{try{let e=await Tt(),s=e.items.filter(n=>!ct.has(n.id));Y={...e,items:s,unread:s.filter(n=>!n.read).length,loaded:!0,error:""},ut=Date.now(),In(Y)}catch(e){Y={...Y,loaded:!0,error:e.offline?"You’re offline.":"Couldn’t load your activity right now."}}return Y={...Y,refreshing:!1},lt=null,ze(),Y})(),lt)}function Ln(){Y={items:[],unread:0,loaded:!1},ut=0,Ke=null,ze()}function Pn(){Y=Fn(),ut=0,Ke=null,ze()}var qn=45e3,jt=null,Bn=()=>{document.visibilityState==="visible"&&Date.now()-ut>5e3&&he()};function uo(){jt||(jt=setInterval(()=>{document.visibilityState==="visible"&&he()},qn),document.addEventListener("visibilitychange",Bn))}function po(){clearInterval(jt),jt=null,document.removeEventListener("visibilitychange",Bn)}function Ee(){let[e,s]=f(Y);return q(()=>(Ot.add(s),uo(),Date.now()-ut>qn&&he(),()=>{Ot.delete(s),Ot.size||po()}),[]),e}var Ke=null,Ms=!1;function On(){let e=Ee(),[s,n]=f(null);if(q(()=>{if(!e.loaded||e.error)return;if(Ke===null){Ke=new Set(e.items.map(i=>i.id));return}let r=e.items.filter(i=>!Ke.has(i.id)&&!i.read);e.items.forEach(i=>Ke.add(i.id)),r.length&&!Ms&&(S(12),n({x:r[0],more:r.length-1,at:Date.now()}))},[e.items]),q(()=>{if(!s)return;let r=setTimeout(()=>n(null),6e3);return()=>clearTimeout(r)},[s]),!s)return null;let{x:a,more:o}=s;return t`<button class="act-pop" key=${s.at} role="status" onClick=${()=>{S(),n(null),pt()}}>
    <${ve} a=${a.who.avatar} name=${a.who.firstName} size=${38} />
    <span class="act-pop-t">${jn(a)}${o>0&&t` <span class="muted">and ${o} more</span>`}</span>
    <span class="act-pop-x" aria-label="Dismiss" onClick=${r=>{r.stopPropagation(),n(null)}}>✕</span>
  </button>`}function Rn(){let e=Ee();return t`<button class="icon-btn bell" aria-label=${`Activity${e.unread?`, ${e.unread} new`:""}`} onClick=${pt}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    ${e.unread>0&&t`<i class="bell-dot">${e.unread>9?"9+":e.unread}</i>`}
  </button>`}var As=(e,s)=>{let n=Math.floor((s-e)/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;let a=Math.floor(n/60);if(a<24)return`${a}h ago`;let o=Math.floor(a/24);return o<7?`${o}d ago`:new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short"})},$o={kind:"water",e:"💧",l:"Watered your garden"},Is=e=>e.data?.kind==="water"?$o:Fe.find(s=>s.kind===e.data?.kind)||Fe[0],Ns={cheer:{c:"#FF375F",f:"cheers"},buddy_request:{e:"🤝",c:"#3B9BFF",f:"requests"},buddy_accepted:{e:"🤝",c:"#30D158",f:"requests"},follow:{e:"👤",c:"#BF5AF2",f:"requests"},follow_request:{e:"👤",c:"#BF5AF2",f:"requests"},follow_accepted:{e:"✓",c:"#30D158",f:"requests"},sos:{e:"🫁",c:"#64D2FF",f:"buddies"},milestone:{e:"🎉",c:"#FFD60A",f:"buddies"}},ho=e=>e.kind==="cheer"?Is(e).e:e.kind==="milestone"&&e.data?.emoji==="💷"?"💷":Ns[e.kind]?.e||"🔔";function jn(e){let s=t`<b>${e.who.firstName}</b>`;switch(e.kind){case"cheer":{if(e.data?.kind==="water")return t`${s} watered your garden 💧`;let n=Is(e);return t`${s} sent you ${n.e} <i>${n.l.toLowerCase()}</i>`}case"buddy_request":return t`${s} wants to be buddies`;case"buddy_accepted":return t`You and ${s} are now buddies`;case"follow":return t`${s} started following you`;case"follow_request":return t`${s} wants to follow you`;case"follow_accepted":return t`${s} accepted your follow request`;case"sos":return t`${s} was having a craving and asked for support`;case"milestone":return t`${s} hit <b class="act-hl">${e.data.label}</b> ${e.data.quit}`;default:return t`${s}`}}function mo(e){let s=[...new Map(e.map(n=>[n.who.username,n.who.firstName])).values()];return s.length===1?t`<b>${s[0]}</b>`:s.length===2?t`<b>${s[0]}</b> and <b>${s[1]}</b>`:t`<b>${s[0]}</b>, <b>${s[1]}</b> and ${s.length-2} other${s.length===3?"":"s"}`}function bo(e,s){let n=new Date(s);n.setHours(0,0,0,0);let a=n.getTime();return e>=a?"Today":e>=a-864e5?"Yesterday":e>=a-6*864e5?"This week":"Earlier"}var vo={cheer:1,follow:1};function fo(e,s){let n=[];for(let a of e){let o=bo(a.at,s);(!n.length||n[n.length-1].b!==o)&&n.push({b:o,rows:[]}),n[n.length-1].rows.push(a)}for(let a of n){let o=[],r={};for(let i of a.rows)vo[i.kind]&&a.rows.filter(u=>u.kind===i.kind).length>=2?(r[i.kind]||(r[i.kind]={group:!0,kind:i.kind,id:`g:${a.b}:${i.kind}`,items:[],at:i.at},o.push(r[i.kind])),r[i.kind].items.push(i)):o.push(i);a.rows=o}return n}var go=e=>e.filter(s=>!s.read).length;function dt(e){Y={...Y,items:e,unread:go(e)},In(Y),ze()}var Mn=4500;function Rt(e,s){let n=Y.items.filter(i=>e.includes(i.id));if(!n.length)return;e.forEach(i=>ct.add(i)),dt(Y.items.filter(i=>!e.includes(i.id)));let a=!1,o=!Y.items.length&&e.length>1,r=Math.max(...n.map(i=>i.at));E(s,{ms:Mn,action:{label:"Undo",onClick:()=>{a=!0,e.forEach(i=>ct.delete(i)),dt([...Y.items,...n].sort((i,u)=>u.at-i.at))}}}),setTimeout(async()=>{if(!a){try{await(o?ls(null,r):Promise.all(e.map(i=>ls(i))))}catch(i){e.forEach(u=>ct.delete(u)),dt([...Y.items,...n].sort((u,l)=>l.at-u.at)),E(i.offline?"You’re offline, so nothing was cleared.":"Couldn’t clear that. Try again.");return}e.forEach(i=>ct.delete(i))}},Mn+200)}function yo(){ne({title:"Clear all notifications?",text:"This empties Activity on all your devices. Buddy and follow requests still wait for you in Buddies and Profile.",confirm:"Clear all",onConfirm:()=>{S(15),Rt(Y.items.map(e=>e.id),"All cleared")}})}async function Ds(e){let s=Y.items.filter(a=>e.includes(a.id));if(!s.length)return;let n=s.every(a=>a.read);S(10),dt(Y.items.map(a=>e.includes(a.id)?{...a,read:!n}:a));try{await Promise.all(e.map(a=>xa(a,n)))}catch(a){dt(Y.items.map(o=>e.includes(o.id)?{...o,read:n}:o)),E(a.offline?"You’re offline. Try again when you’re back.":"Couldn’t update that. Try again.")}}var Nn=88;function Es({onClear:e,onToggle:s,unread:n,children:a}){let[o,r]=f(0),[i,u]=f(!1),[l,d]=f(!1),p=le(null),$=le(0),c=C=>{$.current=C,r(C)},b=()=>{S(12),d(!0),setTimeout(e,260)},h=()=>{c(0),s()},v=C=>{let w=C.touches[0];p.current={x:w.clientX,y:w.clientY,base:$.current,dir:null}},m=C=>{let w=p.current;if(!w)return;let k=C.touches[0],L=k.clientX-w.x,j=k.clientY-w.y;w.dir||(Math.abs(L)>8&&Math.abs(L)>Math.abs(j)?(w.dir="h",u(!0)):Math.abs(j)>8&&(w.dir="v")),w.dir==="h"&&c(Math.max(-220,Math.min(140,w.base+L)))},y=()=>{let C=p.current;p.current=null,u(!1),!(!C||C.dir!=="h")&&($.current>70?h():$.current<-160?b():c($.current<-Nn/2?-Nn:0))};return t`<div class="act-swipe ${l?"gone":""} ${o<0||i?"open":""} ${o>0?"right":""}">
    <span class="act-mark ${o>70?"go":""}" aria-hidden="true">${n?"✓ Read":"● Unread"}</span>
    <button class="act-clear" tabindex=${o<0?0:-1} aria-hidden=${o<0?"false":"true"} onClick=${b}>Clear</button>
    <div class="act-slide ${i?"drag":""}" style=${`transform:translateX(${l?-420:o}px)`}
      onTouchStart=${v} onTouchMove=${m} onTouchEnd=${y} onTouchCancel=${y}
      onClickCapture=${C=>{$.current&&(C.stopPropagation(),C.preventDefault(),c(0))}}>
      ${a}
    </div>
  </div>`}var xn=[{value:"all",label:"All"},{value:"cheers",label:"Cheers"},{value:"requests",label:"Requests"},{value:"buddies",label:"Buddies"}];function pt(){B(e=>t`<${ko} close=${e} />`,{tall:!0})}function ko({close:e}){let s=Ee(),n=U(6e4),[a,o]=f({}),[r,i]=f("all"),[u,l]=f({});q(()=>(Ms=!0,()=>{Ms=!1}),[]),q(()=>{he().then(m=>{m.unread&&Na().then(()=>{Y={...Y,unread:0},ze()}).catch(()=>{})})},[]);let d=async(m,y,C)=>{S(10);try{await y(),o(w=>({...w,[m.id]:C})),E(C),Ye()}catch(w){E(w.message),w.queued&&o(k=>({...k,[m.id]:"Will send when you’re back online"}))}},p=s.items.filter(m=>r==="all"||Ns[m.kind]?.f===r),$=fo(p,n),c=m=>a[m.id]?t`<div class="act-done">✓ ${a[m.id]}</div>`:m.kind==="sos"&&m.who.buddy?t`<${bs} who=${m.who} small class="act-cheers"
        onSent=${(y,C)=>o(w=>({...w,[m.id]:C?"Will send when you’re back online":`Sent ${y.e} ${y.l.toLowerCase()}`}))} />`:m.kind==="cheer"&&m.who.buddy?t`<button class="act-chip" onClick=${()=>d(m,()=>Ma(m.who.username,"heart"),`Sent 💙 back to ${m.who.firstName}`)}>💙 Send one back</button>`:m.kind==="buddy_request"?t`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>d(m,()=>is(m.who.username,!0),`You and ${m.who.firstName} are buddies`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>d(m,()=>is(m.who.username,!1),"Declined")}>Decline</button></div>`:m.kind==="follow_request"?t`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>d(m,()=>rs(m.who.username,!0),`${m.who.firstName} can now see your profile`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>d(m,()=>rs(m.who.username,!1),"Declined")}>Decline</button></div>`:null,b=m=>t`<div class="act-item ${m.read?"":"new"} ${m.kind==="sos"?"act-sos":""}">
    <button class="act-av" aria-label=${`Open ${m.who.firstName}’s profile`} onClick=${()=>it(m.who.username)}>
      <${ve} a=${m.who.avatar} name=${m.who.firstName} size=${44} />
      <i class="act-kind" style=${`background:${Ns[m.kind]?.c||"#3B9BFF"}`} aria-hidden="true">${ho(m)}</i>
    </button>
    <div class="act-main">
      <div class="act-t">${jn(m)}</div>
      <div class="act-when">${As(m.at,n)}</div>
      ${c(m)}
    </div>
    ${!m.read&&t`<i class="act-dot" aria-label="New"></i>`}
  </div>`,h=m=>{let y=m.data?.emoji==="💷";return t`<div class="act-ms-card ${y?"money":""} ${m.read?"":"new"}">
      <span class="ms-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <div class="ms-top">
        <button class="act-av" aria-label=${`Open ${m.who.firstName}’s profile`} onClick=${()=>it(m.who.username)}><${ve} a=${m.who.avatar} name=${m.who.firstName} size=${36} /></button>
        <span class="ms-who"><b>${m.who.firstName}</b> hit a milestone · ${As(m.at,n)}</span>
        ${!m.read&&t`<i class="act-dot static" aria-label="New"></i>`}
      </div>
      <div class="ms-big">${y?"💷":"🎉"} ${m.data.label}</div>
      <div class="ms-sub">${m.data.quit}</div>
      ${a[m.id]?t`<div class="act-done">✓ ${a[m.id]}</div>`:m.who.buddy&&t`<${bs} who=${m.who} small class="ms-cheers"
          onSent=${(C,w)=>o(k=>({...k,[m.id]:w?"Will send when you’re back online":`Sent ${C.e} ${C.l.toLowerCase()}`}))} />`}
    </div>`},v=m=>{let y=u[m.id],C=m.items.some(k=>!k.read),w=[...new Set(m.items.map(k=>m.kind==="cheer"?Is(k).e:"👤"))].slice(0,3).join("");return t`<div class="act-group-row">
      <button class="act-item act-stack ${C?"new":""}" aria-expanded=${!!y} onClick=${()=>{S(),l(k=>({...k,[m.id]:!k[m.id]}))}}>
        <span class="stack-avs" aria-hidden="true">${[...new Map(m.items.map(k=>[k.who.username,k])).values()].slice(0,3).map((k,L)=>t`<span class="stack-av" key=${k.id} style=${`z-index:${3-L}`}><${ve} a=${k.who.avatar} name=${k.who.firstName} size=${34} /></span>`)}</span>
        <span class="act-main">
          <span class="act-t">${mo(m.items)} ${m.kind==="cheer"?t`sent you ${m.items.length} cheers ${w}`:t`started following you`}</span>
          <span class="act-when">${As(m.items[0].at,n)} · ${y?"Hide":"Show all"}</span>
        </span>
        ${C&&t`<i class="act-dot" aria-label="New"></i>`}
      </button>
      ${y&&t`<div class="stack-list">${m.items.map(k=>t`<${Es} key=${k.id} unread=${!k.read} onClear=${()=>Rt([k.id],"Cleared")} onToggle=${()=>Ds([k.id])}>${b(k)}<//>`)}</div>`}
    </div>`};return t`
    <${M} title="Activity"
      left=${s.items.length>0?t`<button class="link act-clear-all" onClick=${yo}>Clear all</button>`:null}
      right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body act-sheet">
      ${s.items.length>0&&t`<div class="act-filter"><${K} small options=${xn} value=${r} onChange=${i} /></div>`}
      ${s.error&&s.items.length>0&&t`<div class="act-stale" role="status">
        <span>📡 ${s.error==="You’re offline."?"You’re offline.":"Couldn’t refresh."} Showing your last update.</span>
        <button class="link sm" disabled=${s.refreshing} onClick=${()=>{S(),he()}}>${s.refreshing?"Trying…":"Try again"}</button>
      </div>`}
      ${s.loaded?s.error&&s.items.length===0?t`<div class="act-empty"><div class="act-empty-ic">📡</div><b>${s.error}</b><p class="muted">Your cheers and requests are safe. They’ll show up once Novum can reach the server.</p><button class="btn btn-tinted sm mt12" disabled=${s.refreshing} onClick=${()=>{S(),he()}}>${s.refreshing?"Trying…":"Try again"}</button></div>`:s.items.length===0?t`<div class="act-empty"><div class="act-empty-ic">🔔</div><b>You’re all caught up</b><p class="muted">Cheers, requests and your buddies’ milestones will show up here.</p></div>`:p.length===0?t`<div class="act-empty sm"><b>Nothing here</b><p class="muted">No ${xn.find(m=>m.value===r).label.toLowerCase()} in the last 60 days.</p></div>`:$.map(m=>t`<section class="act-group" key=${m.b}>
          <h3 class="act-gh">${m.b}</h3>
          <div class="act-card">
            ${m.rows.map(y=>y.group?t`<${Es} key=${y.id} unread=${y.items.some(C=>!C.read)} onClear=${()=>Rt(y.items.map(C=>C.id),`Cleared ${y.items.length}`)} onToggle=${()=>Ds(y.items.map(C=>C.id))}>${v(y)}<//>`:t`<${Es} key=${y.id} unread=${!y.read} onClear=${()=>Rt([y.id],"Cleared")} onToggle=${()=>Ds([y.id])}>${y.kind==="milestone"?h(y):b(y)}<//>`)}
          </div>
        </section>`):t`<${Dt} rows=${5} avatar />`}
      ${s.items.length>0&&t`<p class="muted center tiny act-foot">Swipe left to clear, right to mark as read or unread. Kept for 60 days.</p>`}
    </div>`}var $t=[{tab:"home",e:"🏠",t:"Home",d:"Your streaks, money saved and what your body is doing right now. Craving? The big “Tap here” button gives you five minutes of guided breathing. The 🔔 at the top shows cheers from buddies."},{tab:"checkin",e:"✍️",t:"Check-in",d:"Twenty seconds a day: mood, cravings and sleep. The red dot means you haven’t checked in yet today. It’s how Novum spots your patterns."},{tab:"goals",e:"🎯",t:"Goals",d:"Habits you tick off, targets to work towards and one-off milestones, for 2027 or any date you choose."},{tab:"progress",e:"📈",t:"Progress",d:"Rings, charts and your check-in calendar, so you can see how far you’ve come."},{tab:"profile",e:"🤝",t:"Profile",d:"Add buddies by username, choose what they see, set up notifications and change your avatar. Quitting is easier together."}],Fs=new Set,Ls=!1;function Wn(){Ls=!0,Fs.forEach(e=>e(!0))}function Yn({s:e,go:s}){let[n,a]=f(!e.tourDone||Ls),[o,r]=f(0),[i,u]=f(null);if(q(()=>{let c=b=>{r(0),a(b)};return Fs.add(c),()=>Fs.delete(c)},[]),q(()=>{n&&s($t[o].tab,{quiet:!0})},[n,o]),ft(()=>{if(!n){document.documentElement.classList.remove("touring");return}document.documentElement.classList.add("touring");let c=()=>{let b=document.querySelectorAll(".tabbar .tab")[o];if(b){let h=b.getBoundingClientRect();u(h.left+h.width/2)}};return c(),window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c),document.documentElement.classList.remove("touring")}},[n,o]),!n)return null;let l=$t[o],d=o===$t.length-1,p=()=>{S(15),Ls=!1,a(!1),s("home",{quiet:!0}),N().tourDone||x(c=>{c.tourDone=!0})},$=()=>{S(),d?p():r(o+1)};return t`<div class="tour" role="dialog" aria-modal="true" aria-label="Novum tour">
    <div class="tour-dim" onClick=${$}></div>
    <div class="tour-card" key=${o}>
      <div class="tour-top"><span class="tour-e">${l.e}</span><span class="tour-step">${o+1} of ${$t.length}</span>
        ${!d&&t`<button class="link sm tour-skip" onClick=${p}>Skip</button>`}</div>
      <h3 class="tour-t">${l.t}</h3>
      <p class="tour-d">${l.d}</p>
      <div class="tour-foot">
        <div class="tour-dots">${$t.map((c,b)=>t`<i class=${b===o?"on":""}></i>`)}</div>
        <div class="tour-btns">
          ${o>0&&t`<button class="btn btn-plain sm" onClick=${()=>{S(),r(o-1)}}>Back</button>`}
          <button class="btn btn-primary sm" onClick=${$}>${d?"Let’s go":"Next"}</button>
        </div>
      </div>
    </div>
    ${i!=null&&t`<i class="tour-arrow" key=${"a"+o} style=${`left:${i}px`}></i>`}
  </div>`}var Hn=864e5,Gn=e=>Ae(e).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});function we(){S(),B(e=>t`<${wo} close=${e} />`,{tall:!0})}function wo({close:e}){let[s,n]=f(N()),a=()=>n(N()),o=R(),r=s.events.filter(u=>u.date>=o&&!u.outcome).sort((u,l)=>u.date.localeCompare(l.date)),i=pe.filter(u=>s.plans[u]);return t`
    <${M} title="Plan ahead" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Deciding what you’ll do <i>before</i> a craving hits makes you far more likely to stick to it.</p>
      <${D} header="Tough days coming up" footer="Novum reminds you the evening before and on the morning, then asks how it went.">
        ${r.map(u=>t`<${F} key=${u.id} icon=${u.emoji} iconBg="#FF9F0A" title=${u.title} detail=${u.date===o?"Today":Gn(u.date)} chevron
          onClick=${()=>Yt(u,a)} />`)}
        <${F} icon=${g.plus()} iconBg="#FF9F0A" title="Add a tough day" chevron onClick=${()=>Yt(null,a)} />
      <//>
      <${D} header="If-then plans" footer="When you use Craving SOS and say what set it off, your plan shows straight away.">
        ${i.map(u=>t`<${F} key=${u} icon="🧭" iconBg="#5E5CE6" title=${`If: ${u.toLowerCase()}`} sub=${`Then: ${s.plans[u]}`} chevron onClick=${()=>Ps(u,a)} />`)}
        ${pe.filter(u=>!s.plans[u]).length>0&&t`<div class="plan-add">
          <span class="plan-add-k">Add a plan for…</span>
          <div class="chip-row">${pe.filter(u=>!s.plans[u]).map(u=>t`<button key=${u} class="chip" style="--c:#5E5CE6" onClick=${()=>Ps(u,a)}>${u}</button>`)}</div>
        </div>`}
      <//>
    </div>`}function Ps(e,s){B(n=>t`<${So} trigger=${e} close=${()=>{n(),s?.()}} />`)}function So({trigger:e,close:s}){let[n,a]=f(N().plans[e]||""),o=()=>{S(12),x(r=>{r.plans={...r.plans},n.trim()?r.plans[e]=n.trim().slice(0,120):delete r.plans[e]}),E(n.trim()?"Plan saved 🧭":"Plan removed"),s()};return t`
    <${M} title=${`If: ${e.toLowerCase()}`} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="Then I’ll…">
        <textarea class="note" rows="2" maxlength="120" placeholder="e.g. go for a 10-minute walk" value=${n} onInput=${r=>a(r.target.value)}></textarea>
      <//>
      <${D} header="Ideas">
        <div class="chip-row">${(kt[e]||kt.Other).map(r=>t`<button key=${r} class="chip ${n===r?"on":""}" style="--c:#5E5CE6" onClick=${()=>{S(),a(r)}}>${r}</button>`)}</div>
      <//>
      ${N().plans[e]&&t`<button class="btn btn-plain danger block" onClick=${()=>{a(""),x(r=>{r.plans={...r.plans},delete r.plans[e]}),E("Plan removed"),s()}}>Remove this plan</button>`}
    </div>`}function Yt(e,s){B(n=>t`<${Co} ev=${e} close=${()=>{n(),s?.()}} />`,{tall:!0})}function Co({ev:e,close:s}){let[n,a]=f(e||{title:"",emoji:"🎉",date:R(te(new Date,1)),trigger:"",plan:""}),o=d=>p=>a({...n,[d]:p.target.value}),r=n.title.trim()&&n.date,i=()=>{if(!r)return;S(12);let d={...n,title:n.title.trim().slice(0,40),plan:(n.plan||"").trim().slice(0,160)};x(p=>{e?p.events=p.events.map($=>$.id===e.id?{...$,...d}:$):p.events=[...p.events,{...d,id:ce(),outcome:null}]}),E(e?"Saved":"Added. You’ll get a reminder the evening before 📅"),s()},u=n.trigger?kt[n.trigger]||[]:[],l=n.trigger&&N().plans[n.trigger];return t`
    <${M} title=${e?"Tough day":"Add a tough day"} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" disabled=${!r} onClick=${i}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="What’s happening?">
        <div class="ev-title"><input class="ev-emoji-in" aria-label="Emoji" maxlength="4" value=${n.emoji} onInput=${o("emoji")} />
          <input placeholder="e.g. Jake’s party" maxlength="40" value=${n.title} onInput=${o("title")} /></div>
        <div class="emoji-strip">${ea.map(d=>t`<button key=${d} class=${n.emoji===d?"on":""} onClick=${()=>a({...n,emoji:d})}>${d}</button>`)}</div>
      <//>
      <${D} header="When?">
        <label class="field"><span class="field-l">Date</span><span class="field-c"><input type="date" min=${R()} value=${n.date} onInput=${o("date")} /></span></label>
      <//>
      <${D} header="What might set you off?">
        <div class="chip-row">${pe.map(d=>t`<button key=${d} class="chip ${n.trigger===d?"on":""}" style="--c:#FF9F0A" onClick=${()=>{S(),a({...n,trigger:n.trigger===d?"":d})}}>${d}</button>`)}</div>
      <//>
      <${D} header="My plan" footer=${l&&!n.plan?t`Your if-then plan for ${n.trigger.toLowerCase()}: <b>${l}</b>. <button class="link sm" onClick=${()=>a({...n,plan:l})}>Use it</button>`:"Shown on the day and in your reminder."}>
        <textarea class="note" rows="3" maxlength="160" placeholder="e.g. Leave by 11, stick to soft drinks, text Amy if it gets hard" value=${n.plan} onInput=${o("plan")}></textarea>
        ${u.length>0&&t`<div class="chip-row pad-chips">${u.map(d=>t`<button key=${d} class="chip" style="--c:#FF9F0A" onClick=${()=>{S(),a({...n,plan:n.plan?`${n.plan.replace(/[.\s]*$/,"")}. ${d}`:d})}}>＋ ${d}</button>`)}</div>`}
      <//>
      ${e&&t`<button class="btn btn-plain danger block" onClick=${()=>{x(d=>{d.events=d.events.filter(p=>p.id!==e.id)}),E("Removed"),s()}}>Delete</button>`}
    </div>`}function Kn({s:e}){let s=R(),n=R(te(new Date,-3)),a=R(te(new Date,14)),o=e.events.filter(l=>!l.outcome&&l.date<s&&l.date>=n),r=e.events.filter(l=>!l.outcome&&l.date===s),i=e.events.filter(l=>!l.outcome&&l.date>s&&l.date<=a).sort((l,d)=>l.date.localeCompare(d.date));if(!o.length&&!r.length&&!i.length)return null;let u=(l,d)=>{S(d==="quit"?20:10),x(p=>{p.events=p.events.map($=>$.id===l.id?{...$,outcome:d}:$)}),E(d==="quit"?`You got through ${l.title} 💪 That’s huge.`:"Thanks for being honest. Next time, adjust the plan.")};return t`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Plan ahead</h2><button class="link sm" onClick=${we}>See all</button></div>
    <div class="stack">
      ${o.map(l=>t`<div class="card ev-card ask" key=${l.id}>
        <div class="ev-top"><span class="ev-e">${l.emoji}</span><span class="row-main"><b>How did ${l.title} go?</b><small>${Gn(l.date)}</small></span></div>
        <div class="act-btns"><button class="btn btn-primary sm" onClick=${()=>u(l,"quit")}>Stayed quit 💪</button><button class="btn btn-plain sm" onClick=${()=>u(l,"slip")}>I slipped</button></div>
      </div>`)}
      ${r.map(l=>t`<button class="card ev-card today tap" key=${l.id} onClick=${()=>Yt(l)}>
        <div class="ev-top"><span class="ev-e">${l.emoji}</span><span class="row-main"><span class="ev-k">Today</span><b>${l.title}</b></span></div>
        ${l.plan?t`<p class="ev-plan"><span>Your plan</span>${l.plan}</p>`:t`<p class="ev-plan empty">No plan yet. Tap to add one.</p>`}
      </button>`)}
      ${i.length>0&&t`<div class="card list">${i.map(l=>{let d=ta(new Date,Ae(l.date));return t`<${F} key=${l.id} icon=${l.emoji} iconBg="#FF9F0A" title=${l.title} detail=${d===1?"Tomorrow":`in ${d} days`} chevron onClick=${()=>Yt(l)} />`})}</div>`}
    </div>
  </section>`}function zn({s:e,picked:s,onPick:n}){let a=s.map(r=>e.plans[r]&&{t:r,p:e.plans[r]}).filter(Boolean)[0],o=[...pe].sort((r,i)=>(e.plans[i]?1:0)-(e.plans[r]?1:0));return t`<div class="sos-plan">
    <div class="sos-plan-k">What set it off?</div>
    <div class="sos-plan-chips">${o.map(r=>t`<button key=${r} class="chip sm ${s.includes(r)?"on":""} ${e.plans[r]?"has":""}" style="--c:#5E5CE6" onClick=${()=>{S(),n(r)}}>${e.plans[r]?"🧭 ":""}${r}</button>`)}</div>
    ${a?t`<div class="card sos-plan-card" key=${a.t}><span class="spc-k">Your plan for ${a.t.toLowerCase()}</span><b>${a.p}</b></div>`:s.length>0?t`<button class="link sm sos-plan-add" onClick=${()=>Ps(s[0])}>No plan for ${s[0].toLowerCase()} yet. Make one for next time</button>`:null}
  </div>`}var Wt=e=>{let s=[...e].sort((a,o)=>a-o),n=s.length;return n?n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2:null},ht=e=>e<60?`${Math.max(1,Math.round(e))} sec`:`${Math.round(e/60)} min`;function Ao(e,s=Date.now()){let n=e.cravings.filter(l=>l.t<=s),a=n.filter(l=>l.beaten),o=a.filter(l=>l.secs>5),r=wt(new Date(s)).getTime(),i=Array.from({length:8},(l,d)=>{let p=r-(7-d)*7*Hn,$=p+7*Hn,c=n.filter(b=>b.t>=p&&b.t<$);return{from:p,n:c.length,secs:Wt(c.filter(b=>b.beaten&&b.secs>5).map(b=>b.secs))}}),u=null;if(o.length>=6){let l=Math.floor(o.length/3),d=[...o].sort((c,b)=>c.t-b.t),p=Wt(d.slice(0,l).map(c=>c.secs)),$=Wt(d.slice(-l).map(c=>c.secs));u={from:p,to:$}}return{total:n.length,beaten:a.length,typical:Wt(o.map(l=>l.secs)),weeks:i,trend:u}}function _n({s:e}){let s=Ao(e);if(!s.total)return null;let n=Math.max(1,...s.weeks.map(r=>r.n)),a=Math.round(s.beaten/s.total*100),o=s.trend&&s.trend.to<s.trend.from*.85?`Your cravings are getting shorter: from about ${ht(s.trend.from)} to ${ht(s.trend.to)}.`:s.trend&&s.trend.to>s.trend.from*1.15?`Cravings have been lasting a bit longer lately (${ht(s.trend.to)}). Tough patches pass. Keep using SOS.`:s.typical?`Most of your cravings pass in about ${ht(s.typical)}. You only ever have to outlast this one.`:"Use Craving SOS when one hits to see how long they last.";return t`<section class="group">
    <h2 class="group-h">Craving SOS</h2>
    <div class="card pad cstats">
      <div class="cs-tiles">
        <div><b>${s.typical?ht(s.typical):"–"}</b><span>typical craving</span></div>
        <div><b>${s.beaten}<small>/${s.total}</small></b><span>beaten (${a}%)</span></div>
      </div>
      <div class="cs-chart" aria-label="Cravings per week, last 8 weeks">
        ${s.weeks.map((r,i)=>t`<div class="cs-col" key=${i}>
          <span class="cs-n">${r.n||""}</span>
          <span class="cs-bar" style=${`height:${r.n/n*100}%`}></span>
          <span class="cs-d">${i===7?"Now":new Date(r.from).toLocaleDateString("en-GB",{day:"numeric",month:"short"}).replace(" "," ")}</span>
        </div>`)}
      </div>
      <p class="insight">${o}</p>
      <p class="tiny muted">Cravings per week from Craving SOS. Typical time is from opening SOS to tapping “I beat it”.</p>
    </div>
  </section>`}var Do=ge(()=>import("./c-LVH4EOQR.js"),"openRecap");function Un({s:e,go:s}){let[n,a]=f(30),o=Date.now(),r=e.goals.filter(A=>A.period==="2027"),i=Ie.map(A=>{let P=r.filter(ee=>ee.category===A.id);return P.length?{...A,pct:P.reduce((ee,ie)=>ee+De(ie,e).pct,0)/P.length,n:P.length}:null}).filter(Boolean),u=r.length?r.reduce((A,P)=>A+De(P,e).pct,0)/r.length:0,l=je.getTime(),d=o>=l?Math.min(365,Math.floor((o-l)/z)+1):0,p=Math.ceil((l-o)/z),c=e.goals.map(A=>De(A,e)).filter(A=>A.pct>=1).length,b=e.goals.filter(A=>A.type==="habit").reduce((A,P)=>Math.max(A,Oe(P).value),0),h=e.quits.reduce((A,P)=>A+Z(P,W(P,o)),0),v=Array.from({length:n},(A,P)=>R(te(new Date,P-n+1))),m=v.map(A=>e.checkins[A]?.mood??null),y=e.quits.map(A=>({name:A.label,color:A.color,values:v.map(P=>e.checkins[P]?.[A.id]??null)})),C=(()=>{let A=Object.keys(e.checkins).sort().filter(T=>e.quits.some(Q=>e.checkins[T][Q.id]!=null));if(A.length<6)return null;let P=T=>{let Q=T.flatMap(me=>e.quits.map(re=>e.checkins[me][re.id]).filter(re=>re!=null));return Q.reduce((me,re)=>me+re,0)/Q.length},ee=Math.min(7,Math.floor(A.length/2)),ie=P(A.slice(0,ee)),Ce=P(A.slice(-ee));if(ie===0)return null;let Me=Math.round((Ce-ie)/ie*100);return Me<0?`Cravings are down ${-Me}% compared with your first check-ins.`:Me>0?`Cravings are up ${Me}% on your first check-ins. Tough patches are normal. Keep going.`:"Cravings are holding steady."})(),w={};e.cravings.forEach(A=>(A.triggers||[]).forEach(P=>{w[P]=(w[P]||0)+1}));let k=Object.entries(w).sort((A,P)=>P[1]-A[1]).slice(0,6),L=Array(24).fill(0);e.cravings.forEach(A=>{L[new Date(A.t).getHours()]++});let j=L.indexOf(Math.max(...L)),Qe=`${J(j)}:00–${J((j+1)%24)}:00`,fe=new Set([...Object.keys(e.checkins),...e.goals.flatMap(A=>A.ticks||[])]),O=Array.from({length:12},(A,P)=>{let ee=new Date(2027,P+1,0).getDate(),ie=0;for(let Ce=1;Ce<=ee;Ce++)fe.has(`2027-${J(P+1)}-${J(Ce)}`)&&ie++;return{m:P,pct:ie/ee,future:new Date(2027,P,1)>o}});return t`<${$e} title="Progress">
    <${wn} />
    ${e.quits.length>0&&t`<button class="card rc-card tap" onClick=${Do}>
      <span class="rc-card-ic">📅</span>
      <span class="row-main"><span class="row-title">Your week</span><span class="row-sub">Check-ins, cravings beaten, money saved and what your body did</span></span>
      <span class="row-chev">${g.chevron()}</span>
    </button>`}
    <section class="group">
      <h2 class="group-h">2027 at a glance</h2>
      <div class="card glance">
        ${r.length?t`
          <div class="glance-top">
            <${ha} size=${150} stroke=${14} gap=${3} rings=${i.slice(0,5).map(A=>({pct:A.pct,color:A.color}))}>
              <div class="gl-c"><b>${Math.round(u*100)}%</b><span>overall</span></div>
            <//>
            <div class="gl-legend">${i.map(A=>t`<div class="gl-li"><i style="background:${A.color}"></i><span>${A.label}</span><b>${Math.round(A.pct*100)}%</b></div>`)}</div>
          </div>`:t`<div class="glance-empty"><p>Add goals for 2027 to see all your rings here.</p><button class="btn btn-primary sm" onClick=${_e}>New Year ideas</button></div>`}
        <div class="year-bar">
          <div class="yb-t"><span>${d?`Day ${d} of 365`:`2027 starts in ${p} day${p===1?"":"s"}`}</span><span>${Math.round(d/365*100)}% of the year</span></div>
          <div class="yb"><i style="width:${d/365*100}%"></i></div>
        </div>
        <div class="months">${O.map(A=>t`<div class="mo ${A.future?"future":""}" title=${`${Math.round(A.pct*100)}% of days active`}>
          <div class="mo-bar"><i style="height:${Math.max(A.future?0:4,A.pct*100)}%"></i></div><span>${"JFMAMJJASOND"[A.m]}</span></div>`)}</div>
        <p class="tiny muted">Bars show the share of days each month with a check-in or a ticked habit.</p>
      </div>
    </section>

    <div class="tiles">
      ${e.quits.map(A=>t`<div class="tile"><span class="tile-k">${A.emoji} ${A.label}-free</span><b>${Math.floor(W(A,o)/z)}</b><span class="tile-u">days</span></div>`)}
      <div class="tile"><span class="tile-k">💷 Saved</span><b>${G(h,0)}</b><span class="tile-u">so far</span></div>
      <div class="tile"><span class="tile-k">🎯 Goals</span><b>${c}/${e.goals.length}</b><span class="tile-u">complete</span></div>
      <div class="tile"><span class="tile-k">🔥 Best streak</span><b>${b}</b><span class="tile-u">on a habit</span></div>
      <div class="tile"><span class="tile-k">✍️ Check-ins</span><b>${Object.keys(e.checkins).length}</b><span class="tile-u">logged</span></div>
      <div class="tile"><span class="tile-k">🛡️ Cravings beaten</span><b>${e.cravings.filter(A=>A.beaten).length}</b><span class="tile-u">with SOS</span></div>
      <div class="tile"><span class="tile-k">⏱️ SOS time</span><b>${Math.round(e.cravings.reduce((A,P)=>A+(P.secs||0),0)/60)}</b><span class="tile-u">minutes ridden out</span></div>
    </div>

    <${yn} s=${e} />

    <div class="pad-x mt16"><${K} options=${[{value:14,label:"2 weeks"},{value:30,label:"30 days"},{value:90,label:"90 days"}]} value=${n} onChange=${a} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${as} keys=${v} series=${[{name:"Mood",color:"#5AC8FA",values:m}]} yMin=${1} yMax=${5} yTicks=${[1,3,5]}
          yFmt=${A=>be[Math.round(A)-1]?.e??A} height=${170} />
      </div>
    </section>

    ${y.length>0&&t`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${y.length>1&&t`<${ba} series=${y} />`}
        <${as} keys=${v} series=${y} yMin=${0} yMax=${10} yTicks=${[0,5,10]} unit="/10" height=${190} />
        ${C&&t`<p class="insight">${C}</p>`}
      </div>
    </section>`}

    <${_n} s=${e} />

    <${Eo} s=${e} />
  <//>`}var qs=["12–4am","4–8am","8am–12","12–4pm","4–8pm","8pm–12"],Bs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function Eo({s:e}){let s=[...e.cravings.map(h=>new Date(h.t)),...e.quits.flatMap(h=>(h.resets||[]).map(v=>Je(v.to)))],n=Array.from({length:7},()=>Array(6).fill(0));s.forEach(h=>{n[(h.getDay()+6)%7][Math.floor(h.getHours()/4)]++});let a=Math.max(1,...n.flat()),o=null;n.forEach((h,v)=>h.forEach((m,y)=>{m&&(!o||m>o.n)&&(o={n:m,w:v,b:y})}));let r={};e.cravings.forEach(h=>(h.triggers||[]).forEach(v=>{r[v]=(r[v]||0)+1})),e.quits.forEach(h=>(h.resets||[]).forEach(v=>(v.triggers||[]).forEach(m=>{r[m]=(r[m]||0)+1})));let i=Object.entries(r).sort((h,v)=>v[1]-h[1]).slice(0,6),u=st.map(()=>[]);Object.values(e.checkins).forEach(h=>{if(!h.sleep)return;let v=e.quits.map(m=>h[m.id]).filter(m=>typeof m=="number");v.length&&u[h.sleep-1].push(v.reduce((m,y)=>m+y,0)/v.length)});let l=u.map(h=>h.length?h.reduce((v,m)=>v+m,0)/h.length:null),d=[...u[0],...u[1]],p=[...u[3],...u[4]],$=h=>h.reduce((v,m)=>v+m,0)/h.length,c=d.length>=2&&p.length>=2?`After good sleep your cravings average ${$(p).toFixed(1)}/10, against ${$(d).toFixed(1)}/10 after a bad night.`:null,b=l.filter(h=>h!=null).length>=2;return s.length<3&&!i.length&&!b?null:t`
    ${s.length>=3&&t`<section class="group">
      <h2 class="group-h">When cravings hit</h2>
      <div class="card pad heatmap">
        <div class="heat-grid">
          <span></span>${qs.map(h=>t`<span class="heat-h" key=${h}>${h}</span>`)}
          ${n.map((h,v)=>t`<span class="heat-w" key=${"w"+v}>${Bs[v]}</span>${h.map((m,y)=>t`<i key=${v+"-"+y} title=${`${Bs[v]} ${qs[y]}: ${m}`}
            style=${`--a:${m?.18+m/a*.82:0}`} class=${m?"on":""}>${m||""}</i>`)}`)}
        </div>
        <p class="tiny muted">${o?`Your toughest time is ${Bs[o.w]} ${qs[o.b]}. Plan something for then.`:""} From ${s.length} craving${s.length===1?"":"s"} and slips you logged.</p>
      </div>
    </section>`}

    ${i.length>0&&t`<section class="group">
      <h2 class="group-h">What sets cravings off</h2>
      <div class="card pad bars">
        ${i.map(([h,v])=>t`<div class="bar-row" key=${h}>
          <span class="bar-l">${h}</span>
          <span class="bar-t"><i style="width:${v/i[0][1]*100}%"></i></span>
          <b>${v}</b>
        </div>`)}
        <p class="tiny muted">From Craving SOS and any slips you logged.</p>
      </div>
    </section>`}

    ${b&&t`<section class="group">
      <h2 class="group-h">Sleep and cravings</h2>
      <div class="card pad bars">
        ${st.map((h,v)=>l[v]!=null&&t`<div class="bar-row" key=${h}>
          <span class="bar-l">${h} sleep</span>
          <span class="bar-t"><i style="width:${l[v]/10*100}%;background:#BF5AF2"></i></span>
          <b>${l[v].toFixed(1)}</b>
        </div>`)}
        <p class="tiny muted">${c||"Average craving (out of 10) on days after each kind of night. Keep logging sleep to see a pattern."}</p>
      </div>
    </section>`}`}var To=tt(()=>import("./c-KFOEXMLE.js"),"FlowGame",()=>t`<div class="lazy-wait" role="status">Loading the puzzle…</div>`),Mo=300,No=["Breathe in","Hold","Breathe out"];function Qn({compact:e}){return t`<button class="sos tap ${e?"compact":""}" onClick=${Se}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!e&&t`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${g.chevron()}</span>
  </button>`}function Se(){B(e=>t`<${xo} close=${e} />`,{tall:!0})}function xo({close:e}){let s=N(),[n]=f(Date.now()),a=U(250),[o,r]=f("ride"),[i,u]=f("breathe"),[l,d]=f(!0),[p,$]=f(s.quits.map(T=>T.id)),[c,b]=f([]),[h,v]=f([]),[m,y]=f(0),C=(a-n)/1e3,w=Math.max(0,Mo-Math.floor(C)),k=C%14,L=k<4?0:k<8?1:2,j=le(L);q(()=>{o==="ride"&&j.current!==L&&(j.current=L,S(L===0?12:6))},[L]);let[Qe]=f(()=>{let T=s.quits,Q=T.reduce((_,Ne)=>_+Z(Ne,W(Ne)),0),me=[...Js].sort(()=>Math.random()-.5).slice(0,4),re=s.reasons.map(_=>({k:"Your reason",e:"💙",t:_.text})),Ve=[{k:"Money saved",e:"💷",t:`${G(Q)} so far. This craving wants to take that back.`}];T.forEach(_=>{let Ne=W(_)/z,_t=Mt(Ne);Ve.push({k:`${_.label}-free`,e:_.emoji,t:`${Math.floor(Ne)} days in.${_t.next?` ${_t.next.label} in ${ye(_t.next.days-Ne)}. Don’t reset the clock for five minutes of nothing.`:""}`})}),me.forEach(_=>Ve.push({k:"Try this now",e:_.e,t:_.t}));let zt=[];for(let _=0;_<Math.max(re.length,Ve.length);_++)re[_]&&zt.push(re[_]),Ve[_]&&zt.push(Ve[_]);return zt}),fe=Qe[Math.floor(C/9)%Qe.length],[O,A]=f(null);q(()=>{cs("open").then(A).catch(()=>{})},[]);let P=T=>{S(15),d(T),y(Math.round(C)),r("log"),T&&cs("beaten").catch(()=>{})},ee=(T,Q,me)=>{S(),Q(T.includes(me)?T.filter(re=>re!==me):[...T,me])},ie=()=>{let T=s.cravings.filter(Q=>Q.beaten).length+(l?1:0);x(Q=>Q.cravings.push({id:ce(),t:Date.now(),quitIds:p,triggers:c,beaten:l,secs:m})),h.forEach(Q=>St(Q)),e(),E(l?`Craving beaten. That’s ${T} 🛡️`:h.length?"Counter restarted. Go again.":"Logged. Keep going.")};if(o==="log")return t`
      <${M} title=${l?"Craving beaten":"That’s okay"} right=${t`<button class="link b" onClick=${ie}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${l?"🛡️":"🤝"}</div>
          <h2>${l?"You rode it out.":"One slip doesn’t undo the work."}</h2>
          <p class="muted">${l?`${m<60?"Under a minute":`${Math.round(m/60)} minute${Math.round(m/60)===1?"":"s"}`} and it passed. Every craving you beat makes the next one weaker.`:"Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern."}</p>
        </div>
        <${D} header="Which craving?">
          <div class="chip-row">${s.quits.map(T=>t`<button class="chip big ${p.includes(T.id)?"on":""}" style="--c:${T.color}" onClick=${()=>ee(p,$,T.id)}>${T.emoji} ${T.label}</button>`)}</div>
        <//>
        <${D} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${pe.map(T=>t`<button class="chip big ${c.includes(T)?"on":""}" style="--c:#3B9BFF" onClick=${()=>ee(c,b,T)}>${T}</button>`)}</div>
        <//>
        ${!l&&t`<${D} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${s.quits.filter(T=>p.includes(T.id)).map(T=>t`<div class="row" key=${T.id}>
            <span class="row-ic tint-ic" style="--c:${T.color}">${T.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${T.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${ae} on=${h.includes(T.id)} label=${`Restart ${T.label}`} onChange=${()=>ee(h,v,T.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${ie}>Save</button>
      </div>`;let Ce=Math.floor(w/60),Me=J(w%60);return t`
    <${M} title="Craving SOS" left=${t`<button class="link" onClick=${e}>Close</button>`} />
    <div class="sheet-body sos-body">
      ${i==="game"?t`<${To} onExit=${()=>{S(),u("breathe")}} />`:t`
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${No[L]}</div>
      </div>
      <div class="sos-timer">${w>0?t`<b>${Ce}:${Me}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`:t`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      ${O&&t`<p class="sos-pulse">🌍 ${O.now>0?t`<b>${O.now===1?"Someone else is":`${O.now} others are`}</b> riding one out right now. `:""}${O.beaten>0?t`<b>${O.beaten}</b> craving${O.beaten===1?"":"s"} beaten on Novum in the last day. You’re next.`:"You’re not alone in this. Every craving passes."}</p>`}
      <${Oa} s=${s} />
      <${zn} s=${s} picked=${c} onPick=${T=>b(c.includes(T)?c.filter(Q=>Q!==T):[...c,T])} />
      <div class="card sos-card" key=${fe.t}>
        <span class="sos-card-e">${fe.e}</span>
        <div><div class="sos-card-k">${fe.k}</div><div class="sos-card-t">${fe.t}</div></div>
      </div>
      <button class="sos-game" onClick=${()=>{S(),u("game")}}><span>🧩</span><span class="row-main"><b>Play a 2-minute puzzle instead</b><small>Keeping your eyes and mind busy weakens the craving</small></span></button>
      ${s.reasons.length===0&&t`<button class="link sm center-link" onClick=${Ue}>Add your reasons for quitting, so they show up here</button>`}`}
      <${Fo} />
      <div class="sos-actions">
        <button class="btn btn-primary block big ${w===0?"glow":""}" onClick=${()=>P(!0)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${()=>P(!1)}>I gave in</button>
      </div>
    </div>`}function Ue(){B(e=>t`<${Io} close=${e} />`,{tall:!0})}function Io({close:e}){let s=N(),[n,a]=f(""),o=i=>{i=i.trim(),i&&(S(10),x(u=>u.reasons.push({id:ce(),text:i})),a(""))},r=new Set(s.reasons.map(i=>i.text));return t`
    <${M} title="My reasons" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${n} maxlength="140" onInput=${i=>a(i.target.value)} onKeyDown=${i=>i.key==="Enter"&&o(n)} />
        <button class="btn btn-primary sm" disabled=${!n.trim()} onClick=${()=>o(n)}>Add</button>
      </div>
      ${s.reasons.length>0&&t`<${D} header="Your reasons">
        ${s.reasons.map(i=>t`<div class="row" key=${i.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${i.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${()=>x(u=>{u.reasons=u.reasons.filter(l=>l.id!==i.id)})}>${g.trash()}</button>
        </div>`)}
      <//>`}
      <${D} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${Zs.filter(i=>!r.has(i)).map(i=>t`<button class="row tap" key=${i} onClick=${()=>o(i)}>
          <span class="row-main"><span class="row-title">${i}</span></span>
          <span class="add-pill">${g.plus()}</span>
        </button>`)}
      <//>
    </div>`}function Fo(){let e=Lt(),[s,n]=f(0),[a,o]=f(0),[r,i]=f([]),[u,l]=f(!1),d=le(0);if(q(()=>{if(!s)return;let $=async()=>{try{let h=(await Tt()).items.filter(v=>v.kind==="cheer"&&v.at>=s-2e3).reverse();h.length>d.current&&S([12,40,12]),d.current=h.length,i(h)}catch{}};$();let c=setInterval($,6e3);return()=>clearInterval(c)},[s]),!e.loaded||!e.buddies.length)return null;let p=async()=>{if(!u){l(!0),S(12);try{let $=await Ia();o($.sent),n($.at||Date.now())}catch($){E($.message)}l(!1)}};return s?t`<div class="card sos-cheers">
    <div class="sos-cheers-h">💙 Sent to ${a} bud${a===1?"dy":"dies"}. ${r.length?"They’re with you:":"Their cheers will pop up here."}</div>
    ${r.map($=>{let c=Fe.find(b=>b.kind===$.data.kind)||Fe[0];return t`<div class="sos-cheer" key=${$.id}><${ve} a=${$.who.avatar} name=${$.who.firstName} size=${30} /><span><b>${$.who.firstName}</b> ${c.e} ${c.l.toLowerCase()}</span></div>`})}
  </div>`:t`<button class="sos-ask" disabled=${u} onClick=${p}>
    <span>🤝</span><span class="row-main"><b>${u?"Asking…":"Ask my buddies for support"}</b><small>They’ll get a notification and can cheer you on</small></span>
  </button>`}function mt(){B(e=>t`<${Lo} close=${e} />`,{tall:!0})}function Lo({close:e}){let s=N(),n=new Set(s.quits.map(v=>v.kind)),a=xe.filter(v=>!n.has(v.kind)),[o,r]=f(null),[i,u]=f(""),[l,d]=f(Ze(new Date)),[p,$]=f(""),c=o?Gs(o):null,b=o&&l&&(o!=="other"||i.trim()),h=()=>{S(15),x(v=>v.quits.push({id:o,kind:o,label:o==="other"?i.trim():c.label,emoji:c.emoji,color:c.color,start:l,monthly:parseFloat(p)||0,best:0,resets:[]})),e(),E(`${o==="other"?i.trim():c.label} added`)};return t`
    <${M} title="Add something to quit" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!b} onClick=${h}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${a.map(v=>t`<button class="pick ${o===v.kind?"on":""}" style="--c:${v.color}" onClick=${()=>{S(),r(v.kind)}}>
          <span class="pick-e">${v.emoji}</span><span class="pick-l">${v.label}</span><span class="pick-tick">${g.check()}</span></button>`)}
      </div>
      ${o&&t`
        <${D} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${o==="other"&&t`<${H} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${i} onInput=${v=>u(v.target.value)} /><//>`}
          <${H} label="Quit at"><input type="datetime-local" value=${l} onInput=${v=>d(v.target.value)} /><//>
          <${H} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${p} onInput=${v=>$(v.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!b} onClick=${h}>Add</button>`}
    </div>`}function bt(e){B(s=>t`<${Po} id=${e} close=${s} />`,{tall:!0})}function Po({id:e,close:s}){let a=N().quits.find(y=>y.id===e),[o,r]=f(a?.start||""),[i,u]=f(String(a?.monthly??0)),[l,d]=f(String(a?Le(a):20));if(!a)return t`<${M} title="Removed" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let p=Ze(te(new Date,60)),$=o&&!Number.isNaN(Je(o).getTime())&&o<=p&&parseFloat(i)>=0,c=()=>{$&&(S(12),x(y=>{let C=y.quits.find(k=>k.id===e);C.start=o,C.monthly=parseFloat(i);let w=parseFloat(l);Number.isFinite(w)&&w>=0&&(C.minutes=Math.min(1440,w))}),s())},b=W(a),h=Math.max(a.best||0,b),v=()=>ne({title:`Remove ${a.label}`,danger:!0,text:`This removes the ${a.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,confirm:"Remove",onConfirm:()=>{s(),x(y=>{y.quits=y.quits.filter(C=>C.id!==e)}),E(`${a.label} removed`)}}),m=parseFloat(i)||0;return t`
    <${M} title=${`${a.emoji} ${a.label}`} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" disabled=${!$} onClick=${c}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${H} label="Quit at"><input type="datetime-local" value=${o} max=${p} onInput=${y=>r(y.target.value)} /><//>
      <//>
      <${D} header="What it cost you" footer=${`About ${G(m*12/52)} a week, or ${G(m*12,0)} a year. If it varied, use a middle figure.`}>
        <${H} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${i} onInput=${y=>u(y.target.value)} /><//>
      <//>
      <${D} header="Time it took" footer=${`Minutes a day, roughly: buying, using, recovering.${Vt[a.kind]?` Usually ${Vt[a.kind]} minutes for ${a.kind==="weed"?"cannabis":"nicotine"}.`:""} Used for “time reclaimed” on Home.`}>
        <${H} label="Per day (min)"><input type="number" inputmode="numeric" min="0" max="1440" value=${l} onInput=${y=>d(y.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(b/z)}</b><span>days now</span></div>
        <div><b>${Math.floor(h/z)}</b><span>best run</span></div>
        <div><b>${(a.resets||[]).length}</b><span>restarts</span></div>
      </div>
      ${ue(a)&&t`<button class="btn btn-plain block" onClick=${()=>vt(e)}>See the health timeline</button>`}
      ${(a.resets||[]).length>0&&a.monthly>0&&t`<p class="muted center tiny">Saved overall, slips included: <b>${G(ca(a),0)}</b></p>`}
      ${b>0&&t`<button class="btn btn-tinted block" onClick=${()=>Ft(It([a],b/z,Z(a,b)))}>Share my streak</button>`}
      ${b>0&&t`<button class="btn btn-plain block" onClick=${()=>{s(),setTimeout(()=>Os(e),350)}}>I slipped</button>`}
      <button class="btn btn-plain danger block" onClick=${v}>Remove from Novum</button>
    </div>`}function vt(e){B(s=>t`<${qo} initial=${e} close=${s} />`,{tall:!0})}function qo({initial:e,close:s}){let a=N().quits.filter(p=>ue(p)),[o,r]=f(e),i=a.find(p=>p.id===o)||a[0];if(!i)return t`<${M} title="Recovery timeline" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let u=W(i)/36e5,l=ue(i)||[],d=p=>p===0?"Before you start":p<1?`${Math.round(p*60)} minutes`:p<48?`${p} hours`:p<336?`${Math.round(p/24)} days`:p<1440?`${Math.round(p/168)} weeks`:p<8760?`${Math.round(p/730)} months`:"1 year";return t`
    <${M} title="Recovery timeline" right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      ${a.length>1&&t`<div class="pad-b"><${K} small=${a.length>3} options=${a.map(p=>({value:p.id,label:`${p.emoji} ${p.label}`}))} value=${i.id} onChange=${r} /></div>`}
      <ol class="timeline" style="--c:${i.color}">
        ${l.map(p=>{let $=u>=p.h;return t`<li class=${$?"done":""}>
            <span class="tl-dot">${$?g.check():""}</span>
            <div class="tl-when">${d(p.h)} · ${p.area}${$?"":t` <em>in ${ye((p.h-u)/24)}</em>`}</div>
            <div class="tl-title">${p.title}</div>
            <div class="tl-text">${p.text}</div>
          </li>`})}
      </ol>
      <p class="disclaimer">${Ks}</p>
    </div>`}function Os(e){B(s=>t`<${Bo} id=${e} close=${s} />`,{tall:!0})}function Bo({id:e,close:s}){let n=N(),a=n.quits.filter(O=>se(O)<=new Date),[o,r]=f(e&&a.some(O=>O.id===e)?e:a[0]?.id),[i,u]=f("now"),[l,d]=f(Ze(new Date)),[p,$]=f([]),[c,b]=f(""),[h,v]=f(null),m=n.quits.find(O=>O.id===o);if(!m)return t`<${M} title="Slipped up" right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body"><p class="muted center sheet-intro">There’s no running counter to reset yet.</p></div>`;if(h)return t`
    <${M} right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body slip-done">
      <div class="wiz-emoji">🌱</div>
      <h2 class="auth-title center">Fresh start</h2>
      <p class="wiz-sub center">Your ${m.label.toLowerCase()} counter starts again now. That’s all a slip is: a restart, not a reset of you.</p>
      <div class="stats3">
        <div><b>${Math.floor(h.best/z)}</b><span>best run (days)</span></div>
        <div><b>${G(h.life,0)}</b><span>saved overall</span></div>
        <div><b>1 day</b><span>next milestone</span></div>
      </div>
      <button class="btn btn-primary block big" onClick=${()=>{s(),setTimeout(Se,300)}}>Breathe for a minute</button>
      <button class="btn btn-plain block big" onClick=${s}>I’m okay</button>
    </div>`;let y=i==="now"?new Date:Je(l),C=i==="now"||!Number.isNaN(y.getTime())&&y<=new Date&&y>=se(m),w=Math.max(0,(C?y:new Date)-se(m)),k=Math.max(m.best||0,w),L=la(m)-W(m),j=Z(m,L+w),Qe=O=>{S(6),$(p.includes(O)?p.filter(A=>A!==O):[...p,O])},fe=()=>{C&&(St(m.id,{at:y,triggers:p,note:c.trim()}),S(15),v({best:k,life:j}))};return t`
    <${M} title="Slipped up" left=${t`<button class="link" onClick=${s}>Cancel</button>`} />
    <div class="sheet-body">
      <div class="slip-hero">
        <div class="wiz-emoji">🤍</div>
        <h2 class="auth-title center">A slip isn’t starting over</h2>
        <p class="wiz-sub center">Most people who quit for good had a few goes first. What matters is the next hour, not the last one.</p>
      </div>
      ${a.length>1&&t`<${D} header="Which one">
        <div class="pad"><${K} options=${a.map(O=>({value:O.id,label:`${O.emoji} ${O.label}`}))} value=${o} onChange=${r} /></div>
      <//>`}
      <${D} header="When" footer=${C?"":t`<span class="err">Pick a time after your quit date and not in the future.</span>`}>
        <div class="pad"><${K} options=${[{value:"now",label:"Just now"},{value:"earlier",label:"Earlier"}]} value=${i} onChange=${u} /></div>
        ${i==="earlier"&&t`<${H} label="At"><input type="datetime-local" value=${l} max=${Ze(new Date)} onInput=${O=>d(O.target.value)} /><//>`}
      <//>
      <${D} header="What set it off?" footer="Optional. Spotting patterns is how next time goes differently. They show up in Progress.">
        <div class="chip-row">${pe.map(O=>t`<button class="chip big ${p.includes(O)?"on":""}" aria-pressed=${p.includes(O)} onClick=${()=>Qe(O)}>${O}</button>`)}</div>
      <//>
      <${D} header="Anything else?">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="280" placeholder="What happened, how you felt, what might help next time…" value=${c} onInput=${O=>b(O.target.value)}></textarea></div>
      <//>
      <div class="card pad slip-keep">
        <div><span>🏅</span><span>Your best run of <b>${Math.floor(k/z)} day${Math.floor(k/z)===1?"":"s"}</b> stays on record.</span></div>
        ${m.monthly>0&&t`<div><span>💷</span><span>You’ve still saved <b>${G(j,0)}</b> overall. That doesn’t go anywhere.</span></div>`}
      </div>
      <button class="btn btn-primary block big" disabled=${!C} onClick=${fe}>Restart my counter</button>
    </div>`}var Oo=ge(()=>import("./c-YOZ6G4L5.js"),"openAdmin"),Ro=ge(()=>import("./c-HLJCBISQ.js"),"openPrivacy"),jo=ge(()=>import("./c-KRTO7VEM.js"),"openCredits"),I={tools:"#3B9BFF",health:"#30D158",social:"#FF9F0A",settings:"#A2A8B8",danger:"#FF453A"};function Wo(){let[e,s]=f(Cn());q(()=>An(s),[]),U(3e4);let a={syncing:"Saving…",synced:`Saved to your account ${(r=>{let i=Math.round((Date.now()-r)/6e4);return i<1?"just now":i<60?`${i} min ago`:`${Math.round(i/60)} hr ago`})(e.at)}`,offline:"Offline. Changes save when you’re back online",error:e.error||"Couldn’t save. Tap to retry",idle:"Waiting to save"}[e.state],o={syncing:g.refresh,synced:g.cloud,offline:g.wifiOff,error:g.alert,idle:g.cloud}[e.state]();return t`<${F} icon=${o} tint=${e.state==="error"?I.danger:I.settings} title="Account sync" sub=${a} onClick=${()=>{S(),oe()}} />`}function Vn(){let[e,s]=f(N());return q(()=>Pe(n=>s(n)),[]),e}var Yo=(e,s)=>`${e} ${s}${e===1?"":"s"}`;function Ho({s:e}){let s=U(6e4),n=e.quits.filter(i=>se(i).getTime()<=s),a=n.length?Math.max(...n.map(i=>Math.floor(W(i,s)/864e5))):0,o=Ht(e,s),r=da(e);return t`<div class="pstats">
    <div><b>${a}</b><span>${a===1?"day free":"days free"}</span></div>
    <div><b>${G(o,0)}</b><span>saved</span></div>
    <div><b>${r}</b><span>check-in streak</span></div>
  </div>`}function Jn({s:e}){let[s,n]=f(0),a=async()=>{await Promise.all([Promise.resolve(oe()).catch(()=>{}),Et().catch(()=>{}),Ye(),he()]),n(m=>m+1)},o=e.profile,r=X()?.user||{},i=Be(o),u=Ct(i,o.heightCm),l=Xt(u),d=e.quits.filter(m=>ue(m)),p=Lt(),$=U(6e4),c=nt(),b=Ee(),h=[...new Set(b.items.filter(m=>m.kind==="cheer"&&m.data?.kind==="water"&&$-m.at<7*864e5).map(m=>m.who.firstName))],v=t`<button class="icon-btn gear-btn" aria-label="Account settings" onClick=${Xo}>${g.gear()}</button>`;return t`<${$e} title="Profile" titleRight=${v} onRefresh=${a}>
    <${$n} key=${s} s=${e} />
    ${e.quits.length>0&&t`<${Ho} s=${e} />`}
    <section class="group"><${dn} s=${e} waterers=${h} /></section>
    <section class="group"><${cn} earned=${rn(e,$)} mine s=${e} /></section>

    <${D} header="Your quits">
      ${e.quits.map(m=>{let y=se(m).getTime(),C=Math.floor(($-y)/864e5);return t`<${F} key=${m.id} icon=${m.emoji} tint=${m.color} title=${m.label}
          detail=${y>$?"Quit day soon":Yo(C,"day")} chevron onClick=${()=>bt(m.id)} />`})}
      ${e.quits.length<xe.length&&t`<${F} icon=${g.plus()} tint=${I.tools} title="Add something to quit" chevron onClick=${mt} />`}
    <//>

    <${D} header="Staying quit">
      <${F} icon=${g.heart()} tint=${I.tools} title="My reasons" detail=${e.reasons.length||"Add"} chevron onClick=${Ue} />
      <${F} icon=${g.mail()} tint=${I.tools} title="Letters to future you" detail=${(e.letters||[]).length||"Write one"} chevron onClick=${at} />
      <${F} icon=${g.calendar()} tint=${I.tools} title="Plan ahead" detail=${Object.keys(e.plans||{}).length+(e.events||[]).filter(m=>!m.outcome&&m.date>=R()).length||"Add"} chevron onClick=${we} />
      ${e.quits.some(m=>m.monthly>0)&&t`<${F} icon=${g.gift()} tint=${I.tools} title="Saving for" detail=${e.wishlist.length||"Add"} chevron onClick=${js} />`}
    <//>

    <${D} header="Health">
      ${d.length>0&&t`<${F} icon=${g.pulse()} tint=${I.health} title="Recovery timeline" chevron onClick=${()=>vt(d[0].id)} />`}
      <${F} icon=${g.scale()} tint=${I.health} title="Body" chevron onClick=${Go}
        detail=${t`<span class="body-detail">${i?`${i.toFixed(1)} kg`:"Add weight"}${u&&t`<span class="pill sm ${l.tone}">BMI ${u.toFixed(1)}</span>`}</span>`} />
    <//>

    <${D} header="Friends">
      <${F} icon=${g.users()} tint=${I.social} title="Buddies" detail=${p.loaded?p.incoming.length?`${p.incoming.length} new`:p.buddies.length||"Add":""} chevron onClick=${gn} />
      <${F} icon=${g.search()} tint=${I.social} title="Find people" chevron onClick=${()=>hn("discover")} />
    <//>


    <${D} header="Settings">
      <${F} icon=${g.bell()} tint=${I.settings} title="Notifications" detail=${$s()?c.enabled?"On":"Off":"Not set up"} chevron onClick=${zo} />
      <${F} icon=${g.shield()} tint=${I.settings} title="Your data & privacy" chevron onClick=${Uo} />
      <${F} icon=${g.compass()} tint=${I.settings} title="Show the tour again" chevron onClick=${Wn} />
      ${r.isAdmin&&t`<${F} icon=${g.sliders()} tint=${I.settings} title="Admin" chevron onClick=${Oo} />`}
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>${gt}</span>
      <span class="tiny">Version 2.0</span>
    </div>
  <//>`}function Go(){B(e=>t`<${Ko} close=${e} />`,{tall:!0})}function Ko({close:e}){let n=Vn().profile,a=Be(n),o=Ct(a,n.heightCm),r=Xt(o),i=Zt(n),u=o?Math.max(0,Math.min(100,(o-15)/20*100)):0;return t`
    <${M} title="Body" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${D}>
        <${F} icon=${g.ruler()} tint=${I.health} title="Age and height" detail=${`${i??"–"} · ${n.heightCm?`${n.heightCm} cm`:"–"}`} chevron onClick=${Jo} />
        <${F} icon=${g.scale()} tint=${I.health} title="Weight" detail=${a?`${a.toFixed(1)} kg`:"Add"} chevron onClick=${Rs} />
      <//>
      <${D} footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
        <div class="bmi">
          <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${o?o.toFixed(1):"–"}</div></div><span class="pill ${r.tone}">${r.label}</span></div>
          <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${o&&t`<b style="left:${u}%"></b>`}</div>
          <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
        </div>
      <//>
    </div>`}function zo(){B(e=>t`<${_o} close=${e} />`,{tall:!0})}function _o({close:e}){let s=Vn();return t`
    <${M} title="Notifications" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body"><${pi} s=${s} header=${null} /></div>`}function Uo(){B(e=>t`<${Qo} close=${e} />`,{tall:!0})}function Qo({close:e}){let s=le(),n=async a=>{let o=a.target.files[0];if(a.target.value="",!o)return;let r=await o.text(),i="";try{let u=JSON.parse(r);i=u.exportedAt?` from ${V(new Date(u.exportedAt))}`:""}catch{E("That file isn’t valid JSON");return}ne({title:"Restore backup",text:`Replace everything in your account with the backup${i}? Your current data will be overwritten on every device.`,confirm:"Restore backup",onConfirm:()=>{try{ra(r),E("Backup restored")}catch(u){E(u.message)}}})};return t`
    <${M} title="Your data & privacy" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${D} footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
        <${Wo} />
        <${F} icon=${g.doc()} tint=${I.settings} title="Privacy notice" sub="What’s stored, who can see it, your rights" chevron onClick=${Ro} />
        <${F} icon=${g.star()} tint=${I.settings} title="Credits & licences" sub="The artists and code Novum is built with" chevron onClick=${jo} />
      <//>
      <${D} header="Backups">
        <${F} icon=${g.share()} tint=${I.tools} title="Export a copy" sub="Everything: account, profile, check-ins, goals" chevron onClick=${Vo} />
        <${F} icon=${g.download()} tint=${I.tools} title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${()=>s.current.click()} />
        <input type="file" accept="application/json,.json" ref=${s} onChange=${n} hidden />
      <//>
      <${D} footer="Clears every counter, check-in, goal and note and takes you back to Day Zero. Your login stays the same.">
        <${F} icon=${g.undo()} tint=${I.danger} title="Start over" danger onClick=${()=>ne({title:"Start over",text:"This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.",confirm:"Clear and start over",onConfirm:()=>{ss(),qe(sa()),E("Fresh start")}})} />
      <//>
    </div>`}async function Vo(){let e=X()?.user||{},s=ia({firstName:e.firstName,lastName:e.lastName,username:e.username,email:e.email,dob:e.dob,memberSince:e.createdAt?new Date(e.createdAt).toISOString():""}),n=`novum-backup-${R()}.json`,a=new File([s],n,{type:"application/json"});try{if(navigator.canShare&&navigator.canShare({files:[a]})){await navigator.share({files:[a],title:"Novum backup"});return}}catch(r){if(r.name==="AbortError")return}let o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=n,document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(o.href),o.remove()},1e3),E("Backup saved")}function Jo(){B(e=>t`<${Zo} close=${e} />`)}function Zo({close:e}){let s=N().profile,[n,a]=f(s.dob||""),[o,r]=f(s.heightCm?String(s.heightCm):""),i=/^\d{4}-\d{2}-\d{2}$/.test(n)&&Ae(n)<new Date,u=i&&+o>=100&&+o<=250,l=async()=>{if(n!==s.dob)try{await Re({dob:n})}catch(d){E(d.message);return}x(d=>{d.profile.dob=n,d.profile.heightCm=Math.round(+o)}),S(12),e()};return t`
    <${M} title="Age and height" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!u} onClick=${l}>Save</button>`} />
    <div class="sheet-body">
      <${D} footer=${i?`${Zt({dob:n})} years old`:""}>
        <${H} label="Date of birth"><input type="date" max=${R()} value=${n} onInput=${d=>a(d.target.value)} /><//>
        <${H} label="Height (cm)"><input type="number" inputmode="decimal" value=${o} onInput=${d=>r(d.target.value)} /><//>
      <//>
    </div>`}function Xo(){B(e=>t`<${ei} close=${e} />`,{tall:!0})}function ei({close:e}){let s=X()?.user||{},[n,a]=f({firstName:s.firstName||"",lastName:s.lastName||"",username:s.username||""}),[o,r]=f(null),[i,u]=f(!1),l=Object.keys(n).some(c=>n[c].trim()!==(s[c]||"")),d=c=>b=>a({...n,[c]:b.target.value}),p=async()=>{u(!0),r(null);let c=Object.fromEntries(Object.keys(n).filter(b=>n[b].trim()!==(s[b]||"")).map(b=>[b,n[b].trim()]));try{await Re(c),S(15),E("Account updated"),r(null)}catch(b){r({err:b.message})}u(!1)},$=()=>ne({title:"Log out",danger:!1,confirm:"Log out",text:"Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.",onConfirm:async()=>{e(),await ti()}});return t`
    <${M} title="Account" left=${t`<button class="link" onClick=${e}>Close</button>`} right=${t`<button class="link b" disabled=${!l||i} onClick=${p}>${i?"Saving…":"Save"}</button>`} />
    <div class="sheet-body">
      <${D} header="Your details" footer=${o?.err?t`<span class="err">${o.err}</span>`:`Member since ${s.createdAt?V(new Date(s.createdAt)):"–"}`}>
        <${H} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${n.firstName} onInput=${c=>a({...n,firstName:ts(c.target.value)})} /><//>
        <${H} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${n.lastName} onInput=${c=>a({...n,lastName:ts(c.target.value)})} /><//>
        <${H} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${n.username} onInput=${d("username")} /><//>
        <${F} title="Email" detail=${s.email} chevron onClick=${si} />
      <//>
      <${D}>
        <${F} icon=${g.key()} tint=${I.settings} title="Change password" chevron onClick=${ni} />
        <${F} icon=${g.phone()} tint=${I.settings} title="Logged-in devices" chevron onClick=${di} />
        <${F} icon=${g.logout()} tint=${I.settings} title="Log out" chevron onClick=${$} />
      <//>
      <${D} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${F} icon=${g.trash()} tint=${I.danger} title="Delete account" danger onClick=${ii} />
      <//>
    </div>`}async function ti(){let e=X()?.user?.id;try{await Tn()}catch{}try{await xt()}catch{}ot(),Ge(),await wa(),Xe({wipe:!0}),e&&Cs(e)}function si(){B(e=>t`<${ai} close=${e} />`)}function ai({close:e}){let[s,n]=f(""),[a,o]=f("email"),[r,i]=f(""),[u,l]=f(0),[d,p]=f(""),[$,c]=f(!1),b=s.trim().toLowerCase(),h=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b)&&b!==(X()?.user?.email||"").toLowerCase(),v=async C=>{await Re({email:b,emailToken:C}),S(20),E("Email updated"),e()},m=async()=>{c(!0),p("");try{(await ya(b,X()?.user?.firstName)).skipped?await v():(l(Date.now()),o("code"))}catch(C){p(C.message)}c(!1)},y=async(C=r)=>{if(!($||C.length!==6)){c(!0),p("");try{let w=await ka(b,C);await v(w.emailToken)}catch(w){p(w.message),i(""),c(!1)}}};return t`
    <${M} title="Change email" left=${t`<button class="link" onClick=${e}>Cancel</button>`} />
    <div class="sheet-body">
      ${a==="email"?t`
        <${D} footer=${d?t`<span class="err">${d}</span>`:"We’ll send a code to the new address to confirm it’s yours."}>
          <${H} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${s} onInput=${C=>{p(""),n(C.target.value)}} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!h||$} onClick=${m}>${$?"Sending…":"Send code"}</button>`:t`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${b}</b>.</p>
        <${hs} value=${r} onChange=${C=>{p(""),i(C)}} onComplete=${y} />
        ${d&&t`<p class="wiz-err">${d}</p>`}
        <button class="btn btn-primary block" disabled=${r.length!==6||$} onClick=${()=>y()}>${$?"Confirming…":"Confirm"}</button>
        <${ms} sentAt=${u} onResend=${m} />`}
    </div>`}function ni(){B(e=>t`<${oi} close=${e} />`)}function oi({close:e}){let[s,n]=f(""),[a,o]=f(""),[r,i]=f(""),[u,l]=f(!1),d=s&&a.length>=8,p=async()=>{l(!0),i("");try{await Sa(s,a),S(15),E("Password changed"),e()}catch($){i($.message)}l(!1)};return t`
    <${M} title="Change password" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!d||u} onClick=${p}>Save</button>`} />
    <div class="sheet-body">
      <${D} footer=${r?t`<span class="err">${r}</span>`:"At least 8 characters. You’ll stay logged in here; other devices are logged out."}>
        <${H} label="Current"><input type="password" autocomplete="current-password" value=${s} onInput=${$=>n($.target.value)} /><//>
        <${H} label="New"><input type="password" autocomplete="new-password" value=${a} onInput=${$=>o($.target.value)} /><//>
      <//>
    </div>`}function ii(){B(e=>t`<${ri} close=${e} />`)}function ri({close:e}){let[s,n]=f(""),[a,o]=f(!1),[r,i]=f(""),[u,l]=f(!1),[d,p]=f(null),[$,c]=f(""),[b,h]=f(0),v=le();q(()=>{d&&setTimeout(()=>v.current?.focus({preventScroll:!0}),350)},[d]);let m=async()=>{let w=X()?.user?.id;ot(),Ge(),ss(),fa(null),Xe({wipe:!0}),w&&(Cs(w),Aa(w,null));try{localStorage.removeItem(`novum.push:${w}`)}catch{}history.replaceState(null,"",location.pathname),window.scrollTo(0,0),E("Account deleted")},y=async(w=$)=>{if(!u){l(!0),i("");try{try{await xt()}catch{}await Ca(s,w),S(20),await m()}catch(k){l(!1),c(""),i(k.message),k.data?.needsCode&&p(d||{emailHint:"your email"})}}},C=async()=>{if(!(u||!s)){l(!0),i("");try{let w=await os(s);if(w.skipped)return l(!1),y("");p({emailHint:w.emailHint}),h(Date.now()),c("")}catch(w){i(w.message)}l(!1)}};return t`
    <${M} title="Delete account" left=${t`<button class="link" onClick=${d?()=>{p(null),i(""),c("")}:e}>${d?"Back":"Cancel"}</button>`} />
    <div class="sheet-body">
      ${d?t`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${d.emailHint}</b>. Enter it to delete your account for good.</p>
          <${Qa} email=${d.emailHint} />
          <${hs} inputRef=${v} value=${$} onChange=${w=>{i(""),c(w)}} />
          <${ms} sentAt=${b} onResend=${async()=>{try{await os(s),h(Date.now()),c(""),E("New code sent")}catch(w){i(w.message)}}} />
          ${r&&t`<p class="auth-err center">${r}</p>`}
          <button class="btn btn-danger block" disabled=${$.length!==6||u} onClick=${()=>y()}>${u?"Deleting…":"Delete my account"}</button>
        </div>`:t`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${D} header="Step 1 of 2 · Your password" footer=${r?t`<span class="err">${r}</span>`:"Then we’ll email you a code to make sure it’s really you."}>
          <${H} label="Password"><div class="tf-row"><input type=${a?"text":"password"} autocomplete="current-password" value=${s}
            onInput=${w=>{i(""),n(w.target.value)}} onKeyDown=${w=>w.key==="Enter"&&C()} />
            <${Ua} on=${a} set=${o} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!s||u} onClick=${C}>${u?"Checking…":"Continue"}</button>`}
    </div>`}function Rs(){B(e=>t`<${li} close=${e} />`,{tall:!0})}function li({close:e}){let s=N(),[n,a]=f(""),[o,r]=f(R()),i=[...s.profile.weights].sort((l,d)=>d.date.localeCompare(l.date)),u=()=>{let l=parseFloat(n);l>20&&l<400&&(S(12),x(d=>{d.profile.weights=d.profile.weights.filter(p=>p.date!==o),d.profile.weights.push({date:o,kg:l})}),a(""),E("Weight logged"))};return t`
    <${M} title="Weight" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${D}>
        <${H} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${Be(s.profile)?.toFixed(1)??"70.0"} value=${n}
          onInput=${l=>a(l.target.value)} onKeyDown=${l=>l.key==="Enter"&&u()} /><//>
        <${H} label="Date"><input type="date" value=${o} max=${R()} onInput=${l=>r(l.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(n)>20)} onClick=${u}>Log weight</button>
      <${D} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${i.map(l=>t`<div class="row" key=${l.date}>
          <span class="row-main"><span class="row-title">${l.kg.toFixed(1)} kg</span><span class="row-sub">${V(l.date)}</span></span>
          <span class="row-detail">BMI ${Ct(l.kg,s.profile.heightCm).toFixed(1)}</span>
          ${i.length>1&&t`<button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>x(d=>{d.profile.weights=d.profile.weights.filter(p=>p.date!==l.date)})}>${g.trash()}</button>`}
        </div>`)}
      <//>
    </div>`}var ci=e=>{let s=Math.floor((Date.now()-e)/6e4);if(s<2)return"active now";if(s<60)return`${s} min ago`;let n=Math.floor(s/60);if(n<24)return`${n} hr${n===1?"":"s"} ago`;let a=Math.floor(n/24);return`${a} day${a===1?"":"s"} ago`};function di(){B(e=>t`<${ui} close=${e} />`,{tall:!0})}function ui({close:e}){let[s,n]=f(null),[a,o]=f(""),r=async()=>{o("");try{n(await Da())}catch(d){o(d.message)}};q(()=>{r()},[]);let i=async d=>{S();try{await Ea(d.id),E(`Logged out of ${d.device}`),r()}catch(p){E(p.message)}},u=()=>ne({title:"Log out other devices",confirm:"Log out others",text:"Every other phone or computer is logged out and will need your password (and an email code) to get back in. This one stays logged in.",onConfirm:async()=>{try{await Ta(),E("Other devices logged out"),r()}catch(d){E(d.message)}}}),l=s?s.sessions.filter(d=>!d.current).length:0;return t`
    <${M} title="Logged-in devices" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      ${a&&t`<p class="auth-err center">${a}</p>`}
      ${!s&&!a&&t`<${Dt} rows=${2} avatar />`}
      ${s&&t`<${D} footer=${s.trusted?`${s.trusted} device${s.trusted===1?" is":"s are"} remembered, so ${s.trusted===1?"it skips":"they skip"} the login code for 30 days.`:"If you don’t recognise a device, log it out and change your password."}>
        ${s.sessions.map(d=>t`<div class="row" key=${d.id}>
          <span class="row-ic tinted" style="--c:${d.current?I.health:I.settings}">${/iPhone|Android|iPad/.test(d.device)?g.phone():g.laptop()}</span>
          <span class="row-main"><span class="row-title">${d.device}</span>
            <span class="row-sub">${d.current?"This device":`Last active ${ci(d.lastSeen)}`} · since ${V(new Date(d.createdAt),{day:"numeric",month:"short"})}</span></span>
          ${!d.current&&t`<button class="link sm danger" onClick=${()=>i(d)}>Log out</button>`}
        </div>`)}
      <//>
      ${l>0&&t`<button class="btn btn-plain danger block" onClick=${u}>Log out all other devices</button>`}`}
    </div>`}function pi({s:e,header:s="Notifications"}){let n=e.notifyPrefs,[a,o]=f(nt()),[r,i]=f(!1),[u,l]=f(""),d=h=>x(v=>{v.notifyPrefs={...v.notifyPrefs,...h}}),p=$s(),[,$]=f(0);q(()=>{let h=()=>{document.visibilityState==="visible"&&(o(nt()),$(v=>v+1))};return document.addEventListener("visibilitychange",h),()=>document.removeEventListener("visibilitychange",h)},[]);let c=async h=>{if(!r){l(""),i(!0);try{h?(await Ka(),E("Notifications on 🔔")):(await xt(),E("Notifications off"))}catch(v){l(v.message)}o(nt()),i(!1)}},b;return p?Wa()&&!ja()?b="On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.":Ra()?Ya()==="denied"&&!a.enabled?b=Ha("denied"):b="On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times, habit ticks and the dates of tough days you plan for to time these.":b="This browser doesn’t support push notifications.":b="Notifications aren’t set up on the server yet.",t`<${D} header=${s} footer=${u?t`<span class="err">${u}</span>`:b}>
    <div class="row">
      <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.bell()}</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${r&&t`<span class="row-sub">Working…</span>`}</span>
      ${p?t`<${ae} on=${a.enabled} label="Notifications" onChange=${c} />`:t`<span class="row-detail">Not set up</span>`}
    </div>
    ${Ja()&&t`<${F} icon=${g.phone()} tint=${I.tools} title=${Va().kind==="inapp"?"Open Novum in Safari":"Add to Home Screen"} sub="Needed for notifications. Shows you how" chevron onClick=${Za} />`}
    ${a.enabled&&p&&t`
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.medal()}</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${ae} on=${n.milestones} label="Milestones" onChange=${h=>d({milestones:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.pencil()}</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin&&t`<input type="time" class="time-in" value=${n.checkinAt} onChange=${h=>h.target.value&&d({checkinAt:h.target.value})} />`}
        <${ae} on=${n.checkin} label="Check-in reminder" onChange=${h=>d({checkin:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.goals()}</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits&&t`<input type="time" class="time-in" value=${n.habitsAt} onChange=${h=>h.target.value&&d({habitsAt:h.target.value})} />`}
        <${ae} on=${n.habits} label="Habit nudges" onChange=${h=>d({habits:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.progress()}</span>
        <span class="row-main"><span class="row-title">Weekly recap</span><span class="row-sub">Sundays: check-ins, cravings and money saved</span></span>
        ${n.recap&&t`<input type="time" class="time-in" value=${n.recapAt} onChange=${h=>h.target.value&&d({recapAt:h.target.value})} />`}
        <${ae} on=${n.recap} label="Weekly recap" onChange=${h=>d({recap:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.users()}</span>
        <span class="row-main"><span class="row-title">Buddies and followers</span><span class="row-sub">Requests, new followers and cheers</span></span>
        <${ae} on=${n.buddies} label="Buddy notifications" onChange=${h=>d({buddies:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${I.tools}`}>${g.sparkle()}</span>
        <span class="row-main"><span class="row-title">Heads-up before tough times</span><span class="row-sub">Learns when cravings usually hit and nudges you 20 minutes before</span></span>
        <${ae} on=${n.nudges!==!1} label="Heads-up before tough times" onChange=${h=>d({nudges:h})} />
      </div>`}
  <//>`}function Zn({s:e}){let[s,n]=f("active"),o=e.goals.map(i=>({g:i,p:De(i,e)})).filter(({p:i})=>s==="done"?i.pct>=1:s==="active"?i.pct<1:!0),r=t`<button class="icon-btn accent" onClick=${()=>Gt()} aria-label="New goal">${g.plus()}</button>`;return t`<${$e} title="Goals" right=${r}>
    <button class="card ny-mini tap" onClick=${_e}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${g.chevron()}</span>
    </button>

    ${e.goals.length===0?t`<${va} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${t`<div class="empty-actions"><button class="btn btn-primary" onClick=${_e}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${()=>Gt()}>Create your own</button></div>`} />`:t`
      <div class="pad-x mb12"><${K} options=${[{value:"active",label:"Active"},{value:"done",label:"Complete"},{value:"all",label:"All"}]} value=${s} onChange=${n} /></div>
      ${o.length===0&&t`<p class="muted center pad">${s==="done"?"Nothing complete yet. You’ll get there.":"Everything’s complete. Time for a new goal?"}</p>`}
      ${Ie.map(i=>{let u=o.filter(({g:l})=>l.category===i.id);return u.length?t`<${D} key=${i.id} header=${i.label}>
          ${u.map(({g:l,p:d})=>t`<${$i} key=${l.id} g=${l} p=${d} />`)}
        <//>`:null})}`}
  <//>`}function $i({g:e,p:s}){let n=(e.ticks||[]).includes(R());return t`<div class="row tap goal-row" role="button" tabindex="0" onClick=${()=>Xn(e.id)}>
    <${et} pct=${s.pct} size=${46} stroke=${5} color=${e.color}><span class="ring-emoji">${e.emoji}</span><//>
    <span class="row-main">
      <span class="row-title">${e.name}</span>
      <span class="row-sub">${es(e)?`Counts from ${V(At(e).start,{day:"numeric",month:"short"})}`:s.label} · ${ps(e)}</span>
    </span>
    ${e.type==="habit"?t`<button class="tick ${n?"on":""}" style="--c:${e.color}" aria-pressed=${n} aria-label="Done today"
          onClick=${a=>{a.stopPropagation(),ke(e.id)}}>${g.check()}</button>`:t`<span class="row-detail">${Math.round(s.pct*100)}%</span><span class="row-chev">${g.chevron()}</span>`}
  </div>`}function Xn(e){B(s=>t`<${hi} id=${e} close=${s} />`,{tall:!0})}function hi({id:e,close:s}){let n=N(),a=n.goals.find(c=>c.id===e),[o,r]=f("");if(!a)return t`<${M} title="Goal" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let i=De(a,n),u=zs(a.category),l=R(),d=()=>ne({title:"Delete goal",text:`Delete “${a.name}”? Its history will be removed too.`,confirm:"Delete goal",onConfirm:()=>{s(),x(c=>{c.goals=c.goals.filter(b=>b.id!==e)}),E("Goal deleted")}}),p=()=>{let c=parseFloat(o);Number.isNaN(c)||(S(12),x(b=>{let h=b.goals.find(v=>v.id===e);h.entries=[...h.entries||[],{id:ce(),date:l,value:c}]}),r(""))},$=null;if(a.type==="habit"){let c=(a.ticks||[]).includes(l),b=Oe(a),h=pa(a),v=h.filter(w=>w.done).length,m=wt(new Date),y=Array.from({length:12},(w,k)=>te(m,-7*(11-k))),C=new Set(a.ticks||[]);$=t`
      <button class="btn block big ${c?"btn-done":"btn-primary"}" style="--c:${a.color}" onClick=${()=>ke(e)}>
        ${c?t`${g.check()} Done today`:"Mark done today"}</button>
      <div class="stats3">
        <div><b>${b.value}</b><span>${b.unit} streak</span></div>
        ${a.perWeek>=7?t`<div><b>${ua(a)}</b><span>best streak</span></div>`:t`<div><b>${v}/${a.perWeek}</b><span>this week</span></div>`}
        <div><b>${(a.ticks||[]).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${h.map((w,k)=>t`<button class="wd ${w.done?"on":""} ${w.key===l?"today":""}" style="--c:${a.color}"
          disabled=${w.key>l} onClick=${()=>ke(e,w.key)}><span>${"MTWTFSS"[k]}</span><i>${w.done?g.check():""}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${a.color}">
          ${y.map(w=>t`<div class="heat-col">${Array.from({length:7},(k,L)=>{let j=R(te(w,L));return t`<i class="${C.has(j)?"on":""} ${j>l?"future":""}" title=${V(j)}></i>`})}</div>`)}
        </div>
      </div>`}else if(a.type==="numeric"&&a.auto==="money")$=t`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${V(At(a).start)}.</div>`;else if(a.type==="numeric"&&a.auto==="weight")$=t`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${Rs}>Log weight</button>`;else if(a.type==="numeric"){let c=[...a.entries||[]].reverse();$=t`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${a.mode==="level"?`New value${a.unit?" ("+a.unit+")":""}`:a.unit==="£"?"Amount you saved (£)":`Add amount${a.unit?" ("+a.unit+")":""}`}
          value=${o} onInput=${b=>r(b.target.value)} onKeyDown=${b=>b.key==="Enter"&&p()} />
        <button class="btn btn-primary sm" disabled=${o===""} onClick=${p}>${a.mode==="level"?"Log":"Add"}</button>
      </div>
      ${c.length>0&&t`<${D} header="History">
        ${c.slice(0,30).map(b=>t`<div class="row" key=${b.id}>
          <span class="row-main"><span class="row-title">${a.mode==="level"?"":"+"}${b.value}${a.unit?" "+a.unit:""}</span><span class="row-sub">${V(b.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>x(h=>{let v=h.goals.find(m=>m.id===e);v.entries=v.entries.filter(m=>m.id!==b.id)})}>${g.trash()}</button>
        </div>`)}
      <//>`}`}else if(a.type==="quit"){let c=n.quits.find(b=>b.id===a.quitId)||n.quits[0];$=t`<div class="card pad info">${c.emoji} Linked to your ${c.label.toLowerCase()} counter. Every day you stay ${c.label.toLowerCase()}-free ${a.period==="2027"?`from ${V($a(a,c))} to the end of 2027 `:""}fills this ring, including the days before you added this goal.</div>`}else $=t`<button class="btn block big ${a.done?"btn-done":"btn-primary"}" style="--c:${a.color}"
      onClick=${()=>{S(15),x(c=>{let b=c.goals.find(h=>h.id===e);b.done=!b.done,b.doneDate=b.done?l:null}),a.done||E("Milestone complete 🎉")}}>
      ${a.done?t`${g.check()} Completed`:"Mark as complete"}</button>`;return t`
    <${M} left=${t`<button class="link" onClick=${()=>Gt(a)}>Edit</button>`}
      right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${et} pct=${i.pct} size=${168} stroke=${18} color=${a.color}>
          <div class="dh-in"><span class="dh-e">${a.emoji}</span><b>${Math.round(i.pct*100)}%</b></div>
        <//>
        <h2 class="dh-name">${a.name}</h2>
        <div class="dh-label">${i.label} <span class="muted">${i.sub}</span></div>
        ${es(a)&&t`<div class="dh-note">Counts from ${V(At(a).start)}. Ticks before then still build your streak.</div>`}
        <div class="chips"><span class="chip" style="--c:${u.color}">${u.label}</span><span class="chip">${We(a)}</span><span class="chip">${ps(a)}</span></div>
      </div>
      ${$}
      <button class="btn btn-plain danger block mt16" onClick=${d}>Delete goal</button>
    </div>`}function Gt(e){B(s=>t`<${mi} goal=${e} close=${s} />`,{tall:!0})}function mi({goal:e={},close:s}){let n=!!e.id,[a,o]=f(()=>({name:"",emoji:"🎯",color:"#3B9BFF",category:"habits",type:"habit",perWeek:7,remindAt:"",period:"2027",end:"2027-12-31",mode:"sum",auto:"",unit:"",target:"",startValue:"",quitId:N().quits[0]?.id||"",...e})),r=c=>o(b=>({...b,...c})),i=N(),u=a.auto==="weight"?"weight":a.mode==="level"?"level":a.unit==="£"?"money":"sum",l=c=>r(c==="money"?{auto:"",unit:"£",mode:"sum"}:c==="weight"?{auto:"weight",unit:"kg",mode:"level",startValue:a.startValue===""?+(Be(i.profile)||0).toFixed(1):a.startValue}:{auto:"",mode:c,unit:a.auto||a.unit==="£"?"":a.unit}),d=a.type!=="numeric"||a.target!==""&&!Number.isNaN(parseFloat(a.target)),p=a.name.trim()&&d&&(a.period==="2027"||a.end),$=()=>{if(!p)return;S(15);let c={...a,name:a.name.trim(),target:a.target===""?"":parseFloat(a.target),startValue:a.startValue===""?"":parseFloat(a.startValue)};x(b=>{if(n){let h=b.goals.findIndex(v=>v.id===e.id);h>=0&&(b.goals[h]={...b.goals[h],...c})}else b.goals.push({ticks:[],entries:[],...c,id:ce(),start:R(),createdAt:new Date().toISOString()})}),s(),E(n?"Goal updated":"Goal added")};return t`
    <${M} title=${n?"Edit goal":"New goal"}
      left=${t`<button class="link" onClick=${s}>Cancel</button>`}
      right=${t`<button class="link b" disabled=${!p} onClick=${$}>${n?"Save":"Add"}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${a.color}">${a.emoji}</div>
        <input class="eh-name" placeholder="Goal name" value=${a.name} onInput=${c=>r({name:c.target.value})} maxlength="60" />
      </div>

      <${D} header="Icon">
        <div class="emoji-grid">${Us.map(c=>t`<button class="emo ${a.emoji===c?"on":""}" onClick=${()=>{S(),r({emoji:c})}}>${c}</button>`)}</div>
      <//>
      <${D} header="Colour">
        <div class="swatches">${_s.map(c=>t`<button class="sw ${a.color===c?"on":""}" style="--c:${c}" aria-label=${c} onClick=${()=>{S(),r({color:c})}}></button>`)}</div>
      <//>
      <${D} header="Category">
        <div class="chip-row">${Ie.map(c=>t`<button class="chip big ${a.category===c.id?"on":""}" style="--c:${c.color}" onClick=${()=>{S(),r({category:c.id})}}>${c.label}</button>`)}</div>
      <//>

      <${D} header="Type" footer=${{habit:"Tick it off on the days you do it. Builds a streak.",numeric:"Work towards a number, like km run, money saved or a weight.",milestone:"A one-off achievement you mark as done.",quit:"Fills automatically every day you stay quit."}[a.type]}>
        <div class="pad"><${K} options=${[{value:"habit",label:"Habit"},{value:"numeric",label:"Target"},{value:"milestone",label:"Milestone"},...N().quits.length?[{value:"quit",label:"Stay quit"}]:[]]}
          value=${a.type} onChange=${c=>r({type:c})} /></div>
        ${a.type==="habit"&&t`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${a.perWeek>=7?"Every day":`${a.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${a.perWeek<=1} onClick=${()=>{S(),r({perWeek:Math.max(1,a.perWeek-1)})}} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${a.perWeek>=7} onClick=${()=>{S(),r({perWeek:Math.min(7,a.perWeek+1)})}} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${a.type==="habit"&&t`<div class="row">
          <span class="row-main"><span class="row-title">Reminder</span>
            <span class="row-sub">${a.remindAt?a.perWeek>=7?"Every day, unless it’s ticked":"Only on days you still need it":"A nudge at a time you choose"}</span></span>
          ${a.remindAt&&t`<input type="time" class="time-in" value=${a.remindAt} onChange=${c=>c.target.value&&r({remindAt:c.target.value})} />`}
          <${ae} on=${!!a.remindAt} label="Reminder" onChange=${c=>r({remindAt:c?"18:00":""})} />
        </div>`}
        ${a.type==="numeric"&&t`
          <div class="pad"><${K} small options=${[{value:"sum",label:"Add up"},{value:"level",label:"Reach"},{value:"money",label:"£ Saved"},{value:"weight",label:"Weight"}]}
            value=${u} onChange=${l} /></div>
          ${!a.auto&&u!=="money"&&t`<${H} label="Unit"><input placeholder="km, books, hours…" value=${a.unit} onInput=${c=>r({unit:c.target.value})} /><//>`}
          ${(u==="level"||u==="weight")&&t`<${H} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${a.startValue} onInput=${c=>r({startValue:c.target.value})} /><//>`}
          <${H} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${u==="money"?"1000":"100"} value=${a.target} onInput=${c=>r({target:c.target.value})} /><//>
`}
        ${a.type==="quit"&&t`<div class="pad"><${K} options=${i.quits.map(c=>({value:c.id,label:`${c.emoji} ${c.label}`}))} value=${a.quitId} onChange=${c=>r({quitId:c})} /></div>`}
      <//>

      <${D} header="Deadline">
        <div class="pad"><${K} options=${[{value:"2027",label:"Until end of 2027"},{value:"date",label:"Pick a date"}]} value=${a.period} onChange=${c=>r({period:c})} /></div>
        ${a.period==="date"&&t`<${H} label="Finish by"><input type="date" value=${a.end} min=${R()} onInput=${c=>r({end:c.target.value})} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!p} onClick=${$}>${n?"Save changes":"Add goal"}</button>
    </div>`}function _e(){B(e=>t`<${bi} close=${e} />`,{tall:!0})}function bi({close:e}){let s=N(),n=Math.ceil((je-Date.now())/z),a=new Set(s.goals.map(u=>u.preset).filter(Boolean)),o=u=>{S(15),x(l=>l.goals.push({ticks:[],entries:[],...u.make(l),preset:u.key,id:ce(),start:R(),createdAt:new Date().toISOString()})),E("Added to your goals")},r=u=>{let l=N().goals.find(p=>p.preset===u.key);if(!l)return;let d=()=>{S(10),x(p=>{p.goals=p.goals.filter($=>$.preset!==u.key)}),E("Removed from your goals")};(l.ticks||[]).length||(l.entries||[]).length||l.done?ne({title:"Remove goal",text:`Remove “${l.name}”? Its progress so far will be deleted.`,confirm:"Remove",onConfirm:d}):d()},i=u=>u.type==="habit"?`${u.perWeek>=7?"Daily":u.perWeek+"× a week"} habit`:u.type==="numeric"?u.unit==="£"?`Log what you save · target £${Number(u.target).toLocaleString("en-GB")}`:u.auto==="weight"?`Target ${u.target} kg · edit to suit you`:`Target · ${u.target} ${u.unit}`:u.type==="quit"?"Linked to your quit counter":"One-off milestone";return t`
    <${M} right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${n>0?`${n} days until 1 January. `:""}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${Ie.map(u=>{let l=[...Qs(s),...Vs].filter(d=>d.make(s).category===u.id);return l.length?t`<${D} key=${u.id} header=${u.label}>
          ${l.map(d=>{let p=d.make(s),$=a.has(d.key),c=s.goals.find(b=>b.preset===d.key);return t`<div class="row tap" key=${d.key} role="button" onClick=${()=>c?Xn(c.id):Gt({...p,preset:d.key})}>
              <span class="row-ic" style="background:${p.color}">${p.emoji}</span>
              <span class="row-main"><span class="row-title">${p.name}</span><span class="row-sub">${i(p)}</span></span>
              <button class="add-pill ${$?"on":""}" aria-pressed=${$} aria-label=${$?`Remove ${p.name}`:`Add ${p.name}`}
                onClick=${b=>{b.stopPropagation(),$?r(d):o(d)}}>${$?g.check():g.plus()}</button>
            </div>`})}
        <//>`:null})}
    </div>`}var Te=864e5;function eo({s:e}){let[s,n]=f(0),a=Xs(e.quits);if(!a.length)return null;let o=new Date,r=Math.floor(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())/Te),i=a[(r*7+s)%a.length];return t`<section class="group">
    <div class="card tip-card">
      <div class="tip-top"><span class="tip-k">${s?"Another tip":"Tip of the day"}</span>
        <button class="link sm tip-next" onClick=${()=>{S(),n(s+1)}} aria-label="Show another tip">Another ↻</button></div>
      <div class="tip-body" key=${i.t}><span class="tip-e" aria-hidden="true">${i.e}</span><p class="tip-t">${i.t}</p></div>
    </div>
  </section>`}var vi=[{value:182,label:"6 months"},{value:365,label:"1 year"}];function fi(e,s,n=Date.now()){let a=n+s*Te,o=e.quits.reduce((p,$)=>p+Z($,W($,n)),0),r=e.quits.reduce((p,$)=>p+Z($,W($,a)),0),i=[],u=[];for(let p of e.quits){let $=W(p,n),c=W(p,a);for(let h of ue(p)||[])h.h*36e5>$&&h.h*36e5<=c&&i.push({q:p,x:h});let b=yt.filter(h=>h.days*Te>$&&h.days*Te<=c).pop();b&&u.push({q:p,m:b,days:Math.floor(c/Te)})}let l=[...e.wishlist].sort((p,$)=>p.price-$.price).filter(p=>p.price>o&&p.price<=r),d=Math.max(0,...e.quits.map(p=>Math.floor(W(p,a)/Te)));return{at:a,savedNow:o,savedThen:r,gain:r-o,unlocks:i,milestones:u,wishes:l,days:d}}function to({s:e}){let s=U(6e4),[n,a]=f(182);if(!e.quits.length)return null;let o=fi(e,n,s),r=new Date(o.at).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),i=o.unlocks.slice(-4);return t`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Future you</h2>
      <${K} small options=${vi} value=${n} onChange=${a} /></div>
    <div class="card fy-card">
      <p class="fy-when">On <b>${r}</b>, if you keep going:</p>
      <div class="fy-stats">
        ${o.savedThen>0&&t`<div class="fy-stat fy-saved"><span class="fy-k">💷 Saved</span><b>${G(o.savedThen,0)}</b><small>+${G(o.gain,0)} from today</small></div>`}
        <div class="fy-stat fy-free"><span class="fy-k">🗓️ Free for</span><b>${o.days} days</b><small>${o.milestones.length?`${o.milestones[o.milestones.length-1].m.label} badge earned`:"and counting"}</small></div>
      </div>
      ${i.length>0&&t`<div class="fy-list">
        <div class="fy-lh">What your body will have done</div>
        ${i.map(({q:u,x:l})=>t`<div class="fy-row" key=${u.id+l.h}>
          <span class="fy-ic tint-ic" style="--c:${u.color}">${u.emoji}</span>
          <span class="fy-main"><b>${l.title}</b><span>${l.text}</span></span>
        </div>`)}
        ${o.unlocks.length>i.length&&t`<div class="fy-more">and ${o.unlocks.length-i.length} more changes before that</div>`}
      </div>`}
      ${o.wishes.length>0&&t`<div class="fy-wish">🎁 Enough for ${o.wishes[o.wishes.length-1].emoji} <b>${o.wishes[o.wishes.length-1].name}</b>${o.wishes.length>1?` and ${o.wishes.length-1} more on your list`:""}</div>`}
    </div>
    <p class="group-f">Based on what you used to spend. Health changes are typical timings, not medical advice.</p>
  </section>`}function gi(e,s=Date.now()){let n=e.quits.reduce((o,r)=>o+W(r,s)/Te*Le(r),0),a=e.quits.filter(o=>se(o).getTime()<=s).reduce((o,r)=>o+Le(r),0);return{hours:n/60,perDay:a}}var yi=e=>e>=60?`${Math.floor(e/60)}h${e%60?` ${Math.round(e%60)}m`:""}`:`${Math.round(e)} min`;function ki(e){return e<1?"Every minute counts. It adds up fast.":e<8?`That’s about ${Math.max(1,Math.round(e*60/45))} episodes of a show.`:e<60?`That’s about ${Math.round(e/2)} films, or ${Math.round(e/1.5)} football matches.`:e<300?`That’s ${Math.round(e/24)} full days, or ${Math.round(e/8)} working days.`:`That’s ${Math.round(e/24)} full days of your life back.`}function so({s:e}){let s=U(6e4),n=gi(e,s);return!e.quits.length||!n.perDay?null:t`<section class="group">
    <h2 class="group-h">Time reclaimed</h2>
    <button class="card time-card tap" onClick=${wi}>
      <div class="tc-big"><span class="tc-ic" aria-hidden="true">⏳</span><b>${n.hours>=10?Math.round(n.hours):n.hours.toFixed(1)}</b><span>hours of your life back</span></div>
      <div class="tc-sub">About ${yi(n.perDay)} a day you’re not spending on it. ${ki(n.hours)}</div>
    </button>
  </section>`}function wi(){S(),B(e=>t`<${Si} close=${e} />`)}function Si({close:e}){let s=N(),[n,a]=f(Object.fromEntries(s.quits.map(r=>[r.id,String(Le(r))]))),o=()=>{S(12),x(r=>{r.quits.forEach(i=>{let u=parseFloat(n[i.id]);Number.isFinite(u)&&u>=0&&(i.minutes=Math.min(1440,u))})}),e()};return t`
    <${M} title="Time it took" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Roughly how many minutes a day did each one take? Buying, using, being away, recovering. A middle guess is fine.</p>
      <div class="card list">${s.quits.map(r=>t`<label class="field" key=${r.id}><span class="field-l">${r.emoji} ${r.label}</span>
        <span class="field-c"><input type="number" inputmode="numeric" min="0" max="1440" value=${n[r.id]} onInput=${i=>a({...n,[r.id]:i.target.value})} /> min</span></label>`)}</div>
      <p class="muted center tiny mt12">As a guide: nicotine usually takes 10–30 minutes a day, cannabis 10–45.</p>
    </div>`}function ao({s:e,go:s}){let n=U(6e4),a=R(),o=e.checkins[a],r=e.quits.reduce((k,L)=>k+(L.monthly||0),0),i=new Date(n).getHours(),u=i<5?"Up late":i<12?"Good morning":i<18?"Good afternoon":"Good evening",l=e.goals.filter(k=>k.type==="habit"),d=e.quits.length>0,p=d&&e.quits.every(k=>k.start===e.quits[0].start),[$,c]=f(null),b=e.quits.find(k=>k.id===$)||e.quits[0],h=b?W(b,n)/z:0,v=Math.ceil((je-n)/z),m=e.quits.filter(k=>ue(k)),y=e.quits.filter(k=>W(k,n)>0),C=()=>{S();let k=Math.min(...y.map(L=>W(L,Date.now())/z));Ft(It(y,k,y.reduce((L,j)=>L+Z(j,W(j,Date.now())),0)))},w=()=>Promise.all([Promise.resolve(oe()).catch(()=>{}),Ye(),he()]);return t`<${$e} title="Novum" eyebrow=${new Date(n).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}
      sub=${gt} titleRight=${t`<${Rn} />`} onRefresh=${w}>
    <p class="greet"><button class="greet-av" aria-label="Your profile" onClick=${()=>s("profile")}><${ve} a=${e.social?.avatar} name=${Nt()} size=${36} /></button><span>${u}${Nt()?`, ${Nt()}`:""}.</span></p>
    <${Xa} />

    <section class="group first">
      ${y.length?t`<div class="group-h-row"><h2 class="group-h">Your streaks</h2>
        <button class="link sm b share-link" onClick=${C}>${g.share()} Share</button></div>`:t`<h2 class="group-h">${d?"Your streaks":"Get started"}</h2>`}
      ${d?t`<div class="stack">
        ${e.quits.map(k=>t`<${Di} key=${k.id} q=${k} />`)}
        ${e.quits.length<xe.length&&t`<${Ai} />`}
      </div>`:t`<button class="card add-first tap" onClick=${mt}>
        <span class="row-ic" style="background:#3B9BFF">${g.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${g.chevron()}</span>
      </button>`}
    </section>

    ${d&&t`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${Se}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${g.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${()=>Os()}>
          <span class="sup-slip-e">🌱</span><span class="row-main">Slipped up? <b>Reset without the guilt</b></span><span class="row-chev">${g.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${we}>
          <span class="sup-slip-e">🧭</span><span class="row-main">Tough day coming? <b>Plan ahead</b></span><span class="row-chev">${g.chevron()}</span>
        </button>
        ${e.reasons.length>0?t`<button class="sup-why" onClick=${Ue}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${e.reasons[Math.floor(n/864e5)%e.reasons.length].text}”</span>
            </button>`:t`<button class="sup-why add" onClick=${Ue}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    <${Ba} s=${e} />

    ${d&&t`<${Kn} s=${e} />`}

    ${d&&t`<${eo} s=${e} />`}

    <${fn} />

    ${r>0&&t`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${js}>
        <${Ci} quits=${e.quits} />
        <div class="mc-sub">${G(r,0)} a month back in your pocket · ${G(r*12,0)} a year</div>
        <${Ti} s=${e} />
      </button>
    </section>`}

    ${d&&t`<${so} s=${e} />`}

    ${d&&t`<${to} s=${e} />`}

    ${d&&t`<section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!p&&t`<${K} small options=${e.quits.map(k=>({value:k.id,label:k.label}))} value=${b.id} onChange=${c} />`}
      </div>
      <div class="badges">
        ${yt.map(k=>{let L=h>=k.days;return t`<div class="badge ${L?"got":""}">
            <div class="badge-medal">${L?g.check():k.short}</div>
            <div class="badge-l">${k.label}</div>
            <div class="badge-s">${L?"Earned":`in ${ye(k.days-h)}`}</div>
          </div>`})}
      </div>
      ${p&&e.quits.length>1&&t`<p class="group-f">Counting for all of them, since you stopped at the same time.</p>`}
    </section>`}

    <section class="group">
      <h2 class="group-h">Today</h2>
      <button class="card checkin-card tap" onClick=${()=>s("checkin")}>
        ${o&&o.mood?t`
          <span class="cc-emoji">${be[o.mood-1].e}</span>
          <span class="cc-main"><b>Checked in · feeling ${be[o.mood-1].l.toLowerCase()}</b>
            <span>${e.quits.map(k=>`${k.label} craving ${o[k.id]??"–"}/10`).join(" · ")}</span></span>`:t`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${g.chevron()}</span>
      </button>
      ${l.length>0&&t`<div class="card list mt8">
        ${l.map(k=>t`<${Ei} key=${k.id} g=${k} />`)}
      </div>`}
    </section>

    ${m.length>0&&t`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${m.map(k=>{let L=W(k,n)/36e5,j=Pa(k,L);return t`<button class="row tap body-row" onClick=${()=>vt(k.id)}>
            <span class="row-ic tint-ic" style="--c:${k.color}" title=${j.current?j.current.area:"Getting started"}>${j.current?La(j.current.area):"🌱"}</span>
            <span class="row-main">
              <span class="row-title">${j.current?j.current.title:"Just getting started"}</span>
              <span class="row-sub">${j.current?j.current.text:"Your first changes start within hours."}</span>
              ${j.next&&t`<span class="row-next">Next: ${j.next.title.toLowerCase()} in ${ye(j.next.h/24-L/24)}</span>`}
            </span>
            <span class="row-chev">${g.chevron()}</span>
          </button>`})}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>`}

    ${v>0?t`
      <button class="card ny-card tap" onClick=${_e}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${v} day${v===1?"":"s"} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`:t`<button class="card ny-card tap" onClick=${()=>s("progress")}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`}function Ci({quits:e}){let s=U(1e3);return t`<div class="mc-big">${G(e.reduce((n,a)=>n+Z(a,W(a,s)),0))}</div>`}function Ai(){return t`<button class="card quit-card qc-add tap" onClick=${mt} aria-label="Add something else to quit">
    <div class="qc-head"><span class="qc-add-ic">${g.plus()}</span><span class="qc-label">Quitting something else?</span></div>
    <div class="qc-body">
      <div class="qc-time" aria-hidden="true">
        <span><b>0</b><small>days</small></span><span><b>00</b><small>hrs</small></span><span><b>00</b><small>min</small></span>
      </div>
      <span class="qc-add-ring" aria-hidden="true">${g.plus()}</span>
    </div>
    <div class="qc-foot">Smoking, alcohol, gambling, energy drinks and more. Each gets its own counter.</div>
  </button>`}function Di({q:e}){let s=U(1e3),n=se(e).getTime();if(n>s){let{d:p,h:$,m:c}=Jt(n-s);return t`<button class="card quit-card tap" onClick=${()=>bt(e.id)} style="--qc:${e.color}">
      <div class="qc-head"><span class="qc-emoji">${e.emoji}</span><span class="qc-label">${e.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${p}</b><small>${p===1?"day":"days"}</small></span><span><b>${J($)}</b><small>hrs</small></span><span><b>${J(c)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${se(e).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}. You’ve got this.</div>
    </button>`}let a=W(e,s),{d:o,h:r,m:i,s:u}=Jt(a),l=a/z,d=Mt(l);return t`<button class="card quit-card tap" onClick=${()=>bt(e.id)} style="--qc:${e.color}">
    <div class="qc-head"><span class="qc-emoji">${e.emoji}</span><span class="qc-label">${e.label}-free</span>
      ${e.monthly>0&&t`<span class="qc-saved">${G(Z(e,a))} saved</span>`}</div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${o}</b><small>${o===1?"day":"days"}</small></span>
        <span><b>${J(r)}</b><small>hrs</small></span>
        <span><b>${J(i)}</b><small>min</small></span>
        <span class="qc-sec"><b>${J(u)}</b><small>sec</small></span>
      </div>
      <${et} pct=${d.pct} size=${70} stroke=${8} color=${e.color}>
        ${d.next?t`<span class="ring-txt" aria-label=${`Next milestone ${ds[d.next.days]}, ${us(d.next.days-l)} to go`}><small>next</small><b>${ds[d.next.days]}</b><small>in ${us(d.next.days-l)}</small></span>`:t`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${d.next?`Next milestone: ${d.next.label}, in ${ye(d.next.days-l)}`:"Every milestone earned. Legend."}</div>
  </button>`}function Ei({g:e}){let s=(e.ticks||[]).includes(R()),n=Oe(e);return t`<div class="row">
    <span class="row-ic" style="background:${e.color}">${e.emoji}</span>
    <span class="row-main"><span class="row-title">${e.name}</span>
      <span class="row-sub">${n.value>0?`🔥 ${n.value} ${n.unit} streak`:We(e)}</span></span>
    <button class="tick ${s?"on":""}" style="--c:${e.color}" aria-pressed=${s} aria-label=${`Mark ${e.name} done today`}
      onClick=${a=>{a.stopPropagation(),ke(e.id)}}>${g.check()}</button>
  </div>`}var Ht=(e,s=Date.now())=>e.quits.reduce((n,a)=>n+Z(a,W(a,s)),0);function Ti({s:e}){let s=U(6e4),n=Ht(e,s),a=[...e.wishlist].sort((i,u)=>i.price-u.price);if(!a.length)return t`<div class="wish-line add">🎁 What could it buy? <b>Add something to save for</b></div>`;let o=a.filter(i=>i.price<=n),r=a.find(i=>i.price>n);return t`<div class="wish-line">
    ${o.length>0&&t`<div class="wl-got">✓ That’s ${o[o.length-1].emoji} ${o[o.length-1].name}${o.length>1?` and ${o.length-1} more`:""}</div>`}
    ${r&&t`<div class="wl-next"><span>Next: ${r.emoji} ${r.name}</span><b>${Math.floor(n/r.price*100)}%</b></div>
      <div class="wl-bar"><i style="width:${Math.min(100,n/r.price*100)}%"></i></div>`}
  </div>`}function js(){B(e=>t`<${Mi} close=${e} />`,{tall:!0})}function Mi({close:e}){let s=N(),n=U(1e3),a=Ht(s,n),[o,r]=f("🎁"),[i,u]=f(""),[l,d]=f(""),p=[...s.wishlist].sort((h,v)=>h.price-v.price),$=new Set(s.wishlist.map(h=>h.name.toLowerCase())),c=h=>{S(10),x(v=>{v.wishlist.push({id:ce(),emoji:h.emoji||"🎁",name:h.name.trim().slice(0,40),price:+h.price})})},b=i.trim()&&parseFloat(l)>0;return t`
    <${M} title="What it could buy" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <div class="wish-hero"><div class="kicker">Saved by quitting</div><div class="mc-big">${G(a)}</div>
        <p class="muted">Money you’d have spent. Put some aside and treat yourself when you hit one.</p></div>
      ${p.length>0&&t`<${D} header="Saving for">
        ${p.map(h=>{let v=Math.min(1,a/h.price);return t`<div class="row wish-row" key=${h.id}>
            <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
            <span class="row-main"><span class="row-title">${h.name}</span>
              <span class="row-sub">${v>=1?"✓ You could buy this now":`${G(h.price-a,0)} to go · ${Math.floor(v*100)}%`}</span>
              <span class="wl-bar"><i style="width:${v*100}%;${v>=1?"background:var(--green)":""}"></i></span></span>
            <span class="row-detail">${G(h.price,0)}</span>
            <button class="icon-btn muted" aria-label=${`Remove ${h.name}`} onClick=${()=>x(m=>{m.wishlist=m.wishlist.filter(y=>y.id!==h.id)})}>${g.trash()}</button>
          </div>`})}
      <//>`}
      <${D} header="Add your own">
        <div class="wish-add">
          <input class="wish-emoji" aria-label="Emoji" maxlength="4" value=${o} onInput=${h=>r(h.target.value)} />
          <input placeholder="e.g. Festival ticket" maxlength="40" value=${i} onInput=${h=>u(h.target.value)} />
          <span class="wish-price">£<input type="number" inputmode="decimal" placeholder="0" value=${l} onInput=${h=>d(h.target.value)} /></span>
          <button class="btn btn-primary sm" disabled=${!b} onClick=${()=>{c({emoji:o,name:i,price:parseFloat(l)}),u(""),d(""),r("🎁")}}>Add</button>
        </div>
      <//>
      ${Ut.some(h=>!$.has(h.name.toLowerCase()))&&t`<${D} header="Ideas" footer="Rough prices. Add one, then delete and re-add it with your own price if it’s different.">
        ${Ut.filter(h=>!$.has(h.name.toLowerCase())).map(h=>t`<button class="row tap" key=${h.name} onClick=${()=>c(h)}>
          <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
          <span class="row-main"><span class="row-title">${h.name}</span></span>
          <span class="row-detail">${G(h.price,0)}</span>
          <span class="add-pill">${g.plus()}</span>
        </button>`)}
      <//>`}
    </div>`}function no({s:e}){let s=R(),[n,a]=f(s),o=e.checkins[n]||{},r=$=>x(c=>{c.checkins[n]={...c.checkins[n]||{},...$,t:Date.now()}}),i=$=>{let c=R(te(Ae(n),$));c<=s&&(S(),a(c))},u=n===s,l=e.goals.filter($=>$.type==="habit"),d=Object.keys(e.checkins).sort().reverse().slice(0,7),p=$=>$==null?"Not logged":$===0?"None":$<=3?"Mild":$<=6?"Noticeable":$<=8?"Strong":"Intense";return t`<${$e} title="Check-in" sub="A quick daily log. Patterns show up in Progress.">
    <div class="day-nav card">
      <button class="icon-btn" onClick=${()=>i(-1)} aria-label="Previous day">${g.left()}</button>
      <div class="day-nav-t"><b>${u?"Today":V(n,{weekday:"long"})}</b><span>${V(n,{day:"numeric",month:"long"})}</span></div>
      <button class="icon-btn" onClick=${()=>i(1)} disabled=${u} aria-label="Next day">${g.chevron()}</button>
    </div>

    <${D} header="Mood">
      <div class="moods">
        ${be.map($=>t`<button class="mood ${o.mood===$.v?"on":""}" onClick=${()=>{S(10),r({mood:$.v})}} aria-pressed=${o.mood===$.v}>
          <span class="mood-e">${$.e}</span><span class="mood-l">${$.l}</span></button>`)}
      </div>
    <//>

    ${e.quits.length>0&&t`<${Qn} compact />`}

    ${e.quits.length>0&&t`<${D} header="Cravings" footer="0 = none, 10 = the strongest you’ve felt. Cravings usually pass within 5–10 minutes.">
      ${e.quits.map($=>t`<div class="slider-row">
        <div class="slider-top"><span>${$.emoji} ${$.label}</span><span class="slider-v"><b>${o[$.id]??"–"}</b> ${p(o[$.id])}</span></div>
        <input type="range" min="0" max="10" step="1" value=${o[$.id]??0} style="--c:${$.color};--p:${(o[$.id]??0)/10*100}%"
          class=${o[$.id]==null?"unset":""} aria-label=${`${$.label} craving`}
          onInput=${c=>{let b=+c.target.value;b!==o[$.id]&&(S(4),r({[$.id]:b}))}} />
      </div>`)}
    <//>`}

    <${D} header="Sleep last night">
      <div class="pad"><${K} options=${st.map(($,c)=>({value:c+1,label:$}))} value=${o.sleep} onChange=${$=>r({sleep:$})} /></div>
    <//>

    <${D} header="Notes">
      <${qa} key=${n} value=${o.note||""} onSave=${$=>r({note:$})} />
    <//>

    ${l.length>0&&t`<${D} header=${u?"Habits today":"Habits that day"}>
      ${l.map($=>{let c=($.ticks||[]).includes(n);return t`<div class="row" key=${$.id}>
          <span class="row-ic" style="background:${$.color}">${$.emoji}</span>
          <span class="row-main"><span class="row-title">${$.name}</span><span class="row-sub">${We($)}</span></span>
          <button class="tick ${c?"on":""}" style="--c:${$.color}" aria-pressed=${c} onClick=${()=>ke($.id,n)}>${g.check()}</button>
        </div>`})}
    <//>`}

    <section class="group">
      <h2 class="group-h">Calendar</h2>
      <${xi} s=${e} day=${n} onPick=${$=>{a($),window.scrollTo({top:0,behavior:"smooth"})}} />
      <p class="group-f">Tap a day to see or change that check-in.</p>
    </section>
  <//>`}var Ni=["January","February","March","April","May","June","July","August","September","October","November","December"];function xi({s:e,day:s,onPick:n}){let a=R(),[o,r]=f(s.slice(0,7));q(()=>{r(s.slice(0,7))},[s.slice(0,7)]);let[i,u]=o.split("-").map(Number),l=(new Date(i,u-1,1).getDay()+6)%7,d=new Date(i,u,0).getDate(),p=c=>{let b=new Date(i,u-1+c,1),h=`${b.getFullYear()}-${J(b.getMonth()+1)}`;h<=a.slice(0,7)&&(S(),r(h))},$=Object.keys(e.checkins).filter(c=>c.startsWith(o)&&e.checkins[c].mood).length;return t`<div class="card cal">
    <div class="cal-top">
      <button class="icon-btn" onClick=${()=>p(-1)} aria-label="Previous month">${g.left()}</button>
      <div class="cal-t"><b>${Ni[u-1]} ${i}</b><span>${$} check-in${$===1?"":"s"}</span></div>
      <button class="icon-btn" onClick=${()=>p(1)} disabled=${o>=a.slice(0,7)} aria-label="Next month">${g.chevron()}</button>
    </div>
    <div class="cal-grid">
      ${["M","T","W","T","F","S","S"].map((c,b)=>t`<span class="cal-wd" key=${"w"+b}>${c}</span>`)}
      ${Array.from({length:l},(c,b)=>t`<span key=${"b"+b}></span>`)}
      ${Array.from({length:d},(c,b)=>{let h=`${o}-${J(b+1)}`,v=e.checkins[h],m=v?.mood,y=h>a;return t`<button key=${h} class="cal-d ${m?"has":""} ${h===a?"today":""} ${h===s?"sel":""}" disabled=${y}
          style=${m?`--mc:${Qt[m-1]}`:""} aria-label=${`${V(h,{weekday:"long",day:"numeric",month:"long"})}${m?`, ${be[m-1].l}`:""}`}
          onClick=${()=>{S(),n(h)}}>${b+1}${v?.note?t`<i class="cal-note"></i>`:""}</button>`})}
    </div>
    <div class="cal-key">${be.map((c,b)=>t`<span key=${c.v}><i style="background:${Qt[b]}"></i>${c.l}</span>`)}</div>
  </div>`}var oo=ge(()=>import("./c-LVH4EOQR.js"),"openRecap");vs();var io=()=>t`<div class="boot">NOVUM</div>`,Ii=tt(()=>import("./c-LLQEU3SA.js"),"AuthScreen",io),Fi=tt(()=>import("./c-LLQEU3SA.js"),"DayZero",io),Kt=[{id:"home",label:"Home",icon:g.home},{id:"checkin",label:"Check-in",icon:g.checkin},{id:"goals",label:"Goals",icon:g.goals},{id:"progress",label:"Progress",icon:g.progress},{id:"profile",label:"Profile",icon:g.profile}];function Li({tab:e,go:s,dot:n,unread:a}){return t`<nav class="tabbar" aria-label="Main">
    ${Kt.map(o=>t`<button class="tab ${e===o.id?"on":""}" aria-current=${e===o.id?"page":void 0} onClick=${()=>s(o.id)}
      aria-label=${o.id==="home"&&a?`Home, ${a} new in Activity`:void 0}>
      <span class="tab-ic">${o.icon()}${o.id==="checkin"&&n&&t`<i class="tab-dot"></i>`}${o.id==="home"&&a>0&&t`<i class="tab-count">${a>9?"9+":a}</i>`}</span><span class="tab-l">${o.label}</span></button>`)}
  </nav>`}var Ws=document.documentElement;function ro(){let e=window.scrollY;Ws.style.setProperty("--st",Math.max(0,Math.min(1,(e-10)/30)).toFixed(3)),Ws.style.setProperty("--ov",(1+Math.max(0,-e)*.0016).toFixed(4)),Ws.classList.toggle("scrolled",e>30)}window.addEventListener("scroll",ro,{passive:!0});var Ys=new Set;function lo(e,s,n){!s||Ys.size>=5||Ys.has(s)||/Script error|ResizeObserver|Load failed|NetworkError|Failed to fetch|AbortError|ethereum|cloudflareinsights/i.test(s)||/-extension:\/\//i.test(n||"")||(Ys.add(s),Fa(e,s,n))}window.addEventListener("error",e=>lo(`${(e.filename||"").split("/").slice(-2).join("/")}:${e.lineno||0}`,e.message,e.error?.stack));window.addEventListener("unhandledrejection",e=>lo("promise",e.reason?.message||String(e.reason||""),e.reason?.stack));function Pi({s:e}){let s=location.hash==="#reset"?"profile":location.hash.slice(1),[n,a]=f(Kt.some(p=>p.id===s)?s:"home");q(()=>{s==="activity"&&(history.replaceState(null,"","#home"),setTimeout(pt,400)),s==="sos"&&(history.replaceState(null,"","#home"),setTimeout(Se,400)),s==="plan"&&(history.replaceState(null,"","#home"),setTimeout(we,400)),s==="letters"&&(history.replaceState(null,"","#home"),setTimeout(at,400)),s==="recap"&&(history.replaceState(null,"","#home"),setTimeout(oo,400))},[]);let o=le({}),r=(p,{quiet:$}={})=>{if(p===n){$||window.scrollTo({top:0,behavior:"smooth"});return}if(o.current[n]=window.scrollY,$||S(),history.replaceState(null,"","#"+p),!document.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches){a(p);return}let c=Kt.map(v=>v.id);document.documentElement.dataset.tabDir=c.indexOf(p)>c.indexOf(n)?"fwd":"back";let b=document.startViewTransition(()=>(a(p),new Promise(v=>setTimeout(v,0)))),h=()=>{};b.ready.catch(h),b.finished.catch(h),b.updateCallbackDone.catch(h)};ft(()=>{window.scrollTo(0,o.current[n]||0),ro()},[n]),q(()=>{let p=()=>{let $=location.hash.slice(1);if($==="activity"){a("home"),history.replaceState(null,"","#home"),pt();return}if($==="sos"){a("home"),history.replaceState(null,"","#home"),Se();return}if($==="plan"){a("home"),history.replaceState(null,"","#home"),we();return}if($==="letters"){a("home"),history.replaceState(null,"","#home"),at();return}if($==="recap"){a("home"),history.replaceState(null,"","#home"),oo();return}Kt.some(c=>c.id===$)&&a($)};return window.addEventListener("hashchange",p),()=>window.removeEventListener("hashchange",p)},[]),q(()=>{let p=setTimeout(en,700);return()=>clearTimeout(p)},[]),q(()=>{let p=()=>{let b=nn();if(b){if(on(),b.toLowerCase()===(X()?.user?.username||"").toLowerCase()){E("That’s your own code. Show it to a friend to scan");return}it(b)}};if(!e.tourDone)return;let $=setTimeout(p,900),c=()=>{vs(),p()};return window.addEventListener("hashchange",c),()=>{clearTimeout($),window.removeEventListener("hashchange",c)}},[e.tourDone]);let i={home:ao,checkin:no,goals:Zn,progress:Un,profile:Jn}[n],u=!e.checkins[R()]?.mood;q(()=>{let p=()=>{sn(tn()),ln()},$=setTimeout(p,1200),c=setInterval(p,6e4);return()=>{clearTimeout($),clearInterval(c)}},[]);let l=Ee(),d=(l.unread||0)+(u?1:0);return q(()=>{try{"setAppBadge"in navigator&&(d?navigator.setAppBadge(d):navigator.clearAppBadge()).catch(()=>{})}catch{}},[d]),t`<div class="app">
    <main class="screen" key=${n}><${i} s=${e} go=${r} /></main>
    <${Li} tab=${n} go=${r} dot=${u} unread=${l.unread||0} />
    <${On} />
    <${Yn} s=${e} go=${r} />
  </div>`}function qi(){let[e,s]=f(!!window.__novumUpdate);return q(()=>{let n=()=>s(!0);return window.addEventListener("novum-update",n),()=>window.removeEventListener("novum-update",n)},[]),e?t`<button class="update-bar" onClick=${()=>location.reload()}>✨ A new version of Novum is ready. <b>Tap to update</b></button>`:null}function Bi(){let[e,s]=f(X()),[n,a]=f(N()),[o,r]=f(!1);q(()=>ga(s),[]),q(()=>Pe(l=>a(l)),[]),q(()=>{try{navigator.storage?.persist?.()}catch{}},[]);let i=e?.user?.id;q(()=>{if(!i){Ge(),ot(),vn(),pn(),mn(),Ln(),Xe({wipe:!1}),r(!0);return}if(aa(i),Pn(),_a()){let l=na();l&&(qe({...l,setupDone:!1}),Ga(l.notify),oa())}r(N().setupDone),Promise.resolve(En(i)).finally(()=>r(!0)),za(),bn(),un(),Et().then(l=>{let d=N().profile.dob;l&&!l.dob&&d&&Re({dob:d}).catch(()=>{})}).catch(()=>{})},[i]);let u;return e?o?n.setupDone?u=t`<${Pi} s=${n} />`:u=t`<${Fi} user=${e.user} />`:u=t`<div class="boot">NOVUM</div>`:u=t`<${Ii} />`,t`${u}<${an} /><${kn} /><${ma} /><${qi} />`}Hs(t`<${Bi} />`,document.getElementById("app"));window.__novumBooted=!0;
