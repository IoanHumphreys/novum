import{a as Cs,b as Ms,c as As,d as ia,e as Ds,f as Es,g as xs,h as Ts,i as Ns,j as _t,l as Is,m as Se,o as la,p as Fs,q as Bs,u as Os,w as Ps}from"./c-V6TNC5B7.js";import{f as Ks}from"./c-SPI73NRN.js";import{d as Vs}from"./c-4Q5IWQVP.js";import{a as da,e as Rs,g as Ws,h as js,i as vt,m as Hs,n as Ys,o as ua,p as Ft,q as Ae,u as Gs,v as zs}from"./c-BI6QCAY5.js";import{a as z,b as X,c as Lt,d as ft,e as aa,f as sa,g as ye,h as ke,i as ws,j as Ss,k as na,l as we,m as qt,n as nt,p as oa}from"./c-JNCYY6XI.js";import{d as Ce,j as Me}from"./c-TEMIH5DL.js";import{c as Ls,d as ra,e as ca,f as qs}from"./c-6IGSU4ZM.js";import{$ as ta,A as Ze,C as gs,R as Xe,W as fe,X as fs,Y as ys,aa as ks,b as st,ba as ea,c as ls,e as Ue,h as rs,i as cs,o as ds,p as us,q as ge,r as ps,s as Je,t as hs,u as $s,v as ms,w as vs,x as bs}from"./c-HECOZTOP.js";import{$ as Ua,A as za,Ba as Vt,Ca as ss,D as de,Da as B,E as Ka,Ea as _e,F as je,G as Tt,Ga as T,H as j,Ha as wt,I as Gt,Ia as V,J as zt,Ja as at,K as Kt,Ka as A,L as rt,La as O,M as Va,Ma as Y,N as ue,Na as Qe,O as tt,Oa as ns,P as G,Pa as os,Q as ct,Qa as E,R as _a,Ra as be,S as I,Sa as is,T as pe,Ta as mt,V as He,W as L,X as he,_ as Qa,aa as et,b as g,ba as W,c as K,ca as J,d as Ba,da as Ye,e as $t,ea as $e,f as e,fa as Ja,ga as Za,h as re,i as ce,ia as Xa,j as Dt,k as Oa,ka as Nt,l as Pa,la as Ge,m as dt,ma as me,n as Et,na as ze,o as Ra,oa as ve,p as Wa,pa as It,q as ja,qa as ts,r as Ha,ra as es,s as ut,sa as kt,t as Ya,ta as as,u as Ga,v as Yt,va as Ke,w as We,wa as Ve,xa as M,y as xt,ya as Q,za as f}from"./c-64P324KW.js";var ma=t=>`novum.sync:${t}`,$a=new Set,Qt={state:"idle",at:0,error:""},Bt=null,xe=null,pa=!1,De=!1,Ee=null,va=()=>{try{return JSON.parse(localStorage.getItem(ma(Bt)))||{version:0,dirty:!1}}catch{return{version:0,dirty:!1}}},ba=t=>{try{localStorage.setItem(ma(Bt),JSON.stringify(t))}catch{}},ha=t=>{Qt={...Qt,...t},$a.forEach(a=>a(Qt))},Qs=()=>Qt,Us=t=>($a.add(t),()=>$a.delete(t));async function _s(t){let a=await Ue("PUT","/data",{data:I(),baseVersion:t.version});ba({version:a.version,dirty:!1})}async function ot(){if(!(!Bt||!st())){if(pa){De=!0;return}pa=!0,ha({state:"syncing"});try{let t=va(),a=await Ue("GET","/data");if(a.version>t.version){let n=I();!t.dirty||(a.data?.savedAt||0)>=(n.savedAt||0)?(he(a.data,{remote:!0}),t={version:a.version,dirty:!1},ba(t)):(t={version:a.version,dirty:!0},await _s(t))}else(t.dirty||a.version===0)&&await _s({...t,version:a.version});ha({state:"synced",at:Date.now(),error:""})}catch(t){t.status===409?De=!0:ha({state:t.offline?"offline":"error",error:t.message})}finally{pa=!1,De&&(De=!1,setTimeout(ot,300))}}}var Js=()=>{document.visibilityState==="visible"&&ot()};function Qo(t){return Te(),Bt=t,Ee=pe((a,n)=>{if(n.remote)return;let s=va();s.dirty||ba({...s,dirty:!0}),clearTimeout(xe),xe=setTimeout(ot,2e3)}),window.addEventListener("online",ot),document.addEventListener("visibilitychange",Js),ot()}function Te(){Ee&&Ee(),Ee=null,clearTimeout(xe),window.removeEventListener("online",ot),document.removeEventListener("visibilitychange",Js),Bt=null,Qt={state:"idle",at:0,error:""}}async function Zs(){clearTimeout(xe),Bt&&va().dirty&&await ot()}function ga(t){try{localStorage.removeItem(ma(t)),localStorage.removeItem(`novum.activity.${t}`)}catch{}}var wa=()=>{let t=st()?.user?.id;return t?`novum.activity.${t}`:""};function Cn(){try{let t=JSON.parse(localStorage.getItem(wa())||"null");return t&&Array.isArray(t.items)?t:null}catch{return null}}function sn(t){try{wa()&&localStorage.setItem(wa(),JSON.stringify({items:t.items,unread:t.unread,at:Date.now()}))}catch{}}var nn=()=>{let t=Cn();return t?{items:t.items,unread:t.unread,loaded:!0,cachedAt:t.at}:{items:[],unread:0,loaded:!1}},H=nn(),Jt=new Set,Xt=0,Ut=null,Ne=new Set,Pt=()=>Ne.forEach(t=>t(H));function pt(){return Ut||(H={...H,refreshing:!0},Pt(),Ut=(async()=>{try{let t=await fe(),a=t.items.filter(n=>!Jt.has(n.id));H={...t,items:a,unread:a.filter(n=>!n.read).length,loaded:!0,error:""},Xt=Date.now(),sn(H)}catch(t){H={...H,loaded:!0,error:t.offline?"You’re offline.":"Couldn’t load your activity right now."}}return H={...H,refreshing:!1},Ut=null,Pt(),H})(),Ut)}function ni(){H={items:[],unread:0,loaded:!1},Xt=0,Ot=null,Pt()}function oi(){H=nn(),Xt=0,Ot=null,Pt()}var on=45e3,Le=null,ln=()=>{document.visibilityState==="visible"&&Date.now()-Xt>5e3&&pt()};function Mn(){Le||(Le=setInterval(()=>{document.visibilityState==="visible"&&pt()},on),document.addEventListener("visibilitychange",ln))}function An(){clearInterval(Le),Le=null,document.removeEventListener("visibilitychange",ln)}function te(){let[t,a]=g(H);return K(()=>(Ne.add(a),Mn(),Date.now()-Xt>on&&pt(),()=>{Ne.delete(a),Ne.size||An()}),[]),t}var Ot=null,Sa=!1;function ii(){let t=te(),[a,n]=g(null);if(K(()=>{if(!t.loaded||t.error)return;if(Ot===null){Ot=new Set(t.items.map(l=>l.id));return}let i=t.items.filter(l=>!Ot.has(l.id)&&!l.read);t.items.forEach(l=>Ot.add(l.id)),i.length&&!Sa&&(M(12),n({x:i[0],more:i.length-1,at:Date.now()}))},[t.items]),K(()=>{if(!a)return;let i=setTimeout(()=>n(null),6e3);return()=>clearTimeout(i)},[a]),!a)return null;let{x:s,more:o}=a;return e`<button class="act-pop" key=${a.at} role="status" onClick=${()=>{M(),n(null),dn()}}>
    <${vt} a=${s.who.avatar} name=${s.who.firstName} size=${38} />
    <span class="act-pop-t">${cn(s)}${o>0&&e` <span class="muted">and ${o} more</span>`}</span>
    <span class="act-pop-x" aria-label="Dismiss" onClick=${i=>{i.stopPropagation(),n(null)}}>✕</span>
  </button>`}function rn(){let t=te();return e`<button class="icon-btn bell" aria-label=${`Activity${t.unread?`, ${t.unread} new`:""}`} onClick=${dn}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    ${t.unread>0&&e`<i class="bell-dot">${t.unread>9?"9+":t.unread}</i>`}
  </button>`}var fa=(t,a)=>{let n=Math.floor((a-t)/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;let s=Math.floor(n/60);if(s<24)return`${s}h ago`;let o=Math.floor(s/24);return o<7?`${o}d ago`:new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short"})},Dn={kind:"water",e:"💧",l:"Watered your garden"},Ma=t=>t.data?.kind==="water"?Dn:xt.find(a=>a.kind===t.data?.kind)||xt[0],Ca={cheer:{c:"#FF375F",f:"cheers"},buddy_request:{e:"🤝",c:"#3B9BFF",f:"requests"},buddy_accepted:{e:"🤝",c:"#30D158",f:"requests"},follow:{e:"👤",c:"#BF5AF2",f:"requests"},follow_request:{e:"👤",c:"#BF5AF2",f:"requests"},follow_accepted:{e:"✓",c:"#30D158",f:"requests"},sos:{e:"🫁",c:"#64D2FF",f:"buddies"},milestone:{e:"🎉",c:"#FFD60A",f:"buddies"}},En=t=>t.kind==="cheer"?Ma(t).e:t.kind==="milestone"&&t.data?.emoji==="💷"?"💷":Ca[t.kind]?.e||"🔔";function cn(t){let a=e`<b>${t.who.firstName}</b>`;switch(t.kind){case"cheer":{if(t.data?.kind==="water")return e`${a} watered your garden 💧`;let n=Ma(t);return e`${a} sent you ${n.e} <i>${n.l.toLowerCase()}</i>`}case"buddy_request":return e`${a} wants to be buddies`;case"buddy_accepted":return e`You and ${a} are now buddies`;case"follow":return e`${a} started following you`;case"follow_request":return e`${a} wants to follow you`;case"follow_accepted":return e`${a} accepted your follow request`;case"sos":return e`${a} was having a craving and asked for support`;case"milestone":return e`${a} hit <b class="act-hl">${t.data.label}</b> ${t.data.quit}`;default:return e`${a}`}}function xn(t){let a=[...new Map(t.map(n=>[n.who.username,n.who.firstName])).values()];return a.length===1?e`<b>${a[0]}</b>`:a.length===2?e`<b>${a[0]}</b> and <b>${a[1]}</b>`:e`<b>${a[0]}</b>, <b>${a[1]}</b> and ${a.length-2} other${a.length===3?"":"s"}`}function Tn(t,a){let n=new Date(a);n.setHours(0,0,0,0);let s=n.getTime();return t>=s?"Today":t>=s-864e5?"Yesterday":t>=s-6*864e5?"This week":"Earlier"}var Nn={cheer:1,follow:1};function In(t,a){let n=[];for(let s of t){let o=Tn(s.at,a);(!n.length||n[n.length-1].b!==o)&&n.push({b:o,rows:[]}),n[n.length-1].rows.push(s)}for(let s of n){let o=[],i={};for(let l of s.rows)Nn[l.kind]&&s.rows.filter(d=>d.kind===l.kind).length>=2?(i[l.kind]||(i[l.kind]={group:!0,kind:l.kind,id:`g:${s.b}:${l.kind}`,items:[],at:l.at},o.push(i[l.kind])),i[l.kind].items.push(l)):o.push(l);s.rows=o}return n}var Ln=t=>t.filter(a=>!a.read).length;function Zt(t){H={...H,items:t,unread:Ln(t)},sn(H),Pt()}var Xs=4500;function Ie(t,a){let n=H.items.filter(l=>t.includes(l.id));if(!n.length)return;t.forEach(l=>Jt.add(l)),Zt(H.items.filter(l=>!t.includes(l.id)));let s=!1,o=!H.items.length&&t.length>1,i=Math.max(...n.map(l=>l.at));E(a,{ms:Xs,action:{label:"Undo",onClick:()=>{s=!0,t.forEach(l=>Jt.delete(l)),Zt([...H.items,...n].sort((l,d)=>d.at-l.at))}}}),setTimeout(async()=>{if(!s){try{await(o?ta(null,i):Promise.all(t.map(l=>ta(l))))}catch(l){t.forEach(d=>Jt.delete(d)),Zt([...H.items,...n].sort((d,c)=>c.at-d.at)),E(l.offline?"You’re offline, so nothing was cleared.":"Couldn’t clear that. Try again.");return}t.forEach(l=>Jt.delete(l))}},Xs+200)}function qn(){nt({title:"Clear all notifications?",text:"This empties Activity on all your devices. Buddy and follow requests still wait for you in Buddies and Profile.",confirm:"Clear all",onConfirm:()=>{M(15),Ie(H.items.map(t=>t.id),"All cleared")}})}async function ya(t){let a=H.items.filter(s=>t.includes(s.id));if(!a.length)return;let n=a.every(s=>s.read);M(10),Zt(H.items.map(s=>t.includes(s.id)?{...s,read:!n}:s));try{await Promise.all(t.map(s=>ys(s,n)))}catch(s){Zt(H.items.map(o=>t.includes(o.id)?{...o,read:n}:o)),E(s.offline?"You’re offline. Try again when you’re back.":"Couldn’t update that. Try again.")}}var tn=88;function ka({onClear:t,onToggle:a,unread:n,children:s}){let[o,i]=g(0),[l,d]=g(!1),[c,r]=g(!1),h=$t(null),m=$t(0),u=S=>{m.current=S,i(S)},v=()=>{M(12),r(!0),setTimeout(t,260)},$=()=>{u(0),a()},b=S=>{let w=S.touches[0];h.current={x:w.clientX,y:w.clientY,base:m.current,dir:null}},p=S=>{let w=h.current;if(!w)return;let k=S.touches[0],q=k.clientX-w.x,R=k.clientY-w.y;w.dir||(Math.abs(q)>8&&Math.abs(q)>Math.abs(R)?(w.dir="h",d(!0)):Math.abs(R)>8&&(w.dir="v")),w.dir==="h"&&u(Math.max(-220,Math.min(140,w.base+q)))},y=()=>{let S=h.current;h.current=null,d(!1),!(!S||S.dir!=="h")&&(m.current>70?$():m.current<-160?v():u(m.current<-tn/2?-tn:0))};return e`<div class="act-swipe ${c?"gone":""} ${o<0||l?"open":""} ${o>0?"right":""}">
    <span class="act-mark ${o>70?"go":""}" aria-hidden="true">${n?"✓ Read":"● Unread"}</span>
    <button class="act-clear" tabindex=${o<0?0:-1} aria-hidden=${o<0?"false":"true"} onClick=${v}>Clear</button>
    <div class="act-slide ${l?"drag":""}" style=${`transform:translateX(${c?-420:o}px)`}
      onTouchStart=${b} onTouchMove=${p} onTouchEnd=${y} onTouchCancel=${y}
      onClickCapture=${S=>{m.current&&(S.stopPropagation(),S.preventDefault(),u(0))}}>
      ${s}
    </div>
  </div>`}var en=[{value:"all",label:"All"},{value:"cheers",label:"Cheers"},{value:"requests",label:"Requests"},{value:"buddies",label:"Buddies"}];function dn(){B(t=>e`<${Fn} close=${t} />`,{tall:!0})}function Fn({close:t}){let a=te(),n=Q(6e4),[s,o]=g({}),[i,l]=g("all"),[d,c]=g({});K(()=>(Sa=!0,()=>{Sa=!1}),[]),K(()=>{pt().then(p=>{p.unread&&fs().then(()=>{H={...H,unread:0},Pt()}).catch(()=>{})})},[]);let r=async(p,y,S)=>{M(10);try{await y(),o(w=>({...w,[p.id]:S})),E(S),Ft()}catch(w){E(w.message),w.queued&&o(k=>({...k,[p.id]:"Will send when you’re back online"}))}},h=a.items.filter(p=>i==="all"||Ca[p.kind]?.f===i),m=In(h,n),u=p=>s[p.id]?e`<div class="act-done">✓ ${s[p.id]}</div>`:p.kind==="sos"&&p.who.buddy?e`<${da} who=${p.who} small class="act-cheers"
        onSent=${(y,S)=>o(w=>({...w,[p.id]:S?"Will send when you’re back online":`Sent ${y.e} ${y.l.toLowerCase()}`}))} />`:p.kind==="cheer"&&p.who.buddy?e`<button class="act-chip" onClick=${()=>r(p,()=>gs(p.who.username,"heart"),`Sent 💙 back to ${p.who.firstName}`)}>💙 Send one back</button>`:p.kind==="buddy_request"?e`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>r(p,()=>Ze(p.who.username,!0),`You and ${p.who.firstName} are buddies`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>r(p,()=>Ze(p.who.username,!1),"Declined")}>Decline</button></div>`:p.kind==="follow_request"?e`<div class="act-btns">
      <button class="btn btn-primary sm" onClick=${()=>r(p,()=>Xe(p.who.username,!0),`${p.who.firstName} can now see your profile`)}>Accept</button>
      <button class="btn btn-plain sm" onClick=${()=>r(p,()=>Xe(p.who.username,!1),"Declined")}>Decline</button></div>`:null,v=p=>e`<div class="act-item ${p.read?"":"new"} ${p.kind==="sos"?"act-sos":""}">
    <button class="act-av" aria-label=${`Open ${p.who.firstName}’s profile`} onClick=${()=>ua(p.who.username)}>
      <${vt} a=${p.who.avatar} name=${p.who.firstName} size=${44} />
      <i class="act-kind" style=${`background:${Ca[p.kind]?.c||"#3B9BFF"}`} aria-hidden="true">${En(p)}</i>
    </button>
    <div class="act-main">
      <div class="act-t">${cn(p)}</div>
      <div class="act-when">${fa(p.at,n)}</div>
      ${u(p)}
    </div>
    ${!p.read&&e`<i class="act-dot" aria-label="New"></i>`}
  </div>`,$=p=>{let y=p.data?.emoji==="💷";return e`<div class="act-ms-card ${y?"money":""} ${p.read?"":"new"}">
      <span class="ms-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <div class="ms-top">
        <button class="act-av" aria-label=${`Open ${p.who.firstName}’s profile`} onClick=${()=>ua(p.who.username)}><${vt} a=${p.who.avatar} name=${p.who.firstName} size=${36} /></button>
        <span class="ms-who"><b>${p.who.firstName}</b> hit a milestone · ${fa(p.at,n)}</span>
        ${!p.read&&e`<i class="act-dot static" aria-label="New"></i>`}
      </div>
      <div class="ms-big">${y?"💷":"🎉"} ${p.data.label}</div>
      <div class="ms-sub">${p.data.quit}</div>
      ${s[p.id]?e`<div class="act-done">✓ ${s[p.id]}</div>`:p.who.buddy&&e`<${da} who=${p.who} small class="ms-cheers"
          onSent=${(S,w)=>o(k=>({...k,[p.id]:w?"Will send when you’re back online":`Sent ${S.e} ${S.l.toLowerCase()}`}))} />`}
    </div>`},b=p=>{let y=d[p.id],S=p.items.some(k=>!k.read),w=[...new Set(p.items.map(k=>p.kind==="cheer"?Ma(k).e:"👤"))].slice(0,3).join("");return e`<div class="act-group-row">
      <button class="act-item act-stack ${S?"new":""}" aria-expanded=${!!y} onClick=${()=>{M(),c(k=>({...k,[p.id]:!k[p.id]}))}}>
        <span class="stack-avs" aria-hidden="true">${[...new Map(p.items.map(k=>[k.who.username,k])).values()].slice(0,3).map((k,q)=>e`<span class="stack-av" key=${k.id} style=${`z-index:${3-q}`}><${vt} a=${k.who.avatar} name=${k.who.firstName} size=${34} /></span>`)}</span>
        <span class="act-main">
          <span class="act-t">${xn(p.items)} ${p.kind==="cheer"?e`sent you ${p.items.length} cheers ${w}`:e`started following you`}</span>
          <span class="act-when">${fa(p.items[0].at,n)} · ${y?"Hide":"Show all"}</span>
        </span>
        ${S&&e`<i class="act-dot" aria-label="New"></i>`}
      </button>
      ${y&&e`<div class="stack-list">${p.items.map(k=>e`<${ka} key=${k.id} unread=${!k.read} onClear=${()=>Ie([k.id],"Cleared")} onToggle=${()=>ya([k.id])}>${v(k)}<//>`)}</div>`}
    </div>`};return e`
    <${T} title="Activity"
      left=${a.items.length>0?e`<button class="link act-clear-all" onClick=${qn}>Clear all</button>`:null}
      right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body act-sheet">
      ${a.items.length>0&&e`<div class="act-filter"><${V} small options=${en} value=${i} onChange=${l} /></div>`}
      ${a.error&&a.items.length>0&&e`<div class="act-stale" role="status">
        <span>📡 ${a.error==="You’re offline."?"You’re offline.":"Couldn’t refresh."} Showing your last update.</span>
        <button class="link sm" disabled=${a.refreshing} onClick=${()=>{M(),pt()}}>${a.refreshing?"Trying…":"Try again"}</button>
      </div>`}
      ${a.loaded?a.error&&a.items.length===0?e`<div class="act-empty"><div class="act-empty-ic">📡</div><b>${a.error}</b><p class="muted">Your cheers and requests are safe. They’ll show up once Novum can reach the server.</p><button class="btn btn-tinted sm mt12" disabled=${a.refreshing} onClick=${()=>{M(),pt()}}>${a.refreshing?"Trying…":"Try again"}</button></div>`:a.items.length===0?e`<div class="act-empty"><div class="act-empty-ic">🔔</div><b>You’re all caught up</b><p class="muted">Cheers, requests and your buddies’ milestones will show up here.</p></div>`:h.length===0?e`<div class="act-empty sm"><b>Nothing here</b><p class="muted">No ${en.find(p=>p.value===i).label.toLowerCase()} in the last 60 days.</p></div>`:m.map(p=>e`<section class="act-group" key=${p.b}>
          <h3 class="act-gh">${p.b}</h3>
          <div class="act-card">
            ${p.rows.map(y=>y.group?e`<${ka} key=${y.id} unread=${y.items.some(S=>!S.read)} onClear=${()=>Ie(y.items.map(S=>S.id),`Cleared ${y.items.length}`)} onToggle=${()=>ya(y.items.map(S=>S.id))}>${b(y)}<//>`:e`<${ka} key=${y.id} unread=${!y.read} onClear=${()=>Ie([y.id],"Cleared")} onToggle=${()=>ya([y.id])}>${y.kind==="milestone"?$(y):v(y)}<//>`)}
          </div>
        </section>`):e`<${be} rows=${5} avatar />`}
      ${a.items.length>0&&e`<p class="muted center tiny act-foot">Swipe left to clear, right to mark as read or unread. Kept for 60 days.</p>`}
    </div>`}var ee=[{tab:"home",e:"🏠",t:"Home",d:"Your streaks, money saved and what your body is doing right now. Craving? The big “Tap here” button gives you five minutes of guided breathing. The 🔔 at the top shows cheers from buddies."},{tab:"checkin",e:"✍️",t:"Check-in",d:"Twenty seconds a day: mood, cravings and sleep. The red dot means you haven’t checked in yet today. It’s how Novum spots your patterns."},{tab:"fitness",e:"🏋️",t:"Fitness",d:"Log workouts set by set, follow a starter plan, and keep your goals and habits here too."},{tab:"progress",e:"📈",t:"Progress",d:"Rings, charts and your check-in calendar, so you can see how far you’ve come."},{tab:"profile",e:"🤝",t:"Profile",d:"Add buddies by username, choose what they see, set up notifications and change your avatar. Quitting is easier together."}],Aa=new Set,Da=!1;function un(){Da=!0,Aa.forEach(t=>t(!0))}function di({s:t,go:a}){let[n,s]=g(!t.tourDone||Da),[o,i]=g(0),[l,d]=g(null);if(K(()=>{let u=v=>{i(0),s(v)};return Aa.add(u),()=>Aa.delete(u)},[]),K(()=>{n&&a(ee[o].tab,{quiet:!0})},[n,o]),Ba(()=>{if(!n){document.documentElement.classList.remove("touring");return}document.documentElement.classList.add("touring");let u=()=>{let v=document.querySelectorAll(".tabbar .tab")[o];if(v){let $=v.getBoundingClientRect();d($.left+$.width/2)}};return u(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u),document.documentElement.classList.remove("touring")}},[n,o]),!n)return null;let c=ee[o],r=o===ee.length-1,h=()=>{M(15),Da=!1,s(!1),a("home",{quiet:!0}),I().tourDone||L(u=>{u.tourDone=!0})},m=()=>{M(),r?h():i(o+1)};return e`<div class="tour" role="dialog" aria-modal="true" aria-label="Novum tour">
    <div class="tour-dim" onClick=${m}></div>
    <div class="tour-card" key=${o}>
      <div class="tour-top"><span class="tour-e">${c.e}</span><span class="tour-step">${o+1} of ${ee.length}</span>
        ${!r&&e`<button class="link sm tour-skip" onClick=${h}>Skip</button>`}</div>
      <h3 class="tour-t">${c.t}</h3>
      <p class="tour-d">${c.d}</p>
      <div class="tour-foot">
        <div class="tour-dots">${ee.map((u,v)=>e`<i class=${v===o?"on":""}></i>`)}</div>
        <div class="tour-btns">
          ${o>0&&e`<button class="btn btn-plain sm" onClick=${()=>{M(),i(o-1)}}>Back</button>`}
          <button class="btn btn-primary sm" onClick=${m}>${r?"Let’s go":"Next"}</button>
        </div>
      </div>
    </div>
    ${l!=null&&e`<i class="tour-arrow" key=${"a"+o} style=${`left:${l}px`}></i>`}
  </div>`}var pn=864e5,hn=t=>Gt(t).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});function se(){M(),B(t=>e`<${Bn} close=${t} />`,{tall:!0})}function Bn({close:t}){let[a,n]=g(I()),s=()=>n(I()),o=j(),i=a.events.filter(d=>d.date>=o&&!d.outcome).sort((d,c)=>d.date.localeCompare(c.date)),l=ut.filter(d=>a.plans[d]);return e`
    <${T} title="Plan ahead" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Deciding what you’ll do <i>before</i> a craving hits makes you far more likely to stick to it.</p>
      <${A} header="Tough days coming up" footer="Novum reminds you the evening before and on the morning, then asks how it went.">
        ${i.map(d=>e`<${O} key=${d.id} icon=${d.emoji} iconBg="#FF9F0A" title=${d.title} detail=${d.date===o?"Today":hn(d.date)} chevron
          onClick=${()=>Fe(d,s)} />`)}
        <${O} icon=${f.plus()} iconBg="#FF9F0A" title="Add a tough day" chevron onClick=${()=>Fe(null,s)} />
      <//>
      <${A} header="If-then plans" footer="When you use Craving SOS and say what set it off, your plan shows straight away.">
        ${l.map(d=>e`<${O} key=${d} icon="🧭" iconBg="#5E5CE6" title=${`If: ${d.toLowerCase()}`} sub=${`Then: ${a.plans[d]}`} chevron onClick=${()=>Ea(d,s)} />`)}
        ${ut.filter(d=>!a.plans[d]).length>0&&e`<div class="plan-add">
          <span class="plan-add-k">Add a plan for…</span>
          <div class="chip-row">${ut.filter(d=>!a.plans[d]).map(d=>e`<button key=${d} class="chip" style="--c:#5E5CE6" onClick=${()=>Ea(d,s)}>${d}</button>`)}</div>
        </div>`}
      <//>
    </div>`}function Ea(t,a){B(n=>e`<${On} trigger=${t} close=${()=>{n(),a?.()}} />`)}function On({trigger:t,close:a}){let[n,s]=g(I().plans[t]||""),o=()=>{M(12),L(i=>{i.plans={...i.plans},n.trim()?i.plans[t]=n.trim().slice(0,120):delete i.plans[t]}),E(n.trim()?"Plan saved 🧭":"Plan removed"),a()};return e`
    <${T} title=${`If: ${t.toLowerCase()}`} left=${e`<button class="link" onClick=${a}>Cancel</button>`} right=${e`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="Then I’ll…">
        <textarea class="note" rows="2" maxlength="120" placeholder="e.g. go for a 10-minute walk" value=${n} onInput=${i=>s(i.target.value)}></textarea>
      <//>
      <${A} header="Ideas">
        <div class="chip-row">${(de[t]||de.Other).map(i=>e`<button key=${i} class="chip ${n===i?"on":""}" style="--c:#5E5CE6" onClick=${()=>{M(),s(i)}}>${i}</button>`)}</div>
      <//>
      ${I().plans[t]&&e`<button class="btn btn-plain danger block" onClick=${()=>{s(""),L(i=>{i.plans={...i.plans},delete i.plans[t]}),E("Plan removed"),a()}}>Remove this plan</button>`}
    </div>`}function Fe(t,a){B(n=>e`<${Pn} ev=${t} close=${()=>{n(),a?.()}} />`,{tall:!0})}function Pn({ev:t,close:a}){let[n,s]=g(t||{title:"",emoji:"🎉",date:j(rt(new Date,1)),trigger:"",plan:""}),o=r=>h=>s({...n,[r]:h.target.value}),i=n.title.trim()&&n.date,l=()=>{if(!i)return;M(12);let r={...n,title:n.title.trim().slice(0,40),plan:(n.plan||"").trim().slice(0,160)};L(h=>{t?h.events=h.events.map(m=>m.id===t.id?{...m,...r}:m):h.events=[...h.events,{...r,id:ct(),outcome:null}]}),E(t?"Saved":"Added. You’ll get a reminder the evening before 📅"),a()},d=n.trigger?de[n.trigger]||[]:[],c=n.trigger&&I().plans[n.trigger];return e`
    <${T} title=${t?"Tough day":"Add a tough day"} left=${e`<button class="link" onClick=${a}>Cancel</button>`} right=${e`<button class="link b" disabled=${!i} onClick=${l}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="What’s happening?">
        <div class="ev-title"><input class="ev-emoji-in" aria-label="Emoji" maxlength="4" value=${n.emoji} onInput=${o("emoji")} />
          <input placeholder="e.g. Jake’s party" maxlength="40" value=${n.title} onInput=${o("title")} /></div>
        <div class="emoji-strip">${Ka.map(r=>e`<button key=${r} class=${n.emoji===r?"on":""} onClick=${()=>s({...n,emoji:r})}>${r}</button>`)}</div>
      <//>
      <${A} header="When?">
        <label class="field"><span class="field-l">Date</span><span class="field-c"><input type="date" min=${j()} value=${n.date} onInput=${o("date")} /></span></label>
      <//>
      <${A} header="What might set you off?">
        <div class="chip-row">${ut.map(r=>e`<button key=${r} class="chip ${n.trigger===r?"on":""}" style="--c:#FF9F0A" onClick=${()=>{M(),s({...n,trigger:n.trigger===r?"":r})}}>${r}</button>`)}</div>
      <//>
      <${A} header="My plan" footer=${c&&!n.plan?e`Your if-then plan for ${n.trigger.toLowerCase()}: <b>${c}</b>. <button class="link sm" onClick=${()=>s({...n,plan:c})}>Use it</button>`:"Shown on the day and in your reminder."}>
        <textarea class="note" rows="3" maxlength="160" placeholder="e.g. Leave by 11, stick to soft drinks, text Amy if it gets hard" value=${n.plan} onInput=${o("plan")}></textarea>
        ${d.length>0&&e`<div class="chip-row pad-chips">${d.map(r=>e`<button key=${r} class="chip" style="--c:#FF9F0A" onClick=${()=>{M(),s({...n,plan:n.plan?`${n.plan.replace(/[.\s]*$/,"")}. ${r}`:r})}}>＋ ${r}</button>`)}</div>`}
      <//>
      ${t&&e`<button class="btn btn-plain danger block" onClick=${()=>{L(r=>{r.events=r.events.filter(h=>h.id!==t.id)}),E("Removed"),a()}}>Delete</button>`}
    </div>`}function $n({s:t}){let a=j(),n=j(rt(new Date,-3)),s=j(rt(new Date,14)),o=t.events.filter(c=>!c.outcome&&c.date<a&&c.date>=n),i=t.events.filter(c=>!c.outcome&&c.date===a),l=t.events.filter(c=>!c.outcome&&c.date>a&&c.date<=s).sort((c,r)=>c.date.localeCompare(r.date));if(!o.length&&!i.length&&!l.length)return null;let d=(c,r)=>{M(r==="quit"?20:10),L(h=>{h.events=h.events.map(m=>m.id===c.id?{...m,outcome:r}:m)}),E(r==="quit"?`You got through ${c.title} 💪 That’s huge.`:"Thanks for being honest. Next time, adjust the plan.")};return e`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Plan ahead</h2><button class="link sm" onClick=${se}>See all</button></div>
    <div class="stack">
      ${o.map(c=>e`<div class="card ev-card ask" key=${c.id}>
        <div class="ev-top"><span class="ev-e">${c.emoji}</span><span class="row-main"><b>How did ${c.title} go?</b><small>${hn(c.date)}</small></span></div>
        <div class="act-btns"><button class="btn btn-primary sm" onClick=${()=>d(c,"quit")}>Stayed quit 💪</button><button class="btn btn-plain sm" onClick=${()=>d(c,"slip")}>I slipped</button></div>
      </div>`)}
      ${i.map(c=>e`<button class="card ev-card today tap" key=${c.id} onClick=${()=>Fe(c)}>
        <div class="ev-top"><span class="ev-e">${c.emoji}</span><span class="row-main"><span class="ev-k">Today</span><b>${c.title}</b></span></div>
        ${c.plan?e`<p class="ev-plan"><span>Your plan</span>${c.plan}</p>`:e`<p class="ev-plan empty">No plan yet. Tap to add one.</p>`}
      </button>`)}
      ${l.length>0&&e`<div class="card list">${l.map(c=>{let r=Va(new Date,Gt(c.date));return e`<${O} key=${c.id} icon=${c.emoji} iconBg="#FF9F0A" title=${c.title} detail=${r===1?"Tomorrow":`in ${r} days`} chevron onClick=${()=>Fe(c)} />`})}</div>`}
    </div>
  </section>`}function mn({s:t,picked:a,onPick:n}){let s=a.map(i=>t.plans[i]&&{t:i,p:t.plans[i]}).filter(Boolean)[0],o=[...ut].sort((i,l)=>(t.plans[l]?1:0)-(t.plans[i]?1:0));return e`<div class="sos-plan">
    <div class="sos-plan-k">What set it off?</div>
    <div class="sos-plan-chips">${o.map(i=>e`<button key=${i} class="chip sm ${a.includes(i)?"on":""} ${t.plans[i]?"has":""}" style="--c:#5E5CE6" onClick=${()=>{M(),n(i)}}>${t.plans[i]?"🧭 ":""}${i}</button>`)}</div>
    ${s?e`<div class="card sos-plan-card" key=${s.t}><span class="spc-k">Your plan for ${s.t.toLowerCase()}</span><b>${s.p}</b></div>`:a.length>0?e`<button class="link sm sos-plan-add" onClick=${()=>Ea(a[0])}>No plan for ${a[0].toLowerCase()} yet. Make one for next time</button>`:null}
  </div>`}var qe=t=>{let a=[...t].sort((s,o)=>s-o),n=a.length;return n?n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2:null},ae=t=>t<60?`${Math.max(1,Math.round(t))} sec`:`${Math.round(t/60)} min`;function Rn(t,a=Date.now()){let n=t.cravings.filter(c=>c.t<=a),s=n.filter(c=>c.beaten),o=s.filter(c=>c.secs>5),i=ue(new Date(a)).getTime(),l=Array.from({length:8},(c,r)=>{let h=i-(7-r)*7*pn,m=h+7*pn,u=n.filter(v=>v.t>=h&&v.t<m);return{from:h,n:u.length,secs:qe(u.filter(v=>v.beaten&&v.secs>5).map(v=>v.secs))}}),d=null;if(o.length>=6){let c=Math.floor(o.length/3),r=[...o].sort((u,v)=>u.t-v.t),h=qe(r.slice(0,c).map(u=>u.secs)),m=qe(r.slice(-c).map(u=>u.secs));d={from:h,to:m}}return{total:n.length,beaten:s.length,typical:qe(o.map(c=>c.secs)),weeks:l,trend:d}}function vn({s:t}){let a=Rn(t);if(!a.total)return null;let n=Math.max(1,...a.weeks.map(i=>i.n)),s=Math.round(a.beaten/a.total*100),o=a.trend&&a.trend.to<a.trend.from*.85?`Your cravings are getting shorter: from about ${ae(a.trend.from)} to ${ae(a.trend.to)}.`:a.trend&&a.trend.to>a.trend.from*1.15?`Cravings have been lasting a bit longer lately (${ae(a.trend.to)}). Tough patches pass. Keep using SOS.`:a.typical?`Most of your cravings pass in about ${ae(a.typical)}. You only ever have to outlast this one.`:"Use Craving SOS when one hits to see how long they last.";return e`<section class="group">
    <h2 class="group-h">Craving SOS</h2>
    <div class="card pad cstats">
      <div class="cs-tiles">
        <div><b>${a.typical?ae(a.typical):"–"}</b><span>typical craving</span></div>
        <div><b>${a.beaten}<small>/${a.total}</small></b><span>beaten (${s}%)</span></div>
      </div>
      <div class="cs-chart" aria-label="Cravings per week, last 8 weeks">
        ${a.weeks.map((i,l)=>e`<div class="cs-col" key=${l}>
          <span class="cs-n">${i.n||""}</span>
          <span class="cs-bar" style=${`height:${i.n/n*100}%`}></span>
          <span class="cs-d">${l===7?"Now":new Date(i.from).toLocaleDateString("en-GB",{day:"numeric",month:"short"}).replace(" "," ")}</span>
        </div>`)}
      </div>
      <p class="insight">${o}</p>
      <p class="tiny muted">Cravings per week from Craving SOS. Typical time is from opening SOS to tapping “I beat it”.</p>
    </div>
  </section>`}var D=t=>e`<svg class="ic gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,xa=[{k:"target",e:"🎯",l:"Target",s:()=>D(e`<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />`)},{k:"dumbbell",e:"🏋️",l:"Weights",s:()=>D(e`<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" /><path d="m2.5 21.5 1.4-1.4" /><path d="m20.1 3.9 1.4-1.4" /><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" /><path d="m9.6 14.4 4.8-4.8" />`)},{k:"footprints",e:"🏃",l:"Running",s:()=>D(e`<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" /><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" /><path d="M16 17h4" /><path d="M4 13h4" />`)},{k:"bike",e:"🚴",l:"Cycling",s:()=>D(e`<circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" />`)},{k:"waves",e:"🏊",l:"Swimming",s:()=>D(e`<path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" /><path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" /><path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />`)},{k:"mountain",e:"⛰️",l:"Hiking",s:()=>D(e`<path d="m8 3 4 8 5-5 5 15H2L8 3z" />`)},{k:"heart-pulse",e:"❤️",l:"Health",s:()=>D(e`<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />`)},{k:"weight",e:"⚖️",l:"Weight",s:()=>D(e`<circle cx="12" cy="5" r="3" /><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />`)},{k:"droplet",e:"💧",l:"Water",s:()=>D(e`<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />`)},{k:"bed",e:"😴",l:"Sleep",s:()=>D(e`<path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />`)},{k:"moon",e:"🌙",l:"Night",s:()=>D(e`<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />`)},{k:"sun",e:"☀️",l:"Morning",s:()=>D(e`<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />`)},{k:"alarm-clock",e:"⏰",l:"Wake up",s:()=>D(e`<circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3 2 6" /><path d="m22 6-3-3" /><path d="M6.38 18.7 4 21" /><path d="M17.64 18.67 20 21" />`)},{k:"salad",e:"🥗",l:"Eat well",s:()=>D(e`<path d="M19.496 12a2.5 2.5 0 00.399-2.214A2 2 0 0020.32 6.5 2 2 0 0019 3a2 2 0 00-1.5.68 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 12l4-4" /><path d="M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z" /><path d="M7 21h10" /><path d="M9.85 6.907A3.5 3.5 0 005.05 12" />`)},{k:"apple",e:"🍎",l:"Fruit",s:()=>D(e`<path d="M12 6.528V3a1 1 0 0 1 1-1h0" /><path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" />`)},{k:"utensils",e:"🍽️",l:"Meals",s:()=>D(e`<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />`)},{k:"coffee",e:"☕",l:"Coffee",s:()=>D(e`<path d="M10 2v2" /><path d="M14 2v2" /><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" /><path d="M6 2v2" />`)},{k:"cigarette-off",e:"🚭",l:"No smoking",s:()=>D(e`<path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" /><path d="M18 8c0-2.5-2-2.5-2-5" /><path d="m2 2 20 20" /><path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" /><path d="M22 8c0-2.5-2-2.5-2-5" /><path d="M7 12v4" />`)},{k:"wine-off",e:"🍺",l:"No alcohol",s:()=>D(e`<path d="M8 22h8" /><path d="M7 10h3m7 0h-1.343" /><path d="M12 15v7" /><path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198" /><line x1="2" x2="22" y1="2" y2="22" />`)},{k:"wind",e:"💨",l:"Breathe",s:()=>D(e`<path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" />`)},{k:"leaf",e:"🌿",l:"Leaf",s:()=>D(e`<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20" /><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13" />`)},{k:"sprout",e:"🌱",l:"Grow",s:()=>D(e`<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" /><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" /><path d="M5 21h14" />`)},{k:"trees",e:"🌳",l:"Outdoors",s:()=>D(e`<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />`)},{k:"piggy-bank",e:"💷",l:"Save",s:()=>D(e`<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" /><path d="M16 10h.01" /><path d="M2 8v1a2 2 0 0 0 2 2h1" />`)},{k:"wallet",e:"👛",l:"Spending",s:()=>D(e`<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />`)},{k:"landmark",e:"🏦",l:"Bank",s:()=>D(e`<path d="M10 18v-7" /><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" /><path d="M14 18v-7" /><path d="M18 18v-7" /><path d="M3 22h18" /><path d="M6 18v-7" />`)},{k:"briefcase",e:"💼",l:"Work",s:()=>D(e`<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />`)},{k:"book-open",e:"📖",l:"Study",s:()=>D(e`<path d="M12 5v16" /><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />`)},{k:"book",e:"📚",l:"Books",s:()=>D(e`<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />`)},{k:"graduation-cap",e:"🎓",l:"Exams",s:()=>D(e`<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />`)},{k:"brain",e:"🧠",l:"Mind",s:()=>D(e`<path d="M12 18V5" /><path d="M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4" /><path d="M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294" /><path d="M17.996 5.125a4 4 0 012.526 5.77" /><path d="M18 18a4 4 0 002-7.465" /><path d="M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517" /><path d="M6 18a4 4 0 01-2-7.465" /><path d="M6.004 5.125a4 4 0 00-2.526 5.77" />`)},{k:"pen-line",e:"✍️",l:"Write",s:()=>D(e`<path d="M13 21h8" /><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />`)},{k:"languages",e:"🗣️",l:"Language",s:()=>D(e`<path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />`)},{k:"code",e:"💻",l:"Code",s:()=>D(e`<path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" />`)},{k:"music",e:"🎵",l:"Music",s:()=>D(e`<path d="M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19" /><circle cx="18" cy="16" r="3" /><circle cx="6" cy="19" r="3" />`)},{k:"guitar",e:"🎸",l:"Guitar",s:()=>D(e`<path d="m11.9 12.1 4.514-4.514" /><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z" /><path d="m6 16 2 2" /><path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" />`)},{k:"palette",e:"🎨",l:"Art",s:()=>D(e`<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />`)},{k:"camera",e:"📷",l:"Photos",s:()=>D(e`<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /><circle cx="12" cy="13" r="3" />`)},{k:"gamepad-2",e:"🎮",l:"Gaming",s:()=>D(e`<line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" /><line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" /><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />`)},{k:"sparkles",e:"✨",l:"Tidy",s:()=>D(e`<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />`)},{k:"house",e:"🏠",l:"Home",s:()=>D(e`<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`)},{k:"dog",e:"🐶",l:"Pets",s:()=>D(e`<path d="M11.25 16.25h1.5L12 17z" /><path d="M16 14v.5" /><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" /><path d="M8 14v.5" /><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />`)},{k:"users",e:"👥",l:"People",s:()=>D(e`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" />`)},{k:"smile",e:"😊",l:"Mood",s:()=>D(e`<path d="M15 10V9" /><path d="M16.472 15a6 6 0 01-8.943 0" /><path d="M9 10V9" /><circle cx="12" cy="12" r="10" />`)},{k:"heart",e:"💙",l:"Love",s:()=>D(e`<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />`)},{k:"shield-check",e:"🛡️",l:"Stay strong",s:()=>D(e`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />`)},{k:"flame",e:"🔥",l:"Streak",s:()=>D(e`<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />`)},{k:"zap",e:"⚡",l:"Energy",s:()=>D(e`<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />`)},{k:"star",e:"⭐",l:"Star",s:()=>D(e`<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />`)},{k:"trophy",e:"🏆",l:"Win",s:()=>D(e`<path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" /><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" /><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />`)},{k:"plane",e:"✈️",l:"Travel",s:()=>D(e`<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />`)},{k:"tent",e:"⛺",l:"Adventure",s:()=>D(e`<path d="M3.5 21 14 3" /><path d="M20.5 21 10 3" /><path d="M15.5 21 12 15l-3.5 6" /><path d="M2 21h20" />`)}],bn=Object.fromEntries(xa.map(t=>[t.k,t])),Wn={"🎯":"target","💪":"dumbbell","🏋️":"dumbbell","🏃":"footprints","🚴":"bike","🧘":"heart-pulse","💧":"droplet","😴":"bed","🥗":"salad","🍎":"apple","💷":"piggy-bank","🏦":"landmark","📚":"book","📖":"book-open","🎓":"graduation-cap","🧠":"brain","✍️":"pen-line","🎸":"guitar","🧹":"sparkles","☀️":"sun","🌙":"moon","❤️":"heart","🔥":"flame","⭐":"star","🏆":"trophy","✈️":"plane","💨":"wind","🌿":"leaf"},Be=t=>bn[t?.icon]||bn[Wn[t?.emoji]]||null;function St({g:t}){let a=Be(t);return a?a.s():e`<span class="gi-emoji">${t?.emoji||"🎯"}</span>`}var jn=is(()=>import("./c-EG7PQIKZ.js"),"FlowGame",()=>e`<div class="lazy-wait" role="status">Loading the puzzle…</div>`),Hn=300,Yn=["Breathe in","Hold","Breathe out"];function Di({compact:t}){return e`<button class="sos tap ${t?"compact":""}" onClick=${ne}>
    <span class="sos-ic">🫁</span>
    <span class="row-main"><span class="sos-t">Craving? Tap here</span>
      ${!t&&e`<span class="sos-s">Breathe through it for 5 minutes. It will pass.</span>`}</span>
    <span class="row-chev">${f.chevron()}</span>
  </button>`}function ne(){B(t=>e`<${Gn} close=${t} />`,{tall:!0})}function Gn({close:t}){let a=I(),[n]=g(Date.now()),s=Q(250),[o,i]=g("ride"),[l,d]=g("breathe"),[c,r]=g(!0),[h,m]=g(a.quits.map(x=>x.id)),[u,v]=g([]),[$,b]=g([]),[p,y]=g(0),S=(s-n)/1e3,w=Math.max(0,Hn-Math.floor(S)),k=S%14,q=k<4?0:k<8?1:2,R=$t(q);K(()=>{o==="ride"&&R.current!==q&&(R.current=q,M(q===0?12:6))},[q]);let[jt]=g(()=>{let x=a.quits,U=x.reduce((_,At)=>_+J(At,W(At)),0),ht=[...Ya].sort(()=>Math.random()-.5).slice(0,4),lt=a.reasons.map(_=>({k:"Your reason",e:"💙",t:_.text})),Ht=[{k:"Money saved",e:"💷",t:`${G(U)} so far. This craving wants to take that back.`}];x.forEach(_=>{let At=W(_)/z,Re=ye(At);Ht.push({k:`${_.label}-free`,e:_.emoji,t:`${Math.floor(At)} days in.${Re.next?` ${Re.next.label} in ${ft(Re.next.days-At)}. Don’t reset the clock for five minutes of nothing.`:""}`})}),ht.forEach(_=>Ht.push({k:"Try this now",e:_.e,t:_.t}));let Pe=[];for(let _=0;_<Math.max(lt.length,Ht.length);_++)lt[_]&&Pe.push(lt[_]),Ht[_]&&Pe.push(Ht[_]);return Pe}),gt=jt[Math.floor(S/9)%jt.length],[P,C]=g(null);K(()=>{ea("open").then(C).catch(()=>{})},[]);let F=x=>{M(15),r(x),y(Math.round(S)),i("log"),x&&ea("beaten").catch(()=>{})},Z=(x,U,ht)=>{M(),U(x.includes(ht)?x.filter(lt=>lt!==ht):[...x,ht])},it=()=>{let x=a.cravings.filter(U=>U.beaten).length+(c?1:0);L(U=>U.cravings.push({id:ct(),t:Date.now(),quitIds:h,triggers:u,beaten:c,secs:p})),$.forEach(U=>$e(U)),t(),E(c?`Craving beaten. That’s ${x} 🛡️`:$.length?"Counter restarted. Go again.":"Logged. Keep going.")};if(o==="log")return e`
      <${T} title=${c?"Craving beaten":"That’s okay"} right=${e`<button class="link b" onClick=${it}>Save</button>`} />
      <div class="sheet-body">
        <div class="sos-done">
          <div class="sos-done-e">${c?"🛡️":"🤝"}</div>
          <h2>${c?"You rode it out.":"One slip doesn’t undo the work."}</h2>
          <p class="muted">${c?`${p<60?"Under a minute":`${Math.round(p/60)} minute${Math.round(p/60)===1?"":"s"}`} and it passed. Every craving you beat makes the next one weaker.`:"Most people who quit for good slipped along the way. What matters is the next choice. Logging it honestly helps you spot the pattern."}</p>
        </div>
        <${A} header="Which craving?">
          <div class="chip-row">${a.quits.map(x=>e`<button class="chip big ${h.includes(x.id)?"on":""}" style="--c:${x.color}" onClick=${()=>Z(h,m,x.id)}>${x.emoji} ${x.label}</button>`)}</div>
        <//>
        <${A} header="What set it off?" footer="Pick any that fit. Progress shows your most common triggers.">
          <div class="chip-row">${ut.map(x=>e`<button class="chip big ${u.includes(x)?"on":""}" style="--c:#3B9BFF" onClick=${()=>Z(u,v,x)}>${x}</button>`)}</div>
        <//>
        ${!c&&e`<${A} header="Counter" footer="Only restart if you actually used. Thinking about it, or a close call, doesn’t count.">
          ${a.quits.filter(x=>h.includes(x.id)).map(x=>e`<div class="row" key=${x.id}>
            <span class="row-ic tint-ic" style="--c:${x.color}">${x.emoji}</span>
            <span class="row-main"><span class="row-title">Restart ${x.label.toLowerCase()} counter</span><span class="row-sub">Best run is kept on record</span></span>
            <${at} on=${$.includes(x.id)} label=${`Restart ${x.label}`} onChange=${()=>Z($,b,x.id)} />
          </div>`)}
        <//>`}
        <button class="btn btn-primary block big" onClick=${it}>Save</button>
      </div>`;let yt=Math.floor(w/60),Mt=X(w%60);return e`
    <${T} title="Craving SOS" left=${e`<button class="link" onClick=${t}>Close</button>`} />
    <div class="sheet-body sos-body">
      ${l==="game"?e`<${jn} onExit=${()=>{M(),d("breathe")}} />`:e`
      <div class="breath-stage">
        <div class="breath-ring"></div>
        <div class="breath"></div>
        <div class="breath-label">${Yn[q]}</div>
      </div>
      <div class="sos-timer">${w>0?e`<b>${yt}:${Mt}</b><span>Cravings peak and fade within 5–10 minutes. Ride the wave.</span>`:e`<b>Done</b><span>Five minutes. How’s the craving now?</span>`}</div>
      ${P&&e`<p class="sos-pulse">🌍 ${P.now>0?e`<b>${P.now===1?"Someone else is":`${P.now} others are`}</b> riding one out right now. `:""}${P.beaten>0?e`<b>${P.beaten}</b> craving${P.beaten===1?"":"s"} beaten on Novum in the last day. You’re next.`:"You’re not alone in this. Every craving passes."}</p>`}
      <${Ms} s=${a} />
      <${mn} s=${a} picked=${u} onPick=${x=>v(u.includes(x)?u.filter(U=>U!==x):[...u,x])} />
      <div class="card sos-card" key=${gt.t}>
        <span class="sos-card-e">${gt.e}</span>
        <div><div class="sos-card-k">${gt.k}</div><div class="sos-card-t">${gt.t}</div></div>
      </div>
      <button class="sos-game" onClick=${()=>{M(),d("game")}}><span>🧩</span><span class="row-main"><b>Play a 2-minute puzzle instead</b><small>Keeping your eyes and mind busy weakens the craving</small></span></button>
      ${a.reasons.length===0&&e`<button class="link sm center-link" onClick=${Rt}>Add your reasons for quitting, so they show up here</button>`}`}
      <${Kn} />
      <div class="sos-actions">
        <button class="btn btn-primary block big ${w===0?"glow":""}" onClick=${()=>F(!0)}>I beat it 💪</button>
        <button class="btn btn-plain block" onClick=${()=>F(!1)}>I gave in</button>
      </div>
    </div>`}function Rt(){B(t=>e`<${zn} close=${t} />`,{tall:!0})}function zn({close:t}){let a=I(),[n,s]=g(""),o=l=>{l=l.trim(),l&&(M(10),L(d=>d.reasons.push({id:ct(),text:l})),s(""))},i=new Set(a.reasons.map(l=>l.text));return e`
    <${T} title="My reasons" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Why did you quit? Write it in your own words. These show up in Craving SOS and on Home, when you need them most.</p>
      <div class="card entry-add">
        <input placeholder="I quit because…" value=${n} maxlength="140" onInput=${l=>s(l.target.value)} onKeyDown=${l=>l.key==="Enter"&&o(n)} />
        <button class="btn btn-primary sm" disabled=${!n.trim()} onClick=${()=>o(n)}>Add</button>
      </div>
      ${a.reasons.length>0&&e`<${A} header="Your reasons">
        ${a.reasons.map(l=>e`<div class="row" key=${l.id}>
          <span class="row-ic" style="background:#3B9BFF">💙</span>
          <span class="row-main"><span class="row-title">${l.text}</span></span>
          <button class="icon-btn muted" aria-label="Delete reason" onClick=${()=>L(d=>{d.reasons=d.reasons.filter(c=>c.id!==l.id)})}>${f.trash()}</button>
        </div>`)}
      <//>`}
      <${A} header="Ideas" footer="Tap to add. Edit later by deleting and rewriting in your own words.">
        ${Ga.filter(l=>!i.has(l)).map(l=>e`<button class="row tap" key=${l} onClick=${()=>o(l)}>
          <span class="row-main"><span class="row-title">${l}</span></span>
          <span class="add-pill">${f.plus()}</span>
        </button>`)}
      <//>
    </div>`}function Kn(){let t=Ae(),[a,n]=g(0),[s,o]=g(0),[i,l]=g([]),[d,c]=g(!1),r=$t(0);if(K(()=>{if(!a)return;let m=async()=>{try{let $=(await fe()).items.filter(b=>b.kind==="cheer"&&b.at>=a-2e3).reverse();$.length>r.current&&M([12,40,12]),r.current=$.length,l($)}catch{}};m();let u=setInterval(m,6e3);return()=>clearInterval(u)},[a]),!t.loaded||!t.buddies.length)return null;let h=async()=>{if(!d){c(!0),M(12);try{let m=await ks();o(m.sent),n(m.at||Date.now())}catch(m){E(m.message)}c(!1)}};return a?e`<div class="card sos-cheers">
    <div class="sos-cheers-h">💙 Sent to ${s} bud${s===1?"dy":"dies"}. ${i.length?"They’re with you:":"Their cheers will pop up here."}</div>
    ${i.map(m=>{let u=xt.find(v=>v.kind===m.data.kind)||xt[0];return e`<div class="sos-cheer" key=${m.id}><${vt} a=${m.who.avatar} name=${m.who.firstName} size=${30} /><span><b>${m.who.firstName}</b> ${u.e} ${u.l.toLowerCase()}</span></div>`})}
  </div>`:e`<button class="sos-ask" disabled=${d} onClick=${h}>
    <span>🤝</span><span class="row-main"><b>${d?"Asking…":"Ask my buddies for support"}</b><small>They’ll get a notification and can cheer you on</small></span>
  </button>`}function oe(){B(t=>e`<${Vn} close=${t} />`,{tall:!0})}function Vn({close:t}){let a=I(),n=new Set(a.quits.map(b=>b.kind)),s=Dt.filter(b=>!n.has(b.kind)),[o,i]=g(null),[l,d]=g(""),[c,r]=g(Kt(new Date)),[h,m]=g(""),u=o?Oa(o):null,v=o&&c&&(o!=="other"||l.trim()),$=()=>{M(15),L(b=>b.quits.push({id:o,kind:o,label:o==="other"?l.trim():u.label,emoji:u.emoji,color:u.color,start:c,monthly:parseFloat(h)||0,best:0,resets:[]})),t(),E(`${o==="other"?l.trim():u.label} added`)};return e`
    <${T} title="Add something to quit" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!v} onClick=${$}>Add</button>`} />
    <div class="sheet-body">
      <div class="pick-grid">
        ${s.map(b=>e`<button class="pick ${o===b.kind?"on":""}" style="--c:${b.color}" onClick=${()=>{M(),i(b.kind)}}>
          <span class="pick-e">${b.emoji}</span><span class="pick-l">${b.label}</span><span class="pick-tick">${f.check()}</span></button>`)}
      </div>
      ${o&&e`
        <${A} header="Details" footer="Quitting soon? Pick a future date and Novum will count down to it.">
          ${o==="other"&&e`<${Y} label="What is it?"><input placeholder="e.g. Social media" maxlength="24" value=${l} onInput=${b=>d(b.target.value)} /><//>`}
          <${Y} label="Quit at"><input type="datetime-local" value=${c} onInput=${b=>r(b.target.value)} /><//>
          <${Y} label="Cost per month (£)"><input type="number" inputmode="decimal" placeholder="0" value=${h} onInput=${b=>m(b.target.value)} /><//>
        <//>
        <button class="btn btn-primary block big" disabled=${!v} onClick=${$}>Add</button>`}
    </div>`}function ie(t){B(a=>e`<${_n} id=${t} close=${a} />`,{tall:!0})}function _n({id:t,close:a}){let s=I().quits.find(y=>y.id===t),[o,i]=g(s?.start||""),[l,d]=g(String(s?.monthly??0)),[c,r]=g(String(s?Tt(s):20));if(!s)return e`<${T} title="Removed" right=${e`<button class="link b" onClick=${a}>Done</button>`} />`;let h=Kt(rt(new Date,60)),m=o&&!Number.isNaN(zt(o).getTime())&&o<=h&&parseFloat(l)>=0,u=()=>{m&&(M(12),L(y=>{let S=y.quits.find(k=>k.id===t);S.start=o,S.monthly=parseFloat(l);let w=parseFloat(c);Number.isFinite(w)&&w>=0&&(S.minutes=Math.min(1440,w))}),a())},v=W(s),$=Math.max(s.best||0,v),b=()=>nt({title:`Remove ${s.label}`,danger:!0,text:`This removes the ${s.label.toLowerCase()} counter, its milestones and its money tracking. Check-ins and goals stay.`,confirm:"Remove",onConfirm:()=>{a(),L(y=>{y.quits=y.quits.filter(S=>S.id!==t)}),E(`${s.label} removed`)}}),p=parseFloat(l)||0;return e`
    <${T} title=${`${s.emoji} ${s.label}`} left=${e`<button class="link" onClick=${a}>Cancel</button>`} right=${e`<button class="link b" disabled=${!m} onClick=${u}>Save</button>`} />
    <div class="sheet-body">
      <${A} header="Quit date and time" footer="Quitting soon? You can pick a date up to 60 days ahead.">
        <${Y} label="Quit at"><input type="datetime-local" value=${o} max=${h} onInput=${y=>i(y.target.value)} /><//>
      <//>
      <${A} header="What it cost you" footer=${`About ${G(p*12/52)} a week, or ${G(p*12,0)} a year. If it varied, use a middle figure.`}>
        <${Y} label="Per month (£)"><input type="number" inputmode="decimal" step="1" value=${l} onInput=${y=>d(y.target.value)} /><//>
      <//>
      <${A} header="Time it took" footer=${`Minutes a day, roughly: buying, using, recovering.${je[s.kind]?` Usually ${je[s.kind]} minutes for ${s.kind==="weed"?"cannabis":"nicotine"}.`:""} Used for “time reclaimed” on Home.`}>
        <${Y} label="Per day (min)"><input type="number" inputmode="numeric" min="0" max="1440" value=${c} onInput=${y=>r(y.target.value)} /><//>
      <//>
      <div class="stats3">
        <div><b>${Math.floor(v/z)}</b><span>days now</span></div>
        <div><b>${Math.floor($/z)}</b><span>best run</span></div>
        <div><b>${(s.resets||[]).length}</b><span>restarts</span></div>
      </div>
      ${dt(s)&&e`<button class="btn btn-plain block" onClick=${()=>le(t)}>See the health timeline</button>`}
      ${(s.resets||[]).length>0&&s.monthly>0&&e`<p class="muted center tiny">Saved overall, slips included: <b>${G(Za(s),0)}</b></p>`}
      ${v>0&&e`<button class="btn btn-tinted block" onClick=${()=>Me(Ce([s],v/z,J(s,v)))}>Share my streak</button>`}
      ${v>0&&e`<button class="btn btn-plain block" onClick=${()=>{a(),setTimeout(()=>Ta(t),350)}}>I slipped</button>`}
      <button class="btn btn-plain danger block" onClick=${b}>Remove from Novum</button>
    </div>`}function le(t){B(a=>e`<${Qn} initial=${t} close=${a} />`,{tall:!0})}function Qn({initial:t,close:a}){let s=I().quits.filter(h=>dt(h)),[o,i]=g(t),l=s.find(h=>h.id===o)||s[0];if(!l)return e`<${T} title="Recovery timeline" right=${e`<button class="link b" onClick=${a}>Done</button>`} />`;let d=W(l)/36e5,c=dt(l)||[],r=h=>h===0?"Before you start":h<1?`${Math.round(h*60)} minutes`:h<48?`${h} hours`:h<336?`${Math.round(h/24)} days`:h<1440?`${Math.round(h/168)} weeks`:h<8760?`${Math.round(h/730)} months`:"1 year";return e`
    <${T} title="Recovery timeline" right=${e`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      ${s.length>1&&e`<div class="pad-b"><${V} small=${s.length>3} options=${s.map(h=>({value:h.id,label:`${h.emoji} ${h.label}`}))} value=${l.id} onChange=${i} /></div>`}
      <ol class="timeline" style="--c:${l.color}">
        ${c.map(h=>{let m=d>=h.h;return e`<li class=${m?"done":""}>
            <span class="tl-dot">${m?f.check():""}</span>
            <div class="tl-when">${r(h.h)} · ${h.area}${m?"":e` <em>in ${ft((h.h-d)/24)}</em>`}</div>
            <div class="tl-title">${h.title}</div>
            <div class="tl-text">${h.text}</div>
          </li>`})}
      </ol>
      <p class="disclaimer">${Pa}</p>
    </div>`}function Ta(t){B(a=>e`<${Un} id=${t} close=${a} />`,{tall:!0})}function Un({id:t,close:a}){let n=I(),s=n.quits.filter(P=>et(P)<=new Date),[o,i]=g(t&&s.some(P=>P.id===t)?t:s[0]?.id),[l,d]=g("now"),[c,r]=g(Kt(new Date)),[h,m]=g([]),[u,v]=g(""),[$,b]=g(null),p=n.quits.find(P=>P.id===o);if(!p)return e`<${T} title="Slipped up" right=${e`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body"><p class="muted center sheet-intro">There’s no running counter to reset yet.</p></div>`;if($)return e`
    <${T} right=${e`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body slip-done">
      <div class="wiz-emoji">🌱</div>
      <h2 class="auth-title center">Fresh start</h2>
      <p class="wiz-sub center">Your ${p.label.toLowerCase()} counter starts again now. That’s all a slip is: a restart, not a reset of you.</p>
      <div class="stats3">
        <div><b>${Math.floor($.best/z)}</b><span>best run (days)</span></div>
        <div><b>${G($.life,0)}</b><span>saved overall</span></div>
        <div><b>1 day</b><span>next milestone</span></div>
      </div>
      <button class="btn btn-primary block big" onClick=${()=>{a(),setTimeout(ne,300)}}>Breathe for a minute</button>
      <button class="btn btn-plain block big" onClick=${a}>I’m okay</button>
    </div>`;let y=l==="now"?new Date:zt(c),S=l==="now"||!Number.isNaN(y.getTime())&&y<=new Date&&y>=et(p),w=Math.max(0,(S?y:new Date)-et(p)),k=Math.max(p.best||0,w),q=Ja(p)-W(p),R=J(p,q+w),jt=P=>{M(6),m(h.includes(P)?h.filter(C=>C!==P):[...h,P])},gt=()=>{S&&($e(p.id,{at:y,triggers:h,note:u.trim()}),M(15),b({best:k,life:R}))};return e`
    <${T} title="Slipped up" left=${e`<button class="link" onClick=${a}>Cancel</button>`} />
    <div class="sheet-body">
      <div class="slip-hero">
        <div class="wiz-emoji">🤍</div>
        <h2 class="auth-title center">A slip isn’t starting over</h2>
        <p class="wiz-sub center">Most people who quit for good had a few goes first. What matters is the next hour, not the last one.</p>
      </div>
      ${s.length>1&&e`<${A} header="Which one">
        <div class="pad"><${V} options=${s.map(P=>({value:P.id,label:`${P.emoji} ${P.label}`}))} value=${o} onChange=${i} /></div>
      <//>`}
      <${A} header="When" footer=${S?"":e`<span class="err">Pick a time after your quit date and not in the future.</span>`}>
        <div class="pad"><${V} options=${[{value:"now",label:"Just now"},{value:"earlier",label:"Earlier"}]} value=${l} onChange=${d} /></div>
        ${l==="earlier"&&e`<${Y} label="At"><input type="datetime-local" value=${c} max=${Kt(new Date)} onInput=${P=>r(P.target.value)} /><//>`}
      <//>
      <${A} header="What set it off?" footer="Optional. Spotting patterns is how next time goes differently. They show up in Progress.">
        <div class="chip-row">${ut.map(P=>e`<button class="chip big ${h.includes(P)?"on":""}" aria-pressed=${h.includes(P)} onClick=${()=>jt(P)}>${P}</button>`)}</div>
      <//>
      <${A} header="Anything else?">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="280" placeholder="What happened, how you felt, what might help next time…" value=${u} onInput=${P=>v(P.target.value)}></textarea></div>
      <//>
      <div class="card pad slip-keep">
        <div><span>🏅</span><span>Your best run of <b>${Math.floor(k/z)} day${Math.floor(k/z)===1?"":"s"}</b> stays on record.</span></div>
        ${p.monthly>0&&e`<div><span>💷</span><span>You’ve still saved <b>${G(R,0)}</b> overall. That doesn’t go anywhere.</span></div>`}
      </div>
      <button class="btn btn-primary block big" disabled=${!S} onClick=${gt}>Restart my counter</button>
    </div>`}var Ct=864e5;function gn({s:t}){let[a,n]=g(0),s=za(t.quits);if(!s.length)return null;let o=new Date,i=Math.floor(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())/Ct),l=s[(i*7+a)%s.length];return e`<section class="group">
    <div class="card tip-card">
      <div class="tip-top"><span class="tip-k">${a?"Another tip":"Tip of the day"}</span>
        <button class="link sm tip-next" onClick=${()=>{M(),n(a+1)}} aria-label="Show another tip">Another ↻</button></div>
      <div class="tip-body" key=${l.t}><span class="tip-e" aria-hidden="true">${l.e}</span><p class="tip-t">${l.t}</p></div>
    </div>
  </section>`}var Jn=[{value:182,label:"6 months"},{value:365,label:"1 year"}];function Zn(t,a,n=Date.now()){let s=n+a*Ct,o=t.quits.reduce((h,m)=>h+J(m,W(m,n)),0),i=t.quits.reduce((h,m)=>h+J(m,W(m,s)),0),l=[],d=[];for(let h of t.quits){let m=W(h,n),u=W(h,s);for(let $ of dt(h)||[])$.h*36e5>m&&$.h*36e5<=u&&l.push({q:h,x:$});let v=ce.filter($=>$.days*Ct>m&&$.days*Ct<=u).pop();v&&d.push({q:h,m:v,days:Math.floor(u/Ct)})}let c=[...t.wishlist].sort((h,m)=>h.price-m.price).filter(h=>h.price>o&&h.price<=i),r=Math.max(0,...t.quits.map(h=>Math.floor(W(h,s)/Ct)));return{at:s,savedNow:o,savedThen:i,gain:i-o,unlocks:l,milestones:d,wishes:c,days:r}}function fn({s:t}){let a=Q(6e4),[n,s]=g(182);if(!t.quits.length)return null;let o=Zn(t,n,a),i=new Date(o.at).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),l=o.unlocks.slice(-4);return e`<section class="group">
    <div class="group-h-row"><h2 class="group-h">Future you</h2>
      <${V} small options=${Jn} value=${n} onChange=${s} /></div>
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
  </section>`}function Xn(t,a=Date.now()){let n=t.quits.reduce((o,i)=>o+W(i,a)/Ct*Tt(i),0),s=t.quits.filter(o=>et(o).getTime()<=a).reduce((o,i)=>o+Tt(i),0);return{hours:n/60,perDay:s}}var to=t=>t>=60?`${Math.floor(t/60)}h${t%60?` ${Math.round(t%60)}m`:""}`:`${Math.round(t)} min`;function eo(t){return t<1?"Every minute counts. It adds up fast.":t<8?`That’s about ${Math.max(1,Math.round(t*60/45))} episodes of a show.`:t<60?`That’s about ${Math.round(t/2)} films, or ${Math.round(t/1.5)} football matches.`:t<300?`That’s ${Math.round(t/24)} full days, or ${Math.round(t/8)} working days.`:`That’s ${Math.round(t/24)} full days of your life back.`}function yn({s:t}){let a=Q(6e4),n=Xn(t,a);return!t.quits.length||!n.perDay?null:e`<section class="group">
    <h2 class="group-h">Time reclaimed</h2>
    <button class="card time-card tap" onClick=${ao}>
      <div class="tc-big"><span class="tc-ic" aria-hidden="true">⏳</span><b>${n.hours>=10?Math.round(n.hours):n.hours.toFixed(1)}</b><span>hours of your life back</span></div>
      <div class="tc-sub">About ${to(n.perDay)} a day you’re not spending on it. ${eo(n.hours)}</div>
    </button>
  </section>`}function ao(){M(),B(t=>e`<${so} close=${t} />`)}function so({close:t}){let a=I(),[n,s]=g(Object.fromEntries(a.quits.map(i=>[i.id,String(Tt(i))]))),o=()=>{M(12),L(i=>{i.quits.forEach(l=>{let d=parseFloat(n[l.id]);Number.isFinite(d)&&d>=0&&(l.minutes=Math.min(1440,d))})}),t()};return e`
    <${T} title="Time it took" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" onClick=${o}>Save</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Roughly how many minutes a day did each one take? Buying, using, being away, recovering. A middle guess is fine.</p>
      <div class="card list">${a.quits.map(i=>e`<label class="field" key=${i.id}><span class="field-l">${i.emoji} ${i.label}</span>
        <span class="field-c"><input type="number" inputmode="numeric" min="0" max="1440" value=${n[i.id]} onInput=${l=>s({...n,[i.id]:l.target.value})} /> min</span></label>`)}</div>
      <p class="muted center tiny mt12">As a guide: nicotine usually takes 10–30 minutes a day, cannabis 10–45.</p>
    </div>`}var no=mt(()=>import("./c-QMGZ2L5S.js"),"startWorkout"),oo=mt(()=>import("./c-QMGZ2L5S.js"),"openLogger");function kn({s:t,go:a}){let n=t.fitness||{},s=n.active,o=m=>Math.max(0,...(n.workouts||[]).filter(u=>u.rid===m.id).map(u=>u.start)),i=[...n.routines||[]].sort((m,u)=>o(m)-o(u))[0],l=(n.workouts||[]).some(m=>j(new Date(m.start))===j()),[d,c,r,h]=s?[s.name,"Workout in progress","Resume",oo]:l?["Trained today",i?`Next up: ${i.name}`:"Nice work","Open",()=>a("fitness")]:i?[i.name,`Up next · ${i.ex.length} exercise${i.ex.length===1?"":"s"}`,"Start",()=>no(i)]:["Start training","Pick a starter plan or log a workout","Go",()=>a("fitness")];return e`<button class="card fx-home tap ${s?"live":""}" onClick=${h}>
    <span class="row-ic tinted fx-home-ic" style="--c:#30D158">${l&&!s?f.check():f.dumbbell()}</span>
    <span class="row-main"><span class="row-title">${d}</span><span class="row-sub">${c}</span></span>
    <span class="btn btn-tinted sm">${r}</span>
  </button>`}function il({s:t,go:a}){let n=Q(6e4),s=j(),o=t.checkins[s],i=t.quits.reduce((k,q)=>k+(q.monthly||0),0),l=new Date(n).getHours(),d=l<5?"Up late":l<12?"Good morning":l<18?"Good afternoon":"Good evening",c=t.goals.filter(k=>k.type==="habit"),r=t.quits.length>0,h=r&&t.quits.every(k=>k.start===t.quits[0].start),[m,u]=g(null),v=t.quits.find(k=>k.id===m)||t.quits[0],$=v?W(v,n)/z:0,b=Math.ceil((Lt-n)/z),p=t.quits.filter(k=>dt(k)),y=t.quits.filter(k=>W(k,n)>0),S=()=>{M();let k=Math.min(...y.map(q=>W(q,Date.now())/z));Me(Ce(y,k,y.reduce((q,R)=>q+J(R,W(R,Date.now())),0)))},w=()=>Promise.all([Promise.resolve(ot()).catch(()=>{}),Ft(),pt()]);return e`<${wt} title="Novum" eyebrow=${new Date(n).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}
      sub=${re} titleRight=${e`<${rn} />`} onRefresh=${w}>
    <p class="greet"><button class="greet-av" aria-label="Your profile" onClick=${()=>a("profile")}><${vt} a=${t.social?.avatar} name=${ke()} size=${36} /></button><span>${d}${ke()?`, ${ke()}`:""}.</span></p>
    <${Ps} />

    ${!r&&e`<section class="group first"><h2 class="group-h">Training</h2><${kn} s=${t} go=${a} /></section>`}

    <section class="group ${r?"first":""}">
      ${y.length?e`<div class="group-h-row"><h2 class="group-h">Your streaks</h2>
        <button class="link sm b share-link" onClick=${S}>${f.share()} Share</button></div>`:e`<h2 class="group-h">${r?"Your streaks":"Get started"}</h2>`}
      ${r?e`<div class="stack">
        ${t.quits.map(k=>e`<${ro} key=${k.id} q=${k} />`)}
        ${t.quits.length<Dt.length&&e`<${lo} />`}
      </div>`:e`<button class="card add-first tap" onClick=${oe}>
        <span class="row-ic" style="background:#3B9BFF">${f.plus()}</span>
        <span class="row-main"><span class="row-title">Track something you’re quitting</span><span class="row-sub">Vaping, smoking, alcohol, gambling and more</span></span>
        <span class="row-chev">${f.chevron()}</span>
      </button>`}
    </section>

    ${r&&e`<section class="group">
      <h2 class="group-h">When it gets hard</h2>
      <div class="card support">
        <button class="sup-sos" onClick=${ne}>
          <span class="sos-ic">🫁</span>
          <span class="row-main"><span class="sos-t">Craving? Tap here</span><span class="sos-s">Five minutes of guided breathing. It will pass.</span></span>
          <span class="row-chev">${f.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${()=>Ta()}>
          <span class="sup-slip-e">🌱</span><span class="row-main">Slipped up? <b>Reset without the guilt</b></span><span class="row-chev">${f.chevron()}</span>
        </button>
        <button class="sup-slip" onClick=${se}>
          <span class="sup-slip-e">🧭</span><span class="row-main">Tough day coming? <b>Plan ahead</b></span><span class="row-chev">${f.chevron()}</span>
        </button>
        ${t.reasons.length>0?e`<button class="sup-why" onClick=${Rt}>
              <span class="why-k">Remember why</span>
              <span class="why-t">“${t.reasons[Math.floor(n/864e5)%t.reasons.length].text}”</span>
            </button>`:e`<button class="sup-why add" onClick=${Rt}>
              <span class="why-k">Remember why</span>
              <span class="why-add">+ Add your reasons for quitting</span>
            </button>`}
      </div>
    </section>`}

    <${Cs} s=${t} />

    ${r&&e`<${$n} s=${t} />`}

    ${r&&e`<${gn} s=${t} />`}

    <${Gs} />

    ${i>0&&e`<section class="group">
      <h2 class="group-h">Money saved</h2>
      <button class="card money-card tap" onClick=${Na}>
        <${io} quits=${t.quits} />
        <div class="mc-sub">${G(i,0)} a month back in your pocket · ${G(i*12,0)} a year</div>
        <${uo} s=${t} />
      </button>
    </section>`}

    ${r&&e`<${yn} s=${t} />`}

    ${r&&e`<${fn} s=${t} />`}

    ${r&&e`<section class="group">
      <div class="group-h-row">
        <h2 class="group-h">Milestones</h2>
        ${!h&&e`<${V} small options=${t.quits.map(k=>({value:k.id,label:k.label}))} value=${v.id} onChange=${u} />`}
      </div>
      <div class="badges">
        ${ce.map(k=>{let q=$>=k.days;return e`<div class="badge ${q?"got":""}">
            <div class="badge-medal">${q?f.check():k.short}</div>
            <div class="badge-l">${k.label}</div>
            <div class="badge-s">${q?"Earned":`in ${ft(k.days-$)}`}</div>
          </div>`})}
      </div>
      ${h&&t.quits.length>1&&e`<p class="group-f">Counting for all of them, since you stopped at the same time.</p>`}
    </section>`}

    <section class="group">
      <h2 class="group-h">Today</h2>
      <button class="card checkin-card tap" onClick=${()=>a("checkin")}>
        ${o&&o.mood?e`
          <span class="cc-emoji">${Yt[o.mood-1].e}</span>
          <span class="cc-main"><b>Checked in · feeling ${Yt[o.mood-1].l.toLowerCase()}</b>
            <span>${t.quits.map(k=>`${k.label} craving ${o[k.id]??"–"}/10`).join(" · ")}</span></span>`:e`
          <span class="cc-emoji pulse">✍️</span>
          <span class="cc-main"><b>How are you today?</b><span>Log mood, cravings and sleep. It takes 20 seconds.</span></span>`}
        <span class="row-chev">${f.chevron()}</span>
      </button>
      ${r&&e`<div class="mt8"><${kn} s=${t} go=${a} /></div>`}
      ${c.length>0&&e`<div class="card list mt8">
        ${c.map(k=>e`<${co} key=${k.id} g=${k} />`)}
      </div>`}
    </section>

    ${p.length>0&&e`<section class="group">
      <h2 class="group-h">Right now in your body</h2>
      <div class="card list">
        ${p.map(k=>{let q=W(k,n)/36e5,R=Ss(k,q);return e`<button class="row tap body-row" onClick=${()=>le(k.id)}>
            <span class="row-ic tint-ic" style="--c:${k.color}" title=${R.current?R.current.area:"Getting started"}>${R.current?ws(R.current.area):"🌱"}</span>
            <span class="row-main">
              <span class="row-title">${R.current?R.current.title:"Just getting started"}</span>
              <span class="row-sub">${R.current?R.current.text:"Your first changes start within hours."}</span>
              ${R.next&&e`<span class="row-next">Next: ${R.next.title.toLowerCase()} in ${ft(R.next.h/24-q/24)}</span>`}
            </span>
            <span class="row-chev">${f.chevron()}</span>
          </button>`})}
      </div>
      <p class="group-f">General information, not medical advice.</p>
    </section>`}

    ${b>0?e`
      <button class="card ny-card tap" onClick=${Wt}>
        <div class="ny-year">2027</div>
        <div class="ny-t">${b} day${b===1?"":"s"} to go. Plan your year.</div>
        <div class="ny-s">Pick goals for health, fitness, money and study. Start with ideas made for you.</div>
        <span class="btn btn-primary sm">See ideas</span>
      </button>`:e`<button class="card ny-card tap" onClick=${()=>a("progress")}>
        <div class="ny-year">2027</div><div class="ny-t">See your year at a glance</div><span class="btn btn-primary sm">Open</span>
      </button>`}
  <//>`}function io({quits:t}){let a=Q(1e3);return e`<div class="mc-big">${G(t.reduce((n,s)=>n+J(s,W(s,a)),0))}</div>`}function lo(){return e`<button class="card quit-card qc-add tap" onClick=${oe} aria-label="Add something else to quit">
    <div class="qc-head"><span class="qc-add-ic">${f.plus()}</span><span class="qc-label">Quitting something else?</span></div>
    <div class="qc-body">
      <div class="qc-time" aria-hidden="true">
        <span><b>0</b><small>days</small></span><span><b>00</b><small>hrs</small></span><span><b>00</b><small>min</small></span>
      </div>
      <span class="qc-add-ring" aria-hidden="true">${f.plus()}</span>
    </div>
    <div class="qc-foot">Smoking, alcohol, gambling, energy drinks and more. Each gets its own counter.</div>
  </button>`}function ro({q:t}){let a=Q(1e3),n=et(t).getTime();if(n>a){let{d:h,h:m,m:u}=Ye(n-a);return e`<button class="card quit-card tap" onClick=${()=>ie(t.id)} style="--qc:${t.color}">
      <div class="qc-head"><span class="qc-emoji">${t.emoji}</span><span class="qc-label">${t.label}: quit day coming up</span></div>
      <div class="qc-body"><div class="qc-time">
        <span><b>${h}</b><small>${h===1?"day":"days"}</small></span><span><b>${X(m)}</b><small>hrs</small></span><span><b>${X(u)}</b><small>min</small></span>
      </div></div>
      <div class="qc-foot">Your counter starts ${et(t).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}. You’ve got this.</div>
    </button>`}let s=W(t,a),{d:o,h:i,m:l,s:d}=Ye(s),c=s/z,r=ye(c);return e`<button class="card quit-card tap" onClick=${()=>ie(t.id)} style="--qc:${t.color}">
    <div class="qc-head"><span class="qc-emoji">${t.emoji}</span><span class="qc-label">${t.label}-free</span>
      ${t.monthly>0&&e`<span class="qc-saved">${G(J(t,s))} saved</span>`}</div>
    <div class="qc-body">
      <div class="qc-time">
        <span><b>${o}</b><small>${o===1?"day":"days"}</small></span>
        <span><b>${X(i)}</b><small>hrs</small></span>
        <span><b>${X(l)}</b><small>min</small></span>
        <span class="qc-sec"><b>${X(d)}</b><small>sec</small></span>
      </div>
      <${Vt} pct=${r.pct} size=${70} stroke=${8} color=${t.color}>
        ${r.next?e`<span class="ring-txt" aria-label=${`Next milestone ${aa[r.next.days]}, ${sa(r.next.days-c)} to go`}><small>next</small><b>${aa[r.next.days]}</b><small>in ${sa(r.next.days-c)}</small></span>`:e`<span class="ring-txt">🏆</span>`}
      <//>
    </div>
    <div class="qc-foot">${r.next?`Next milestone: ${r.next.label}, in ${ft(r.next.days-c)}`:"Every milestone earned. Legend."}</div>
  </button>`}function co({g:t}){let a=(t.ticks||[]).includes(j()),n=It(t);return e`<div class="row">
    <span class="row-ic tinted" style=${`--c:${t.color}`}><${St} g=${t} /></span>
    <span class="row-main"><span class="row-title">${t.name}</span>
      <span class="row-sub">${n.value>0?`🔥 ${n.value} ${n.unit} streak`:we(t)}</span></span>
    <button class="tick ${a?"on":""}" style="--c:${t.color}" aria-pressed=${a} aria-label=${`Mark ${t.name} done today`}
      onClick=${s=>{s.stopPropagation(),qt(t.id)}}>${f.check()}</button>
  </div>`}var Oe=(t,a=Date.now())=>t.quits.reduce((n,s)=>n+J(s,W(s,a)),0);function uo({s:t}){let a=Q(6e4),n=Oe(t,a),s=[...t.wishlist].sort((l,d)=>l.price-d.price);if(!s.length)return e`<div class="wish-line add">🎁 What could it buy? <b>Add something to save for</b></div>`;let o=s.filter(l=>l.price<=n),i=s.find(l=>l.price>n);return e`<div class="wish-line">
    ${o.length>0&&e`<div class="wl-got">✓ That’s ${o[o.length-1].emoji} ${o[o.length-1].name}${o.length>1?` and ${o.length-1} more`:""}</div>`}
    ${i&&e`<div class="wl-next"><span>Next: ${i.emoji} ${i.name}</span><b>${Math.floor(n/i.price*100)}%</b></div>
      <div class="wl-bar"><i style="width:${Math.min(100,n/i.price*100)}%"></i></div>`}
  </div>`}function Na(){B(t=>e`<${po} close=${t} />`,{tall:!0})}function po({close:t}){let a=I(),n=Q(1e3),s=Oe(a,n),[o,i]=g("🎁"),[l,d]=g(""),[c,r]=g(""),h=[...a.wishlist].sort(($,b)=>$.price-b.price),m=new Set(a.wishlist.map($=>$.name.toLowerCase())),u=$=>{M(10),L(b=>{b.wishlist.push({id:ct(),emoji:$.emoji||"🎁",name:$.name.trim().slice(0,40),price:+$.price})})},v=l.trim()&&parseFloat(c)>0;return e`
    <${T} title="What it could buy" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="wish-hero"><div class="kicker">Saved by quitting</div><div class="mc-big">${G(s)}</div>
        <p class="muted">Money you’d have spent. Put some aside and treat yourself when you hit one.</p></div>
      ${h.length>0&&e`<${A} header="Saving for">
        ${h.map($=>{let b=Math.min(1,s/$.price);return e`<div class="row wish-row" key=${$.id}>
            <span class="row-ic" style="background:var(--fill-2)">${$.emoji}</span>
            <span class="row-main"><span class="row-title">${$.name}</span>
              <span class="row-sub">${b>=1?"✓ You could buy this now":`${G($.price-s,0)} to go · ${Math.floor(b*100)}%`}</span>
              <span class="wl-bar"><i style="width:${b*100}%;${b>=1?"background:var(--green)":""}"></i></span></span>
            <span class="row-detail">${G($.price,0)}</span>
            <button class="icon-btn muted" aria-label=${`Remove ${$.name}`} onClick=${()=>L(p=>{p.wishlist=p.wishlist.filter(y=>y.id!==$.id)})}>${f.trash()}</button>
          </div>`})}
      <//>`}
      <${A} header="Add your own">
        <div class="wish-add">
          <input class="wish-emoji" aria-label="Emoji" maxlength="4" value=${o} onInput=${$=>i($.target.value)} />
          <input placeholder="e.g. Festival ticket" maxlength="40" value=${l} onInput=${$=>d($.target.value)} />
          <span class="wish-price">£<input type="number" inputmode="decimal" placeholder="0" value=${c} onInput=${$=>r($.target.value)} /></span>
          <button class="btn btn-primary sm" disabled=${!v} onClick=${()=>{u({emoji:o,name:l,price:parseFloat(c)}),d(""),r(""),i("🎁")}}>Add</button>
        </div>
      <//>
      ${We.some($=>!m.has($.name.toLowerCase()))&&e`<${A} header="Ideas" footer="Rough prices. Add one, then delete and re-add it with your own price if it’s different.">
        ${We.filter($=>!m.has($.name.toLowerCase())).map($=>e`<button class="row tap" key=${$.name} onClick=${()=>u($)}>
          <span class="row-ic" style="background:var(--fill-2)">${$.emoji}</span>
          <span class="row-main"><span class="row-title">${$.name}</span></span>
          <span class="row-detail">${G($.price,0)}</span>
          <span class="add-pill">${f.plus()}</span>
        </button>`)}
      <//>`}
    </div>`}var ho=mt(()=>import("./c-YYGBGV44.js"),"openAdmin"),$o=mt(()=>import("./c-5E4HNI4E.js"),"openPrivacy"),mo=mt(()=>import("./c-3FQIKJHC.js"),"openCredits"),N={tools:"#3B9BFF",health:"#30D158",social:"#FF9F0A",settings:"#A2A8B8",danger:"#FF453A"};function vo(){let[t,a]=g(Qs());K(()=>Us(a),[]),Q(3e4);let s={syncing:"Saving…",synced:`Saved to your account ${(i=>{let l=Math.round((Date.now()-i)/6e4);return l<1?"just now":l<60?`${l} min ago`:`${Math.round(l/60)} hr ago`})(t.at)}`,offline:"Offline. Changes save when you’re back online",error:t.error||"Couldn’t save. Tap to retry",idle:"Waiting to save"}[t.state],o={syncing:f.refresh,synced:f.cloud,offline:f.wifiOff,error:f.alert,idle:f.cloud}[t.state]();return e`<${O} icon=${o} tint=${t.state==="error"?N.danger:N.settings} title="Account sync" sub=${s} onClick=${()=>{M(),ot()}} />`}function wn(){let[t,a]=g(I());return K(()=>pe(n=>a(n)),[]),t}var bo=(t,a)=>`${t} ${a}${t===1?"":"s"}`;function go({s:t}){let a=Q(6e4),n=t.quits.filter(l=>et(l).getTime()<=a),s=n.length?Math.max(...n.map(l=>Math.floor(W(l,a)/864e5))):0,o=Oe(t,a),i=Xa(t);return e`<div class="pstats">
    <div><b>${s}</b><span>${s===1?"day free":"days free"}</span></div>
    <div><b>${G(o,0)}</b><span>saved</span></div>
    <div><b>${i}</b><span>check-in streak</span></div>
  </div>`}function xl({s:t}){let[a,n]=g(0),s=async()=>{await Promise.all([Promise.resolve(ot()).catch(()=>{}),us().catch(()=>{}),Ft(),pt()]),n(p=>p+1)},o=t.profile,i=st()?.user||{},l=Nt(o),d=me(l,o.heightCm),c=ze(d),r=t.quits.filter(p=>dt(p)),h=Ae(),m=Q(6e4),u=_t(),v=te(),$=[...new Set(v.items.filter(p=>p.kind==="cheer"&&p.data?.kind==="water"&&m-p.at<7*864e5).map(p=>p.who.firstName))],b=e`<button class="icon-btn gear-btn" aria-label="Account settings" onClick=${Eo}>${f.gear()}</button>`;return e`<${wt} title="Profile" titleRight=${b} onRefresh=${s}>
    <${Hs} key=${a} s=${t} />
    ${t.quits.length>0&&e`<${go} s=${t} />`}
    <section class="group"><${js} s=${t} waterers=${$} /></section>
    <section class="group"><${Ws} earned=${Rs(t,m)} mine s=${t} /></section>
    <section class="group">
      <button class="card find-card tap" onClick=${()=>Ys("discover")}>
        <span class="row-ic tinted find-ic" style=${`--c:${N.social}`}>${f.search()}</span>
        <span class="row-main"><span class="row-title">Find people</span><span class="row-sub">Search by name or @username, or browse public profiles</span></span>
        <span class="row-chev">${f.chevron()}</span>
      </button>
    </section>

    <${A} header="Your quits">
      ${t.quits.map(p=>{let y=et(p).getTime(),S=Math.floor((m-y)/864e5);return e`<${O} key=${p.id} icon=${p.emoji} tint=${p.color} title=${p.label}
          detail=${y>m?"Quit day soon":bo(S,"day")} chevron onClick=${()=>ie(p.id)} />`})}
      ${t.quits.length<Dt.length&&e`<${O} icon=${f.plus()} tint=${N.tools} title="Add something to quit" chevron onClick=${oe} />`}
    <//>

    <${A} header="Staying quit">
      <${O} icon=${f.heart()} tint=${N.tools} title="My reasons" detail=${t.reasons.length||"Add"} chevron onClick=${Rt} />
      <${O} icon=${f.mail()} tint=${N.tools} title="Letters to future you" detail=${(t.letters||[]).length||"Write one"} chevron onClick=${As} />
      <${O} icon=${f.calendar()} tint=${N.tools} title="Plan ahead" detail=${Object.keys(t.plans||{}).length+(t.events||[]).filter(p=>!p.outcome&&p.date>=j()).length||"Add"} chevron onClick=${se} />
      ${t.quits.some(p=>p.monthly>0)&&e`<${O} icon=${f.gift()} tint=${N.tools} title="Saving for" detail=${t.wishlist.length||"Add"} chevron onClick=${Na} />`}
    <//>

    <${A} header="Health">
      ${r.length>0&&e`<${O} icon=${f.pulse()} tint=${N.health} title="Recovery timeline" chevron onClick=${()=>le(r[0].id)} />`}
      <${O} icon=${f.person()} tint=${N.health} title="Body" chevron onClick=${fo}
        detail=${e`<span class="body-detail">${l?`${l.toFixed(1)} kg`:"Add weight"}${d&&e`<span class="pill sm ${c.tone}">BMI ${d.toFixed(1)}</span>`}</span>`} />
    <//>

    <${A} header="Friends">
      <${O} icon=${f.users()} tint=${N.social} title="Buddies" detail=${h.loaded?h.incoming.length?`${h.incoming.length} new`:h.buddies.length||"Add":""} chevron onClick=${zs} />    <//>


    <${A} header="Settings">
      <${O} icon=${f.bell()} tint=${N.settings} title="Notifications" detail=${ia()?u.enabled?"On":"Off":"Not set up"} chevron onClick=${ko} />
      <${O} icon=${f.shield()} tint=${N.settings} title="Your data & privacy" chevron onClick=${So} />
      <${O} icon=${f.compass()} tint=${N.settings} title="Show the tour again" chevron onClick=${un} />
      ${i.isAdmin&&e`<${O} icon=${f.sliders()} tint=${N.settings} title="Admin" chevron onClick=${ho} />`}
    <//>

    <div class="about">
      <img src="icons/icon-192.png" alt="" width="56" height="56" />
      <b>NOVUM</b>
      <span>${re}</span>
      <span class="tiny">Version 2.0</span>
    </div>
  <//>`}function fo(){B(t=>e`<${yo} close=${t} />`,{tall:!0})}function yo({close:t}){let n=wn().profile,s=Nt(n),o=me(s,n.heightCm),i=ze(o),l=Ge(n),d=o?Math.max(0,Math.min(100,(o-15)/20*100)):0;return e`
    <${T} title="Body" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${A}>
        <${O} icon=${f.ruler()} tint=${N.health} title="Age and height" detail=${`${l??"–"} · ${n.heightCm?`${n.heightCm} cm`:"–"}`} chevron onClick=${Ao} />
        <${O} icon=${f.scale()} tint=${N.health} title="Weight" detail=${s?`${s.toFixed(1)} kg`:"Add"} chevron onClick=${Ia} />
      <//>
      <${A} footer="BMI is a rough guide. It doesn’t tell muscle from fat, so use it alongside how you feel and perform.">
        <div class="bmi">
          <div class="bmi-top"><div><div class="kicker">BMI</div><div class="bmi-v">${o?o.toFixed(1):"–"}</div></div><span class="pill ${i.tone}">${i.label}</span></div>
          <div class="bmi-scale"><i class="z1"></i><i class="z2"></i><i class="z3"></i><i class="z4"></i>${o&&e`<b style="left:${d}%"></b>`}</div>
          <div class="bmi-ticks"><span>15</span><span style="left:17.5%">18.5</span><span style="left:50%">25</span><span style="left:75%">30</span><span>35</span></div>
        </div>
      <//>
    </div>`}function ko(){B(t=>e`<${wo} close=${t} />`,{tall:!0})}function wo({close:t}){let a=wn();return e`
    <${T} title="Notifications" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body"><${jo} s=${a} header=${null} /></div>`}function So(){B(t=>e`<${Co} close=${t} />`,{tall:!0})}function Co({close:t}){let a=$t(),n=async s=>{let o=s.target.files[0];if(s.target.value="",!o)return;let i=await o.text(),l="";try{let d=JSON.parse(i);l=d.exportedAt?` from ${tt(new Date(d.exportedAt))}`:""}catch{E("That file isn’t valid JSON");return}nt({title:"Restore backup",text:`Replace everything in your account with the backup${l}? Your current data will be overwritten on every device.`,confirm:"Restore backup",onConfirm:()=>{try{Ua(i),E("Backup restored")}catch(d){E(d.message)}}})};return e`
    <${T} title="Your data & privacy" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${A} footer="Your data is encrypted and saved to your Novum account, so it follows you to any device you log in on.">
        <${vo} />
        <${O} icon=${f.doc()} tint=${N.settings} title="Privacy notice" sub="What’s stored, who can see it, your rights" chevron onClick=${$o} />
        <${O} icon=${f.star()} tint=${N.settings} title="Credits & licences" sub="The artists and code Novum is built with" chevron onClick=${mo} />
      <//>
      <${A} header="Backups">
        <${O} icon=${f.share()} tint=${N.tools} title="Export a copy" sub="Everything: account, profile, check-ins, goals" chevron onClick=${Mo} />
        <${O} icon=${f.download()} tint=${N.tools} title="Restore from a file" sub="Replaces your account’s data" chevron onClick=${()=>a.current.click()} />
        <input type="file" accept="application/json,.json" ref=${a} onChange=${n} hidden />
      <//>
      <${A} footer="Clears every counter, check-in, goal and note and takes you back to Day Zero. Your login stays the same.">
        <${O} icon=${f.undo()} tint=${N.danger} title="Start over" danger onClick=${()=>nt({title:"Start over",text:"This clears every counter, check-in, goal and note in your account and takes you back to Day Zero. Your login stays the same.",confirm:"Clear and start over",onConfirm:()=>{_e(),he(_a()),E("Fresh start")}})} />
      <//>
    </div>`}async function Mo(){let t=st()?.user||{},a=Qa({firstName:t.firstName,lastName:t.lastName,username:t.username,email:t.email,dob:t.dob,memberSince:t.createdAt?new Date(t.createdAt).toISOString():""}),n=`novum-backup-${j()}.json`,s=new File([a],n,{type:"application/json"});try{if(navigator.canShare&&navigator.canShare({files:[s]})){await navigator.share({files:[s],title:"Novum backup"});return}}catch(i){if(i.name==="AbortError")return}let o=document.createElement("a");o.href=URL.createObjectURL(s),o.download=n,document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(o.href),o.remove()},1e3),E("Backup saved")}function Ao(){B(t=>e`<${Do} close=${t} />`)}function Do({close:t}){let a=I().profile,[n,s]=g(a.dob||""),[o,i]=g(a.heightCm?String(a.heightCm):""),l=/^\d{4}-\d{2}-\d{2}$/.test(n)&&Gt(n)<new Date,d=l&&+o>=100&&+o<=250,c=async()=>{if(n!==a.dob)try{await ge({dob:n})}catch(r){E(r.message);return}L(r=>{r.profile.dob=n,r.profile.heightCm=Math.round(+o)}),M(12),t()};return e`
    <${T} title="Age and height" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!d} onClick=${c}>Save</button>`} />
    <div class="sheet-body">
      <${A} footer=${l?`${Ge({dob:n})} years old`:""}>
        <${Y} label="Date of birth"><input type="date" max=${j()} value=${n} onInput=${r=>s(r.target.value)} /><//>
        <${Y} label="Height (cm)"><input type="number" inputmode="decimal" value=${o} onInput=${r=>i(r.target.value)} /><//>
      <//>
    </div>`}function Eo(){B(t=>e`<${xo} close=${t} />`,{tall:!0})}function xo({close:t}){let a=st()?.user||{},[n,s]=g({firstName:a.firstName||"",lastName:a.lastName||"",username:a.username||""}),[o,i]=g(null),[l,d]=g(!1),c=Object.keys(n).some(u=>n[u].trim()!==(a[u]||"")),r=u=>v=>s({...n,[u]:v.target.value}),h=async()=>{d(!0),i(null);let u=Object.fromEntries(Object.keys(n).filter(v=>n[v].trim()!==(a[v]||"")).map(v=>[v,n[v].trim()]));try{await ge(u),M(15),E("Account updated"),i(null)}catch(v){i({err:v.message})}d(!1)},m=()=>nt({title:"Log out",danger:!1,confirm:"Log out",text:"Your data is saved to your account. Log back in on any device to pick up where you left off. This phone stops getting notifications until you log in again.",onConfirm:async()=>{t(),await To()}});return e`
    <${T} title="Account" left=${e`<button class="link" onClick=${t}>Close</button>`} right=${e`<button class="link b" disabled=${!c||l} onClick=${h}>${l?"Saving…":"Save"}</button>`} />
    <div class="sheet-body">
      <${A} header="Your details" footer=${o?.err?e`<span class="err">${o.err}</span>`:`Member since ${a.createdAt?tt(new Date(a.createdAt)):"–"}`}>
        <${Y} label="First name"><input autocomplete="given-name" autocapitalize="words" value=${n.firstName} onInput=${u=>s({...n,firstName:Ve(u.target.value)})} /><//>
        <${Y} label="Last name"><input autocomplete="family-name" autocapitalize="words" value=${n.lastName} onInput=${u=>s({...n,lastName:Ve(u.target.value)})} /><//>
        <${Y} label="Username"><input autocapitalize="none" autocorrect="off" spellcheck="false" value=${n.username} onInput=${r("username")} /><//>
        <${O} title="Email" detail=${a.email} chevron onClick=${No} />
      <//>
      <${A}>
        <${O} icon=${f.key()} tint=${N.settings} title="Change password" chevron onClick=${Lo} />
        <${O} icon=${f.phone()} tint=${N.settings} title="Logged-in devices" chevron onClick=${Ro} />
        <${O} icon=${f.logout()} tint=${N.settings} title="Log out" chevron onClick=${m} />
      <//>
      <${A} footer="Deletes your account and all your data from Novum’s server. This can’t be undone.">
        <${O} icon=${f.trash()} tint=${N.danger} title="Delete account" danger onClick=${Fo} />
      <//>
    </div>`}async function To(){let t=st()?.user?.id;try{await Zs()}catch{}try{await Se()}catch{}la(),Te(),await ds(),He({wipe:!0}),t&&ga(t)}function No(){B(t=>e`<${Io} close=${t} />`)}function Io({close:t}){let[a,n]=g(""),[s,o]=g("email"),[i,l]=g(""),[d,c]=g(0),[r,h]=g(""),[m,u]=g(!1),v=a.trim().toLowerCase(),$=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)&&v!==(st()?.user?.email||"").toLowerCase(),b=async S=>{await ge({email:v,emailToken:S}),M(20),E("Email updated"),t()},p=async()=>{u(!0),h("");try{(await rs(v,st()?.user?.firstName)).skipped?await b():(c(Date.now()),o("code"))}catch(S){h(S.message)}u(!1)},y=async(S=i)=>{if(!(m||S.length!==6)){u(!0),h("");try{let w=await cs(v,S);await b(w.emailToken)}catch(w){h(w.message),l(""),u(!1)}}};return e`
    <${T} title="Change email" left=${e`<button class="link" onClick=${t}>Cancel</button>`} />
    <div class="sheet-body">
      ${s==="email"?e`
        <${A} footer=${r?e`<span class="err">${r}</span>`:"We’ll send a code to the new address to confirm it’s yours."}>
          <${Y} label="New email"><input type="email" inputmode="email" autocapitalize="none" autocorrect="off" value=${a} onInput=${S=>{h(""),n(S.target.value)}} /><//>
        <//>
        <button class="btn btn-primary block" disabled=${!$||m} onClick=${p}>${m?"Sending…":"Send code"}</button>`:e`
        <p class="confirm-text">Enter the 6-digit code we sent to <b>${v}</b>.</p>
        <${ra} value=${i} onChange=${S=>{h(""),l(S)}} onComplete=${y} />
        ${r&&e`<p class="wiz-err">${r}</p>`}
        <button class="btn btn-primary block" disabled=${i.length!==6||m} onClick=${()=>y()}>${m?"Confirming…":"Confirm"}</button>
        <${ca} sentAt=${d} onResend=${p} />`}
    </div>`}function Lo(){B(t=>e`<${qo} close=${t} />`)}function qo({close:t}){let[a,n]=g(""),[s,o]=g(""),[i,l]=g(""),[d,c]=g(!1),r=a&&s.length>=8,h=async()=>{c(!0),l("");try{await ps(a,s),M(15),E("Password changed"),t()}catch(m){l(m.message)}c(!1)};return e`
    <${T} title="Change password" left=${e`<button class="link" onClick=${t}>Cancel</button>`} right=${e`<button class="link b" disabled=${!r||d} onClick=${h}>Save</button>`} />
    <div class="sheet-body">
      <${A} footer=${i?e`<span class="err">${i}</span>`:"At least 8 characters. You’ll stay logged in here; other devices are logged out."}>
        <${Y} label="Current"><input type="password" autocomplete="current-password" value=${a} onInput=${m=>n(m.target.value)} /><//>
        <${Y} label="New"><input type="password" autocomplete="new-password" value=${s} onInput=${m=>o(m.target.value)} /><//>
      <//>
    </div>`}function Fo(){B(t=>e`<${Bo} close=${t} />`)}function Bo({close:t}){let[a,n]=g(""),[s,o]=g(!1),[i,l]=g(""),[d,c]=g(!1),[r,h]=g(null),[m,u]=g(""),[v,$]=g(0),b=$t();K(()=>{r&&setTimeout(()=>b.current?.focus({preventScroll:!0}),350)},[r]);let p=async()=>{let w=st()?.user?.id;la(),Te(),_e(),ls(null),He({wipe:!0}),w&&(ga(w),$s(w,null));try{localStorage.removeItem(`novum.push:${w}`)}catch{}history.replaceState(null,"",location.pathname),window.scrollTo(0,0),E("Account deleted")},y=async(w=m)=>{if(!d){c(!0),l("");try{try{await Se()}catch{}await hs(a,w),M(20),await p()}catch(k){c(!1),u(""),l(k.message),k.data?.needsCode&&h(r||{emailHint:"your email"})}}},S=async()=>{if(!(d||!a)){c(!0),l("");try{let w=await Je(a);if(w.skipped)return c(!1),y("");h({emailHint:w.emailHint}),$(Date.now()),u("")}catch(w){l(w.message)}c(!1)}};return e`
    <${T} title="Delete account" left=${e`<button class="link" onClick=${r?()=>{h(null),l(""),u("")}:t}>${r?"Back":"Cancel"}</button>`} />
    <div class="sheet-body">
      ${r?e`
        <div class="del-code">
          <div class="wiz-emoji">📬</div>
          <h2 class="auth-title center">Check your email</h2>
          <p class="wiz-sub center">Step 2 of 2. We sent a 6-digit code to <b class="wiz-em">${r.emailHint}</b>. Enter it to delete your account for good.</p>
          <${qs} email=${r.emailHint} />
          <${ra} inputRef=${b} value=${m} onChange=${w=>{l(""),u(w)}} />
          <${ca} sentAt=${v} onResend=${async()=>{try{await Je(a),$(Date.now()),u(""),E("New code sent")}catch(w){l(w.message)}}} />
          ${i&&e`<p class="auth-err center">${i}</p>`}
          <button class="btn btn-danger block" disabled=${m.length!==6||d} onClick=${()=>y()}>${d?"Deleting…":"Delete my account"}</button>
        </div>`:e`
        <p class="confirm-text">This permanently deletes your account, counters, check-ins, goals and notes from Novum. Export a copy first if you might want it.</p>
        <${A} header="Step 1 of 2 · Your password" footer=${i?e`<span class="err">${i}</span>`:"Then we’ll email you a code to make sure it’s really you."}>
          <${Y} label="Password"><div class="tf-row"><input type=${s?"text":"password"} autocomplete="current-password" value=${a}
            onInput=${w=>{l(""),n(w.target.value)}} onKeyDown=${w=>w.key==="Enter"&&S()} />
            <${Ls} on=${s} set=${o} /></div><//>
        <//>
        <button class="btn btn-danger block" disabled=${!a||d} onClick=${S}>${d?"Checking…":"Continue"}</button>`}
    </div>`}function Ia(){B(t=>e`<${Oo} close=${t} />`,{tall:!0})}function Oo({close:t}){let a=I(),[n,s]=g(""),[o,i]=g(j()),l=[...a.profile.weights].sort((c,r)=>r.date.localeCompare(c.date)),d=()=>{let c=parseFloat(n);c>20&&c<400&&(M(12),L(r=>{r.profile.weights=r.profile.weights.filter(h=>h.date!==o),r.profile.weights.push({date:o,kg:c})}),s(""),E("Weight logged"))};return e`
    <${T} title="Weight" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <${A}>
        <${Y} label="Weight (kg)"><input type="number" inputmode="decimal" step="0.1" placeholder=${Nt(a.profile)?.toFixed(1)??"70.0"} value=${n}
          onInput=${c=>s(c.target.value)} onKeyDown=${c=>c.key==="Enter"&&d()} /><//>
        <${Y} label="Date"><input type="date" value=${o} max=${j()} onInput=${c=>i(c.target.value)} /><//>
      <//>
      <button class="btn btn-primary block" disabled=${!(parseFloat(n)>20)} onClick=${d}>Log weight</button>
      <${A} header="History" footer="One entry per day. Logging again on the same day replaces it.">
        ${l.map(c=>e`<div class="row" key=${c.date}>
          <span class="row-main"><span class="row-title">${c.kg.toFixed(1)} kg</span><span class="row-sub">${tt(c.date)}</span></span>
          <span class="row-detail">BMI ${me(c.kg,a.profile.heightCm).toFixed(1)}</span>
          ${l.length>1&&e`<button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>L(r=>{r.profile.weights=r.profile.weights.filter(h=>h.date!==c.date)})}>${f.trash()}</button>`}
        </div>`)}
      <//>
    </div>`}var Po=t=>{let a=Math.floor((Date.now()-t)/6e4);if(a<2)return"active now";if(a<60)return`${a} min ago`;let n=Math.floor(a/60);if(n<24)return`${n} hr${n===1?"":"s"} ago`;let s=Math.floor(n/24);return`${s} day${s===1?"":"s"} ago`};function Ro(){B(t=>e`<${Wo} close=${t} />`,{tall:!0})}function Wo({close:t}){let[a,n]=g(null),[s,o]=g(""),i=async()=>{o("");try{n(await ms())}catch(r){o(r.message)}};K(()=>{i()},[]);let l=async r=>{M();try{await vs(r.id),E(`Logged out of ${r.device}`),i()}catch(h){E(h.message)}},d=()=>nt({title:"Log out other devices",confirm:"Log out others",text:"Every other phone or computer is logged out and will need your password (and an email code) to get back in. This one stays logged in.",onConfirm:async()=>{try{await bs(),E("Other devices logged out"),i()}catch(r){E(r.message)}}}),c=a?a.sessions.filter(r=>!r.current).length:0;return e`
    <${T} title="Logged-in devices" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      ${s&&e`<p class="auth-err center">${s}</p>`}
      ${!a&&!s&&e`<${be} rows=${2} avatar />`}
      ${a&&e`<${A} footer=${a.trusted?`${a.trusted} device${a.trusted===1?" is":"s are"} remembered, so ${a.trusted===1?"it skips":"they skip"} the login code for 30 days.`:"If you don’t recognise a device, log it out and change your password."}>
        ${a.sessions.map(r=>e`<div class="row" key=${r.id}>
          <span class="row-ic tinted" style="--c:${r.current?N.health:N.settings}">${/iPhone|Android|iPad/.test(r.device)?f.phone():f.laptop()}</span>
          <span class="row-main"><span class="row-title">${r.device}</span>
            <span class="row-sub">${r.current?"This device":`Last active ${Po(r.lastSeen)}`} · since ${tt(new Date(r.createdAt),{day:"numeric",month:"short"})}</span></span>
          ${!r.current&&e`<button class="link sm danger" onClick=${()=>l(r)}>Log out</button>`}
        </div>`)}
      <//>
      ${c>0&&e`<button class="btn btn-plain danger block" onClick=${d}>Log out all other devices</button>`}`}
    </div>`}function jo({s:t,header:a="Notifications"}){let n=t.notifyPrefs,[s,o]=g(_t()),[i,l]=g(!1),[d,c]=g(""),r=$=>L(b=>{b.notifyPrefs={...b.notifyPrefs,...$}}),h=ia(),[,m]=g(0);K(()=>{let $=()=>{document.visibilityState==="visible"&&(o(_t()),m(b=>b+1))};return document.addEventListener("visibilitychange",$),()=>document.removeEventListener("visibilitychange",$)},[]);let u=async $=>{if(!i){c(""),l(!0);try{$?(await Is(),E("Notifications on 🔔")):(await Se(),E("Notifications off"))}catch(b){c(b.message)}o(_t()),l(!1)}},v;return h?xs()&&!Es()?v="On iPhone, notifications only work once Novum is on your Home Screen. Open it from there, then switch this on.":Ds()?Ts()==="denied"&&!s.enabled?v=Ns("denied"):v="On or off for this phone. Reminder times follow your account. Novum’s server only uses your quit times, reminder times, habit ticks and the dates of tough days you plan for to time these.":v="This browser doesn’t support push notifications.":v="Notifications aren’t set up on the server yet.",e`<${A} header=${a} footer=${d?e`<span class="err">${d}</span>`:v}>
    <div class="row">
      <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.bell()}</span>
      <span class="row-main"><span class="row-title">Notifications on this phone</span>${i&&e`<span class="row-sub">Working…</span>`}</span>
      ${h?e`<${at} on=${s.enabled} label="Notifications" onChange=${u} />`:e`<span class="row-detail">Not set up</span>`}
    </div>
    ${Bs()&&e`<${O} icon=${f.phone()} tint=${N.tools} title=${Fs().kind==="inapp"?"Open Novum in Safari":"Add to Home Screen"} sub="Needed for notifications. Shows you how" chevron onClick=${Os} />`}
    ${s.enabled&&h&&e`
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.medal()}</span>
        <span class="row-main"><span class="row-title">Milestones</span><span class="row-sub">1 day, 1 week, 1 month… sent between 9am and 10pm</span></span>
        <${at} on=${n.milestones} label="Milestones" onChange=${$=>r({milestones:$})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.pencil()}</span>
        <span class="row-main"><span class="row-title">Check-in reminder</span><span class="row-sub">Skipped if you’ve already checked in</span></span>
        ${n.checkin&&e`<input type="time" class="time-in" value=${n.checkinAt} onChange=${$=>$.target.value&&r({checkinAt:$.target.value})} />`}
        <${at} on=${n.checkin} label="Check-in reminder" onChange=${$=>r({checkin:$})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.goals()}</span>
        <span class="row-main"><span class="row-title">Habit nudges</span><span class="row-sub">Habits not ticked yet today</span></span>
        ${n.habits&&e`<input type="time" class="time-in" value=${n.habitsAt} onChange=${$=>$.target.value&&r({habitsAt:$.target.value})} />`}
        <${at} on=${n.habits} label="Habit nudges" onChange=${$=>r({habits:$})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.progress()}</span>
        <span class="row-main"><span class="row-title">Weekly recap</span><span class="row-sub">Sundays: check-ins, cravings and money saved</span></span>
        ${n.recap&&e`<input type="time" class="time-in" value=${n.recapAt} onChange=${$=>$.target.value&&r({recapAt:$.target.value})} />`}
        <${at} on=${n.recap} label="Weekly recap" onChange=${$=>r({recap:$})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.users()}</span>
        <span class="row-main"><span class="row-title">Buddies and followers</span><span class="row-sub">Requests, new followers and cheers</span></span>
        <${at} on=${n.buddies} label="Buddy notifications" onChange=${$=>r({buddies:$})} />
      </div>
      <div class="row">
        <span class="row-ic tinted" style=${`--c:${N.tools}`}>${f.sparkle()}</span>
        <span class="row-main"><span class="row-title">Heads-up before tough times</span><span class="row-sub">Learns when cravings usually hit and nudges you 20 minutes before</span></span>
        <${at} on=${n.nudges!==!1} label="Heads-up before tough times" onChange=${$=>r({nudges:$})} />
      </div>`}
  <//>`}function Pl({s:t}){let[a,n]=g("active"),o=t.goals.map(i=>({g:i,p:kt(i,t)})).filter(({p:i})=>a==="done"?i.pct>=1:a==="active"?i.pct<1:!0);return e`
    <button class="card ny-mini tap" onClick=${Wt}>
      <span class="ny-mini-y">2027</span>
      <span class="row-main"><span class="row-title">New Year ideas</span><span class="row-sub">Ready-made goals you can add in one tap</span></span>
      <span class="row-chev">${f.chevron()}</span>
    </button>

    ${t.goals.length===0?e`<${os} emoji="🎯" title="No goals yet"
        text="Set goals for 2027 or any date. Habits you tick daily, targets you work towards, and one-off milestones."
        action=${e`<div class="empty-actions"><button class="btn btn-primary" onClick=${Wt}>Browse ideas</button>
          <button class="btn btn-tinted" onClick=${()=>La()}>Create your own</button></div>`} />`:e`
      <div class="pad-x mb12"><${V} options=${[{value:"active",label:"Active"},{value:"done",label:"Complete"},{value:"all",label:"All"}]} value=${a} onChange=${n} /></div>
      ${o.length===0&&e`<p class="muted center pad">${a==="done"?"Nothing complete yet. You’ll get there.":"Everything’s complete. Time for a new goal?"}</p>`}
      ${Et.map(i=>{let l=o.filter(({g:d})=>d.category===i.id);return l.length?e`<${A} key=${i.id} header=${i.label}>
          ${l.map(({g:d,p:c})=>e`<${Ho} key=${d.id} g=${d} p=${c} />`)}
        <//>`:null})}`}`}function Ho({g:t,p:a}){let n=(t.ticks||[]).includes(j());return e`<div class="row tap goal-row" role="button" tabindex="0" onClick=${()=>Sn(t.id)}>
    <${Vt} pct=${a.pct} size=${46} stroke=${5} color=${t.color}><span class="ring-emoji ring-gi" style=${`color:${t.color}`}><${St} g=${t} /></span><//>
    <span class="row-main">
      <span class="row-title">${t.name}</span>
      <span class="row-sub">${Ke(t)?`Counts from ${tt(ve(t).start,{day:"numeric",month:"short"})}`:a.label} · ${na(t)}</span>
    </span>
    ${t.type==="habit"?e`<button class="tick ${n?"on":""}" style="--c:${t.color}" aria-pressed=${n} aria-label="Done today"
          onClick=${s=>{s.stopPropagation(),qt(t.id)}}>${f.check()}</button>`:e`<span class="row-detail">${Math.round(a.pct*100)}%</span><span class="row-chev">${f.chevron()}</span>`}
  </div>`}function Sn(t){B(a=>e`<${Yo} id=${t} close=${a} />`,{tall:!0})}function Yo({id:t,close:a}){let n=I(),s=n.goals.find(u=>u.id===t),[o,i]=g("");if(!s)return e`<${T} title="Goal" right=${e`<button class="link b" onClick=${a}>Done</button>`} />`;let l=kt(s,n),d=Ra(s.category),c=j(),r=()=>nt({title:"Delete goal",text:`Delete “${s.name}”? Its history will be removed too.`,confirm:"Delete goal",onConfirm:()=>{a(),L(u=>{u.goals=u.goals.filter(v=>v.id!==t)}),E("Goal deleted")}}),h=()=>{let u=parseFloat(o);Number.isNaN(u)||(M(12),L(v=>{let $=v.goals.find(b=>b.id===t);$.entries=[...$.entries||[],{id:ct(),date:c,value:u}]}),i(""))},m=null;if(s.type==="habit"){let u=(s.ticks||[]).includes(c),v=It(s),$=es(s),b=$.filter(w=>w.done).length,p=ue(new Date),y=Array.from({length:12},(w,k)=>rt(p,-7*(11-k))),S=new Set(s.ticks||[]);m=e`
      <button class="btn block big ${u?"btn-done":"btn-primary"}" style="--c:${s.color}" onClick=${()=>qt(t)}>
        ${u?e`${f.check()} Done today`:"Mark done today"}</button>
      <div class="stats3">
        <div><b>${v.value}</b><span>${v.unit} streak</span></div>
        ${s.perWeek>=7?e`<div><b>${ts(s)}</b><span>best streak</span></div>`:e`<div><b>${b}/${s.perWeek}</b><span>this week</span></div>`}
        <div><b>${(s.ticks||[]).length}</b><span>total</span></div>
      </div>
      <div class="card pad">
        <div class="mini-h">This week</div>
        <div class="weekdots">${$.map((w,k)=>e`<button class="wd ${w.done?"on":""} ${w.key===c?"today":""}" style="--c:${s.color}"
          disabled=${w.key>c} onClick=${()=>qt(t,w.key)}><span>${"MTWTFSS"[k]}</span><i>${w.done?f.check():""}</i></button>`)}</div>
        <div class="mini-h mt16">Last 12 weeks</div>
        <div class="heat" style="--c:${s.color}">
          ${y.map(w=>e`<div class="heat-col">${Array.from({length:7},(k,q)=>{let R=j(rt(w,q));return e`<i class="${S.has(R)?"on":""} ${R>c?"future":""}" title=${tt(R)}></i>`})}</div>`)}
        </div>
      </div>`}else if(s.type==="numeric"&&s.auto==="money")m=e`<div class="card pad info">💷 This goal fills itself from your quit counters. Every hour you stay quit adds to it, counting from ${tt(ve(s).start)}.</div>`;else if(s.type==="numeric"&&s.auto==="weight")m=e`<div class="card pad info">⚖️ Uses the latest weight from your Profile.</div>
      <button class="btn btn-tinted block" onClick=${Ia}>Log weight</button>`;else if(s.type==="numeric"){let u=[...s.entries||[]].reverse();m=e`
      <div class="card entry-add">
        <input type="number" inputmode="decimal" step="any" placeholder=${s.mode==="level"?`New value${s.unit?" ("+s.unit+")":""}`:s.unit==="£"?"Amount you saved (£)":`Add amount${s.unit?" ("+s.unit+")":""}`}
          value=${o} onInput=${v=>i(v.target.value)} onKeyDown=${v=>v.key==="Enter"&&h()} />
        <button class="btn btn-primary sm" disabled=${o===""} onClick=${h}>${s.mode==="level"?"Log":"Add"}</button>
      </div>
      ${u.length>0&&e`<${A} header="History">
        ${u.slice(0,30).map(v=>e`<div class="row" key=${v.id}>
          <span class="row-main"><span class="row-title">${s.mode==="level"?"":"+"}${v.value}${s.unit?" "+s.unit:""}</span><span class="row-sub">${tt(v.date)}</span></span>
          <button class="icon-btn muted" aria-label="Delete entry" onClick=${()=>L($=>{let b=$.goals.find(p=>p.id===t);b.entries=b.entries.filter(p=>p.id!==v.id)})}>${f.trash()}</button>
        </div>`)}
      <//>`}`}else if(s.type==="quit"){let u=n.quits.find(v=>v.id===s.quitId)||n.quits[0];m=e`<div class="card pad info">${u.emoji} Linked to your ${u.label.toLowerCase()} counter. Every day you stay ${u.label.toLowerCase()}-free ${s.period==="2027"?`from ${tt(as(s,u))} to the end of 2027 `:""}fills this ring, including the days before you added this goal.</div>`}else m=e`<button class="btn block big ${s.done?"btn-done":"btn-primary"}" style="--c:${s.color}"
      onClick=${()=>{M(15),L(u=>{let v=u.goals.find($=>$.id===t);v.done=!v.done,v.doneDate=v.done?c:null}),s.done||E("Milestone complete 🎉")}}>
      ${s.done?e`${f.check()} Completed`:"Mark as complete"}</button>`;return e`
    <${T} left=${e`<button class="link" onClick=${()=>La(s)}>Edit</button>`}
      right=${e`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      <div class="detail-hero">
        <${Vt} pct=${l.pct} size=${168} stroke=${18} color=${s.color}>
          <div class="dh-in"><span class="dh-e dh-gi" style=${`color:${s.color}`}><${St} g=${s} /></span><b>${Math.round(l.pct*100)}%</b></div>
        <//>
        <h2 class="dh-name">${s.name}</h2>
        <div class="dh-label">${l.label} <span class="muted">${l.sub}</span></div>
        ${Ke(s)&&e`<div class="dh-note">Counts from ${tt(ve(s).start)}. Ticks before then still build your streak.</div>`}
        <div class="chips"><span class="chip" style="--c:${d.color}">${d.label}</span><span class="chip">${we(s)}</span><span class="chip">${na(s)}</span></div>
      </div>
      ${m}
      <button class="btn btn-plain danger block mt16" onClick=${r}>Delete goal</button>
    </div>`}function La(t){B(a=>e`<${Go} goal=${t} close=${a} />`,{tall:!0})}function Go({goal:t={},close:a}){let n=!!t.id,[s,o]=g(()=>({name:"",icon:"target",emoji:"🎯",color:"#3B9BFF",category:"habits",type:"habit",perWeek:7,remindAt:"",period:"2027",end:"2027-12-31",mode:"sum",auto:"",unit:"",target:"",startValue:"",quitId:I().quits[0]?.id||"",...t})),i=u=>o(v=>({...v,...u})),l=I(),d=s.auto==="weight"?"weight":s.mode==="level"?"level":s.unit==="£"?"money":"sum",c=u=>i(u==="money"?{auto:"",unit:"£",mode:"sum"}:u==="weight"?{auto:"weight",unit:"kg",mode:"level",startValue:s.startValue===""?+(Nt(l.profile)||0).toFixed(1):s.startValue}:{auto:"",mode:u,unit:s.auto||s.unit==="£"?"":s.unit}),r=s.type!=="numeric"||s.target!==""&&!Number.isNaN(parseFloat(s.target)),h=s.name.trim()&&r&&(s.period==="2027"||s.end),m=()=>{if(!h)return;M(15);let u={...s,name:s.name.trim(),target:s.target===""?"":parseFloat(s.target),startValue:s.startValue===""?"":parseFloat(s.startValue)};L(v=>{if(n){let $=v.goals.findIndex(b=>b.id===t.id);$>=0&&(v.goals[$]={...v.goals[$],...u})}else v.goals.push({ticks:[],entries:[],...u,id:ct(),start:j(),createdAt:new Date().toISOString()})}),a(),E(n?"Goal updated":"Goal added")};return e`
    <${T} title=${n?"Edit goal":"New goal"}
      left=${e`<button class="link" onClick=${a}>Cancel</button>`}
      right=${e`<button class="link b" disabled=${!h} onClick=${m}>${n?"Save":"Add"}</button>`} />
    <div class="sheet-body">
      <div class="editor-hero">
        <div class="eh-icon" style="background:${s.color}"><${St} g=${s} /></div>
        <input class="eh-name" placeholder="Goal name" value=${s.name} onInput=${u=>i({name:u.target.value})} maxlength="60" />
      </div>

      <${A} header="Icon">
        <div class="icon-grid" style=${`--c:${s.color}`}>${xa.map(u=>e`<button key=${u.k} class="gi-btn ${Be(s)?.k===u.k?"on":""}" aria-label=${u.l} aria-pressed=${Be(s)?.k===u.k} onClick=${()=>{M(),i({icon:u.k,emoji:u.e})}}>${u.s()}</button>`)}</div>
      <//>
      <${A} header="Colour">
        <div class="swatches">${Wa.map(u=>e`<button class="sw ${s.color===u?"on":""}" style="--c:${u}" aria-label=${u} onClick=${()=>{M(),i({color:u})}}></button>`)}</div>
      <//>
      <${A} header="Category">
        <div class="chip-row">${Et.map(u=>e`<button class="chip big ${s.category===u.id?"on":""}" style="--c:${u.color}" onClick=${()=>{M(),i({category:u.id})}}>${u.label}</button>`)}</div>
      <//>

      <${A} header="Type" footer=${{habit:"Tick it off on the days you do it. Builds a streak.",numeric:"Work towards a number, like km run, money saved or a weight.",milestone:"A one-off achievement you mark as done.",quit:"Fills automatically every day you stay quit."}[s.type]}>
        <div class="pad"><${V} options=${[{value:"habit",label:"Habit"},{value:"numeric",label:"Target"},{value:"milestone",label:"Milestone"},...I().quits.length?[{value:"quit",label:"Stay quit"}]:[]]}
          value=${s.type} onChange=${u=>i({type:u})} /></div>
        ${s.type==="habit"&&e`<div class="row stepper-row">
          <span class="row-main"><span class="row-title">How often</span><span class="row-sub stepper-v">${s.perWeek>=7?"Every day":`${s.perWeek}× a week`}</span></span>
          <div class="stepper" role="group" aria-label="How often">
            <button type="button" disabled=${s.perWeek<=1} onClick=${()=>{M(),i({perWeek:Math.max(1,s.perWeek-1)})}} aria-label="Less often"><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button>
            <i></i>
            <button type="button" disabled=${s.perWeek>=7} onClick=${()=>{M(),i({perWeek:Math.min(7,s.perWeek+1)})}} aria-label="More often"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></button>
          </div>
        </div>`}
        ${s.type==="habit"&&e`<div class="row">
          <span class="row-main"><span class="row-title">Reminder</span>
            <span class="row-sub">${s.remindAt?s.perWeek>=7?"Every day, unless it’s ticked":"Only on days you still need it":"A nudge at a time you choose"}</span></span>
          ${s.remindAt&&e`<input type="time" class="time-in" value=${s.remindAt} onChange=${u=>u.target.value&&i({remindAt:u.target.value})} />`}
          <${at} on=${!!s.remindAt} label="Reminder" onChange=${u=>i({remindAt:u?"18:00":""})} />
        </div>`}
        ${s.type==="numeric"&&e`
          <div class="pad"><${V} small options=${[{value:"sum",label:"Add up"},{value:"level",label:"Reach"},{value:"money",label:"£ Saved"},{value:"weight",label:"Weight"}]}
            value=${d} onChange=${c} /></div>
          ${!s.auto&&d!=="money"&&e`<${Y} label="Unit"><input placeholder="km, books, hours…" value=${s.unit} onInput=${u=>i({unit:u.target.value})} /><//>`}
          ${(d==="level"||d==="weight")&&e`<${Y} label="Starting at"><input type="number" inputmode="decimal" step="any" placeholder="0" value=${s.startValue} onInput=${u=>i({startValue:u.target.value})} /><//>`}
          <${Y} label="Target"><input type="number" inputmode="decimal" step="any" placeholder=${d==="money"?"1000":"100"} value=${s.target} onInput=${u=>i({target:u.target.value})} /><//>
`}
        ${s.type==="quit"&&e`<div class="pad"><${V} options=${l.quits.map(u=>({value:u.id,label:`${u.emoji} ${u.label}`}))} value=${s.quitId} onChange=${u=>i({quitId:u})} /></div>`}
      <//>

      <${A} header="Deadline">
        <div class="pad"><${V} options=${[{value:"2027",label:"Until end of 2027"},{value:"date",label:"Pick a date"}]} value=${s.period} onChange=${u=>i({period:u})} /></div>
        ${s.period==="date"&&e`<${Y} label="Finish by"><input type="date" value=${s.end} min=${j()} onInput=${u=>i({end:u.target.value})} /><//>`}
      <//>
      <button class="btn btn-primary block big" disabled=${!h} onClick=${m}>${n?"Save changes":"Add goal"}</button>
    </div>`}function Wt(){B(t=>e`<${zo} close=${t} />`,{tall:!0})}function zo({close:t}){let a=I(),n=Math.ceil((Lt-Date.now())/z),s=new Set(a.goals.map(d=>d.preset).filter(Boolean)),o=d=>{M(15),L(c=>c.goals.push({ticks:[],entries:[],...d.make(c),preset:d.key,id:ct(),start:j(),createdAt:new Date().toISOString()})),E("Added to your goals")},i=d=>{let c=I().goals.find(h=>h.preset===d.key);if(!c)return;let r=()=>{M(10),L(h=>{h.goals=h.goals.filter(m=>m.preset!==d.key)}),E("Removed from your goals")};(c.ticks||[]).length||(c.entries||[]).length||c.done?nt({title:"Remove goal",text:`Remove “${c.name}”? Its progress so far will be deleted.`,confirm:"Remove",onConfirm:r}):r()},l=d=>d.type==="habit"?`${d.perWeek>=7?"Daily":d.perWeek+"× a week"} habit`:d.type==="numeric"?d.unit==="£"?`Log what you save · target £${Number(d.target).toLocaleString("en-GB")}`:d.auto==="weight"?`Target ${d.target} kg · edit to suit you`:`Target · ${d.target} ${d.unit}`:d.type==="quit"?"Linked to your quit counter":"One-off milestone";return e`
    <${T} right=${e`<button class="link b" onClick=${t}>Done</button>`} />
    <div class="sheet-body">
      <div class="ny-hero">
        <div class="ny-year xl">2027</div>
        <div class="ny-t">A new standard.</div>
        <p class="muted">${n>0?`${n} days until 1 January. `:""}Tap <b>+</b> to add a goal as it is (tap the tick to remove it), or tap a goal to change it first.</p>
      </div>
      ${Et.map(d=>{let c=[...ja(a),...Ha].filter(r=>r.make(a).category===d.id);return c.length?e`<${A} key=${d.id} header=${d.label}>
          ${c.map(r=>{let h=r.make(a),m=s.has(r.key),u=a.goals.find(v=>v.preset===r.key);return e`<div class="row tap" key=${r.key} role="button" onClick=${()=>u?Sn(u.id):La({...h,preset:r.key})}>
              <span class="row-ic tinted" style=${`--c:${h.color}`}><${St} g=${h} /></span>
              <span class="row-main"><span class="row-title">${h.name}</span><span class="row-sub">${l(h)}</span></span>
              <button class="add-pill ${m?"on":""}" aria-pressed=${m} aria-label=${m?`Remove ${h.name}`:`Add ${h.name}`}
                onClick=${v=>{v.stopPropagation(),m?i(r):o(r)}}>${m?f.check():f.plus()}</button>
            </div>`})}
        <//>`:null})}
    </div>`}var Ko=mt(()=>import("./c-ZJFQBZED.js"),"openRecap");function Ql({s:t,go:a}){let[n,s]=g(30),o=Date.now(),i=t.goals.filter(C=>C.period==="2027"),l=Et.map(C=>{let F=i.filter(Z=>Z.category===C.id);return F.length?{...C,pct:F.reduce((Z,it)=>Z+kt(it,t).pct,0)/F.length,n:F.length}:null}).filter(Boolean),d=i.length?i.reduce((C,F)=>C+kt(F,t).pct,0)/i.length:0,c=Lt.getTime(),r=o>=c?Math.min(365,Math.floor((o-c)/z)+1):0,h=Math.ceil((c-o)/z),u=t.goals.map(C=>kt(C,t)).filter(C=>C.pct>=1).length,v=t.goals.filter(C=>C.type==="habit").reduce((C,F)=>Math.max(C,It(F).value),0),$=t.quits.reduce((C,F)=>C+J(F,W(F,o)),0),b=Array.from({length:n},(C,F)=>j(rt(new Date,F-n+1))),p=b.map(C=>t.checkins[C]?.mood??null),y=t.quits.map(C=>({name:C.label,color:C.color,values:b.map(F=>t.checkins[F]?.[C.id]??null)})),S=(()=>{let C=Object.keys(t.checkins).sort().filter(x=>t.quits.some(U=>t.checkins[x][U.id]!=null));if(C.length<6)return null;let F=x=>{let U=x.flatMap(ht=>t.quits.map(lt=>t.checkins[ht][lt.id]).filter(lt=>lt!=null));return U.reduce((ht,lt)=>ht+lt,0)/U.length},Z=Math.min(7,Math.floor(C.length/2)),it=F(C.slice(0,Z)),yt=F(C.slice(-Z));if(it===0)return null;let Mt=Math.round((yt-it)/it*100);return Mt<0?`Cravings are down ${-Mt}% compared with your first check-ins.`:Mt>0?`Cravings are up ${Mt}% on your first check-ins. Tough patches are normal. Keep going.`:"Cravings are holding steady."})(),w={};t.cravings.forEach(C=>(C.triggers||[]).forEach(F=>{w[F]=(w[F]||0)+1}));let k=Object.entries(w).sort((C,F)=>F[1]-C[1]).slice(0,6),q=Array(24).fill(0);t.cravings.forEach(C=>{q[new Date(C.t).getHours()]++});let R=q.indexOf(Math.max(...q)),jt=`${X(R)}:00–${X((R+1)%24)}:00`,gt=new Set([...Object.keys(t.checkins),...t.goals.flatMap(C=>C.ticks||[])]),P=Array.from({length:12},(C,F)=>{let Z=new Date(2027,F+1,0).getDate(),it=0;for(let yt=1;yt<=Z;yt++)gt.has(`2027-${X(F+1)}-${X(yt)}`)&&it++;return{m:F,pct:it/Z,future:new Date(2027,F,1)>o}});return e`<${wt} title="Progress">
    <${Vs} s=${t} />
    ${t.quits.length>0&&e`<button class="card rc-card tap" onClick=${Ko}>
      <span class="rc-card-ic">📅</span>
      <span class="row-main"><span class="row-title">Your week</span><span class="row-sub">Check-ins, cravings beaten, money saved and what your body did</span></span>
      <span class="row-chev">${f.chevron()}</span>
    </button>`}
    <section class="group">
      <h2 class="group-h">2027 at a glance</h2>
      <div class="card glance">
        ${i.length?e`
          <div class="glance-top">
            <${ss} size=${150} stroke=${14} gap=${3} rings=${l.slice(0,5).map(C=>({pct:C.pct,color:C.color}))}>
              <div class="gl-c"><b>${Math.round(d*100)}%</b><span>overall</span></div>
            <//>
            <div class="gl-legend">${l.map(C=>e`<div class="gl-li"><i style="background:${C.color}"></i><span>${C.label}</span><b>${Math.round(C.pct*100)}%</b></div>`)}</div>
          </div>`:e`<div class="glance-empty"><p>Add goals for 2027 to see all your rings here.</p><button class="btn btn-primary sm" onClick=${Wt}>New Year ideas</button></div>`}
        <div class="year-bar">
          <div class="yb-t"><span>${r?`Day ${r} of 365`:`2027 starts in ${h} day${h===1?"":"s"}`}</span><span>${Math.round(r/365*100)}% of the year</span></div>
          <div class="yb"><i style="width:${r/365*100}%"></i></div>
        </div>
        <div class="months">${P.map(C=>e`<div class="mo ${C.future?"future":""}" title=${`${Math.round(C.pct*100)}% of days active`}>
          <div class="mo-bar"><i style="height:${Math.max(C.future?0:4,C.pct*100)}%"></i></div><span>${"JFMAMJJASOND"[C.m]}</span></div>`)}</div>
        <p class="tiny muted">Bars show the share of days each month with a check-in or a ticked habit.</p>
      </div>
    </section>

    <div class="tiles">
      ${t.quits.map(C=>e`<div class="tile"><span class="tile-k">${C.emoji} ${C.label}-free</span><b>${Math.floor(W(C,o)/z)}</b><span class="tile-u">days</span></div>`)}
      <div class="tile"><span class="tile-k">💷 Saved</span><b>${G($,0)}</b><span class="tile-u">so far</span></div>
      <div class="tile"><span class="tile-k">🎯 Goals</span><b>${u}/${t.goals.length}</b><span class="tile-u">complete</span></div>
      <div class="tile"><span class="tile-k">🔥 Best streak</span><b>${v}</b><span class="tile-u">on a habit</span></div>
      <div class="tile"><span class="tile-k">✍️ Check-ins</span><b>${Object.keys(t.checkins).length}</b><span class="tile-u">logged</span></div>
      <div class="tile"><span class="tile-k">🛡️ Cravings beaten</span><b>${t.cravings.filter(C=>C.beaten).length}</b><span class="tile-u">with SOS</span></div>
      <div class="tile"><span class="tile-k">⏱️ SOS time</span><b>${Math.round(t.cravings.reduce((C,F)=>C+(F.secs||0),0)/60)}</b><span class="tile-u">minutes ridden out</span></div>
    </div>

    <${Ks} s=${t} />

    <div class="pad-x mt16"><${V} options=${[{value:14,label:"2 weeks"},{value:30,label:"30 days"},{value:90,label:"90 days"}]} value=${n} onChange=${s} /></div>

    <section class="group">
      <h2 class="group-h">Mood</h2>
      <div class="card chart-card">
        <${Qe} keys=${b} series=${[{name:"Mood",color:"#5AC8FA",values:p}]} yMin=${1} yMax=${5} yTicks=${[1,3,5]}
          yFmt=${C=>Yt[Math.round(C)-1]?.e??C} height=${170} />
      </div>
    </section>

    ${y.length>0&&e`<section class="group">
      <h2 class="group-h">Cravings</h2>
      <div class="card chart-card">
        ${y.length>1&&e`<${ns} series=${y} />`}
        <${Qe} keys=${b} series=${y} yMin=${0} yMax=${10} yTicks=${[0,5,10]} unit="/10" height=${190} />
        ${S&&e`<p class="insight">${S}</p>`}
      </div>
    </section>`}

    <${vn} s=${t} />

    <${Vo} s=${t} />
  <//>`}var qa=["12–4am","4–8am","8am–12","12–4pm","4–8pm","8pm–12"],Fa=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function Vo({s:t}){let a=[...t.cravings.map($=>new Date($.t)),...t.quits.flatMap($=>($.resets||[]).map(b=>zt(b.to)))],n=Array.from({length:7},()=>Array(6).fill(0));a.forEach($=>{n[($.getDay()+6)%7][Math.floor($.getHours()/4)]++});let s=Math.max(1,...n.flat()),o=null;n.forEach(($,b)=>$.forEach((p,y)=>{p&&(!o||p>o.n)&&(o={n:p,w:b,b:y})}));let i={};t.cravings.forEach($=>($.triggers||[]).forEach(b=>{i[b]=(i[b]||0)+1})),t.quits.forEach($=>($.resets||[]).forEach(b=>(b.triggers||[]).forEach(p=>{i[p]=(i[p]||0)+1})));let l=Object.entries(i).sort(($,b)=>b[1]-$[1]).slice(0,6),d=oa.map(()=>[]);Object.values(t.checkins).forEach($=>{if(!$.sleep)return;let b=t.quits.map(p=>$[p.id]).filter(p=>typeof p=="number");b.length&&d[$.sleep-1].push(b.reduce((p,y)=>p+y,0)/b.length)});let c=d.map($=>$.length?$.reduce((b,p)=>b+p,0)/$.length:null),r=[...d[0],...d[1]],h=[...d[3],...d[4]],m=$=>$.reduce((b,p)=>b+p,0)/$.length,u=r.length>=2&&h.length>=2?`After good sleep your cravings average ${m(h).toFixed(1)}/10, against ${m(r).toFixed(1)}/10 after a bad night.`:null,v=c.filter($=>$!=null).length>=2;return a.length<3&&!l.length&&!v?null:e`
    ${a.length>=3&&e`<section class="group">
      <h2 class="group-h">When cravings hit</h2>
      <div class="card pad heatmap">
        <div class="heat-grid">
          <span></span>${qa.map($=>e`<span class="heat-h" key=${$}>${$}</span>`)}
          ${n.map(($,b)=>e`<span class="heat-w" key=${"w"+b}>${Fa[b]}</span>${$.map((p,y)=>e`<i key=${b+"-"+y} title=${`${Fa[b]} ${qa[y]}: ${p}`}
            style=${`--a:${p?.18+p/s*.82:0}`} class=${p?"on":""}>${p||""}</i>`)}`)}
        </div>
        <p class="tiny muted">${o?`Your toughest time is ${Fa[o.w]} ${qa[o.b]}. Plan something for then.`:""} From ${a.length} craving${a.length===1?"":"s"} and slips you logged.</p>
      </div>
    </section>`}

    ${l.length>0&&e`<section class="group">
      <h2 class="group-h">What sets cravings off</h2>
      <div class="card pad bars">
        ${l.map(([$,b])=>e`<div class="bar-row" key=${$}>
          <span class="bar-l">${$}</span>
          <span class="bar-t"><i style="width:${b/l[0][1]*100}%"></i></span>
          <b>${b}</b>
        </div>`)}
        <p class="tiny muted">From Craving SOS and any slips you logged.</p>
      </div>
    </section>`}

    ${v&&e`<section class="group">
      <h2 class="group-h">Sleep and cravings</h2>
      <div class="card pad bars">
        ${oa.map(($,b)=>c[b]!=null&&e`<div class="bar-row" key=${$}>
          <span class="bar-l">${$} sleep</span>
          <span class="bar-t"><i style="width:${c[b]/10*100}%;background:#BF5AF2"></i></span>
          <b>${c[b].toFixed(1)}</b>
        </div>`)}
        <p class="tiny muted">${u||"Average craving (out of 10) on days after each kind of night. Keep logging sleep to see a pattern."}</p>
      </div>
    </section>`}`}export{Qo as a,Te as b,St as c,ni as d,oi as e,te as f,ii as g,dn as h,di as i,se as j,Ql as k,Di as l,ne as m,xl as n,Pl as o,La as p,il as q};
