import React from 'react';
import { GraduationCap, Award, BookOpen, Star, CheckCircle } from 'lucide-react';
import { EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';

import ScrollFloat from './ui/ScrollFloat';

export default function Education() {
  const edu = EDUCATION[0];

  return (
    <section className="section section--bordered" id="education">
      <div className="container">
        <div className="section__header">
          <span className="section__num">05</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Academics & Recognition
            </ScrollFloat>
            <p className="section__subtitle">
              Formal engineering education at NIT Srinagar alongside software development and Java credentials.
            </p>
          </div>
        </div>

        <div className="edu-grid">
          {/* NIT Srinagar Academic Card */}
          <div className="edu-card">
            <div>
              <div className="edu-card__header">
                <div>
                  <h3 className="edu-card__title">{edu.institution}</h3>
                  <div className="edu-card__degree">{edu.degree}</div>
                </div>
                <div style={{ background: '#191924', padding: '0.65rem', borderRadius: '8px', color: 'var(--accent-red)' }}>
                  <GraduationCap size={24} />
                </div>
              </div>

              <div className="edu-card__period">{edu.period}</div>
              <div className="edu-card__gpa">{edu.score}</div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#ffffff', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  Core Focus & Coursework
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {edu.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={15} color="var(--accent-lime)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="achievement-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <Award size={22} color="var(--accent-red)" />
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', textTransform: 'uppercase' }}>
                Honors & Certifications
              </h3>
            </div>

            {ACHIEVEMENTS.map((item, idx) => (
              <div key={idx} className="achievement-item">
                <div className="achievement-item__title">
                  <Star size={16} color="var(--accent-red)" fill="var(--accent-red)" />
                  <span>{item.title}</span>
                </div>
                <div className="achievement-item__meta">
                  {item.issuer} • {item.year} • {item.category}
                </div>
                <p className="achievement-item__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
