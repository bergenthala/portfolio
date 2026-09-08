import React, { useMemo, useState } from 'react';

const SAMPLES = [
  { pattern: '\\b(React|TypeScript|Python)\\b', text: 'Shipping React + TypeScript APIs with Python jobs in the pipeline.' },
  { pattern: '([A-Z][a-z]+)\\s([A-Z][a-z]+)', text: 'Andrew Bergenthal built ShopU at Utah and now studies at Pennsylvania.' },
  { pattern: 'https?://[\\w.-]+(?:/[\\w./-]*)?', text: 'Docs live at https://example.com/docs and https://api.example.dev/v1.' },
  { pattern: '(\\d{3})-(\\d{3})-(\\d{4})', text: 'Reach me at 385-347-2528 — that is the best number to call.' },
];

type MatchInfo = {
  start: number;
  end: number;
  groups: string[];
};

export default function RegexLab() {
  const [pattern, setPattern] = useState(SAMPLES[0].pattern);
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState(SAMPLES[0].text);

  const { matches, error, highlighted } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : `${flags}g`);
      const found: MatchInfo[] = [];
      let m: RegExpExecArray | null;
      const safety = text.length + 5;
      let loops = 0;
      while ((m = re.exec(text)) !== null) {
        found.push({
          start: m.index,
          end: m.index + m[0].length,
          groups: m.slice(1),
        });
        if (m[0].length === 0) re.lastIndex++;
        if (++loops > safety) break;
      }

      const nodes: React.ReactNode[] = [];
      let cursor = 0;
      found.forEach((match, idx) => {
        if (match.start > cursor) {
          nodes.push(<span key={`t-${cursor}`}>{text.slice(cursor, match.start)}</span>);
        }
        nodes.push(
          <mark
            key={`m-${idx}`}
            className="bg-sky-300/80 text-slate-900 dark:bg-sky-400/40 dark:text-sky-50 rounded-sm px-0.5"
            title={match.groups.filter(Boolean).join(' · ') || 'match'}
          >
            {text.slice(match.start, match.end)}
          </mark>
        );
        cursor = match.end;
      });
      if (cursor < text.length) nodes.push(<span key="tail">{text.slice(cursor)}</span>);

      return { matches: found, error: null as string | null, highlighted: nodes };
    } catch (e) {
      return {
        matches: [] as MatchInfo[],
        error: e instanceof Error ? e.message : 'Invalid regular expression',
        highlighted: [<span key="raw">{text}</span>],
      };
    }
  }, [pattern, flags, text]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-ink">Regex Lab</h3>
        <p className="text-sm text-muted mt-1">
          Live match highlighting with capture groups — the same parsing muscle used in logs, compilers, and search.
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <label className="text-sm text-muted">
          Pattern
          <div className="mt-1 flex gap-2">
            <span className="font-mono text-accent-deep self-center">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 font-mono text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-ink focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <span className="font-mono text-accent-deep self-center">/</span>
            <input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 font-mono text-sm px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-ink focus:outline-none focus:ring-2 focus:ring-sky-400"
              title="Flags"
            />
          </div>
        </label>

        <label className="text-sm text-muted">
          Test string
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="mt-1 w-full font-mono text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-ink focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {SAMPLES.map((sample, i) => (
          <button
            key={i}
            onClick={() => {
              setPattern(sample.pattern);
              setText(sample.text);
              setFlags('g');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-600"
          >
            Sample {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 p-4 mb-4 min-h-[96px]">
        <div className="text-xs uppercase tracking-wide text-muted mb-2">Highlighted output</div>
        <p className="font-mono text-sm leading-relaxed text-ink whitespace-pre-wrap">{highlighted}</p>
      </div>

      {error ? (
        <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-muted font-mono">{matches.length} match{matches.length === 1 ? '' : 'es'}</div>
          {matches.slice(0, 6).map((m, i) => (
            <div key={i} className="text-xs font-mono bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2">
              <span className="text-accent-deep">#{i + 1}</span>{' '}
              <span className="text-ink">[{m.start}, {m.end})</span>
              {m.groups.filter(Boolean).length > 0 && (
                <span className="text-muted"> · groups: {m.groups.filter(Boolean).map((g) => JSON.stringify(g)).join(', ')}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
