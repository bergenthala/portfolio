import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Career from './components/Career';
import FancyFeature from './components/FancyFeature';
import InteractiveDemos from './components/InteractiveDemos';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Career />
        <InteractiveDemos />
        <FancyFeature />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
