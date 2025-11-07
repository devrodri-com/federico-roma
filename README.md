

# Federico Roma — Official Website

A fast, multilingual website for athlete and coach **Federico Roma**. Built with React, TypeScript, Vite, Tailwind CSS, and a11y-friendly components. Deployed as a static site.

Live site: **https://www.federicoroma.com**

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite 6** (dev server and build)
- **Tailwind CSS 3** (+ `@tailwindcss/aspect-ratio`)
- **React Router** for client routes
- **i18next / react-i18next** for EN/ES localization
- **react-helmet-async** for SEO meta tags
- **Framer Motion** for micro-interactions
- **Swiper** and **yet-another-react-lightbox** for media
- **Lucide React** for icons
- ESLint, TypeScript ESLint, and modern config

> Node.js 18+ is recommended.

---

## Getting started

```bash
# 1) Install
npm install

# 2) Run locally
npm run dev
# Vite will print a local URL (e.g., http://localhost:5173)

# 3) Type-check + build for production
npm run build

# 4) Preview the production build
npm run preview

# 5) Lint
npm run lint
```

---

## Project structure

```
.
├─ index.html                 # Document shell + base meta/OG tags
├─ package.json
├─ tailwind.config.js
├─ postcss.config.cjs
├─ public/
│  ├─ favicon.ico / .svg / apple-touch-icon.png / site.webmanifest
│  ├─ images/                # Public images for OG and pages
│  └─ federico-*.jpg         # Hero and gallery assets
└─ src/
   ├─ main.tsx               # App bootstrap + i18n + global CSS
   ├─ App.tsx                # Routes and page composition
   ├─ index.css              # Tailwind base + globals
   ├─ i18n/
   │  ├─ index.ts            # i18n initialization
   │  ├─ en.json             # English strings
   │  └─ es.json             # Spanish strings
   ├─ pages/                 # Top-level routes
   │  ├─ Home.tsx
   │  ├─ About.tsx
   │  ├─ Classes.tsx
   │  ├─ Gallery.tsx
   │  ├─ Testimonials.tsx
   │  ├─ Sponsors.tsx
   │  └─ Contact.tsx
   ├─ components/            # Reusable UI blocks
   │  ├─ Navbar.tsx
   │  ├─ HeroSection.tsx
   │  ├─ AboutSection.tsx
   │  ├─ ClassesSection.tsx
   │  ├─ FedericoSlider.tsx
   │  ├─ TestimonialsSection.tsx
   │  ├─ SponsorsSection.tsx
   │  ├─ GalleryBlock.tsx
   │  ├─ ContactSection.tsx
   │  ├─ TestimonialCard.tsx
   │  ├─ ClassCard.tsx
   │  ├─ SEO.tsx             # Centralized SEO helper
   │  └─ ui/Button.tsx
   └─ types/
      └─ css.d.ts
```

---

## Routing

Client routes are defined in `src/App.tsx` using `react-router-dom`:

- `/` Home (hero, overview sections)
- `/about`
- `/classes`
- `/gallery`
- `/testimonials`
- `/sponsors`
- `/contact`

The `Navbar` and `Footer` render across pages.

---

## Localization (EN/ES)

Strings live in `src/i18n/en.json` and `src/i18n/es.json`. i18n is initialized in `src/i18n/index.ts` and loaded in `src/main.tsx`.

Usage example:

```tsx
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return <h1>{t("hero.subtitle")}</h1>;
};
```

To add a new string:

1. Add the key to both `en.json` and `es.json`.
2. Reference it via `t("path.to.key")`.

---

## Styling

- Tailwind is configured in `tailwind.config.js`, scanning `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
- Custom font family and an extra breakpoint (`moblg: '430px'`) are defined.
- Aspect ratio utilities via `@tailwindcss/aspect-ratio`.

Global CSS lives in `src/index.css`. Prefer utility classes in components.

---

## Media and galleries

- **Swiper** powers carousels and sliders.
- **yet-another-react-lightbox** enables full-screen viewing.
- Put images under `public/images/` and reference with absolute `/images/...` paths.

---

## SEO

Two layers:

1. **Base tags** in `index.html` (title, viewport, icons, OG defaults).
2. **Per-page overrides** via `src/components/SEO.tsx` using `react-helmet-async`.

Example:

```tsx
import SEO from "@/components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About | Federico Roma"
        description="Career highlights, titles, and coaching background."
        image="https://www.federicoroma.com/images/opengraph.jpg"
        url="https://www.federicoroma.com/about"
      />
      {/* page content */}
    </>
  );
}
```

Tips:
- Always provide an absolute `image` URL for OG cards.
- Keep titles ≤ 60 chars and descriptions ~155 chars.

---

## Animations

**Framer Motion** is used for subtle motion. Keep transitions short and accessible. Avoid motion on essential interactions.

---

## Development notes

- Prefer functional components with hooks.
- Keep components presentational; lift data and state up when needed.
- Co-locate small UI elements under `components/ui/`.
- Extract repeated copy into i18n JSON.

---

## Deployment

The site builds to a static `dist/` directory.

Common options:

### Vercel
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects for SPA routing:
  - Create `public/_redirects` with:
    ```
    /*  /index.html  200
    ```

### GitHub Pages
- Build with `npm run build`
- Serve `dist/` via Pages (set the Pages source to “GitHub Actions” or upload artifacts)
- Add the SPA redirect rule if using a static hosting workflow that needs it.

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

---

## Environment variables

No required env vars for the current build. If you add analytics, a contact form, or external APIs, document variables here as:

```bash
VITE_SOME_PUBLIC_KEY=...
```

Note that Vite only exposes variables prefixed with `VITE_` to the client.

---

## Accessibility

- Use semantic elements and proper headings.
- Provide `alt` text for all images in galleries.
- Preserve readable contrast and focus states.
- Respect users who prefer reduced motion.

---

## Contributing

This is a content-driven site. For copy or media changes:

1. Update text in `src/i18n/*.json`.
2. Add or replace images in `public/images/`.
3. Run `npm run dev` and verify layout, i18n, and SEO.

For code contributions, run `npm run lint` and keep components small and typed.

---

## License

- **Code:** MIT (you may change this if you prefer a different license).
- **Content & media:** © Federico Roma. All rights reserved. Do not reuse without permission.

---

## Contact

- Website: **https://www.federicoroma.com**
- Media and booking: use the contact page on the site.
