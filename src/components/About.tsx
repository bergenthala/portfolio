import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <section id="about" className="section-shell py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep mb-3 text-center">
            Profile
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-ink">
            {t.about.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%)',
                  }}
                />
                <div className="relative h-52 w-52 sm:h-56 sm:w-56 rounded-full overflow-hidden border-4 border-[var(--surface)] shadow-[0_20px_50px_rgba(15,23,42,0.25)] ring-1 ring-[var(--border)]">
                  <img
                    src={`${import.meta.env.BASE_URL}profile.png`}
                    alt="Andrew Bergenthal"
                    width={224}
                    height={224}
                    decoding="async"
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-ink">
                {t.about.heading}
              </h3>
              
              <p className="text-muted mb-6 leading-relaxed">
                {t.about.paragraph1}
              </p>
              
              <p className="text-muted mb-6 leading-relaxed">
                {t.about.paragraph2}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="info-card info-card-accent">
                  <h4 className="font-semibold info-card-label">{t.about.currentEducation}</h4>
                  <p className="text-ink">MSE Computer Science</p>
                  <p className="text-muted text-sm">University of Pennsylvania</p>
                </div>
                <div className="info-card info-card-mint">
                  <h4 className="font-semibold info-card-label">{t.about.previousDegree}</h4>
                  <p className="text-ink">BS Computer Science (Honors)</p>
                  <p className="text-muted text-sm">University of Utah - 3.81 GPA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
