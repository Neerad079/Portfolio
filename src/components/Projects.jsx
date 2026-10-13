import React, { useState } from 'react';
import { ArrowUpRight, Eye, Layers } from 'lucide-react';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';
import { CardStack, CardStackItem } from './ui/CardStack';

const PROJECT_THEMES = [
  {
    themeClass: 'card--theme-hireiq',
    accentGlow: 'linear-gradient(90deg, #f9452d 0%, #ff8e80 100%)',
    tagClass: 'tag--accent',
  },
  {
    themeClass: 'card--theme-portal',
    accentGlow: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
    tagClass: 'tag--blue',
  },
  {
    themeClass: 'card--theme-forms',
    accentGlow: 'linear-gradient(90deg, #c7ff97 0%, #4ade80 100%)',
    tagClass: 'tag--lime',
  },
];

import ScrollFloat from './ui/ScrollFloat';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="section section--bordered" id="projects">
      <div className="container">
        <div className="section__header">
          <span className="section__num">03</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Featured Projects
            </ScrollFloat>
            <p className="section__subtitle">
              Production-grade systems developed with clean architectural patterns, robust test suites, and containerized architectures. Scroll down to experience the stacked systems.
            </p>
          </div>
        </div>

        {/* Inspira-UI Style Scroll Animated Card Stack */}
        <CardStack
          totalCards={FEATURED_PROJECTS.length}
          scaleMultiplier={0.038}
          className="featured-card-stack"
        >
          {FEATURED_PROJECTS.map((project, index) => {
            const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];

            return (
              <CardStackItem
                key={project.id}
                index={index}
                totalCards={FEATURED_PROJECTS.length}
                topOffset={26}
                className={theme.themeClass}
                accentGlow={theme.accentGlow}
              >
                <article className="project-card project-card--stacked">
                  <div className="project-card__main">
                    <div className="project-card__header">
                      <span className={`tag ${theme.tagClass}`}>{project.badge}</span>
                      <span className="mono-font" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {project.date}
                      </span>
                      <span
                        className="mono-font"
                        style={{
                          marginLeft: 'auto',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          opacity: 0.6,
                        }}
                      >
                        STACK 0{index + 1}/0{FEATURED_PROJECTS.length}
                      </span>
                    </div>

                    <h3 className="project-card__title">{project.title}</h3>
                    <span className="project-card__tagline">{project.tagline}</span>

                    <p className="project-card__desc">{project.overview}</p>

                    <ul className="project-card__highlights-list">
                      {project.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="project-card__highlight-item">
                          <span className="project-card__highlight-bullet">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="project-card__tags">
                      {project.stack.map((tech, idx) => (
                        <span key={idx} className="tag tag--sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-card__actions">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary btn--sm"
                        id={`project-${project.id}-github`}
                      >
                        <GithubIcon size={15} />
                        <span>View Repository</span>
                      </a>

                      <button
                        className="btn btn--outline btn--sm"
                        onClick={() => setSelectedProject(project)}
                        id={`project-${project.id}-modal`}
                      >
                        <Eye size={15} />
                        <span>Architecture Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* Sidebar Metrics & Depth Watermark */}
                  <div className="project-card__sidebar">
                    <div className="project-card__metrics">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="metric-item">
                          <span className="metric-item__value">{m.value}</span>
                          <span className="metric-item__label">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="project-card__index">
                      0{index + 1}
                    </div>
                  </div>
                </article>
              </CardStackItem>
            );
          })}
        </CardStack>

        {/* Other Noteworthy Repositories */}
        <div className="other-projects-heading">
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', textTransform: 'uppercase' }}>
              Other Noteworthy Repositories
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Open-source implementations covering enterprise microservices, distributed caching, and automated CI/CD.
            </p>
          </div>
          <a
            href="https://github.com/Neerad079?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
          >
            <span>All Repositories</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="secondary-grid">
          {OTHER_PROJECTS.map((repo, idx) => (
            <div key={idx} className="secondary-card">
              <div>
                <h4 className="secondary-card__title">{repo.title}</h4>
                <p className="secondary-card__desc">{repo.description}</p>
                <div className="secondary-card__tags">
                  {repo.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag tag--sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={repo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
                style={{ width: 'fit-content' }}
              >
                <GithubIcon size={14} />
                <span>Source</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Specs Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
