# Political Notes

[Version en español](./README.md)

Personal notes on **politics, philosophy**, and related topics (history, society, ideas), built with [Next.js](https://nextjs.org).

![Screenshot](./public/screenshot.png)

## Features

- **Light/dark theme**: Selector in the navigation bar (system preference by default)
- **Sidebar**: Visible on all pages, including the main one
- **Search**: Filter by page title and description
- **Navigation**: Organized by sections (General, Countries, Philosophy, Statistics, Projects)
- **Responsive**: Layout adapts to mobile and desktop
- **Static export**: Ready for Vercel, GitHub Pages, or other static hosting

## Project structure

```text
/
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/
│   ├── content/docs/       # Markdown content
│   └── lib/
├── public/
└── package.json
```

## Technologies

| Technology | Use |
| --- | --- |
| [Next.js](https://nextjs.org) | Framework (App Router, static export) |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| [next-themes](https://github.com/pacocoursey/next-themes) | Light/dark theme |
| pnpm | Package manager |

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output is written to `out/`.

## Content

- **General**: Comparative study between Colombia and reference countries
- **Countries**: Notes by region (South America, Asia)
- **Philosophy**: Ethics, ideologies, political theory and critical thought
- **Statistics**: Population data and more
- **Projects**: Ideas, advice and proposals

## Information

**License:** Apache 2.0

**Author:** Fravelz
