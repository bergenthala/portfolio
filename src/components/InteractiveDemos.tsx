import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortingVisualizer from './SortingVisualizer';
import Pathfinder from './Pathfinder';
import RegexLab from './RegexLab';
import SentimentAnalyzer from './SentimentAnalyzer';
import BinarySearch from './BinarySearch';
import DiffLab from './DiffLab';
import LruCache from './LruCache';

const demos = [
  {
    id: 'sort',
    name: 'Sorting',
    tag: 'Algorithms',
    blurb: 'Watch comparisons, pivots, and settled ranges animate in real time.',
    component: SortingVisualizer,
  },
  {
    id: 'path',
    name: 'Pathfinding',
    tag: 'Graphs',
    blurb: 'BFS flood fill vs A* with Manhattan distance on a paintable grid.',
    component: Pathfinder,
  },
  {
    id: 'binary',
    name: 'Binary Search',
    tag: 'Algorithms',
    blurb: 'O(log n) probes that shrink the window until the target is found.',
    component: BinarySearch,
  },
  {
    id: 'diff',
    name: 'Diff Lab',
    tag: 'Strings',
    blurb: 'LCS alignment and Levenshtein distance for before/after text.',
    component: DiffLab,
  },
  {
    id: 'lru',
    name: 'LRU Cache',
    tag: 'Systems',
    blurb: 'Get/put with least-recently-used eviction — left LRU, right MRU.',
    component: LruCache,
  },
  {
    id: 'regex',
    name: 'Regex Lab',
    tag: 'Parsing',
    blurb: 'Live capture-group highlighting for the patterns that power search and compilers.',
    component: RegexLab,
  },
  {
    id: 'sentiment',
    name: 'Sentiment',
    tag: 'NLP',
    blurb: 'Lexical scoring with negation + intensifiers — a lightweight NLP pipeline in the browser.',
    component: SentimentAnalyzer,
  },
] as const;

export default function InteractiveDemos() {
  const [activeDemo, setActiveDemo] = useState<(typeof demos)[number]['id']>('sort');
  const active = demos.find((demo) => demo.id === activeDemo) ?? demos[0];
  const ActiveComponent = active.component;

  return (
    <section id="demos" className="section-shell py-24 bg-[var(--bg-alt)]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep mb-3">
            Live systems
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-ink accent-underline inline-block pb-2">
            Interactive demos
          </h2>
          <p className="text-muted mt-5 text-lg leading-relaxed">
            Not screenshots — runnable algorithms, parsers, caches, and NLP heuristics you can poke at.
            Built in React with explicit state machines and visual feedback.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {demos.map((demo) => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`w-full text-left p-4 rounded-xl transition-colors border ${
                  activeDemo === demo.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-sky-900/10 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400'
                    : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200 hover:border-sky-400 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-700'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
                  activeDemo === demo.id
                    ? 'text-sky-300 dark:text-slate-800'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {demo.tag}
                </div>
                <div className="font-semibold">{demo.name}</div>
                <div className={`text-xs mt-1 leading-snug ${
                  activeDemo === demo.id
                    ? 'text-sky-200 dark:text-slate-700'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {demo.blurb}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="glass-panel rounded-2xl p-6 md:p-8 min-h-[560px]"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {[
            'React state machines',
            'Graph search',
            'Binary search',
            'LCS / Levenshtein',
            'LRU eviction',
            'Regex engines',
            'NLP heuristics',
          ].map((tech) => (
            <span key={tech} className="demo-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
