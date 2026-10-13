import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './Icons';

import ScrollFloat from './ui/ScrollFloat';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f9452d', '#c7ff97', '#ffffff'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate sending message
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f9452d', '#c7ff97', '#38bdf8'],
    });

    // Reset after a delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section className="section section--bordered" id="contact">
      <div className="container">
        <div className="section__header">
          <span className="section__num">06</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Let's Connect
            </ScrollFloat>
            <p className="section__subtitle">
              Whether you're looking to hire a full-stack intern, discuss backend architecture, or collaborate on software systems.
            </p>
          </div>
        </div>

        <div className="contact-container">
          {/* Left Column: Direct Coordinates */}
          <div className="contact-left">
            <h3 className="contact-left__title">
              OPEN FOR <br />
              OPPORTUNITIES
            </h3>
            <p className="contact-left__sub">
              Based at NIT Srinagar. Open to remote internships, full-stack software development roles, and backend systems engineering.
            </p>

            <div className="contact-links-list">
              {/* Copy Email Button */}
              <div className="contact-link-row" onClick={handleCopyEmail} style={{ cursor: 'pointer' }}>
                <div className="contact-link-row__left">
                  <Mail size={18} color="var(--accent-red)" />
                  <div>
                    <div className="contact-link-row__label">Direct Email</div>
                    <div className="contact-link-row__val">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <button
                  className="btn btn--sm btn--outline"
                  type="button"
                  aria-label="Copy email to clipboard"
                  style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}
                >
                  {copied ? (
                    <>
                      <Check size={14} color="var(--accent-lime)" />
                      <span style={{ color: 'var(--accent-lime)' }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-row"
              >
                <div className="contact-link-row__left">
                  <GithubIcon size={18} color="#ffffff" />
                  <div>
                    <div className="contact-link-row__label">GitHub Profile</div>
                    <div className="contact-link-row__val">{PERSONAL_INFO.githubHandle}</div>
                  </div>
                </div>
                <span className="tag tag--sm">Visit ↗</span>
              </a>

              {/* Phone */}
              <a href={`tel:${PERSONAL_INFO.phone}`} className="contact-link-row">
                <div className="contact-link-row__left">
                  <Phone size={18} color="var(--accent-lime)" />
                  <div>
                    <div className="contact-link-row__label">Phone / WhatsApp</div>
                    <div className="contact-link-row__val">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>
                <span className="tag tag--sm">Call ↗</span>
              </a>

              {/* Location */}
              <div className="contact-link-row" style={{ cursor: 'default' }}>
                <div className="contact-link-row__left">
                  <MapPin size={18} color="#38bdf8" />
                  <div>
                    <div className="contact-link-row__label">Location</div>
                    <div className="contact-link-row__val">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
                <span className="tag tag--sm">On Campus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message */}
          <div className="contact-right">
            {submitted ? (
              <div
                style={{
                  background: '#09090f',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(199, 255, 151, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-lime)',
                  }}
                >
                  <Sparkles size={28} />
                </div>
                <h4 style={{ fontSize: '1.6rem', color: '#ffffff', textTransform: 'uppercase' }}>
                  Message Sent!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '340px' }}>
                  Thanks for reaching out! I typically respond to technical inquiries within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="form-control"
                    placeholder="e.g. Alex Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="form-control"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Opportunity</label>
                  <textarea
                    id="message"
                    required
                    className="form-control"
                    placeholder="Tell me about your team, project requirements, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--primary" style={{ marginTop: '0.5rem' }}>
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
