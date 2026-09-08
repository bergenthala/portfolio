import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const snippet = `type Signal = { source: string; score: number };

async function rankAlerts(feeds: Signal[][]) {
  const merged = feeds.flat().sort((a, b) => b.score - a.score);
  return merged.filter((s, i, arr) =>
    arr.findIndex((x) => x.source === s.source) === i
  );
}

// Adobe internships: unify backends → proactive alerts
const feed = await rankAlerts([crm, telemetry, tickets]);`;

export default function FancyFeature() {
  const [code, setCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setCode('');
    setIsTyping(true);
    let index = 0;
    const timer = window.setInterval(() => {
      if (index < snippet.length) {
        setCode(snippet.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        window.clearInterval(timer);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[var(--code)] text-sky-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), transparent 35%), radial-gradient(circle at 80% 60%, rgba(14,165,233,0.18), transparent 40%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-400 mb-3">
              From internship → interface
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Code that ranks signal, not noise
            </h2>
            <p className="text-sky-100/75 text-lg leading-relaxed mb-8">
              The demos below are tiny systems — sorting, search, parsing, scoring —
              the same building blocks behind production feeds, agents, and tooling.
            </p>
            <div className="space-y-3 text-sm text-sky-100/90">
              {[
                'Deterministic algorithms you can step through',
                'UI state that mirrors real data pipelines',
                'Typed React with Framer Motion for feedback, not decoration',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="#demos"
              className="inline-flex mt-8 px-5 py-3 rounded-lg bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition-colors"
            >
              Open the labs →
            </a>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-sky-500/20 bg-slate-950/80 shadow-2xl shadow-sky-950/40 overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-xs text-sky-200/60">rankAlerts.ts</span>
            </div>
            <pre className="p-5 font-mono text-[12px] md:text-sm leading-relaxed text-emerald-300 overflow-x-auto min-h-[280px]">
              <code>{code}</code>
              {isTyping && (
                <motion.span
                  className="text-white"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  ▍
                </motion.span>
              )}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
