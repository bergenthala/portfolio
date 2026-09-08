import React, { useEffect, useMemo, useState } from 'react';

function sortedUnique(size = 24) {
  const set = new Set<number>();
  while (set.size < size) set.add(5 + Math.floor(Math.random() * 90));
  return [...set].sort((a, b) => a - b);
}

type Frame = {
  lo: number;
  hi: number;
  mid: number;
  found: boolean;
  done: boolean;
};

function buildFrames(arr: number[], target: number): Frame[] {
  const frames: Frame[] = [];
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    frames.push({ lo, hi, mid, found: arr[mid] === target, done: false });
    if (arr[mid] === target) {
      frames.push({ lo, hi, mid, found: true, done: true });
      return frames;
    }
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  frames.push({ lo, hi: Math.max(hi, lo - 1), mid: -1, found: false, done: true });
  return frames;
}

export default function BinarySearch() {
  const [arr, setArr] = useState(() => sortedUnique());
  const [target, setTarget] = useState(42);
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      setTarget(arr[Math.floor(arr.length / 2)]);
      setReady(true);
    }
  }, [arr, ready]);

  const frames = useMemo(() => buildFrames(arr, target), [arr, target]);
  const frame = frames[Math.min(frameIdx, frames.length - 1)];

  useEffect(() => {
    if (!ready) return;
    setFrameIdx(0);
    setPlaying(false);
  }, [arr, target, ready]);

  useEffect(() => {
    if (!playing) return;
    if (frameIdx >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setFrameIdx((i) => i + 1), 550);
    return () => window.clearTimeout(id);
  }, [playing, frameIdx, frames.length]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-ink">Binary Search</h3>
        <p className="text-sm text-muted mt-1">
          Halve the search space each step — classic O(log n) lookup on a sorted array.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <label className="text-sm text-muted">
          Target
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="ml-2 w-24 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink font-mono"
          />
        </label>
        <button
          onClick={() => {
            const next = sortedUnique();
            setArr(next);
            setTarget(next[Math.floor(Math.random() * next.length)]);
          }}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500"
        >
          New array
        </button>
        <button
          onClick={() => {
            setFrameIdx(0);
            setPlaying(true);
          }}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-sky-600 text-white hover:bg-sky-700"
        >
          {playing ? 'Searching…' : 'Run search'}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setFrameIdx(0);
          }}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {arr.map((value, i) => {
          const inRange = i >= frame.lo && i <= frame.hi;
          const isMid = i === frame.mid;
          let cls = 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          if (inRange && !frame.done) cls = 'bg-sky-100 text-sky-900 dark:bg-sky-900/50 dark:text-sky-100';
          if (isMid) cls = 'bg-amber-400 text-slate-900 ring-2 ring-amber-200';
          if (frame.found && isMid) cls = 'bg-emerald-400 text-slate-900 ring-2 ring-emerald-200';
          if (frame.done && !frame.found) cls = 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400';
          return (
            <div
              key={`${value}-${i}`}
              className={`w-10 h-10 rounded-md font-mono text-xs flex items-center justify-center transition-colors ${cls}`}
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="font-mono text-xs text-muted space-y-1">
        <div>
          step {Math.min(frameIdx + 1, frames.length)}/{frames.length}
          {frame.mid >= 0 && ` · mid=${arr[frame.mid]} @ index ${frame.mid}`}
          {` · window [${frame.lo}, ${frame.hi}]`}
        </div>
        <div className="text-ink">
          {frame.done
            ? frame.found
              ? `Found ${target} in ${frames.length - 1} probes.`
              : `${target} is not in the array.`
            : arr[frame.mid] < target
              ? `${arr[frame.mid]} < ${target} → search right half`
              : arr[frame.mid] > target
                ? `${arr[frame.mid]} > ${target} → search left half`
                : 'Match!'}
        </div>
      </div>
    </div>
  );
}
