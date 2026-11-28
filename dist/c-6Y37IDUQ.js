import{a as ka,b as wa,c as Sa,d as as,e as Ca,f as Aa,g as Da,h as Ea,i as Ta,j as zt,l as Ma,m as ke,o as ns,p as Ia,q as Fa,u as qa,w as La}from"./c-64SAQGNL.js";import{f as Ga}from"./c-E7ZIQIMY.js";import{d as Ha}from"./c-7Z6ZGD2Z.js";import{a as ls,e as Ba,g as Pa,h as Oa,i as mt,m as Ra,n as Wa,o as rs,p as Ft,q as Ce,u as ja,v as Ya}from"./c-INGTM4TJ.js";import{a as H,b as X,c as xt,d as gt,e as Ze,f as ts,g as ge,h as fe,i as fa,j as ya,k as es,l as ye,m as It,n as at,p as ss}from"./c-LCQCBYH5.js";import{d as we,j as Se}from"./c-B4QY5EBS.js";import{c as Na,d as os,e as is,f as xa}from"./c-OCZ74QMI.js";import{$ as Ve,A as Ue,C as ma,R as Je,W as ve,X as ba,Y as va,aa as ga,b as st,ba as Xe,c as na,e as _e,h as oa,i as ia,o as la,p as ra,q as be,r as ca,s as Qe,t as da,u as ua,v as pa,w as $a,x as ha}from"./c-HECOZTOP.js";import{$ as zs,Aa as f,B as Ys,Ca as Kt,Da as ta,E as re,Ea as L,F as Gs,Fa as Ke,G as Oe,H as Tt,Ha as M,I as W,Ia as kt,J as Yt,Ja as z,K as Gt,Ka as et,L as Ht,La as D,M as lt,Ma as B,N as Hs,Na as Y,O as ce,Oa as ze,P as Z,Pa as ea,Q as G,Qa as sa,R as rt,Ra as E,S as Ks,Sa as me,T as x,Ta as aa,U as de,Ua as ht,W as Re,X as I,Y as ue,aa as _s,b as g,ba as tt,c as K,ca as R,d as Is,da as J,e as $t,ea as We,f as e,fa as pe,ga as Qs,h as ie,ha as Us,i as le,j as At,ja as Js,k as Fs,l as qs,la as Mt,m as ct,ma as je,n as Dt,na as $e,o as Ls,oa as Ye,p as Bs,pa as he,q as Ps,qa as Nt,r as Os,ra as Vs,s as Rs,sa as Xs,t as dt,ta as yt,u as Ws,ua as Zs,v as js,w as jt,wa as Ge,x as Pe,xa as He,ya as A,z as Et,za as Q}from"./c-3SMB7GOA.js";var ps=t=>`novum.sync:${t}`,us=new Set,_t={state:"idle",at:0,error:""},qt=null,Ee=null,cs=!1,Ae=!1,De=null,$s=()=>{try{return JSON.parse(localStorage.getItem(ps(qt)))||{version:0,dirty:!1}}catch{return{version:0,dirty:!1}}},hs=t=>{try{localStorage.setItem(ps(qt),JSON.stringify(t))}catch{}},ds=t=>{_t={..._t,...t},us.forEach(s=>s(_t))},za=()=>_t,_a=t=>(us.add(t),()=>us.delete(t));async function Ka(t){let s=await _e("PUT","/data",{data:x(),baseVersion:t.version});hs({version:s.version,dirty:!1})}async function nt(){if(!(!qt||!st())){if(cs){Ae=!0;return}cs=!0,ds({state:"syncing"});try{let t=$s(),s=await _e("GET","/data");if(s.version>t.version){let n=x();!t.dirty||(s.data?.savedAt||0)>=(n.savedAt||0)?(ue(s.data,{remote:!0}),t={version:s.version,dirty:!1},hs(t)):(t={version:s.version,dirty:!0},await Ka(t))}else(t.dirty||s.version===0)&&await Ka({...t,version:s.version});ds({state:"synced",at:Date.now(),error:""})}catch(t){t.status===409?Ae=!0:ds({state:t.offline?"offline":"error",error:t.message})}finally{cs=!1,Ae&&(Ae=!1,setTimeout(nt,300))}}}var Qa=()=>{document.visibilityState==="visible"&&nt()};function Ho(t){return Te(),qt=t,De=de((s,n)=>{if(n.remote)return;let a=$s();a.dirty||hs({...a,dirty:!0}),clearTimeout(Ee),Ee=setTimeout(nt,2e3)}),window.addEventListener("online",nt),document.addEventListener("visibilitychange",Qa),nt()}function Te(){De&&De(),De=null,clearTimeout(Ee),window.removeEventListener("online",nt),document.removeEventListener("visibilitychange",Qa),qt=null,_t={state:"idle",at:0,error:""}}async function Ua(){clearTimeout(Ee),qt&&$s().dirty&&await nt()}function ms(t){try{localStorage.removeItem(ps(t)),localStorage.removeItem(`novum.activity.${t}`)}catch{}}var fs=()=>{let t=st()?.user?.id;return t?`novum.activity.${t}`:""};function yn(){try{let t=JSON.parse(localStorage.getItem(fs())||"null");return t&&Array.isArray(t.items)?t:null}catch{return null}}function tn(t){try{fs()&&localStorage.setItem(fs(),JSON.stringify({items:t.items,unread:t.unread,at:Date.now()}))}catch{}}var en=()=>{let t=yn();return t?{items:t.items,unread:t.unread,loaded:!0,cachedAt:t.at}:{items:[],unread:0,loaded:!1}},j=en(),Ut=new Set,Vt=0,Qt=null,Me=new Set,Bt=()=>Me.forEach(t=>t(j));function ut(){return Qt||(j={...j,refreshing:!0},Bt(),Qt=(async()=>{try{let t=await ve(),s=t.items.filter(n=>!Ut.has(n.id));j={...t,items:s,unread:s.filter(n=>!n.read).length,loaded:!0,error:""},Vt=Date.now(),tn(j)}catch(t){j={...j,loaded:!0,error:t.offline?"You’re offline.":"Couldn’t load your activity right now."}}return j={...j,refreshing:!1},Qt=null,Bt(),j})(),Qt)}function Zo(){j={items:[],unread:0,loaded:!1},Vt=0,Lt=null,Bt()}function ti(){j=en(),Vt=0,Lt=null,Bt()}var sn=45e3,xe=null,an=()=>{document.visibilityState==="visible"&&Date.now()-Vt>5e3&&ut()};function kn(){xe||(xe=setInterval(()=>{document.visibilityState==="visible"&&ut()},sn),document.addEventListener("visibilitychange",an))}function wn(){clearInterval(xe),xe=null,document.removeEventListener("visibilitychange",an)}function Xt(){let[t,s]=g(j);return K(()=>(Me.add(s),kn(),Date.now()-Vt>sn&&ut(),()=>{Me.delete(s),Me.size||wn()}),[]),t}var Lt=null,ys=!1;function ei(){let t=Xt(),[s,n]=g(null);if(K(()=>{if(!t.loaded||t.error)return;if(Lt===null){Lt=new Set(t.items.map(l=>l.id));return}let i=t.items.filter(l=>!Lt.has(l.id)&&!l.read);t.items.forEach(l=>Lt.add(l.id)),i.length&&!ys&&(A(12),n({x:i[0],more:i.length-1,at:Date.now()}))},[t.items]),K(()=>{if(!s)return;let i=setTimeout(()=>n(null),6e3);return()=>clearTimeout(i)},[s]),!s)return null;let{x:a,more:o}=s;return e`<button class="act-pop" key=${s.at} role="status" onClick=${()=>{A(),n(null),ln()}}>
    <${mt} a=${a.who.avatar} name=${a.who.firstName} size=${38} />
    <span class="act-pop-t">${on(a)}${o>0&&e` <span class="muted">and ${o} more</span>`}</span>
    <span class="act-pop-x" aria-label="Dismiss" onClick=${i=>{i.stopPropagation(),n(null)}}>✕</span>
  </button>`}function nn(){let t=Xt();return e`<button class="icon-btn bell" aria-label=${`Activity${t.unread?`, ${t.unread} new`:""}`} onClick=${ln}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    ${t.unread>0&&e`<i class="bell-dot">${t.unread>9?"9+":t.unread}</i>`}
  </button>`}var bs=(t,s)=>{let n=Math.floor((s-t)/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;let a=Math.floor(n/60);if(a<24)return`${a}h ago`;let o=Math.floor(a/24);return o<7?`${o}d ago`:new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short"})},Sn={kind:"water",e:"💧",l:"Watered your garden"},ws=t=>t.data?.kind==="water"?Sn:Et.find(s=>s.kind===t.data?.kind)||Et[0],ks={cheer:{c:"#FF375F",f:"cheers"},buddy_request:{e:"🤝",c:"#3B9BFF",f:"requests"},buddy_accepted:{e:"🤝",c:"#30D158",f:"requests"},follow:{e:"👤",c:"#BF5AF2",f:"requests"},follow_request:{e:"👤",c:"#BF5AF2",f:"requests"},follow_accepted:{e:"✓",c:"#30D158",f:"requests"},sos:{e:"🫁",c:"#64D2FF",f:"buddies"},milestone:{e:"🎉",c:"#FFD60A",f:"buddies"}},Cn=t=>t.kind==="cheer"?ws(t).e:t.kind==="milestone"&&t.data?.emoji==="💷"?"💷":ks[t.kind]?.e||"🔔";function on(t){let s=e`<b>${t.who.firstName}</b>`;switch(t.kind){case"cheer":{if(t.data?.kind==="water")return e`${s} watered your garden 💧`;let n=ws(t);return e`${s} sent you ${n.e} <i>${n.l.toLowerCase()}</i>`}case"buddy_request":return e`${s} wants to be buddies`;case"buddy_accepted":return e`You and ${s} are now buddies`;case"follow":return e`${s} started following you`;case"follow_request":return e`${s} wants to follow you`;case"follow_accepted":return e`${s} accepted your follow request`;case"sos":return e`${s} was having a craving and asked for support`;case"milestone":return e`${s} hit <b class="act-hl">${t.data.label}</b> ${t.data.quit}`;default:return e`${s}`}}function An(t){let s=[...new Map(t.map(n=>[n.who.username,n.who.firstName])).values()];return s.length===1?e`<b>${s[0]}</b>`:s.length===2?e`<b>${s[0]}</b> and <b>${s[1]}</b>`:e`<b>${s[0]}</b>, <b>${s[1]}</b> and ${s.length-2} other${s.length===3?"":"s"}`}function Dn(t,s){let n=new Date(s);n.setHours(0,0,0,0);let a=n.getTime();return t>=a?"Today":t>=a-864e5?"Yesterday":t>=a-6*864e5?"This week":"Earlier"}var En={cheer:1,follow:1};function Tn(t,s){let n=[];for(let a of t){let o=Dn(a.at,s);(!n.length||n[n.length-1].b!==o)&&n.push({b:o,rows:[]}),n[n.length-1].rows.push(a)}for(let a of n){let o=[],i={};for(let l of a.rows)En[l.kind]&&a.rows.filter(d=>d.kind===l.kind).length>=2?(i[l.kind]||(i[l.kind]={group:!0,kind:l.kind,id:`g:${a.b}:${l.kind}`,items:[],at:l.at},o.push(i[l.kind])),i[l.kind].items.push(l)):o.push(l);a.rows=o}return n}var Mn=t=>t.filter(s=>!s.read).length;function Jt(t){j={...j,items:t,unread:Mn(t)},tn(j),Bt()}var Ja=4500;function Ne(t,s){let n=j.items.filter(l=>t.includes(l.id));if(!n.length)return;t.forEach(l=>Ut.add(l)),Jt(j.items.filter(l=>!t.includes(l.id)));let a=!1,o=!j.items.length&&t.length>1,i=Math.max(...n.map(l=>l.at));E(s,{ms:Ja,action:{label:"Undo",onClick:()=>{a=!0,t.forEach(l=>Ut.delete(l)),Jt([...j.items,...n].sort((l,d)=>d.at-l.at))}}}),setTimeout(async()=>{if(!a){try{await(o?Ve(null,i):Promise.all(t.map(l=>Ve(l))))}catch(l){t.forEach(d=>Ut.delete(d)),Jt([...j.items,...n].sort((d,c)=>c.at-d.at)),E(l.offline?"You’re offline, so nothing was cleared.":"Couldn’t clear that. Try again.");return}t.forEach(l=>Ut.delete(l))}},Ja+200)}function Nn(){at({title:"Clear all notifications?",text:"This empties Activity on all your devices. Buddy and follow requests still wait for you in Buddies and Profile.",confirm:"Clear all",onConfirm:()=>{A(15),Ne(j.items.map(t=>t.id),"All cleared")}})}async function vs(t){let s=j.items.filter(a=>t.includes(a.id));if(!s.length)return;let n=s.every(a=>a.read);A(10),Jt(j.items.map(a=>t.includes(a.id)?{...a,read:!n}:a));try{await Promise.all(t.map(a=>va(a,n)))}catch(a){Jt(j.items.map(o=>t.includes(o.id)?{...o,read:n}:o)),E(a.offline?"You’re offline. Try again when you’re back.":"Couldn’t update that. Try again.")}}var Va=88;function gs({onClear:t,onToggle:s,unread:n,children:a}){let[o,i]=g(0),[l,d]=g(!1),[c,r]=g(!1),$=$t(null),m=$t(0),u=S=>{m.current=S,i(S)},b=()=>{A(12),r(!0),setTimeout(t,260)},h=()=>{u(0),s()},v=S=>{let w=S.touches[0];$.current={x:w.clientX,y:w.clientY,base:m.current,dir:null}},p=S=>{let w=$.current;if(!w)return;let k=S.touches[0],F=k.clientX-w.x,O=k.clientY-w.y;w.dir||(Math.abs(F)>8&&Math.abs(F)>Math.abs(O)?(w.dir="h",d(!0)):Math.abs(O)>8&&(w.dir="v")),w.dir==="h"&&u(Math.max(-220,Math.min(140,w.base+F)))},y=()=>{let S=$.current;$.current=null,d(!1),!(!S||S.dir!=="h")&&(m.current>70?h():m.current<-160?b():u(m.current<-Va/2?-Va:0))};return e`<div class="act-swipe ${c?"gone":""} ${o<0||l?"open":""} ${o>0?"right":""}">
    <span class="act-mark ${o>70?"go":""}" aria-hidden="true">${n?"✓ Read":"● Unread"}</span>
    <button class="act-clear" tabindex=${o<0?0:-1} aria-hidden=${o<0?"false":"true"} onClick=${b}>Clear</button>
    <div class="act-slide ${l?"drag":""}" style=${`transform:translateX(${c?-420:o}px)`}
      onTouchStart=${v} onTouchMove=${p} onTouchEnd=${y} onTouchCancel=${y}
      onClickCapture=${S=>{m.current&&(S.stopPropagation(),S.preventDefault(),u(0))}}>
      ${a}
    </div>
  </div>`}var Xa=[{value:"all",label:"All"},{value:"cheers",label:"Cheers"},{value:"requests",label:"Requests"},{value:"buddies",label:"Buddies"}];function ln(){L(t=>e`<${xn} close=${t} />`,{tall:!0})}function xn({close:t}){let s=Xt(),n=Q(6e4),[a,o]=g({}),[i,l]=g("all"),[d,c]=g({});K(()=>(ys=!0,()=>{ys=!1}),[]),K(()=>{ut().then(p=>{p.unread&&ba().then(()=>{j={...j,unread:0},Bt()}).catch(()=>{})})},[]);let r=async(p,y,S)=>{A(10);try{await y(),o(w=>({...w,[p.id]:S})),E(S),Ft()}catch(w){E(w.message),w.queued&&o(k=>({...k,[p.id]:"Will send when you’re back online"}))}},$=s.items.filter(p=>i==="all"||ks[p.kind]?.f===i),m=Tn($,n),u=p=>a[p.id]?e`<div class="act-done">✓ ${a[p.id]}</div>`:p.kind==="sos"&&p.who.buddy?e`<${ls} who=${p.who} small class="act-cheers"
        onSent=${(y,S)=>o(w=>({...w,[p.id]:S?"Will send when you’re back online":`Sent ${y.e} ${y.l.toLowerCase()}`}))} />`:p.kind==="cheer"&&p.who.buddy?e`<button class="act-chip" onClick=${()=>r(p,()=>ma(p.who.username,"heart"),`Sent 💙 back to ${p.who.firstName}`)}>💙 Send one back</button>`:p.kind==="buddy_request"?e`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>r(p,()=>Ue(p.who.username,!0),`You and ${p.who.firstName} are buddies`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>r(p,()=>Ue(p.who.username,!1),"Declined")}>Decline</button></div>`:p.kind==="follow_request"?e`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>r(p,()=>Je(p.who.username,!0),`${p.who.firstName} can now see your profile`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>r(p,()=>Je(p.who.username,!1),"Declined")}>Decline</button></div>`:null,b=p=>e`<div class="act-item ${p.read?"":"new"} ${p.kind==="sos"?"act-sos":""}">
    <button class="act-av" aria-label=${`Open ${p.who.firstName}’s profile`} onClick=${()=>rs(p.who.username)}>
      <${mt} a=${p.who.avatar} name=${p.who.firstName} size=${44} />
      <i class="act-kind" style=${`background:${ks[p.kind]?.c||"#3B9BFF"}`} aria-hidden="true">${Cn(p)}</i>
    </button>
    <div class="act-main">
      <div class="act-t">${on(p)}</div>
      <div class="act-when">${bs(p.at,n)}</div>
      ${u(p)}
    </div>
    ${!p.read&&e`<i class="act-dot" aria-label="New"></i>`}
  </div>`,h=p=>{let y=p.data?.emoji==="💷";return e`<div class="act-ms-card ${y?"money":""} ${p.read?"":"new"}">
      <span class="ms-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <div class="ms-top">
        <button class="act-av" aria-label=${`Open ${p.who.firstName}’s profile`} onClick=${()=>rs(p.who.username)}><${mt} a=${p.who.avatar} name=${p.who.firstName} size=${36} /></button>
        <span class="ms-who"><b>${p.who.firstName}</b> hit a milestone · ${bs(p.at,n)}</span>
        ${!p.read&&e`<i class="act-dot static" aria-label="New"></i>`}
      </div>
      <div class="ms-big">${y?"💷":"🎉"} ${p.data.label}</div>
      <div class="ms-sub">${p.data.quit}</div>
      ${a[p.id]?e`<div class="act-done">✓ ${a[p.id]}</div>`:p.who.buddy&&e`<${ls} who=${p.who} small class="ms-cheers"
          onSent=${(S,w)=>o(k=>({...k,[p.id]:w?"Will send when you’re back online":`Sent ${S.e} ${S.l.toLowerCase()}`}))} />`}
    </div>`},v=p=>{let y=d[p.id],S=p.items.some(k=>!k.read),w=[...new Set(p.items.map(k=>p.kind==="cheer"?ws(k).e:"👤"))].slice(0,3).join("");return e`<div class="act-group-row">
      <button class="act-item act-stack ${S?"new":""}" aria-expanded=${!!y} onClick=${()=>{A(),c(k=>({...k,[p.id]:!k[p.id]}))}}>
        <span class="stack-avs" aria-hidden="true">${[...new Map(p.items.map(k=>[k.who.username,k])).values()].slice(0,3).map((k,F)=>e`<span class="stack-av" key=${k.id} style=${`z-index:${3-F}`}><${mt} a=${k.who.avatar} name=${k.who.firstName} size=${34} /></span>`)}</span>
        <span class="act-main">
          <span class="act-t">${An(p.items)} ${p.kind==="cheer"?e`sent you ${p.items.length} cheers ${w}`:e`started following you`}</span>
          <span class="act-when">${bs(p.items[0].at,n)} · ${y?"Hide":"Show all"}</span>
        </span>
        ${S&&e`<i class="act-dot" aria-label="New"></i>`}
      </button>
      ${y&&e`<div class="stack-list">${p.items.map(k=>e`<${gs} key=${k.id} unread=${!k.read} onClear=${()=>Ne([k.id],"Cleared")} onToggle=${()=>vs([k.id])}>${b(k)}<//>`)}</div>`}
    </div>`};return e`
    <${M} title="Activity"
      left=${s.items.length>0?e`<button class="link act-clear-all" onClick=${Nn}>Clear all</button>`:null}
      right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body act-sheet">
      ${s.items.length>0&&e`<div class="act-filter"><${z} small options=${Xa} value=${i} onChange=${l} /></div>`}
      ${s.error&&s.items.length>0&&e`<div class="act-stale" role="status">
        <span>📡 ${s.error==="You’re offline."?"You’re offline.":"Couldn’t refresh."} Showing your last update.</span>
        <button class="link sm" disabled=${s.refreshing} onClick=${()=>{A(),ut()}}>${s.refreshing?"Trying…":"Try again"}</button>
      </div>`}
      ${s.loaded?s.error&&s.items.length===0?e`<div class="act-empty"><div class="act-empty-ic">📡</div><b>${s.error}</b><p class="muted">Your cheers and requests are safe. They’ll show up once Novum can reach the server.</p><button class="btn btn-tinted sm mt12" disabled=${s.refreshing} onClick=${()=>{A(),ut()}}>${s.refreshing?"Trying…":"Try again"}</button></div>`:s.items.length===0?e`<div class="act-empty"><div class="act-empty-ic">🔔</div><b>You’re all caught up</b><p class="muted">Cheers, requests and your buddies’ milestones will show up here.</p></div>`:$.length===0?e`<div class="act-empty sm"><b>Nothing here</b><p class="muted">No ${Xa.find(p=>p.value===i).label.toLowerCase()} in the last 60 days.</p></div>`:m.map(p=>e`<section class="act-group" key=${p.b}>
          <h3 class="act-gh">${p.b}</h3>
          <div class="act-card">
            ${p.rows.map(y=>y.group?e`<${gs} key=${y.id} unread=${y.items.some(S=>!S.read)} onClear=${()=>Ne(y.items.map(S=>S.id),`Cleared ${y.items.length}`)} onToggle=${()=>vs(y.items.map(S=>S.id))}>${v(y)}<//>`:e`<${gs} key=${y.id} unread=${!y.read} onClear=${()=>Ne([y.id],"Cleared")} onToggle=${()=>vs([y.id])}>${y.kind==="milestone"?h(y):b(y)}<//>`)}
          </div>
        </section>`):e`<${me} rows=${5} avatar />`}
      ${s.items.length>0&&e`<p class="muted center tiny act-foot">Swipe left to clear, right to mark as read or unread. Kept for 60 days.</p>`}
    </div>`}var Zt=[{tab:"home",e:"🏠",t:"Home",d:"Your streaks, money saved and what your body is doing right now. Craving? The big “Tap here” button gives you five minutes of guided breathing. The 🔔 at the top shows cheers from buddies."},{tab:"checkin",e:"✍️",t:"Check-in",d:"Twenty seconds a day: mood, cravings and sleep. The red dot means you haven’t checked in yet today. It’s how Novum spots your patterns."},{tab:"fitness",e:"🏋️",t:"Fitness",d:"Log workouts set by set, follow a starter plan, and keep your goals and habits here too."},{tab:"progress",e:"📈",t:"Progress",d:"Rings, charts and your check-in calendar, so you can see how far you’ve come."},{tab:"profile",e:"🤝",t:"Profile",d:"Add buddies by username, choose what they see, set up notifications and change your avatar. Quitting is easier together."}],Ss=new Set,Cs=!1;function rn(){Cs=!0,Ss.forEach(t=>t(!0))}function oi({s:t,go:s}){let[n,a]=g(!t.tourDone||Cs),[o,i]=g(0),[l,d]=g(null);if(K(()=>{let u=b=>{i(0),a(b)};return Ss.add(u),()=>Ss.delete(u)},[]),K(()=>{n&&s(Zt[o].tab,{quiet:!0})},[n,o]),Is(()=>{if(!n){document.documentElement.classList.remove("touring");return}document.documentElement.classList.add("touring");let u=()=>{let b=document.querySelectorAll(".tabbar .tab")[o];if(b){let h=b.getBoundingClientRect();d(h.left+h.width/2)}};return u(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u),document.documentElement.classList.remove("touring")}},[n,o]),!n)return null;let c=Zt[o],r=o===Zt.length-1,$=()=>{A(15),Cs=!1,a(!1),s("home",{quiet:!0}),x().tourDone||I(u=>{u.tourDone=!0})},m=()=>{A(),r?$():i(o+1)};return e`<div class="tour" role="dialog" aria-modal="true" aria-label="Novum tour">
    <div class="tour-dim" onClick=${m}></div>
    <div class="tour-card" key=${o}>
      <div class="tour-top"><span class="tour-e">${c.e}</span><span class="tour-step">${o+1} of ${Zt.length}</span>
        ${!r&&e`<button class="link sm tour-skip" onClick=${$}>Skip</button>`}</div>
      <h3 class="tour-t">${c.t}</h3>
      <p class="tour-d">${c.d}</p>
      <div class="tour-foot">
        <div class="tour-dots">${Zt.map((u,b)=>e`<i class=${b===o?"on":""}></i>`)}</div>
        <div class="tour-btns">
          ${o>0&&e`<button class="btn btn-plain sm" onClick=${()=>{A(),i(o-1)}}>Back</button>`}
          <button class="btn btn-primary sm" onClick=${m}>${r?"Let’s go":"Next"}</button>
        </div>
      </div>
    </div>
    ${l!=null&&e`<i class="tour-arrow" key=${"a"+o} style=${`left:${l}px`}></i>`}
  </div>`}var cn=864e5,dn=t=>Yt(t).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});function ee(){A(),L(t=>e`<${In} close=${t} />`,{tall:!0})}function In({close:t}){let[s,n]=g(x()),a=()=>n(x()),o=W(),i=s.events.filter(d=>d.date>=o&&!d.outcome).sort((d,c)=>d.date.localeCompare(c.date)),l=dt.filter(d=>s.plans[d]);return e`
    <${M} title="Plan ahead" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Deciding what you’ll do <i>before</i> a craving hits makes you far more likely to stick to it.</p>
      <${D} header="Tough days coming up" footer="Novum reminds you the evening before and on the morning, then asks how it went.">
        ${i.map(d=>e`<${B} key=${d.id} icon=${d.emoji} iconBg="#FF9F0A" title=${d.title} detail=${d.date===o?"Today":dn(d.date)} chevron
          onClick=${()=>Fe(d,a)} />`)}
        <${B} icon=${f.plus()} iconBg="#FF9F0A" title="Add a tough day" chevron onClick=${()=>Fe(null,a)} />
      <//>
      <${D} header="If-then plans" footer="When you use Craving SOS and say what set it off, your plan shows straight away.">
        ${l.map(d=>e`<${B} key=${d} icon="🧭" iconBg="#5E5CE6" title=${`If: ${d.toLowerCase()}`} sub=${`Then: ${s.plans[d]}`} chevron onClick=${()=>As(d,a)} />`)}
        ${dt.filter(d=>!s.plans[d]).length>0&&e`<div class="plan-add">
          <span class="plan-add-k">Add a plan for…</span>
          <div class="chip-row">${dt.filter(d=>!s.plans[d]).map(d=>e`<button key=${d} class="chip" style="--c:#5E5CE6" onClick=${()=>As(d,a)}>${d}</button>`)}</div>
        </div>`}
      <//>
    </div>`}function As(t,s){L(n=>e`<${Fn} trigger=${t} close=${()=>{n(),s?.()}} />`)}function Fn({trigger:t,close:s}){let[n,a]=g(x().plans[t]||""),o=()=>{A(12),I(i=>{i.plans={...i.plans},n.trim()?i.plans[t]=n.trim().slice(0,120):delete i.plans[t]}),E(n.trim()?"Plan saved 🧭":"Plan removed"),s()};return e`
    <${M} title=${`If: ${t.toLowerCase()}`} left=${e`<button class="link" onClick=${s}>Cancel</button>`} right=${e`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="Then I’ll…">
        <textarea class="note" rows="2" maxlength="120" placeholder="e.g. go for a 10-minute walk" value=${n} onInput=${i=>a(i.target.value)}></textarea>
      <//>
      <${D} header="Ideas">
        <div class="chip-row">${(re[t]||re.Other).map(i=>e`<button key=${i} class="chip ${n===i?"on":""}" style="--c:#5E5CE6" onClick=${()=>{A(),a(i)}}>${i}</button>`)}</div>
      <//>
      ${x().plans[t]&&e`<button class="btn btn-plain danger block" onClick=${()=>{a(""),I(i=>{i.plans={...i.plans},delete i.plans[t]}),E("Plan removed"),s()}}>Remove this plan</button>`}
    </div>`}function Fe(t,s){L(n=>e`<${qn} ev=${t} close=${()=>{n(),s?.()}} />`,{tall:!0})}function qn({ev:t,close:s}){let[n,a]=g(t||{title:"",emoji:"🎉",date:W(lt(new Date,1)),trigger:"",plan:""}),o=r=>$=>a({...n,[r]:$.target.value}),i=n.title.trim()&&n.date,l=()=>{if(!i)return;A(12);let r={...n,title:n.title.trim().slice(0,40),plan:(n.plan||"").trim().slice(0,160)};I($=>{t?$.events=$.events.map(m=>m.id===t.id?{...m,...r}:m):$.events=[...$.events,{...r,id:rt(),outcome:null}]}),E(t?"Saved":"Added. You’ll get a reminder the evening before 📅"),s()},d=n.trigger?re[n.trigger]||[]:[],c=n.trigger&&x().plans[n.trigger];return e`
    <${M} title=${t?"Tough day":"Add a tough day"} left=${e`<button class="link" onClick=${s}>Cancel</button>`} right=${e`<button class="link b" disabled=${!i} onClick=${l}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="What’s happening?">
        <div class="ev-title"><input class="ev-emoji-in" aria-label="Emoji" maxlength="4" value=${n.emoji} onInput=${o("emoji")} />
          <input placeholder="e.g. Jake’s party" maxlength="40" value=${n.title} onInput=${o("title")} /></div>
        <div class="emoji-strip">${Gs.map(r=>e`<button key=${r} class=${n.emoji===r?"on":""} onClick=${()=>a({...n,emoji:r})}>${r}</button>`)}</div>
      <//>
      <${D} header="When?">
        <label class="field"><span class="field-l">Date</span><span class="field-c"><input type="date" min=${W()} value=${n.date} onInput=${o("date")} /></span></label>
      <//>
      <${D} header="What might set you off?">
        <div class="chip-row">${dt.map(r=>e`<button key=${r} class="chip ${n.trigger===r?"on":""}" style="--c:#FF9F0A" onClick=${()=>{A(),a({...n,trigger:n.trigger===r?"":r})}}>${r}</button>`)}</div>
      <//>
      <${D} header="My plan" footer=${c&&!n.plan?e`Your if-then plan for ${n.trigger.toLowerCase()}: <b>${c}</b>. <button class="link sm" onClick=${()=>a({...n,plan:c})}>Use it</button>`:"Shown on the day and in your reminder."}>
        <textarea class="note" rows="3" maxlength="160" placeholder="e.g. Leave by 11, stick to soft drinks, text Amy if it gets hard" value=${n.plan} onInput=${o("plan")}></textarea>
        ${d.length>0&&e`<div class="chip-row pad-chips">${d.map(r=>e`<button key=${r} class="chip" style="--c:#FF9F0A" onClick=${()=>{A(),a({...n,plan:n.plan?`${n.plan.replace(/[.\s]*$/,"")}. ${r}`:r})}}>＋ ${r}</button>`)}</div>`}
      <//>
      ${t&&e`<button class="btn btn-plain danger block" onClick=${()=>{I(r=>{r.events=r.events.filter($=>$.id!==t.id)}),E("Removed"),s()}}>Delete</button>`}
    </div>`}function un({s:t}){let s=W(),n=W(lt(new Date,-3)),a=W(lt(new Date,14)),o=t.events.filter(c=>!c.outcome&&c.date<s&&c.date>=n),i=t.events.filter(c=>!c.outcome&&c.date===s),l=t.events.filter(c=>!c.outcome&&c.date>s&&c.date<=a).sort((c,r)=>c.date.localeCompare(r.date));if(!o.length&&!i.length&&!l.length)return null;let d=(c,r)=>{A(r==="quit"?20:10),I($=>{$.events=$.events.map(m=>m.id===c.id?{...m,outcome:r}:m)}),E(r==="quit"?`You got through ${c.title} 💪 That’s huge.`:"Thanks for being honest. Next time, adjust the plan.")};return e`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Plan ahead</h2><button class="link sm" onClick=${ee}>See all</button></div>
    <div class="stack">
      ${o.map(c=>e`<div class="card ev-card ask" key=${c.id}>
        <div class="ev-top"><span class="ev-e">${c.emoji}</span><span class="row-main"><b>How did ${c.title} go?</b><small>${dn(c.date)}</small></span></div>
        <div class="act-btns"><button class="btn btn-primary sm" onClick=${()=>d(c,"quit")}>Stayed quit 💪</button><button class="btn btn-plain sm" onClick=${()=>d(c,"slip")}>I slipped</button></div>
      </div>`)}
      ${i.map(c=>e`<button class="card ev-card today tap" key=${c.id} onClick=${()=>Fe(c)}>
        <div class="ev-top"><span class="ev-e">${c.emoji}</span><span class="row-main"><span class="ev-k">Today</span><b>${c.title}</b></span></div>
        ${c.plan?e`<p class="ev-plan"><span>Your plan</span>${c.plan}</p>`:e`<p class="ev-plan empty">No plan yet. Tap to add one.</p>`}
      </button>`)}
      ${l.length>0&&e`<div class="card list">${l.map(c=>{let r=Hs(new Date,Yt(c.date));return e`<${B} key=${c.id} icon=${c.emoji} iconBg="#FF9F0A" title=${c.title} detail=${r===1?"Tomorrow":`in ${r} days`} chevron onClick=${()=>Fe(c)} />`})}</div>`}
    </div>
  </section>`}function pn({s:t,picked:s,onPick:n}){let a=s.map(i=>t.plans[i]&&{t:i,p:t.plans[i]}).filter(Boolean)[0],o=[...dt].sort((i,l)=>(t.plans[l]?1:0)-(t.plans[i]?1:0));return e`<div class="sos-plan">
    <div class="sos-plan-k">What set it off?</div>
    <div class="sos-plan-chips">${o.map(i=>e`<button key=${i} class="chip sm ${s.includes(i)?"on":""} ${t.plans[i]?"has":""}" style="--c:#5E5CE6" onClick=${()=>{A(),n(i)}}>${t.plans[i]?"🧭 ":""}${i}</button>`)}</div>
    ${a?e`<div class="card sos-plan-card" key=${a.t}><span class="spc-k">Your plan for ${a.t.toLowerCase()}</span><b>${a.p}</b></div>`:s.length>0?e`<button class="link sm sos-plan-add" onClick=${()=>As(s[0])}>No plan for ${s[0].toLowerCase()} yet. Make one for next time</button>`:null}
  </div>`}var Ie=t=>{let s=[...t].sort((a,o)=>a-o),n=s.length;return n?n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2:null},te=t=>t<60?`${Math.max(1,Math.round(t))} sec`:`${Math.round(t/60)} min`;function Ln(t,s=Date.now()){let n=t.cravings.filter(c=>c.t<=s),a=n.filter(c=>c.beaten),o=a.filter(c=>c.secs>5),i=ce(new Date(s)).getTime(),l=Array.from({length:8},(c,r)=>{let $=i-(7-r)*7*cn,m=$+7*cn,u=n.filter(b=>b.t>=$&&b.t<m);return{from:$,n:u.length,secs:Ie(u.filter(b=>b.beaten&&b.secs>5).map(b=>b.secs))}}),d=null;if(o.length>=6){let c=Math.floor(o.length/3),r=[...o].sort((u,b)=>u.t-b.t),$=Ie(r.slice(0,c).map(u=>u.secs)),m=Ie(r.slice(-c).map(u=>u.secs));d={from:$,to:m}}return{total:n.length,beaten:a.length,typical:Ie(o.map(c=>c.secs)),weeks:l,trend:d}}function $n({s:t}){let s=Ln(t);if(!s.total)return null;let n=Math.max(1,...s.weeks.map(i=>i.n)),a=Math.round(s.beaten/s.total*100),o=s.trend&&s.trend.to<s.trend.from*.85?`Your cravings are getting shorter: from about ${te(s.trend.from)} to ${te(s.trend.to)}.`:s.trend&&s.trend.to>s.trend.from*1.15?`Cravings have been lasting a bit longer lately (${te(s.trend.to)}). Tough patches pass. Keep using SOS.`:s.typical?`Most of your cravings pass in about ${te(s.typical)}. You only ever have to outlast this one.`:"Use Craving SOS when one hits to see how long they last.";return e`<section class="group">
    <h2 class="group-h">Craving SOS</h2>
    <div class="card pad cstats">
      <div class="cs-tiles">
        <div><b>${s.typical?te(s.typical):"–"}</b><span>typical craving</span></div>
        <div><b>${s.beaten}<small>/${s.total}</small></b><span>beaten (${a}%)</span></div>
      </div>
      <div class="cs-chart" aria-label="Cravings per week, last 8 weeks">
        ${s.weeks.map((i,l)=>e`<div class="cs-col" key=${l}>
          <span class="cs-n">${i.n||""}</span>
          <span class="cs-bar" style=${`height:${i.n/n*100}%`}></span>
          <span class="cs-d">${l===7?"Now":new Date(i.from).toLocaleDateString("en-GB",{day:"numeric",month:"short"}).replace(" "," ")}</span>
        </div>`)}
      </div>
      <p class="insight">${o}</p>
      <p class="tiny muted">Cravings per week from Craving SOS. Typical time is from opening SOS to tapping “I beat it”.</p>
    </div>
  </section>`}var Bn=aa(()=>import("./c-U6DBJVHK.js"),"FlowGame",()=>e`<div class="lazy-wait" role="status">Loading the puzzle…</div>`),Pn=300,On=["Breathe in","Hold","Breathe out"];function yi({compact:t}){return e`<button class="sos tap ${t?"compact":""}" onClick=${se}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!t&&e`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${f.chevron()}</span>
  </button>`}function se(){L(t=>e`<${Rn} close=${t} />`,{tall:!0})}function Rn({close:t}){let s=x(),[n]=g(Date.now()),a=Q(250),[o,i]=g("ride"),[l,d]=g("breathe"),[c,r]=g(!0),[$,m]=g(s.quits.map(T=>T.id)),[u,b]=g([]),[h,v]=g([]),[p,y]=g(0),S=(a-n)/1e3,w=Math.max(0,Pn-Math.floor(S)),k=S%14,F=k<4?0:k<8?1:2,O=$t(F);K(()=>{o==="ride"&&O.current!==F&&(O.current=F,A(F===0?12:6))},[F]);let[Rt]=g(()=>{let T=s.quits,U=T.reduce((_,Ct)=>_+J(Ct,R(Ct)),0),pt=[...Ws].sort(()=>Math.random()-.5).slice(0,4),it=s.reasons.map(_=>({k:"Your reason",e:"💙",t:_.text})),Wt=[{k:"Money saved",e:"💷",t:`${G(U)} so far. This craving wants to take that back.`}];T.forEach(_=>{let Ct=R(_)/H,Be=ge(Ct);Wt.push({k:`${_.label}-free`,e:_.emoji,t:`${Math.floor(Ct)} days in.${Be.next?` ${Be.next.label} in ${gt(Be.next.days-Ct)}. Don’t reset the clock for five minutes of nothing.`:""}`})}),pt.forEach(_=>Wt.push({k:"Try this now",e:_.e,t:_.t}));let Le=[];for(let _=0;_<Math.max(it.length,Wt.length);_++)it[_]&&Le.push(it[_]),Wt[_]&&Le.push(Wt[_]);return Le}),vt=Rt[Math.floor(S/9)%Rt.length],[P,C]=g(null);K(()=>{Xe("open").then(C).catch(()=>{})},[]);let q=T=>{A(15),r(T),y(Math.round(S)),i("log"),T&&Xe("beaten").catch(()=>{})},V=(T,U,pt)=>{A(),U(T.includes(pt)?T.filter(it=>it!==pt):[...T,pt])},ot=()=>{let T=s.cravings.filter(U=>U.beaten).length+(c?1:0);I(U=>U.cravings.push({id:rt(),t:Date.now(),quitIds:$,triggers:u,beaten:c,secs:p})),h.forEach(U=>pe(U)),t(),E(c?`Craving beaten. That’s ${T} 🛡️`:h.length?"Counter restarted. Go again.":"Logged. Keep going.")};if(o==="log")return e`
      <${M} title=${c?"Craving beaten":"That’s okay"} right=${e`<button class="link b" onClick=${ot}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${c?"🛡️":"🤝"}</div>
          <h2>${c?"You rode it out.":"One slip doesn’t undo the work."}</h2>
          <p class="muted">${c?`${p<60?"Under a minute":`${Math.round(p/60)} minute${Math.round(p/60)===1?"":"s"}`} and it passed. Every craving you beat makes the next one weaker.`:"Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern."}</p>
        </div>
        <${D} header="Which craving?">
          <div class="chip-row">${s.quits.map(T=>e`<button class="chip big ${$.includes(T.id)?"on":""}" style="--c:${T.color}" onClick=${()=>V($,m,T.id)}>${T.emoji} ${T.label}</button>`)}</div>
        <//>
        <${D} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${dt.map(T=>e`<button class="chip big ${u.includes(T)?"on":""}" style="--c:#3B9BFF" onClick=${()=>V(u,b,T)}>${T}</button>`)}</div>
        <//>
        ${!c&&e`<${D} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${s.quits.filter(T=>$.includes(T.id)).map(T=>e`<div class="row" key=${T.id}>
            <span class="row-ic tint-ic" style="--c:${T.color}">${T.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${T.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${et} on=${h.includes(T.id)} label=${`Restart ${T.label}`} onChange=${()=>V(h,v,T.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${ot}>Save</button>
      </div>`;let ft=Math.floor(w/60),St=X(w%60);return e`
    <${M} title="Craving SOS" left=${e`<button class="link" onClick=${t}>Close</button>`} />
    <div class="sheet-body sos-body">
      ${l==="game"?e`<${Bn} onExit=${()=>{A(),d("breathe")}} />`:e`
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${On[F]}</div>
      </div>
      <div class="sos-timer">${w>0?e`<b>${ft}:${St}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`:e`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      ${P&&e`<p class="sos-pulse">🌍 ${P.now>0?e`<b>${P.now===1?"Someone else is":`${P.now} others are`}</b> riding one out right now. `:""}${P.beaten>0?e`<b>${P.beaten}</b> craving${P.beaten===1?"":"s"} beaten on Novum in the last day. You’re next.`:"You’re not alone in this. Every craving passes."}</p>`}
      <${wa} s=${s} />
      <${pn} s=${s} picked=${u} onPick=${T=>b(u.includes(T)?u.filter(U=>U!==T):[...u,T])} />
      <div class="card sos-card" key=${vt.t}>
        <span class="sos-card-e">${vt.e}</span>
        <div><div class="sos-card-k">${vt.k}</div><div class="sos-card-t">${vt.t}</div></div>
      </div>
      <button class="sos-game" onClick=${()=>{A(),d("game")}}><span>🧩</span><span class="row-main"><b>Play a 2-minute puzzle instead</b><small>Keeping your eyes and mind busy weakens the craving</small></span></button>
      ${s.reasons.length===0&&e`<button class="link sm center-link" onClick=${Pt}>Add your reasons for quitting, so they show up here</button>`}`}
      <${jn} />
      <div class="sos-actions">
        <button class="btn btn-primary block big ${w===0?"glow":""}" onClick=${()=>q(!0)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${()=>q(!1)}>I gave in</button>
      </div>
    </div>`}function Pt(){L(t=>e`<${Wn} close=${t} />`,{tall:!0})}function Wn({close:t}){let s=x(),[n,a]=g(""),o=l=>{l=l.trim(),l&&(A(10),I(d=>d.reasons.push({id:rt(),text:l})),a(""))},i=new Set(s.reasons.map(l=>l.text));return e`
    <${M} title="My reasons" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${n} maxlength="140" onInput=${l=>a(l.target.value)} onKeyDown=${l=>l.key==="Enter"&&o(n)} />
        <button class="btn btn-primary sm" disabled=${!n.trim()} onClick=${()=>o(n)}>Add</button>
      </div>
      ${s.reasons.length>0&&e`<${D} header="Your reasons">
        ${s.reasons.map(l=>e`<div class="row" key=${l.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${l.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${()=>I(d=>{d.reasons=d.reasons.filter(c=>c.id!==l.id)})}>${f.trash()}</button>
        </div>`)}
      <//>`}
      <${D} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${js.filter(l=>!i.has(l)).map(l=>e`<button class="row tap" key=${l} onClick=${()=>o(l)}>
          <span class="row-main"><span class="row-title">${l}</span></span>
          <span class="add-pill">${f.plus()}</span>
        </button>`)}
      <//>
    </div>`}function jn(){let t=Ce(),[s,n]=g(0),[a,o]=g(0),[i,l]=g([]),[d,c]=g(!1),r=$t(0);if(K(()=>{if(!s)return;let m=async()=>{try{let h=(await ve()).items.filter(v=>v.kind==="cheer"&&v.at>=s-2e3).reverse();h.length>r.current&&A([12,40,12]),r.current=h.length,l(h)}catch{}};m();let u=setInterval(m,6e3);return()=>clearInterval(u)},[s]),!t.loaded||!t.buddies.length)return null;let $=async()=>{if(!d){c(!0),A(12);try{let m=await ga();o(m.sent),n(m.at||Date.now())}catch(m){E(m.message)}c(!1)}};return s?e`<div class="card sos-cheers">
    <div class="sos-cheers-h">💙 Sent to ${a} bud${a===1?"dy":"dies"}. ${i.length?"They’re with you:":"Their cheers will pop up here."}</div>
    ${i.map(m=>{let u=Et.find(b=>b.kind===m.data.kind)||Et[0];return e`<div class="sos-cheer" key=${m.id}><${mt} a=${m.who.avatar} name=${m.who.firstName} size=${30} /><span><b>${m.who.firstName}</b> ${u.e} ${u.l.toLowerCase()}</span></div>`})}
  </div>`:e`<button class="sos-ask" disabled=${d} onClick=${$}>
    <span>🤝</span><span class="row-main"><b>${d?"Asking…":"Ask my buddies for support"}</b><small>They’ll get a notification and can cheer you on</small></span>
  </button>`}function ae(){L(t=>e`<${Yn} close=${t} />`,{tall:!0})}function Yn({close:t}){let s=x(),n=new Set(s.quits.map(v=>v.kind)),a=At.filter(v=>!n.has(v.kind)),[o,i]=g(null),[l,d]=g(""),[c,r]=g(Ht(new Date)),[$,m]=g(""),u=o?Fs(o):null,b=o&&c&&(o!=="other"||l.trim()),h=()=>{A(15),I(v=>v.quits.push({id:o,kind:o,label:o==="other"?l.trim():u.label,emoji:u.emoji,color:u.color,start:c,monthly:parseFloat($)||0,best:0,resets:[]})),t(),E(`${o==="other"?l.trim():u.label} added`)};return e`
    <${M} title="Add something to quit" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!b} onClick=${h}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${a.map(v=>e`<button class="pick ${o===v.kind?"on":""}" style="--c:${v.color}" onClick=${()=>{A(),i(v.kind)}}>
          <span class="pick-e">${v.emoji}</span><span class="pick-l">${v.label}</span><span class="pick-tick">${f.check()}</span></button>`)}
      </div>
      ${o&&e`
        <${D} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${o==="other"&&e`<${Y} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${l} onInput=${v=>d(v.target.value)} /><//>`}
          <${Y} label="Quit at"><input type="datetime-local" value=${c} onInput=${v=>r(v.target.value)} /><//>
          <${Y} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${$} onInput=${v=>m(v.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!b} onClick=${h}>Add</button>`}
    </div>`}function ne(t){L(s=>e`<${Gn} id=${t} close=${s} />`,{tall:!0})}function Gn({id:t,close:s}){let a=x().quits.find(y=>y.id===t),[o,i]=g(a?.start||""),[l,d]=g(String(a?.monthly??0)),[c,r]=g(String(a?Tt(a):20));if(!a)return e`<${M} title="Removed" right=${e`<button class="link b" onClick=${s}>Done</button>`} />`;let $=Ht(lt(new Date,60)),m=o&&!Number.isNaN(Gt(o).getTime())&&o<=$&&parseFloat(l)>=0,u=()=>{m&&(A(12),I(y=>{let S=y.quits.find(k=>k.id===t);S.start=o,S.monthly=parseFloat(l);let w=parseFloat(c);Number.isFinite(w)&&w>=0&&(S.minutes=Math.min(1440,w))}),s())},b=R(a),h=Math.max(a.best||0,b),v=()=>at({title:`Remove ${a.label}`,danger:!0,text:`This removes the ${a.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,confirm:"Remove",onConfirm:()=>{s(),I(y=>{y.quits=y.quits.filter(S=>S.id!==t)}),E(`${a.label} removed`)}}),p=parseFloat(l)||0;return e`
    <${M} title=${`${a.emoji} ${a.label}`} left=${e`<button class="link" onClick=${s}>Cancel</button>`} right=${e`<button class="link b" disabled=${!m} onClick=${u}>Save</button>`} />
    <div class="sheet-body">
      <${D} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${Y} label="Quit at"><input type="datetime-local" value=${o} max=${$} onInput=${y=>i(y.target.value)} /><//>
      <//>
      <${D} header="What it cost you" footer=${`About ${G(p*12/52)} a week, or ${G(p*12,0)} a year. If it varied, use a middle figure.`}>
        <${Y} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${l} onInput=${y=>d(y.target.value)} /><//>
      <//>
      <${D} header="Time it took" footer=${`Minutes a day, roughly: buying, using, recovering.${Oe[a.kind]?` Usually ${Oe[a.kind]} minutes for ${a.kind==="weed"?"cannabis":"nicotine"}.`:""} Used for “time reclaimed” on Home.`}>
        <${Y} label="Per day (min)"><input type="number" inputmode="numeric" min="0" max="1440" value=${c} onInput=${y=>r(y.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(b/H)}</b><span>days now</span></div>
        <div><b>${Math.floor(h/H)}</b><span>best run</span></div>
        <div><b>${(a.resets||[]).length}</b><span>restarts</span></div>
      </div>
      ${ct(a)&&e`<button class="btn btn-plain block" onClick=${()=>oe(t)}>See the health timeline</button>`}
      ${(a.resets||[]).length>0&&a.monthly>0&&e`<p class="muted center tiny">Saved overall, slips included: <b>${G(Us(a),0)}</b></p>`}
      ${b>0&&e`<button class="btn btn-tinted block" onClick=${()=>Se(we([a],b/H,J(a,b)))}>Share my streak</button>`}
      ${b>0&&e`<button class="btn btn-plain block" onClick=${()=>{s(),setTimeout(()=>Ds(t),350)}}>I slipped</button>`}
      <button class="btn btn-plain danger block" onClick=${v}>Remove from Novum</button>
    </div>`}function oe(t){L(s=>e`<${Hn} initial=${t} close=${s} />`,{tall:!0})}function Hn({initial:t,close:s}){let a=x().quits.filter($=>ct($)),[o,i]=g(t),l=a.find($=>$.id===o)||a[0];if(!l)return e`<${M} title="Recovery timeline" right=${e`<button class="link b" onClick=${s}>Done</button>`} />`;let d=R(l)/36e5,c=ct(l)||[],r=$=>$===0?"Before you start":$<1?`${Math.round($*60)} minutes`:$<48?`${$} hours`:$<336?`${Math.round($/24)} days`:$<1440?`${Math.round($/168)} weeks`:$<8760?`${Math.round($/730)} months`:"1 year";return e`
    <${M} title="Recovery timeline" right=${e`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      ${a.length>1&&e`<div class="pad-b"><${z} small=${a.length>3} options=${a.map($=>({value:$.id,label:`${$.emoji} ${$.label}`}))} value=${l.id} onChange=${i} /></div>`}
      <ol class="timeline" style="--c:${l.color}">
        ${c.map($=>{let m=d>=$.h;return e`<li class=${m?"done":""}>
            <span class="tl-dot">${m?f.check():""}</span>
            <div class="tl-when">${r($.h)} · ${$.area}${m?"":e` <em>in ${gt(($.h-d)/24)}</em>`}</div>
            <div class="tl-title">${$.title}</div>
            <div class="tl-text">${$.text}</div>
          </li>`})}
      </ol>
      <p class="disclaimer">${qs}</p>
    </div>`}function Ds(t){L(s=>e`<${Kn} id=${t} close=${s} />`,{tall:!0})}function Kn({id:t,close:s}){let n=x(),a=n.quits.filter(P=>tt(P)<=new Date),[o,i]=g(t&&a.some(P=>P.id===t)?t:a[0]?.id),[l,d]=g("now"),[c,r]=g(Ht(new Date)),[$,m]=g([]),[u,b]=g(""),[h,v]=g(null),p=n.quits.find(P=>P.id===o);if(!p)return e`<${M} title="Slipped up" right=${e`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body"><p class="muted center sheet-intro">There’s no running counter to reset yet.</p></div>`;if(h)return e`
    <${M} right=${e`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body slip-done">
      <div class="wiz-emoji">🌱</div>
      <h2 class="auth-title center">Fresh start</h2>
      <p class="wiz-sub center">Your ${p.label.toLowerCase()} counter starts again now. That’s all a slip is: a restart, not a reset of you.</p>
      <div class="stats3">
        <div><b>${Math.floor(h.best/H)}</b><span>best run (days)</span></div>
        <div><b>${G(h.life,0)}</b><span>saved overall</span></div>
        <div><b>1 day</b><span>next milestone</span></div>
      </div>
      <button class="btn btn-primary block big" onClick=${()=>{s(),setTimeout(se,300)}}>Breathe for a minute</button>
      <button class="btn btn-plain block big" onClick=${s}>I’m okay</button>
    </div>`;let y=l==="now"?new Date:Gt(c),S=l==="now"||!Number.isNaN(y.getTime())&&y<=new Date&&y>=tt(p),w=Math.max(0,(S?y:new Date)-tt(p)),k=Math.max(p.best||0,w),F=Qs(p)-R(p),O=J(p,F+w),Rt=P=>{A(6),m($.includes(P)?$.filter(C=>C!==P):[...$,P])},vt=()=>{S&&(pe(p.id,{at:y,triggers:$,note:u.trim()}),A(15),v({best:k,life:O}))};return e`
    <${M} title="Slipped up" left=${e`<button class="link" onClick=${s}>Cancel</button>`} />
    <div class="sheet-body">
      <div class="slip-hero">
        <div class="wiz-emoji">🤍</div>
        <h2 class="auth-title center">A slip isn’t starting over</h2>
        <p class="wiz-sub center">Most people who quit for good had a few goes first. What matters is the next hour, not the last one.</p>
      </div>
      ${a.length>1&&e`<${D} header="Which one">
        <div class="pad"><${z} options=${a.map(P=>({value:P.id,label:`${P.emoji} ${P.label}`}))} value=${o} onChange=${i} /></div>
      <//>`}
      <${D} header="When" footer=${S?"":e`<span class="err">Pick a time after your quit date and not in the future.</span>`}>
        <div class="pad"><${z} options=${[{value:"now",label:"Just now"},{value:"earlier",label:"Earlier"}]} value=${l} onChange=${d} /></div>
        ${l==="earlier"&&e`<${Y} label="At"><input type="datetime-local" value=${c} max=${Ht(new Date)} onInput=${P=>r(P.target.value)} /><//>`}
      <//>
      <${D} header="What set it off?" footer="Optional. Spotting patterns is how next time goes differently. They show up in Progress.">
        <div class="chip-row">${dt.map(P=>e`<button class="chip big ${$.includes(P)?"on":""}" aria-pressed=${$.includes(P)} onClick=${()=>Rt(P)}>${P}</button>`)}</div>
      <//>
      <${D} header="Anything else?">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="280" placeholder="What happened, how you felt, what might help next time…" value=${u} onInput=${P=>b(P.target.value)}></textarea></div>
      <//>
      <div class="card pad slip-keep">
        <div><span>🏅</span><span>Your best run of <b>${Math.floor(k/H)} day${Math.floor(k/H)===1?"":"s"}</b> stays on record.</span></div>
        ${p.monthly>0&&e`<div><span>💷</span><span>You’ve still saved <b>${G(O,0)}</b> overall. That doesn’t go anywhere.</span></div>`}
      </div>
      <button class="btn btn-primary block big" disabled=${!S} onClick=${vt}>Restart my counter</button>
    </div>`}var wt=864e5;function hn({s:t}){let[s,n]=g(0),a=Ys(t.quits);if(!a.length)return null;let o=new Date,i=Math.floor(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())/wt),l=a[(i*7+s)%a.length];return e`<section class="group">
    <div class="card tip-card">
      <div class="tip-top"><span class="tip-k">${s?"Another tip":"Tip of the day"}</span>
        <button class="link sm tip-next" onClick=${()=>{A(),n(s+1)}} aria-label="Show another tip">Another ↻</button></div>
      <div class="tip-body" key=${l.t}><span class="tip-e" aria-hidden="true">${l.e}</span><p class="tip-t">${l.t}</p></div>
    </div>
  </section>`}var zn=[{value:182,label:"6 months"},{value:365,label:"1 year"}];function _n(t,s,n=Date.now()){let a=n+s*wt,o=t.quits.reduce(($,m)=>$+J(m,R(m,n)),0),i=t.quits.reduce(($,m)=>$+J(m,R(m,a)),0),l=[],d=[];for(let $ of t.quits){let m=R($,n),u=R($,a);for(let h of ct($)||[])h.h*36e5>m&&h.h*36e5<=u&&l.push({q:$,x:h});let b=le.filter(h=>h.days*wt>m&&h.days*wt<=u).pop();b&&d.push({q:$,m:b,days:Math.floor(u/wt)})}let c=[...t.wishlist].sort(($,m)=>$.price-m.price).filter($=>$.price>o&&$.price<=i),r=Math.max(0,...t.quits.map($=>Math.floor(R($,a)/wt)));return{at:a,savedNow:o,savedThen:i,gain:i-o,unlocks:l,milestones:d,wishes:c,days:r}}function mn({s:t}){let s=Q(6e4),[n,a]=g(182);if(!t.quits.length)return null;let o=_n(t,n,s),i=new Date(o.at).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),l=o.unlocks.slice(-4);return e`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Future you</h2>
      <${z} small options=${zn} value=${n} onChange=${a} /></div>
    <div class="card fy-card">
      <p class="fy-when">On <b>${i}</b>, if you keep going:</p>
      <div class="fy-stats">
        ${o.savedThen>0&&e`<div class="fy-stat fy-saved"><span class="fy-k">💷 Saved</span><b>${G(o.savedThen,0)}</b><small>+${G(o.gain,0)} from today</small></div>`}
        <div class="fy-stat fy-free"><span class="fy-k">🗓️ Free for</span><b>${o.days} days</b><small>${o.milestones.length?`${o.milestones[o.milestones.length-1].m.label} badge earned`:"and counting"}</small></div>
      </div>
      ${l.length>0&&e`<div class="fy-list">
        <div class="fy-lh">What your body will have done</div>
        ${l.map(({q:d,x:c})=>e`<div class="fy-row" key=${d.id+c.h}>
          <span class="fy-ic tint-ic" style="--c:${d.color}">${d.emoji}</span>
          <span class="fy-main"><b>${c.title}</b><span>${c.text}</span></span>
        </div>`)}
        ${o.unlocks.length>l.length&&e`<div class="fy-more">and ${o.unlocks.length-l.length} more changes before that</div>`}
      </div>`}
      ${o.wishes.length>0&&e`<div class="fy-wish">🎁 Enough for ${o.wishes[o.wishes.length-1].emoji} <b>${o.wishes[o.wishes.length-1].name}</b>${o.wishes.length>1?` and ${o.wishes.length-1} more on your list`:""}</div>`}
    </div>
    <p class="group-f">Based on what you used to spend. Health changes are typical timings, not medical advice.</p>
  </section>`}function Qn(t,s=Date.now()){let n=t.quits.reduce((o,i)=>o+R(i,s)/wt*Tt(i),0),a=t.quits.filter(o=>tt(o).getTime()<=s).reduce((o,i)=>o+Tt(i),0);return{hours:n/60,perDay:a}}var Un=t=>t>=60?`${Math.floor(t/60)}h${t%60?` ${Math.round(t%60)}m`:""}`:`${Math.round(t)} min`;function Jn(t){return t<1?"Every minute counts. It adds up fast.":t<8?`That’s about ${Math.max(1,Math.round(t*60/45))} episodes of a show.`:t<60?`That’s about ${Math.round(t/2)} films, or ${Math.round(t/1.5)} football matches.`:t<300?`That’s ${Math.round(t/24)} full days, or ${Math.round(t/8)} working days.`:`That’s ${Math.round(t/24)} full days of your life back.`}function bn({s:t}){let s=Q(6e4),n=Qn(t,s);return!t.quits.length||!n.perDay?null:e`<section class="group">
    <h2 class="group-h">Time reclaimed</h2>
    <button class="card time-card tap" onClick=${Vn}>
      <div class="tc-big"><span class="tc-ic" aria-hidden="true">⏳</span><b>${n.hours>=10?Math.round(n.hours):n.hours.toFixed(1)}</b><span>hours of your life back</span></div>
      <div class="tc-sub">About ${Un(n.perDay)} a day you’re not spending on it. ${Jn(n.hours)}</div>
    </button>
  </section>`}function Vn(){A(),L(t=>e`<${Xn} close=${t} />`)}function Xn({close:t}){let s=x(),[n,a]=g(Object.fromEntries(s.quits.map(i=>[i.id,String(Tt(i))]))),o=()=>{A(12),I(i=>{i.quits.forEach(l=>{let d=parseFloat(n[l.id]);Number.isFinite(d)&&d>=0&&(l.minutes=Math.min(1440,d))})}),t()};return e`
    <${M} title="Time it took" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Roughly how many minutes a day did each one take? Buying, using, being away, recovering. A middle guess is fine.</p>
      <div class="card list">${s.quits.map(i=>e`<label class="field" key=${i.id}><span class="field-l">${i.emoji} ${i.label}</span>
        <span class="field-c"><input type="number" inputmode="numeric" min="0" max="1440" value=${n[i.id]} onInput=${l=>a({...n,[i.id]:l.target.value})} /> min</span></label>`)}</div>
      <p class="muted center tiny mt12">As a guide: nicotine usually takes 10–30 minutes a day, cannabis 10–45.</p>
    </div>`}var Zn=ht(()=>import("./c-24WBN7R7.js"),"startWorkout"),to=ht(()=>import("./c-24WBN7R7.js"),"openLogger");function vn({s:t,go:s}){let n=t.fitness||{},a=n.active,o=m=>Math.max(0,...(n.workouts||[]).filter(u=>u.rid===m.id).map(u=>u.start)),i=[...n.routines||[]].sort((m,u)=>o(m)-o(u))[0],l=(n.workouts||[]).some(m=>W(new Date(m.start))===W()),[d,c,r,$]=a?[a.name,"Workout in progress","Resume",to]:l?["Trained today",i?`Next up: ${i.name}`:"Nice work","Open",()=>s("fitness")]:i?[i.name,`Up next · ${i.ex.length} exercise${i.ex.length===1?"":"s"}`,"Start",()=>Zn(i)]:["Start training","Pick a starter plan or log a workout","Go",()=>s("fitness")];return e`<button class="card fx-home tap ${a?"live":""}" onClick=${$}>
    <span class="row-ic tinted fx-home-ic" style="--c:#30D158">${l&&!a?f.check():f.dumbbell()}</span>
    <span class="row-main"><span class="row-title">${d}</span><span class="row-sub">${c}</span></span>
    <span class="btn btn-tinted sm">${r}</span>
  </button>`}function Xi({s:t,go:s}){let n=Q(6e4),a=W(),o=t.checkins[a],i=t.quits.reduce((k,F)=>k+(F.monthly||0),0),l=new Date(n).getHours(),d=l<5?"Up late":l<12?"Good morning":l<18?"Good afternoon":"Good evening",c=t.goals.filter(k=>k.type==="habit"),r=t.quits.length>0,$=r&&t.quits.every(k=>k.start===t.quits[0].start),[m,u]=g(null),b=t.quits.find(k=>k.id===m)||t.quits[0],h=b?R(b,n)/H:0,v=Math.ceil((xt-n)/H),p=t.quits.filter(k=>ct(k)),y=t.quits.filter(k=>R(k,n)>0),S=()=>{A();let k=Math.min(...y.map(F=>R(F,Date.now())/H));Se(we(y,k,y.reduce((F,O)=>F+J(O,R(O,Date.now())),0)))},w=()=>Promise.all([Promise.resolve(nt()).catch(()=>{}),Ft(),ut()]);return e`<${kt} title="Novum" eyebrow=${new Date(n).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}
      sub=${ie} titleRight=${e`<${nn} />`} onRefresh=${w}>
    <p class="greet"><button class="greet-av" aria-label="Your profile" onClick=${()=>s("profile")}><${mt} a=${t.social?.avatar} name=${fe()} size=${36} /></button><span>${d}${fe()?`, ${fe()}`:""}.</span></p>
    <${La} />

    ${!r&&e`<section class="group first"><h2 class="group-h">Training</h2><${vn} s=${t} go=${s} /></section>`}

    <section class="group ${r?"first":""}">
      ${y.length?e`<div class="group-h-row"><h2 class="group-h">Your streaks</h2>
        <button class="link sm b share-link" onClick=${S}>${f.share()} Share</button></div>`:e`<h2 class="group-h">${r?"Your streaks":"Get started"}</h2>`}
      ${r?e`<div class="stack">
        ${t.quits.map(k=>e`<${ao} key=${k.id} q=${k} />`)}
        ${t.quits.length<At.length&&e`<${so} />`}
      </div>`:e`<button class="card add-first tap" onClick=${ae}>
        <span class="row-ic" style="background:#3B9BFF">${f.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${f.chevron()}</span>
      </button>`}
    </section>

    ${r&&e`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${se}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${f.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${()=>Ds()}>
          <span class="sup-slip-e">🌱</span><span class="row-main">Slipped up? <b>Reset without the guilt</b></span><span class="row-chev">${f.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${ee}>
          <span class="sup-slip-e">🧭</span><span class="row-main">Tough day coming? <b>Plan ahead</b></span><span class="row-chev">${f.chevron()}</span>
        </button>
        ${t.reasons.length>0?e`<button class="sup-why" onClick=${Pt}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${t.reasons[Math.floor(n/864e5)%t.reasons.length].text}”</span>
            </button>`:e`<button class="sup-why add" onClick=${Pt}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    <${ka} s=${t} />

    ${r&&e`<${un} s=${t} />`}

    ${r&&e`<${hn} s=${t} />`}

    <${ja} />

    ${i>0&&e`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${Es}>
        <${eo} quits=${t.quits} />
        <div class="mc-sub">${G(i,0)} a month back in your pocket · ${G(i*12,0)} a year</div>
        <${oo} s=${t} />
      </button>
    </section>`}

    ${r&&e`<${bn} s=${t} />`}

    ${r&&e`<${mn} s=${t} />`}

    ${r&&e`<section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!$&&e`<${z} small options=${t.quits.map(k=>({value:k.id,label:k.label}))} value=${b.id} onChange=${u} />`}
      </div>
      <div class="badges">
        ${le.map(k=>{let F=h>=k.days;return e`<div class="badge ${F?"got":""}">
            <div class="badge-medal">${F?f.check():k.short}</div>
            <div class="badge-l">${k.label}</div>
            <div class="badge-s">${F?"Earned":`in ${gt(k.days-h)}`}</div>
          </div>`})}
      </div>
      ${$&&t.quits.length>1&&e`<p class="group-f">Counting for all of them, since you stopped at the same time.</p>`}
    </section>`}

    <section class="group">
      <h2 class="group-h">Today</h2>
      <button class="card checkin-card tap" onClick=${()=>s("checkin")}>
        ${o&&o.mood?e`
          <span class="cc-emoji">${jt[o.mood-1].e}</span>
          <span class="cc-main"><b>Checked in · feeling ${jt[o.mood-1].l.toLowerCase()}</b>
            <span>${t.quits.map(k=>`${k.label} craving ${o[k.id]??"–"}/10`).join(" · ")}</span></span>`:e`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${f.chevron()}</span>
      </button>
      ${r&&e`<div class="mt8"><${vn} s=${t} go=${s} /></div>`}
      ${c.length>0&&e`<div class="card list mt8">
        ${c.map(k=>e`<${no} key=${k.id} g=${k} />`)}
      </div>`}
    </section>

    ${p.length>0&&e`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${p.map(k=>{let F=R(k,n)/36e5,O=ya(k,F);return e`<button class="row tap body-row" onClick=${()=>oe(k.id)}>
            <span class="row-ic tint-ic" style="--c:${k.color}" title=${O.current?O.current.area:"Getting started"}>${O.current?fa(O.current.area):"🌱"}</span>
            <span class="row-main">
              <span class="row-title">${O.current?O.current.title:"Just getting started"}</span>
              <span class="row-sub">${O.current?O.current.text:"Your first changes start within hours."}</span>
              ${O.next&&e`<span class="row-next">Next: ${O.next.title.toLowerCase()} in ${gt(O.next.h/24-F/24)}</span>`}
            </span>
            <span class="row-chev">${f.chevron()}</span>
          </button>`})}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>`}

    ${v>0?e`
      <button class="card ny-card tap" onClick=${Ot}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${v} day${v===1?"":"s"} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`:e`<button class="card ny-card tap" onClick=${()=>s("progress")}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`}function eo({quits:t}){let s=Q(1e3);return e`<div class="mc-big">${G(t.reduce((n,a)=>n+J(a,R(a,s)),0))}</div>`}function so(){return e`<button class="card quit-card qc-add tap" onClick=${ae} aria-label="Add something else to quit">
    <div class="qc-head"><span class="qc-add-ic">${f.plus()}</span><span class="qc-label">Quitting something else?</span></div>
    <div class="qc-body">
      <div class="qc-time" aria-hidden="true">
        <span><b>0</b><small>days</small></span><span><b>00</b><small>hrs</small></span><span><b>00</b><small>min</small></span>
      </div>
      <span class="qc-add-ring" aria-hidden="true">${f.plus()}</span>
    </div>
    <div class="qc-foot">Smoking, alcohol, gambling, energy drinks and more. Each gets its own counter.</div>
  </button>`}function ao({q:t}){let s=Q(1e3),n=tt(t).getTime();if(n>s){let{d:$,h:m,m:u}=We(n-s);return e`<button class="card quit-card tap" onClick=${()=>ne(t.id)} style="--qc:${t.color}">
      <div class="qc-head"><span class="qc-emoji">${t.emoji}</span><span class="qc-label">${t.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${$}</b><small>${$===1?"day":"days"}</small></span><span><b>${X(m)}</b><small>hrs</small></span><span><b>${X(u)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${tt(t).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}. You’ve got this.</div>
    </button>`}let a=R(t,s),{d:o,h:i,m:l,s:d}=We(a),c=a/H,r=ge(c);return e`<button class="card quit-card tap" onClick=${()=>ne(t.id)} style="--qc:${t.color}">
    <div class="qc-head"><span class="qc-emoji">${t.emoji}</span><span class="qc-label">${t.label}-free</span>
      ${t.monthly>0&&e`<span class="qc-saved">${G(J(t,a))} saved</span>`}</div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${o}</b><small>${o===1?"day":"days"}</small></span>
        <span><b>${X(i)}</b><small>hrs</small></span>
        <span><b>${X(l)}</b><small>min</small></span>
        <span class="qc-sec"><b>${X(d)}</b><small>sec</small></span>
      </div>
      <${Kt} pct=${r.pct} size=${70} stroke=${8} color=${t.color}>
        ${r.next?e`<span class="ring-txt" aria-label=${`Next milestone ${Ze[r.next.days]}, ${ts(r.next.days-c)} to go`}><small>next</small><b>${Ze[r.next.days]}</b><small>in ${ts(r.next.days-c)}</small></span>`:e`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${r.next?`Next milestone: ${r.next.label}, in ${gt(r.next.days-c)}`:"Every milestone earned. Legend."}</div>
  </button>`}function no({g:t}){let s=(t.ticks||[]).includes(W()),n=Nt(t);return e`<div class="row">
    <span class="row-ic" style="background:${t.color}">${t.emoji}</span>
    <span class="row-main"><span class="row-title">${t.name}</span>
      <span class="row-sub">${n.value>0?`🔥 ${n.value} ${n.unit} streak`:ye(t)}</span></span>
    <button class="tick ${s?"on":""}" style="--c:${t.color}" aria-pressed=${s} aria-label=${`Mark ${t.name} done today`}
      onClick=${a=>{a.stopPropagation(),It(t.id)}}>${f.check()}</button>
  </div>`}var qe=(t,s=Date.now())=>t.quits.reduce((n,a)=>n+J(a,R(a,s)),0);function oo({s:t}){let s=Q(6e4),n=qe(t,s),a=[...t.wishlist].sort((l,d)=>l.price-d.price);if(!a.length)return e`<div class="wish-line add">🎁 What could it buy? <b>Add something to save for</b></div>`;let o=a.filter(l=>l.price<=n),i=a.find(l=>l.price>n);return e`<div class="wish-line">
    ${o.length>0&&e`<div class="wl-got">✓ That’s ${o[o.length-1].emoji} ${o[o.length-1].name}${o.length>1?` and ${o.length-1} more`:""}</div>`}
    ${i&&e`<div class="wl-next"><span>Next: ${i.emoji} ${i.name}</span><b>${Math.floor(n/i.price*100)}%</b></div>
      <div class="wl-bar"><i style="width:${Math.min(100,n/i.price*100)}%"></i></div>`}
  </div>`}function Es(){L(t=>e`<${io} close=${t} />`,{tall:!0})}function io({close:t}){let s=x(),n=Q(1e3),a=qe(s,n),[o,i]=g("🎁"),[l,d]=g(""),[c,r]=g(""),$=[...s.wishlist].sort((h,v)=>h.price-v.price),m=new Set(s.wishlist.map(h=>h.name.toLowerCase())),u=h=>{A(10),I(v=>{v.wishlist.push({id:rt(),emoji:h.emoji||"🎁",name:h.name.trim().slice(0,40),price:+h.price})})},b=l.trim()&&parseFloat(c)>0;return e`
    <${M} title="What it could buy" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="wish-hero"><div class="kicker">Saved by quitting</div><div class="mc-big">${G(a)}</div>
        <p class="muted">Money you’d have spent. Put some aside and treat yourself when you hit one.</p></div>
      ${$.length>0&&e`<${D} header="Saving for">
        ${$.map(h=>{let v=Math.min(1,a/h.price);return e`<div class="row wish-row" key=${h.id}>
            <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
            <span class="row-main"><span class="row-title">${h.name}</span>
              <span class="row-sub">${v>=1?"✓ You could buy this now":`${G(h.price-a,0)} to go · ${Math.floor(v*100)}%`}</span>
              <span class="wl-bar"><i style="width:${v*100}%;${v>=1?"background:var(--green)":""}"></i></span></span>
            <span class="row-detail">${G(h.price,0)}</span>
            <button class="icon-btn muted" aria-label=${`Remove ${h.name}`} onClick=${()=>I(p=>{p.wishlist=p.wishlist.filter(y=>y.id!==h.id)})}>${f.trash()}</button>
          </div>`})}
      <//>`}
      <${D} header="Add your own">
        <div class="wish-add">
          <input class="wish-emoji" aria-label="Emoji" maxlength="4" value=${o} onInput=${h=>i(h.target.value)} />
          <input placeholder="e.g. Festival ticket" maxlength="40" value=${l} onInput=${h=>d(h.target.value)} />
          <span class="wish-price">£<input type="number" inputmode="decimal" placeholder="0" value=${c} onInput=${h=>r(h.target.value)} /></span>
          <button class="btn btn-primary sm" disabled=${!b} onClick=${()=>{u({emoji:o,name:l,price:parseFloat(c)}),d(""),r(""),i("🎁")}}>Add</button>
        </div>
      <//>
      ${Pe.some(h=>!m.has(h.name.toLowerCase()))&&e`<${D} header="Ideas" footer="Rough prices. Add one, then delete and re-add it with your own price if it’s different.">
        ${Pe.filter(h=>!m.has(h.name.toLowerCase())).map(h=>e`<button class="row tap" key=${h.name} onClick=${()=>u(h)}>
          <span class="row-ic" style="background:var(--fill-2)">${h.emoji}</span>
          <span class="row-main"><span class="row-title">${h.name}</span></span>
          <span class="row-detail">${G(h.price,0)}</span>
          <span class="add-pill">${f.plus()}</span>
        </button>`)}
      <//>`}
    </div>`}var lo=ht(()=>import("./c-RBARGHXB.js"),"openAdmin"),ro=ht(()=>import("./c-O4EGJYLC.js"),"openPrivacy"),co=ht(()=>import("./c-RN6WYK2K.js"),"openCredits"),N={tools:"#3B9BFF",health:"#30D158",social:"#FF9F0A",settings:"#A2A8B8",danger:"#FF453A"};function uo(){let[t,s]=g(za());K(()=>_a(s),[]),Q(3e4);let a={syncing:"Saving…",synced:`Saved to your account ${(i=>{let l=Math.round((Date.now()-i)/6e4);return l<1?"just now":l<60?`${l} min ago`:`${Math.round(l/60)} hr ago`})(t.at)}`,offline:"Offline. Changes save when you’re back online",error:t.error||"Couldn’t save. Tap to retry",idle:"Waiting to save"}[t.state],o={syncing:f.refresh,synced:f.cloud,offline:f.wifiOff,error:f.alert,idle:f.cloud}[t.state]();return e`<${B} icon=${o} tint=${t.state==="error"?N.danger:N.settings} title="Account sync" sub=${a} onClick=${()=>{A(),nt()}} />`}function gn(){let[t,s]=g(x());return K(()=>de(n=>s(n)),[]),t}var po=(t,s)=>`${t} ${s}${t===1?"":"s"}`;function $o({s:t}){let s=Q(6e4),n=t.quits.filter(l=>tt(l).getTime()<=s),a=n.length?Math.max(...n.map(l=>Math.floor(R(l,s)/864e5))):0,o=qe(t,s),i=Js(t);return e`<div class="pstats">
    <div><b>${a}</b><span>${a===1?"day free":"days free"}</span></div>
    <div><b>${G(o,0)}</b><span>saved</span></div>
    <div><b>${i}</b><span>check-in streak</span></div>
  </div>`}function kl({s:t}){let[s,n]=g(0),a=async()=>{await Promise.all([Promise.resolve(nt()).catch(()=>{}),ra().catch(()=>{}),Ft(),ut()]),n(p=>p+1)},o=t.profile,i=st()?.user||{},l=Mt(o),d=$e(l,o.heightCm),c=Ye(d),r=t.quits.filter(p=>ct(p)),$=Ce(),m=Q(6e4),u=zt(),b=Xt(),h=[...new Set(b.items.filter(p=>p.kind==="cheer"&&p.data?.kind==="water"&&m-p.at<7*864e5).map(p=>p.who.firstName))],v=e`<button class="icon-btn gear-btn" aria-label="Account settings" onClick=${So}>${f.gear()}</button>`;return e`<${kt} title="Profile" titleRight=${v} onRefresh=${a}>
    <${Ra} key=${s} s=${t} />
    ${t.quits.length>0&&e`<${$o} s=${t} />`}
    <section class="group"><${Oa} s=${t} waterers=${h} /></section>
    <section class="group"><${Pa} earned=${Ba(t,m)} mine s=${t} /></section>
    <section class="group">
      <button class="card find-card tap" onClick=${()=>Wa("discover")}>
        <span class="row-ic tinted find-ic" style=${`--c:${N.social}`}>${f.search()}</span>
        <span class="row-main"><span class="row-title">Find people</span><span class="row-sub">Search by name or @username, or browse public profiles</span></span>
        <span class="row-chev">${f.chevron()}</span>
      </button>
    </section>

    <${D} header="Your quits">
      ${t.quits.map(p=>{let y=tt(p).getTime(),S=Math.floor((m-y)/864e5);return e`<${B} key=${p.id} icon=${p.emoji} tint=${p.color} title=${p.label}
          detail=${y>m?"Quit day soon":po(S,"day")} chevron onClick=${()=>ne(p.id)} />`})}
      ${t.quits.length<At.length&&e`<${B} icon=${f.plus()} tint=${N.tools} title="Add something to quit" chevron onClick=${ae} />`}
    <//>

    <${D} header="Staying quit">
      <${B} icon=${f.heart()} tint=${N.tools} title="My reasons" detail=${t.reasons.length||"Add"} chevron onClick=${Pt} />
      <${B} icon=${f.mail()} tint=${N.tools} title="Letters to future you" detail=${(t.letters||[]).length||"Write one"} chevron onClick=${Sa} />
      <${B} icon=${f.calendar()} tint=${N.tools} title="Plan ahead" detail=${Object.keys(t.plans||{}).length+(t.events||[]).filter(p=>!p.outcome&&p.date>=W()).length||"Add"} chevron onClick=${ee} />
      ${t.quits.some(p=>p.monthly>0)&&e`<${B} icon=${f.gift()} tint=${N.tools} title="Saving for" detail=${t.wishlist.length||"Add"} chevron onClick=${Es} />`}
    <//>

    <${D} header="Health">
      ${r.length>0&&e`<${B} icon=${f.pulse()} tint=${N.health} title="Recovery timeline" chevron onClick=${()=>oe(r[0].id)} />`}
      <${B} icon=${f.person()} tint=${N.health} title="Body" chevron onClick=${ho}
        detail=${e`<span class="body-detail">${l?`${l.toFixed(1)} kg`:"Add weight"}${d&&e`<span class="pill sm ${c.tone}">BMI ${d.toFixed(1)}</span>`}</span>`} />
    <//>

    <${D} header="Friends">
      <${B} icon=${f.users()} tint=${N.social} title="Buddies" detail=${$.loaded?$.incoming.length?`${$.incoming.length} new`:$.buddies.length||"Add":""} chevron onClick=${Ya} />    <//>


    <${D} header="Settings">
      <${B} icon=${f.bell()} tint=${N.settings} title="Notifications" detail=${as()?u.enabled?"On":"Off":"Not set up"} chevron onClick=${bo} />
      <${B} icon=${f.shield()} tint=${N.settings} title="Your data & privacy" chevron onClick=${go} />
      <${B} icon=${f.compass()} tint=${N.settings} title="Show the tour again" chevron onClick=${rn} />
      ${i.isAdmin&&e`<${B} icon=${f.sliders()} tint=${N.settings} title="Admin" chevron onClick=${lo} />`}
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>${ie}</span>
      <span class="tiny">Version 2.0</span>
    </div>
  <//>`}function ho(){L(t=>e`<${mo} close=${t} />`,{tall:!0})}function mo({close:t}){let n=gn().profile,a=Mt(n),o=$e(a,n.heightCm),i=Ye(o),l=je(n),d=o?Math.max(0,Math.min(100,(o-15)/20*100)):0;return e`
    <${M} title="Body" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${D}>
        <${B} icon=${f.ruler()} tint=${N.health} title="Age and height" detail=${`${l??"–"} · ${n.heightCm?`${n.heightCm} cm`:"–"}`} chevron onClick=${ko} />
        <${B} icon=${f.scale()} tint=${N.health} title="Weight" detail=${a?`${a.toFixed(1)} kg`:"Add"} chevron onClick=${Ts} />
      <//>
      <${D} footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
        <div class="bmi">
          <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${o?o.toFixed(1):"–"}</div></div><span class="pill ${i.tone}">${i.label}</span></div>
          <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${o&&e`<b style="left:${d}%"></b>`}</div>
          <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
        </div>
      <//>
    </div>`}function bo(){L(t=>e`<${vo} close=${t} />`,{tall:!0})}function vo({close:t}){let s=gn();return e`
    <${M} title="Notifications" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body"><${Bo} s=${s} header=${null} /></div>`}function go(){L(t=>e`<${fo} close=${t} />`,{tall:!0})}function fo({close:t}){let s=$t(),n=async a=>{let o=a.target.files[0];if(a.target.value="",!o)return;let i=await o.text(),l="";try{let d=JSON.parse(i);l=d.exportedAt?` from ${Z(new Date(d.exportedAt))}`:""}catch{E("That file isn’t valid JSON");return}at({title:"Restore backup",text:`Replace everything in your account with the backup${l}? Your current data will be overwritten on every device.`,confirm:"Restore backup",onConfirm:()=>{try{_s(i),E("Backup restored")}catch(d){E(d.message)}}})};return e`
    <${M} title="Your data & privacy" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${D} footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
        <${uo} />
        <${B} icon=${f.doc()} tint=${N.settings} title="Privacy notice" sub="What’s stored, who can see it, your rights" chevron onClick=${ro} />
        <${B} icon=${f.star()} tint=${N.settings} title="Credits & licences" sub="The artists and code Novum is built with" chevron onClick=${co} />
      <//>
      <${D} header="Backups">
        <${B} icon=${f.share()} tint=${N.tools} title="Export a copy" sub="Everything: account, profile, check-ins, goals" chevron onClick=${yo} />
        <${B} icon=${f.download()} tint=${N.tools} title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${()=>s.current.click()} />
        <input type="file" accept="application/json,.json" ref=${s} onChange=${n} hidden />
      <//>
      <${D} footer="Clears every counter, check-in, goal and note and takes you back to Day Zero. Your login stays the same.">
        <${B} icon=${f.undo()} tint=${N.danger} title="Start over" danger onClick=${()=>at({title:"Start over",text:"This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.",confirm:"Clear and start over",onConfirm:()=>{Ke(),ue(Ks()),E("Fresh start")}})} />
      <//>
    </div>`}async function yo(){let t=st()?.user||{},s=zs({firstName:t.firstName,lastName:t.lastName,username:t.username,email:t.email,dob:t.dob,memberSince:t.createdAt?new Date(t.createdAt).toISOString():""}),n=`novum-backup-${W()}.json`,a=new File([s],n,{type:"application/json"});try{if(navigator.canShare&&navigator.canShare({files:[a]})){await navigator.share({files:[a],title:"Novum backup"});return}}catch(i){if(i.name==="AbortError")return}let o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=n,document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(o.href),o.remove()},1e3),E("Backup saved")}function ko(){L(t=>e`<${wo} close=${t} />`)}function wo({close:t}){let s=x().profile,[n,a]=g(s.dob||""),[o,i]=g(s.heightCm?String(s.heightCm):""),l=/^\d{4}-\d{2}-\d{2}$/.test(n)&&Yt(n)<new Date,d=l&&+o>=100&&+o<=250,c=async()=>{if(n!==s.dob)try{await be({dob:n})}catch(r){E(r.message);return}I(r=>{r.profile.dob=n,r.profile.heightCm=Math.round(+o)}),A(12),t()};return e`
    <${M} title="Age and height" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!d} onClick=${c}>Save</button>`} />
    <div class="sheet-body">
      <${D} footer=${l?`${je({dob:n})} years old`:""}>
        <${Y} label="Date of birth"><input type="date" max=${W()} value=${n} onInput=${r=>a(r.target.value)} /><//>
        <${Y} label="Height (cm)"><input type="number" inputmode="decimal" value=${o} onInput=${r=>i(r.target.value)} /><//>
      <//>
    </div>`}function So(){L(t=>e`<${Co} close=${t} />`,{tall:!0})}function Co({close:t}){let s=st()?.user||{},[n,a]=g({firstName:s.firstName||"",lastName:s.lastName||"",username:s.username||""}),[o,i]=g(null),[l,d]=g(!1),c=Object.keys(n).some(u=>n[u].trim()!==(s[u]||"")),r=u=>b=>a({...n,[u]:b.target.value}),$=async()=>{d(!0),i(null);let u=Object.fromEntries(Object.keys(n).filter(b=>n[b].trim()!==(s[b]||"")).map(b=>[b,n[b].trim()]));try{await be(u),A(15),E("Account updated"),i(null)}catch(b){i({err:b.message})}d(!1)},m=()=>at({title:"Log out",danger:!1,confirm:"Log out",text:"Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.",onConfirm:async()=>{t(),await Ao()}});return e`
    <${M} title="Account" left=${e`<button class="link" onClick=${t}>Close</button>`} right=${e`<button class="link b" disabled=${!c||l} onClick=${$}>${l?"Saving…":"Save"}</button>`} />
    <div class="sheet-body">
      <${D} header="Your details" footer=${o?.err?e`<span class="err">${o.err}</span>`:`Member since ${s.createdAt?Z(new Date(s.createdAt)):"–"}`}>
        <${Y} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${n.firstName} onInput=${u=>a({...n,firstName:He(u.target.value)})} /><//>
        <${Y} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${n.lastName} onInput=${u=>a({...n,lastName:He(u.target.value)})} /><//>
        <${Y} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${n.username} onInput=${r("username")} /><//>
        <${B} title="Email" detail=${s.email} chevron onClick=${Do} />
      <//>
      <${D}>
        <${B} icon=${f.key()} tint=${N.settings} title="Change password" chevron onClick=${To} />
        <${B} icon=${f.phone()} tint=${N.settings} title="Logged-in devices" chevron onClick=${qo} />
        <${B} icon=${f.logout()} tint=${N.settings} title="Log out" chevron onClick=${m} />
      <//>
      <${D} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${B} icon=${f.trash()} tint=${N.danger} title="Delete account" danger onClick=${No} />
      <//>
    </div>`}async function Ao(){let t=st()?.user?.id;try{await Ua()}catch{}try{await ke()}catch{}ns(),Te(),await la(),Re({wipe:!0}),t&&ms(t)}function Do(){L(t=>e`<${Eo} close=${t} />`)}function Eo({close:t}){let[s,n]=g(""),[a,o]=g("email"),[i,l]=g(""),[d,c]=g(0),[r,$]=g(""),[m,u]=g(!1),b=s.trim().toLowerCase(),h=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b)&&b!==(st()?.user?.email||"").toLowerCase(),v=async S=>{await be({email:b,emailToken:S}),A(20),E("Email updated"),t()},p=async()=>{u(!0),$("");try{(await oa(b,st()?.user?.firstName)).skipped?await v():(c(Date.now()),o("code"))}catch(S){$(S.message)}u(!1)},y=async(S=i)=>{if(!(m||S.length!==6)){u(!0),$("");try{let w=await ia(b,S);await v(w.emailToken)}catch(w){$(w.message),l(""),u(!1)}}};return e`
    <${M} title="Change email" left=${e`<button class="link" onClick=${t}>Cancel</button>`} />
    <div class="sheet-body">
      ${a==="email"?e`
        <${D} footer=${r?e`<span class="err">${r}</span>`:"We’ll send a code to the new address to confirm it’s yours."}>
          <${Y} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${s} onInput=${S=>{$(""),n(S.target.value)}} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!h||m} onClick=${p}>${m?"Sending…":"Send code"}</button>`:e`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${b}</b>.</p>
        <${os} value=${i} onChange=${S=>{$(""),l(S)}} onComplete=${y} />
        ${r&&e`<p class="wiz-err">${r}</p>`}
        <button class="btn btn-primary block" disabled=${i.length!==6||m} onClick=${()=>y()}>${m?"Confirming…":"Confirm"}</button>
        <${is} sentAt=${d} onResend=${p} />`}
    </div>`}function To(){L(t=>e`<${Mo} close=${t} />`)}function Mo({close:t}){let[s,n]=g(""),[a,o]=g(""),[i,l]=g(""),[d,c]=g(!1),r=s&&a.length>=8,$=async()=>{c(!0),l("");try{await ca(s,a),A(15),E("Password changed"),t()}catch(m){l(m.message)}c(!1)};return e`
    <${M} title="Change password" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!r||d} onClick=${$}>Save</button>`} />
    <div class="sheet-body">
      <${D} footer=${i?e`<span class="err">${i}</span>`:"At least 8 characters. You’ll stay logged in here; other devices are logged out."}>
        <${Y} label="Current"><input type="password" autocomplete="current-password" value=${s} onInput=${m=>n(m.target.value)} /><//>
        <${Y} label="New"><input type="password" autocomplete="new-password" value=${a} onInput=${m=>o(m.target.value)} /><//>
      <//>
    </div>`}function No(){L(t=>e`<${xo} close=${t} />`)}function xo({close:t}){let[s,n]=g(""),[a,o]=g(!1),[i,l]=g(""),[d,c]=g(!1),[r,$]=g(null),[m,u]=g(""),[b,h]=g(0),v=$t();K(()=>{r&&setTimeout(()=>v.current?.focus({preventScroll:!0}),350)},[r]);let p=async()=>{let w=st()?.user?.id;ns(),Te(),Ke(),na(null),Re({wipe:!0}),w&&(ms(w),ua(w,null));try{localStorage.removeItem(`novum.push:${w}`)}catch{}history.replaceState(null,"",location.pathname),window.scrollTo(0,0),E("Account deleted")},y=async(w=m)=>{if(!d){c(!0),l("");try{try{await ke()}catch{}await da(s,w),A(20),await p()}catch(k){c(!1),u(""),l(k.message),k.data?.needsCode&&$(r||{emailHint:"your email"})}}},S=async()=>{if(!(d||!s)){c(!0),l("");try{let w=await Qe(s);if(w.skipped)return c(!1),y("");$({emailHint:w.emailHint}),h(Date.now()),u("")}catch(w){l(w.message)}c(!1)}};return e`
    <${M} title="Delete account" left=${e`<button class="link" onClick=${r?()=>{$(null),l(""),u("")}:t}>${r?"Back":"Cancel"}</button>`} />
    <div class="sheet-body">
      ${r?e`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${r.emailHint}</b>. Enter it to delete your account for good.</p>
          <${xa} email=${r.emailHint} />
          <${os} inputRef=${v} value=${m} onChange=${w=>{l(""),u(w)}} />
          <${is} sentAt=${b} onResend=${async()=>{try{await Qe(s),h(Date.now()),u(""),E("New code sent")}catch(w){l(w.message)}}} />
          ${i&&e`<p class="auth-err center">${i}</p>`}
          <button class="btn btn-danger block" disabled=${m.length!==6||d} onClick=${()=>y()}>${d?"Deleting…":"Delete my account"}</button>
        </div>`:e`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${D} header="Step 1 of 2 · Your password" footer=${i?e`<span class="err">${i}</span>`:"Then we’ll email you a code to make sure it’s really you."}>
          <${Y} label="Password"><div class="tf-row"><input type=${a?"text":"password"} autocomplete="current-password" value=${s}
            onInput=${w=>{l(""),n(w.target.value)}} onKeyDown=${w=>w.key==="Enter"&&S()} />
            <${Na} on=${a} set=${o} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!s||d} onClick=${S}>${d?"Checking…":"Continue"}</button>`}
    </div>`}function Ts(){L(t=>e`<${Io} close=${t} />`,{tall:!0})}function Io({close:t}){let s=x(),[n,a]=g(""),[o,i]=g(W()),l=[...s.profile.weights].sort((c,r)=>r.date.localeCompare(c.date)),d=()=>{let c=parseFloat(n);c>20&&c<400&&(A(12),I(r=>{r.profile.weights=r.profile.weights.filter($=>$.date!==o),r.profile.weights.push({date:o,kg:c})}),a(""),E("Weight logged"))};return e`
    <${M} title="Weight" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${D}>
        <${Y} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${Mt(s.profile)?.toFixed(1)??"70.0"} value=${n}
          onInput=${c=>a(c.target.value)} onKeyDown=${c=>c.key==="Enter"&&d()} /><//>
        <${Y} label="Date"><input type="date" value=${o} max=${W()} onInput=${c=>i(c.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(n)>20)} onClick=${d}>Log weight</button>
      <${D} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${l.map(c=>e`<div class="row" key=${c.date}>
          <span class="row-main"><span class="row-title">${c.kg.toFixed(1)} kg</span><span class="row-sub">${Z(c.date)}</span></span>
          <span class="row-detail">BMI ${$e(c.kg,s.profile.heightCm).toFixed(1)}</span>
          ${l.length>1&&e`<button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>I(r=>{r.profile.weights=r.profile.weights.filter($=>$.date!==c.date)})}>${f.trash()}</button>`}
        </div>`)}
      <//>
    </div>`}var Fo=t=>{let s=Math.floor((Date.now()-t)/6e4);if(s<2)return"active now";if(s<60)return`${s} min ago`;let n=Math.floor(s/60);if(n<24)return`${n} hr${n===1?"":"s"} ago`;let a=Math.floor(n/24);return`${a} day${a===1?"":"s"} ago`};function qo(){L(t=>e`<${Lo} close=${t} />`,{tall:!0})}function Lo({close:t}){let[s,n]=g(null),[a,o]=g(""),i=async()=>{o("");try{n(await pa())}catch(r){o(r.message)}};K(()=>{i()},[]);let l=async r=>{A();try{await $a(r.id),E(`Logged out of ${r.device}`),i()}catch($){E($.message)}},d=()=>at({title:"Log out other devices",confirm:"Log out others",text:"Every other phone or computer is logged out and will need your password (and an email code) to get back in. This one stays logged in.",onConfirm:async()=>{try{await ha(),E("Other devices logged out"),i()}catch(r){E(r.message)}}}),c=s?s.sessions.filter(r=>!r.current).length:0;return e`
    <${M} title="Logged-in devices" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      ${a&&e`<p class="auth-err center">${a}</p>`}
      ${!s&&!a&&e`<${me} rows=${2} avatar />`}
      ${s&&e`<${D} footer=${s.trusted?`${s.trusted} device${s.trusted===1?" is":"s are"} remembered, so ${s.trusted===1?"it skips":"they skip"} the login code for 30 days.`:"If you don’t recognise a device, log it out and change your password."}>
        ${s.sessions.map(r=>e`<div class="row" key=${r.id}>
          <span class="row-ic tinted" style="--c:${r.current?N.health:N.settings}">${/iPhone|Android|iPad/.test(r.device)?f.phone():f.laptop()}</span>
          <span class="row-main"><span class="row-title">${r.device}</span>
            <span class="row-sub">${r.current?"This device":`Last active ${Fo(r.lastSeen)}`} · since ${Z(new Date(r.createdAt),{day:"numeric",month:"short"})}</span></span>
          ${!r.current&&e`<button class="link sm danger" onClick=${()=>l(r)}>Log out</button>`}
        </div>`)}
      <//>
      ${c>0&&e`<button class="btn btn-plain danger block" onClick=${d}>Log out all other devices</button>`}`}
    </div>`}function Bo({s:t,header:s="Notifications"}){let n=t.notifyPrefs,[a,o]=g(zt()),[i,l]=g(!1),[d,c]=g(""),r=h=>I(v=>{v.notifyPrefs={...v.notifyPrefs,...h}}),$=as(),[,m]=g(0);K(()=>{let h=()=>{document.visibilityState==="visible"&&(o(zt()),m(v=>v+1))};return document.addEventListener("visibilitychange",h),()=>document.removeEventListener("visibilitychange",h)},[]);let u=async h=>{if(!i){c(""),l(!0);try{h?(await Ma(),E("Notifications on 🔔")):(await ke(),E("Notifications off"))}catch(v){c(v.message)}o(zt()),l(!1)}},b;return $?Da()&&!Aa()?b="On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.":Ca()?Ea()==="denied"&&!a.enabled?b=Ta("denied"):b="On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times, habit ticks and the dates of tough days you plan for to time these.":b="This browser doesn’t support push notifications.":b="Notifications aren’t set up on the server yet.",e`<${D} header=${s} footer=${d?e`<span class="err">${d}</span>`:b}>
    <div class="row">
      <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.bell()}</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${i&&e`<span class="row-sub">Working…</span>`}</span>
      ${$?e`<${et} on=${a.enabled} label="Notifications" onChange=${u} />`:e`<span class="row-detail">Not set up</span>`}
    </div>
    ${Fa()&&e`<${B} icon=${f.phone()} tint=${N.tools} title=${Ia().kind==="inapp"?"Open Novum in Safari":"Add to Home Screen"} sub="Needed for notifications. Shows you how" chevron onClick=${qa} />`}
    ${a.enabled&&$&&e`
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.medal()}</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${et} on=${n.milestones} label="Milestones" onChange=${h=>r({milestones:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.pencil()}</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin&&e`<input type="time" class="time-in" value=${n.checkinAt} onChange=${h=>h.target.value&&r({checkinAt:h.target.value})} />`}
        <${et} on=${n.checkin} label="Check-in reminder" onChange=${h=>r({checkin:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.goals()}</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits&&e`<input type="time" class="time-in" value=${n.habitsAt} onChange=${h=>h.target.value&&r({habitsAt:h.target.value})} />`}
        <${et} on=${n.habits} label="Habit nudges" onChange=${h=>r({habits:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.progress()}</span>
        <span class="row-main"><span class="row-title">Weekly recap</span><span class="row-sub">Sundays: check-ins, cravings and money saved</span></span>
        ${n.recap&&e`<input type="time" class="time-in" value=${n.recapAt} onChange=${h=>h.target.value&&r({recapAt:h.target.value})} />`}
        <${et} on=${n.recap} label="Weekly recap" onChange=${h=>r({recap:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.users()}</span>
        <span class="row-main"><span class="row-title">Buddies and followers</span><span class="row-sub">Requests, new followers and cheers</span></span>
        <${et} on=${n.buddies} label="Buddy notifications" onChange=${h=>r({buddies:h})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.sparkle()}</span>
        <span class="row-main"><span class="row-title">Heads-up before tough times</span><span class="row-sub">Learns when cravings usually hit and nudges you 20 minutes before</span></span>
        <${et} on=${n.nudges!==!1} label="Heads-up before tough times" onChange=${h=>r({nudges:h})} />
      </div>`}
  <//>`}function Ml({s:t}){let[s,n]=g("active"),o=t.goals.map(i=>({g:i,p:yt(i,t)})).filter(({p:i})=>s==="done"?i.pct>=1:s==="active"?i.pct<1:!0);return e`
    <button class="card ny-mini tap" onClick=${Ot}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${f.chevron()}</span>
    </button>

    ${t.goals.length===0?e`<${sa} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${e`<div class="empty-actions"><button class="btn btn-primary" onClick=${Ot}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${()=>Ms()}>Create your own</button></div>`} />`:e`
      <div class="pad-x mb12"><${z} options=${[{value:"active",label:"Active"},{value:"done",label:"Complete"},{value:"all",label:"All"}]} value=${s} onChange=${n} /></div>
      ${o.length===0&&e`<p class="muted center pad">${s==="done"?"Nothing complete yet. You’ll get there.":"Everything’s complete. Time for a new goal?"}</p>`}
      ${Dt.map(i=>{let l=o.filter(({g:d})=>d.category===i.id);return l.length?e`<${D} key=${i.id} header=${i.label}>
          ${l.map(({g:d,p:c})=>e`<${Po} key=${d.id} g=${d} p=${c} />`)}
        <//>`:null})}`}`}function Po({g:t,p:s}){let n=(t.ticks||[]).includes(W());return e`<div class="row tap goal-row" role="button" tabindex="0" onClick=${()=>fn(t.id)}>
    <${Kt} pct=${s.pct} size=${46} stroke=${5} color=${t.color}><span class="ring-emoji">${t.emoji}</span><//>
    <span class="row-main">
      <span class="row-title">${t.name}</span>
      <span class="row-sub">${Ge(t)?`Counts from ${Z(he(t).start,{day:"numeric",month:"short"})}`:s.label} · ${es(t)}</span>
    </span>
    ${t.type==="habit"?e`<button class="tick ${n?"on":""}" style="--c:${t.color}" aria-pressed=${n} aria-label="Done today"
          onClick=${a=>{a.stopPropagation(),It(t.id)}}>${f.check()}</button>`:e`<span class="row-detail">${Math.round(s.pct*100)}%</span><span class="row-chev">${f.chevron()}</span>`}
  </div>`}function fn(t){L(s=>e`<${Oo} id=${t} close=${s} />`,{tall:!0})}function Oo({id:t,close:s}){let n=x(),a=n.goals.find(u=>u.id===t),[o,i]=g("");if(!a)return e`<${M} title="Goal" right=${e`<button class="link b" onClick=${s}>Done</button>`} />`;let l=yt(a,n),d=Ls(a.category),c=W(),r=()=>at({title:"Delete goal",text:`Delete “${a.name}”? Its history will be removed too.`,confirm:"Delete goal",onConfirm:()=>{s(),I(u=>{u.goals=u.goals.filter(b=>b.id!==t)}),E("Goal deleted")}}),$=()=>{let u=parseFloat(o);Number.isNaN(u)||(A(12),I(b=>{let h=b.goals.find(v=>v.id===t);h.entries=[...h.entries||[],{id:rt(),date:c,value:u}]}),i(""))},m=null;if(a.type==="habit"){let u=(a.ticks||[]).includes(c),b=Nt(a),h=Xs(a),v=h.filter(w=>w.done).length,p=ce(new Date),y=Array.from({length:12},(w,k)=>lt(p,-7*(11-k))),S=new Set(a.ticks||[]);m=e`
      <button class="btn block big ${u?"btn-done":"btn-primary"}" style="--c:${a.color}" onClick=${()=>It(t)}>
        ${u?e`${f.check()} Done today`:"Mark done today"}</button>
      <div class="stats3">
        <div><b>${b.value}</b><span>${b.unit} streak</span></div>
        ${a.perWeek>=7?e`<div><b>${Vs(a)}</b><span>best streak</span></div>`:e`<div><b>${v}/${a.perWeek}</b><span>this week</span></div>`}
        <div><b>${(a.ticks||[]).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${h.map((w,k)=>e`<button class="wd ${w.done?"on":""} ${w.key===c?"today":""}" style="--c:${a.color}"
          disabled=${w.key>c} onClick=${()=>It(t,w.key)}><span>${"MTWTFSS"[k]}</span><i>${w.done?f.check():""}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${a.color}">
          ${y.map(w=>e`<div class="heat-col">${Array.from({length:7},(k,F)=>{let O=W(lt(w,F));return e`<i class="${S.has(O)?"on":""} ${O>c?"future":""}" title=${Z(O)}></i>`})}</div>`)}
        </div>
      </div>`}else if(a.type==="numeric"&&a.auto==="money")m=e`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${Z(he(a).start)}.</div>`;else if(a.type==="numeric"&&a.auto==="weight")m=e`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${Ts}>Log weight</button>`;else if(a.type==="numeric"){let u=[...a.entries||[]].reverse();m=e`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${a.mode==="level"?`New value${a.unit?" ("+a.unit+")":""}`:a.unit==="£"?"Amount you saved (£)":`Add amount${a.unit?" ("+a.unit+")":""}`}
          value=${o} onInput=${b=>i(b.target.value)} onKeyDown=${b=>b.key==="Enter"&&$()} />
        <button class="btn btn-primary sm" disabled=${o===""} onClick=${$}>${a.mode==="level"?"Log":"Add"}</button>
      </div>
      ${u.length>0&&e`<${D} header="History">
        ${u.slice(0,30).map(b=>e`<div class="row" key=${b.id}>
          <span class="row-main"><span class="row-title">${a.mode==="level"?"":"+"}${b.value}${a.unit?" "+a.unit:""}</span><span class="row-sub">${Z(b.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>I(h=>{let v=h.goals.find(p=>p.id===t);v.entries=v.entries.filter(p=>p.id!==b.id)})}>${f.trash()}</button>
        </div>`)}
      <//>`}`}else if(a.type==="quit"){let u=n.quits.find(b=>b.id===a.quitId)||n.quits[0];m=e`<div class="card pad info">${u.emoji} Linked to your ${u.label.toLowerCase()} counter. Every day you stay ${u.label.toLowerCase()}-free ${a.period==="2027"?`from ${Z(Zs(a,u))} to the end of 2027 `:""}fills this ring, including the days before you added this goal.</div>`}else m=e`<button class="btn block big ${a.done?"btn-done":"btn-primary"}" style="--c:${a.color}"
      onClick=${()=>{A(15),I(u=>{let b=u.goals.find(h=>h.id===t);b.done=!b.done,b.doneDate=b.done?c:null}),a.done||E("Milestone complete 🎉")}}>
      ${a.done?e`${f.check()} Completed`:"Mark as complete"}</button>`;return e`
    <${M} left=${e`<button class="link" onClick=${()=>Ms(a)}>Edit</button>`}
      right=${e`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${Kt} pct=${l.pct} size=${168} stroke=${18} color=${a.color}>
          <div class="dh-in"><span class="dh-e">${a.emoji}</span><b>${Math.round(l.pct*100)}%</b></div>
        <//>
        <h2 class="dh-name">${a.name}</h2>
        <div class="dh-label">${l.label} <span class="muted">${l.sub}</span></div>
        ${Ge(a)&&e`<div class="dh-note">Counts from ${Z(he(a).start)}. Ticks before then still build your streak.</div>`}
        <div class="chips"><span class="chip" style="--c:${d.color}">${d.label}</span><span class="chip">${ye(a)}</span><span class="chip">${es(a)}</span></div>
      </div>
      ${m}
      <button class="btn btn-plain danger block mt16" onClick=${r}>Delete goal</button>
    </div>`}function Ms(t){L(s=>e`<${Ro} goal=${t} close=${s} />`,{tall:!0})}function Ro({goal:t={},close:s}){let n=!!t.id,[a,o]=g(()=>({name:"",emoji:"🎯",color:"#3B9BFF",category:"habits",type:"habit",perWeek:7,remindAt:"",period:"2027",end:"2027-12-31",mode:"sum",auto:"",unit:"",target:"",startValue:"",quitId:x().quits[0]?.id||"",...t})),i=u=>o(b=>({...b,...u})),l=x(),d=a.auto==="weight"?"weight":a.mode==="level"?"level":a.unit==="£"?"money":"sum",c=u=>i(u==="money"?{auto:"",unit:"£",mode:"sum"}:u==="weight"?{auto:"weight",unit:"kg",mode:"level",startValue:a.startValue===""?+(Mt(l.profile)||0).toFixed(1):a.startValue}:{auto:"",mode:u,unit:a.auto||a.unit==="£"?"":a.unit}),r=a.type!=="numeric"||a.target!==""&&!Number.isNaN(parseFloat(a.target)),$=a.name.trim()&&r&&(a.period==="2027"||a.end),m=()=>{if(!$)return;A(15);let u={...a,name:a.name.trim(),target:a.target===""?"":parseFloat(a.target),startValue:a.startValue===""?"":parseFloat(a.startValue)};I(b=>{if(n){let h=b.goals.findIndex(v=>v.id===t.id);h>=0&&(b.goals[h]={...b.goals[h],...u})}else b.goals.push({ticks:[],entries:[],...u,id:rt(),start:W(),createdAt:new Date().toISOString()})}),s(),E(n?"Goal updated":"Goal added")};return e`
    <${M} title=${n?"Edit goal":"New goal"}
      left=${e`<button class="link" onClick=${s}>Cancel</button>`}
      right=${e`<button class="link b" disabled=${!$} onClick=${m}>${n?"Save":"Add"}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${a.color}">${a.emoji}</div>
        <input class="eh-name" placeholder="Goal name" value=${a.name} onInput=${u=>i({name:u.target.value})} maxlength="60" />
      </div>

      <${D} header="Icon">
        <div class="emoji-grid">${Ps.map(u=>e`<button class="emo ${a.emoji===u?"on":""}" onClick=${()=>{A(),i({emoji:u})}}>${u}</button>`)}</div>
      <//>
      <${D} header="Colour">
        <div class="swatches">${Bs.map(u=>e`<button class="sw ${a.color===u?"on":""}" style="--c:${u}" aria-label=${u} onClick=${()=>{A(),i({color:u})}}></button>`)}</div>
      <//>
      <${D} header="Category">
        <div class="chip-row">${Dt.map(u=>e`<button class="chip big ${a.category===u.id?"on":""}" style="--c:${u.color}" onClick=${()=>{A(),i({category:u.id})}}>${u.label}</button>`)}</div>
      <//>

      <${D} header="Type" footer=${{habit:"Tick it off on the days you do it. Builds a streak.",numeric:"Work towards a number, like km run, money saved or a weight.",milestone:"A one-off achievement you mark as done.",quit:"Fills automatically every day you stay quit."}[a.type]}>
        <div class="pad"><${z} options=${[{value:"habit",label:"Habit"},{value:"numeric",label:"Target"},{value:"milestone",label:"Milestone"},...x().quits.length?[{value:"quit",label:"Stay quit"}]:[]]}
          value=${a.type} onChange=${u=>i({type:u})} /></div>
        ${a.type==="habit"&&e`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${a.perWeek>=7?"Every day":`${a.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${a.perWeek<=1} onClick=${()=>{A(),i({perWeek:Math.max(1,a.perWeek-1)})}} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${a.perWeek>=7} onClick=${()=>{A(),i({perWeek:Math.min(7,a.perWeek+1)})}} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${a.type==="habit"&&e`<div class="row">
          <span class="row-main"><span class="row-title">Reminder</span>
            <span class="row-sub">${a.remindAt?a.perWeek>=7?"Every day, unless it’s ticked":"Only on days you still need it":"A nudge at a time you choose"}</span></span>
          ${a.remindAt&&e`<input type="time" class="time-in" value=${a.remindAt} onChange=${u=>u.target.value&&i({remindAt:u.target.value})} />`}
          <${et} on=${!!a.remindAt} label="Reminder" onChange=${u=>i({remindAt:u?"18:00":""})} />
        </div>`}
        ${a.type==="numeric"&&e`
          <div class="pad"><${z} small options=${[{value:"sum",label:"Add up"},{value:"level",label:"Reach"},{value:"money",label:"£ Saved"},{value:"weight",label:"Weight"}]}
            value=${d} onChange=${c} /></div>
          ${!a.auto&&d!=="money"&&e`<${Y} label="Unit"><input placeholder="km, books, hours…" value=${a.unit} onInput=${u=>i({unit:u.target.value})} /><//>`}
          ${(d==="level"||d==="weight")&&e`<${Y} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${a.startValue} onInput=${u=>i({startValue:u.target.value})} /><//>`}
          <${Y} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${d==="money"?"1000":"100"} value=${a.target} onInput=${u=>i({target:u.target.value})} /><//>
`}
        ${a.type==="quit"&&e`<div class="pad"><${z} options=${l.quits.map(u=>({value:u.id,label:`${u.emoji} ${u.label}`}))} value=${a.quitId} onChange=${u=>i({quitId:u})} /></div>`}
      <//>

      <${D} header="Deadline">
        <div class="pad"><${z} options=${[{value:"2027",label:"Until end of 2027"},{value:"date",label:"Pick a date"}]} value=${a.period} onChange=${u=>i({period:u})} /></div>
        ${a.period==="date"&&e`<${Y} label="Finish by"><input type="date" value=${a.end} min=${W()} onInput=${u=>i({end:u.target.value})} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!$} onClick=${m}>${n?"Save changes":"Add goal"}</button>
    </div>`}function Ot(){L(t=>e`<${Wo} close=${t} />`,{tall:!0})}function Wo({close:t}){let s=x(),n=Math.ceil((xt-Date.now())/H),a=new Set(s.goals.map(d=>d.preset).filter(Boolean)),o=d=>{A(15),I(c=>c.goals.push({ticks:[],entries:[],...d.make(c),preset:d.key,id:rt(),start:W(),createdAt:new Date().toISOString()})),E("Added to your goals")},i=d=>{let c=x().goals.find($=>$.preset===d.key);if(!c)return;let r=()=>{A(10),I($=>{$.goals=$.goals.filter(m=>m.preset!==d.key)}),E("Removed from your goals")};(c.ticks||[]).length||(c.entries||[]).length||c.done?at({title:"Remove goal",text:`Remove “${c.name}”? Its progress so far will be deleted.`,confirm:"Remove",onConfirm:r}):r()},l=d=>d.type==="habit"?`${d.perWeek>=7?"Daily":d.perWeek+"× a week"} habit`:d.type==="numeric"?d.unit==="£"?`Log what you save · target £${Number(d.target).toLocaleString("en-GB")}`:d.auto==="weight"?`Target ${d.target} kg · edit to suit you`:`Target · ${d.target} ${d.unit}`:d.type==="quit"?"Linked to your quit counter":"One-off milestone";return e`
    <${M} right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${n>0?`${n} days until 1 January. `:""}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${Dt.map(d=>{let c=[...Os(s),...Rs].filter(r=>r.make(s).category===d.id);return c.length?e`<${D} key=${d.id} header=${d.label}>
          ${c.map(r=>{let $=r.make(s),m=a.has(r.key),u=s.goals.find(b=>b.preset===r.key);return e`<div class="row tap" key=${r.key} role="button" onClick=${()=>u?fn(u.id):Ms({...$,preset:r.key})}>
              <span class="row-ic" style="background:${$.color}">${$.emoji}</span>
              <span class="row-main"><span class="row-title">${$.name}</span><span class="row-sub">${l($)}</span></span>
              <button class="add-pill ${m?"on":""}" aria-pressed=${m} aria-label=${m?`Remove ${$.name}`:`Add ${$.name}`}
                onClick=${b=>{b.stopPropagation(),m?i(r):o(r)}}>${m?f.check():f.plus()}</button>
            </div>`})}
        <//>`:null})}
    </div>`}var jo=ht(()=>import("./c-OVTBWQH5.js"),"openRecap");function Wl({s:t,go:s}){let[n,a]=g(30),o=Date.now(),i=t.goals.filter(C=>C.period==="2027"),l=Dt.map(C=>{let q=i.filter(V=>V.category===C.id);return q.length?{...C,pct:q.reduce((V,ot)=>V+yt(ot,t).pct,0)/q.length,n:q.length}:null}).filter(Boolean),d=i.length?i.reduce((C,q)=>C+yt(q,t).pct,0)/i.length:0,c=xt.getTime(),r=o>=c?Math.min(365,Math.floor((o-c)/H)+1):0,$=Math.ceil((c-o)/H),u=t.goals.map(C=>yt(C,t)).filter(C=>C.pct>=1).length,b=t.goals.filter(C=>C.type==="habit").reduce((C,q)=>Math.max(C,Nt(q).value),0),h=t.quits.reduce((C,q)=>C+J(q,R(q,o)),0),v=Array.from({length:n},(C,q)=>W(lt(new Date,q-n+1))),p=v.map(C=>t.checkins[C]?.mood??null),y=t.quits.map(C=>({name:C.label,color:C.color,values:v.map(q=>t.checkins[q]?.[C.id]??null)})),S=(()=>{let C=Object.keys(t.checkins).sort().filter(T=>t.quits.some(U=>t.checkins[T][U.id]!=null));if(C.length<6)return null;let q=T=>{let U=T.flatMap(pt=>t.quits.map(it=>t.checkins[pt][it.id]).filter(it=>it!=null));return U.reduce((pt,it)=>pt+it,0)/U.length},V=Math.min(7,Math.floor(C.length/2)),ot=q(C.slice(0,V)),ft=q(C.slice(-V));if(ot===0)return null;let St=Math.round((ft-ot)/ot*100);return St<0?`Cravings are down ${-St}% compared with your first check-ins.`:St>0?`Cravings are up ${St}% on your first check-ins. Tough patches are normal. Keep going.`:"Cravings are holding steady."})(),w={};t.cravings.forEach(C=>(C.triggers||[]).forEach(q=>{w[q]=(w[q]||0)+1}));let k=Object.entries(w).sort((C,q)=>q[1]-C[1]).slice(0,6),F=Array(24).fill(0);t.cravings.forEach(C=>{F[new Date(C.t).getHours()]++});let O=F.indexOf(Math.max(...F)),Rt=`${X(O)}:00–${X((O+1)%24)}:00`,vt=new Set([...Object.keys(t.checkins),...t.goals.flatMap(C=>C.ticks||[])]),P=Array.from({length:12},(C,q)=>{let V=new Date(2027,q+1,0).getDate(),ot=0;for(let ft=1;ft<=V;ft++)vt.has(`2027-${X(q+1)}-${X(ft)}`)&&ot++;return{m:q,pct:ot/V,future:new Date(2027,q,1)>o}});return e`<${kt} title="Progress">
    <${Ha} />
    ${t.quits.length>0&&e`<button class="card rc-card tap" onClick=${jo}>
      <span class="rc-card-ic">📅</span>
      <span class="row-main"><span class="row-title">Your week</span><span class="row-sub">Check-ins, cravings beaten, money saved and what your body did</span></span>
      <span class="row-chev">${f.chevron()}</span>
    </button>`}
    <section class="group">
      <h2 class="group-h">2027 at a glance</h2>
      <div class="card glance">
        ${i.length?e`
          <div class="glance-top">
            <${ta} size=${150} stroke=${14} gap=${3} rings=${l.slice(0,5).map(C=>({pct:C.pct,color:C.color}))}>
              <div class="gl-c"><b>${Math.round(d*100)}%</b><span>overall</span></div>
            <//>
            <div class="gl-legend">${l.map(C=>e`<div class="gl-li"><i style="background:${C.color}"></i><span>${C.label}</span><b>${Math.round(C.pct*100)}%</b></div>`)}</div>
          </div>`:e`<div class="glance-empty"><p>Add goals for 2027 to see all your rings here.</p><button class="btn btn-primary sm" onClick=${Ot}>New Year ideas</button></div>`}
        <div class="year-bar">
          <div class="yb-t"><span>${r?`Day ${r} of 365`:`2027 starts in ${$} day${$===1?"":"s"}`}</span><span>${Math.round(r/365*100)}% of the year</span></div>
          <div class="yb"><i style="width:${r/365*100}%"></i></div>
        </div>
        <div class="months">${P.map(C=>e`<div class="mo ${C.future?"future":""}" title=${`${Math.round(C.pct*100)}% of days active`}>
          <div class="mo-bar"><i style="height:${Math.max(C.future?0:4,C.pct*100)}%"></i></div><span>${"JFMAMJJASOND"[C.m]}</span></div>`)}</div>
        <p class="tiny muted">Bars show the share of days each month with a check-in or a ticked habit.</p>
      </div>
    </section>

    <div class="tiles">
      ${t.quits.map(C=>e`<div class="tile"><span class="tile-k">${C.emoji} ${C.label}-free</span><b>${Math.floor(R(C,o)/H)}</b><span class="tile-u">days</span></div>`)}
      <div class="tile"><span class="tile-k">💷 Saved</span><b>${G(h,0)}</b><span class="tile-u">so far</span></div>
      <div class="tile"><span class="tile-k">🎯 Goals</span><b>${u}/${t.goals.length}</b><span class="tile-u">complete</span></div>
      <div class="tile"><span class="tile-k">🔥 Best streak</span><b>${b}</b><span class="tile-u">on a habit</span></div>
      <div class="tile"><span class="tile-k">✍️ Check-ins</span><b>${Object.keys(t.checkins).length}</b><span class="tile-u">logged</span></div>
      <div class="tile"><span class="tile-k">🛡️ Cravings beaten</span><b>${t.cravings.filter(C=>C.beaten).length}</b><span class="tile-u">with SOS</span></div>
      <div class="tile"><span class="tile-k">⏱️ SOS time</span><b>${Math.round(t.cravings.reduce((C,q)=>C+(q.secs||0),0)/60)}</b><span class="tile-u">minutes ridden out</span></div>
    </div>

    <${Ga} s=${t} />

    <div class="pad-x mt16"><${z} options=${[{value:14,label:"2 weeks"},{value:30,label:"30 days"},{value:90,label:"90 days"}]} value=${n} onChange=${a} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${ze} keys=${v} series=${[{name:"Mood",color:"#5AC8FA",values:p}]} yMin=${1} yMax=${5} yTicks=${[1,3,5]}
          yFmt=${C=>jt[Math.round(C)-1]?.e??C} height=${170} />
      </div>
    </section>

    ${y.length>0&&e`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${y.length>1&&e`<${ea} series=${y} />`}
        <${ze} keys=${v} series=${y} yMin=${0} yMax=${10} yTicks=${[0,5,10]} unit="/10" height=${190} />
        ${S&&e`<p class="insight">${S}</p>`}
      </div>
    </section>`}

    <${$n} s=${t} />

    <${Yo} s=${t} />
  <//>`}var Ns=["12–4am","4–8am","8am–12","12–4pm","4–8pm","8pm–12"],xs=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function Yo({s:t}){let s=[...t.cravings.map(h=>new Date(h.t)),...t.quits.flatMap(h=>(h.resets||[]).map(v=>Gt(v.to)))],n=Array.from({length:7},()=>Array(6).fill(0));s.forEach(h=>{n[(h.getDay()+6)%7][Math.floor(h.getHours()/4)]++});let a=Math.max(1,...n.flat()),o=null;n.forEach((h,v)=>h.forEach((p,y)=>{p&&(!o||p>o.n)&&(o={n:p,w:v,b:y})}));let i={};t.cravings.forEach(h=>(h.triggers||[]).forEach(v=>{i[v]=(i[v]||0)+1})),t.quits.forEach(h=>(h.resets||[]).forEach(v=>(v.triggers||[]).forEach(p=>{i[p]=(i[p]||0)+1})));let l=Object.entries(i).sort((h,v)=>v[1]-h[1]).slice(0,6),d=ss.map(()=>[]);Object.values(t.checkins).forEach(h=>{if(!h.sleep)return;let v=t.quits.map(p=>h[p.id]).filter(p=>typeof p=="number");v.length&&d[h.sleep-1].push(v.reduce((p,y)=>p+y,0)/v.length)});let c=d.map(h=>h.length?h.reduce((v,p)=>v+p,0)/h.length:null),r=[...d[0],...d[1]],$=[...d[3],...d[4]],m=h=>h.reduce((v,p)=>v+p,0)/h.length,u=r.length>=2&&$.length>=2?`After good sleep your cravings average ${m($).toFixed(1)}/10, against ${m(r).toFixed(1)}/10 after a bad night.`:null,b=c.filter(h=>h!=null).length>=2;return s.length<3&&!l.length&&!b?null:e`
    ${s.length>=3&&e`<section class="group">
      <h2 class="group-h">When cravings hit</h2>
      <div class="card pad heatmap">
        <div class="heat-grid">
          <span></span>${Ns.map(h=>e`<span class="heat-h" key=${h}>${h}</span>`)}
          ${n.map((h,v)=>e`<span class="heat-w" key=${"w"+v}>${xs[v]}</span>${h.map((p,y)=>e`<i key=${v+"-"+y} title=${`${xs[v]} ${Ns[y]}: ${p}`}
            style=${`--a:${p?.18+p/a*.82:0}`} class=${p?"on":""}>${p||""}</i>`)}`)}
        </div>
        <p class="tiny muted">${o?`Your toughest time is ${xs[o.w]} ${Ns[o.b]}. Plan something for then.`:""} From ${s.length} craving${s.length===1?"":"s"} and slips you logged.</p>
      </div>
    </section>`}

    ${l.length>0&&e`<section class="group">
      <h2 class="group-h">What sets cravings off</h2>
      <div class="card pad bars">
        ${l.map(([h,v])=>e`<div class="bar-row" key=${h}>
          <span class="bar-l">${h}</span>
          <span class="bar-t"><i style="width:${v/l[0][1]*100}%"></i></span>
          <b>${v}</b>
        </div>`)}
        <p class="tiny muted">From Craving SOS and any slips you logged.</p>
      </div>
    </section>`}

    ${b&&e`<section class="group">
      <h2 class="group-h">Sleep and cravings</h2>
      <div class="card pad bars">
        ${ss.map((h,v)=>c[v]!=null&&e`<div class="bar-row" key=${h}>
          <span class="bar-l">${h} sleep</span>
          <span class="bar-t"><i style="width:${c[v]/10*100}%;background:#BF5AF2"></i></span>
          <b>${c[v].toFixed(1)}</b>
        </div>`)}
        <p class="tiny muted">${u||"Average craving (out of 10) on days after each kind of night. Keep logging sleep to see a pattern."}</p>
      </div>
    </section>`}`}export{Ho as a,Te as b,Zo as c,ti as d,Xt as e,ei as f,ln as g,oi as h,ee as i,Wl as j,yi as k,se as l,kl as m,Ml as n,Ms as o,Xi as p};
