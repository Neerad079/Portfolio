import React, { useState } from 'react';
import { Terminal, Shield, Database, Cpu, CheckCircle2, GitBranch, Copy, Check } from 'lucide-react';

const ARCH_TABS = [
  {
    id: 'hireiq',
    label: 'HireIQ AI Pipeline',
    shortLabel: 'HireIQ AI',
    system: 'AI-Resume-Analyzer (Spring Boot 3.3 + Claude API)',
    systemShort: 'HireIQ • Spring Boot + Claude',
    codeFile: 'ResumeAnalysisService.java',
    summary: 'Sub-3s Prompt Orchestration Pipeline',
    flow: [
      { step: '1. Ingestion', desc: 'React 19 SPA uploads PDF/Text resume & Target JD over multipart form' },
      { step: '2. Security Gate', desc: 'JwtAuthFilter verifies Bearer token & rate limits incoming request' },
      { step: '3. Prompt Sanitization', desc: 'Spring service extracts text, sanitizes tokens, and builds structured prompt' },
      { step: '4. Anthropic Claude API', desc: 'Streams resume + JD to Claude 3.5 Sonnet requesting strict JSON output' },
      { step: '5. Scoring & DTO Mapping', desc: 'Jackson deserializes response into MatchReportDTO with 5 ranked metrics' },
      { step: '6. Persistence', desc: 'Async persistence into MySQL 8.0 with application status tracking' },
    ],
    code: `// HireIQ: ResumeAnalysisService.java
@Service
public class ResumeAnalysisService {
    private final ClaudeApiClient claudeClient;
    private final AnalysisReportRepository reportRepo;

    @Transactional
    public AnalysisResponseDTO analyzeCandidate(ResumePayload payload) {
        String structuredPrompt = PromptBuilder.create()
            .withResume(payload.getSanitizedResume())
            .withJobDescription(payload.getJobDescription())
            .enforceJsonSchema(AnalysisSchema.class)
            .build();

        ClaudeResponse rawResponse = claudeClient.generate(structuredPrompt);
        AnalysisReport report = DtoMapper.toEntity(rawResponse, payload.getUserId());
        reportRepo.save(report);

        return DtoMapper.toDTO(report);
    }
}`,
  },
  {
    id: 'security',
    label: 'Spring Security Filter',
    shortLabel: 'Spring Security',
    system: 'Student Portal & HireIQ Stateless Auth Chain',
    systemShort: 'Student Portal • Stateless Auth',
    codeFile: 'JwtAuthFilter.java',
    summary: 'Stateless JWT Filter Chain Architecture',
    flow: [
      { step: '1. HTTP Request', desc: 'Client sends request with Authorization: Bearer <token>' },
      { step: '2. JwtAuthFilter', desc: 'OncePerRequestFilter extracts and parses JWT claims' },
      { step: '3. Token Validation', desc: 'Verifies signature, expiration date, and user identity' },
      { step: '4. UserDetails Load', desc: 'Custom UserDetailsService loads user authorities (ADMIN / STUDENT)' },
      { step: '5. Context Set', desc: 'UsernamePasswordAuthenticationToken stored in SecurityContextHolder' },
      { step: '6. Route Guard', desc: 'Method-level @PreAuthorize verifies required permission before execution' },
    ],
    code: `// Student Portal: JwtAuthFilter.java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, 
                                    HttpServletResponse res, 
                                    FilterChain chain) throws IOException, ServletException {
        final String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }
        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails user = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, user)) {
                var authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(req, res);
    }
}`,
  },
  {
    id: 'database',
    label: 'Transactional DAO & Schema',
    shortLabel: 'Database DAO',
    system: 'Google Forms Clone (Hibernate ORM + MySQL 8.0)',
    systemShort: 'Forms Clone • Hibernate ORM',
    codeFile: 'FormDAOImpl.java',
    summary: 'Normalized 4-Entity Schema with Programmatic Rollback',
    flow: [
      { step: '1. Form Definition', desc: 'Dynamic schema supports text, multiple choice, & checkboxes' },
      { step: '2. SessionFactory', desc: 'Thread-safe Singleton SessionFactory provides active session' },
      { step: '3. Transaction Begin', desc: 'Programmatic transaction.begin() with strict try-catch-finally block' },
      { step: '4. Cascading Persistence', desc: 'Form -> Questions -> Options cascade safely with foreign key constraints' },
      { step: '5. Failure Guard', desc: 'On SQL/Validation exception, automatic transaction.rollback() triggers' },
      { step: '6. Aggregated Retrieval', desc: 'HQL GROUP BY queries compute respondent distribution in 1 roundtrip' },
    ],
    code: `// Google Forms Clone: FormDAOImpl.java
public class FormDAOImpl implements FormDAO {
    private final SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    @Override
    public boolean saveFormWithQuestions(Form form, List<Question> questions) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            session.persist(form);
            for (Question q : questions) {
                q.setForm(form);
                session.persist(q);
            }
            tx.commit();
            return true;
        } catch (HibernateException ex) {
            if (tx != null && tx.isActive()) tx.rollback();
            logger.error("Transaction rolled back safely: {}", ex.getMessage());
            return false;
        }
    }
}`,
  },
];

import ScrollFloat from './ui/ScrollFloat';

export default function ArchitectureShowcase() {
  const [activeTab, setActiveTab] = useState(ARCH_TABS[0].id);
  const [viewMode, setViewMode] = useState('flow'); // 'flow' | 'code' | 'both'
  const [copied, setCopied] = useState(false);
  const current = ARCH_TABS.find((t) => t.id === activeTab) || ARCH_TABS[0];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <section className="section section--bordered" id="architecture">
      <div className="container">
        <div className="section__header">
          <span className="section__num">02</span>
          <div>
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Architecture Deep Dive
            </ScrollFloat>
            <p className="section__subtitle">
              Inspect how my backend systems handle authentication pipelines, dynamic schema persistence, and AI orchestration.
            </p>
          </div>
        </div>

        {/* Showcase Container */}
        <div className="arch-showcase">
          <div className="arch-showcase__header">
            <div className="arch-showcase__top-bar">
              <div className="arch-showcase__dots" aria-hidden="true">
                <span className="arch-showcase__dot arch-showcase__dot--red" />
                <span className="arch-showcase__dot arch-showcase__dot--yellow" />
                <span className="arch-showcase__dot arch-showcase__dot--green" />
              </div>
              <div className="arch-showcase__system-name">
                <span className="arch-system-full">{current.system}</span>
                <span className="arch-system-short">{current.systemShort}</span>
              </div>
            </div>

            <div className="arch-showcase__tabs" role="tablist">
              {ARCH_TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`arch-tab-btn ${activeTab === tab.id ? 'arch-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="arch-tab-btn__full">{tab.label}</span>
                  <span className="arch-tab-btn__short">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Handheld View Toggle (Flow vs Code vs Full) */}
          <div className="arch-view-toggle" role="tablist" aria-label="Architecture view mode">
            <button
              type="button"
              className={`arch-view-toggle__btn ${viewMode === 'flow' ? 'arch-view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('flow')}
            >
              <GitBranch size={13} />
              <span>Pipeline Flow</span>
            </button>
            <button
              type="button"
              className={`arch-view-toggle__btn ${viewMode === 'code' ? 'arch-view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('code')}
            >
              <Terminal size={13} />
              <span>Source Code</span>
            </button>
            <button
              type="button"
              className={`arch-view-toggle__btn ${viewMode === 'both' ? 'arch-view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('both')}
            >
              <span>Full View</span>
            </button>
          </div>

          <div className={`arch-showcase__body arch-showcase__body--mode-${viewMode}`}>
            {/* Left: Execution Flow */}
            <div className={`arch-flow-col ${viewMode === 'code' ? 'arch-col--hidden-mobile' : ''}`}>
              <div className="arch-box__title arch-box__title--summary">
                <GitBranch size={16} color="var(--accent-lime)" className="arch-box__title-icon" />
                <span className="arch-box__title-text">
                  {current.summary}
                </span>
              </div>

              <div className="arch-flow-steps">
                {current.flow.map((item, idx) => (
                  <div key={idx} className="arch-step-card">
                    <CheckCircle2 size={16} color="var(--accent-lime)" className="arch-step-card__icon" />
                    <div className="arch-step-card__content">
                      <div className="arch-step-card__title">
                        {item.step}
                      </div>
                      <div className="arch-step-card__desc">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Quick Action to switch to Code if in 'flow' mode */}
              <div className="arch-flow-footer-mobile">
                <button
                  type="button"
                  className="arch-switch-link"
                  onClick={() => setViewMode('code')}
                >
                  <Terminal size={14} color="var(--accent-blue)" />
                  <span>View Source Code ({current.codeFile}) &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right: Actual Code Snippet */}
            <div className={`arch-box ${viewMode === 'flow' ? 'arch-col--hidden-mobile' : ''}`}>
              <div className="arch-box__title arch-box__title--code">
                <div className="arch-box__code-label">
                  <Terminal size={15} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                  <span>IMPLEMENTATION CODE</span>
                  <span className="arch-code-badge">{current.codeFile}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="arch-copy-btn"
                  title="Copy code to clipboard"
                  aria-label="Copy implementation code"
                >
                  {copied ? (
                    <>
                      <Check size={13} color="var(--accent-lime)" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="code-snippet">
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

