# Ademi Tergenbaeva — Portfolio & Demi Results

Premium portfolio website for **Адеми Тергенбаева** — dermatologist, entrepreneur, and founder of **Demi Results** brand in Bishkek, Kyrgyzstan.

## Tech Stack

- **Next.js 16** — App Router, TypeScript
- **TailwindCSS v4** — Utility-first styling with custom theme
- **Framer Motion** — Scroll-triggered reveals, spring animations
- **Recharts** — Animated line graph on story page
- **Lucide React** — Icon system

## Features

- **Trilingual** — Russian / English / Kyrgyz with animated language switcher
- **Responsive** — Mobile-first design with hamburger menu
- **Story Page** — Horizontal swipe storytelling with 10 slides + 9 Demi Values + animated graph
- **Ambient Animations** — Card breathing, gold shimmer, floating particles, spinning rings
- **Social Cards** — Organic water-fill hover effect with clip-path
- **SEO Ready** — Open Graph metadata

## Project Structure

```
app/
├── page.tsx                 # Main portfolio page
├── story/page.tsx           # "How it started" storytelling page
├── layout.tsx               # Root layout with fonts & metadata
├── globals.css              # Tailwind theme + keyframe animations
├── context.tsx              # Language provider (React Context)
├── types.ts                 # TypeScript interfaces
└── components/
    ├── Navbar.tsx            # Fixed nav + mobile menu
    ├── LangSwitcher.tsx      # RU/EN/KG pill switcher
    ├── Hero.tsx              # Full-screen hero with rings
    ├── About.tsx             # Bio section with photo
    ├── Store.tsx             # Demi Results brand section
    ├── Profile.tsx           # Professional profile cards
    ├── Team.tsx              # Team section
    ├── Activity.tsx          # Activities list
    ├── Mission.tsx           # Mission & values
    ├── Social.tsx            # Social media cards
    ├── StoryCTA.tsx          # CTA to story page
    ├── Contact.tsx           # Contact buttons
    └── Footer.tsx            # Footer with credits

public/data/
├── text/                    # JSON data files (RU/EN/KG)
├── photo/                   # Main photos & logos
└── story/                   # Story page slide images
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Or connect this repo to [Vercel](https://vercel.com) for automatic deployments on push.

## Color Palette

| Color | Hex |
|-------|-----|
| Navy | `#001e3c` |
| Gold | `#c9a96e` |
| Cream | `#f0ede6` |
| Milk | `#faf8f4` |
| Dark | `#060d16` |

## Fonts

- **Great Vibes** — Cursive name display
- **Cormorant Garamond** — Serif headings
- **Jost** — Sans-serif body text

## Credits

- **Portfolio owner:** Адеми Тергенбаева
- **Development:** [Alihan Torebekov](https://alihan-torebekov.kg/)
