# Gideon Glago — Full-Stack & AI-Driven Developer Portfolio

Welcome! This repository powers my personal portfolio: a full-stack showcase of projects, experiments and articles that highlight my passion for building performant web applications, robust back-ends and AI-enabled user experiences.

---

## 🚀 Why This Project Exists

I wanted more than a static landing page — I needed a living playground where I can:

1. **Demonstrate technical breadth** (Java \| Spring Boot → React/Next.js → DevOps).
2. **Experiment with modern DX** (Turbopack, Tailwind CSS, React Server Components).
3. **Showcase applied AI** through an in-page "AI Portfolio Assistant" (ChatGPT-style component) and other ML-powered interactions.

> _"Show, don't tell."_ Everything you see here is backed by production-ready code, tests and infrastructure.

---

## 🧰 Tech Stack (Top to Bottom)

| Layer        | Major Tech                                                   | Highlights                                                                                                                        |
| ------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | **Next.js&nbsp;15**, React 19, TypeScript, Tailwind CSS      | Server/Client components, App Router, Framer Motion animations, React Three Fiber 3D scenes, Zustand global state, Zod validation |
| **AI & UX**  | OpenAI API\*, custom embeddings, Lottie, TypeAnimation       | AI Portfolio Assistant, semantic search, dynamic copy/CTA generation                                                              |
| **Back-End** | **Spring Boot 3** (Java 17), Spring Security, JPA/Hibernate  | RESTful API for projects, role-based auth, DTO mapping, validation                                                                |
| **Database** | PostgreSQL 13                                                | Docker-managed, production-grade config                                                                                           |
| **DevOps**   | Docker Compose, Maven, ESLint/TurboPack, GitHub Actions _CI_ | 1-click local bootstrap, automated quality gates & build pipeline                                                                 |

\*AI components are optional and require an `OPENAI_API_KEY` environment variable.

---

## 🗺️ Project Structure

```
Portfolio-3/
├─ backend/                 # Spring Boot application (Maven)
│  └─ src/main/java/...     # Controllers, Services, Config, Models
├─ portfolio/               # Next.js front-end (TypeScript)
│  ├─ src/components/…      # 3D, animations, UI, AI assistant
│  └─ app/…                 # Next 15 App Router pages
├─ docker-compose.yml       # PostgreSQL service
└─ README.md
```

---

## ⚙️ Quick Start

### 1. Prerequisites

- Node \>= 18 & npm ⬦ Java 17 ⬦ Docker

### 2. Clone & Bootstrap

```bash
git clone https://github.com/<your-username>/portfolio-3.git
cd portfolio-3

# Spin up PostgreSQL
docker compose up -d

# Front-end (Next.js)
cd portfolio && npm install && npm run dev

# Back-end (Spring Boot)
cd ../backend && ./mvnw spring-boot:run
```

Web app → `http://localhost:3000` API → `http://localhost:8080/api`.

### 3. (Optional) Enable AI features

```bash
export OPENAI_API_KEY="sk-…"
```

---

## 🔐 Security & Best Practices

- Spring Security with stateless JWT authentication (ready for OAuth).
- ESLint 9 + Tailwind IntelliSense for consistent front-end code.
- Maven & TurboPack incremental builds for fast feedback loops.
- Parameterized queries & validation prevent SQL-i/XSS.

---

## 🖥️ Screenshots

| Landing Page  | AI Assistant  |
| ------------- | ------------- |
| _coming soon_ | _coming soon_ |

---

## 🏗️ Roadmap

- [ ] Dark-mode code editor themed blog section.
- [ ] GPT-generated Q&A search across all project readmes.
- [ ] Kubernetes Helm chart for full deployment.

---

## 🤝 Contact

**Gideon Glago** • [LinkedIn](https://www.linkedin.com/in/gideonglago) • [Email](mailto:gideonglago@gmail.com)

If this portfolio sparks ideas or roles you think I'd be perfect for, let's chat! :)

---

> Crafted with ❤️, caffeine & a dash of AI magic.
