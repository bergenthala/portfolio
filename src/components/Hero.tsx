import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations, Language } from '../data/translations';

export default function Hero() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [rotatingGreeting, setRotatingGreeting] = useState<Language>('en');
  const [mouse, setMouse] = useState({ x: 50, y: 40 });
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const currentIndexRef = useRef(0);
  const t = translations[language];

  useEffect(() => {
    const languages: Language[] = ['en', 'ja', 'zh'];
    const startIndex = languages.indexOf(language);
    currentIndexRef.current = startIndex >= 0 ? startIndex : 0;
    setRotatingGreeting(languages[currentIndexRef.current]);

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % languages.length;
      setRotatingGreeting(languages[currentIndexRef.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [language]);

  const rotatingGreetings = {
    en: "Hi, I'm",
    ja: 'こんにちは、私は',
    zh: '你好，我是',
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const effect = { id: Date.now() + Math.random(), x, y };
    setClickEffects((prev) => [...prev, effect]);
    window.setTimeout(() => {
      setClickEffects((prev) => prev.filter((item) => item.id !== effect.id));
    }, 1000);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 cursor-pointer"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onClick={handleClick}
    >
      {/* Full-bleed atmosphere */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[#070d16]' : 'bg-[#eaf3fa]'}`} />
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: isDark
            ? `
              radial-gradient(700px 420px at ${mouse.x}% ${mouse.y}%, rgba(56,189,248,0.2), transparent 55%),
              radial-gradient(900px 520px at 15% 10%, rgba(14,165,233,0.18), transparent 50%),
              radial-gradient(800px 480px at 88% 75%, rgba(8,47,73,0.55), transparent 55%),
              linear-gradient(165deg, #0b1220 0%, #0a1628 42%, #07111f 78%, #050a12 100%)
            `
            : `
              radial-gradient(700px 420px at ${mouse.x}% ${mouse.y}%, rgba(14,165,233,0.22), transparent 55%),
              radial-gradient(900px 520px at 15% 10%, rgba(56,189,248,0.28), transparent 50%),
              radial-gradient(800px 480px at 88% 75%, rgba(8,47,73,0.14), transparent 55%),
              linear-gradient(165deg, #f5faff 0%, #d9ebf8 42%, #b9d7ec 78%, #8ebdd9 100%)
            `,
        }}
      />

      {/* Perspective grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path
                d="M 56 0 L 0 0 0 56"
                fill="none"
                stroke={isDark ? 'rgba(125,211,252,0.16)' : 'rgba(8,47,73,0.18)'}
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="45%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="hero-grid-mask">
              <rect width="100%" height="100%" fill="url(#hero-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
        </svg>
      </div>

      {/* Soft drifting orbs */}
      <motion.div
        className={`absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-sky-500/20' : 'bg-sky-300/40'
        }`}
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -right-16 bottom-10 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-cyan-400/15' : 'bg-cyan-400/25'
        }`}
        animate={{ x: [0, -30, 0], y: [0, -35, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Click ripple effects — wrapper keeps centering; motion only scales the ring */}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: effect.x,
            top: effect.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            className={`h-16 w-16 rounded-full border-2 ${
              isDark ? 'border-sky-300' : 'border-sky-500'
            }`}
            initial={{ scale: 0.15, opacity: 0.85 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        </div>
      ))}

      {/* Floating code glyphs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { s: 'async', x: '8%', y: '28%', d: 0 },
          { s: '=>', x: '78%', y: '22%', d: 0.4 },
          { s: '{ }', x: '86%', y: '58%', d: 0.8 },
          { s: 'graph', x: '12%', y: '68%', d: 1.1 },
          { s: '</>', x: '70%', y: '78%', d: 1.5 },
        ].map((item) => (
          <motion.span
            key={item.s}
            className={`absolute font-mono text-sm md:text-base select-none ${
              isDark ? 'text-sky-200/20' : 'text-slate-700/25'
            }`}
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 7 + item.d, repeat: Infinity, ease: 'easeInOut', delay: item.d }}
          >
            {item.s}
          </motion.span>
        ))}
      </div>

      {/* Horizon wash */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent"
        style={{
          backgroundImage: `linear-gradient(to top, var(--hero-fade), transparent)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          className={`mb-6 font-mono text-[11px] uppercase tracking-[0.35em] ${
            isDark ? 'text-sky-200/70' : 'text-slate-600'
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Penn CIS · Software · AI systems
        </motion.p>

        <motion.h1
          className={`mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl ${
            isDark ? 'text-slate-50' : 'text-slate-900'
          }`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <span
            className={`block text-2xl font-medium md:text-3xl mb-3 md:mb-4 min-h-[1.2em] ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingGreeting}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="inline-block"
              >
                {rotatingGreetings[rotatingGreeting]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="relative inline-block">
            <span
              className={`bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-br from-white via-sky-200 to-cyan-400'
                  : 'bg-gradient-to-br from-slate-950 via-sky-800 to-cyan-600'
              }`}
            >
              Andrew
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
            />
          </span>
        </motion.h1>

        <motion.p
          className={`mx-auto mb-4 max-w-2xl text-lg md:text-xl ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          className={`mx-auto mb-10 max-w-xl text-base leading-relaxed md:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <motion.a
            href="#career"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(2,132,199,0.35)] transition-colors hover:bg-sky-500"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.viewWork}
          </motion.a>
          <motion.a
            href={`${import.meta.env.BASE_URL}Andrew_Bergenthal_Resume_2026.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 text-base font-semibold backdrop-blur-sm transition-colors ${
              isDark
                ? 'border-sky-300/70 bg-slate-900/50 text-sky-100 hover:bg-sky-300 hover:text-slate-950'
                : 'border-slate-800 bg-white/50 text-slate-900 hover:bg-slate-900 hover:text-white'
            }`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.downloadResume}
          </motion.a>
        </motion.div>

        <motion.a
          href="#career"
          onClick={(e) => e.stopPropagation()}
          className={`mt-14 inline-flex flex-col items-center gap-2 transition-colors ${
            isDark ? 'text-slate-500 hover:text-sky-300' : 'text-slate-500 hover:text-sky-700'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">scroll</span>
          <motion.span
            className="h-8 w-px bg-gradient-to-b from-sky-500 to-transparent"
            animate={{ scaleY: [1, 0.55, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>
      </div>
    </section>
  );
}
