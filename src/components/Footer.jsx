import React from 'react';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="navbar__logo">
              NEERAD<span className="navbar__logo-dot" />
            </span>
            <span className="tag tag--sm" style={{ marginLeft: '0.5rem' }}>
              B.Tech CSE '28
            </span>
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Neerad S Ramesh. All rights reserved. Built with React 19 & Vite.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer Navigation">
          <a href="#about" className="footer__link">About</a>
          <a href="#architecture" className="footer__link">Architecture</a>
          <a href="#projects" className="footer__link">Projects</a>
          <a href="#skills" className="footer__link">Skills</a>
          <a href="#education" className="footer__link">Academics</a>
          <a href="#contact" className="footer__link">Contact</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
            aria-label="GitHub"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="btn btn--outline btn--sm"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Neerad_S_Ramesh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
            aria-label="Resume"
          >
            <FileText size={15} />
          </a>
          <button
            onClick={scrollToTop}
            className="btn btn--outline btn--sm"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
