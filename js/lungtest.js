// The lung test screen: listens to the microphone while you blow, then scores it. Loaded only when opened
// (see openLungTest in lungs.js). Nothing leaves the phone.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, SheetBar, toast } from './ui.js';
import * as S from './store.js';
import { TARGET, MAX, scoreWord, strengthWord, lungScore } from './lungs.js';

export function LungTest({ close }) {
  const [phase, setPhase] = useState('intro'); // intro → calib → count → blow → result | error
  const [err, setErr] = useState('');
  const [count, setCount] = useState(3);
  const [level, setLevel] = useState(0);   // 0..1, drives the circle
  const [secs, setSecs] = useState(0);
  const [result, setResult] = useState(null);
  const audio = useRef(null);
  const raf = useRef(0);

  const stop = () => {
    cancelAnimationFrame(raf.current);
    const a = audio.current;
    if (a) { try { a.stream.getTracks().forEach((t) => t.stop()); a.ctx.close(); } catch { /* already closed */ } }
    audio.current = null;
  };
  useEffect(() => stop, []);

  const db = () => {
    const a = audio.current;
    a.an.getFloatTimeDomainData(a.buf);
    let sum = 0;
    for (let i = 0; i < a.buf.length; i++) sum += a.buf[i] * a.buf[i];
    return 20 * Math.log10(Math.sqrt(sum / a.buf.length) + 1e-8);
  };

  const start = async () => {
    setErr('');
    try {
      // Turn off the phone's voice processing so it doesn't "clean up" the breath sound
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      await ctx.resume();
      const an = ctx.createAnalyser();
      an.fftSize = 2048;
      ctx.createMediaStreamSource(stream).connect(an);
      audio.current = { stream, ctx, an, buf: new Float32Array(an.fftSize) };
    } catch (e) {
      setErr(e?.name === 'NotAllowedError'
        ? 'Novum needs the microphone for this. Allow it in Settings → Novum (or your browser’s site settings), then try again.'
        : 'Couldn’t start the microphone on this device.');
      setPhase('error');
      return;
    }
    // 1. listen to the room for a moment
    setPhase('calib');
    const quiet = [];
    const t0 = performance.now();
    await new Promise((done) => {
      const tick = () => { quiet.push(db()); if (performance.now() - t0 < 1500) raf.current = requestAnimationFrame(tick); else done(); };
      tick();
    });
    const floor = quiet.sort((a, b) => a - b)[Math.floor(quiet.length * 0.6)] ?? -60;
    // 2. countdown
    setPhase('count');
    for (let n = 3; n > 0; n--) { setCount(n); haptic(8); await new Promise((r) => setTimeout(r, 800)); }
    // 3. blow
    setPhase('blow'); haptic(20);
    const startAbove = 12, endAbove = 8;
    let began = 0, lastLoud = 0;
    const above = [];
    const t1 = performance.now();
    await new Promise((done) => {
      const tick = () => {
        const now = performance.now();
        const lift = db() - floor;
        setLevel(Math.max(0, Math.min(1, lift / 35)));
        if (!began && lift > startAbove) { began = now; lastLoud = now; }
        if (began) {
          if (lift > endAbove) { lastLoud = now; above.push(lift); }
          setSecs((now - began) / 1000);
          if (now - lastLoud > 450 || now - began > MAX * 1000) return done();
        } else if (now - t1 > 6000) return done(); // never started
        raf.current = requestAnimationFrame(tick);
      };
      tick();
    });
    stop();
    if (!began || above.length < 10) { setErr('Didn’t hear a breath. Hold the phone about a hand’s width from your mouth and blow steadily, like steaming up a window.'); setPhase('error'); return; }
    const dur = (lastLoud - began) / 1000;
    const mean = above.reduce((a, b) => a + b, 0) / above.length;
    const sd = Math.sqrt(above.reduce((a, b) => a + (b - mean) ** 2, 0) / above.length);
    const strength = Math.min(1, mean / 30);
    const steady = Math.max(0, 1 - sd / Math.max(1, mean));
    const score = lungScore(dur, strength, steady);
    haptic([20, 50, 20]);
    setResult({ t: Date.now(), score, dur: +dur.toFixed(2), strength: +strength.toFixed(3), steady: +steady.toFixed(3) });
    setPhase('result');
  };

  const save = () => {
    S.update((d) => { d.lungTests = [...(d.lungTests || []), result].slice(-200); });
    toast('Saved to Progress 🫁');
    close();
  };
  const prev = (S.getState().lungTests || []).slice(-1)[0];
  const first = (S.getState().lungTests || [])[0];

  return html`
    <${SheetBar} title="Lung test" left=${html`<button class="link" onClick=${() => { stop(); close(); }}>Close</button>`} />
    <div class="sheet-body lung-test">
      ${phase === 'intro' && html`
        <div class="lung-hero">🫁</div>
        <h2 class="auth-title center">Blow as long as you can</h2>
        <ol class="lung-steps">
          <li>Sit up straight somewhere quiet.</li>
          <li>Hold your phone about a hand’s width from your mouth, microphone towards you.</li>
          <li>Take a deep breath. When it says <b>Blow</b>, breathe out steadily (“hoooo”, like steaming a window) for as long as you comfortably can.</li>
        </ol>
        <p class="tiny muted center">Uses the microphone on your phone only. Nothing is recorded or sent anywhere. Not a medical test: if you feel dizzy, stop.</p>
        <button class="btn btn-primary block big" onClick=${start}>Start</button>`}
      ${phase === 'calib' && html`<div class="lung-stage"><div class="lung-orb quiet"></div><p class="lung-say">Shh… listening to the room</p></div>`}
      ${phase === 'count' && html`<div class="lung-stage"><div class="lung-orb"><b>${count}</b></div><p class="lung-say">Deep breath in…</p></div>`}
      ${phase === 'blow' && html`<div class="lung-stage">
        <div class="lung-orb live" style=${`--lv:${level}`}><b>${secs.toFixed(1)}</b><small>seconds</small></div>
        <div class="lung-bar"><i style=${`width:${Math.min(100, (secs / TARGET) * 100)}%`}></i></div>
        <p class="lung-say">${secs === 0 ? 'Blow!' : secs < 8 ? 'Keep going…' : secs < 15 ? 'Strong! Keep it steady' : 'Amazing, nearly there'}</p></div>`}
      ${phase === 'error' && html`<div class="lung-stage"><div class="lung-hero">🎙️</div><p class="auth-err center">${err}</p>
        <button class="btn btn-primary block" onClick=${start}>Try again</button></div>`}
      ${phase === 'result' && result && html`
        <div class="lung-result">
          <div class="lung-score big">${result.score}<small>/100</small></div>
          <div class="lung-word">${scoreWord(result.score)}</div>
          <div class="stats3">
            <div><b>${result.dur.toFixed(1)}s</b><span>long</span></div>
            <div><b>${strengthWord(result.strength)}</b><span>strength</span></div>
            <div><b>${Math.round(result.steady * 100)}%</b><span>steady</span></div>
          </div>
          ${prev && html`<p class="center">${result.score > prev.score ? `▲ ${result.score - prev.score} on last time. Your lungs are thanking you.` : result.score === prev.score ? 'Same as last time. Consistency counts.' : `${prev.score - result.score} below last time. Normal day to day; the trend is what matters.`}</p>`}
          ${first && first !== prev && result.score > first.score && html`<p class="center muted">${result.score - first.score} points up since your first test.</p>`}
          <button class="btn btn-primary block big" onClick=${save}>Save</button>
          <button class="btn btn-plain block" onClick=${() => { setResult(null); setSecs(0); setPhase('intro'); }}>Try again instead</button>
        </div>`}
    </div>`;
}
