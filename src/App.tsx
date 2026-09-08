import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Career from './components/Career';
import Projects from './components/Projects';
import Skills from './components/Skills';
import InteractiveDemos from './components/InteractiveDemos';
import FancyFeature from './components/FancyFeature';
import About from './components/About';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased transition-colors duration-300">
          <Navbar />
          <Hero />
          <Career />
          <Projects />
          <Skills />
          <FancyFeature />
          <InteractiveDemos />
          <About />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
