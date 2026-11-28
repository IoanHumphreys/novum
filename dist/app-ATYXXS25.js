import{a as Pa,b as qa,c as tt,d as $s,e as Oa,f as Ra,g as ja,h as Wa,i as Ya,j as st,k as Ha,l as Ga,m as Bt,n as Ka,o as at,p as Qa,q as Va,u as Ja,w as Za,y as Xa}from"./c-VJ5DQWGY.js";import{f as fn}from"./c-ZJB4PPFK.js";import{c as yn,d as kn}from"./c-X46WIZAT.js";import{a as bs,b as vs,c as an,d as nn,e as on,f as rn,g as ln,h as cn,i as ve,k as dn,l as un,m as pn,n as $n,o as nt,p as je,q as Pt,r as hn,s as mn,t as bn,u as vn,v as gn}from"./c-KFVOU7UG.js";import{a as z,b as V,c as Oe,d as ye,e as ds,f as us,g as Nt,h as xt,i as Ba,j as Ia,k as ps,l as Re,m as ke,n as se,o as La,p as et}from"./c-NEI3ZHVG.js";import{a as en,b as tn,c as sn,d as It,j as Lt}from"./c-5A6CDYTK.js";import"./c-DCHXERWL.js";import{b as za,c as _a,d as hs,e as ms,f as Ua}from"./c-ZFXIPNDX.js";import{$ as ls,A as is,C as Ta,R as rs,W as Ft,X as Ma,Y as Fa,aa as Na,b as Z,ba as cs,c as va,d as ga,da as xa,e as ns,h as fa,i as ya,o as ka,p as Mt,q as qe,r as wa,s as os,t as Sa,u as Ca,v as Aa,w as Da,x as Ea}from"./c-HECOZTOP.js";import{$ as oa,Aa as D,B as Zs,Ca as Ze,Da as $a,E as wt,Ea as P,F as Xs,Fa as as,G as Jt,Ga as ha,H as Be,Ha as M,I as R,Ia as $e,J as Ae,Ja as K,K as Qe,Ka as te,L as Ve,La as A,M as X,Ma as B,N as ea,Na as Y,O as St,Oa as Et,P as Q,Pa as ma,Q as H,Qa as ba,R as ie,Ra as T,S as ta,Sa as Tt,T as F,Ta as Xe,U as Ie,Ua as fe,V as sa,W as Je,X as N,Y as Le,Z as aa,_ as na,a as Ys,aa as ia,b as g,ba as ee,c as L,ca as j,d as ft,da as J,e as oe,ea as Zt,f as t,fa as Ct,ga as ra,h as yt,ha as la,i as kt,j as Fe,ja as ca,k as Hs,l as Gs,la as ge,m as ue,ma as Xt,n as Ne,na as At,o as Ks,oa as es,p as zs,pa as Dt,q as _s,qa as Pe,r as Us,ra as da,s as Qs,sa as ua,t as pe,ta as De,u as Vs,ua as pa,v as Js,w as be,wa as ts,x as Qt,xa as ss,y as Vt,ya as C,z as xe,za as U}from"./c-VMQ5LPX3.js";var ks=e=>`novum.sync:${e}`,ys=new Set,ot={state:"idle",at:0,error:""},We=null,Rt=null,gs=!1,qt=!1,Ot=null,ws=()=>{try{return JSON.parse(localStorage.getItem(ks(We)))||{version:0,dirty:!1}}catch{return{version:0,dirty:!1}}},Ss=e=>{try{localStorage.setItem(ks(We),JSON.stringify(e))}catch{}},fs=e=>{ot={...ot,...e},ys.forEach(s=>s(ot))},Sn=()=>ot,Cn=e=>(ys.add(e),()=>ys.delete(e));async function wn(e){let s=await ns("PUT","/data",{data:F(),baseVersion:e.version});Ss({version:s.version,dirty:!1})}async function ae(){if(!(!We||!Z())){if(gs){qt=!0;return}gs=!0,fs({state:"syncing"});try{let e=ws(),s=await ns("GET","/data");if(s.version>e.version){let n=F();!e.dirty||(s.data?.savedAt||0)>=(n.savedAt||0)?(Le(s.data,{remote:!0}),e={version:s.version,dirty:!1},Ss(e)):(e={version:s.version,dirty:!0},await wn(e))}else(e.dirty||s.version===0)&&await wn({...e,version:s.version});fs({state:"synced",at:Date.now(),error:""})}catch(e){e.status===409?qt=!0:fs({state:e.offline?"offline":"error",error:e.message})}finally{gs=!1,qt&&(qt=!1,setTimeout(ae,300))}}}var An=()=>{document.visibilityState==="visible"&&ae()};function Dn(e){return Ye(),We=e,Ot=Ie((s,n)=>{if(n.remote)return;let a=ws();a.dirty||Ss({...a,dirty:!0}),clearTimeout(Rt),Rt=setTimeout(ae,2e3)}),window.addEventListener("online",ae),document.addEventListener("visibilitychange",An),ae()}function Ye(){Ot&&Ot(),Ot=null,clearTimeout(Rt),window.removeEventListener("online",ae),document.removeEventListener("visibilitychange",An),We=null,ot={state:"idle",at:0,error:""}}async function En(){clearTimeout(Rt),We&&ws().dirty&&await ae()}function Cs(e){try{localStorage.removeItem(ks(e)),localStorage.removeItem(`novum.activity.${e}`)}catch{}}var Ts=()=>{let e=Z()?.user?.id;return e?`novum.activity.${e}`:""};function lo(){try{let e=JSON.parse(localStorage.getItem(Ts())||"null");return e&&Array.isArray(e.items)?e:null}catch{return null}}function Nn(e){try{Ts()&&localStorage.setItem(Ts(),JSON.stringify({items:e.items,unread:e.unread,at:Date.now()}))}catch{}}var xn=()=>{let e=lo();return e?{items:e.items,unread:e.unread,loaded:!0,cachedAt:e.at}:{items:[],unread:0,loaded:!1}},W=xn(),rt=new Set,ct=0,it=null,jt=new Set,Ge=()=>jt.forEach(e=>e(W));function he(){return it||(W={...W,refreshing:!0},Ge(),it=(async()=>{try{let e=await Ft(),s=e.items.filter(n=>!rt.has(n.id));W={...e,items:s,unread:s.filter(n=>!n.read).length,loaded:!0,error:""},ct=Date.now(),Nn(W)}catch(e){W={...W,loaded:!0,error:e.offline?"You’re offline.":"Couldn’t load your activity right now."}}return W={...W,refreshing:!1},it=null,Ge(),W})(),it)}function Bn(){W={items:[],unread:0,loaded:!1},ct=0,He=null,Ge()}function In(){W=xn(),ct=0,He=null,Ge()}var Ln=45e3,Yt=null,Pn=()=>{document.visibilityState==="visible"&&Date.now()-ct>5e3&&he()};function co(){Yt||(Yt=setInterval(()=>{document.visibilityState==="visible"&&he()},Ln),document.addEventListener("visibilitychange",Pn))}function uo(){clearInterval(Yt),Yt=null,document.removeEventListener("visibilitychange",Pn)}function Ee(){let[e,s]=g(W);return L(()=>(jt.add(s),co(),Date.now()-ct>Ln&&he(),()=>{jt.delete(s),jt.size||uo()}),[]),e}var He=null,Ms=!1;function qn(){let e=Ee(),[s,n]=g(null);if(L(()=>{if(!e.loaded||e.error)return;if(He===null){He=new Set(e.items.map(i=>i.id));return}let r=e.items.filter(i=>!He.has(i.id)&&!i.read);e.items.forEach(i=>He.add(i.id)),r.length&&!Ms&&(C(12),n({x:r[0],more:r.length-1,at:Date.now()}))},[e.items]),L(()=>{if(!s)return;let r=setTimeout(()=>n(null),6e3);return()=>clearTimeout(r)},[s]),!s)return null;let{x:a,more:o}=s;return t`<button class="act-pop" key=${s.at} role="status" onClick=${()=>{C(),n(null),dt()}}>
    <${ve} a=${a.who.avatar} name=${a.who.firstName} size=${38} />
    <span class="act-pop-t">${Rn(a)}${o>0&&t` <span class="muted">and ${o} more</span>`}</span>
    <span class="act-pop-x" aria-label="Dismiss" onClick=${r=>{r.stopPropagation(),n(null)}}>✕</span>
  </button>`}function On(){let e=Ee();return t`<button class="icon-btn bell" aria-label=${`Activity${e.unread?`, ${e.unread} new`:""}`} onClick=${dt}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    ${e.unread>0&&t`<i class="bell-dot">${e.unread>9?"9+":e.unread}</i>`}
  </button>`}var As=(e,s)=>{let n=Math.floor((s-e)/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;let a=Math.floor(n/60);if(a<24)return`${a}h ago`;let o=Math.floor(a/24);return o<7?`${o}d ago`:new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short"})},po={kind:"water",e:"💧",l:"Watered your garden"},xs=e=>e.data?.kind==="water"?po:xe.find(s=>s.kind===e.data?.kind)||xe[0],Fs={cheer:{c:"#FF375F",f:"cheers"},buddy_request:{e:"🤝",c:"#3B9BFF",f:"requests"},buddy_accepted:{e:"🤝",c:"#30D158",f:"requests"},follow:{e:"👤",c:"#BF5AF2",f:"requests"},follow_request:{e:"👤",c:"#BF5AF2",f:"requests"},follow_accepted:{e:"✓",c:"#30D158",f:"requests"},sos:{e:"🫁",c:"#64D2FF",f:"buddies"},milestone:{e:"🎉",c:"#FFD60A",f:"buddies"}},$o=e=>e.kind==="cheer"?xs(e).e:e.kind==="milestone"&&e.data?.emoji==="💷"?"💷":Fs[e.kind]?.e||"🔔";function Rn(e){let s=t`<b>${e.who.firstName}</b>`;switch(e.kind){case"cheer":{if(e.data?.kind==="water")return t`${s} watered your garden 💧`;let n=xs(e);return t`${s} sent you ${n.e} <i>${n.l.toLowerCase()}</i>`}case"buddy_request":return t`${s} wants to be buddies`;case"buddy_accepted":return t`You and ${s} are now buddies`;case"follow":return t`${s} started following you`;case"follow_request":return t`${s} wants to follow you`;case"follow_accepted":return t`${s} accepted your follow request`;case"sos":return t`${s} was having a craving and asked for support`;case"milestone":return t`${s} hit <b class="act-hl">${e.data.label}</b> ${e.data.quit}`;default:return t`${s}`}}function ho(e){let s=[...new Map(e.map(n=>[n.who.username,n.who.firstName])).values()];return s.length===1?t`<b>${s[0]}</b>`:s.length===2?t`<b>${s[0]}</b> and <b>${s[1]}</b>`:t`<b>${s[0]}</b>, <b>${s[1]}</b> and ${s.length-2} other${s.length===3?"":"s"}`}function mo(e,s){let n=new Date(s);n.setHours(0,0,0,0);let a=n.getTime();return e>=a?"Today":e>=a-864e5?"Yesterday":e>=a-6*864e5?"This week":"Earlier"}var bo={cheer:1,follow:1};function vo(e,s){let n=[];for(let a of e){let o=mo(a.at,s);(!n.length||n[n.length-1].b!==o)&&n.push({b:o,rows:[]}),n[n.length-1].rows.push(a)}for(let a of n){let o=[],r={};for(let i of a.rows)bo[i.kind]&&a.rows.filter(u=>u.kind===i.kind).length>=2?(r[i.kind]||(r[i.kind]={group:!0,kind:i.kind,id:`g:${a.b}:${i.kind}`,items:[],at:i.at},o.push(r[i.kind])),r[i.kind].items.push(i)):o.push(i);a.rows=o}return n}var go=e=>e.filter(s=>!s.read).length;function lt(e){W={...W,items:e,unread:go(e)},Nn(W),Ge()}var Tn=4500;function Wt(e,s){let n=W.items.filter(i=>e.includes(i.id));if(!n.length)return;e.forEach(i=>rt.add(i)),lt(W.items.filter(i=>!e.includes(i.id)));let a=!1,o=!W.items.length&&e.length>1,r=Math.max(...n.map(i=>i.at));T(s,{ms:Tn,action:{label:"Undo",onClick:()=>{a=!0,e.forEach(i=>rt.delete(i)),lt([...W.items,...n].sort((i,u)=>u.at-i.at))}}}),setTimeout(async()=>{if(!a){try{await(o?ls(null,r):Promise.all(e.map(i=>ls(i))))}catch(i){e.forEach(u=>rt.delete(u)),lt([...W.items,...n].sort((u,l)=>l.at-u.at)),T(i.offline?"You’re offline, so nothing was cleared.":"Couldn’t clear that. Try again.");return}e.forEach(i=>rt.delete(i))}},Tn+200)}function fo(){se({title:"Clear all notifications?",text:"This empties Activity on all your devices. Buddy and follow requests still wait for you in Buddies and Profile.",confirm:"Clear all",onConfirm:()=>{C(15),Wt(W.items.map(e=>e.id),"All cleared")}})}async function Ds(e){let s=W.items.filter(a=>e.includes(a.id));if(!s.length)return;let n=s.every(a=>a.read);C(10),lt(W.items.map(a=>e.includes(a.id)?{...a,read:!n}:a));try{await Promise.all(e.map(a=>Fa(a,n)))}catch(a){lt(W.items.map(o=>e.includes(o.id)?{...o,read:n}:o)),T(a.offline?"You’re offline. Try again when you’re back.":"Couldn’t update that. Try again.")}}var Mn=88;function Es({onClear:e,onToggle:s,unread:n,children:a}){let[o,r]=g(0),[i,u]=g(!1),[l,d]=g(!1),p=oe(null),$=oe(0),c=w=>{$.current=w,r(w)},b=()=>{C(12),d(!0),setTimeout(e,260)},h=()=>{c(0),s()},v=w=>{let k=w.touches[0];p.current={x:k.clientX,y:k.clientY,base:$.current,dir:null}},m=w=>{let k=p.current;if(!k)return;let f=w.touches[0],q=f.clientX-k.x,O=f.clientY-k.y;k.dir||(Math.abs(q)>8&&Math.abs(q)>Math.abs(O)?(k.dir="h",u(!0)):Math.abs(O)>8&&(k.dir="v")),k.dir==="h"&&c(Math.max(-220,Math.min(140,k.base+q)))},y=()=>{let w=p.current;p.current=null,u(!1),!(!w||w.dir!=="h")&&($.current>70?h():$.current<-160?b():c($.current<-Mn/2?-Mn:0))};return t`<div class="act-swipe ${l?"gone":""} ${o<0||i?"open":""} ${o>0?"right":""}">
    <span class="act-mark ${o>70?"go":""}" aria-hidden="true">${n?"✓ Read":"● Unread"}</span>
    <button class="act-clear" tabindex=${o<0?0:-1} aria-hidden=${o<0?"false":"true"} onClick=${b}>Clear</button>
    <div class="act-slide ${i?"drag":""}" style=${`transform:translateX(${l?-420:o}px)`}
      onTouchStart=${v} onTouchMove=${m} onTouchEnd=${y} onTouchCancel=${y}
      onClickCapture=${w=>{$.current&&(w.stopPropagation(),w.preventDefault(),c(0))}}>
      ${a}
    </div>
  </div>`}var Fn=[{value:"all",label:"All"},{value:"cheers",label:"Cheers"},{value:"requests",label:"Requests"},{value:"buddies",label:"Buddies"}];function dt(){P(e=>t`<${yo} close=${e} />`,{tall:!0})}function yo({close:e}){let s=Ee(),n=U(6e4),[a,o]=g({}),[r,i]=g("all"),[u,l]=g({});L(()=>(Ms=!0,()=>{Ms=!1}),[]),L(()=>{he().then(m=>{m.unread&&Ma().then(()=>{W={...W,unread:0},Ge()}).catch(()=>{})})},[]);let d=async(m,y,w)=>{C(10);try{await y(),o(k=>({...k,[m.id]:w})),T(w),je()}catch(k){T(k.message),k.queued&&o(f=>({...f,[m.id]:"Will send when you’re back online"}))}},p=s.items.filter(m=>r==="all"||Fs[m.kind]?.f===r),$=vo(p,n),c=m=>a[m.id]?t`<div class="act-done">✓ ${a[m.id]}</div>`:m.kind==="sos"&&m.who.buddy?t`<${bs} who=${m.who} small class="act-cheers"
        onSent=${(y,w)=>o(k=>({...k,[m.id]:w?"Will send when you’re back online":`Sent ${y.e} ${y.l.toLowerCase()}`}))} />`:m.kind==="cheer"&&m.who.buddy?t`<button class="act-chip" onClick=${()=>d(m,()=>Ta(m.who.username,"heart"),`Sent 💙 back to ${m.who.firstName}`)}>💙 Send one back</button>`:m.kind==="buddy_request"?t`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>d(m,()=>is(m.who.username,!0),`You and ${m.who.firstName} are buddies`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>d(m,()=>is(m.who.username,!1),"Declined")}>Decline</button></div>`:m.kind==="follow_request"?t`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>d(m,()=>rs(m.who.username,!0),`${m.who.firstName} can now see your profile`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>d(m,()=>rs(m.who.username,!1),"Declined")}>Decline</button></div>`:null,b=m=>t`<div class="act-item ${m.read?"":"new"} ${m.kind==="sos"?"act-sos":""}">
    <button class="act-av" aria-label=${`Open ${m.who.firstName}’s profile`} onClick=${()=>nt(m.who.username)}>
      <${ve} a=${m.who.avatar} name=${m.who.firstName} size=${44} />
      <i class="act-kind" style=${`background:${Fs[m.kind]?.c||"#3B9BFF"}`} aria-hidden="true">${$o(m)}</i>
    </button>
    <div class="act-main">
      <div class="act-t">${Rn(m)}</div>
      <div class="act-when">${As(m.at,n)}</div>
      ${c(m)}
    </div>
    ${!m.read&&t`<i class="act-dot" aria-label="New"></i>`}
  </div>`,h=m=>{let y=m.data?.emoji==="💷";return t`<div class="act-ms-card ${y?"money":""} ${m.read?"":"new"}">
      <span class="ms-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <div class="ms-top">
        <button class="act-av" aria-label=${`Open ${m.who.firstName}’s profile`} onClick=${()=>nt(m.who.username)}><${ve} a=${m.who.avatar} name=${m.who.firstName} size=${36} /></button>
        <span class="ms-who"><b>${m.who.firstName}</b> hit a milestone · ${As(m.at,n)}</span>
        ${!m.read&&t`<i class="act-dot static" aria-label="New"></i>`}
      </div>
      <div class="ms-big">${y?"💷":"🎉"} ${m.data.label}</div>
      <div class="ms-sub">${m.data.quit}</div>
      ${a[m.id]?t`<div class="act-done">✓ ${a[m.id]}</div>`:m.who.buddy&&t`<${bs} who=${m.who} small class="ms-cheers"
          onSent=${(w,k)=>o(f=>({...f,[m.id]:k?"Will send when you’re back online":`Sent ${w.e} ${w.l.toLowerCase()}`}))} />`}
    </div>`},v=m=>{let y=u[m.id],w=m.items.some(f=>!f.read),k=[...new Set(m.items.map(f=>m.kind==="cheer"?xs(f).e:"👤"))].slice(0,3).join("");return t`<div class="act-group-row">
      <button class="act-item act-stack ${w?"new":""}" aria-expanded=${!!y} onClick=${()=>{C(),l(f=>({...f,[m.id]:!f[m.id]}))}}>
        <span class="stack-avs" aria-hidden="true">${[...new Map(m.items.map(f=>[f.who.username,f])).values()].slice(0,3).map((f,q)=>t`<span class="stack-av" key=${f.id} style=${`z-index:${3-q}`}><${ve} a=${f.who.avatar} name=${f.who.firstName} size=${34} /></span>`)}</span>
        <span class="act-main">
          <span class="act-t">${ho(m.items)} ${m.kind==="cheer"?t`sent you ${m.items.length} cheers ${k}`:t`started following you`}</span>
          <span class="act-when">${As(m.items[0].at,n)} · ${y?"Hide":"Show all"}</span>
        </span>
        ${w&&t`<i class="act-dot" aria-label="New"></i>`}
      </button>
      ${y&&t`<div class="stack-list">${m.items.map(f=>t`<${Es} key=${f.id} unread=${!f.read} onClear=${()=>Wt([f.id],"Cleared")} onToggle=${()=>Ds([f.id])}>${b(f)}<//>`)}</div>`}
    </div>`};return t`
    <${M} title="Activity"
      left=${s.items.length>0?t`<button class="link act-clear-all" onClick=${fo}>Clear all</button>`:null}
      right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body act-sheet">
      ${s.items.length>0&&t`<div class="act-filter"><${K} small options=${Fn} value=${r} onChange=${i} /></div>`}
      ${s.error&&s.items.length>0&&t`<div class="act-stale" role="status">
        <span>📡 ${s.error==="You’re offline."?"You’re offline.":"Couldn’t refresh."} Showing your last update.</span>
        <button class="link sm" disabled=${s.refreshing} onClick=${()=>{C(),he()}}>${s.refreshing?"Trying…":"Try again"}</button>
      </div>`}
      ${s.loaded?s.error&&s.items.length===0?t`<div class="act-empty"><div class="act-empty-ic">📡</div><b>${s.error}</b><p class="muted">Your cheers and requests are safe. They’ll show up once Novum can reach the server.</p><button class="btn btn-tinted sm mt12" disabled=${s.refreshing} onClick=${()=>{C(),he()}}>${s.refreshing?"Trying…":"Try again"}</button></div>`:s.items.length===0?t`<div class="act-empty"><div class="act-empty-ic">🔔</div><b>You’re all caught up</b><p class="muted">Cheers, requests and your buddies’ milestones will show up here.</p></div>`:p.length===0?t`<div class="act-empty sm"><b>Nothing here</b><p class="muted">No ${Fn.find(m=>m.value===r).label.toLowerCase()} in the last 60 days.</p></div>`:$.map(m=>t`<section class="act-group" key=${m.b}>
          <h3 class="act-gh">${m.b}</h3>
          <div class="act-card">
            ${m.rows.map(y=>y.group?t`<${Es} key=${y.id} unread=${y.items.some(w=>!w.read)} onClear=${()=>Wt(y.items.map(w=>w.id),`Cleared ${y.items.length}`)} onToggle=${()=>Ds(y.items.map(w=>w.id))}>${v(y)}<//>`:t`<${Es} key=${y.id} unread=${!y.read} onClear=${()=>Wt([y.id],"Cleared")} onToggle=${()=>Ds([y.id])}>${y.kind==="milestone"?h(y):b(y)}<//>`)}
          </div>
        </section>`):t`<${Tt} rows=${5} avatar />`}
      ${s.items.length>0&&t`<p class="muted center tiny act-foot">Swipe left to clear, right to mark as read or unread. Kept for 60 days.</p>`}
    </div>`}var ut=[{tab:"home",e:"🏠",t:"Home",d:"Your streaks, money saved and what your body is doing right now. Craving? The big “Tap here” button gives you five minutes of guided breathing. The 🔔 at the top shows cheers from buddies."},{tab:"checkin",e:"✍️",t:"Check-in",d:"Twenty seconds a day: mood, cravings and sleep. The red dot means you haven’t checked in yet today. It’s how Novum spots your patterns."},{tab:"goals",e:"🎯",t:"Goals",d:"Habits you tick off, targets to work towards and one-off milestones, for 2027 or any date you choose."},{tab:"progress",e:"📈",t:"Progress",d:"Rings, charts and your check-in calendar, so you can see how far you’ve come."},{tab:"profile",e:"🤝",t:"Profile",d:"Add buddies by username, choose what they see, set up notifications and change your avatar. Quitting is easier together."}],Bs=new Set,Is=!1;function jn(){Is=!0,Bs.forEach(e=>e(!0))}function Wn({s:e,go:s}){let[n,a]=g(!e.tourDone||Is),[o,r]=g(0),[i,u]=g(null);if(L(()=>{let c=b=>{r(0),a(b)};return Bs.add(c),()=>Bs.delete(c)},[]),L(()=>{n&&s(ut[o].tab,{quiet:!0})},[n,o]),ft(()=>{if(!n){document.documentElement.classList.remove("touring");return}document.documentElement.classList.add("touring");let c=()=>{let b=document.querySelectorAll(".tabbar .tab")[o];if(b){let h=b.getBoundingClientRect();u(h.left+h.width/2)}};return c(),window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c),document.documentElement.classList.remove("touring")}},[n,o]),!n)return null;let l=ut[o],d=o===ut.length-1,p=()=>{C(15),Is=!1,a(!1),s("home",{quiet:!0}),F().tourDone||N(c=>{c.tourDone=!0})},$=()=>{C(),d?p():r(o+1)};return t`<div class="tour" role="dialog" aria-modal="true" aria-label="Novum tour">
    <div class="tour-dim" onClick=${$}></div>
    <div class="tour-card" key=${o}>
      <div class="tour-top"><span class="tour-e">${l.e}</span><span class="tour-step">${o+1} of ${ut.length}</span>
        ${!d&&t`<button class="link sm tour-skip" onClick=${p}>Skip</button>`}</div>
      <h3 class="tour-t">${l.t}</h3>
      <p class="tour-d">${l.d}</p>
      <div class="tour-foot">
        <div class="tour-dots">${ut.map((c,b)=>t`<i class=${b===o?"on":""}></i>`)}</div>
        <div class="tour-btns">
          ${o>0&&t`<button class="btn btn-plain sm" onClick=${()=>{C(),r(o-1)}}>Back</button>`}
          <button class="btn btn-primary sm" onClick=${$}>${d?"Let’s go":"Next"}</button>
        </div>
      </div>
    </div>
    ${i!=null&&t`<i class="tour-arrow" key=${"a"+o} style=${`left:${i}px`}></i>`}
  </div>`}var Yn=864e5,Hn=e=>Ae(e).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});function we(){C(),P(e=>t`<${ko} close=${e} />`,{tall:!0})}function ko({close:e}){let[s,n]=g(F()),a=()=>n(F()),o=R(),r=s.events.filter(u=>u.date>=o&&!u.outcome).sort((u,l)=>u.date.localeCompare(l.date)),i=pe.filter(u=>s.plans[u]);return t`
    <${M} title="Plan ahead" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Deciding what you’ll do <i>before</i> a craving hits makes you far more likely to stick to it.</p>
      <${A} header="Tough days coming up" footer="Novum reminds you the evening before and on the morning, then asks how it went.">
        ${r.map(u=>t`<${B} key=${u.id} icon=${u.emoji} iconBg="#FF9F0A" title=${u.title} detail=${u.date===o?"Today":Hn(u.date)} chevron
          onClick=${()=>Gt(u,a)} />`)}
        <${B} icon=${D.plus()} iconBg="#FF9F0A" title="Add a tough day" chevron onClick=${()=>Gt(null,a)} />
      <//>
      <${A} header="If-then plans" footer="When you use Craving SOS and say what set it off, your plan shows straight away.">
        ${i.map(u=>t`<${B} key=${u} icon="🧭" iconBg="#5E5CE6" title=${`If: ${u.toLowerCase()}`} sub=${`Then: ${s.plans[u]}`} chevron onClick=${()=>Ls(u,a)} />`)}
        ${pe.filter(u=>!s.plans[u]).length>0&&t`<div class="plan-add">
          <span class="plan-add-k">Add a plan for…</span>
          <div class="chip-row">${pe.filter(u=>!s.plans[u]).map(u=>t`<button key=${u} class="chip" style="--c:#5E5CE6" onClick=${()=>Ls(u,a)}>${u}</button>`)}</div>
        </div>`}
      <//>
    </div>`}function Ls(e,s){P(n=>t`<${wo} trigger=${e} close=${()=>{n(),s?.()}} />`)}function wo({trigger:e,close:s}){let[n,a]=g(F().plans[e]||""),o=()=>{C(12),N(r=>{r.plans={...r.plans},n.trim()?r.plans[e]=n.trim().slice(0,120):delete r.plans[e]}),T(n.trim()?"Plan saved 🧭":"Plan removed"),s()};return t`
    <${M} title=${`If: ${e.toLowerCase()}`} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="Then I’ll…">
        <textarea class="note" rows="2" maxlength="120" placeholder="e.g. go for a 10-minute walk" value=${n} onInput=${r=>a(r.target.value)}></textarea>
      <//>
      <${A} header="Ideas">
        <div class="chip-row">${(wt[e]||wt.Other).map(r=>t`<button key=${r} class="chip ${n===r?"on":""}" style="--c:#5E5CE6" onClick=${()=>{C(),a(r)}}>${r}</button>`)}</div>
      <//>
      ${F().plans[e]&&t`<button class="btn btn-plain danger block" onClick=${()=>{a(""),N(r=>{r.plans={...r.plans},delete r.plans[e]}),T("Plan removed"),s()}}>Remove this plan</button>`}
    </div>`}function Gt(e,s){P(n=>t`<${So} ev=${e} close=${()=>{n(),s?.()}} />`,{tall:!0})}function So({ev:e,close:s}){let[n,a]=g(e||{title:"",emoji:"🎉",date:R(X(new Date,1)),trigger:"",plan:""}),o=d=>p=>a({...n,[d]:p.target.value}),r=n.title.trim()&&n.date,i=()=>{if(!r)return;C(12);let d={...n,title:n.title.trim().slice(0,40),plan:(n.plan||"").trim().slice(0,160)};N(p=>{e?p.events=p.events.map($=>$.id===e.id?{...$,...d}:$):p.events=[...p.events,{...d,id:ie(),outcome:null}]}),T(e?"Saved":"Added. You’ll get a reminder the evening before 📅"),s()},u=n.trigger?wt[n.trigger]||[]:[],l=n.trigger&&F().plans[n.trigger];return t`
    <${M} title=${e?"Tough day":"Add a tough day"} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" disabled=${!r} onClick=${i}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="What’s happening?">
        <div class="ev-title"><input class="ev-emoji-in" aria-label="Emoji" maxlength="4" value=${n.emoji} onInput=${o("emoji")} />
          <input placeholder="e.g. Jake’s party" maxlength="40" value=${n.title} onInput=${o("title")} /></div>
        <div class="emoji-strip">${Xs.map(d=>t`<button key=${d} class=${n.emoji===d?"on":""} onClick=${()=>a({...n,emoji:d})}>${d}</button>`)}</div>
      <//>
      <${A} header="When?">
        <label class="field"><span class="field-l">Date</span><span class="field-c"><input type="date" min=${R()} value=${n.date} onInput=${o("date")} /></span></label>
      <//>
      <${A} header="What might set you off?">
        <div class="chip-row">${pe.map(d=>t`<button key=${d} class="chip ${n.trigger===d?"on":""}" style="--c:#FF9F0A" onClick=${()=>{C(),a({...n,trigger:n.trigger===d?"":d})}}>${d}</button>`)}</div>
      <//>
      <${A} header="My plan" footer=${l&&!n.plan?t`Your if-then plan for ${n.trigger.toLowerCase()}: <b>${l}</b>. <button class="link sm" onClick=${()=>a({...n,plan:l})}>Use it</button>`:"Shown on the day and in your reminder."}>
        <textarea class="note" rows="3" maxlength="160" placeholder="e.g. Leave by 11, stick to soft drinks, text Amy if it gets hard" value=${n.plan} onInput=${o("plan")}></textarea>
        ${u.length>0&&t`<div class="chip-row pad-chips">${u.map(d=>t`<button key=${d} class="chip" style="--c:#FF9F0A" onClick=${()=>{C(),a({...n,plan:n.plan?`${n.plan.replace(/[.\s]*$/,"")}. ${d}`:d})}}>＋ ${d}</button>`)}</div>`}
      <//>
      ${e&&t`<button class="btn btn-plain danger block" onClick=${()=>{N(d=>{d.events=d.events.filter(p=>p.id!==e.id)}),T("Removed"),s()}}>Delete</button>`}
    </div>`}function Gn({s:e}){let s=R(),n=R(X(new Date,-3)),a=R(X(new Date,14)),o=e.events.filter(l=>!l.outcome&&l.date<s&&l.date>=n),r=e.events.filter(l=>!l.outcome&&l.date===s),i=e.events.filter(l=>!l.outcome&&l.date>s&&l.date<=a).sort((l,d)=>l.date.localeCompare(d.date));if(!o.length&&!r.length&&!i.length)return null;let u=(l,d)=>{C(d==="quit"?20:10),N(p=>{p.events=p.events.map($=>$.id===l.id?{...$,outcome:d}:$)}),T(d==="quit"?`You got through ${l.title} 💪 That’s huge.`:"Thanks for being honest. Next time, adjust the plan.")};return t`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Plan ahead</h2><button class="link sm" onClick=${we}>See all</button></div>
    <div class="stack">
      ${o.map(l=>t`<div class="card ev-card ask" key=${l.id}>
        <div class="ev-top"><span class="ev-e">${l.emoji}</span><span class="row-main"><b>How did ${l.title} go?</b><small>${Hn(l.date)}</small></span></div>
        <div class="act-btns"><button class="btn btn-primary sm" onClick=${()=>u(l,"quit")}>Stayed quit 💪</button><button class="btn btn-plain sm" onClick=${()=>u(l,"slip")}>I slipped</button></div>
      </div>`)}
      ${r.map(l=>t`<button class="card ev-card today tap" key=${l.id} onClick=${()=>Gt(l)}>
        <div class="ev-top"><span class="ev-e">${l.emoji}</span><span class="row-main"><span class="ev-k">Today</span><b>${l.title}</b></span></div>
        ${l.plan?t`<p class="ev-plan"><span>Your plan</span>${l.plan}</p>`:t`<p class="ev-plan empty">No plan yet. Tap to add one.</p>`}
      </button>`)}
      ${i.length>0&&t`<div class="card list">${i.map(l=>{let d=ea(new Date,Ae(l.date));return t`<${B} key=${l.id} icon=${l.emoji} iconBg="#FF9F0A" title=${l.title} detail=${d===1?"Tomorrow":`in ${d} days`} chevron onClick=${()=>Gt(l)} />`})}</div>`}
    </div>
  </section>`}function Kn({s:e,picked:s,onPick:n}){let a=s.map(r=>e.plans[r]&&{t:r,p:e.plans[r]}).filter(Boolean)[0],o=[...pe].sort((r,i)=>(e.plans[i]?1:0)-(e.plans[r]?1:0));return t`<div class="sos-plan">
    <div class="sos-plan-k">What set it off?</div>
    <div class="sos-plan-chips">${o.map(r=>t`<button key=${r} class="chip sm ${s.includes(r)?"on":""} ${e.plans[r]?"has":""}" style="--c:#5E5CE6" onClick=${()=>{C(),n(r)}}>${e.plans[r]?"🧭 ":""}${r}</button>`)}</div>
    ${a?t`<div class="card sos-plan-card" key=${a.t}><span class="spc-k">Your plan for ${a.t.toLowerCase()}</span><b>${a.p}</b></div>`:s.length>0?t`<button class="link sm sos-plan-add" onClick=${()=>Ls(s[0])}>No plan for ${s[0].toLowerCase()} yet. Make one for next time</button>`:null}
  </div>`}var Ht=e=>{let s=[...e].sort((a,o)=>a-o),n=s.length;return n?n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2:null},pt=e=>e<60?`${Math.max(1,Math.round(e))} sec`:`${Math.round(e/60)} min`;function Co(e,s=Date.now()){let n=e.cravings.filter(l=>l.t<=s),a=n.filter(l=>l.beaten),o=a.filter(l=>l.secs>5),r=St(new Date(s)).getTime(),i=Array.from({length:8},(l,d)=>{let p=r-(7-d)*7*Yn,$=p+7*Yn,c=n.filter(b=>b.t>=p&&b.t<$);return{from:p,n:c.length,secs:Ht(c.filter(b=>b.beaten&&b.secs>5).map(b=>b.secs))}}),u=null;if(o.length>=6){let l=Math.floor(o.length/3),d=[...o].sort((c,b)=>c.t-b.t),p=Ht(d.slice(0,l).map(c=>c.secs)),$=Ht(d.slice(-l).map(c=>c.secs));u={from:p,to:$}}return{total:n.length,beaten:a.length,typical:Ht(o.map(l=>l.secs)),weeks:i,trend:u}}function zn({s:e}){let s=Co(e);if(!s.total)return null;let n=Math.max(1,...s.weeks.map(r=>r.n)),a=Math.round(s.beaten/s.total*100),o=s.trend&&s.trend.to<s.trend.from*.85?`Your cravings are getting shorter: from about ${pt(s.trend.from)} to ${pt(s.trend.to)}.`:s.trend&&s.trend.to>s.trend.from*1.15?`Cravings have been lasting a bit longer lately (${pt(s.trend.to)}). Tough patches pass. Keep using SOS.`:s.typical?`Most of your cravings pass in about ${pt(s.typical)}. You only ever have to outlast this one.`:"Use Craving SOS when one hits to see how long they last.";return t`<section class="group">
    <h2 class="group-h">Craving SOS</h2>
    <div class="card pad cstats">
      <div class="cs-tiles">
        <div><b>${s.typical?pt(s.typical):"–"}</b><span>typical craving</span></div>
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
  </section>`}var Ao=fe(()=>import("./c-6PNAFOTB.js"),"openRecap");function _n({s:e,go:s}){let[n,a]=g(30),o=Date.now(),r=e.goals.filter(S=>S.period==="2027"),i=Ne.map(S=>{let x=r.filter(ne=>ne.category===S.id);return x.length?{...S,pct:x.reduce((ne,E)=>ne+De(E,e).pct,0)/x.length,n:x.length}:null}).filter(Boolean),u=r.length?r.reduce((S,x)=>S+De(x,e).pct,0)/r.length:0,l=Oe.getTime(),d=o>=l?Math.min(365,Math.floor((o-l)/z)+1):0,p=Math.ceil((l-o)/z),c=e.goals.map(S=>De(S,e)).filter(S=>S.pct>=1).length,b=e.goals.filter(S=>S.type==="habit").reduce((S,x)=>Math.max(S,Pe(x).value),0),h=e.quits.reduce((S,x)=>S+J(x,j(x,o)),0),v=Array.from({length:n},(S,x)=>R(X(new Date,x-n+1))),m=v.map(S=>e.checkins[S]?.mood??null),y=e.quits.map(S=>({name:S.label,color:S.color,values:v.map(x=>e.checkins[x]?.[S.id]??null)})),w=[...e.profile.weights].sort((S,x)=>S.date.localeCompare(x.date)),k=w.length?Math.floor(Math.min(...w.map(S=>S.kg))-2):60,f=w.length?Math.ceil(Math.max(...w.map(S=>S.kg))+2):80,q=(()=>{let S=Object.keys(e.checkins).sort().filter(me=>e.quits.some(de=>e.checkins[me][de.id]!=null));if(S.length<6)return null;let x=me=>{let de=me.flatMap(Ce=>e.quits.map(G=>e.checkins[Ce][G.id]).filter(G=>G!=null));return de.reduce((Ce,G)=>Ce+G,0)/de.length},ne=Math.min(7,Math.floor(S.length/2)),E=x(S.slice(0,ne)),_=x(S.slice(-ne));if(E===0)return null;let ce=Math.round((_-E)/E*100);return ce<0?`Cravings are down ${-ce}% compared with your first check-ins.`:ce>0?`Cravings are up ${ce}% on your first check-ins. Tough patches are normal. Keep going.`:"Cravings are holding steady."})(),O={};e.cravings.forEach(S=>(S.triggers||[]).forEach(x=>{O[x]=(O[x]||0)+1}));let _e=Object.entries(O).sort((S,x)=>x[1]-S[1]).slice(0,6),le=Array(24).fill(0);e.cravings.forEach(S=>{le[new Date(S.t).getHours()]++});let I=le.indexOf(Math.max(...le)),vt=`${V(I)}:00–${V((I+1)%24)}:00`,gt=new Set([...Object.keys(e.checkins),...e.goals.flatMap(S=>S.ticks||[])]),Ue=Array.from({length:12},(S,x)=>{let ne=new Date(2027,x+1,0).getDate(),E=0;for(let _=1;_<=ne;_++)gt.has(`2027-${V(x+1)}-${V(_)}`)&&E++;return{m:x,pct:E/ne,future:new Date(2027,x,1)>o}});return t`<${$e} title="Progress">
    <${kn} />
    ${e.quits.length>0&&t`<button class="card rc-card tap" onClick=${Ao}>
      <span class="rc-card-ic">📅</span>
      <span class="row-main"><span class="row-title">Your week</span><span class="row-sub">Check-ins, cravings beaten, money saved and what your body did</span></span>
      <span class="row-chev">${D.chevron()}</span>
    </button>`}
    <section class="group">
      <h2 class="group-h">2027 at a glance</h2>
      <div class="card glance">
        ${r.length?t`
          <div class="glance-top">
            <${$a} size=${150} stroke=${14} gap=${3} rings=${i.slice(0,5).map(S=>({pct:S.pct,color:S.color}))}>
              <div class="gl-c"><b>${Math.round(u*100)}%</b><span>overall</span></div>
            <//>
            <div class="gl-legend">${i.map(S=>t`<div class="gl-li"><i style="background:${S.color}"></i><span>${S.label}</span><b>${Math.round(S.pct*100)}%</b></div>`)}</div>
          </div>`:t`<div class="glance-empty"><p>Add goals for 2027 to see all your rings here.</p><button class="btn btn-primary sm" onClick=${Ke}>New Year ideas</button></div>`}
        <div class="year-bar">
          <div class="yb-t"><span>${d?`Day ${d} of 365`:`2027 starts in ${p} day${p===1?"":"s"}`}</span><span>${Math.round(d/365*100)}% of the year</span></div>
          <div class="yb"><i style="width:${d/365*100}%"></i></div>
        </div>
        <div class="months">${Ue.map(S=>t`<div class="mo ${S.future?"future":""}" title=${`${Math.round(S.pct*100)}% of days active`}>
          <div class="mo-bar"><i style="height:${Math.max(S.future?0:4,S.pct*100)}%"></i></div><span>${"JFMAMJJASOND"[S.m]}</span></div>`)}</div>
        <p class="tiny muted">Bars show the share of days each month with a check-in or a ticked habit.</p>
      </div>
    </section>

    <div class="tiles">
      ${e.quits.map(S=>t`<div class="tile"><span class="tile-k">${S.emoji} ${S.label}-free</span><b>${Math.floor(j(S,o)/z)}</b><span class="tile-u">days</span></div>`)}
      <div class="tile"><span class="tile-k">💷 Saved</span><b>${H(h,0)}</b><span class="tile-u">so far</span></div>
      <div class="tile"><span class="tile-k">🎯 Goals</span><b>${c}/${e.goals.length}</b><span class="tile-u">complete</span></div>
      <div class="tile"><span class="tile-k">🔥 Best streak</span><b>${b}</b><span class="tile-u">on a habit</span></div>
      <div class="tile"><span class="tile-k">✍️ Check-ins</span><b>${Object.keys(e.checkins).length}</b><span class="tile-u">logged</span></div>
      <div class="tile"><span class="tile-k">🛡️ Cravings beaten</span><b>${e.cravings.filter(S=>S.beaten).length}</b><span class="tile-u">with SOS</span></div>
      <div class="tile"><span class="tile-k">⏱️ SOS time</span><b>${Math.round(e.cravings.reduce((S,x)=>S+(x.secs||0),0)/60)}</b><span class="tile-u">minutes ridden out</span></div>
    </div>

    <${fn} s=${e} />

    <div class="pad-x mt16"><${K} options=${[{value:14,label:"2 weeks"},{value:30,label:"30 days"},{value:90,label:"90 days"}]} value=${n} onChange=${a} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${Et} keys=${v} series=${[{name:"Mood",color:"#5AC8FA",values:m}]} yMin=${1} yMax=${5} yTicks=${[1,3,5]}
          yFmt=${S=>be[Math.round(S)-1]?.e??S} height=${170} />
      </div>
    </section>

    ${y.length>0&&t`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${y.length>1&&t`<${ma} series=${y} />`}
        <${Et} keys=${v} series=${y} yMin=${0} yMax=${10} yTicks=${[0,5,10]} unit="/10" height=${190} />
        ${q&&t`<p class="insight">${q}</p>`}
      </div>
    </section>`}

    <${zn} s=${e} />

    <${Do} s=${e} />

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Weight</h2><button class="link sm" onClick=${$t}>Log weight</button></div>
      <div class="card chart-card">
        ${w.length>=2?t`<${Et} keys=${w.map(S=>S.date)} series=${[{name:"Weight",color:"#FF375F",values:w.map(S=>S.kg)}]}
              yMin=${k} yMax=${f} yTicks=${[k,Math.round((k+f)/2),f]} unit=" kg" height=${170} />`:t`<p class="muted pad">Log your weight now and then to see a trend. Latest: <b>${ge(e.profile)?.toFixed(1)??"–"} kg</b>.</p>`}
      </div>
    </section>
  <//>`}var Ps=["12–4am","4–8am","8am–12","12–4pm","4–8pm","8pm–12"],qs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function Do({s:e}){let s=[...e.cravings.map(h=>new Date(h.t)),...e.quits.flatMap(h=>(h.resets||[]).map(v=>Qe(v.to)))],n=Array.from({length:7},()=>Array(6).fill(0));s.forEach(h=>{n[(h.getDay()+6)%7][Math.floor(h.getHours()/4)]++});let a=Math.max(1,...n.flat()),o=null;n.forEach((h,v)=>h.forEach((m,y)=>{m&&(!o||m>o.n)&&(o={n:m,w:v,b:y})}));let r={};e.cravings.forEach(h=>(h.triggers||[]).forEach(v=>{r[v]=(r[v]||0)+1})),e.quits.forEach(h=>(h.resets||[]).forEach(v=>(v.triggers||[]).forEach(m=>{r[m]=(r[m]||0)+1})));let i=Object.entries(r).sort((h,v)=>v[1]-h[1]).slice(0,6),u=et.map(()=>[]);Object.values(e.checkins).forEach(h=>{if(!h.sleep)return;let v=e.quits.map(m=>h[m.id]).filter(m=>typeof m=="number");v.length&&u[h.sleep-1].push(v.reduce((m,y)=>m+y,0)/v.length)});let l=u.map(h=>h.length?h.reduce((v,m)=>v+m,0)/h.length:null),d=[...u[0],...u[1]],p=[...u[3],...u[4]],$=h=>h.reduce((v,m)=>v+m,0)/h.length,c=d.length>=2&&p.length>=2?`After good sleep your cravings average ${$(p).toFixed(1)}/10, against ${$(d).toFixed(1)}/10 after a bad night.`:null,b=l.filter(h=>h!=null).length>=2;return s.length<3&&!i.length&&!b?null:t`
    ${s.length>=3&&t`<section class="group">
      <h2 class="group-h">When cravings hit</h2>
      <div class="card pad heatmap">
        <div class="heat-grid">
          <span></span>${Ps.map(h=>t`<span class="heat-h" key=${h}>${h}</span>`)}
          ${n.map((h,v)=>t`<span class="heat-w" key=${"w"+v}>${qs[v]}</span>${h.map((m,y)=>t`<i key=${v+"-"+y} title=${`${qs[v]} ${Ps[y]}: ${m}`}
            style=${`--a:${m?.18+m/a*.82:0}`} class=${m?"on":""}>${m||""}</i>`)}`)}
        </div>
        <p class="tiny muted">${o?`Your toughest time is ${qs[o.w]} ${Ps[o.b]}. Plan something for then.`:""} From ${s.length} craving${s.length===1?"":"s"} and slips you logged.</p>
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
        ${et.map((h,v)=>l[v]!=null&&t`<div class="bar-row" key=${h}>
          <span class="bar-l">${h} sleep</span>
          <span class="bar-t"><i style="width:${l[v]/10*100}%;background:#BF5AF2"></i></span>
          <b>${l[v].toFixed(1)}</b>
        </div>`)}
        <p class="tiny muted">${c||"Average craving (out of 10) on days after each kind of night. Keep logging sleep to see a pattern."}</p>
      </div>
    </section>`}`}var Eo=Xe(()=>import("./c-4W2LP3RN.js"),"FlowGame",()=>t`<div class="lazy-wait" role="status">Loading the puzzle…</div>`),To=300,Mo=["Breathe in","Hold","Breathe out"];function Un({compact:e}){return t`<button class="sos tap ${e?"compact":""}" onClick=${Se}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!e&&t`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${D.chevron()}</span>
  </button>`}function Se(){P(e=>t`<${Fo} close=${e} />`,{tall:!0})}function Fo({close:e}){let s=F(),[n]=g(Date.now()),a=U(250),[o,r]=g("ride"),[i,u]=g("breathe"),[l,d]=g(!0),[p,$]=g(s.quits.map(E=>E.id)),[c,b]=g([]),[h,v]=g([]),[m,y]=g(0),w=(a-n)/1e3,k=Math.max(0,To-Math.floor(w)),f=w%14,q=f<4?0:f<8?1:2,O=oe(q);L(()=>{o==="ride"&&O.current!==q&&(O.current=q,C(q===0?12:6))},[q]);let[_e]=g(()=>{let E=s.quits,_=E.reduce((G,Me)=>G+J(Me,j(Me)),0),ce=[...Vs].sort(()=>Math.random()-.5).slice(0,4),me=s.reasons.map(G=>({k:"Your reason",e:"💙",t:G.text})),de=[{k:"Money saved",e:"💷",t:`${H(_)} so far. This craving wants to take that back.`}];E.forEach(G=>{let Me=j(G)/z,Ut=Nt(Me);de.push({k:`${G.label}-free`,e:G.emoji,t:`${Math.floor(Me)} days in.${Ut.next?` ${Ut.next.label} in ${ye(Ut.next.days-Me)}. Don’t reset the clock for five minutes of nothing.`:""}`})}),ce.forEach(G=>de.push({k:"Try this now",e:G.e,t:G.t}));let Ce=[];for(let G=0;G<Math.max(me.length,de.length);G++)me[G]&&Ce.push(me[G]),de[G]&&Ce.push(de[G]);return Ce}),le=_e[Math.floor(w/9)%_e.length],[I,vt]=g(null);L(()=>{cs("open").then(vt).catch(()=>{})},[]);let gt=E=>{C(15),d(E),y(Math.round(w)),r("log"),E&&cs("beaten").catch(()=>{})},Ue=(E,_,ce)=>{C(),_(E.includes(ce)?E.filter(me=>me!==ce):[...E,ce])},S=()=>{let E=s.cravings.filter(_=>_.beaten).length+(l?1:0);N(_=>_.cravings.push({id:ie(),t:Date.now(),quitIds:p,triggers:c,beaten:l,secs:m})),h.forEach(_=>Ct(_)),e(),T(l?`Craving beaten. That’s ${E} 🛡️`:h.length?"Counter restarted. Go again.":"Logged. Keep going.")};if(o==="log")return t`
      <${M} title=${l?"Craving beaten":"That’s okay"} right=${t`<button class="link b" onClick=${S}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${l?"🛡️":"🤝"}</div>
          <h2>${l?"You rode it out.":"One slip doesn’t undo the work."}</h2>
          <p class="muted">${l?`${m<60?"Under a minute":`${Math.round(m/60)} minute${Math.round(m/60)===1?"":"s"}`} and it passed. Every craving you beat makes the next one weaker.`:"Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern."}</p>
        </div>
        <${A} header="Which craving?">
          <div class="chip-row">${s.quits.map(E=>t`<button class="chip big ${p.includes(E.id)?"on":""}" style="--c:${E.color}" onClick=${()=>Ue(p,$,E.id)}>${E.emoji} ${E.label}</button>`)}</div>
        <//>
        <${A} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${pe.map(E=>t`<button class="chip big ${c.includes(E)?"on":""}" style="--c:#3B9BFF" onClick=${()=>Ue(c,b,E)}>${E}</button>`)}</div>
        <//>
        ${!l&&t`<${A} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${s.quits.filter(E=>p.includes(E.id)).map(E=>t`<div class="row" key=${E.id}>
            <span class="row-ic tint-ic" style="--c:${E.color}">${E.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${E.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${te} on=${h.includes(E.id)} label=${`Restart ${E.label}`} onChange=${()=>Ue(h,v,E.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${S}>Save</button>
      </div>`;let x=Math.floor(k/60),ne=V(k%60);return t`
    <${M} title="Craving SOS" left=${t`<button class="link" onClick=${e}>Close</button>`} />
    <div class="sheet-body sos-body">
      ${i==="game"?t`<${Eo} onExit=${()=>{C(),u("breathe")}} />`:t`
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${Mo[q]}</div>
      </div>
      <div class="sos-timer">${k>0?t`<b>${x}:${ne}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`:t`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      ${I&&t`<p class="sos-pulse">🌍 ${I.now>0?t`<b>${I.now===1?"Someone else is":`${I.now} others are`}</b> riding one out right now. `:""}${I.beaten>0?t`<b>${I.beaten}</b> craving${I.beaten===1?"":"s"} beaten on Novum in the last day. You’re next.`:"You’re not alone in this. Every craving passes."}</p>`}
      <${qa} s=${s} />
      <${Kn} s=${s} picked=${c} onPick=${E=>b(c.includes(E)?c.filter(_=>_!==E):[...c,E])} />
      <div class="card sos-card" key=${le.t}>
        <span class="sos-card-e">${le.e}</span>
        <div><div class="sos-card-k">${le.k}</div><div class="sos-card-t">${le.t}</div></div>
      </div>
      <button class="sos-game" onClick=${()=>{C(),u("game")}}><span>🧩</span><span class="row-main"><b>Play a 2-minute puzzle instead</b><small>Keeping your eyes and mind busy weakens the craving</small></span></button>
      ${s.reasons.length===0&&t`<button class="link sm center-link" onClick=${ze}>Add your reasons for quitting, so they show up here</button>`}`}
      <${xo} />
      <div class="sos-actions">
        <button class="btn btn-primary block big ${k===0?"glow":""}" onClick=${()=>gt(!0)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${()=>gt(!1)}>I gave in</button>
      </div>
    </div>`}function ze(){P(e=>t`<${No} close=${e} />`,{tall:!0})}function No({close:e}){let s=F(),[n,a]=g(""),o=i=>{i=i.trim(),i&&(C(10),N(u=>u.reasons.push({id:ie(),text:i})),a(""))},r=new Set(s.reasons.map(i=>i.text));return t`
    <${M} title="My reasons" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${n} maxlength="140" onInput=${i=>a(i.target.value)} onKeyDown=${i=>i.key==="Enter"&&o(n)} />
        <button class="btn btn-primary sm" disabled=${!n.trim()} onClick=${()=>o(n)}>Add</button>
      </div>
      ${s.reasons.length>0&&t`<${A} header="Your reasons">
        ${s.reasons.map(i=>t`<div class="row" key=${i.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${i.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${()=>N(u=>{u.reasons=u.reasons.filter(l=>l.id!==i.id)})}>${D.trash()}</button>
        </div>`)}
      <//>`}
      <${A} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${Js.filter(i=>!r.has(i)).map(i=>t`<button class="row tap" key=${i} onClick=${()=>o(i)}>
          <span class="row-main"><span class="row-title">${i}</span></span>
          <span class="add-pill">${D.plus()}</span>
        </button>`)}
      <//>
    </div>`}function xo(){let e=Pt(),[s,n]=g(0),[a,o]=g(0),[r,i]=g([]),[u,l]=g(!1),d=oe(0);if(L(()=>{if(!s)return;let $=async()=>{try{let h=(await Ft()).items.filter(v=>v.kind==="cheer"&&v.at>=s-2e3).reverse();h.length>d.current&&C([12,40,12]),d.current=h.length,i(h)}catch{}};$();let c=setInterval($,6e3);return()=>clearInterval(c)},[s]),!e.loaded||!e.buddies.length)return null;let p=async()=>{if(!u){l(!0),C(12);try{let $=await Na();o($.sent),n($.at||Date.now())}catch($){T($.message)}l(!1)}};return s?t`<div class="card sos-cheers">
    <div class="sos-cheers-h">💙 Sent to ${a} bud${a===1?"dy":"dies"}. ${r.length?"They’re with you:":"Their cheers will pop up here."}</div>
    ${r.map($=>{let c=xe.find(b=>b.kind===$.data.kind)||xe[0];return t`<div class="sos-cheer" key=${$.id}><${ve} a=${$.who.avatar} name=${$.who.firstName} size=${30} /><span><b>${$.who.firstName}</b> ${c.e} ${c.l.toLowerCase()}</span></div>`})}
  </div>`:t`<button class="sos-ask" disabled=${u} onClick=${p}>
    <span>🤝</span><span class="row-main"><b>${u?"Asking…":"Ask my buddies for support"}</b><small>They’ll get a notification and can cheer you on</small></span>
  </button>`}function ht(){P(e=>t`<${Bo} close=${e} />`,{tall:!0})}function Bo({close:e}){let s=F(),n=new Set(s.quits.map(v=>v.kind)),a=Fe.filter(v=>!n.has(v.kind)),[o,r]=g(null),[i,u]=g(""),[l,d]=g(Ve(new Date)),[p,$]=g(""),c=o?Hs(o):null,b=o&&l&&(o!=="other"||i.trim()),h=()=>{C(15),N(v=>v.quits.push({id:o,kind:o,label:o==="other"?i.trim():c.label,emoji:c.emoji,color:c.color,start:l,monthly:parseFloat(p)||0,best:0,resets:[]})),e(),T(`${o==="other"?i.trim():c.label} added`)};return t`
    <${M} title="Add something to quit" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!b} onClick=${h}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${a.map(v=>t`<button class="pick ${o===v.kind?"on":""}" style="--c:${v.color}" onClick=${()=>{C(),r(v.kind)}}>
          <span class="pick-e">${v.emoji}</span><span class="pick-l">${v.label}</span><span class="pick-tick">${D.check()}</span></button>`)}
      </div>
      ${o&&t`
        <${A} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${o==="other"&&t`<${Y} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${i} onInput=${v=>u(v.target.value)} /><//>`}
          <${Y} label="Quit at"><input type="datetime-local" value=${l} onInput=${v=>d(v.target.value)} /><//>
          <${Y} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${p} onInput=${v=>$(v.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!b} onClick=${h}>Add</button>`}
    </div>`}function mt(e){P(s=>t`<${Io} id=${e} close=${s} />`,{tall:!0})}function Io({id:e,close:s}){let a=F().quits.find(y=>y.id===e),[o,r]=g(a?.start||""),[i,u]=g(String(a?.monthly??0)),[l,d]=g(String(a?Be(a):20));if(!a)return t`<${M} title="Removed" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let p=Ve(X(new Date,60)),$=o&&!Number.isNaN(Qe(o).getTime())&&o<=p&&parseFloat(i)>=0,c=()=>{$&&(C(12),N(y=>{let w=y.quits.find(f=>f.id===e);w.start=o,w.monthly=parseFloat(i);let k=parseFloat(l);Number.isFinite(k)&&k>=0&&(w.minutes=Math.min(1440,k))}),s())},b=j(a),h=Math.max(a.best||0,b),v=()=>se({title:`Remove ${a.label}`,danger:!0,text:`This removes the ${a.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,confirm:"Remove",onConfirm:()=>{s(),N(y=>{y.quits=y.quits.filter(w=>w.id!==e)}),T(`${a.label} removed`)}}),m=parseFloat(i)||0;return t`
    <${M} title=${`${a.emoji} ${a.label}`} left=${t`<button class="link" onClick=${s}>Cancel</button>`} right=${t`<button class="link b" disabled=${!$} onClick=${c}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${Y} label="Quit at"><input type="datetime-local" value=${o} max=${p} onInput=${y=>r(y.target.value)} /><//>
      <//>
      <${A} header="What it cost you" footer=${`About ${H(m*12/52)} a week, or ${H(m*12,0)} a year. If it varied, use a middle figure.`}>
        <${Y} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${i} onInput=${y=>u(y.target.value)} /><//>
      <//>
      <${A} header="Time it took" footer=${`Minutes a day, roughly: buying, using, recovering.${Jt[a.kind]?` Usually ${Jt[a.kind]} minutes for ${a.kind==="weed"?"cannabis":"nicotine"}.`:""} Used for “time reclaimed” on Home.`}>
        <${Y} label="Per day (min)"><input type="number" inputmode="numeric" min="0" max="1440" value=${l} onInput=${y=>d(y.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(b/z)}</b><span>days now</span></div>
        <div><b>${Math.floor(h/z)}</b><span>best run</span></div>
        <div><b>${(a.resets||[]).length}</b><span>restarts</span></div>
      </div>
      ${ue(a)&&t`<button class="btn btn-plain block" onClick=${()=>bt(e)}>See the health timeline</button>`}
      ${(a.resets||[]).length>0&&a.monthly>0&&t`<p class="muted center tiny">Saved overall, slips included: <b>${H(la(a),0)}</b></p>`}
      ${b>0&&t`<button class="btn btn-tinted block" onClick=${()=>Lt(It([a],b/z,J(a,b)))}>Share my streak</button>`}
      ${b>0&&t`<button class="btn btn-plain block" onClick=${()=>{s(),setTimeout(()=>Os(e),350)}}>I slipped</button>`}
      <button class="btn btn-plain danger block" onClick=${v}>Remove from Novum</button>
    </div>`}function bt(e){P(s=>t`<${Lo} initial=${e} close=${s} />`,{tall:!0})}function Lo({initial:e,close:s}){let a=F().quits.filter(p=>ue(p)),[o,r]=g(e),i=a.find(p=>p.id===o)||a[0];if(!i)return t`<${M} title="Recovery timeline" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let u=j(i)/36e5,l=ue(i)||[],d=p=>p===0?"Before you start":p<1?`${Math.round(p*60)} minutes`:p<48?`${p} hours`:p<336?`${Math.round(p/24)} days`:p<1440?`${Math.round(p/168)} weeks`:p<8760?`${Math.round(p/730)} months`:"1 year";return t`
    <${M} title="Recovery timeline" right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      ${a.length>1&&t`<div class="pad-b"><${K} small=${a.length>3} options=${a.map(p=>({value:p.id,label:`${p.emoji} ${p.label}`}))} value=${i.id} onChange=${r} /></div>`}
      <ol class="timeline" style="--c:${i.color}">
        ${l.map(p=>{let $=u>=p.h;return t`<li class=${$?"done":""}>
            <span class="tl-dot">${$?D.check():""}</span>
            <div class="tl-when">${d(p.h)} · ${p.area}${$?"":t` <em>in ${ye((p.h-u)/24)}</em>`}</div>
            <div class="tl-title">${p.title}</div>
            <div class="tl-text">${p.text}</div>
          </li>`})}
      </ol>
      <p class="disclaimer">${Gs}</p>
    </div>`}function Os(e){P(s=>t`<${Po} id=${e} close=${s} />`,{tall:!0})}function Po({id:e,close:s}){let n=F(),a=n.quits.filter(I=>ee(I)<=new Date),[o,r]=g(e&&a.some(I=>I.id===e)?e:a[0]?.id),[i,u]=g("now"),[l,d]=g(Ve(new Date)),[p,$]=g([]),[c,b]=g(""),[h,v]=g(null),m=n.quits.find(I=>I.id===o);if(!m)return t`<${M} title="Slipped up" right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body"><p class="muted center sheet-intro">There’s no running counter to reset yet.</p></div>`;if(h)return t`
    <${M} right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body slip-done">
      <div class="wiz-emoji">🌱</div>
      <h2 class="auth-title center">Fresh start</h2>
      <p class="wiz-sub center">Your ${m.label.toLowerCase()} counter starts again now. That’s all a slip is: a restart, not a reset of you.</p>
      <div class="stats3">
        <div><b>${Math.floor(h.best/z)}</b><span>best run (days)</span></div>
        <div><b>${H(h.life,0)}</b><span>saved overall</span></div>
        <div><b>1 day</b><span>next milestone</span></div>
      </div>
      <button class="btn btn-primary block big" onClick=${()=>{s(),setTimeout(Se,300)}}>Breathe for a minute</button>
      <button class="btn btn-plain block big" onClick=${s}>I’m okay</button>
    </div>`;let y=i==="now"?new Date:Qe(l),w=i==="now"||!Number.isNaN(y.getTime())&&y<=new Date&&y>=ee(m),k=Math.max(0,(w?y:new Date)-ee(m)),f=Math.max(m.best||0,k),q=ra(m)-j(m),O=J(m,q+k),_e=I=>{C(6),$(p.includes(I)?p.filter(vt=>vt!==I):[...p,I])},le=()=>{w&&(Ct(m.id,{at:y,triggers:p,note:c.trim()}),C(15),v({best:f,life:O}))};return t`
    <${M} title="Slipped up" left=${t`<button class="link" onClick=${s}>Cancel</button>`} />
    <div class="sheet-body">
      <div class="slip-hero">
        <div class="wiz-emoji">🤍</div>
        <h2 class="auth-title center">A slip isn’t starting over</h2>
        <p class="wiz-sub center">Most people who quit for good had a few goes first. What matters is the next hour, not the last one.</p>
      </div>
      ${a.length>1&&t`<${A} header="Which one">
        <div class="pad"><${K} options=${a.map(I=>({value:I.id,label:`${I.emoji} ${I.label}`}))} value=${o} onChange=${r} /></div>
      <//>`}
      <${A} header="When" footer=${w?"":t`<span class="err">Pick a time after your quit date and not in the future.</span>`}>
        <div class="pad"><${K} options=${[{value:"now",label:"Just now"},{value:"earlier",label:"Earlier"}]} value=${i} onChange=${u} /></div>
        ${i==="earlier"&&t`<${Y} label="At"><input type="datetime-local" value=${l} max=${Ve(new Date)} onInput=${I=>d(I.target.value)} /><//>`}
      <//>
      <${A} header="What set it off?" footer="Optional. Spotting patterns is how next time goes differently. They show up in Progress.">
        <div class="chip-row">${pe.map(I=>t`<button class="chip big ${p.includes(I)?"on":""}" aria-pressed=${p.includes(I)} onClick=${()=>_e(I)}>${I}</button>`)}</div>
      <//>
      <${A} header="Anything else?">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="280" placeholder="What happened, how you felt, what might help next time…" value=${c} onInput=${I=>b(I.target.value)}></textarea></div>
      <//>
      <div class="card pad slip-keep">
        <div><span>🏅</span><span>Your best run of <b>${Math.floor(f/z)} day${Math.floor(f/z)===1?"":"s"}</b> stays on record.</span></div>
        ${m.monthly>0&&t`<div><span>💷</span><span>You’ve still saved <b>${H(O,0)}</b> overall. That doesn’t go anywhere.</span></div>`}
      </div>
      <button class="btn btn-primary block big" disabled=${!w} onClick=${le}>Restart my counter</button>
    </div>`}var qo=fe(()=>import("./c-AIXELOWF.js"),"openAdmin"),Oo=fe(()=>import("./c-HLCGWNZG.js"),"openPrivacy"),Ro=fe(()=>import("./c-WQV37POD.js"),"openCredits");function jo(){let[e,s]=g(Sn());L(()=>Cn(s),[]),U(3e4);let a={syncing:"Saving…",synced:`Saved to your account ${(r=>{let i=Math.round((Date.now()-r)/6e4);return i<1?"just now":i<60?`${i} min ago`:`${Math.round(i/60)} hr ago`})(e.at)}`,offline:"Offline. Changes save when you’re back online",error:e.error||"Couldn’t save. Tap to retry",idle:"Waiting to save"}[e.state],o={syncing:"🔄",synced:"☁️",offline:"📴",error:"⚠️",idle:"☁️"}[e.state];return t`<${B} icon=${o} iconBg=${e.state==="error"?"#FF453A":"#3B9BFF"} title="Account sync" sub=${a} onClick=${()=>{C(),ae()}} />`}function Qn(){let[e,s]=g(F());return L(()=>Ie(n=>s(n)),[]),e}var Wo=(e,s)=>`${e} ${s}${e===1?"":"s"}`;function Yo({s:e}){let s=U(6e4),n=e.quits.filter(i=>ee(i).getTime()<=s),a=n.length?Math.max(...n.map(i=>Math.floor(j(i,s)/864e5))):0,o=Kt(e,s),r=ca(e);return t`<div class="pstats">
    <div><b>${a}</b><span>${a===1?"day free":"days free"}</span></div>
    <div><b>${H(o,0)}</b><span>saved</span></div>
    <div><b>${r}</b><span>check-in streak</span></div>
  </div>`}function Vn({s:e}){let[s,n]=g(0),a=async()=>{await Promise.all([Promise.resolve(ae()).catch(()=>{}),Mt().catch(()=>{}),je(),he()]),n(m=>m+1)},o=e.profile,r=Z()?.user||{},i=ge(o),u=At(i,o.heightCm),l=es(u),d=e.quits.filter(m=>ue(m)),p=Pt(),$=U(6e4),c=st(),b=Ee(),h=[...new Set(b.items.filter(m=>m.kind==="cheer"&&m.data?.kind==="water"&&$-m.at<7*864e5).map(m=>m.who.firstName))],v=t`<button class="icon-btn gear-btn" aria-label="Account settings" onClick=${Zo}>${D.gear()}</button>`;return t`<${$e} title="Profile" titleRight=${v} onRefresh=${a}>
    <${pn} key=${s} s=${e} />
    ${e.quits.length>0&&t`<${Yo} s=${e} />`}
    <section class="group"><${cn} s=${e} waterers=${h} /></section>
    <section class="group"><${ln} earned=${on(e,$)} mine s=${e} /></section>

    <${A} header="Your quits">
      ${e.quits.map(m=>{let y=ee(m).getTime(),w=Math.floor(($-y)/864e5);return t`<${B} key=${m.id} icon=${m.emoji} iconBg=${m.color} title=${m.label}
          detail=${y>$?"Quit day soon":Wo(w,"day")} chevron onClick=${()=>mt(m.id)} />`})}
      ${e.quits.length<Fe.length&&t`<${B} icon=${D.plus()} iconBg="#3B9BFF" title="Add something to quit" chevron onClick=${ht} />`}
    <//>

    <${A} header="Staying quit">
      <${B} icon="💙" iconBg="#3B9BFF" title="My reasons" detail=${e.reasons.length||"Add"} chevron onClick=${ze} />
      <${B} icon="💌" iconBg="#FF375F" title="Letters to future you" detail=${(e.letters||[]).length||"Write one"} chevron onClick=${tt} />
      <${B} icon="🧭" iconBg="#5E5CE6" title="Plan ahead" detail=${Object.keys(e.plans||{}).length+(e.events||[]).filter(m=>!m.outcome&&m.date>=R()).length||"Add"} chevron onClick=${we} />
      ${e.quits.some(m=>m.monthly>0)&&t`<${B} icon="🎁" iconBg="#FFD60A" title="Saving for" detail=${e.wishlist.length||"Add"} chevron onClick=${Rs} />`}
    <//>

    <${A} header="Health">
      ${d.length>0&&t`<${B} icon="🫁" iconBg="#5AC8FA" title="Recovery timeline" chevron onClick=${()=>bt(d[0].id)} />`}
      <${B} icon="⚖️" iconBg="#FF375F" title="Body" chevron onClick=${Ho}
        detail=${t`<span class="body-detail">${i?`${i.toFixed(1)} kg`:"Add weight"}${u&&t`<span class="pill sm ${l.tone}">BMI ${u.toFixed(1)}</span>`}</span>`} />
    <//>

    <${A} header="Friends">
      <${B} icon="🤝" iconBg="#FF9F0A" title="Buddies" detail=${p.loaded?p.incoming.length?`${p.incoming.length} new`:p.buddies.length||"Add":""} chevron onClick=${gn} />
      <${B} icon="👥" iconBg="#5E5CE6" title="Find people" chevron onClick=${()=>$n("discover")} />
    <//>


    <${A} header="Settings">
      <${B} icon="🔔" iconBg="#FF453A" title="Notifications" detail=${$s()?c.enabled?"On":"Off":"Not set up"} chevron onClick=${Ko} />
      <${B} icon="🔒" iconBg="#8E8E93" title="Your data & privacy" chevron onClick=${_o} />
      <${B} icon="🧭" iconBg="#5AC8FA" title="Show the tour again" chevron onClick=${jn} />
      ${r.isAdmin&&t`<${B} icon="🛠️" iconBg="#636366" title="Admin" chevron onClick=${qo} />`}
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>${yt}</span>
      <span class="tiny">Version 2.0</span>
    </div>
  <//>`}function Ho(){P(e=>t`<${Go} close=${e} />`,{tall:!0})}function Go({close:e}){let n=Qn().profile,a=ge(n),o=At(a,n.heightCm),r=es(o),i=Xt(n),u=o?Math.max(0,Math.min(100,(o-15)/20*100)):0;return t`
    <${M} title="Body" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${A}>
        <${B} icon="🎂" iconBg="#BF5AF2" title="Age and height" detail=${`${i??"–"} · ${n.heightCm?`${n.heightCm} cm`:"–"}`} chevron onClick=${Vo} />
        <${B} icon="⚖️" iconBg="#FF375F" title="Weight" detail=${a?`${a.toFixed(1)} kg`:"Add"} chevron onClick=${$t} />
      <//>
      <${A} footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
        <div class="bmi">
          <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${o?o.toFixed(1):"–"}</div></div><span class="pill ${r.tone}">${r.label}</span></div>
          <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${o&&t`<b style="left:${u}%"></b>`}</div>
          <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
        </div>
      <//>
    </div>`}function Ko(){P(e=>t`<${zo} close=${e} />`,{tall:!0})}function zo({close:e}){let s=Qn();return t`
    <${M} title="Notifications" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body"><${ui} s=${s} header=${null} /></div>`}function _o(){P(e=>t`<${Uo} close=${e} />`,{tall:!0})}function Uo({close:e}){let s=oe(),n=async a=>{let o=a.target.files[0];if(a.target.value="",!o)return;let r=await o.text(),i="";try{let u=JSON.parse(r);i=u.exportedAt?` from ${Q(new Date(u.exportedAt))}`:""}catch{T("That file isn’t valid JSON");return}se({title:"Restore backup",text:`Replace everything in your account with the backup${i}? Your current data will be overwritten on every device.`,confirm:"Restore backup",onConfirm:()=>{try{ia(r),T("Backup restored")}catch(u){T(u.message)}}})};return t`
    <${M} title="Your data & privacy" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${A} footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
        <${jo} />
        <${B} icon="🔒" iconBg="#8E8E93" title="Privacy notice" sub="What’s stored, who can see it, your rights" chevron onClick=${Oo} />
        <${B} icon="🙏" iconBg="#5E5CE6" title="Credits & licences" sub="The artists and code Novum is built with" chevron onClick=${Ro} />
      <//>
      <${A} header="Backups">
        <${B} icon=${D.share()} iconBg="#3B9BFF" title="Export a copy" sub="Everything: account, profile, check-ins, goals" chevron onClick=${Qo} />
        <${B} icon=${D.download()} iconBg="#30D158" title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${()=>s.current.click()} />
        <input type="file" accept="application/json,.json" ref=${s} onChange=${n} hidden />
      <//>
      <${A} footer="Clears every counter, check-in, goal and note and takes you back to Day Zero. Your login stays the same.">
        <${B} icon="↺" iconBg="#FF453A" title="Start over" danger onClick=${()=>se({title:"Start over",text:"This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.",confirm:"Clear and start over",onConfirm:()=>{as(),Le(ta()),T("Fresh start")}})} />
      <//>
    </div>`}async function Qo(){let e=Z()?.user||{},s=oa({firstName:e.firstName,lastName:e.lastName,username:e.username,email:e.email,dob:e.dob,memberSince:e.createdAt?new Date(e.createdAt).toISOString():""}),n=`novum-backup-${R()}.json`,a=new File([s],n,{type:"application/json"});try{if(navigator.canShare&&navigator.canShare({files:[a]})){await navigator.share({files:[a],title:"Novum backup"});return}}catch(r){if(r.name==="AbortError")return}let o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=n,document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(o.href),o.remove()},1e3),T("Backup saved")}function Vo(){P(e=>t`<${Jo} close=${e} />`)}function Jo({close:e}){let s=F().profile,[n,a]=g(s.dob||""),[o,r]=g(s.heightCm?String(s.heightCm):""),i=/^\d{4}-\d{2}-\d{2}$/.test(n)&&Ae(n)<new Date,u=i&&+o>=100&&+o<=250,l=async()=>{if(n!==s.dob)try{await qe({dob:n})}catch(d){T(d.message);return}N(d=>{d.profile.dob=n,d.profile.heightCm=Math.round(+o)}),C(12),e()};return t`
    <${M} title="Age and height" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!u} onClick=${l}>Save</button>`} />
    <div class="sheet-body">
      <${A} footer=${i?`${Xt({dob:n})} years old`:""}>
        <${Y} label="Date of birth"><input type="date" max=${R()} value=${n} onInput=${d=>a(d.target.value)} /><//>
        <${Y} label="Height (cm)"><input type="number" inputmode="decimal" value=${o} onInput=${d=>r(d.target.value)} /><//>
      <//>
    </div>`}function Zo(){P(e=>t`<${Xo} close=${e} />`,{tall:!0})}function Xo({close:e}){let s=Z()?.user||{},[n,a]=g({firstName:s.firstName||"",lastName:s.lastName||"",username:s.username||""}),[o,r]=g(null),[i,u]=g(!1),l=Object.keys(n).some(c=>n[c].trim()!==(s[c]||"")),d=c=>b=>a({...n,[c]:b.target.value}),p=async()=>{u(!0),r(null);let c=Object.fromEntries(Object.keys(n).filter(b=>n[b].trim()!==(s[b]||"")).map(b=>[b,n[b].trim()]));try{await qe(c),C(15),T("Account updated"),r(null)}catch(b){r({err:b.message})}u(!1)},$=()=>se({title:"Log out",danger:!1,confirm:"Log out",text:"Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.",onConfirm:async()=>{e(),await ei()}});return t`
    <${M} title="Account" left=${t`<button class="link" onClick=${e}>Close</button>`} right=${t`<button class="link b" disabled=${!l||i} onClick=${p}>${i?"Saving…":"Save"}</button>`} />
    <div class="sheet-body">
      <${A} header="Your details" footer=${o?.err?t`<span class="err">${o.err}</span>`:`Member since ${s.createdAt?Q(new Date(s.createdAt)):"–"}`}>
        <${Y} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${n.firstName} onInput=${c=>a({...n,firstName:ss(c.target.value)})} /><//>
        <${Y} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${n.lastName} onInput=${c=>a({...n,lastName:ss(c.target.value)})} /><//>
        <${Y} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${n.username} onInput=${d("username")} /><//>
        <${B} title="Email" detail=${s.email} chevron onClick=${ti} />
      <//>
      <${A}>
        <${B} icon="🔑" iconBg="#8E8E93" title="Change password" chevron onClick=${ai} />
        <${B} icon="📱" iconBg="#30D158" title="Logged-in devices" chevron onClick=${ci} />
        <${B} icon="↪" iconBg="#3B9BFF" title="Log out" chevron onClick=${$} />
      <//>
      <${A} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${B} icon=${D.trash()} iconBg="#FF453A" title="Delete account" danger onClick=${oi} />
      <//>
    </div>`}async function ei(){let e=Z()?.user?.id;try{await En()}catch{}try{await Bt()}catch{}at(),Ye(),await ka(),Je({wipe:!0}),e&&Cs(e)}function ti(){P(e=>t`<${si} close=${e} />`)}function si({close:e}){let[s,n]=g(""),[a,o]=g("email"),[r,i]=g(""),[u,l]=g(0),[d,p]=g(""),[$,c]=g(!1),b=s.trim().toLowerCase(),h=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b)&&b!==(Z()?.user?.email||"").toLowerCase(),v=async w=>{await qe({email:b,emailToken:w}),C(20),T("Email updated"),e()},m=async()=>{c(!0),p("");try{(await fa(b,Z()?.user?.firstName)).skipped?await v():(l(Date.now()),o("code"))}catch(w){p(w.message)}c(!1)},y=async(w=r)=>{if(!($||w.length!==6)){c(!0),p("");try{let k=await ya(b,w);await v(k.emailToken)}catch(k){p(k.message),i(""),c(!1)}}};return t`
    <${M} title="Change email" left=${t`<button class="link" onClick=${e}>Cancel</button>`} />
    <div class="sheet-body">
      ${a==="email"?t`
        <${A} footer=${d?t`<span class="err">${d}</span>`:"We’ll send a code to the new address to confirm it’s yours."}>
          <${Y} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${s} onInput=${w=>{p(""),n(w.target.value)}} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!h||$} onClick=${m}>${$?"Sending…":"Send code"}</button>`:t`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${b}</b>.</p>
        <${hs} value=${r} onChange=${w=>{p(""),i(w)}} onComplete=${y} />
        ${d&&t`<p class="wiz-err">${d}</p>`}
        <button class="btn btn-primary block" disabled=${r.length!==6||$} onClick=${()=>y()}>${$?"Confirming…":"Confirm"}</button>
        <${ms} sentAt=${u} onResend=${m} />`}
    </div>`}function ai(){P(e=>t`<${ni} close=${e} />`)}function ni({close:e}){let[s,n]=g(""),[a,o]=g(""),[r,i]=g(""),[u,l]=g(!1),d=s&&a.length>=8,p=async()=>{l(!0),i("");try{await wa(s,a),C(15),T("Password changed"),e()}catch($){i($.message)}l(!1)};return t`
    <${M} title="Change password" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" disabled=${!d||u} onClick=${p}>Save</button>`} />
    <div class="sheet-body">
      <${A} footer=${r?t`<span class="err">${r}</span>`:"At least 8 characters. You’ll stay logged in here; other devices are logged out."}>
        <${Y} label="Current"><input type="password" autocomplete="current-password" value=${s} onInput=${$=>n($.target.value)} /><//>
        <${Y} label="New"><input type="password" autocomplete="new-password" value=${a} onInput=${$=>o($.target.value)} /><//>
      <//>
    </div>`}function oi(){P(e=>t`<${ii} close=${e} />`)}function ii({close:e}){let[s,n]=g(""),[a,o]=g(!1),[r,i]=g(""),[u,l]=g(!1),[d,p]=g(null),[$,c]=g(""),[b,h]=g(0),v=oe();L(()=>{d&&setTimeout(()=>v.current?.focus({preventScroll:!0}),350)},[d]);let m=async()=>{let k=Z()?.user?.id;at(),Ye(),as(),va(null),Je({wipe:!0}),k&&(Cs(k),Ca(k,null));try{localStorage.removeItem(`novum.push:${k}`)}catch{}history.replaceState(null,"",location.pathname),window.scrollTo(0,0),T("Account deleted")},y=async(k=$)=>{if(!u){l(!0),i("");try{try{await Bt()}catch{}await Sa(s,k),C(20),await m()}catch(f){l(!1),c(""),i(f.message),f.data?.needsCode&&p(d||{emailHint:"your email"})}}},w=async()=>{if(!(u||!s)){l(!0),i("");try{let k=await os(s);if(k.skipped)return l(!1),y("");p({emailHint:k.emailHint}),h(Date.now()),c("")}catch(k){i(k.message)}l(!1)}};return t`
    <${M} title="Delete account" left=${t`<button class="link" onClick=${d?()=>{p(null),i(""),c("")}:e}>${d?"Back":"Cancel"}</button>`} />
    <div class="sheet-body">
      ${d?t`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${d.emailHint}</b>. Enter it to delete your account for good.</p>
          <${Ua} email=${d.emailHint} />
          <${hs} inputRef=${v} value=${$} onChange=${k=>{i(""),c(k)}} />
          <${ms} sentAt=${b} onResend=${async()=>{try{await os(s),h(Date.now()),c(""),T("New code sent")}catch(k){i(k.message)}}} />
          ${r&&t`<p class="auth-err center">${r}</p>`}
          <button class="btn btn-danger block" disabled=${$.length!==6||u} onClick=${()=>y()}>${u?"Deleting…":"Delete my account"}</button>
        </div>`:t`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${A} header="Step 1 of 2 · Your password" footer=${r?t`<span class="err">${r}</span>`:"Then we’ll email you a code to make sure it’s really you."}>
          <${Y} label="Password"><div class="tf-row"><input type=${a?"text":"password"} autocomplete="current-password" value=${s}
            onInput=${k=>{i(""),n(k.target.value)}} onKeyDown=${k=>k.key==="Enter"&&w()} />
            <${_a} on=${a} set=${o} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!s||u} onClick=${w}>${u?"Checking…":"Continue"}</button>`}
    </div>`}function $t(){P(e=>t`<${ri} close=${e} />`,{tall:!0})}function ri({close:e}){let s=F(),[n,a]=g(""),[o,r]=g(R()),i=[...s.profile.weights].sort((l,d)=>d.date.localeCompare(l.date)),u=()=>{let l=parseFloat(n);l>20&&l<400&&(C(12),N(d=>{d.profile.weights=d.profile.weights.filter(p=>p.date!==o),d.profile.weights.push({date:o,kg:l})}),a(""),T("Weight logged"))};return t`
    <${M} title="Weight" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <${A}>
        <${Y} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${ge(s.profile)?.toFixed(1)??"70.0"} value=${n}
          onInput=${l=>a(l.target.value)} onKeyDown=${l=>l.key==="Enter"&&u()} /><//>
        <${Y} label="Date"><input type="date" value=${o} max=${R()} onInput=${l=>r(l.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(n)>20)} onClick=${u}>Log weight</button>
      <${A} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${i.map(l=>t`<div class="row" key=${l.date}>
          <span class="row-main"><span class="row-title">${l.kg.toFixed(1)} kg</span><span class="row-sub">${Q(l.date)}</span></span>
          <span class="row-detail">BMI ${At(l.kg,s.profile.heightCm).toFixed(1)}</span>
          ${i.length>1&&t`<button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>N(d=>{d.profile.weights=d.profile.weights.filter(p=>p.date!==l.date)})}>${D.trash()}</button>`}
        </div>`)}
      <//>
    </div>`}var li=e=>{let s=Math.floor((Date.now()-e)/6e4);if(s<2)return"active now";if(s<60)return`${s} min ago`;let n=Math.floor(s/60);if(n<24)return`${n} hr${n===1?"":"s"} ago`;let a=Math.floor(n/24);return`${a} day${a===1?"":"s"} ago`};function ci(){P(e=>t`<${di} close=${e} />`,{tall:!0})}function di({close:e}){let[s,n]=g(null),[a,o]=g(""),r=async()=>{o("");try{n(await Aa())}catch(d){o(d.message)}};L(()=>{r()},[]);let i=async d=>{C();try{await Da(d.id),T(`Logged out of ${d.device}`),r()}catch(p){T(p.message)}},u=()=>se({title:"Log out other devices",confirm:"Log out others",text:"Every other phone or computer is logged out and will need your password (and an email code) to get back in. This one stays logged in.",onConfirm:async()=>{try{await Ea(),T("Other devices logged out"),r()}catch(d){T(d.message)}}}),l=s?s.sessions.filter(d=>!d.current).length:0;return t`
    <${M} title="Logged-in devices" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      ${a&&t`<p class="auth-err center">${a}</p>`}
      ${!s&&!a&&t`<${Tt} rows=${2} avatar />`}
      ${s&&t`<${A} footer=${s.trusted?`${s.trusted} device${s.trusted===1?" is":"s are"} remembered, so ${s.trusted===1?"it skips":"they skip"} the login code for 30 days.`:"If you don’t recognise a device, log it out and change your password."}>
        ${s.sessions.map(d=>t`<div class="row" key=${d.id}>
          <span class="row-ic" style="background:${d.current?"#30D158":"var(--fill-2)"}">${/iPhone|Android|iPad/.test(d.device)?"📱":"💻"}</span>
          <span class="row-main"><span class="row-title">${d.device}</span>
            <span class="row-sub">${d.current?"This device":`Last active ${li(d.lastSeen)}`} · since ${Q(new Date(d.createdAt),{day:"numeric",month:"short"})}</span></span>
          ${!d.current&&t`<button class="link sm danger" onClick=${()=>i(d)}>Log out</button>`}
        </div>`)}
      <//>
      ${l>0&&t`<button class="btn btn-plain danger block" onClick=${u}>Log out all other devices</button>`}`}
    </div>`}function ui({s:e,header:s="Notifications"}){let n=e.notifyPrefs,[a,o]=g(st()),[r,i]=g(!1),[u,l]=g(""),d=h=>N(v=>{v.notifyPrefs={...v.notifyPrefs,...h}}),p=$s(),[,$]=g(0);L(()=>{let h=()=>{document.visibilityState==="visible"&&(o(st()),$(v=>v+1))};return document.addEventListener("visibilitychange",h),()=>document.removeEventListener("visibilitychange",h)},[]);let c=async h=>{if(!r){l(""),i(!0);try{h?(await Ga(),T("Notifications on 🔔")):(await Bt(),T("Notifications off"))}catch(v){l(v.message)}o(st()),i(!1)}},b;return p?ja()&&!Ra()?b="On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.":Oa()?Wa()==="denied"&&!a.enabled?b=Ya("denied"):b="On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times, habit ticks and the dates of tough days you plan for to time these.":b="This browser doesn’t support push notifications.":b="Notifications aren’t set up on the server yet.",t`<${A} header=${s} footer=${u?t`<span class="err">${u}</span>`:b}>
    <div class="row">
      <span class="row-ic" style="background:#FF453A">🔔</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${r&&t`<span class="row-sub">Working…</span>`}</span>
      ${p?t`<${te} on=${a.enabled} label="Notifications" onChange=${c} />`:t`<span class="row-detail">Not set up</span>`}
    </div>
    ${Va()&&t`<${B} icon="📲" iconBg="#3B9BFF" title=${Qa().kind==="inapp"?"Open Novum in Safari":"Add to Home Screen"} sub="Needed for notifications. Shows you how" chevron onClick=${Ja} />`}
    ${a.enabled&&p&&t`
      <div class="row">
        <span class="row-ic" style="background:#FFD60A">🏅</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${te} on=${n.milestones} label="Milestones" onChange=${h=>d({milestones:h})} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#30D158">✍️</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin&&t`<input type="time" class="time-in" value=${n.checkinAt} onChange=${h=>h.target.value&&d({checkinAt:h.target.value})} />`}
        <${te} on=${n.checkin} label="Check-in reminder" onChange=${h=>d({checkin:h})} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#BF5AF2">🎯</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits&&t`<input type="time" class="time-in" value=${n.habitsAt} onChange=${h=>h.target.value&&d({habitsAt:h.target.value})} />`}
        <${te} on=${n.habits} label="Habit nudges" onChange=${h=>d({habits:h})} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#5AC8FA">📊</span>
        <span class="row-main"><span class="row-title">Weekly recap</span><span class="row-sub">Sundays: check-ins, cravings and money saved</span></span>
        ${n.recap&&t`<input type="time" class="time-in" value=${n.recapAt} onChange=${h=>h.target.value&&d({recapAt:h.target.value})} />`}
        <${te} on=${n.recap} label="Weekly recap" onChange=${h=>d({recap:h})} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#FF9F0A">🤝</span>
        <span class="row-main"><span class="row-title">Buddies and followers</span><span class="row-sub">Requests, new followers and cheers</span></span>
        <${te} on=${n.buddies} label="Buddy notifications" onChange=${h=>d({buddies:h})} />
      </div>
      <div class="row">
        <span class="row-ic" style="background:#BF5AF2">🔮</span>
        <span class="row-main"><span class="row-title">Heads-up before tough times</span><span class="row-sub">Learns when cravings usually hit and nudges you 20 minutes before</span></span>
        <${te} on=${n.nudges!==!1} label="Heads-up before tough times" onChange=${h=>d({nudges:h})} />
      </div>`}
  <//>`}function Jn({s:e}){let[s,n]=g("active"),o=e.goals.map(i=>({g:i,p:De(i,e)})).filter(({p:i})=>s==="done"?i.pct>=1:s==="active"?i.pct<1:!0),r=t`<button class="icon-btn accent" onClick=${()=>zt()} aria-label="New goal">${D.plus()}</button>`;return t`<${$e} title="Goals" right=${r}>
    <button class="card ny-mini tap" onClick=${Ke}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${D.chevron()}</span>
    </button>

    ${e.goals.length===0?t`<${ba} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${t`<div class="empty-actions"><button class="btn btn-primary" onClick=${Ke}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${()=>zt()}>Create your own</button></div>`} />`:t`
      <div class="pad-x mb12"><${K} options=${[{value:"active",label:"Active"},{value:"done",label:"Complete"},{value:"all",label:"All"}]} value=${s} onChange=${n} /></div>
      ${o.length===0&&t`<p class="muted center pad">${s==="done"?"Nothing complete yet. You’ll get there.":"Everything’s complete. Time for a new goal?"}</p>`}
      ${Ne.map(i=>{let u=o.filter(({g:l})=>l.category===i.id);return u.length?t`<${A} key=${i.id} header=${i.label}>
          ${u.map(({g:l,p:d})=>t`<${pi} key=${l.id} g=${l} p=${d} />`)}
        <//>`:null})}`}
  <//>`}function pi({g:e,p:s}){let n=(e.ticks||[]).includes(R());return t`<div class="row tap goal-row" role="button" tabindex="0" onClick=${()=>Zn(e.id)}>
    <${Ze} pct=${s.pct} size=${46} stroke=${5} color=${e.color}><span class="ring-emoji">${e.emoji}</span><//>
    <span class="row-main">
      <span class="row-title">${e.name}</span>
      <span class="row-sub">${ts(e)?`Counts from ${Q(Dt(e).start,{day:"numeric",month:"short"})}`:s.label} · ${ps(e)}</span>
    </span>
    ${e.type==="habit"?t`<button class="tick ${n?"on":""}" style="--c:${e.color}" aria-pressed=${n} aria-label="Done today"
          onClick=${a=>{a.stopPropagation(),ke(e.id)}}>${D.check()}</button>`:t`<span class="row-detail">${Math.round(s.pct*100)}%</span><span class="row-chev">${D.chevron()}</span>`}
  </div>`}function Zn(e){P(s=>t`<${$i} id=${e} close=${s} />`,{tall:!0})}function $i({id:e,close:s}){let n=F(),a=n.goals.find(c=>c.id===e),[o,r]=g("");if(!a)return t`<${M} title="Goal" right=${t`<button class="link b" onClick=${s}>Done</button>`} />`;let i=De(a,n),u=Ks(a.category),l=R(),d=()=>se({title:"Delete goal",text:`Delete “${a.name}”? Its history will be removed too.`,confirm:"Delete goal",onConfirm:()=>{s(),N(c=>{c.goals=c.goals.filter(b=>b.id!==e)}),T("Goal deleted")}}),p=()=>{let c=parseFloat(o);Number.isNaN(c)||(C(12),N(b=>{let h=b.goals.find(v=>v.id===e);h.entries=[...h.entries||[],{id:ie(),date:l,value:c}]}),r(""))},$=null;if(a.type==="habit"){let c=(a.ticks||[]).includes(l),b=Pe(a),h=ua(a),v=h.filter(k=>k.done).length,m=St(new Date),y=Array.from({length:12},(k,f)=>X(m,-7*(11-f))),w=new Set(a.ticks||[]);$=t`
      <button class="btn block big ${c?"btn-done":"btn-primary"}" style="--c:${a.color}" onClick=${()=>ke(e)}>
        ${c?t`${D.check()} Done today`:"Mark done today"}</button>
      <div class="stats3">
        <div><b>${b.value}</b><span>${b.unit} streak</span></div>
        ${a.perWeek>=7?t`<div><b>${da(a)}</b><span>best streak</span></div>`:t`<div><b>${v}/${a.perWeek}</b><span>this week</span></div>`}
        <div><b>${(a.ticks||[]).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${h.map((k,f)=>t`<button class="wd ${k.done?"on":""} ${k.key===l?"today":""}" style="--c:${a.color}"
          disabled=${k.key>l} onClick=${()=>ke(e,k.key)}><span>${"MTWTFSS"[f]}</span><i>${k.done?D.check():""}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${a.color}">
          ${y.map(k=>t`<div class="heat-col">${Array.from({length:7},(f,q)=>{let O=R(X(k,q));return t`<i class="${w.has(O)?"on":""} ${O>l?"future":""}" title=${Q(O)}></i>`})}</div>`)}
        </div>
      </div>`}else if(a.type==="numeric"&&a.auto==="money")$=t`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${Q(Dt(a).start)}.</div>`;else if(a.type==="numeric"&&a.auto==="weight")$=t`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${$t}>Log weight</button>`;else if(a.type==="numeric"){let c=[...a.entries||[]].reverse();$=t`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${a.mode==="level"?`New value${a.unit?" ("+a.unit+")":""}`:a.unit==="£"?"Amount you saved (£)":`Add amount${a.unit?" ("+a.unit+")":""}`}
          value=${o} onInput=${b=>r(b.target.value)} onKeyDown=${b=>b.key==="Enter"&&p()} />
        <button class="btn btn-primary sm" disabled=${o===""} onClick=${p}>${a.mode==="level"?"Log":"Add"}</button>
      </div>
      ${c.length>0&&t`<${A} header="History">
        ${c.slice(0,30).map(b=>t`<div class="row" key=${b.id}>
          <span class="row-main"><span class="row-title">${a.mode==="level"?"":"+"}${b.value}${a.unit?" "+a.unit:""}</span><span class="row-sub">${Q(b.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>N(h=>{let v=h.goals.find(m=>m.id===e);v.entries=v.entries.filter(m=>m.id!==b.id)})}>${D.trash()}</button>
        </div>`)}
      <//>`}`}else if(a.type==="quit"){let c=n.quits.find(b=>b.id===a.quitId)||n.quits[0];$=t`<div class="card pad info">${c.emoji} Linked to your ${c.label.toLowerCase()} counter. Every day you stay ${c.label.toLowerCase()}-free ${a.period==="2027"?`from ${Q(pa(a,c))} to the end of 2027 `:""}fills this ring, including the days before you added this goal.</div>`}else $=t`<button class="btn block big ${a.done?"btn-done":"btn-primary"}" style="--c:${a.color}"
      onClick=${()=>{C(15),N(c=>{let b=c.goals.find(h=>h.id===e);b.done=!b.done,b.doneDate=b.done?l:null}),a.done||T("Milestone complete 🎉")}}>
      ${a.done?t`${D.check()} Completed`:"Mark as complete"}</button>`;return t`
    <${M} left=${t`<button class="link" onClick=${()=>zt(a)}>Edit</button>`}
      right=${t`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${Ze} pct=${i.pct} size=${168} stroke=${18} color=${a.color}>
          <div class="dh-in"><span class="dh-e">${a.emoji}</span><b>${Math.round(i.pct*100)}%</b></div>
        <//>
        <h2 class="dh-name">${a.name}</h2>
        <div class="dh-label">${i.label} <span class="muted">${i.sub}</span></div>
        ${ts(a)&&t`<div class="dh-note">Counts from ${Q(Dt(a).start)}. Ticks before then still build your streak.</div>`}
        <div class="chips"><span class="chip" style="--c:${u.color}">${u.label}</span><span class="chip">${Re(a)}</span><span class="chip">${ps(a)}</span></div>
      </div>
      ${$}
      <button class="btn btn-plain danger block mt16" onClick=${d}>Delete goal</button>
    </div>`}function zt(e){P(s=>t`<${hi} goal=${e} close=${s} />`,{tall:!0})}function hi({goal:e={},close:s}){let n=!!e.id,[a,o]=g(()=>({name:"",emoji:"🎯",color:"#3B9BFF",category:"habits",type:"habit",perWeek:7,remindAt:"",period:"2027",end:"2027-12-31",mode:"sum",auto:"",unit:"",target:"",startValue:"",quitId:F().quits[0]?.id||"",...e})),r=c=>o(b=>({...b,...c})),i=F(),u=a.auto==="weight"?"weight":a.mode==="level"?"level":a.unit==="£"?"money":"sum",l=c=>r(c==="money"?{auto:"",unit:"£",mode:"sum"}:c==="weight"?{auto:"weight",unit:"kg",mode:"level",startValue:a.startValue===""?+(ge(i.profile)||0).toFixed(1):a.startValue}:{auto:"",mode:c,unit:a.auto||a.unit==="£"?"":a.unit}),d=a.type!=="numeric"||a.target!==""&&!Number.isNaN(parseFloat(a.target)),p=a.name.trim()&&d&&(a.period==="2027"||a.end),$=()=>{if(!p)return;C(15);let c={...a,name:a.name.trim(),target:a.target===""?"":parseFloat(a.target),startValue:a.startValue===""?"":parseFloat(a.startValue)};N(b=>{if(n){let h=b.goals.findIndex(v=>v.id===e.id);h>=0&&(b.goals[h]={...b.goals[h],...c})}else b.goals.push({ticks:[],entries:[],...c,id:ie(),start:R(),createdAt:new Date().toISOString()})}),s(),T(n?"Goal updated":"Goal added")};return t`
    <${M} title=${n?"Edit goal":"New goal"}
      left=${t`<button class="link" onClick=${s}>Cancel</button>`}
      right=${t`<button class="link b" disabled=${!p} onClick=${$}>${n?"Save":"Add"}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${a.color}">${a.emoji}</div>
        <input class="eh-name" placeholder="Goal name" value=${a.name} onInput=${c=>r({name:c.target.value})} maxlength="60" />
      </div>

      <${A} header="Icon">
        <div class="emoji-grid">${_s.map(c=>t`<button class="emo ${a.emoji===c?"on":""}" onClick=${()=>{C(),r({emoji:c})}}>${c}</button>`)}</div>
      <//>
      <${A} header="Colour">
        <div class="swatches">${zs.map(c=>t`<button class="sw ${a.color===c?"on":""}" style="--c:${c}" aria-label=${c} onClick=${()=>{C(),r({color:c})}}></button>`)}</div>
      <//>
      <${A} header="Category">
        <div class="chip-row">${Ne.map(c=>t`<button class="chip big ${a.category===c.id?"on":""}" style="--c:${c.color}" onClick=${()=>{C(),r({category:c.id})}}>${c.label}</button>`)}</div>
      <//>

      <${A} header="Type" footer=${{habit:"Tick it off on the days you do it. Builds a streak.",numeric:"Work towards a number, like km run, money saved or a weight.",milestone:"A one-off achievement you mark as done.",quit:"Fills automatically every day you stay quit."}[a.type]}>
        <div class="pad"><${K} options=${[{value:"habit",label:"Habit"},{value:"numeric",label:"Target"},{value:"milestone",label:"Milestone"},...F().quits.length?[{value:"quit",label:"Stay quit"}]:[]]}
          value=${a.type} onChange=${c=>r({type:c})} /></div>
        ${a.type==="habit"&&t`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${a.perWeek>=7?"Every day":`${a.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${a.perWeek<=1} onClick=${()=>{C(),r({perWeek:Math.max(1,a.perWeek-1)})}} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${a.perWeek>=7} onClick=${()=>{C(),r({perWeek:Math.min(7,a.perWeek+1)})}} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${a.type==="habit"&&t`<div class="row">
          <span class="row-main"><span class="row-title">Reminder</span>
            <span class="row-sub">${a.remindAt?a.perWeek>=7?"Every day, unless it’s ticked":"Only on days you still need it":"A nudge at a time you choose"}</span></span>
          ${a.remindAt&&t`<input type="time" class="time-in" value=${a.remindAt} onChange=${c=>c.target.value&&r({remindAt:c.target.value})} />`}
          <${te} on=${!!a.remindAt} label="Reminder" onChange=${c=>r({remindAt:c?"18:00":""})} />
        </div>`}
        ${a.type==="numeric"&&t`
          <div class="pad"><${K} small options=${[{value:"sum",label:"Add up"},{value:"level",label:"Reach"},{value:"money",label:"£ Saved"},{value:"weight",label:"Weight"}]}
            value=${u} onChange=${l} /></div>
          ${!a.auto&&u!=="money"&&t`<${Y} label="Unit"><input placeholder="km, books, hours…" value=${a.unit} onInput=${c=>r({unit:c.target.value})} /><//>`}
          ${(u==="level"||u==="weight")&&t`<${Y} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${a.startValue} onInput=${c=>r({startValue:c.target.value})} /><//>`}
          <${Y} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${u==="money"?"1000":"100"} value=${a.target} onInput=${c=>r({target:c.target.value})} /><//>
`}
        ${a.type==="quit"&&t`<div class="pad"><${K} options=${i.quits.map(c=>({value:c.id,label:`${c.emoji} ${c.label}`}))} value=${a.quitId} onChange=${c=>r({quitId:c})} /></div>`}
      <//>

      <${A} header="Deadline">
        <div class="pad"><${K} options=${[{value:"2027",label:"Until end of 2027"},{value:"date",label:"Pick a date"}]} value=${a.period} onChange=${c=>r({period:c})} /></div>
        ${a.period==="date"&&t`<${Y} label="Finish by"><input type="date" value=${a.end} min=${R()} onInput=${c=>r({end:c.target.value})} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!p} onClick=${$}>${n?"Save changes":"Add goal"}</button>
    </div>`}function Ke(){P(e=>t`<${mi} close=${e} />`,{tall:!0})}function mi({close:e}){let s=F(),n=Math.ceil((Oe-Date.now())/z),a=new Set(s.goals.map(u=>u.preset).filter(Boolean)),o=u=>{C(15),N(l=>l.goals.push({ticks:[],entries:[],...u.make(l),preset:u.key,id:ie(),start:R(),createdAt:new Date().toISOString()})),T("Added to your goals")},r=u=>{let l=F().goals.find(p=>p.preset===u.key);if(!l)return;let d=()=>{C(10),N(p=>{p.goals=p.goals.filter($=>$.preset!==u.key)}),T("Removed from your goals")};(l.ticks||[]).length||(l.entries||[]).length||l.done?se({title:"Remove goal",text:`Remove “${l.name}”? Its progress so far will be deleted.`,confirm:"Remove",onConfirm:d}):d()},i=u=>u.type==="habit"?`${u.perWeek>=7?"Daily":u.perWeek+"× a week"} habit`:u.type==="numeric"?u.unit==="£"?`Log what you save · target £${Number(u.target).toLocaleString("en-GB")}`:u.auto==="weight"?`Target ${u.target} kg · edit to suit you`:`Target · ${u.target} ${u.unit}`:u.type==="quit"?"Linked to your quit counter":"One-off milestone";return t`
    <${M} right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${n>0?`${n} days until 1 January. `:""}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${Ne.map(u=>{let l=[...Us(s),...Qs].filter(d=>d.make(s).category===u.id);return l.length?t`<${A} key=${u.id} header=${u.label}>
          ${l.map(d=>{let p=d.make(s),$=a.has(d.key),c=s.goals.find(b=>b.preset===d.key);return t`<div class="row tap" key=${d.key} role="button" onClick=${()=>c?Zn(c.id):zt({...p,preset:d.key})}>
              <span class="row-ic" style="background:${p.color}">${p.emoji}</span>
              <span class="row-main"><span class="row-title">${p.name}</span><span class="row-sub">${i(p)}</span></span>
              <button class="add-pill ${$?"on":""}" aria-pressed=${$} aria-label=${$?`Remove ${p.name}`:`Add ${p.name}`}
                onClick=${b=>{b.stopPropagation(),$?r(d):o(d)}}>${$?D.check():D.plus()}</button>
            </div>`})}
        <//>`:null})}
    </div>`}var Te=864e5;function Xn({s:e}){let[s,n]=g(0),a=Zs(e.quits);if(!a.length)return null;let o=new Date,r=Math.floor(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())/Te),i=a[(r*7+s)%a.length];return t`<section class="group">
    <div class="card tip-card">
      <div class="tip-top"><span class="tip-k">${s?"Another tip":"Tip of the day"}</span>
        <button class="link sm tip-next" onClick=${()=>{C(),n(s+1)}} aria-label="Show another tip">Another ↻</button></div>
      <div class="tip-body" key=${i.t}><span class="tip-e" aria-hidden="true">${i.e}</span><p class="tip-t">${i.t}</p></div>
    </div>
  </section>`}var bi=[{value:182,label:"6 months"},{value:365,label:"1 year"}];function vi(e,s,n=Date.now()){let a=n+s*Te,o=e.quits.reduce((p,$)=>p+J($,j($,n)),0),r=e.quits.reduce((p,$)=>p+J($,j($,a)),0),i=[],u=[];for(let p of e.quits){let $=j(p,n),c=j(p,a);for(let h of ue(p)||[])h.h*36e5>$&&h.h*36e5<=c&&i.push({q:p,x:h});let b=kt.filter(h=>h.days*Te>$&&h.days*Te<=c).pop();b&&u.push({q:p,m:b,days:Math.floor(c/Te)})}let l=[...e.wishlist].sort((p,$)=>p.price-$.price).filter(p=>p.price>o&&p.price<=r),d=Math.max(0,...e.quits.map(p=>Math.floor(j(p,a)/Te)));return{at:a,savedNow:o,savedThen:r,gain:r-o,unlocks:i,milestones:u,wishes:l,days:d}}function eo({s:e}){let s=U(6e4),[n,a]=g(182);if(!e.quits.length)return null;let o=vi(e,n,s),r=new Date(o.at).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),i=o.unlocks.slice(-4);return t`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Future you</h2>
      <${K} small options=${bi} value=${n} onChange=${a} /></div>
    <div class="card fy-card">
      <p class="fy-when">On <b>${r}</b>, if you keep going:</p>
      <div class="fy-stats">
        ${o.savedThen>0&&t`<div class="fy-stat fy-saved"><span class="fy-k">💷 Saved</span><b>${H(o.savedThen,0)}</b><small>+${H(o.gain,0)} from today</small></div>`}
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
  </section>`}function gi(e,s=Date.now()){let n=e.quits.reduce((o,r)=>o+j(r,s)/Te*Be(r),0),a=e.quits.filter(o=>ee(o).getTime()<=s).reduce((o,r)=>o+Be(r),0);return{hours:n/60,perDay:a}}var fi=e=>e>=60?`${Math.floor(e/60)}h${e%60?` ${Math.round(e%60)}m`:""}`:`${Math.round(e)} min`;function yi(e){return e<1?"Every minute counts. It adds up fast.":e<8?`That’s about ${Math.max(1,Math.round(e*60/45))} episodes of a show.`:e<60?`That’s about ${Math.round(e/2)} films, or ${Math.round(e/1.5)} football matches.`:e<300?`That’s ${Math.round(e/24)} full days, or ${Math.round(e/8)} working days.`:`That’s ${Math.round(e/24)} full days of your life back.`}function to({s:e}){let s=U(6e4),n=gi(e,s);return!e.quits.length||!n.perDay?null:t`<section class="group">
    <h2 class="group-h">Time reclaimed</h2>
    <button class="card time-card tap" onClick=${ki}>
      <div class="tc-big"><span class="tc-ic" aria-hidden="true">⏳</span><b>${n.hours>=10?Math.round(n.hours):n.hours.toFixed(1)}</b><span>hours of your life back</span></div>
      <div class="tc-sub">About ${fi(n.perDay)} a day you’re not spending on it. ${yi(n.hours)}</div>
    </button>
  </section>`}function ki(){C(),P(e=>t`<${wi} close=${e} />`)}function wi({close:e}){let s=F(),[n,a]=g(Object.fromEntries(s.quits.map(r=>[r.id,String(Be(r))]))),o=()=>{C(12),N(r=>{r.quits.forEach(i=>{let u=parseFloat(n[i.id]);Number.isFinite(u)&&u>=0&&(i.minutes=Math.min(1440,u))})}),e()};return t`
    <${M} title="Time it took" left=${t`<button class="link" onClick=${e}>Cancel</button>`} right=${t`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Roughly how many minutes a day did each one take? Buying, using, being away, recovering. A middle guess is fine.</p>
      <div class="card list">${s.quits.map(r=>t`<label class="field" key=${r.id}><span class="field-l">${r.emoji} ${r.label}</span>
        <span class="field-c"><input type="number" inputmode="numeric" min="0" max="1440" value=${n[r.id]} onInput=${i=>a({...n,[r.id]:i.target.value})} /> min</span></label>`)}</div>
      <p class="muted center tiny mt12">As a guide: nicotine usually takes 10–30 minutes a day, cannabis 10–45.</p>
    </div>`}function so({s:e,go:s}){let n=U(6e4),a=R(),o=e.checkins[a],r=e.quits.reduce((f,q)=>f+(q.monthly||0),0),i=new Date(n).getHours(),u=i<5?"Up late":i<12?"Good morning":i<18?"Good afternoon":"Good evening",l=e.goals.filter(f=>f.type==="habit"),d=e.quits.length>0,p=d&&e.quits.every(f=>f.start===e.quits[0].start),[$,c]=g(null),b=e.quits.find(f=>f.id===$)||e.quits[0],h=b?j(b,n)/z:0,v=Math.ceil((Oe-n)/z),m=e.quits.filter(f=>ue(f)),y=e.quits.filter(f=>j(f,n)>0),w=()=>{C();let f=Math.min(...y.map(q=>j(q,Date.now())/z));Lt(It(y,f,y.reduce((q,O)=>q+J(O,j(O,Date.now())),0)))},k=()=>Promise.all([Promise.resolve(ae()).catch(()=>{}),je(),he()]);return t`<${$e} title="Novum" eyebrow=${new Date(n).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}
      sub=${yt} titleRight=${t`<${On} />`} onRefresh=${k}>
    <p class="greet"><button class="greet-av" aria-label="Your profile" onClick=${()=>s("profile")}><${ve} a=${e.social?.avatar} name=${xt()} size=${36} /></button><span>${u}${xt()?`, ${xt()}`:""}.</span></p>
    <${Za} />

    <section class="group first">
      ${y.length?t`<div class="group-h-row"><h2 class="group-h">Your streaks</h2>
        <button class="link sm b share-link" onClick=${w}>${D.share()} Share</button></div>`:t`<h2 class="group-h">${d?"Your streaks":"Get started"}</h2>`}
      ${d?t`<div class="stack">
        ${e.quits.map(f=>t`<${Ai} key=${f.id} q=${f} />`)}
        ${e.quits.length<Fe.length&&t`<${Ci} />`}
      </div>`:t`<button class="card add-first tap" onClick=${ht}>
        <span class="row-ic" style="background:#3B9BFF">${D.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${D.chevron()}</span>
      </button>`}
    </section>

    ${d&&t`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${Se}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${D.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${()=>Os()}>
          <span class="sup-slip-e">🌱</span><span class="row-main">Slipped up? <b>Reset without the guilt</b></span><span class="row-chev">${D.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${we}>
          <span class="sup-slip-e">🧭</span><span class="row-main">Tough day coming? <b>Plan ahead</b></span><span class="row-chev">${D.chevron()}</span>
        </button>
        ${e.reasons.length>0?t`<button class="sup-why" onClick=${ze}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${e.reasons[Math.floor(n/864e5)%e.reasons.length].text}”</span>
            </button>`:t`<button class="sup-why add" onClick=${ze}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    <${Pa} s=${e} />

    ${d&&t`<${Gn} s=${e} />`}

    ${d&&t`<${Xn} s=${e} />`}

    <${vn} />

    ${r>0&&t`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${Rs}>
        <${Si} quits=${e.quits} />
        <div class="mc-sub">${H(r,0)} a month back in your pocket · ${H(r*12,0)} a year</div>
        <${Ei} s=${e} />
      </button>
    </section>`}

    ${d&&t`<${to} s=${e} />`}

    ${d&&t`<${eo} s=${e} />`}

    ${d&&t`<section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!p&&t`<${K} small options=${e.quits.map(f=>({value:f.id,label:f.label}))} value=${b.id} onChange=${c} />`}
      </div>
      <div class="badges">
        ${kt.map(f=>{let q=h>=f.days;return t`<div class="badge ${q?"got":""}">
            <div class="badge-medal">${q?D.check():f.short}</div>
            <div class="badge-l">${f.label}</div>
            <div class="badge-s">${q?"Earned":`in ${ye(f.days-h)}`}</div>
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
            <span>${e.quits.map(f=>`${f.label} craving ${o[f.id]??"–"}/10`).join(" · ")}</span></span>`:t`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${D.chevron()}</span>
      </button>
      ${l.length>0&&t`<div class="card list mt8">
        ${l.map(f=>t`<${Di} key=${f.id} g=${f} />`)}
      </div>`}
    </section>

    ${m.length>0&&t`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${m.map(f=>{let q=j(f,n)/36e5,O=Ia(f,q);return t`<button class="row tap body-row" onClick=${()=>bt(f.id)}>
            <span class="row-ic tint-ic" style="--c:${f.color}" title=${O.current?O.current.area:"Getting started"}>${O.current?Ba(O.current.area):"🌱"}</span>
            <span class="row-main">
              <span class="row-title">${O.current?O.current.title:"Just getting started"}</span>
              <span class="row-sub">${O.current?O.current.text:"Your first changes start within hours."}</span>
              ${O.next&&t`<span class="row-next">Next: ${O.next.title.toLowerCase()} in ${ye(O.next.h/24-q/24)}</span>`}
            </span>
            <span class="row-chev">${D.chevron()}</span>
          </button>`})}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>`}

    ${v>0?t`
      <button class="card ny-card tap" onClick=${Ke}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${v} day${v===1?"":"s"} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`:t`<button class="card ny-card tap" onClick=${()=>s("progress")}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`}function Si({quits:e}){let s=U(1e3);return t`<div class="mc-big">${H(e.reduce((n,a)=>n+J(a,j(a,s)),0))}</div>`}function Ci(){return t`<button class="card quit-card qc-add tap" onClick=${ht} aria-label="Add something else to quit">
    <div class="qc-head"><span class="qc-add-ic">${D.plus()}</span><span class="qc-label">Quitting something else?</span></div>
    <div class="qc-body">
      <div class="qc-time" aria-hidden="true">
        <span><b>0</b><small>days</small></span><span><b>00</b><small>hrs</small></span><span><b>00</b><small>min</small></span>
      </div>
      <span class="qc-add-ring" aria-hidden="true">${D.plus()}</span>
    </div>
    <div class="qc-foot">Smoking, alcohol, gambling, energy drinks and more. Each gets its own counter.</div>
  </button>`}function Ai({q:e}){let s=U(1e3),n=ee(e).getTime();if(n>s){let{d:p,h:$,m:c}=Zt(n-s);return t`<button class="card quit-card tap" onClick=${()=>mt(e.id)} style="--qc:${e.color}">
      <div class="qc-head"><span class="qc-emoji">${e.emoji}</span><span class="qc-label">${e.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${p}</b><small>${p===1?"day":"days"}</small></span><span><b>${V($)}</b><small>hrs</small></span><span><b>${V(c)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${ee(e).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}. You’ve got this.</div>
    </button>`}let a=j(e,s),{d:o,h:r,m:i,s:u}=Zt(a),l=a/z,d=Nt(l);return t`<button class="card quit-card tap" onClick=${()=>mt(e.id)} style="--qc:${e.color}">
    <div class="qc-head"><span class="qc-emoji">${e.emoji}</span><span class="qc-label">${e.label}-free</span>
      ${e.monthly>0&&t`<span class="qc-saved">${H(J(e,a))} saved</span>`}</div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${o}</b><small>${o===1?"day":"days"}</small></span>
        <span><b>${V(r)}</b><small>hrs</small></span>
        <span><b>${V(i)}</b><small>min</small></span>
        <span class="qc-sec"><b>${V(u)}</b><small>sec</small></span>
      </div>
      <${Ze} pct=${d.pct} size=${70} stroke=${8} color=${e.color}>
        ${d.next?t`<span class="ring-txt" aria-label=${`Next milestone ${ds[d.next.days]}, ${us(d.next.days-l)} to go`}><small>next</small><b>${ds[d.next.days]}</b><small>in ${us(d.next.days-l)}</small></span>`:t`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${d.next?`Next milestone: ${d.next.label}, in ${ye(d.next.days-l)}`:"Every milestone earned. Legend."}</div>
  </button>`}function Di({g:e}){let s=(e.ticks||[]).includes(R()),n=Pe(e);return t`<div class="row">
    <span class="row-ic" style="background:${e.color}">${e.emoji}</span>
    <span class="row-main"><span class="row-title">${e.name}</span>
      <span class="row-sub">${n.value>0?`🔥 ${n.value} ${n.unit} streak`:Re(e)}</span></span>
    <button class="tick ${s?"on":""}" style="--c:${e.color}" aria-pressed=${s} aria-label=${`Mark ${e.name} done today`}
      onClick=${a=>{a.stopPropagation(),ke(e.id)}}>${D.check()}</button>
  </div>`}var Kt=(e,s=Date.now())=>e.quits.reduce((n,a)=>n+J(a,j(a,s)),0);function Ei({s:e}){let s=U(6e4),n=Kt(e,s),a=[...e.wishlist].sort((i,u)=>i.price-u.price);if(!a.length)return t`<div class="wish-line add">🎁 What could it buy? <b>Add something to save for</b></div>`;let o=a.filter(i=>i.price<=n),r=a.find(i=>i.price>n);return t`<div class="wish-line">
    ${o.length>0&&t`<div class="wl-got">✓ That’s ${o[o.length-1].emoji} ${o[o.length-1].name}${o.length>1?` and ${o.length-1} more`:""}</div>`}
    ${r&&t`<div class="wl-next"><span>Next: ${r.emoji} ${r.name}</span><b>${Math.floor(n/r.price*100)}%</b></div>
      <div class="wl-bar"><i style="width:${Math.min(100,n/r.price*100)}%"></i></div>`}
  </div>`}function Rs(){P(e=>t`<${Ti} close=${e} />`,{tall:!0})}function Ti({close:e}){let s=F(),n=U(1e3),a=Kt(s,n),[o,r]=g("🎁"),[i,u]=g(""),[l,d]=g(""),p=[...s.wishlist].sort((h,v)=>h.price-v.price),$=new Set(s.wishlist.map(h=>h.name.toLowerCase())),c=h=>{C(10),N(v=>{v.wishlist.push({id:ie(),emoji:h.emoji||"🎁",name:h.name.trim().slice(0,40),price:+h.price})})},b=i.trim()&&parseFloat(l)>0;return t`
    <${M} title="What it could buy" right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      <div class="wish-hero"><div class="kicker">Saved by quitting</div><div class="mc-big">${H(a)}</div>
        <p class="muted">Money you’d have spent. Put some aside and treat yourself when you hit one.</p></div>
      ${p.length>0&&t`<${A} header="Saving for">
        ${p.map(h=>{let v=Math.min(1,a/h.price);return t`<div class="row wish-row" key=${h.id}>
            <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
            <span class="row-main"><span class="row-title">${h.name}</span>
              <span class="row-sub">${v>=1?"✓ You could buy this now":`${H(h.price-a,0)} to go · ${Math.floor(v*100)}%`}</span>
              <span class="wl-bar"><i style="width:${v*100}%;${v>=1?"background:var(--green)":""}"></i></span></span>
            <span class="row-detail">${H(h.price,0)}</span>
            <button class="icon-btn muted" aria-label=${`Remove ${h.name}`} onClick=${()=>N(m=>{m.wishlist=m.wishlist.filter(y=>y.id!==h.id)})}>${D.trash()}</button>
          </div>`})}
      <//>`}
      <${A} header="Add your own">
        <div class="wish-add">
          <input class="wish-emoji" aria-label="Emoji" maxlength="4" value=${o} onInput=${h=>r(h.target.value)} />
          <input placeholder="e.g. Festival ticket" maxlength="40" value=${i} onInput=${h=>u(h.target.value)} />
          <span class="wish-price">£<input type="number" inputmode="decimal" placeholder="0" value=${l} onInput=${h=>d(h.target.value)} /></span>
          <button class="btn btn-primary sm" disabled=${!b} onClick=${()=>{c({emoji:o,name:i,price:parseFloat(l)}),u(""),d(""),r("🎁")}}>Add</button>
        </div>
      <//>
      ${Qt.some(h=>!$.has(h.name.toLowerCase()))&&t`<${A} header="Ideas" footer="Rough prices. Add one, then delete and re-add it with your own price if it’s different.">
        ${Qt.filter(h=>!$.has(h.name.toLowerCase())).map(h=>t`<button class="row tap" key=${h.name} onClick=${()=>c(h)}>
          <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
          <span class="row-main"><span class="row-title">${h.name}</span></span>
          <span class="row-detail">${H(h.price,0)}</span>
          <span class="add-pill">${D.plus()}</span>
        </button>`)}
      <//>`}
    </div>`}function ao({s:e}){let s=R(),[n,a]=g(s),o=e.checkins[n]||{},r=$=>N(c=>{c.checkins[n]={...c.checkins[n]||{},...$,t:Date.now()}}),i=$=>{let c=R(X(Ae(n),$));c<=s&&(C(),a(c))},u=n===s,l=e.goals.filter($=>$.type==="habit"),d=Object.keys(e.checkins).sort().reverse().slice(0,7),p=$=>$==null?"Not logged":$===0?"None":$<=3?"Mild":$<=6?"Noticeable":$<=8?"Strong":"Intense";return t`<${$e} title="Check-in" sub="A quick daily log. Patterns show up in Progress.">
    <div class="day-nav card">
      <button class="icon-btn" onClick=${()=>i(-1)} aria-label="Previous day">${D.left()}</button>
      <div class="day-nav-t"><b>${u?"Today":Q(n,{weekday:"long"})}</b><span>${Q(n,{day:"numeric",month:"long"})}</span></div>
      <button class="icon-btn" onClick=${()=>i(1)} disabled=${u} aria-label="Next day">${D.chevron()}</button>
    </div>

    <${A} header="Mood">
      <div class="moods">
        ${be.map($=>t`<button class="mood ${o.mood===$.v?"on":""}" onClick=${()=>{C(10),r({mood:$.v})}} aria-pressed=${o.mood===$.v}>
          <span class="mood-e">${$.e}</span><span class="mood-l">${$.l}</span></button>`)}
      </div>
    <//>

    ${e.quits.length>0&&t`<${Un} compact />`}

    ${e.quits.length>0&&t`<${A} header="Cravings" footer="0 = none, 10 = the strongest you’ve felt. Cravings usually pass within 5–10 minutes.">
      ${e.quits.map($=>t`<div class="slider-row">
        <div class="slider-top"><span>${$.emoji} ${$.label}</span><span class="slider-v"><b>${o[$.id]??"–"}</b> ${p(o[$.id])}</span></div>
        <input type="range" min="0" max="10" step="1" value=${o[$.id]??0} style="--c:${$.color};--p:${(o[$.id]??0)/10*100}%"
          class=${o[$.id]==null?"unset":""} aria-label=${`${$.label} craving`}
          onInput=${c=>{let b=+c.target.value;b!==o[$.id]&&(C(4),r({[$.id]:b}))}} />
      </div>`)}
    <//>`}

    <${A} header="Sleep last night">
      <div class="pad"><${K} options=${et.map(($,c)=>({value:c+1,label:$}))} value=${o.sleep} onChange=${$=>r({sleep:$})} /></div>
    <//>

    <${A} header="Notes">
      <${La} key=${n} value=${o.note||""} onSave=${$=>r({note:$})} />
    <//>

    ${l.length>0&&t`<${A} header=${u?"Habits today":"Habits that day"}>
      ${l.map($=>{let c=($.ticks||[]).includes(n);return t`<div class="row" key=${$.id}>
          <span class="row-ic" style="background:${$.color}">${$.emoji}</span>
          <span class="row-main"><span class="row-title">${$.name}</span><span class="row-sub">${Re($)}</span></span>
          <button class="tick ${c?"on":""}" style="--c:${$.color}" aria-pressed=${c} onClick=${()=>ke($.id,n)}>${D.check()}</button>
        </div>`})}
    <//>`}

    <section class="group">
      <h2 class="group-h">Calendar</h2>
      <${Fi} s=${e} day=${n} onPick=${$=>{a($),window.scrollTo({top:0,behavior:"smooth"})}} />
      <p class="group-f">Tap a day to see or change that check-in.</p>
    </section>
  <//>`}var Mi=["January","February","March","April","May","June","July","August","September","October","November","December"];function Fi({s:e,day:s,onPick:n}){let a=R(),[o,r]=g(s.slice(0,7));L(()=>{r(s.slice(0,7))},[s.slice(0,7)]);let[i,u]=o.split("-").map(Number),l=(new Date(i,u-1,1).getDay()+6)%7,d=new Date(i,u,0).getDate(),p=c=>{let b=new Date(i,u-1+c,1),h=`${b.getFullYear()}-${V(b.getMonth()+1)}`;h<=a.slice(0,7)&&(C(),r(h))},$=Object.keys(e.checkins).filter(c=>c.startsWith(o)&&e.checkins[c].mood).length;return t`<div class="card cal">
    <div class="cal-top">
      <button class="icon-btn" onClick=${()=>p(-1)} aria-label="Previous month">${D.left()}</button>
      <div class="cal-t"><b>${Mi[u-1]} ${i}</b><span>${$} check-in${$===1?"":"s"}</span></div>
      <button class="icon-btn" onClick=${()=>p(1)} disabled=${o>=a.slice(0,7)} aria-label="Next month">${D.chevron()}</button>
    </div>
    <div class="cal-grid">
      ${["M","T","W","T","F","S","S"].map((c,b)=>t`<span class="cal-wd" key=${"w"+b}>${c}</span>`)}
      ${Array.from({length:l},(c,b)=>t`<span key=${"b"+b}></span>`)}
      ${Array.from({length:d},(c,b)=>{let h=`${o}-${V(b+1)}`,v=e.checkins[h],m=v?.mood,y=h>a;return t`<button key=${h} class="cal-d ${m?"has":""} ${h===a?"today":""} ${h===s?"sel":""}" disabled=${y}
          style=${m?`--mc:${Vt[m-1]}`:""} aria-label=${`${Q(h,{weekday:"long",day:"numeric",month:"long"})}${m?`, ${be[m-1].l}`:""}`}
          onClick=${()=>{C(),n(h)}}>${b+1}${v?.note?t`<i class="cal-note"></i>`:""}</button>`})}
    </div>
    <div class="cal-key">${be.map((c,b)=>t`<span key=${c.v}><i style="background:${Vt[b]}"></i>${c.l}</span>`)}</div>
  </div>`}var no=fe(()=>import("./c-6PNAFOTB.js"),"openRecap");vs();var oo=()=>t`<div class="boot">NOVUM</div>`,Ni=Xe(()=>import("./c-64Y7ZXAE.js"),"AuthScreen",oo),xi=Xe(()=>import("./c-64Y7ZXAE.js"),"DayZero",oo),_t=[{id:"home",label:"Home",icon:D.home},{id:"checkin",label:"Check-in",icon:D.checkin},{id:"goals",label:"Goals",icon:D.goals},{id:"progress",label:"Progress",icon:D.progress},{id:"profile",label:"Profile",icon:D.profile}];function Bi({tab:e,go:s,dot:n,unread:a}){return t`<nav class="tabbar" aria-label="Main">
    ${_t.map(o=>t`<button class="tab ${e===o.id?"on":""}" aria-current=${e===o.id?"page":void 0} onClick=${()=>s(o.id)}
      aria-label=${o.id==="home"&&a?`Home, ${a} new in Activity`:void 0}>
      <span class="tab-ic">${o.icon()}${o.id==="checkin"&&n&&t`<i class="tab-dot"></i>`}${o.id==="home"&&a>0&&t`<i class="tab-count">${a>9?"9+":a}</i>`}</span><span class="tab-l">${o.label}</span></button>`)}
  </nav>`}var js=document.documentElement;function io(){let e=window.scrollY;js.style.setProperty("--st",Math.max(0,Math.min(1,(e-10)/30)).toFixed(3)),js.style.setProperty("--ov",(1+Math.max(0,-e)*.0016).toFixed(4)),js.classList.toggle("scrolled",e>30)}window.addEventListener("scroll",io,{passive:!0});var Ws=new Set;function ro(e,s,n){!s||Ws.size>=5||Ws.has(s)||/Script error|ResizeObserver|Load failed|NetworkError|Failed to fetch|AbortError|ethereum|cloudflareinsights/i.test(s)||/-extension:\/\//i.test(n||"")||(Ws.add(s),xa(e,s,n))}window.addEventListener("error",e=>ro(`${(e.filename||"").split("/").slice(-2).join("/")}:${e.lineno||0}`,e.message,e.error?.stack));window.addEventListener("unhandledrejection",e=>ro("promise",e.reason?.message||String(e.reason||""),e.reason?.stack));function Ii({s:e}){let s=location.hash==="#reset"?"profile":location.hash.slice(1),[n,a]=g(_t.some(p=>p.id===s)?s:"home");L(()=>{s==="activity"&&(history.replaceState(null,"","#home"),setTimeout(dt,400)),s==="sos"&&(history.replaceState(null,"","#home"),setTimeout(Se,400)),s==="plan"&&(history.replaceState(null,"","#home"),setTimeout(we,400)),s==="letters"&&(history.replaceState(null,"","#home"),setTimeout(tt,400)),s==="recap"&&(history.replaceState(null,"","#home"),setTimeout(no,400))},[]);let o=oe({}),r=(p,{quiet:$}={})=>{if(p===n){$||window.scrollTo({top:0,behavior:"smooth"});return}if(o.current[n]=window.scrollY,$||C(),history.replaceState(null,"","#"+p),!document.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches){a(p);return}let c=_t.map(v=>v.id);document.documentElement.dataset.tabDir=c.indexOf(p)>c.indexOf(n)?"fwd":"back";let b=document.startViewTransition(()=>(a(p),new Promise(v=>setTimeout(v,0)))),h=()=>{};b.ready.catch(h),b.finished.catch(h),b.updateCallbackDone.catch(h)};ft(()=>{window.scrollTo(0,o.current[n]||0),io()},[n]),L(()=>{let p=()=>{let $=location.hash.slice(1);if($==="activity"){a("home"),history.replaceState(null,"","#home"),dt();return}if($==="sos"){a("home"),history.replaceState(null,"","#home"),Se();return}if($==="plan"){a("home"),history.replaceState(null,"","#home"),we();return}if($==="letters"){a("home"),history.replaceState(null,"","#home"),tt();return}if($==="recap"){a("home"),history.replaceState(null,"","#home"),no();return}_t.some(c=>c.id===$)&&a($)};return window.addEventListener("hashchange",p),()=>window.removeEventListener("hashchange",p)},[]),L(()=>{let p=setTimeout(Xa,700);return()=>clearTimeout(p)},[]),L(()=>{let p=()=>{let b=an();if(b){if(nn(),b.toLowerCase()===(Z()?.user?.username||"").toLowerCase()){T("That’s your own code. Show it to a friend to scan");return}nt(b)}};if(!e.tourDone)return;let $=setTimeout(p,900),c=()=>{vs(),p()};return window.addEventListener("hashchange",c),()=>{clearTimeout($),window.removeEventListener("hashchange",c)}},[e.tourDone]);let i={home:so,checkin:ao,goals:Jn,progress:_n,profile:Vn}[n],u=!e.checkins[R()]?.mood;L(()=>{let p=()=>{tn(en()),rn()},$=setTimeout(p,1200),c=setInterval(p,6e4);return()=>{clearTimeout($),clearInterval(c)}},[]);let l=Ee(),d=(l.unread||0)+(u?1:0);return L(()=>{try{"setAppBadge"in navigator&&(d?navigator.setAppBadge(d):navigator.clearAppBadge()).catch(()=>{})}catch{}},[d]),t`<div class="app">
    <main class="screen" key=${n}><${i} s=${e} go=${r} /></main>
    <${Bi} tab=${n} go=${r} dot=${u} unread=${l.unread||0} />
    <${qn} />
    <${Wn} s=${e} go=${r} />
  </div>`}function Li(){let[e,s]=g(!!window.__novumUpdate);return L(()=>{let n=()=>s(!0);return window.addEventListener("novum-update",n),()=>window.removeEventListener("novum-update",n)},[]),e?t`<button class="update-bar" onClick=${()=>location.reload()}>✨ A new version of Novum is ready. <b>Tap to update</b></button>`:null}function Pi(){let[e,s]=g(Z()),[n,a]=g(F()),[o,r]=g(!1);L(()=>ga(s),[]),L(()=>Ie(l=>a(l)),[]),L(()=>{try{navigator.storage?.persist?.()}catch{}},[]);let i=e?.user?.id;L(()=>{if(!i){Ye(),at(),bn(),un(),hn(),Bn(),Je({wipe:!1}),r(!0);return}if(sa(i),In(),za()){let l=aa();l&&(Le({...l,setupDone:!1}),Ha(l.notify),na())}r(F().setupDone),Promise.resolve(Dn(i)).finally(()=>r(!0)),Ka(),mn(),dn(),Mt().then(l=>{let d=F().profile.dob;l&&!l.dob&&d&&qe({dob:d}).catch(()=>{})}).catch(()=>{})},[i]);let u;return e?o?n.setupDone?u=t`<${Ii} s=${n} />`:u=t`<${xi} user=${e.user} />`:u=t`<div class="boot">NOVUM</div>`:u=t`<${Ni} />`,t`${u}<${sn} /><${yn} /><${ha} /><${Li} />`}Ys(t`<${Pi} />`,document.getElementById("app"));window.__novumBooted=!0;
