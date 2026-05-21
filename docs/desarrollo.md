# Desarrollo y despliegue

## Requisitos

- Node.js 18+
- pnpm

## Comandos

| Comando | Descripción |
| --- | --- |
| `pnpm install` | Dependencias |
| `pnpm dev` | Servidor local [http://localhost:3000](http://localhost:3000) |
| `pnpm build` | Export estático → carpeta `out/` |
| `pnpm start` | `next start` (según `package.json`) |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier (+ orden de clases Tailwind) |
| `pnpm react:doctor` | Diagnóstico React (`react-doctor --full --verbose`) |

## Variables de entorno

Copiar `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

## Build estático

`next.config.ts` usa `output: 'export'`. El artefacto desplegable es **`out/`**.

Previsualizar tras build:

```bash
npx serve out
```

## Tooling

| Archivo | Uso |
| --- | --- |
| `eslint.config.mjs` | ESLint (Next + TypeScript + Prettier) |
| `.prettierrc` | Prettier + `prettier-plugin-tailwindcss` |
| `postcss.config.mjs` | Tailwind CSS v4 |
| `tsconfig.json` | Alias `@/*` → `./src/*` |

## Scripts de mantenimiento

| Script | Uso |
| --- | --- |
| `scripts/scaffold-tema.sh {id} {Pascal}` | Crear feature desde `_template` |
| `scripts/scaffold-all-temas.mjs` | Crear `config.ts` y carpetas para temas del registry |

## Ignorar en Git

`.next/`, `out/`, `node_modules/`, `.env.local`
