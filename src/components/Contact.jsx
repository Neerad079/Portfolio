import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, AlertCircle, Loader2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './Icons';

import ScrollFloat from './ui/ScrollFloat';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;

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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please include a message or inquiry details.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!web3FormsKey) {
      setStatus('error');
      setStatusMessage('Contact form API key is not configured. Please use the direct email link.');
      return;
    }

    // Bot honeypot check
    if (formData.botcheck) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '', botcheck: false });
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Message from ${formData.name.trim()}`,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', botcheck: false });
        setErrors({});
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#f9452d', '#c7ff97', '#38bdf8'],
        });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Unable to deliver message right now. Please email directly.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Network connection error. Please email directly at ' + PERSONAL_INFO.email);
    }
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
              Whether you're looking to hire a software engineering intern, discuss Java &amp; Spring Boot architecture, or collaborate on full-stack systems.
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
              Based at NIT Srinagar. Open to internships and software engineering roles specializing in Java, Spring Boot, and React.
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

              {/* Resume Download */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Neerad_S_Ramesh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-row"
              >
                <div className="contact-link-row__left">
                  <FileText size={18} color="var(--accent-red)" />
                  <div>
                    <div className="contact-link-row__label">Curriculum Vitae</div>
                    <div className="contact-link-row__val">Download Resume (PDF)</div>
                  </div>
                </div>
                <span className="tag tag--sm">PDF ↗</span>
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
                <span className="tag tag--sm">NIT Srinagar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Web3Forms Contact Form */}
          <div className="contact-right">
            {!web3FormsKey ? (
              /* Fallback when key is not configured */
              <div
                style={{
                  background: '#09090f',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={24} color="var(--accent-red)" />
                  <h4 style={{ fontSize: '1.3rem', color: '#ffffff', textTransform: 'uppercase' }}>
                    Send Direct Message
                  </h4>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  I welcome inquiries regarding software engineering roles, internships, or backend collaborations. Reach me directly at:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Inquiry%20via%20Portfolio`}
                    className="btn btn--primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <Mail size={16} />
                    <span>Email {PERSONAL_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn--outline"
                    style={{ justifyContent: 'center' }}
                  >
                    {copied ? <Check size={16} color="var(--accent-lime)" /> : <Copy size={16} />}
                    <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
                  </button>
                </div>
                <div
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <p>
                    💡 <em>Web3Forms key fallback active. Configure <code>VITE_WEB3FORMS_KEY</code> to enable in-browser form submissions.</em>
                  </p>
                </div>
              </div>
            ) : status === 'success' ? (
              <div
                style={{
                  background: '#09090f',
                  border: '1px solid rgba(199, 255, 151, 0.3)',
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
                  Message Received!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '360px' }}>
                  Thanks for reaching out! Your message was delivered directly to {PERSONAL_INFO.email}. I typically reply within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn btn--outline btn--sm"
                  style={{ marginTop: '0.5rem' }}
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for spam prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  checked={formData.botcheck}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                  style={{ display: 'none' }}
                />

                {status === 'error' && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      borderRadius: '8px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      color: '#fca5a5',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`form-control ${errors.name ? 'form-control--error' : ''}`}
                    placeholder="e.g. Alex Sharma"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    disabled={status === 'submitting'}
                  />
                  {errors.name && (
                    <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`form-control ${errors.email ? 'form-control--error' : ''}`}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    disabled={status === 'submitting'}
                  />
                  {errors.email && (
                    <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Opportunity</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`form-control ${errors.message ? 'form-control--error' : ''}`}
                    placeholder="Tell me about your team, project requirements, or role..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    disabled={status === 'submitting'}
                  />
                  {errors.message && (
                    <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ marginTop: '0.5rem' }}
                  disabled={status === 'submitting'}
                  id="contact-submit-btn"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
