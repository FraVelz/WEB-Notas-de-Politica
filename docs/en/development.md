# Development and deployment

## Requirements

- Node.js 18+
- pnpm

## Commands

| Command | Description |
| --- | --- |
| `pnpm install` | Dependencies |
| `pnpm dev` | Local server [http://localhost:3000](http://localhost:3000) |
| `pnpm build` | Static export → `out/` folder |
| `pnpm start` | `next start` (per `package.json`) |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier (+ Tailwind class order) |
| `pnpm react:doctor` | React diagnostics (`react-doctor --full --verbose`) |

## Environment variables

Copy `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Static build

`next.config.ts` uses `output: 'export'`. Deployable artifact is **`out/`**.

Preview after build:

```bash
npx serve out
```

## Tooling

| File | Use |
| --- | --- |
| `eslint.config.mjs` | ESLint (Next + TypeScript + Prettier) |
| `.prettierrc` | Prettier + `prettier-plugin-tailwindcss` |
| `postcss.config.mjs` | Tailwind CSS v4 |
| `tsconfig.json` | Alias `@/*` → `./src/*` |

## Maintenance scripts

| Script | Use |
| --- | --- |
| `scripts/scaffold-tema.sh {id} {Pascal}` | Create feature from `_template` |
| `scripts/scaffold-all-temas.mjs` | Create `config.ts` and folders for registry topics |

## Git ignore

`.next/`, `out/`, `node_modules/`, `.env.local`
