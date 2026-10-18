import React, { useState } from 'react';
import { Terminal, Shield, Database, Cpu, CheckCircle2, GitBranch, Copy, Check, ExternalLink } from 'lucide-react';

const ARCH_TABS = [
  {
    id: 'hireiq',
    label: 'HireIQ AI Pipeline',
    shortLabel: 'HireIQ AI',
    system: 'AI-Resume-Analyzer (Spring Boot 3.3 + NVIDIA Nemotron)',
    systemShort: 'HireIQ • Spring Boot + NVIDIA',
    codeFile: 'AnalysisService.java',
    summary: 'Sub-3s Prompt Orchestration Pipeline',
    liveUrl: 'https://hireiq.neerad.tech/',
    flow: [
      { step: '1. Ingestion', desc: 'React 19 SPA sends candidate resume text and target JD to /api/analysis/match' },
      { step: '2. Security Gate', desc: 'JwtAuthFilter validates Bearer token and authenticates request in SecurityContext' },
      { step: '3. Prompt Engineering', desc: 'AnalysisService injects sanitized inputs into strict RECRUITER_PROMPT JSON schema' },
      { step: '4. NVIDIA Nemotron API', desc: 'AiService sends payload to NVIDIA Nemotron requesting raw structured JSON' },
      { step: '5. Jackson Deserialization', desc: 'Maps response into MatchResponse DTO containing matchScore, missingSkills & atsFlags' },
      { step: '6. Persistence', desc: 'HistoryService asynchronously logs analysis result into MySQL 8.0' },
    ],
    code: `// HireIQ: AnalysisService.java
@Service
@RequiredArgsConstructor
@Slf4j
public class AnalysisService {
    private final AiService aiService;

    public MatchResponse analyzeMatch(MatchRequest request) {
        String userMessage = String.format("""
                === JOB DESCRIPTION ===
                %s
                === CANDIDATE RESUME ===
                %s
                """, request.getJobDescription(), request.getResumeText());

        String aiResponse = aiService.chat(RECRUITER_PROMPT, userMessage);

        try {
            String jsonContent = extractJson(aiResponse);
            ObjectMapper mapper = buildMapper();
            Map<String, Object> parsed = mapper.readValue(jsonContent, new TypeReference<>() {});

            return MatchResponse.builder()
                    .matchScore(((Number) parsed.getOrDefault("matchScore", 50)).intValue())
                    .recommendation((String) parsed.getOrDefault("recommendation", "Submit with Tailoring"))
                    .missingSkills(toStringList(parsed.get("missingSkills")))
                    .atsFlags(toStringList(parsed.get("atsFlags")))
                    .honestTake((String) parsed.getOrDefault("honestTake", ""))
                    .build();
        } catch (Exception e) {
            log.error("Failed to parse Recruiter AI response", e);
            throw new RuntimeException("Failed to parse Recruiter AI response", e);
        }
    }
}`,
  },
  {
    id: 'security',
    label: 'Spring Security Filter',
    shortLabel: 'Spring Security',
    system: 'HireIQ & Student Portal Stateless Auth Chain',
    systemShort: 'HireIQ • Stateless Auth Chain',
    codeFile: 'JwtAuthFilter.java',
    summary: 'Stateless JWT Filter Chain Architecture',
    flow: [
      { step: '1. HTTP Request', desc: 'Client transmits request with Authorization: Bearer <token> carrying the application JWT (issued after standard credentials or Google OAuth 2.0 sign-in)' },
      { step: '2. JwtAuthFilter', desc: 'OncePerRequestFilter intercepts request and checks Authorization header' },
      { step: '3. Token Extraction', desc: 'JwtService extracts userEmail from token claims' },
      { step: '4. UserDetails Load', desc: 'UserRepository queries user identity and loads GrantedAuthorities' },
      { step: '5. Context Set', desc: 'UsernamePasswordAuthenticationToken configured in SecurityContextHolder' },
      { step: '6. Route Guard', desc: 'Controller endpoints enforce authenticated access or role requirements' },
    ],
    code: `// HireIQ & Student Portal: JwtAuthFilter.java
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        try {
            final String userEmail = jwtService.extractUsername(jwt);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                userRepository.findByEmail(userEmail).ifPresent(user -> {
                    if (jwtService.isTokenValid(jwt, user)) {
                        var authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                });
            }
        } catch (JwtException e) {
            // Expired or invalid token; proceed as unauthenticated
        }

        filterChain.doFilter(request, response);
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
              {current.liveUrl && (
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arch-live-btn"
                  title="Direct access to live HireIQ platform"
                >
                  <span>Direct Access</span>
                  <ExternalLink size={12} />
                </a>
              )}
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

