import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations, Language } from '../data/translations';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const navItems = [
    { name: t.nav.career, href: '#career' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.demos, href: '#demos' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full border-b border-[var(--border)] backdrop-blur-md"
      style={{ background: 'var(--nav-bg)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-xl font-bold text-ink"
            whileHover={{ scale: 1.05 }}
          >
            Andrew Bergenthal
          </motion.div>

          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-muted transition-colors hover:text-ink"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-lg text-ink transition-colors hover:border-sky-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center justify-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-2 transition-colors hover:opacity-90 md:px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center text-lg">
                  {languages.find((l) => l.code === language)?.flag}
                </span>
                <span className="hidden items-center text-sm font-medium text-ink sm:inline">
                  {languages.find((l) => l.code === language)?.name}
                </span>
                <span className="flex items-center text-xs text-muted">▼</span>
              </motion.button>

              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--bg-alt)] ${
                        language === lang.code ? 'bg-sky-500/10 text-sky-600 dark:text-sky-300' : 'text-ink'
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-sky-600 dark:text-sky-300">✓</span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.a
              href="#contact"
              className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm text-white transition-colors hover:bg-sky-500 md:px-6 md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">{t.nav.getInTouch}</span>
              <span className="sm:hidden">Contact</span>
            </motion.a>
          </div>
        </div>
      </div>

      {showLanguageMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)} />
      )}
    </motion.nav>
  );
}
