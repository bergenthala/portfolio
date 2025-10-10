import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FancyFeature() {
  const [code, setCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const codeSnippet = `// AI-Powered Portfolio
const portfolio = {
  name: "Andrew Bergenthal",
  skills: ["React", "TypeScript", "AI/ML"],
  experience: ["Adobe", "Fidelity"],
  projects: ["OldBaileyProject", "Sprite Editor"],
  
  async buildPortfolio() {
    const innovation = await this.think();
    const code = await this.create();
    return { innovation, code };
  }
};`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < codeSnippet.length) {
        setCode(codeSnippet.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            Cool Coding Demo
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                Interactive Code Display
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                This is a live demonstration of my coding skills! Watch as I showcase 
                a JavaScript snippet that represents my portfolio in code form. 
                The typing animation is built with React and Framer Motion.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span>Real-time typing animation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span>React hooks & state management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span>Framer Motion animations</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400 text-sm">portfolio.js</span>
              </div>
              
              <pre className="text-green-400 font-mono text-sm leading-relaxed">
                <code>{code}</code>
                {isTyping && (
                  <motion.span
                    className="text-white"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                )}
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
