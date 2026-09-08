import React from 'react';
import { motion } from 'framer-motion';
import { career } from '../data/career';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function Career() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Map job IDs to translation keys (two Adobe roles need distinct keys)
  const getCareerTranslation = (jobId: number) => {
    const translationMap: Record<number, keyof typeof t.career.items> = {
      1: 'adobeReturning',
      2: 'adobe',
      3: 'fidelity',
      4: 'tongues'
    };
    return t.career.items[translationMap[jobId]];
  };
  
  return (
    <section id="career" className="section-shell py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep mb-3 text-center">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-ink">
            {t.career.title}
          </h2>
          
          <div className="space-y-8">
            {career.map((job, index) => {
              const jobT = getCareerTranslation(job.id);
              return (
              <motion.div
                key={job.id}
                className={`glass-panel p-8 rounded-2xl hover:shadow-xl transition-shadow ${
                  job.current ? 'ring-2 ring-sky-400' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-ink mb-2">
                      {jobT?.position || job.position}
                    </h3>
                    <p className="text-xl text-sky-600 dark:text-sky-400 font-semibold">
                      {job.company}
                    </p>
                    {job.location && (
                      <p className="text-muted text-sm">
                        {job.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-muted font-medium">
                      {job.duration}
                    </p>
                    {job.current && (
                      <span className="bg-green-100 text-green-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                        {t.career.current}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted mb-6 leading-relaxed">
                  {jobT?.description || job.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-ink mb-3">{t.career.keyAchievements}</h4>
                  <ul className="space-y-2">
                    {(jobT?.achievements || job.achievements).map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-sky-500 mr-2">•</span>
                        <span className="text-muted">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-ink mb-3">{t.career.technologiesUsed}</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tag-chip"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
