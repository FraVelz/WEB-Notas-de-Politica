# Political Notes

[Version en español](./README.md)

Personal notes on **politics, philosophy**, and related topics, built with [Next.js](https://nextjs.org).

![Screenshot](./public/screenshot.png)

## Project documentation

All technical docs live in **[docs/](./docs/)**:

- [Architecture and features](./docs/arquitectura.md)
- [Topic catalog](./docs/temas.md)
- [Published site content](./docs/contenido-del-sitio.md)
- [Development and deploy](./docs/desarrollo.md)

## Features

- **Light/dark theme**
- **One feature folder per topic** (`src/features/{topic}/`) with TSX hub and Markdown notes
- **Landing** at `/` with grouped topic index
- **Search** by title and description
- **Static export** (`out/`)

## Quick start

```bash
pnpm install
pnpm dev
```

See [docs/desarrollo.md](./docs/desarrollo.md) for build, lint, and env vars.

## Structure (summary)

```text
/
├── docs/           # project documentation (not public site content)
├── src/features/   # per-topic folders + content/ for published notes
├── src/app/
└── public/
```

## Information

**License:** Apache 2.0 · **Author:** Fravelz
