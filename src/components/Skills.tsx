import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <section id="skills" className="section-shell py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep mb-3 text-center">
            Toolkit
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-ink">
            {t.skills.title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-ink">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <motion.span
                      key={item}
                      className="tag-chip"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
