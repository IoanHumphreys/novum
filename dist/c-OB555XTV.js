import{b as E,d as X,e as W,f as L,g as Z,i as _,j,m as tt,o as O,p as V}from"./c-AMQR2HX4.js";import{n as M}from"./c-JNCYY6XI.js";import{Da as T,Ea as H,Ga as C,O as J,Q as z,Qa as y,S as w,T as Q,W as v,b as q,c as I,e as G,f as c,xa as k,ya as B,za as S}from"./c-64P324KW.js";var A=()=>Date.now();function et(){let[t,s]=q(w());return I(()=>Q(s),[]),t}var f=t=>v(s=>{s.fitness.active&&t(s.fitness.active,s)});function gt(t=null){let s=w();if(s.fitness.active){M({title:"Workout in progress",text:`You’ve already got “${s.fitness.active.name}” going. Finish or discard it first.`,confirm:"Open it",danger:!1,onConfirm:()=>setTimeout(st,350)});return}k(15);let n=(t?.ex||[]).map(u=>({x:u.x,reps:u.reps||"",sets:Array.from({length:Math.max(1,u.sets||3)},()=>({}))})),e=new Date().getHours(),a=t?.name||(e<11?"Morning workout":e<17?"Afternoon workout":"Evening workout");v(u=>{u.fitness.active={id:z(),start:A(),name:a,rid:t?.id||null,note:"",ex:n}}),st()}function st(){T(t=>c`<${lt} close=${t} />`,{tall:!0})}var nt=t=>{let s=Math.max(0,Math.floor(t/1e3)),n=Math.floor(s/3600),e=Math.floor(s%3600/60),a=String(s%60).padStart(2,"0");return n?`${n}:${String(e).padStart(2,"0")}:${a}`:`${e}:${a}`};function it({start:t}){let s=B(1e3);return nt(s-t)}function rt({restEnd:t,rest:s}){let n=B(250),e=t?t-n:0,a=G(0);if(I(()=>{t&&e<=0&&a.current!==t&&(a.current=t,k(300),f(l=>{delete l.restEnd}))},[e<=0,t]),!t||e<=0)return null;let u=Math.max(0,Math.min(1,e/(s*1e3))),d=l=>{k(),f(i=>{i.restEnd=Math.max(A()+1e3,(i.restEnd||A())+l*1e3)})};return c`<div class="fx-rest" role="timer" aria-live="off">
    <i style=${`width:${u*100}%`}></i>
    <button class="fx-rest-b" onClick=${()=>d(-15)}>−15</button>
    <span class="fx-rest-t"><small>Rest</small>${nt(e+999)}</span>
    <button class="fx-rest-b" onClick=${()=>d(15)}>+15</button>
    <button class="fx-rest-b skip" onClick=${()=>{k(),f(l=>{delete l.restEnd})}}>Skip</button>
  </div>`}function lt({close:t}){let s=et(),n=s.fitness.active;if(!n)return c`<${C} title="Workout" right=${c`<button class="link b" onClick=${t}>Done</button>`} /><div class="sheet-body"><p class="muted center pad">No workout in progress.</p></div>`;let e=n.ex.reduce((l,i)=>l+i.sets.filter(o=>o.d).length,0),a=()=>V(l=>{f(i=>{l.forEach(o=>i.ex.push({x:o,sets:[{},{},{}]}))})}),u=()=>M({title:"Discard workout",text:"Throw this workout away? Nothing from it will be saved.",confirm:"Discard workout",onConfirm:()=>{H(),v(l=>{l.fitness.active=null}),y("Workout discarded")}}),d=()=>{let l=n.ex.reduce((o,r)=>o+r.sets.filter(p=>!p.d).length,0);if(!e){M({title:"Nothing ticked yet",text:"Tick off at least one set to save this workout, or discard it.",confirm:"Discard workout",onConfirm:()=>{H(),v(o=>{o.fitness.active=null})}});return}let i=()=>{let o=n.id;v(r=>{let p=r.fitness.active,{restEnd:$,...m}=p;r.fitness.workouts.push({...m,end:A(),ex:p.ex.map(({reps:b,...g})=>({...g,sets:g.sets.filter(D=>D.d)})).filter(b=>b.sets.length)}),r.fitness.active=null}),k(30),t(),setTimeout(()=>dt(o),380)};l?M({title:"Finish workout?",text:`${l} set${l===1?" isn’t":"s aren’t"} ticked. Unticked sets won’t be saved.`,confirm:"Finish",danger:!1,onConfirm:i}):i()};return c`
    <${C} title=${c`<span class="fx-clock"><${it} start=${n.start} /></span>`}
      left=${c`<button class="link" aria-label="Minimise" onClick=${t}>Hide</button>`}
      right=${c`<button class="btn btn-primary sm fx-finish" onClick=${d}>Finish</button>`} />
    <div class="sheet-body fx-logger">
      <input class="fx-name" value=${n.name} maxlength="40" aria-label="Workout name" onChange=${l=>f(i=>{i.name=l.target.value.trim().slice(0,40)||i.name})} />
      <p class="fx-meta">${J(new Date(n.start),{weekday:"long",day:"numeric",month:"long"})} · ${e} set${e===1?"":"s"} done</p>
      ${n.ex.map((l,i)=>c`<${ct} key=${`${l.x}-${i}`} e=${l} i=${i} s=${s} count=${n.ex.length} />`)}
      ${!n.ex.length&&c`<p class="muted center pad">Add your first exercise to get going.</p>`}
      <button class="btn btn-tinted block" onClick=${a}>${S.plus()} Add exercises</button>
      <button class="btn btn-plain danger block" onClick=${u}>Discard workout</button>
      <div class="fx-rest-space"></div>
    </div>
    <${rt} restEnd=${n.restEnd} rest=${s.fitness.rest||90} />`}function ct({e:t,i:s,s:n,count:e}){let a=E(t.x,n),u=_(n,t.x),d=a.t,l=()=>T(o=>c`
    <${C} title=${a.n} right=${c`<button class="link b" onClick=${o}>Close</button>`} />
    <div class="sheet-body"><div class="card list">
      <button class="row tap" onClick=${()=>{o(),setTimeout(()=>O(t.x),350)}}><span class="row-main"><span class="row-title">How to do it and history</span></span><span class="row-chev">${S.chevron()}</span></button>
      ${s>0&&c`<button class="row tap" onClick=${()=>{o(),f(r=>{let[p]=r.ex.splice(s,1);r.ex.splice(s-1,0,p)})}}><span class="row-main"><span class="row-title">Move up</span></span></button>`}
      ${s<e-1&&c`<button class="row tap" onClick=${()=>{o(),f(r=>{let[p]=r.ex.splice(s,1);r.ex.splice(s+1,0,p)})}}><span class="row-main"><span class="row-title">Move down</span></span></button>`}
      <button class="row tap" onClick=${()=>{o(),setTimeout(()=>V(r=>r[0]&&f(p=>{p.ex[s]={x:r[0],sets:p.ex[s].sets.map(()=>({}))}}),{title:"Swap for"}),350)}}><span class="row-main"><span class="row-title">Swap exercise</span></span></button>
      <button class="row tap danger" onClick=${()=>{o(),f(r=>{r.ex.splice(s,1)})}}><span class="row-main"><span class="row-title">Remove from workout</span></span></button>
    </div></div>`),i=d==="t"?["kg","Secs"]:d==="b"?["+kg","Reps"]:["kg","Reps"];return c`<div class="card fx-ex">
    <div class="fx-ex-h">
      <button class="fx-ex-name" onClick=${()=>O(t.x)}><${tt} e=${a} /><span><b>${a.n}</b>${t.reps&&c`<small>Target ${t.reps}${/\d$/.test(t.reps)&&d!=="t"?" reps":""}</small>`}</span></button>
      <button class="icon-btn muted" aria-label="More" onClick=${l}>•••</button>
    </div>
    <div class="fx-grid fx-grid-h"><span>Set</span><span>Previous</span><span>${i[0]}</span><span>${i[1]}</span><span></span></div>
    ${t.sets.map((o,r)=>c`<${ut} key=${r} x=${o} j=${r} i=${s} t=${d} prev=${u[r]||u[u.length-1]} warmIdx=${t.sets.slice(0,r).filter(p=>!p.w).length+1} />`)}
    <div class="fx-ex-f">
      <button class="link sm" onClick=${()=>{k(),f(o=>{let r=o.ex[s].sets,p=r[r.length-1]||{};r.push({kg:p.kg,r:void 0,s:void 0})})}}>${S.plus()} Add set</button>
      ${t.sets.length>1&&c`<button class="link sm muted" onClick=${()=>f(o=>{o.ex[s].sets.pop()})}>Remove set</button>`}
    </div>
  </div>`}var K=t=>{let s=parseFloat(String(t).replace(",","."));return Number.isFinite(s)&&s>=0?Math.min(s,9999):void 0};function ut({x:t,j:s,i:n,t:e,prev:a,warmIdx:u}){let d=e==="t"?"s":"r",l=a?.kg!=null?X(a.kg):e==="w"?"0":"–",i=a?String(e==="t"?a.s||"":a.r||""):"",o=($,m)=>f(b=>{let g=b.ex[n]?.sets[s];g&&(m===void 0?delete g[$]:g[$]=m)}),r=()=>{let $=w(),m=$.fitness.active,b=m?.ex[n]?.sets[s];if(!b)return;if(b.d){k(),f(h=>{let x=h.ex[n].sets[s];x.d=!1,delete x.pb});return}let g=b.kg??a?.kg??(e==="w"?void 0:0),D=b[d]??(a?a[d]:void 0);if(e==="w"&&!(g>=0&&g!==void 0)||!D){y(e==="t"?"Add the time first":e==="w"?"Add the weight and reps first":"Add the reps first");return}let R=m.ex[n].x,P=j($,R,m.start),F={kg:g,[d]:D},U=L(F,e),ot=Math.max(0,...m.ex.flatMap(h=>h.x===R?h.sets.filter(x=>x.d&&!x.w&&x!==b).map(x=>L(x,e)):[])),N=!b.w&&P&&U>P.score&&U>ot;k(N?[20,40,30]:18),f(h=>{let x=h.ex[n].sets[s];Object.assign(x,F,{d:!0}),N&&(h.ex.forEach(Y=>Y.x===R&&Y.sets.forEach(at=>delete at.pb)),x.pb=!0),h.restEnd=A()+(w().fitness.rest||90)*1e3}),N&&y(`🏆 New best on ${E(R,$).n}: ${W(F,e)}`)},p=t.w?"W":u;return c`<div class="fx-grid fx-set ${t.d?"done":""} ${t.pb?"pb":""}">
    <button class="fx-setno ${t.w?"warm":""}" aria-label="Warm-up set" title="Tap to mark as a warm-up" onClick=${()=>{k(),f($=>{let m=$.ex[n].sets[s];m.w=!m.w,m.w&&delete m.pb})}}>${p}</button>
    <span class="fx-prev">${a?W(a,e):"–"}</span>
    <input type="number" inputmode="decimal" step="any" enterkeyhint="next" placeholder=${l} value=${t.kg??""} aria-label=${e==="b"?"Extra weight in kg":"Weight in kg"}
      onChange=${$=>o("kg",K($.target.value))} />
    <input type="number" inputmode=${"numeric"} step="1" enterkeyhint="done" placeholder=${i} value=${t[d]??""} aria-label=${e==="t"?"Seconds":"Reps"}
      onChange=${$=>o(d,K($.target.value)!==void 0?Math.round(K($.target.value)):void 0)} />
    <button class="fx-tick ${t.d?"on":""}" aria-pressed=${!!t.d} aria-label="Set done" onClick=${r}>${S.check()}</button>
  </div>`}function dt(t){T(s=>c`<${pt} id=${t} close=${s} />`,{tall:!0})}function pt({id:t,close:s}){let n=et(),e=n.fitness.workouts.find(i=>i.id===t);if(!e)return null;let a=Z(e,n),u=e.ex.flatMap(i=>i.sets.filter(o=>o.pb).map(o=>({n:E(i.x,n).n,text:W(o,E(i.x,n).t)}))),d=n.fitness.workouts.length,l=()=>{v(i=>{i.fitness.routines.push({id:z(),name:e.name,ex:e.ex.map(o=>({x:o.x,sets:o.sets.filter(r=>!r.w).length||1,reps:""}))})}),y("Saved as a routine"),k(15)};return c`
    <${C} title="Workout done" right=${c`<button class="link b" onClick=${s}>Done</button>`} />
    <div class="sheet-body">
      <div class="fx-done"><div class="ready-ring fx-ring"><span>✓</span></div>
        <h2>${e.name}</h2><p class="muted">Workout number ${d}. Nice work.</p></div>
      <div class="tiles fx-tiles">
        <div class="tile"><span class="tile-k">Time</span><b>${a.mins}</b><span class="tile-u">minute${a.mins===1?"":"s"}</span></div>
        <div class="tile"><span class="tile-k">Sets</span><b>${a.sets}</b><span class="tile-u">done</span></div>
        <div class="tile"><span class="tile-k">Volume</span><b>${a.volume>=1e3?`${(a.volume/1e3).toFixed(1)}t`:Math.round(a.volume)}</b><span class="tile-u">${a.volume>=1e3?"tonnes lifted":"kg lifted"}</span></div>
      </div>
      ${u.length>0&&c`<div class="card list mt12">${u.map((i,o)=>c`<div class="row" key=${o}><span class="row-ic tinted" style="--c:#FFC21A">🏆</span>
        <span class="row-main"><span class="row-title">New best: ${i.n}</span><span class="row-sub">${i.text}</span></span></div>`)}</div>`}
      ${!e.rid&&c`<button class="btn btn-tinted block" onClick=${l}>Save as a routine</button>`}
    </div>`}export{gt as a,st as b,it as c,dt as d};
