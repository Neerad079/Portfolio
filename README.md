# Neerad S Ramesh — Personal Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Java](https://img.shields.io/badge/Java-17%2F21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**Java & Spring Boot Developer**  
CS Undergraduate at the **National Institute of Technology (NIT), Srinagar**  
Building secure REST APIs, full-stack applications, and AI-powered tools with Spring Boot, React, and MySQL.

[🌐 Live Website](https://neerad079.github.io/Portfolio/) • [💼 GitHub Profile](https://github.com/Neerad079) • [📄 Download Resume (PDF)](https://neerad079.github.io/Portfolio/Neerad_S_Ramesh_Resume.pdf)

</div>

---

## 📌 About The Project

This is the personal portfolio of **Neerad S Ramesh**, designed to showcase real engineering implementations: full-stack systems, clean 4-layer backend architectures, stateless token authentication chains, and AI prompt engineering pipelines.

Built with a performance-first mindset using **React 19**, **Vite 6**, and modern **Vanilla CSS**, the site incorporates custom interactive elements (split-flap airport display, interactive architecture specs, stacked cards) while remaining lightweight, fast, accessible, and mobile-friendly.

---

## ⚡ Highlights & Interactive Features

- **⚡ Interactive TechText Glyph Canvas:** Interactive physics-driven intro headline with dashed letter reveals, real-time bounding box inspection, and spring physics.
- **🛫 Mechanical Split-Flap Text Display:** Airport-style split-flap flip display cycling through core engineering pillars (`PRODUCTION-GRADE`, `HIGH-THROUGHPUT`, `FAULT-TOLERANT`, `MISSION-CRITICAL`, `ENTERPRISE-SCALE`).
- **🏛️ Interactive Architecture Deep Dive:** Inspect actual backend code flows for HireIQ's prompt orchestration (`AnalysisService.java`), stateless JWT security chain (`JwtAuthFilter.java`), and transaction-safe ORM persistence (`FormDAOImpl.java`).
- **🃏 Inspira-UI CardStack:** Sticky scroll-animated card stack highlighting verified projects: [HireIQ](https://hireiq.neerad.tech/) (Razorpay AI BuildAthon 2026), Urban Heat Mitigation (ISRO Hackathon 2026), Student Login Portal, and Google Forms Clone.
- **✉️ Working Web3Forms Contact Form:** In-browser contact form delivered straight to inbox (`neeradsramesh@gmail.com`) with honeypot spam protection, client validation, loading state, and build-time fallback.
- **🛹 Silky Smooth Scrolling:** Powered by **Lenis** smooth scroll momentum and synchronized with **GSAP ScrollTrigger**.
- **🌊 Codex-Reveal ASCII Canvas:** Subtle interactive fluid simulation on HTML5 canvas with automated idle conservation.
- **🧪 Floating Liquid Glass Navbar:** Glassmorphism navigation with active section detection and accessible mobile drawer.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, Vite 6, HTML5, Vanilla CSS Design System |
| **Motion & Physics** | Framer Motion 14, GSAP 3 (ScrollTrigger), Lenis Smooth Scroll |
| **Backend & Systems (Featured)** | Java 17/21, Spring Boot 3.x, Spring Security, JWT, MySQL 8.0, Hibernate ORM, JUnit 5, Mockito |
| **Form Delivery** | Web3Forms API (Static-friendly email submissions) |
| **CI/CD & Hosting** | GitHub Actions, GitHub Pages (with relative `./` base path) |

---

## 📁 Project Structure

```text
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg               # Scalable brand vector favicon
│   ├── og-image.png              # 1200x630 Open Graph sharing preview
│   ├── robots.txt                # Search engine crawler directives
│   ├── sitemap.xml               # Canonical sitemap
│   └── Neerad_S_Ramesh_Resume.pdf# Downloadable resume
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CardStack.jsx     # Sticky stacked project cards
│   │   │   ├── CodexReveal.jsx   # Interactive ASCII fluid canvas
│   │   │   ├── DynamicScrollBackground.jsx # Framer-style ambient morph
│   │   │   ├── GlassSurface.jsx  # Liquid glassmorphism wrapper
│   │   │   ├── ScrollFloat.jsx   # GSAP scroll reveal headers
│   │   │   ├── SmoothScroll.jsx  # Lenis + GSAP scroll engine
│   │   │   └── SplitFlapText.jsx # Airport split-flap mechanical flip board
│   │   ├── About.jsx             # Story, education, and engineering pillars
│   │   ├── ArchitectureShowcase.jsx # System architecture & real code viewer
│   │   ├── Contact.jsx           # Web3Forms contact form & copy email tool
│   │   ├── Education.jsx         # NIT Srinagar academics & credentials
│   │   ├── Footer.jsx            # Socials and back-to-top navigation
│   │   ├── Hero.jsx              # Hero with eyebrow, headline & verified stats
│   │   ├── Icons.jsx             # SVG icons (GitHub, etc.)
│   │   ├── Navbar.jsx            # Floating glass navbar with mobile drawer
│   │   ├── ProjectModal.jsx      # Modal specs viewer for featured projects
│   │   ├── Projects.jsx          # Featured systems & secondary repositories
│   │   └── Skills.jsx            # Categorized skills matrix
│   ├── data/
│   │   └── portfolioData.js      # Centralized facts, projects, and skills
│   ├── App.jsx                   # Main layout and composition
│   ├── index.css                 # Design system tokens and styles
│   └── main.jsx                  # React 19 application entry
├── .env.example                  # Environment variables template
├── .gitignore                    # Excluded files & directories
├── index.html                    # SEO metadata, Open Graph, fonts
├── package.json                  # Dependencies, scripts, and repository info
├── vite.config.js                # Vite build config with manual chunking
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neerad079/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional for local contact form):**
   ```bash
   cp .env.example .env
   ```
   Add your Web3Forms access key in `.env`:
   ```env
   VITE_WEB3FORMS_KEY=your_web3forms_key_here
   ```
   *(If not set, the contact form automatically displays a direct `mailto:` fallback so the site is never broken).*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Create a production build:**
   ```bash
   npm run build
   ```

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to GitHub Pages

This repo includes an automated GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Step 1: Add Web3Forms Key as a GitHub Secret
1. Go to [https://web3forms.com](https://web3forms.com) and enter `neeradsramesh@gmail.com` to receive your free access key.
2. In your GitHub repository:
   - Click **Settings** (top tab).
   - In the left sidebar, click **Secrets and variables** → **Actions**.
   - Click **New repository secret**.
   - Name: `VITE_WEB3FORMS_KEY`
   - Secret: *paste your Web3Forms key*
   - Click **Add secret**.

### Step 2: Configure GitHub Pages Source
1. In your GitHub repository, click **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**.

### Step 3: Push to Deploy
Every push to `main` will automatically build the site with your secret and publish it to:
**https://neerad079.github.io/Portfolio/**

---

## 🏷️ GitHub Repository Metadata Suggestions

To optimize discovery and SEO on GitHub:

- **Repository Description:**
  > Personal developer portfolio of Neerad S Ramesh — Java & Spring Boot Developer. Built with React 19, Vite, Framer Motion, and GSAP.

- **Website URL:**
  > `https://neerad079.github.io/Portfolio/`

- **Repository Topics (Tags):**
  `portfolio`, `developer-portfolio`, `java`, `spring-boot`, `react`, `vite`, `mysql`, `rest-api`, `framer-motion`, `gsap`, `lenis`

---

## 👤 Author

**Neerad S Ramesh**  
- **Website:** [https://neerad079.github.io/Portfolio/](https://neerad079.github.io/Portfolio/)  
- **GitHub:** [@Neerad079](https://github.com/Neerad079)  
- **Email:** [neeradsramesh@gmail.com](mailto:neeradsramesh@gmail.com)  
- **College:** National Institute of Technology, Srinagar  
