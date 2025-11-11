import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];
  const featuredProjects = projects.filter(project => project.featured);
  
  // Map project IDs to translation keys
  const getProjectTranslation = (projectId: number) => {
    const translationMap: Record<number, keyof typeof t.projects.items> = {
      1: 'shopu',
      2: 'oldbailey',
      3: 'aiExtension',
      4: 'fidelityPdf'
    };
    return t.projects.items[translationMap[projectId]];
  };
  
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t.projects.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => {
              const projectT = getProjectTranslation(project.id);
              return (
              <motion.div
                key={project.id}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Image Placeholder</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {projectT?.title || project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {projectT?.description || project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t.projects.github}
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t.projects.liveDemo}
                      </motion.a>
                    )}
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
