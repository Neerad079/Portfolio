import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Section-specific color palettes calibrated to match Neerad's portfolio aesthetic
export const SECTION_PALETTES = {
  hero: {
    id: 'hero',
    name: 'Obsidian Ember',
    bg: '#070709',
    glow: 'rgba(249, 69, 45, 0.12)',
    glowPosition: '50% 18%',
    secondaryGlow: 'rgba(255, 91, 69, 0.05)',
    secondaryPosition: '85% 35%',
  },
  about: {
    id: 'about',
    name: 'Midnight Slate',
    bg: '#090810',
    glow: 'rgba(99, 102, 241, 0.11)',
    glowPosition: '25% 35%',
    secondaryGlow: 'rgba(129, 140, 248, 0.05)',
    secondaryPosition: '75% 55%',
  },
  architecture: {
    id: 'architecture',
    name: 'Tech Sapphire',
    bg: '#050c18',
    glow: 'rgba(56, 189, 248, 0.13)',
    glowPosition: '70% 30%',
    secondaryGlow: 'rgba(14, 165, 233, 0.06)',
    secondaryPosition: '20% 65%',
  },
  projects: {
    id: 'projects',
    name: 'Carbon Emerald',
    bg: '#06110a',
    glow: 'rgba(199, 255, 151, 0.11)',
    glowPosition: '35% 45%',
    secondaryGlow: 'rgba(132, 204, 22, 0.06)',
    secondaryPosition: '80% 60%',
  },
  skills: {
    id: 'skills',
    name: 'Cyber Violet',
    bg: '#0c0618',
    glow: 'rgba(168, 85, 247, 0.12)',
    glowPosition: '65% 50%',
    secondaryGlow: 'rgba(217, 70, 239, 0.05)',
    secondaryPosition: '25% 40%',
  },
  education: {
    id: 'education',
    name: 'Warm Bronze',
    bg: '#100b05',
    glow: 'rgba(245, 158, 11, 0.11)',
    glowPosition: '40% 60%',
    secondaryGlow: 'rgba(251, 191, 36, 0.05)',
    secondaryPosition: '75% 45%',
  },
  contact: {
    id: 'contact',
    name: 'Crimson Obsidian',
    bg: '#0f0505',
    glow: 'rgba(249, 69, 45, 0.18)',
    glowPosition: '50% 70%',
    secondaryGlow: 'rgba(239, 68, 68, 0.08)',
    secondaryPosition: '30% 30%',
  },
};

const SECTION_IDS = ['hero', 'about', 'architecture', 'projects', 'skills', 'education', 'contact'];

export default function DynamicScrollBackground() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;

    const evaluateActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.42;

      let current = 'hero';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMid >= top && viewportMid < top + height) {
            current = id;
            break;
          }
        }
      }

      // If scrolled near page bottom, ensure contact is highlighted
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100) {
        current = 'contact';
      }

      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateActiveSection);
        ticking = true;
      }
    };

    // Run on mount
    evaluateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', evaluateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', evaluateActiveSection);
    };
  }, []);

  const palette = SECTION_PALETTES[activeSection] || SECTION_PALETTES.hero;

  return (
    <div
      className="dynamic-scroll-bg-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Primary Smooth Background Color Layer */}
      <motion.div
        className="dynamic-scroll-bg-color"
        animate={{
          backgroundColor: palette.bg,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1], // Buttery smooth Framer spring/ease curve
        }}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Dynamic Ambient Radial Light Orb (Primary) */}
      <motion.div
        className="dynamic-scroll-bg-glow"
        animate={{
          background: `radial-gradient(circle 750px at ${palette.glowPosition}, ${palette.glow} 0%, rgba(0, 0, 0, 0) 70%)`,
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'background',
        }}
      />

      {/* Secondary Ambient Accent Light Orb (Counterbalance) */}
      <motion.div
        className="dynamic-scroll-bg-secondary-glow"
        animate={{
          background: `radial-gradient(circle 550px at ${palette.secondaryPosition}, ${palette.secondaryGlow} 0%, rgba(0, 0, 0, 0) 65%)`,
        }}
        transition={{
          duration: 1.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'background',
        }}
      />

      {/* Subtle Cinematic Vignette */}
      <div
        className="dynamic-scroll-bg-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Tactile Micro-Grain Overlay for Premium Agency Texture */}
      <div
        className="dynamic-scroll-bg-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.022,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
