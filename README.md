# Web Prosperity · Prosperidad

[English Version](./README.EN.md)

Sitio **Web Prosperity** sobre **prosperidad** en sentido amplio: **política, filosofía** y temas afines, construido con [Next.js](https://nextjs.org).

![Captura de pantalla](./src/app/opengraph-image.png)

## Documentación del proyecto

Toda la documentación técnica está en **[docs/es/overview.md](./docs/es/overview.md)** ([versión en inglés](./docs/en/overview.md)).

## Características

- **25 apartados temáticos** agrupados en 7 bloques (filosofía, geopolítica, economía, datos, etc.) con estados *Con contenido*, *En preparación* y *Próximamente*
- **Landing** en `/` con hero, navegación por anclas y tarjetas por tema
- **Arquitectura por features** — un folder por tema (`src/features/{tema}/`) con hub TSX, sidebar propio y notas en Markdown
- **Rutas dinámicas** `/{tema}` y `/{tema}/...` con resolución automática entre páginas TSX y notas `.md`
- **Tema claro/oscuro** persistente (`next-themes`) con selector en la cabecera
- **Estilo por apartado** — paletas en escala de grises según el grupo del tema
- **Búsqueda** en la documentación de cada tema (título, descripción, URL y apartado)
- **Markdown enriquecido** con tablas, listas y GFM (`react-markdown`, `remark-gfm`)
- **Mapa interactivo** en Estadísticas mundiales (MapLibre GL / [mapcn](https://mapcn.vercel.app/docs))
- **Export estático** (`output: 'export'` → carpeta `out/`) listo para Vercel o GitHub Pages
- **Documentación técnica bilingüe** en `docs/es/` y `docs/en/`

## Tecnologías

| Área      | Stack                                                                         |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) · [React 19](https://react.dev) |
| Lenguaje  | [TypeScript](https://www.typescriptlang.org)                                  |
| Estilos   | [Tailwind CSS 4](https://tailwindcss.com) · tokens CSS por tema               |
| Contenido | `gray-matter` · `react-markdown` · `remark-gfm`                               |
| UI        | `next-themes` · [Lucide](https://lucide.dev) · `clsx` / `tailwind-merge`      |
| Mapas     | [MapLibre GL](https://maplibre.org)                                           |
| Calidad   | ESLint · Prettier · `react-doctor`                                            |
| Paquetes  | [pnpm](https://pnpm.io)                                                       |

## Inicio rápido

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) — build, lint y variables de entorno: [development.md](./docs/es/development.md).

## Estructura (resumen)

```text
/
├── docs/es/overview.md   # documentación técnica (ES)
├── docs/en/overview.md   # documentación técnica (EN)
├── src/
│   ├── app/              # rutas App Router (/, /[tema], /[tema]/...)
│   ├── features/         # un folder por tema + content/ con notas .md
│   ├── components/
│   └── lib/temas/        # registry.ts, navegación, skins
└── public/
```

## Información

|              |                                                                             |
| ------------ | --------------------------------------------------------------------------- |
| **Proyecto** | Sitio de notas personales en construcción; el contenido crece por apartados |
| **Autor**    | Fravelz                                                                     |
| **Licencia** | [Apache License 2.0](./LICENSE)                                             |

Detalle de arquitectura, temas, contenido y despliegue: [docs/es/overview.md](./docs/es/overview.md).
