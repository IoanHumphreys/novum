import{b as S,c as w,m as A,p as B}from"./c-RGFY2C67.js";import{n as E}from"./c-LCQCBYH5.js";import{Aa as v,Ea as k,Ha as y,La as R,R as g,Ra as b,T as x,X as m,b as h,f as a,ya as $}from"./c-3SMB7GOA.js";function F(n,{quiet:l}={}){let c=w.find(e=>e.id===n);c&&(m(e=>{c.r.forEach(i=>e.fitness.routines.push({id:g(),name:i.name,prog:c.id,ex:i.ex.map(([d,r,u])=>({x:d,sets:r,reps:u}))}))}),l||($(15),b(`${c.name} added to your routines`)))}function q(){k(n=>a`<${G} close=${n} />`,{tall:!0})}function G({close:n}){let l=x(),c=new Set(l.fitness.routines.map(e=>e.prog).filter(Boolean));return a`
    <${y} title="Starter plans" right=${a`<button class="link b" onClick=${n}>Done</button>`} />
    <div class="sheet-body">
      <p class="muted center sheet-intro">Ready-made plans. Adding one copies its workouts into your routines, where you can change anything.</p>
      ${w.map(e=>a`<div class="card fx-prog" key=${e.id}>
        <div class="fx-prog-h"><span class="fx-prog-e">${e.e}</span><span class="row-main"><b>${e.name}</b><small>${e.days} · ${e.r.length} workout${e.r.length===1?"":"s"}</small></span></div>
        <p>${e.d}</p>
        <div class="fx-prog-r">${e.r.map(i=>a`<div key=${i.name}><b>${i.name}</b><span>${i.ex.map(([d])=>S(d).n).join(" · ")}</span></div>`)}</div>
        ${c.has(e.id)?a`<span class="pill ok">Added</span>`:a`<button class="btn btn-tinted sm" onClick=${()=>{F(e.id),n()}}>Add plan</button>`}
      </div>`)}
    </div>`}function z(n=null){k(l=>a`<${N} id=${n} close=${l} />`,{tall:!0})}function N({id:n,close:l}){let c=x(),e=c.fitness.routines.find(t=>t.id===n),[i,d]=h(e?.name||""),[r,u]=h(()=>(e?.ex||[]).map(t=>({...t}))),C=i.trim()&&r.length,f=(t,s)=>u(r.map((o,p)=>p===t?{...o,...s}:o)),D=(t,s)=>{let o=[...r],[p]=o.splice(t,1);o.splice(t+s,0,p),u(o),$()},I=()=>{C&&(m(t=>{let s={id:n||g(),name:i.trim().slice(0,40),prog:e?.prog,ex:r};n?t.fitness.routines=t.fitness.routines.map(o=>o.id===n?s:o):t.fitness.routines.push(s)}),$(15),b(n?"Routine saved":"Routine made"),l())},P=()=>E({title:"Delete routine",text:`Delete “${e.name}”? Workouts you’ve done with it stay in your history.`,confirm:"Delete routine",onConfirm:()=>{l(),m(t=>{t.fitness.routines=t.fitness.routines.filter(s=>s.id!==n)}),b("Routine deleted")}});return a`
    <${y} title=${n?"Edit routine":"New routine"} left=${a`<button class="link" onClick=${l}>Cancel</button>`} right=${a`<button class="link b" disabled=${!C} onClick=${I}>Save</button>`} />
    <div class="sheet-body">
      <div class="card"><input class="fx-name in-card" placeholder="Routine name, e.g. Push day" maxlength="40" value=${i} onInput=${t=>d(t.target.value)} /></div>
      <${R} header="Exercises" footer=${r.length?"Sets and a target rep range for each. You can always do more or less on the day.":""}>
        ${r.map((t,s)=>{let o=S(t.x,c);return a`<div class="row fx-rt" key=${`${t.x}-${s}`}>
            <${A} e=${o} />
            <span class="row-main"><span class="row-title">${o.n}</span>
              <span class="fx-rt-c">
                <span class="fx-step"><button aria-label="Fewer sets" disabled=${t.sets<=1} onClick=${()=>f(s,{sets:t.sets-1})}>−</button><b>${t.sets}</b><button aria-label="More sets" disabled=${t.sets>=10} onClick=${()=>f(s,{sets:t.sets+1})}>+</button></span>
                <span class="muted">sets ×</span>
                <input class="fx-reps" placeholder=${o.t==="t"?"30 s":"8–12"} maxlength="10" value=${t.reps||""} onInput=${p=>f(s,{reps:p.target.value})} aria-label="Target reps" />
              </span></span>
            <span class="fx-rt-m">
              <button class="icon-btn muted" aria-label="Move up" disabled=${s===0} onClick=${()=>D(s,-1)}>↑</button>
              <button class="icon-btn muted" aria-label="Remove" onClick=${()=>u(r.filter((p,M)=>M!==s))}>${v.trash()}</button>
            </span>
          </div>`})}
        <button class="row tap" onClick=${()=>B(t=>u([...r,...t.map(s=>({x:s,sets:3,reps:""}))]))}>
          <span class="row-ic tinted" style="--c:#3B9BFF">${v.plus()}</span><span class="row-main"><span class="row-title">Add exercises</span></span>
        </button>
      <//>
      ${n&&a`<button class="btn btn-plain danger block" onClick=${P}>Delete routine</button>`}
    </div>`}export{F as a,q as b,z as c};
