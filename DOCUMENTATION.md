# AI-Powered Job Board - Documentation

This document provides a comprehensive overview of the features, architecture, technology stack, and installation instructions for the Next-Gen AI Job Board.

---

## 🚀 Technology Stack

### Frontend
* **Framework:** React 19 (via Vite)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Routing:** React Router v7
* **Styling:** Tailwind CSS (Modern Vanilla CSS Variables integration)
* **Icons:** Lucide React
* **Notifications:** Sonner (Toast notifications)

### Backend
* **Framework:** Django 5.x & Django REST Framework (DRF)
* **Language:** Python 3.11+
* **Database:** SQLite (default for development)
* **Authentication:** Simple JWT (JSON Web Tokens)
* **File Handling:** Django Media files (avatars and PDF resumes)

---

## 🎨 Core Features

### 1. User Authentication & Profile System
* **Secure Auth:** JWT-based user login and registration.
* **Smart Onboarding:** User registration supports uploading a profile avatar (images) and professional resume (PDF, DOC).
* **Profile Management:**
  * View and update personal information (Full Name, Email, GitHub Profile Link).
  * Upload/replace profile pictures with real-time visual previews.
  * Upload/replace resumes.
  * Direct linkage to applicant github profiles.

### 2. Job Browsing & Advanced Filters
* **Search Engine:** Real-time search with responsive query handling.
* **Filtering Sidebar:** Filter jobs instantly by:
  * **Job Type:** Full-time, Part-time, Remote, Contract, Internship.
  * **Experience Level:** Entry Level, Mid Level, Senior Level, Executive.
  * **Location:** Search and filter by cities/countries.
* **Interactive Job Cards:** Clean cards displaying company logos, job title, company name, location, salary range, and tags.

### 3. Job Details & Real-Time Application
* **Detailed Job View:** Dedicated page for each job post showing:
  * Role responsibilities and requirements.
  * Company details (Headquarters, company size).
  * Direct application button.
* **One-Click Apply:** Users can apply to any job instantly using their uploaded profile resume.
* **Track Applications:** Applications page displaying:
  * Job title and company.
  * Date applied.
  * Real-time status tags (`Applied`, `Interviewing`, `Accepted`, `Rejected`).

### 4. Saved Jobs Dashboard
* **Bookmark Roles:** Save/bookmark jobs directly from the search feed or details page.
* **Saved List:** A dedicated dashboard displaying bookmarked jobs with quick options to apply or remove them from bookmarks.

### 5. AI ATS Resume Scorer (ATS Optimizer)
* **Resume Parser:** Upload a PDF/DOC resume to automatically trigger an interactive parser.
* **Match Score:** Generates an ATS alignment score (e.g. 79/100) based on tech parser criteria.
* **Keyword Scan:**
  * **Identified Keywords:** Highlighted technical skills found on the resume (e.g., React, TypeScript, Python).
  * **Recommended Missing Keywords:** List of keywords missing from the resume but highly requested for tech roles (e.g., Docker, CI/CD, AWS).
* **AI Optimizer Checklist:** Actionable tips to format, structure, and optimize the resume for modern automated filters.

### 6. Tech Companies Directory
* **Browse Companies:** Look through leading employers (e.g., Google, Microsoft, Airbnb, Slack, Netflix).
* **Company Profiles:** Dedicated details page showing corporate description, employee size, locations, and open positions.

### 7. Responsive Dark Mode
* **System/Manual Toggle:** Fully supports responsive dark mode switching, storing user preference for seamless sessions.

---

## 🛠️ CI/CD & Deployment

### GitHub Actions
* **Continuous Integration:** Every push or Pull Request to `main` triggers a GitHub Actions pipeline that sets up Node.js, installs dependencies, and runs `npm run build` to verify type safety and compilation.
* **Continuous Deployment:** On successful push to `main`, the build artifacts are compiled and securely pushed to **Vercel** via the Vercel CLI.

---

## 💻 Local Setup & Installation

### Frontend Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers Pillow
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```
