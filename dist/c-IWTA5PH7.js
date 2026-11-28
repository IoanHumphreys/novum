import{a as R,b as W,c as G,d as H,e as K}from"./c-E7ZIQIMY.js";import{Ha as B,Ra as L,T as M,X as P,b as l,c as E,e as A,f as a,ya as y}from"./c-3SMB7GOA.js";function nt({close:x}){let[c,r]=l("intro"),[U,w]=l(""),[X,Y]=l(3),[j,I]=l(0),[m,C]=l(0),[o,T]=l(null),b=A(null),$=A(0),S=()=>{cancelAnimationFrame($.current);let s=b.current;if(s)try{s.stream.getTracks().forEach(d=>d.stop()),s.ctx.close()}catch{}b.current=null};E(()=>S,[]);let F=()=>{let s=b.current;s.an.getFloatTimeDomainData(s.buf);let d=0;for(let h=0;h<s.buf.length;h++)d+=s.buf[h]*s.buf[h];return 20*Math.log10(Math.sqrt(d/s.buf.length)+1e-8)},q=async()=>{w("");try{let t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),e=new(window.AudioContext||window.webkitAudioContext);await e.resume();let n=e.createAnalyser();n.fftSize=2048,e.createMediaStreamSource(t).connect(n),b.current={stream:t,ctx:e,an:n,buf:new Float32Array(n.fftSize)}}catch(t){w(t?.name==="NotAllowedError"?"Novum needs the microphone for this. Allow it in Settings → Novum (or your browser’s site settings), then try again.":"Couldn’t start the microphone on this device."),r("error");return}r("calib");let s=[],d=performance.now();await new Promise(t=>{let e=()=>{s.push(F()),performance.now()-d<1500?$.current=requestAnimationFrame(e):t()};e()});let h=s.sort((t,e)=>t-e)[Math.floor(s.length*.6)]??-60;r("count");for(let t=3;t>0;t--)Y(t),y(8),await new Promise(e=>setTimeout(e,800));r("blow"),y(20);let O=12,Q=8,i=0,v=0,g=[],V=performance.now();if(await new Promise(t=>{let e=()=>{let n=performance.now(),f=F()-h;if(I(Math.max(0,Math.min(1,f/35))),!i&&f>O&&(i=n,v=n),i){if(f>Q&&(v=n,g.push(f)),C((n-i)/1e3),n-v>450||n-i>W*1e3)return t()}else if(n-V>6e3)return t();$.current=requestAnimationFrame(e)};e()}),S(),!i||g.length<10){w("Didn’t hear a breath. Hold the phone about a hand’s width from your mouth and blow steadily, like steaming up a window."),r("error");return}let D=(v-i)/1e3,k=g.reduce((t,e)=>t+e,0)/g.length,Z=Math.sqrt(g.reduce((t,e)=>t+(e-k)**2,0)/g.length),N=Math.min(1,k/30),z=Math.max(0,1-Z/Math.max(1,k)),_=K(D,N,z);y([20,50,20]),T({t:Date.now(),score:_,dur:+D.toFixed(2),strength:+N.toFixed(3),steady:+z.toFixed(3)}),r("result")},J=()=>{P(s=>{s.lungTests=[...s.lungTests||[],o].slice(-200)}),L("Saved to Progress 🫁"),x()},u=(M().lungTests||[]).slice(-1)[0],p=(M().lungTests||[])[0];return a`
    <${B} title="Lung test" left=${a`<button class="link" onClick=${()=>{S(),x()}}>Close</button>`} />
    <div class="sheet-body lung-test">
      ${c==="intro"&&a`
        <div class="lung-hero">🫁</div>
        <h2 class="auth-title center">Blow as long as you can</h2>
        <ol class="lung-steps">
          <li>Sit up straight somewhere quiet.</li>
          <li>Hold your phone about a hand’s width from your mouth, microphone towards you.</li>
          <li>Take a deep breath. When it says <b>Blow</b>, breathe out steadily (“hoooo”, like steaming a window) for as long as you comfortably can.</li>
        </ol>
        <p class="tiny muted center">Uses the microphone on your phone only. Nothing is recorded or sent anywhere. Not a medical test: if you feel dizzy, stop.</p>
        <button class="btn btn-primary block big" onClick=${q}>Start</button>`}
      ${c==="calib"&&a`<div class="lung-stage"><div class="lung-orb quiet"></div><p class="lung-say">Shh… listening to the room</p></div>`}
      ${c==="count"&&a`<div class="lung-stage"><div class="lung-orb"><b>${X}</b></div><p class="lung-say">Deep breath in…</p></div>`}
      ${c==="blow"&&a`<div class="lung-stage">
        <div class="lung-orb live" style=${`--lv:${j}`}><b>${m.toFixed(1)}</b><small>seconds</small></div>
        <div class="lung-bar"><i style=${`width:${Math.min(100,m/R*100)}%`}></i></div>
        <p class="lung-say">${m===0?"Blow!":m<8?"Keep going…":m<15?"Strong! Keep it steady":"Amazing, nearly there"}</p></div>`}
      ${c==="error"&&a`<div class="lung-stage"><div class="lung-hero">🎙️</div><p class="auth-err center">${U}</p>
        <button class="btn btn-primary block" onClick=${q}>Try again</button></div>`}
      ${c==="result"&&o&&a`
        <div class="lung-result">
          <div class="lung-score big">${o.score}<small>/100</small></div>
          <div class="lung-word">${G(o.score)}</div>
          <div class="stats3">
            <div><b>${o.dur.toFixed(1)}s</b><span>long</span></div>
            <div><b>${H(o.strength)}</b><span>strength</span></div>
            <div><b>${Math.round(o.steady*100)}%</b><span>steady</span></div>
          </div>
          ${u&&a`<p class="center">${o.score>u.score?`▲ ${o.score-u.score} on last time. Your lungs are thanking you.`:o.score===u.score?"Same as last time. Consistency counts.":`${u.score-o.score} below last time. Normal day to day; the trend is what matters.`}</p>`}
          ${p&&p!==u&&o.score>p.score&&a`<p class="center muted">${o.score-p.score} points up since your first test.</p>`}
          <button class="btn btn-primary block big" onClick=${J}>Save</button>
          <button class="btn btn-plain block" onClick=${()=>{T(null),C(0),r("intro")}}>Try again instead</button>
        </div>`}
    </div>`}export{nt as LungTest};
