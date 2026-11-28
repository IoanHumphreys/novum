import{Da as l,I as i,Na as c,Sa as d,f as o}from"./c-6HSNWY5Y.js";var g=864e5,p=20,b=30,m=t=>t>=85?"Excellent":t>=70?"Strong":t>=50?"Good":t>=30?"Building up":"Getting started",h=t=>t>=.8?"Powerful":t>=.55?"Strong":t>=.3?"Steady":"Gentle";function f(t,e,s){return Math.round(Math.min(1,t/p)*60+Math.min(1,e)*25+Math.min(1,Math.max(0,s))*15)}function w({s:t}){let e=t.lungTests||[],s=e[e.length-1],a=e[0],n=s?Math.floor((Date.now()-s.t)/g):null;return o`<section class="group">
    <h2 class="group-h">Lung test</h2>
    <div class="card lung-card">
      ${s?o`
        <div class="lung-top">
          <div><div class="lung-score">${s.score}<small>/100</small></div><div class="lung-word">${m(s.score)}</div></div>
          ${e.length>1&&o`<div class="lung-delta ${s.score>=a.score?"up":"down"}">${s.score>=a.score?"▲":"▼"} ${Math.abs(s.score-a.score)}<small>since your first test</small></div>`}
        </div>
        ${e.length>1&&o`<${c} keys=${e.map(r=>i(new Date(r.t)))} series=${[{name:"Lung score",color:"#5AC8FA",values:e.map(r=>r.score)}]}
          yMin=${0} yMax=${100} yTicks=${[0,50,100]} height=${130} />`}
        <div class="lung-meta">${s.dur.toFixed(1)}s · ${h(s.strength).toLowerCase()} breath · ${n===0?"today":`${n} day${n===1?"":"s"} ago`}</div>
        <button class="btn ${n>=7?"btn-primary":"btn-tinted"} block" onClick=${u}>${n>=7?"Time for this week’s test":"Test again"}</button>`:o`
        <div class="lung-intro"><span class="lung-e">🫁</span><div><b>How are your lungs doing?</b>
          <p class="muted">Blow into your phone for up to 30 seconds. Do it weekly and watch your score climb as your lungs recover.</p></div></div>
        <button class="btn btn-primary block" onClick=${u}>Take the test</button>`}
      <p class="tiny muted">For motivation, not a medical test. Use the same spot and distance each time for a fair comparison.</p>
    </div>
  </section>`}var $=d(()=>import("./c-JSCGSA5U.js"),"LungTest",()=>o`<div class="lazy-wait" role="status">Getting the test ready…</div>`);function u(){l(t=>o`<${$} close=${t} />`,{tall:!0})}export{p as a,b,m as c,h as d,f as e,w as f};
