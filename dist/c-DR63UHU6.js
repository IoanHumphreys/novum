import{a as h,b as J,c as O}from"./c-Y7CKH2QH.js";import{b as T,c as x}from"./c-EMBUBGIX.js";import{a as U,b as f,e as X,g,h as w,k as E,l as _,m as q,n as z}from"./c-RGFY2C67.js";import{n as j,o as H}from"./c-6Y37IDUQ.js";import"./c-64SAQGNL.js";import"./c-E7ZIQIMY.js";import"./c-7Z6ZGD2Z.js";import"./c-INGTM4TJ.js";import{n as M}from"./c-LCQCBYH5.js";import"./c-B4QY5EBS.js";import"./c-2KPLHCVL.js";import"./c-OCZ74QMI.js";import"./c-HECOZTOP.js";import{Aa as u,Ea as D,Ha as R,I as k,Ia as K,Ja as P,La as Y,N as L,O as I,P as S,R as F,Ra as B,T as C,X as v,f as e,ya as G,za as N}from"./c-3SMB7GOA.js";var W=864e5,Q=(t,i)=>{let o=L(new Date(t),new Date(i));return o===0?"Today":o===1?"Yesterday":o<7?`${o} days ago`:S(new Date(t),{day:"numeric",month:"short"})},A=t=>t>=1e3?`${(t/1e3).toFixed(1)} t`:`${Math.round(t)} kg`;function us({s:t}){let i=N(6e4),o=t.fitness,n=o.active,c=I(new Date(i)).getTime(),d=E(t,c),$=d.reduce((s,l)=>{let p=g(l,t);return{sets:s.sets+p.sets,mins:s.mins+p.mins,volume:s.volume+p.volume}},{sets:0,mins:0,volume:0}),y=Array.from({length:7},(s,l)=>{let p=k(new Date(c+l*W));return{k:p,on:d.some(Z=>k(new Date(Z.start))===p),today:p===k(new Date(i))}}),a=0;for(let s=d.length?c:c-7*W;E(t,s).length;s-=7*W)a++;let m=w(t).slice(0,5),r=_(t),b=e`<button class="icon-btn accent" aria-label="Start an empty workout" onClick=${()=>h()}>${u.plus()}</button>`;return e`<${K} title="Fitness" right=${b}>
    ${n?e`<button class="card fx-live tap" onClick=${J}>
        <span class="fx-live-dot"></span>
        <span class="row-main"><span class="row-title">${n.name}</span><span class="row-sub">In progress · <${O} start=${n.start} /></span></span>
        <span class="btn btn-primary sm">Resume</span>
      </button>`:e`<button class="card fx-hero tap" onClick=${()=>h(r)}>
        <span class="fx-hero-k">${r?"Up next":"Ready when you are"}</span>
        <b>${r?r.name:"Start a workout"}</b>
        <span class="fx-hero-s">${r?`${r.ex.length} exercise${r.ex.length===1?"":"s"} · ${r.ex.slice(0,3).map(s=>f(s.x,t).n).join(", ")}${r.ex.length>3?"…":""}`:"Log sets as you go. Add exercises on the fly."}</span>
        <span class="btn fx-hero-btn">${u.plus()} Start</span>
      </button>`}

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">This week</h2>${a>0&&e`<span class="pill sm fx-streak">🔥 ${a} week${a===1?"":"s"} in a row</span>`}</div>
      <div class="card fx-week">
        <div class="fx-days">${y.map((s,l)=>e`<span key=${s.k} class="${s.on?"on":""} ${s.today?"today":""}"><i>${s.on?u.check():""}</i><small>${"MTWTFSS"[l]}</small></span>`)}</div>
        <div class="fx-wstats">
          <div><b>${d.length}</b><span>workout${d.length===1?"":"s"}</span></div>
          <div><b>${$.sets}</b><span>sets</span></div>
          <div><b>${$.mins}</b><span>minute${$.mins===1?"":"s"}</span></div>
          <div><b>${A($.volume)}</b><span>lifted</span></div>
        </div>
      </div>
    </section>

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Routines</h2><button class="link sm b" onClick=${()=>x()}>${u.plus()} New</button></div>
      ${o.routines.length?e`<div class="fx-routines">
        ${o.routines.map(s=>{let l=w(t).find(p=>p.rid===s.id);return e`<div class="card fx-routine" key=${s.id}>
            <button class="fx-routine-main" onClick=${()=>x(s.id)}>
              <b>${s.name}</b>
              <span>${s.ex.map(p=>f(p.x,t).n).join(" · ")}</span>
              <small>${l?`Last done ${Q(l.start,i).toLowerCase()}`:"Not done yet"}</small>
            </button>
            <button class="btn btn-tinted sm" disabled=${!!n} onClick=${()=>h(s)}>Start</button>
          </div>`})}
        </div>
        <button class="link sm b fx-more" onClick=${T}>Browse starter plans</button>`:e`<div class="card fx-empty">
          <b>Pick a plan or build your own</b>
          <p>Starter plans for beginners, strength, push/pull/legs, upper/lower and home workouts.</p>
          <div class="fx-empty-b"><button class="btn btn-primary sm" onClick=${T}>Starter plans</button><button class="btn btn-tinted sm" onClick=${()=>x()}>Build a routine</button></div>
        </div>`}
    </section>

    <section class="group">
      <div class="group-h-row"><h2 class="group-h">Recent workouts</h2>${w(t).length>5&&e`<button class="link sm b" onClick=${ss}>See all</button>`}</div>
      <div class="card list">
        ${m.length?m.map(s=>e`<${V} key=${s.id} w=${s} s=${t} now=${i} />`):e`<div class="row"><span class="row-main"><span class="row-sub">Your finished workouts show up here.</span></span></div>`}
      </div>
    </section>

    <${Y} header="Library and settings">
      <button class="row tap" onClick=${z}>
        <span class="row-ic tinted" style="--c:#30D158">${u.search()}</span>
        <span class="row-main"><span class="row-title">Exercises</span><span class="row-sub">${U.length+o.custom.length} with how-to steps and the muscles they work</span></span>
        <span class="row-chev">${u.chevron()}</span>
      </button>
      <div class="row"><span class="row-ic tinted" style="--c:#A2A8B8">${u.clock()}</span>
        <span class="row-main"><span class="row-title">Rest timer</span><span class="row-sub">Starts when you tick off a set</span></span></div>
      <div class="pad fx-rest-pick"><${P} small options=${[60,90,120,180].map(s=>({value:s,label:s<120?`${s} s`:`${s/60} min`}))} value=${o.rest||90} onChange=${s=>v(l=>{l.fitness.rest=s})} /></div>
    <//>

    <section class="group fx-goals">
      <div class="group-h-row"><h2 class="group-h">Goals & habits</h2><button class="link sm b" onClick=${()=>H()}>${u.plus()} New</button></div>
      <${j} s=${t} />
    </section>
  <//>`}function V({w:t,s:i,now:o}){let n=g(t,i);return e`<button class="row tap" onClick=${()=>ts(t.id)}>
    <span class="row-ic tinted" style="--c:#30D158">${u.check()}</span>
    <span class="row-main"><span class="row-title">${t.name}${t.ex.some(c=>c.sets.some(d=>d.pb))?" 🏆":""}</span>
      <span class="row-sub">${Q(t.start,o)} · ${n.mins} min · ${n.sets} sets${n.volume?` · ${A(n.volume)}`:""}</span></span>
    <span class="row-chev">${u.chevron()}</span>
  </button>`}function ss(){D(t=>{let i=C(),o=Date.now();return e`<${R} title="All workouts" right=${e`<button class="link b" onClick=${t}>Done</button>`} />
      <div class="sheet-body"><div class="card list">${w(i).map(n=>e`<${V} key=${n.id} w=${n} s=${i} now=${o} />`)}</div></div>`},{tall:!0})}function ts(t){D(i=>e`<${ns} id=${t} close=${i} />`,{tall:!0})}function ns({id:t,close:i}){let o=C(),n=o.fitness.workouts.find(a=>a.id===t);if(!n)return null;let c=g(n,o),d={id:n.rid,name:n.name,ex:n.ex.map(a=>({x:a.x,sets:a.sets.length,reps:""}))},$=()=>M({title:"Delete workout",text:`Delete “${n.name}” from your history? Any bests set in it go too.`,confirm:"Delete workout",onConfirm:()=>{i(),v(a=>{a.fitness.workouts=a.fitness.workouts.filter(m=>m.id!==t)}),B("Workout deleted")}}),y=()=>{v(a=>{a.fitness.routines.push({id:F(),name:n.name,ex:d.ex})}),G(15),B("Saved as a routine")};return e`
    <${R} title=${n.name} right=${e`<button class="link b" onClick=${i}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center">${S(new Date(n.start),{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · ${c.mins} min · ${c.sets} sets${c.volume?` · ${A(c.volume)}`:""}</p>
      ${n.ex.map((a,m)=>{let r=f(a.x,o);return e`<div class="card fx-wex" key=${m}>
          <div class="fx-wex-h"><${q} e=${r} /><b>${r.n}</b></div>
          ${a.sets.map((b,s)=>e`<div class="fx-wset ${b.pb?"pb":""}" key=${s}><span>${b.w?"W":a.sets.slice(0,s).filter(l=>!l.w).length+1}</span><span>${X(b,r.t)}</span>${b.pb&&e`<span class="pill sm fx-pb">Best</span>`}</div>`)}
        </div>`})}
      <button class="btn btn-primary block" disabled=${!!o.fitness.active} onClick=${()=>{i(),setTimeout(()=>h(d),350)}}>Do this workout again</button>
      ${!n.rid&&e`<button class="btn btn-tinted block" onClick=${y}>Save as a routine</button>`}
      <button class="btn btn-plain danger block" onClick=${$}>Delete workout</button>
    </div>`}export{us as Fitness};
