import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SentimentAnalyzer from './SentimentAnalyzer';
import TodoApp from './TodoApp';
import ColorPicker from './ColorPicker';
import DataVisualizer from './DataVisualizer';

export default function InteractiveDemos() {
  const [activeDemo, setActiveDemo] = useState('sentiment');

  const demos = [
    { id: 'sentiment', name: 'AI Sentiment Analyzer', component: SentimentAnalyzer, icon: '🤖' },
    { id: 'data', name: 'Data Visualizer', component: DataVisualizer, icon: '📊' },
    { id: 'todo', name: 'Todo App', component: TodoApp, icon: '📝' },
    { id: 'color', name: 'Color Picker', component: ColorPicker, icon: '🎨' }
  ];

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || SentimentAnalyzer;

  return (
    <section id="demos" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Interactive Demos
          </h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Demo Selector */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Choose a Demo</h3>
                <div className="space-y-2">
                  {demos.map((demo) => (
                    <motion.button
                      key={demo.id}
                      onClick={() => setActiveDemo(demo.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeDemo === demo.id
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl">{demo.icon}</span>
                      <span className="font-medium">{demo.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Display */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-md min-h-[500px] flex items-center justify-center"
              >
                <ActiveComponent />
              </motion.div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Interactive demos showcasing AI/ML concepts, data visualization, and modern web development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'TypeScript', 'Framer Motion', 'AI/ML', 'Data Visualization', 'Tailwind CSS'].map((tech) => (
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
      </div>
    </section>
  );
}
