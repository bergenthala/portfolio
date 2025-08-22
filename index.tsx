import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold">Andrew Bergenthal</h1>
        <p className="text-gray-600">BS/MS Computer Science | Software Engineer</p>
      </header>

      {/* About Me Section */}
      <motion.section 
        className="p-10 grid gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p>
          Hi, I'm Andrew, a Computer Science student at the University of Utah, expected to graduate in May 2026. I enjoy creating software solutions and working with AI and machine learning.
        </p>
      </motion.section>

      {/* Job Experience Section */}
      <motion.section 
        className="p-10 bg-gray-100 grid gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold">Experience</h2>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-bold">Software Engineer Intern - Adobe</h3>
          <p>Summer 2025</p>
          <p>Worked on an AI-assisted extension prototype with a full stack focus.</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-bold">Full Stack Software Engineer Intern - Fidelity Investments</h3>
          <p>Worked on backend and frontend solutions improving performance and reliability.</p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className="p-10 grid gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-bold">OldBaileyProject</h3>
          <p>Exploring historical datasets using natural language processing techniques.</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-bold">Sprite Editor</h3>
          <p>A web-based sprite editing tool with a focus on usability and performance.</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="p-6 bg-white shadow-inner text-center">
        <p>© {new Date().getFullYear()} Andrew Bergenthal. All rights reserved.</p>
      </footer>
    </div>
  );
}
