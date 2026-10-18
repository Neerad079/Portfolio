import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

import ScrollFloat from './ui/ScrollFloat';

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCategories =
    selectedFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedFilter);

  return (
    <section className="section section--bordered" id="skills">
      <div className="container">
        <div className="section__header">
          <span className="section__num">04</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Skills & Technologies
            </ScrollFloat>
            <p className="section__subtitle">
              Core technologies spanning algorithms and backend services in Java and Spring Boot to React web frontends.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="skills__controls">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedFilter === cat.id ? 'filter-btn--active' : ''}`}
              onClick={() => setSelectedFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="skills__categories-grid">
          {filteredCategories.map((category) => (
            <div key={category.id} className="skill-category-card">
              <h3 className="skill-category-card__name">{category.name}</h3>
              <p className="skill-category-card__desc">{category.description}</p>

              <div className="skill-items-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-row">
                    <div className="skill-row__left">
                      <span
                        className={`skill-row__name ${
                          skill.highlight ? 'skill-row__name--highlight' : ''
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span className="skill-row__badge">{skill.badge}</span>
                    </div>

                    <span className="skill-row__level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
