# Portfolio — Md Abdul Aziz

Single-page interactive portfolio landing page. Light-mode bento-grid design with
scroll-reveal animations, spring physics, and interactive cards.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Structure

```
src/
  data/cv.ts                      # ALL page content — edit this to update the site
  components/
    Navbar.tsx                    # logo + email + animated dropdown menu
    Hero.tsx                      # staggered headline, open-to-work badge, CTA
    BentoCard.tsx                 # shared card shell, chip, stagger variants
    ExperienceCard.tsx            # card 1 — timeline of roles
    ProjectsCard.tsx              # card 2 — fanned project tiles → GitHub
    TechStackCard.tsx             # card 3 — grouped tech pills
    MapCard.tsx                   # card 4 — Potsdam map + relocation radius pill
    ExperienceTabsCard.tsx        # card 5 — "What I Have Experienced" tabs
  App.tsx                         # page assembly + bento grid
```

All content (roles, projects, tech, location, tabs) lives in `src/data/cv.ts`,
sourced from `../cv.md` and `../config/profile.yml` in the career-ops repo.
No content is hardcoded in components.
