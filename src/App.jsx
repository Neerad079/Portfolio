import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ArchitectureShowcase from './components/ArchitectureShowcase';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DynamicScrollBackground from './components/ui/DynamicScrollBackground';
import SmoothScroll from './components/ui/SmoothScroll';
import CodexReveal from './components/ui/CodexReveal';

export default function App() {
  return (
    <SmoothScroll>
      <div className="portfolio-app">
        {/* Buttery Smooth Framer Background Color Change */}
        <DynamicScrollBackground />

        {/* Interactive Framer Codex Reveal ASCII Water Wave Background */}
        <CodexReveal
          fontSize={13}
          density={1}
          damping={0.96}
          velocity={0.48}
          maxOpacity={0.38}
          enableScrollRipple={true}
        />
        
        <Navbar />
        <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <ArchitectureShowcase />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
