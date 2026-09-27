# YashFolio — Developer Portfolio 🚀

My personal portfolio, told as a story in six scroll-driven chapters.

## 🌐 Live Demo

🔗 [Visit Portfolio](https://yashpokharna.com/)

---

## 📖 The chapters

| # | Chapter | What happens |
|---|---------|--------------|
| 00 | Prologue | WebGL aurora + particle field; the name glitches in, then explodes on scroll |
| 01 | Origin | A pinned paragraph that lights up word by word as you scroll, plus counting stats |
| 02 | Journey | A pinned timeline — the year rolls like an odometer while milestone cards stack |
| 03 | Works | Horizontal scroll through projects with clip reveals, parallax and velocity skew |
| 04 | Toolbox | Marquees that speed up and reverse with your scroll, and a hoverable skills list |
| 05 | Next Chapter | Contact, sliding text, socials and the footer wordmark |

## 🛠️ Tech Stack

- **Next.js** (pages router) + **React** + **TypeScript**
- **GSAP 3.13** — ScrollTrigger, ScrollSmoother, SplitText, ScrambleText
- **Tailwind CSS** + **Sass**
- Raw **WebGL** shader for the hero background

## ✏️ Editing content

Everything textual — story, journey milestones, projects, skills, links — lives in
[`constants.ts`](constants.ts). Project screenshots go in `public/projects/`.

## 🚀 Getting Started

```bash
npm install
npm run dev
```
