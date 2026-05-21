# Actualizar documentación (Notas de Política)

Usar cuando el usuario pida **actualizar la documentación**, **sincronizar README**, **revisar docs** o invoque este comando. El objetivo es que `README.md` y `README.EN.md` reflejen el **código real** del repositorio, en **español e inglés** con la misma estructura.

## Cuándo ejecutar

- El usuario invoca este comando o pide explícitamente actualizar documentación.
- Tras cambios grandes de arquitectura, rutas, features, tema, scripts o despliegue.
- **No** editar README ni otros docs si el usuario no lo pidió (salvo que este comando sea la petición).

## Fuentes de verdad (revisar siempre antes de escribir)

Explorar el repo; **no** confiar solo en el README existente.

| Área            | Dónde mirar                                              |
| --------------- | -------------------------------------------------------- |
| Rutas y páginas | `src/app/**/page.tsx`, `src/app/not-found.tsx`           |
| UI              | `src/components/`                                        |
| Contenido MD    | `src/content/docs/`                                      |
| Navegación/SEO  | `src/lib/navigation.ts`, `src/app/layout.tsx`            |
| Lectura de docs | `src/lib/docs.ts`                                        |
| Utilidad `cn`   | `src/lib/utils.ts`                                       |
| Estilos y tema  | `src/app/globals.css`                                    |
| Alias `@/*`     | `tsconfig.json` → `./src/*`                              |
| Export estático | `next.config.ts` (`output: 'export'`)                    |
| Scripts npm     | `package.json`                                           |
| ESLint/Prettier | `eslint.config.mjs`, `.prettierrc`, `.prettierignore`    |
| Env de ejemplo  | `.env.example`                                           |
| Comandos Cursor | `.cursor/commands/`                                      |

**Importante:** el código de aplicación vive **solo** bajo `src/`. Si existen copias sueltas en la raíz (`app/`, `components/`, `content/`, `lib/`), son restos de migración — **no** documentarlas ni usarlas como fuente de verdad.

## Archivos de documentación a mantener

| Archivo                            | Idioma | Rol                                      |
| ---------------------------------- | ------ | ---------------------------------------- |
| `README.md`                        | ES     | Documentación principal                  |
| `README.EN.md`                     | EN     | Misma estructura que el README en español |
| `.cursor/commands/auto-commits.md` | ES     | Convenciones de commit                   |
| `.cursor/commands/update-docs.md`  | ES     | Este comando                             |

## Descripción actual del producto (baseline)

**Notas de Política** — sitio de documentación estática con notas sobre política, filosofía y temas afines.

**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Markdown (`react-markdown`, `remark-gfm`), frontmatter (`gray-matter`), pnpm, export estático → carpeta `out/`.

**Rutas de contenido** (archivos en `src/content/docs/`, rutas en `src/lib/navigation.ts`):

| Ruta URL                    | Archivo Markdown                          |
| --------------------------- | ----------------------------------------- |
| `/`                         | `index.md`                                |
| `/general`                  | `general.md`                              |
| `/filosofia`                | `filosofia/index.md`                      |
| `/estadistica/poblacion`    | `estadistica/poblacion.md`                |
| `/proyectos/general`        | `proyectos/general.md`                    |
| `/paises/suramerica/...`    | `paises/suramerica/{colombia,ecuador}.md` |
| `/paises/asiaticos/...`     | `paises/asiaticos/{china,corea-del-sur}.md` |

Al añadir páginas nuevas, actualizar **tres sitios**: Markdown, `navigation.ts` y README (ES + EN).

**Transversal:**

- Tema claro/oscuro (`ThemeToggle`, `next-themes`, `data-theme`)
- Sidebar + búsqueda por título/descripción (`DocsSearch`, índice en `docs.ts`)
- SEO: `siteConfig` en `src/lib/navigation.ts` + metadata en `src/app/layout.tsx`
- Prettier + `prettier-plugin-tailwindcss`; ESLint (`eslint-config-next`, `eslint-config-prettier`)

## Estructura del proyecto (referencia actualizada)

```text
/
├── src/
│   ├── app/
│   │   ├── [[...slug]]/page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   ├── content/docs/
│   └── lib/
├── public/
│   ├── favicon.svg
│   └── screenshot.png
├── .env.example
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Convención:** todo el código de aplicación bajo `src/`; `public/` y configs en la raíz. **No** versionar `.next/` ni `out/` (ya en `.gitignore`).

## Secciones obligatorias en README (ES y EN)

1. Título + enlace al otro idioma
2. Descripción breve + screenshot (`public/screenshot.png`) + stack
3. **Características** / **Features**
4. **Estructura del proyecto** (árbol bajo `src/`)
5. **Desarrollo** — `pnpm install`, `pnpm dev`, lint/format
6. **Build** — `pnpm build` → `out/` (export estático)
7. **Variables de entorno** — `NEXT_PUBLIC_SITE_URL` (ver `.env.example`)
8. **Contenido** — secciones del sitio (alineadas con `navigation.ts`)
9. **Información** — licencia, autor

## Scripts a documentar

| Comando             | Descripción                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Desarrollo (`next dev`, puerto 3000)             |
| `pnpm build`        | Build estático → `out/`                          |
| `pnpm start`        | `next start` (definido en `package.json`)        |
| `pnpm lint`         | ESLint                                           |
| `pnpm lint:fix`     | ESLint con fix                                   |
| `pnpm format`       | Prettier                                         |
| `pnpm format:check` | Comprobar Prettier                               |

Con `output: 'export'`, el artefacto desplegable es **`out/`**. Si el README menciona previsualizar el build, indicar un servidor estático sobre `out/` (p. ej. `npx serve out`) cuando `next start` no aplique al flujo de export.

## Reglas de redacción

- **Español** en `README.md`; **inglés** en `README.EN.md`; mismas secciones y orden.
- No inventar features que no existan en el código.
- El código manda; el README se adapta.
- No mencionar Astro ni Starlight salvo en notas históricas breves (el proyecto migró a Next.js).

## Commits de documentación

Si el usuario pide commit, usar `.cursor/commands/auto-commits.md` con tipo `docs` y scope acorde (`readme`, `setup`, `cursor`, `content`, …).

## Resumen para el agente

- Código de app bajo **`src/`**; contenido Markdown en **`src/content/docs/`**.
- Sidebar y README deben coincidir con **`src/lib/navigation.ts`**.
- Actualizar **siempre en par** ES + EN.
- Ignorar carpetas duplicadas en la raíz del repo si aparecen.
- Este archivo es la guía del comando; no sustituye a los README públicos.
