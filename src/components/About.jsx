import React from 'react';
import { Award, BookOpen, Layers, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

import ScrollFloat from './ui/ScrollFloat';

export default function About() {
  return (
    <section className="section section--bordered" id="about">
      <div className="container">
        <div className="section__header">
          <span className="section__num">01</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              About Me
            </ScrollFloat>
            <p className="section__subtitle">
              Engineering reliable backend foundations and reactive user experiences with a focus on maintainability and speed.
            </p>
          </div>
        </div>

        <div className="about__grid">
          {/* Main Story & Approach */}
          <div className="about__text-block">
            <p className="about__lead">
              I am a Computer Science undergraduate at the <strong>{PERSONAL_INFO.college}</strong> (Class of 2028),
              focused on designing resilient backend architectures and responsive, accessible full-stack applications.
            </p>

            <p>
              My core technical foundation is built on <strong>Java</strong> and the <strong>Spring ecosystem</strong>. I design
              RESTful APIs with rigorous layer separation, write defensive services tested with JUnit 5 & Mockito, and containerize
              services with Docker for seamless deployments.
            </p>

            <p>
              Recently, I built <strong>HireIQ</strong> for the <em>Razorpay AI BuildAthon 2026</em>, integrating Claude 3.5 Sonnet
              into an enterprise Spring Boot backend with sub-3s response scoring. I treat software engineering as a discipline of
              contract integrity—ensuring every DTO is validated, every transaction is rollback-safe, and every sensitive endpoint
              is protected by stateless token authentication.
            </p>

            <p>
              When not writing backend services, I solve algorithmic challenges in Java and C++, continuously refining my understanding
              of graph algorithms, dynamic programming, and low-level concurrency.
            </p>
          </div>

          {/* Quick Pillars Panel */}
          <div className="about__panel">
            <h3 className="about__panel-title">
              <Cpu size={22} color="var(--accent-red)" />
              <span>Engineering Pillars</span>
            </h3>

            <div className="about__credential">
              <div className="about__credential-icon">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="about__credential-heading">Strict 4-Layer Architecture</h4>
                <p className="about__credential-desc">
                  Separating Controller, Service, Repository, and DTO layers to eliminate business leaks and ensure testability.
                </p>
              </div>
            </div>

            <div className="about__credential">
              <div className="about__credential-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="about__credential-heading">Stateless Security & RBAC</h4>
                <p className="about__credential-desc">
                  Implementing Spring Security filter chains with signed JWTs, BCrypt encryption, and role-based guardrails.
                </p>
              </div>
            </div>

            <div className="about__credential">
              <div className="about__credential-icon">
                <Terminal size={20} />
              </div>
              <div>
                <h4 className="about__credential-heading">Test-Driven Confidence</h4>
                <p className="about__credential-desc">
                  80%+ line test coverage via JUnit 5 and Mockito, isolating database transactions with programmatic rollbacks.
                </p>
              </div>
            </div>

            <div className="about__credential">
              <div className="about__credential-icon">
                <Award size={20} />
              </div>
              <div>
                <h4 className="about__credential-heading">Competitive Programming</h4>
                <p className="about__credential-desc">
                  HackerRank Java 5-Star Gold Badge (Top 10% global ranking) with 100+ solved algorithmic challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
