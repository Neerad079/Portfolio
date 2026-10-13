# Neerad S Ramesh — Personal Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**Full-Stack & Backend Systems Developer**  
CS Undergraduate at the **National Institute of Technology (NIT), Srinagar**  
Specializing in **Java 21**, **Spring Boot 3.x**, **React 19**, and Distributed Architectures.

[🌐 Live Website (neerad.tech)](https://neerad.tech) • [💼 GitHub Profile](https://github.com/Neerad079) • [📄 Resume](https://neerad.tech/Neerad_S_Ramesh_Resume.pdf)

</div>

---

## ⚡ Highlights & Interactive Features

- **🌊 Codex-Reveal ASCII Fluid Simulation:** An interactive 2D wave-equation physics simulation rendered on HTML5 canvas with ASCII matrix characters. Reacts dynamically to cursor movement, mouse clicks, and scroll gestures with automated idle CPU conservation.
- **🎨 Framer-Style Dynamic Scroll Background:** Continuous background atmosphere that shifts smoothly between calibrated palettes (*Obsidian Ember → Midnight Slate → Tech Sapphire → Carbon Emerald → Cyber Violet → Warm Bronze → Crimson Obsidian*) as visitors journey through sections.
- **🛫 Mechanical Split-Flap Text Display:** Airport-style split-flap flip display cycling through core engineering pillars (`PRODUCTION-GRADE`, `HIGH-THROUGHPUT`, `FAULT-TOLERANT`, `MISSION-CRITICAL`, `ENTERPRISE-SCALE`).
- **✨ Soothing Headline Entrance:** Ethereal initial load animation featuring soft Gaussian blur dissolution, staggered reveals, and silky cubic-bezier deceleration curves.
- **🛹 Buttery Smooth Scrolling:** Powered by **Lenis** smooth scroll momentum, synchronized in lockstep with **GSAP ScrollTrigger** and **Framer Motion**.
- **🏛️ Interactive Architecture Deep Dive:** Live architectural blueprint explorer detailing authentication chains, reactive AI prompt pipelines, and database transaction boundaries.
- **🃏 Inspira UI CardStack:** Interactive sticky card stack showcasing production projects with stack metrics and live GitHub links.
- **🧪 Liquid Glass Navigation:** Floating glassmorphism navbar with refractive border lighting and section indicators.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, Vite 6, HTML5, Vanilla CSS Design System |
| **Motion & Physics** | Framer Motion 14, GSAP 3 (ScrollTrigger), Lenis Smooth Scroll |
| **Visual FX** | HTML5 Canvas 2D Wave Equation, SVG Filters, Glassmorphism |
| **Backend & Systems (Featured)** | Java 21, Spring Boot 3.x, Spring Security, Kafka, Redis, Docker, PostgreSQL |
| **Deployment** | GitHub Actions, GitHub Pages, Vercel ready |

---

## 📁 Project Structure

```text
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD
├── public/
│   └── Neerad_S_Ramesh_Resume.pdf # Downloadable resume
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── CodexReveal.jsx   # Interactive ASCII fluid canvas
│   │   │   ├── DynamicScrollBackground.jsx # Framer-style color morph
│   │   │   ├── GlassSurface.jsx  # Liquid glassmorphism component
│   │   │   ├── SmoothScroll.jsx  # Lenis + GSAP scroll engine
│   │   │   ├── SplitFlapText.jsx # Mechanical flip text board
│   │   │   ├── ScrollFloat.jsx   # GSAP text scroll animations
│   │   │   └── CardStack.jsx     # Sticky stacked project cards
│   │   ├── About.jsx             # Technical profile & credentials
│   │   ├── ArchitectureShowcase.jsx # System architecture blueprint
│   │   ├── Contact.jsx           # Interactive contact & copy tools
│   │   ├── Education.jsx         # NIT Srinagar & academics
│   │   ├── Footer.jsx            # Socials and closing strip
│   │   ├── Hero.jsx              # Hero section with headline motion
│   │   ├── Icons.jsx             # Custom SVG brand icons
│   │   ├── Navbar.jsx            # Floating liquid glass navbar
│   │   ├── Projects.jsx          # Featured systems showcase
│   │   └── Skills.jsx            # Categorized technical disciplines
│   ├── data/
│   │   └── portfolioData.js      # Centralized profile and project data
│   ├── App.jsx                   # Main layout and composition
│   ├── index.css                 # Lyniq-inspired CSS tokens & typography
│   └── main.jsx                  # React 19 entry point
├── .gitignore                    # Git exclusions
├── index.html                    # SEO, Open Graph & typography fonts
├── package.json                  # Dependencies and metadata
├── vite.config.js                # Vite build configuration (base: './')
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

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Create a production build:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to GitHub Pages

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To activate automated deployment:
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/Neerad079/Portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically build and deploy your portfolio!

---

## 👤 Author

**Neerad S Ramesh**  
- **Website:** [neerad.tech](https://neerad.tech)  
- **GitHub:** [@Neerad079](https://github.com/Neerad079)  
- **Email:** [neeradsramesh@gmail.com](mailto:neeradsramesh@gmail.com)  
- **College:** National Institute of Technology (NIT), Srinagar  

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
