# 💼 Next-Gen AI Job Board

[![CI/CD Pipeline](https://github.com/rahulgurudu-2003/ai-job-board/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/rahulgurudu-2003/ai-job-board/actions/workflows/ci-cd.yml)
[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://ai-job-board-taupe.vercel.app/)
[![Backend Host](https://img.shields.io/badge/Backend%20on-Render-indigo?logo=render)](https://ai-job-board-backend-zmpj.onrender.com/)

A modern, highly polished, full-stack Job Board platform designed to streamline hiring. Featuring user authentication, advanced multi-category job searches, saved jobs, live application tracking, and an **AI-driven ATS Resume Scorer**.

* **Live Frontend URL:** [https://ai-job-board-taupe.vercel.app/](https://ai-job-board-taupe.vercel.app/)
* **Live API Server:** [https://ai-job-board-backend-zmpj.onrender.com/](https://ai-job-board-backend-zmpj.onrender.com/)

---

## 🛠️ Architecture & Technology Stack

This application is built with a decoupled monorepo architecture, prioritizing separation of concerns, scalability, type safety, and clean code.

```
ai-job-board/
├── backend/            # Django REST API (Gunicorn, DRF, SQLite/Postgres)
├── src/                # React (TypeScript, Redux Toolkit, Tailwind CSS)
└── .github/            # GitHub Actions CI/CD workflows
```

### Frontend Technology Selection
* **React 19 & TypeScript:** Provides robust compiler safety and strict typing across core interfaces.
* **Redux Toolkit:** Centralized state management for global configurations, user authentication session states, and dashboard updates.
* **React Router v7:** Clean client-side routing, protected auth routes, and route-level state handling.
* **Tailwind CSS:** Modern utility-first design system customized with CSS variables for responsive theme management.
* **Sonner & Lucide React:** High-fidelity UI icons and sleek toast notification queues.

### Backend Technology Selection
* **Django 5.x & Django REST Framework (DRF):** Robust API engine supplying rapid development, security defaults, and integrated user model structure.
* **Simple JWT (JSON Web Tokens):** Standardized secure authentication, complete with sliding session refresh mechanisms.
* **Pillow & Media Storage:** Handles secure, isolated file uploads for user avatars and PDF resumes.

---

## 🌟 Key Features

### 🔒 1. JWT-secured Authentication & Profiles
* Complete user registration with real-time profile picture and PDF resume file uploads.
* Safe user sign-in utilizing short-lived access tokens and long-lived refresh tokens stored securely on the client.
* Profile settings dashboard supporting real-time image file updates, resume replacements, and GitHub profile integration.

### 🔍 2. Job Search Dashboard & Filters
* Instant job search with debounce-driven querying.
* Interactive filters allowing users to narrow down jobs by **Job Type** (Full-time, Part-time, Remote, Contract, Internship) and **Experience Level** (Entry, Mid, Senior, Executive).

### 🤖 3. ATS Resume Optimizer
* Interactive resume parser that extracts technical skills and scores your alignment (out of 100) against modern tech roles.
* Scans for missing key-terms, listing recommended keywords (e.g. AWS, CI/CD, Docker) to optimize resume search-ranking.
* Supplies an automated AI Checklist suggesting improvements to resume formatting, language, and styling.

### 📁 4. Application Tracking & Saved Jobs
* One-click applications that automatically attach the candidate's active resume.
* Live status board (`Applied`, `Interviewing`, `Accepted`, `Rejected`) indicating submission date and recruitment progress.
* Bookmarking functionality to save promising jobs in a personalized dashboard for later review.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.x or higher
* **Python:** v3.11 or higher

### Local Frontend Setup
1. From the project root, install all node dependencies:
   ```bash
   npm install
   ```
2. Spin up the Vite development server:
   ```bash
   npm run dev
   ```
3. The frontend is accessible at `http://localhost:5173`.

### Local Backend Setup
1. Navigate into the `backend/` directory:
   ```bash
   cd backend
   ```
2. Establish and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install required backend libraries:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers Pillow gunicorn
   ```
4. Run migrations to initialize the local SQLite database:
   ```bash
   python manage.py migrate
   ```
5. Run the server:
   ```bash
   python manage.py runserver
   ```
6. The API is hosted locally at `http://127.0.0.1:8000/api/`.

---

## 🚀 CI/CD Pipeline

We implemented a full-scale **CI/CD Pipeline** using GitHub Actions:
* **CI (Continuous Integration):** Triggered on every pull request and push to the `main` branch. Validates code compilation, checks type safety, and verifies Vite build bundles.
* **CD (Continuous Deployment):** On successful CI passing, triggers a secure automated deploy directly to **Vercel** utilizing repository environment keys.
