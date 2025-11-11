import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, Language } from '../data/translations';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const navItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.career, href: '#career' },
    { name: t.nav.demos, href: '#demos' },
    { name: t.nav.contact, href: '#contact' }
  ];
  
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-xl font-bold text-gray-900"
            whileHover={{ scale: 1.05 }}
          >
            Andrew Bergenthal
          </motion.div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg flex items-center justify-center">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 flex items-center">
                  {languages.find(l => l.code === language)?.name}
                </span>
                <span className="text-gray-500 text-xs flex items-center">▼</span>
              </motion.button>
              
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <motion.a
              href="#contact"
              className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-blue-700 transition-colors inline-block text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">{t.nav.getInTouch}</span>
              <span className="sm:hidden">Contact</span>
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Close language menu when clicking outside */}
      {showLanguageMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLanguageMenu(false)}
        />
      )}
    </motion.nav>
  );
}
