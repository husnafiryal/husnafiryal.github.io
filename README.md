# DevOps Engineer Portfolio - Husna Firyal Az-Zahra (Una)

Welcome! This repository hosts the source code for my professional DevOps Engineer portfolio, live at [husnafiryal.github.io](https://husnafiryal.github.io).

It is designed to showcase my technical capabilities, containerized case studies, CI/CD pipeline implementations, and system triage experience in an interactive, responsive layout.

---

## 🚀 Key Features

*   **Cinematic Dark Theme UI**: Styled with glassmorphism cards, teal glows, amber accents, and custom vertical flowchart styling.
*   **Interactive Case Study Slider**: Loopable carousel showcasing 5 distinct DevOps projects with expandable details ("View Case Study") to ensure readability without causing page layout jumps.
*   **Auto-Collapse Observers**: Integrated vanilla JS `IntersectionObserver` that automatically collapses open details when changing slides or scrolling into the **Experience** section.
*   **DevOps Best-Practice Deployment**: Managed by a custom GitHub Actions CI/CD workflow that automatically builds and deploys staged production assets to GitHub Pages on every push.

---

## 📂 Project Structure

```bash
├── .github/workflows/
│   └── deploy.yml      # CI/CD GitHub Actions Workflow (stages assets & deploys to Pages)
├── index.html          # Core markup (semantic HTML5, case-studies structure)
├── style.css           # Custom stylesheets (glassmorphism grid, transitions, mask vignette)
├── app.js              # Carousel logic, swipe listeners, scroll observers
├── profile.jpg         # Hero section background profile image
└── .gitignore          # Ignores development backups and environment configurations
```

---

## 🛠️ Tech Stack & Tooling

*   **Markup & Styling**: Semantic HTML5, Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Mask Image)
*   **Interactions**: Vanilla ES6 JavaScript (IntersectionObserver API, Swipe Gestures)
*   **CI/CD & Hosting**: GitHub Actions, GitHub Pages
