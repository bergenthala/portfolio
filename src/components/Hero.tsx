import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, Language } from '../data/translations';

export default function Hero() {
  const { language } = useLanguage();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [clickEffects, setClickEffects] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [scrollY, setScrollY] = useState(0);
  const [rotatingGreeting, setRotatingGreeting] = useState<Language>('en');
  const currentIndexRef = useRef(0);
  
  const t = translations[language];
  
  // Rotate greeting between languages
  useEffect(() => {
    const languages: Language[] = ['en', 'ja', 'zh'];
    // Start from current language
    const startIndex = languages.indexOf(language);
    currentIndexRef.current = startIndex >= 0 ? startIndex : 0;
    setRotatingGreeting(languages[currentIndexRef.current]);
    
    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % languages.length;
      setRotatingGreeting(languages[currentIndexRef.current]);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [language]);
  
  const rotatingGreetings = {
    en: "Hi, I'm",
    ja: "こんにちは、私は",
    zh: "你好，我是"
  };

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click effects
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newEffect = {
      id: Date.now(),
      x,
      y
    };
    
    setClickEffects(prev => [...prev, newEffect]);
    
    // Remove effect after animation
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{
        transform: `translateY(${scrollY * 0.1}px)`
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Click Ripple Effects */}
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          className="absolute w-20 h-20 border-2 border-blue-400 rounded-full pointer-events-none"
          style={{
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['</>', '{ }', '()', '[]', '=>'].map((symbol, index) => (
          <motion.div
            key={symbol}
            className="absolute text-blue-200 text-2xl font-mono opacity-20"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingGreeting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block mr-2"
              >
                {rotatingGreetings[rotatingGreeting]}
              </motion.span>
            </AnimatePresence>
            <span className="text-blue-600">Andrew</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.hero.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.viewWork}
            </motion.button>
            <motion.a
              href="/Resume_2025.pdf"
              target="_blank"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.downloadResume}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
