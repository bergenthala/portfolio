import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Entry = { key: string; value: string };

const STARTER: Entry[] = [
  { key: 'user:42', value: '{ name: "Andrew" }' },
  { key: 'session', value: 'tok_9f3a' },
  { key: 'feed:crm', value: '[alerts…]' },
];

export default function LruCache() {
  const [capacity, setCapacity] = useState(4);
  const [entries, setEntries] = useState<Entry[]>(STARTER);
  const [keyInput, setKeyInput] = useState('feed:telemetry');
  const [valueInput, setValueInput] = useState('{ score: 0.91 }');
  const [log, setLog] = useState<string[]>(['Cache warm with 3 entries.']);
  const [flash, setFlash] = useState<string | null>(null);

  const pushLog = (line: string) => setLog((prev) => [line, ...prev].slice(0, 6));

  const get = (key: string) => {
    const idx = entries.findIndex((e) => e.key === key);
    if (idx === -1) {
      pushLog(`GET ${key} → miss`);
      setFlash(null);
      return;
    }
    const hit = entries[idx];
    const next = [...entries.slice(0, idx), ...entries.slice(idx + 1), hit];
    setEntries(next);
    setFlash(key);
    pushLog(`GET ${key} → hit (moved to MRU)`);
  };

  const put = (key: string, value: string) => {
    if (!key.trim()) return;
    const idx = entries.findIndex((e) => e.key === key);
    let next = [...entries];
    let note = '';
    if (idx >= 0) {
      next.splice(idx, 1);
      note = `PUT ${key} → update existing`;
    } else if (next.length >= capacity) {
      const evicted = next.shift();
      note = `PUT ${key} → insert, evicted LRU ${evicted?.key}`;
    } else {
      note = `PUT ${key} → insert`;
    }
    next.push({ key, value });
    setEntries(next);
    setFlash(key);
    pushLog(note);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-ink">LRU Cache</h3>
        <p className="text-sm text-muted mt-1">
          Least-recently-used eviction with O(1)-style get/put semantics — left is LRU, right is MRU.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3 mb-4">
        <label className="text-sm text-muted">
          Capacity
          <input
            type="number"
            min={1}
            max={8}
            value={capacity}
            onChange={(e) => setCapacity(Math.max(1, Math.min(8, Number(e.target.value) || 1)))}
            className="mt-1 block w-20 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink font-mono"
          />
        </label>
        <label className="text-sm text-muted flex-1 min-w-[140px]">
          Key
          <input
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="mt-1 block w-full px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink font-mono text-sm"
          />
        </label>
        <label className="text-sm text-muted flex-1 min-w-[140px]">
          Value
          <input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="mt-1 block w-full px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-ink font-mono text-sm"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => get(keyInput)}
          className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
        >
          Get
        </button>
        <button
          onClick={() => put(keyInput, valueInput)}
          className="px-4 py-2 rounded-lg bg-slate-900 text-sky-200 font-medium hover:bg-slate-800 dark:bg-slate-700"
        >
          Put
        </button>
        <button
          onClick={() => {
            setEntries(STARTER);
            setLog(['Cache reset.']);
            setFlash(null);
          }}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500"
        >
          Reset
        </button>
      </div>

      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
        <span>LRU</span>
        <span>MRU</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-5 min-h-[88px]">
        <AnimatePresence initial={false}>
          {entries.map((entry, index) => (
            <motion.button
              key={entry.key}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => get(entry.key)}
              className={`text-left rounded-xl border px-3 py-2 min-w-[120px] transition-colors ${
                flash === entry.key
                  ? 'border-amber-400 bg-amber-100/80 dark:bg-amber-500/20'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-sky-400'
              }`}
            >
              <div className="font-mono text-[10px] text-muted">#{index}</div>
              <div className="font-mono text-sm text-ink truncate">{entry.key}</div>
              <div className="font-mono text-[11px] text-muted truncate">{entry.value}</div>
            </motion.button>
          ))}
        </AnimatePresence>
        {entries.length === 0 && (
          <div className="text-sm text-muted">Cache empty — put a key to begin.</div>
        )}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
        <div className="text-xs uppercase tracking-wide text-muted mb-2">Event log</div>
        <ul className="space-y-1 font-mono text-xs text-ink">
          {log.map((line, i) => (
            <li key={`${line}-${i}`} className="text-muted">
              <span className="text-[var(--accent-deep)]">›</span> {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
