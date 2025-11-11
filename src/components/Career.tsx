import React from 'react';
import { motion } from 'framer-motion';
import { career } from '../data/career';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function Career() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Map company names to translation keys
  const getCareerTranslation = (company: string) => {
    const translationMap: Record<string, keyof typeof t.career.items> = {
      'Adobe': 'adobe',
      'Fidelity Investments': 'fidelity',
      'Tongues Language Games': 'tongues'
    };
    return t.career.items[translationMap[company]];
  };
  
  return (
    <section id="career" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t.career.title}
          </h2>
          
          <div className="space-y-8">
            {career.map((job, index) => {
              const jobT = getCareerTranslation(job.company);
              return (
              <motion.div
                key={job.id}
                className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow ${
                  job.current ? 'ring-2 ring-blue-500' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {jobT?.position || job.position}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">
                      {job.company}
                    </p>
                    {job.location && (
                      <p className="text-gray-500 text-sm">
                        {job.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 font-medium">
                      {job.duration}
                    </p>
                    {job.current && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {t.career.current}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {jobT?.description || job.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{t.career.keyAchievements}</h4>
                  <ul className="space-y-2">
                    {(jobT?.achievements || job.achievements).map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{t.career.technologiesUsed}</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
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
