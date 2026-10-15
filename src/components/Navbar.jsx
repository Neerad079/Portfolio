import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

import GlassSurface from './ui/GlassSurface';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'architecture', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container">
          <GlassSurface
            width="100%"
            height={60}
            borderRadius={16}
            borderWidth={0.08}
            brightness={36}
            opacity={0.88}
            blur={14}
            displace={0.5}
            backgroundOpacity={0.12}
            saturation={1.25}
            distortionScale={-160}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className="navbar__glass"
          >
            <div className="navbar__inner">
              <a href="#hero" className="navbar__brand" aria-label="Neerad S Ramesh - Home">
                <span className="navbar__logo">
                  NEERAD<span className="navbar__logo-dot" />
                </span>
              </a>

              <nav className="navbar__nav" aria-label="Main Navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="navbar__actions">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                  id="nav-resume-btn"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  className="navbar__mobile-toggle"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </GlassSurface>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}
        id="mobile-navigation"
        role="dialog"
        aria-label="Mobile Navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`mobile-drawer__link ${activeSection === link.id ? 'mobile-drawer__link--active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a
          href={PERSONAL_INFO.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
          style={{ marginTop: '0.75rem', width: '100%' }}
          onClick={() => setMobileOpen(false)}
        >
          <FileText size={16} />
          <span>View Resume</span>
        </a>
      </div>
    </>
  );
}
