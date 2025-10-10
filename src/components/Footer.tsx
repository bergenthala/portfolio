import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/bergenthala', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/andrew-b-92810518a', icon: '💼' },
    { name: 'Email', url: 'mailto:bergenthalandrew@gmail.com', icon: '📧' },
    { name: 'Resume', url: '/Resume_2025.pdf', icon: '📄' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Let's Connect!</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in new opportunities, collaborations, and interesting projects. 
                Feel free to reach out if you'd like to work together or just have a chat about technology!
              </p>
              
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </motion.a>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-3">📧</span>
                  <a href="mailto:bergenthalandrew@gmail.com" className="hover:text-blue-300 transition-colors">
                    bergenthalandrew@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-3">📱</span>
                  <a href="tel:+13853472528" className="hover:text-blue-300 transition-colors">
                    +1 (385) 347-2528
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-3">📍</span>
                  <span>Salt Lake City, UT</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-3">🎓</span>
                  <span>University of Pennsylvania - MSE Computer Science</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 mr-3">📄</span>
                  <a href="/Resume_2025.pdf" target="_blank" className="hover:text-blue-300 transition-colors">
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Andrew Bergenthal. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Built with React, TypeScript, and Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
