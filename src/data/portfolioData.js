export const PERSONAL_INFO = {
  name: "Neerad S Ramesh",
  role: "Full-Stack Developer & Backend Engineer",
  tagline: "BUILDING PRODUCTION-GRADE SOFTWARE",
  subTagline:
    "B.Tech in Computer Science at NIT Srinagar. Focused on architecting resilient Java & Spring Boot backend systems, reactive web interfaces, and containerized AI-driven pipelines.",
  email: "neeradsramesh@gmail.com",
  phone: "+91 95719 94484",
  github: "https://github.com/Neerad079",
  githubHandle: "github.com/Neerad079",
  resumeUrl: "/Neerad_S_Ramesh_Resume.pdf",
  location: "Srinagar, Jammu & Kashmir, India",
  college: "National Institute of Technology, Srinagar",
  status: "Available for internships & full-stack roles",
};

export const STATS = [
  { value: "3+", label: "Full-Stack Systems", detail: "Shipped & Open Sourced" },
  { value: "100+", label: "DSA Problems Solved", detail: "LeetCode & HackerRank" },
  { value: "5★", label: "HackerRank Java Gold", detail: "Top 10% Global Rank" },
  { value: "80%+", label: "Test Coverage", detail: "JUnit 5 & Mockito Suites" },
];

export const SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Languages",
    description: "Core languages for systems & algorithms",
    skills: [
      { name: "Java", level: "Advanced", badge: "Primary", highlight: true },
      { name: "C++", level: "Proficient", badge: "DSA" },
      { name: "SQL", level: "Proficient", badge: "Queries & DDL" },
      { name: "JavaScript (ES6+)", level: "Proficient", badge: "Frontend" },
      { name: "HTML5 & CSS3", level: "Advanced", badge: "Modern UI" },
    ],
  },
  {
    id: "backend",
    name: "Backend Architecture",
    description: "Robust enterprise services & API layers",
    skills: [
      { name: "Spring Boot 3.x", level: "Advanced", badge: "Core Framework", highlight: true },
      { name: "Spring Security", level: "Proficient", badge: "Auth Chain", highlight: true },
      { name: "Hibernate ORM", level: "Proficient", badge: "Persistence" },
      { name: "Spring Data JPA", level: "Advanced", badge: "Repositories" },
      { name: "RESTful APIs", level: "Advanced", badge: "HTTP Standards" },
      { name: "JDBC", level: "Proficient", badge: "Raw DB Ops" },
    ],
  },
  {
    id: "security",
    name: "Security & Auth",
    description: "Stateless security & identity protocols",
    skills: [
      { name: "JWT (JSON Web Tokens)", level: "Proficient", badge: "Stateless Auth", highlight: true },
      { name: "OAuth 2.0", level: "Proficient", badge: "Social / Delegated" },
      { name: "BCrypt Hashing", level: "Proficient", badge: "Credentials" },
      { name: "Role-Based Access (RBAC)", level: "Proficient", badge: "Multi-Role" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Reactive user interfaces with modern toolchains",
    skills: [
      { name: "React 19", level: "Proficient", badge: "SPA Architecture", highlight: true },
      { name: "Vite", level: "Proficient", badge: "Build Tooling" },
      { name: "Axios", level: "Proficient", badge: "API Integration" },
      { name: "Responsive UI", level: "Advanced", badge: "Mobile / Desktop" },
      { name: "CSS Custom Properties", level: "Advanced", badge: "Design Tokens" },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Databases",
    description: "Containerization, CI/CD and relational persistence",
    skills: [
      { name: "MySQL 8.0", level: "Advanced", badge: "Relational DB", highlight: true },
      { name: "Docker", level: "Proficient", badge: "Containers" },
      { name: "Docker Compose", level: "Proficient", badge: "Multi-Service", highlight: true },
      { name: "GitHub Actions", level: "Proficient", badge: "Automated CI/CD" },
      { name: "Maven", level: "Proficient", badge: "Build Lifecycle" },
      { name: "Git", level: "Advanced", badge: "Feature Branching" },
    ],
  },
  {
    id: "testing",
    name: "Testing & Architecture",
    description: "Verification and software engineering patterns",
    skills: [
      { name: "JUnit 5", level: "Advanced", badge: "Unit Testing", highlight: true },
      { name: "Mockito", level: "Advanced", badge: "Mocking & Stubs" },
      { name: "Repository Pattern", level: "Advanced", badge: "Separation of Concerns" },
      { name: "DTO & Builder Patterns", level: "Advanced", badge: "Clean Contracts" },
      { name: "Singleton & Factory", level: "Proficient", badge: "OOP Design" },
      { name: "Postman", level: "Advanced", badge: "Contract Testing" },
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    id: "hireiq",
    title: "HireIQ — AI-Powered Job Assistant",
    tagline: "Full-stack AI Career Platform Built for Razorpay AI BuildAthon 2026",
    badge: "Featured / Hackathon 2026",
    featured: true,
    date: "Aug 2026",
    role: "Lead Full-Stack Developer",
    github: "https://github.com/Neerad079/AI-Resume-Analyzer",
    demo: null,
    stack: [
      "Spring Boot 3.3",
      "React 19",
      "Anthropic Claude API",
      "Docker Compose",
      "MySQL 8.0",
      "Spring Security",
      "JWT",
      "JUnit 5",
    ],
    overview:
      "A production-grade career optimization platform that uses structured prompt engineering and Claude 3.5 Sonnet to score resumes against Job Descriptions, inject missing ATS keywords, rewrite bullets using Google's X-Y-Z formula, and auto-generate personalized cold outreach messages in under 3 seconds.",
    metrics: [
      { label: "Analysis Latency", value: "< 3s" },
      { label: "Test Coverage", value: "80%+" },
      { label: "REST Endpoints", value: "7 Secured" },
      { label: "Deploy Time", value: "1-Click Docker" },
    ],
    highlights: [
      "Containerized full stack with Docker Compose running multi-container setup (Spring Boot backend, React SPA frontend, MySQL 8.0).",
      "Secured 7 REST endpoints with Spring Security 6, stateless JWT authentication, and OAuth 2.0 social authorization.",
      "Achieved 80%+ line coverage across service and controller layers using JUnit 5, Mockito stubs, and AssertJ.",
      "Engineered global error handling using @ControllerAdvice with custom RFC 7807 problem details and strict DTO validation.",
    ],
    architecture: {
      client: "React 19 SPA + Vite + Responsive CSS design tokens",
      apiGateway: "Spring Boot 3.3 with Spring Security JWT Filter Chain",
      aiEngine: "Anthropic Claude API pipeline with structured JSON schema responses",
      database: "MySQL 8.0 with Spring Data JPA & Hibernate 6",
      deployment: "Multi-stage Docker containers orchestrated via Docker Compose",
    },
  },
  {
    id: "student-portal",
    title: "Student Login Portal",
    tagline: "Secured Multi-Role Authentication System with 4-Layer Architecture",
    badge: "Full-Stack Security",
    featured: true,
    date: "Jan – Apr 2025",
    role: "Backend Architect & Team Lead",
    github: "https://github.com/Neerad079/student-portal",
    demo: null,
    stack: [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Hibernate/JPA",
      "MySQL",
      "BCrypt",
      "Python Microservice",
    ],
    overview:
      "A robust educational identity and session management portal engineered with strict 4-layer separation (Controller, Service, Repository, DTO). Enforces stateless JWT authentication and role-based access control (RBAC) across distinct student and administrator authorization boundaries.",
    metrics: [
      { label: "Commits", value: "40+" },
      { label: "User Roles", value: "2 (Admin/Student)" },
      { label: "Password Hash", value: "BCrypt 10 rounds" },
      { label: "Architecture", value: "4-Layer Clean" },
    ],
    highlights: [
      "Clean 4-layer architecture strictly isolating HTTP transport, business transactions, and persistence concerns.",
      "Stateless Spring Security filter chain with custom JwtAuthFilter and DaoAuthenticationProvider.",
      "Integrated external Python microservice via versioned, validated REST contracts.",
      "Maintained professional feature-branch Git workflow across 40+ commits with zero regressions.",
    ],
    architecture: {
      client: "Web UI interfacing with authenticated REST contracts",
      authLayer: "JwtAuthenticationFilter extracting Bearer tokens before UsernamePasswordAuthenticationFilter",
      businessLayer: "Spring Service layer with transaction management",
      persistence: "Hibernate / Spring Data JPA repositories communicating with MySQL",
      integration: "HTTP client communicating with secondary Python analytical microservice",
    },
  },
  {
    id: "google-forms-clone",
    title: "Google Forms Clone",
    tagline: "Dynamic Survey Engine with Normalized Schema & Transactional DAO",
    badge: "Database & OOP Architecture",
    featured: true,
    date: "Aug – Nov 2024",
    role: "Backend Developer",
    github: "https://github.com/Neerad079/google-form-clone-backend",
    demo: null,
    stack: [
      "Java",
      "Hibernate ORM",
      "MySQL",
      "JDBC",
      "OOP Design Patterns",
      "HQL Aggregation",
    ],
    overview:
      "A backend survey and form creation engine replicating Google Forms' core dynamic capabilities. Designed around a normalized 4-entity relational schema that handles arbitrary questions (multiple choice, checkboxes, short answer, text) without modifying schema at runtime.",
    metrics: [
      { label: "Entities", value: "4 Normalized" },
      { label: "Rollback Guarantee", value: "100% on failure" },
      { label: "Querying", value: "HQL Aggregation" },
      { label: "Patterns", value: "DAO, Factory, Singleton" },
    ],
    highlights: [
      "Engineered 4-entity normalized MySQL schema (Forms, Questions, Users, Responses) with cascade relationships.",
      "Implemented a transaction-safe Data Access Object (DAO) layer guaranteeing automatic rollback on persistence failures.",
      "Optimized analytical response retrieval using targeted HQL aggregation queries instead of N+1 in-memory joins.",
      "Applied OOP principles including Factory Pattern for question types and Singleton for database session management.",
    ],
    architecture: {
      domainModel: "Normalized entities: Form (1:N) Question (1:N) Option, Response (1:N) Answer",
      daoLayer: "Hibernate SessionFactory with programmatic transaction demarcation (begin/commit/rollback)",
      queryEngine: "Custom HQL aggregation queries for real-time response distribution calculation",
      database: "MySQL InnoDB engine with foreign key cascading and index optimization",
    },
  },
];

export const OTHER_PROJECTS = [
  {
    title: "Employee Management System",
    description: "Enterprise CRUD backend with Spring Boot, JPA, and MySQL managing department hierarchies.",
    tags: ["Spring Boot", "JPA", "MySQL", "REST"],
    github: "https://github.com/Neerad079/Employee-Management-System",
  },
  {
    title: "Spring Boot Redis Cache",
    description: "High-throughput caching integration reducing database round trips for hot key lookups.",
    tags: ["Spring Boot", "Redis", "Distributed Caching"],
    github: "https://github.com/Neerad079/spring-boot-redis-cache",
  },
  {
    title: "Automated GitHub Actions CI/CD",
    description: "Production CI/CD workflows running automated Maven builds, unit testing, and Docker image publication.",
    tags: ["GitHub Actions", "Docker", "Maven", "CI/CD"],
    github: "https://github.com/Neerad079/GithubActions",
  },
  {
    title: "Inspect-IQ",
    description: "Technical diagnostic and code inspection utility developed for rapid project audits.",
    tags: ["Java", "CLI Tools", "Static Analysis"],
    github: "https://github.com/Neerad079/Inspect-iq",
  },
];

export const EDUCATION = [
  {
    institution: "National Institute of Technology, Srinagar",
    shortName: "NIT Srinagar",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "Aug 2024 – May 2028 (Expected)",
    score: "CGPA: 7.46 / 10.0",
    highlights: [
      "Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Computer Networks, and Object-Oriented Software Engineering.",
      "Active participant in technical hackathons, algorithmic problem solving, and backend engineering workshops.",
      "Hands-on architectural development of containerized distributed systems.",
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "HackerRank Java 5-Star Gold Badge",
    issuer: "HackerRank",
    year: "2025",
    category: "Competitive Programming & Problem Solving",
    description:
      "Awarded highest tier 5-Star Gold Badge placing in the top 10% of Java developers globally. Solved 100+ rigorous challenges in algorithmic efficiency, polymorphism, regex, threads, and complex data structures.",
    badgeColor: "#f59e0b",
  },
  {
    title: "Razorpay AI BuildAthon 2026 Contender",
    issuer: "Razorpay",
    year: "2026",
    category: "AI & Full-Stack Systems",
    description:
      "Engineered HireIQ within hackathon timeline, pairing Spring Boot 3.3 backend security with Claude 3.5 prompt pipelines and React 19 UI.",
    badgeColor: "#3b82f6",
  },
];
