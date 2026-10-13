import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { GithubIcon } from './Icons';

import SplitFlapText from './ui/SplitFlapText';

// Framer-inspired soothing text entrance animation variants
const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const soothingLineVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: 'blur(16px)',
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1], // Signature silky cubic-bezier deceleration
    },
  },
};

const soothingBioVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.62,
    },
  },
};

const soothingCtasVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.78,
    },
  },
};

const soothingStatsVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.94,
    },
  },
};

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        {/* Main Heading with Soothing Framer-style Entrance Animation */}
        <motion.h1
          className="hero__headline"
          variants={headlineContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Line 1: BUILDING */}
          <motion.span
            className="hero__headline-line"
            variants={soothingLineVariants}
          >
            BUILDING
          </motion.span>

          {/* Line 2: Mechanical Split-Flap Board */}
          <motion.span
            className="hero__headline-flap"
            variants={soothingLineVariants}
          >
            <SplitFlapText
              words={[
                'PRODUCTION-GRADE',
                'HIGH-THROUGHPUT',
                'FAULT-TOLERANT',
                'MISSION-CRITICAL',
                'ENTERPRISE-SCALE',
              ]}
              flipDuration={0.12}
              stagger={0.04}
              cycleDelay={2400}
              charset="alphanumeric"
              flipsPerChar={6}
              tileColor="#13111a"
              textColor="#f9452d"
              tileRadius={6}
              gap={5}
              loop
              padTo={16}
            />
          </motion.span>

          {/* Line 3: SOFTWARE */}
          <motion.span
            className="hero__headline-line"
            variants={soothingLineVariants}
          >
            SOFTWARE
          </motion.span>
        </motion.h1>

        {/* Bio Subtitle with Gentle Entrance */}
        <motion.p
          className="hero__bio"
          variants={soothingBioVariants}
          initial="hidden"
          animate="visible"
        >
          Full-stack & backend developer specializing in <strong>Java</strong>, <strong>Spring Boot</strong>, and{' '}
          <strong>React</strong>. CS undergrad at <strong>{PERSONAL_INFO.college}</strong> building secure RESTful
          architectures, containerized microservices, and AI-powered career systems.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          className="hero__ctas"
          variants={soothingCtasVariants}
          initial="hidden"
          animate="visible"
        >
          <a href="#projects" className="btn btn--primary" id="hero-projects-btn">
            <span>Explore Projects</span>
            <ArrowDownRight size={18} />
          </a>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
            id="hero-resume-btn"
          >
            <span>View Resume</span>
            <ArrowUpRight size={18} />
          </a>

          <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn btn--outline btn--sm"
              aria-label="Email Neerad"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* Quick Stats Strip */}
        <motion.div
          className="hero__stats-strip"
          variants={soothingStatsVariants}
          initial="hidden"
          animate="visible"
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className={`stat-item__value ${idx === 0 ? 'stat-item__value--accent' : ''}`}>
                {stat.value}
              </span>
              <span className="stat-item__label">{stat.label}</span>
              <span className="stat-item__detail">{stat.detail}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
