// "Flow": a 2-minute tile puzzle for Craving SOS. Tap tiles to rotate them until light flows from the
// left edge to the right. Absorbing visual puzzles keep the part of your mind busy that cravings use.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, useNow } from './ui.js';

const GAME_SECS = 120;
// Directions: 0 up, 1 right, 2 down, 3 left. Tile shapes at rotation 0.
const SHAPES = { straight: [0, 2], corner: [0, 1], tee: [0, 1, 2] };
const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
const dirsOf = (t) => SHAPES[t.shape].map((d) => (d + t.rot) % 4);

// Builds a puzzle with a guaranteed route from the left edge to the right edge, then scrambles it
function makePuzzle(n) {
  const r0 = Math.floor(Math.random() * n);
  // random walk that never revisits a cell and always makes progress to the right edge
  let path;
  for (let tries = 0; tries < 200 && !path; tries++) {
    const seen = new Set([`0,${r0}`]);
    const p = [[0, r0]];
    let [x, y] = [0, r0];
    while (x < n - 1) {
      const moves = [[1, 0], [1, 0], [0, -1], [0, 1]].filter(([dx, dy]) => {
        const nx = x + dx, ny = y + dy;
        return nx >= 0 && nx < n && ny >= 0 && ny < n && !seen.has(`${nx},${ny}`);
      });
      if (!moves.length) break;
      const [dx, dy] = moves[Math.floor(Math.random() * moves.length)];
      x += dx; y += dy; seen.add(`${x},${y}`); p.push([x, y]);
      if (p.length > n * n) break;
    }
    if (x === n - 1) path = p;
  }
  const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => {
    const shape = ['straight', 'corner', 'corner', 'tee'][Math.floor(Math.random() * 4)];
    return { shape, rot: 0 };
  }));
  // shape each path cell to join its neighbours
  const dirTo = ([ax, ay], [bx, by]) => (bx > ax ? 1 : bx < ax ? 3 : by > ay ? 2 : 0);
  path.forEach((c, i) => {
    const a = i === 0 ? 3 : dirTo(c, path[i - 1]);
    const b = i === path.length - 1 ? 1 : dirTo(c, path[i + 1]);
    const need = [a, b].sort();
    if ((need[0] + 2) % 4 === need[1]) grid[c[1]][c[0]] = { shape: 'straight', rot: need[0] % 2 };
    else {
      const rot = [0, 1, 2, 3].find((r) => { const d = [r, (r + 1) % 4].sort(); return d[0] === need[0] && d[1] === need[1]; });
      grid[c[1]][c[0]] = { shape: 'corner', rot };
    }
  });
  // scramble every tile
  grid.forEach((row) => row.forEach((t) => { t.rot = (t.rot + 1 + Math.floor(Math.random() * 3)) % 4; t.turns = t.rot; }));
  const start = { r0 };
  if (flow(grid, n, start).done) { const c = path[Math.floor(path.length / 2)]; grid[c[1]][c[0]].rot = (grid[c[1]][c[0]].rot + 1) % 4; grid[c[1]][c[0]].turns++; }
  return { grid, n, start };
}

// Which tiles the light reaches from the left edge, and whether it gets out on the right
function flow(grid, n, { r0 }) {
  const lit = new Set();
  let done = false;
  if (!dirsOf(grid[r0][0]).includes(3)) return { lit, done };
  const q = [[0, r0]];
  lit.add(`0,${r0}`);
  while (q.length) {
    const [x, y] = q.shift();
    for (const d of dirsOf(grid[y][x])) {
      if (x === n - 1 && d === 1) done = true;
      const nx = x + DX[d], ny = y + DY[d];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || lit.has(`${nx},${ny}`)) continue;
      if (dirsOf(grid[ny][nx]).includes((d + 2) % 4)) { lit.add(`${nx},${ny}`); q.push([nx, ny]); }
    }
  }
  return { lit, done };
}

function Tile({ t, lit, onTap }) {
  // draw at rotation 0 and turn the whole tile, so taps animate smoothly
  const arm = (d) => {
    const end = [[50, 4], [96, 50], [50, 96], [4, 50]][d];
    return html`<line x1="50" y1="50" x2=${end[0]} y2=${end[1]} />`;
  };
  return html`<button class="fl-tile ${lit ? 'lit' : ''}" aria-label="Rotate tile" onClick=${onTap}>
    <svg viewBox="0 0 100 100" style=${`transform:rotate(${t.turns * 90}deg)`}>${SHAPES[t.shape].map(arm)}<circle cx="50" cy="50" r="9" /></svg>
  </button>`;
}

export function FlowGame({ onExit }) {
  const [t0] = useState(Date.now());
  const now = useNow(250);
  const [level, setLevel] = useState(0);
  const [solved, setSolved] = useState(0);
  const [pz, setPz] = useState(() => makePuzzle(4));
  const [win, setWin] = useState(false);
  const left = Math.max(0, GAME_SECS - Math.floor((now - t0) / 1000));
  const { lit, done } = flow(pz.grid, pz.n, pz.start);
  const busy = useRef(false);

  useEffect(() => {
    if (!done || busy.current) return;
    busy.current = true;
    haptic([15, 40, 15]);
    setWin(true);
    setSolved((n) => n + 1);
    setTimeout(() => {
      const next = level + 1;
      setLevel(next);
      setPz(makePuzzle(next < 2 ? 4 : next < 5 ? 5 : 6));
      setWin(false);
      busy.current = false;
    }, 700);
  }, [done]);

  const tap = (x, y) => {
    if (left === 0 || win) return;
    haptic(5);
    const g = pz.grid.map((row) => row.map((t) => ({ ...t })));
    const t = g[y][x];
    t.rot = (t.rot + 1) % 4; t.turns += 1;
    setPz({ ...pz, grid: g });
  };

  return html`<div class="flow">
    <div class="fl-top"><span>🧩 Connect the flow</span><b>${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}</b><span>${solved} solved</span></div>
    ${left > 0 ? html`
      <div class="fl-board ${win ? 'win' : ''}" style=${`--n:${pz.n}`}>
        <i class="fl-in" style=${`top:${((pz.start.r0 + 0.5) / pz.n) * 100}%`}></i>
        ${pz.grid.map((row, y) => row.map((t, x) => html`<${Tile} key=${`${level}-${x}-${y}`} t=${t} lit=${lit.has(`${x},${y}`)} onTap=${() => tap(x, y)} />`))}
      </div>
      <p class="fl-help">Tap tiles to turn them. Get the light from the left side out the right side.</p>`
    : html`<div class="fl-done"><div class="wiz-emoji">🎉</div><b>Time’s up. You solved ${solved}.</b><p class="muted">Two minutes your mind wasn’t on the craving. How is it now?</p></div>`}
    <button class="link center-link" onClick=${onExit}>Back to breathing</button>
  </div>`;
}
