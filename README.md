np# Omkar Aware — DevOps Engineer Portfolio

A cinematic, interactive personal portfolio for **Omkar Santosh Aware**, an aspiring DevOps Engineer. Built with React, TypeScript, Tailwind CSS and Framer Motion. Original design and illustration — inspired by the *interaction quality* of character-based portfolio sites, but implemented entirely from scratch with original code and an original SVG character.

---

## 1. Project structure

```
src/
├── components/
│   ├── Navigation/        Floating glass nav + mobile fullscreen menu
│   ├── Hero/               Cinematic hero: title, character stage, CTAs
│   ├── Character/          Original SVG-illustrated DevOps engineer
│   ├── SkillCards/          Orbiting skill cards (desktop) + mobile ticker
│   ├── About/               "Who am I" + animated terminal panel
│   ├── Experience/          Timeline of work experience
│   ├── Skills/               Categorized skills grid (01–05)
│   ├── DevSecOpsProject/     Animated CI/CD → DevSecOps pipeline
│   ├── TechStack/            Hover-to-animate tech stack
│   ├── Education/            Vertical education timeline
│   ├── Contact/               Terminal-style contact block
│   ├── Footer/
│   ├── Cursor/                Custom cursor (desktop only)
│   └── shared/                 Glyph icon set + SectionHeading
│
├── data/                 Single source of truth for all content
│   ├── profile.ts        Name, contact info, summary, resume path
│   ├── skills.ts          Hero card skills + categorized skill groups
│   ├── experience.ts
│   ├── project.ts          Pipeline stages + highlights
│   └── education.ts
│
├── animations/            Reusable Framer Motion variants
│   ├── heroAnimations.ts
│   ├── scrollAnimations.ts
│   └── cardAnimations.ts   Orbiting card slot/cycle config
│
├── hooks/
│   ├── useReducedMotion.ts
│   └── useMediaQuery.ts
│
├── App.tsx
└── main.tsx

public/
└── resume/
    └── PLACE_RESUME_HERE.txt   ← replace with your real resume PDF
```

Every section is a standalone component; `App.tsx` only composes them in order.

---

## 2. Install & run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 3. Build for production

```bash
npm run build
```

This runs a TypeScript project build (`tsc -b`) followed by `vite build`, and outputs static files to `dist/`. Verified to build cleanly with zero type errors.

To preview the production build locally:

```bash
npm run preview
```

---

## 4. How the hero character animation works

`src/components/Character/Character.tsx` is a single layered SVG (no external image assets): a server rack and cloud node drift gently in the background (`float` keyframes), while the character group has a subtle "breathing" scale animation and a blinking terminal-cursor accent on the laptop screen. All motion is driven by Framer Motion and automatically disabled when the OS-level "reduce motion" setting is on (`useReducedMotion` hook).

The whole hero also has scroll-linked parallax (`useScroll` + `useTransform` in `Hero.tsx`): the character drifts down and the text content fades/moves up slightly as you scroll past the hero.

## 5. How the skill-card animation works

`src/animations/cardAnimations.ts` defines three **slots** positioned around the character (`cardSlots`), each with its own depth (affecting scale/opacity/blur) and rotation. `src/components/SkillCards/SkillCards.tsx` cycles an `offset` index on an interval (`CARD_CYCLE_MS`, currently 2.6s) and maps `heroSkills` (from `src/data/skills.ts`) into those three slots. Framer Motion's `AnimatePresence` handles the enter/exit transitions per slot (diagonal movement, scale, blur, fade) so cards feel like they're drifting through the scene rather than swapping in a flat carousel.

On mobile (`< 640px` / `sm` breakpoint), the orbiting cards are replaced by `MobileSkillTicker.tsx`, a single centered card that cycles through the same data — this keeps the hero readable on small screens instead of overlapping cards on the character.

## 6. Where to modify skills

Edit `src/data/skills.ts`:

- `heroSkills` — the array that cycles through the hero's floating cards. Add/remove/reorder entries here; the animation adapts automatically.
- `skillCategories` — the 5 categorized groups (Automation, Containers, Cloud, DevSecOps, Systems) shown in the **Skills** section, each item has a `level` of `"Working knowledge"` or `"Basics"` which controls the badge shown.
- `additionalConcepts` — the pill list of concepts (DevOps, CI/CD, Jira, etc.) shown beneath the skill grid.

Each skill's `glyph` field selects an icon from `src/components/shared/Glyph.tsx`. Available glyph keys: `jenkins`, `docker`, `kubernetes`, `aws`, `sonarqube`, `trivy`, `zap`, `github`, `git`, `maven`, `terminal`, `network`, `test`, `deploy`, `cloud`, `code`.

## 7. Where to replace the character/visual assets

The character is pure SVG code inside `Character.tsx` — there are no external image files to swap. To restyle it:

- Colors are defined via `<linearGradient>`/`<radialGradient>` defs at the top of the SVG (`hoodie`, `skin`, `screenGrad`, `deskGrad`) — edit the stop colors there.
- Shapes (head, torso, arms, laptop, desk, background server/cloud) are plain `<path>`/`<rect>`/`<circle>` elements — adjust coordinates directly, or replace the whole `<motion.svg>` contents with your own illustration if you have one (keep the `viewBox="0 0 640 720"` or adjust proportions accordingly).
- If you'd rather use a real illustrated/photographed character asset, drop the image into `src/assets/` and replace the contents of `Character.tsx` with an `<img>`/`<motion.img>` tag, keeping the same wrapping `<div>` so layout and the orbiting cards still align.

## 8. Where to put your resume PDF

Add your resume file at:

```
public/resume/Omkar-Aware-Resume.pdf
```

(Delete the placeholder `PLACE_RESUME_HERE.txt` once added — optional.) All "Download Resume" buttons across the site (nav, hero, mobile menu, contact section) link to `profile.resumePath` in `src/data/profile.ts`, which is already set to `/resume/Omkar-Aware-Resume.pdf`. No code changes needed — just add the file with that exact name.

## 9. Content — single source of truth

All personal/resume content lives in `src/data/`:

- `profile.ts` — name, title, tagline, location, email, phone, LinkedIn, GitHub, summary
- `experience.ts` — role history
- `project.ts` — DevSecOps pipeline stages + highlights
- `education.ts` — degrees

To update contact details, wording, or resume content, edit these files — the whole site (nav, hero, contact section, etc.) reads from them, so nothing needs to be changed in multiple places.

---

## 10. Design notes

- **Palette:** near-black base (`#07080B`) with electric blue / cyan / violet accents, soft green for "hands-on" / success states, and amber for "basics" / caution — deliberately restrained rather than a generic neon-cyberpunk look.
- **Type:** Space Grotesk (display/headings), Inter (body), JetBrains Mono (labels, terminal UI, eyebrows).
- **Motion:** scroll-triggered reveals (`whileInView`), a scroll-linked hero parallax, the orbiting skill-card cycle, hover-activated tech-stack animations, and a glowing pulse traveling through the DevSecOps pipeline. All motion respects `prefers-reduced-motion`.
- **Accessibility:** semantic sectioning, visible focus states (`:focus-visible`), keyboard-reachable nav and buttons, decorative SVGs are non-intrusive to screen readers, and the custom cursor is disabled on touch devices and when reduced motion is requested.

---

## 11. Assets you may want to supply separately

Nothing is required to run the site — everything except the resume PDF is already in place. Optional additions:

- `public/resume/Omkar-Aware-Resume.pdf` — your real resume (see §8)
- If you want a real photo/illustration instead of the generated SVG character, add it under `src/assets/` (see §7)
- An Open Graph / social preview image, if you want link previews to show a custom card (add e.g. `public/og-image.png` and reference it with a `<meta property="og:image">` tag in `index.html`)
