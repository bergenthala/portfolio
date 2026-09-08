import React, { useMemo, useState } from 'react';

type Cell = { type: 'equal' | 'insert' | 'delete'; value: string };

function diffChars(a: string, b: string): Cell[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const cells: Cell[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      cells.push({ type: 'equal', value: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      cells.push({ type: 'insert', value: b[j - 1] });
      j--;
    } else {
      cells.push({ type: 'delete', value: a[i - 1] });
      i--;
    }
  }
  return cells.reverse();
}

function levenshtein(a: string, b: string) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

const PRESETS = [
  { a: 'bergenthal', b: 'bergenthall' },
  { a: 'TypeScript', b: 'JavaScript' },
  { a: 'pathfinder', b: 'path finding' },
  { a: 'ShopU ranking', b: 'ShopU ranking algo' },
];

export default function DiffLab() {
  const [left, setLeft] = useState(PRESETS[0].a);
  const [right, setRight] = useState(PRESETS[0].b);

  const cells = useMemo(() => diffChars(left, right), [left, right]);
  const distance = useMemo(() => levenshtein(left, right), [left, right]);
  const lcs = cells.filter((c) => c.type === 'equal').length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-ink">Diff Lab</h3>
        <p className="text-sm text-muted mt-1">
          Character-level LCS diff plus Levenshtein distance — the same ideas behind code review and fuzzy search.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <label className="text-sm text-muted">
          Before
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={3}
            className="mt-1 w-full font-mono text-sm px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink"
          />
        </label>
        <label className="text-sm text-muted">
          After
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={3}
            className="mt-1 w-full font-mono text-sm px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((preset, i) => (
          <button
            key={i}
            onClick={() => {
              setLeft(preset.a);
              setRight(preset.b);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500"
          >
            Preset {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 mb-4 min-h-[88px]">
        <div className="text-xs uppercase tracking-wide text-muted mb-2">Aligned diff</div>
        <p className="font-mono text-sm leading-7 break-all">
          {cells.map((cell, i) => {
            const cls =
              cell.type === 'equal'
                ? 'text-ink'
                : cell.type === 'insert'
                  ? 'bg-emerald-200/80 text-emerald-950 dark:bg-emerald-500/30 dark:text-emerald-100 rounded-sm px-0.5'
                  : 'bg-rose-200/80 text-rose-950 dark:bg-rose-500/30 dark:text-rose-100 rounded-sm px-0.5 line-through';
            return (
              <span key={i} className={cls}>
                {cell.value === ' ' ? '·' : cell.value}
              </span>
            );
          })}
          {cells.length === 0 && <span className="text-muted">Type on both sides to diff.</span>}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 font-mono text-xs text-muted">
        <span className="tag-chip tag-chip-sm">LCS length {lcs}</span>
        <span className="tag-chip tag-chip-sm">Levenshtein {distance}</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> insert
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-400" /> delete
        </span>
      </div>
    </div>
  );
}
