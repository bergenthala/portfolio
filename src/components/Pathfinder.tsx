import React, { useEffect, useMemo, useRef, useState } from 'react';

type Cell = { r: number; c: number };
type Mode = 'wall' | 'start' | 'end';
type Algo = 'bfs' | 'astar';

const ROWS = 16;
const COLS = 28;

const keyOf = (c: Cell) => `${c.r},${c.c}`;
const same = (a: Cell, b: Cell) => a.r === b.r && a.c === b.c;

function neighbors(cell: Cell) {
  return [
    { r: cell.r - 1, c: cell.c },
    { r: cell.r + 1, c: cell.c },
    { r: cell.r, c: cell.c - 1 },
    { r: cell.r, c: cell.c + 1 },
  ].filter((n) => n.r >= 0 && n.r < ROWS && n.c >= 0 && n.c < COLS);
}

function heuristic(a: Cell, b: Cell) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

export default function Pathfinder() {
  const [walls, setWalls] = useState<Set<string>>(() => new Set());
  const [start, setStart] = useState<Cell>({ r: 8, c: 3 });
  const [end, setEnd] = useState<Cell>({ r: 8, c: 24 });
  const [mode, setMode] = useState<Mode>('wall');
  const [algo, setAlgo] = useState<Algo>('astar');
  const [visited, setVisited] = useState<string[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const dragRef = useRef(false);

  const visitedSlice = useMemo(() => new Set(visited.slice(0, step)), [visited, step]);
  const pathReady = step >= visited.length;
  const pathSet = useMemo(
    () => (pathReady ? new Set(path) : new Set<string>()),
    [pathReady, path]
  );

  useEffect(() => {
    if (!running) return;
    if (step >= visited.length) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), 12);
    return () => window.clearTimeout(id);
  }, [running, step, visited.length]);

  const toggleWall = (cell: Cell) => {
    if (same(cell, start) || same(cell, end)) return;
    const k = keyOf(cell);
    setWalls((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const handleCell = (cell: Cell) => {
    if (mode === 'start') {
      if (!same(cell, end) && !walls.has(keyOf(cell))) setStart(cell);
      return;
    }
    if (mode === 'end') {
      if (!same(cell, start) && !walls.has(keyOf(cell))) setEnd(cell);
      return;
    }
    toggleWall(cell);
  };

  const runSearch = () => {
    const wallSet = walls;
    const visitedOrder: string[] = [];
    const cameFrom = new Map<string, string>();
    const blocked = (c: Cell) => wallSet.has(keyOf(c));

    if (algo === 'bfs') {
      const queue: Cell[] = [start];
      const seen = new Set<string>([keyOf(start)]);
      while (queue.length) {
        const cur = queue.shift()!;
        const ck = keyOf(cur);
        if (!same(cur, start)) visitedOrder.push(ck);
        if (same(cur, end)) break;
        for (const n of neighbors(cur)) {
          const nk = keyOf(n);
          if (seen.has(nk) || blocked(n)) continue;
          seen.add(nk);
          cameFrom.set(nk, ck);
          queue.push(n);
        }
      }
    } else {
      const open: Cell[] = [start];
      const gScore = new Map<string, number>([[keyOf(start), 0]]);
      const fScore = new Map<string, number>([[keyOf(start), heuristic(start, end)]]);
      const closed = new Set<string>();

      while (open.length) {
        open.sort((a, b) => (fScore.get(keyOf(a)) ?? Infinity) - (fScore.get(keyOf(b)) ?? Infinity));
        const cur = open.shift()!;
        const ck = keyOf(cur);
        if (closed.has(ck)) continue;
        closed.add(ck);
        if (!same(cur, start)) visitedOrder.push(ck);
        if (same(cur, end)) break;

        for (const n of neighbors(cur)) {
          const nk = keyOf(n);
          if (blocked(n) || closed.has(nk)) continue;
          const tentative = (gScore.get(ck) ?? Infinity) + 1;
          if (tentative < (gScore.get(nk) ?? Infinity)) {
            cameFrom.set(nk, ck);
            gScore.set(nk, tentative);
            fScore.set(nk, tentative + heuristic(n, end));
            open.push(n);
          }
        }
      }
    }

    const rebuilt: string[] = [];
    let cursor = keyOf(end);
    if (cameFrom.has(cursor) || cursor === keyOf(start)) {
      while (cursor !== keyOf(start)) {
        rebuilt.push(cursor);
        const prev = cameFrom.get(cursor);
        if (!prev) {
          rebuilt.length = 0;
          break;
        }
        cursor = prev;
      }
      rebuilt.reverse();
    }

    setVisited(visitedOrder);
    setPath(rebuilt);
    setStep(0);
    setRunning(true);
  };

  const clearBoard = () => {
    setWalls(new Set());
    setVisited([]);
    setPath([]);
    setStep(0);
    setRunning(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-ink">Pathfinding Lab</h3>
        <p className="text-sm text-muted mt-1">
          Paint walls, set start/end, then watch BFS flood the grid or A* chase the Manhattan heuristic.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {([
          ['wall', 'Draw walls'],
          ['start', 'Set start'],
          ['end', 'Set end'],
        ] as [Mode, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              mode === id
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setAlgo(algo === 'bfs' ? 'astar' : 'bfs')}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-900 text-sky-300 font-mono border border-slate-700 dark:bg-slate-950"
        >
          algo: {algo === 'bfs' ? 'BFS' : 'A*'}
        </button>
      </div>

      <div
        className="grid gap-[2px] bg-slate-800 p-2 rounded-xl select-none"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        onMouseLeave={() => {
          dragRef.current = false;
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          const cell = { r, c };
          const k = keyOf(cell);
          const isStart = same(cell, start);
          const isEnd = same(cell, end);
          const isWall = walls.has(k);
          const isPath = pathSet.has(k);
          const isVisited = visitedSlice.has(k);

          let bg = '#0f172a';
          if (isWall) bg = '#334155';
          if (isVisited) bg = '#0e7490';
          if (isPath) bg = '#fbbf24';
          if (isStart) bg = '#22c55e';
          if (isEnd) bg = '#f43f5e';

          return (
            <div
              key={k}
              className="aspect-square rounded-[2px] cursor-pointer"
              style={{ backgroundColor: bg }}
              onMouseDown={() => {
                dragRef.current = true;
                handleCell(cell);
              }}
              onMouseEnter={() => {
                if (dragRef.current && mode === 'wall') toggleWall(cell);
              }}
              onMouseUp={() => {
                dragRef.current = false;
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={runSearch}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-600 dark:disabled:bg-slate-700 dark:disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          {running ? 'Searching…' : 'Run search'}
        </button>
        <button
          onClick={clearBoard}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 border border-slate-300 font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600"
        >
          Clear walls
        </button>
        <div className="text-xs text-muted flex items-center gap-3 ml-auto font-mono">
          <span>visited {Math.min(step, visited.length)}/{visited.length}</span>
          <span>path {pathReady ? path.length : 0}</span>
        </div>
      </div>
    </div>
  );
}
