import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-96 rounded-2xl overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Andrew Bergenthal" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Computer Science Graduate Student & Software Engineer
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hi, I'm Andrew, a Computer Science graduate student at the University of Pennsylvania, pursuing my MSE in Computer and Information Science. 
                I recently completed my BS in Computer Science (Honors) at the University of Utah with a 3.81 GPA and Dean's List recognition.
              </p>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                With experience at top companies like Adobe and Fidelity Investments, I've worked on everything from 
                AI-powered browser extensions with patent-pending features to high-performance pdf readers. 
                I'm passionate about AI, Machine Learning, FinTech, and Full-Stack Development.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Current Education</h4>
                  <p className="text-blue-700">MSE Computer Science</p>
                  <p className="text-blue-600 text-sm">University of Pennsylvania</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900">Previous Degree</h4>
                  <p className="text-green-700">BS Computer Science (Honors)</p>
                  <p className="text-green-600 text-sm">University of Utah - 3.81 GPA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
