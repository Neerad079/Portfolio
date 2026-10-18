import React from 'react';
import { X, ExternalLink, CheckCircle, Server, Database, Shield, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', paddingRight: '2.5rem', flexWrap: 'wrap' }}>
          <span className="tag tag--accent">{project.badge}</span>
          <span className="mono-font" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {project.date}
          </span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2rem)', color: '#ffffff', marginBottom: '0.4rem', textTransform: 'uppercase', wordBreak: 'break-word' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '1.5rem', wordBreak: 'break-word' }}>
          {project.tagline}
        </p>

        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            System Overview
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            {project.overview}
          </p>
        </div>

        {/* Technical Architecture Breakdown */}
        {project.architecture && (
          <div style={{ marginBottom: '1.75rem', background: '#09090e', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={16} color="var(--accent-lime)" />
              <span>Architectural Specifications</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {Object.entries(project.architecture).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize', minWidth: '110px', fontFamily: 'var(--font-mono)' }}>
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span style={{ color: '#ffffff', wordBreak: 'break-word', flex: '1 1 180px' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Engineering Highlights */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Key Engineering Highlights
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {project.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={16} color="var(--accent-lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack Tags */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {project.stack.map((tech, idx) => (
              <span key={idx} className="tag tag--sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <ExternalLink size={16} />
              <span>Direct Access</span>
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={project.demo ? "btn btn--outline" : "btn btn--primary"}
          >
            <GithubIcon size={16} />
            <span>View Source on GitHub</span>
          </a>
          <button className="btn btn--outline" onClick={onClose}>
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}
