import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Algo = 'bubble' | 'insertion' | 'quick';

type Frame = {
  arr: number[];
  compare: number[];
  pivot?: number;
  sorted: number[];
};

const ALGORITHMS: Record<Algo, { label: string; blurb: string }> = {
  bubble: {
    label: 'Bubble Sort',
    blurb: 'Adjacent swaps bubble larger values right. O(n²) comparisons — simple, visible, educational.',
  },
  insertion: {
    label: 'Insertion Sort',
    blurb: 'Builds a sorted prefix by inserting each next value into place. Fast on nearly-sorted data.',
  },
  quick: {
    label: 'Quick Sort',
    blurb: 'Partition around a pivot, then recurse. Average O(n log n) with clear divide-and-conquer structure.',
  },
};

function randomArray(size = 28) {
  return Array.from({ length: size }, () => 12 + Math.floor(Math.random() * 88));
}

function buildFrames(algo: Algo, input: number[]): Frame[] {
  const arr = [...input];
  const frames: Frame[] = [{ arr: [...arr], compare: [], sorted: [] }];
  const n = arr.length;

  const push = (compare: number[], sorted: number[] = [], pivot?: number) => {
    frames.push({ arr: [...arr], compare, sorted: [...sorted], pivot });
  };

  if (algo === 'bubble') {
    const sorted: number[] = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        push([j, j + 1], sorted);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          push([j, j + 1], sorted);
        }
      }
      sorted.push(n - 1 - i);
      push([], sorted);
    }
    sorted.push(0);
    push([], sorted);
  }

  if (algo === 'insertion') {
    const sorted = [0];
    push([], sorted);
    for (let i = 1; i < n; i++) {
      let j = i;
      push([j, j - 1], sorted);
      while (j > 0 && arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        push([j - 1, j], sorted);
        j--;
      }
      sorted.push(i);
      push([], [...Array(i + 1).keys()]);
    }
  }

  if (algo === 'quick') {
    const sortedSet = new Set<number>();
    const partition = (lo: number, hi: number) => {
      const pivot = arr[hi];
      let i = lo;
      push([hi], [...sortedSet], hi);
      for (let j = lo; j < hi; j++) {
        push([j, hi], [...sortedSet], hi);
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          push([i, j], [...sortedSet], hi);
          i++;
        }
      }
      [arr[i], arr[hi]] = [arr[hi], arr[i]];
      push([i, hi], [...sortedSet], i);
      return i;
    };

    const quick = (lo: number, hi: number) => {
      if (lo >= hi) {
        if (lo === hi) {
          sortedSet.add(lo);
          push([], [...sortedSet]);
        }
        return;
      }
      const p = partition(lo, hi);
      sortedSet.add(p);
      push([], [...sortedSet], p);
      quick(lo, p - 1);
      quick(p + 1, hi);
    };

    quick(0, n - 1);
    push([], [...Array(n).keys()]);
  }

  return frames;
}

export default function SortingVisualizer() {
  const [algo, setAlgo] = useState<Algo>('quick');
  const [base, setBase] = useState(() => randomArray());
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(45);
  const timerRef = useRef<number | null>(null);

  const frames = useMemo(() => buildFrames(algo, base), [algo, base]);
  const frame = frames[Math.min(frameIdx, frames.length - 1)];
  const max = Math.max(...base);

  useEffect(() => {
    setFrameIdx(0);
    setPlaying(false);
  }, [algo, base]);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setFrameIdx((i) => {
        if (i >= frames.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, Math.max(8, 110 - speed));
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, frames.length, speed]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-ink">Sorting Visualizer</h3>
          <p className="text-sm text-muted mt-1 max-w-xl">{ALGORITHMS[algo].blurb}</p>
        </div>
        <div className="font-mono text-xs tag-chip">
          frame {frameIdx + 1}/{frames.length}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(ALGORITHMS) as Algo[]).map((key) => (
          <button
            key={key}
            onClick={() => setAlgo(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              algo === key
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600'
            }`}
          >
            {ALGORITHMS[key].label}
          </button>
        ))}
      </div>

      <div className="h-56 flex items-end gap-1 bg-slate-950/95 rounded-xl p-4 mb-4 overflow-hidden">
        {frame.arr.map((value, i) => {
          const isCompare = frame.compare.includes(i);
          const isSorted = frame.sorted.includes(i);
          const isPivot = frame.pivot === i;
          let color = '#38bdf8';
          if (isSorted) color = '#34d399';
          if (isCompare) color = '#fbbf24';
          if (isPivot) color = '#f472b6';
          return (
            <motion.div
              key={`${i}-${value}`}
              layout
              className="flex-1 rounded-t-sm min-w-0"
              style={{
                height: `${(value / max) * 100}%`,
                backgroundColor: color,
                boxShadow: isCompare || isPivot ? `0 0 12px ${color}` : undefined,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setFrameIdx(0);
          }}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 border border-slate-300 font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600"
        >
          Reset
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setBase(randomArray());
          }}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 border border-slate-300 font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600"
        >
          Shuffle
        </button>
        <label className="flex items-center gap-2 text-sm text-muted ml-auto">
          Speed
          <input
            type="range"
            min={10}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> comparing</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-pink-400" /> pivot</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> settled</span>
      </div>
    </div>
  );
}
