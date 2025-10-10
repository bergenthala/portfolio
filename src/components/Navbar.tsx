import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Career', href: '#career' },
    { name: 'Demos', href: '#demos' },
    { name: 'Contact', href: '#contact' }
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
          
          <div className="hidden md:flex space-x-8">
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
          
          <motion.a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
