# Web Prosperity

This document is in English. [Versión en español](./README.md)

**Demo / Lab editorial** — a work-in-progress archive exploring a nation’s prosperity (politics, philosophy, and related topics) with [Next.js](https://nextjs.org). **Not a mid-level product** and not a finished think-tank.

![Screenshot](./src/app/opengraph-image.png)

## Honesty (L7)

- **Focus block:** Fundamentos / Foundations ([docs/es/block-fundamentos.md](./docs/es/block-fundamentos.md)).
- **Published** = note ≥800 words + ≥2 source URLs in Fuentes; real % on the landing.
- **Three.js removed** from the build ([ADR 0001](./docs/adr/0001-drop-threejs.md)); maps use MapLibre.
- Most sections are *In progress* — do not pitch “25 mature topics”.

## Project documentation

All technical docs live in **[docs/en/overview.md](./docs/en/overview.md)** ([Spanish version](./docs/es/overview.md)).

## Features

- Topic catalog in 7 groups with honest badges (*With content* / *In progress* / *Coming soon*)
- **Landing** shows real editorial progress (fraction and %)
- Feature-based architecture (`src/features/{topic}/`) with TSX hubs and Markdown notes
- Dynamic routes `/{topic}` and `/{topic}/...`
- Light/dark theme (`next-themes`)
- MapLibre map (orientation) + indicator comparator (Recharts)
- Static export (`output: 'export'` → `out/`)
- Bilingual docs; skip-to-content on shells

## Technologies

| Area      | Stack                                                                         |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) · [React 19](https://react.dev) |
| Language  | [TypeScript](https://www.typescriptlang.org)                                  |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com) · per-topic CSS tokens              |
| Content   | `gray-matter` · `react-markdown` · `remark-gfm`                               |
| UI        | `next-themes` · [Lucide](https://lucide.dev) · `clsx` / `tailwind-merge`      |
| Maps      | [MapLibre GL](https://maplibre.org) (no Three.js)                             |
| Quality   | ESLint · Prettier · `react-doctor`                                            |
| Packages  | [pnpm](https://pnpm.io)                                                       |

## Quick start

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) — build, lint, and env vars: [development.md](./docs/en/development.md).

## Structure (summary)

```text
/
├── docs/es/overview.md   # technical docs (Spanish)
├── docs/adr/             # decisions (e.g. drop Three.js)
├── src/
│   ├── app/              # App Router routes (/, /[topic], /[topic]/...)
│   ├── features/         # one folder per topic + content/ for .md notes
│   ├── components/
│   └── lib/temas/        # registry.ts, navigation, skins
└── public/
```

## Information

|             |                                                                       |
| ----------- | --------------------------------------------------------------------- |
| **Project** | Editorial Demo / Lab — notes under construction; depth over coverage  |
| **Author**  | Fravelz                                                               |
| **License** | [Apache License 2.0](./LICENSE)                                       |

Architecture, topics, content, and deploy details: [docs/en/overview.md](./docs/en/overview.md).
