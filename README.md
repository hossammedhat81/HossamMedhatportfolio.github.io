# Hossam Medhat — Personal Portfolio

**Junior Data Scientist | Freelancing Instructor**

> Transforming Data into Insights | Empowering Freelancers to Succeed

Live: [https://hossammedhatportfolio.github.io](https://hossammedhatportfolio.github.io)

---

## Overview

A modern single-page portfolio website for **Hossam Medhat**, showcasing data science projects, professional experience, services, and achievements. The design theme is inspired by the KERO portfolio reference (dark teal/gold aesthetic with Satoshi font and smooth animations).

---

## Sections

| # | Section        | Description |
|---|---------------|-------------|
| 1 | **Hero**       | Professional headline, tagline, CTA buttons, animated stats |
| 2 | **About**      | Extended bio, USP highlight cards |
| 3 | **Education**  | Mansoura University details, graduation project |
| 4 | **Skills**     | 5 categories — Core DS, ML, Advanced, Tools, Soft Skills |
| 5 | **Experience** | 4 positions in a vertical timeline |
| 6 | **Services**   | 5 service offerings (analysis, viz, modeling, coaching, training) |
| 7 | **Projects**   | 5 featured projects with metrics and GitHub links |
| 8 | **Achievements** | 8 achievement cards (awards, certifications, milestones) |
| 9 | **Testimonials** | 5 testimonials (3 LinkedIn from e& Egypt colleagues + 2 Khamsat reviews) |
| 10 | **Contact**   | Contact form, phone/email/location, social links, availability badge |

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, responsive breakpoints
- **JavaScript** (vanilla) — Loading screen, mobile nav, scroll-to-top, stat counters, scroll-reveal animations, active nav highlighting, form handling
- **Font Awesome 6** — Icons
- **Satoshi** (FontShare) + **Protest Guerrilla** (Google Fonts) — Typography

---

## Design System (CSS Variables)

```css
--bg-color:       #071c24     /* Dark teal background   */
--accent:         #ffc760     /* Gold accent             */
--text-color:     #cff8ff     /* Light cyan text         */
--box-bg:         #103f52     /* Card/box background     */
--section-alt-bg: #0a2630     /* Alternating section bg  */
--radius-lg:      1.5rem      /* Standard card radius    */
```

---

## File Structure

```
Hossam/
├── index.html                  # Main single-page portfolio
├── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── style.css           # Complete stylesheet
│   ├── js/
│   │   └── main.js             # All interactive features
│   └── resume/
│       └── Hossam_Medhat_CV.pdf  # (add your CV here)
└── images/
    ├── profile.jpg             # (add your profile photo here)
    └── projects/
        ├── project-01-mini-rag.png
        ├── project-02-expresso-churn.png
        ├── project-03-pima-diabetes.png
        ├── project-04-credit-segmentation.png
        └── project-05-crashxpert.png
```

---

## Setup & Deployment

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/hossammedhat81/hossammedhatportfolio.github.io.git
   cd hossammedhatportfolio.github.io
   ```

2. Add your profile image as `images/profile.jpg`

3. Add your CV as `assets/resume/Hossam_Medhat_CV.pdf`

4. Add project screenshots to `images/projects/`:
   - `project-01-mini-rag.png` — Streamlit interface (1200×800px, <200KB)
   - `project-02-expresso-churn.png` — Churn dashboard with AUC score
   - `project-03-pima-diabetes.png` — DEPI graduation project
   - `project-04-credit-segmentation.png` — K-means clustering visualization
   - `project-05-crashxpert.png` — IoT device or IEEE award photo

5. Open `index.html` in any browser (no build step needed)

### GitHub Pages Deployment

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch** → `main` / `root`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

---

## Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| ≥ 2000px  | Extra-large screens (font-size: 22px) |
| ≥ 1440px  | Large screens (font-size: 18px) |
| ≤ 1023px  | Tablet — stacked layout |
| ≤ 768px   | Mobile — hamburger nav, single-column grids |
| ≤ 450px   | Small mobile — compact spacing |

---

## Contact Form Integration

The contact form currently shows a success message on submit. To connect to a real backend:

- **Formspree:** Change form action to `https://formspree.io/f/YOUR_ID`
- **EmailJS:** Add EmailJS SDK and configure in `main.js`
- **Custom API:** Update the fetch call in `main.js` contact form handler

---

## License

© 2026 Hossam Medhat. All rights reserved.
