# Web Prosperity · Prosperidad

[English Version](./README.EN.md)

**Demo / Lab editorial** — archivo en construcción para explorar la prosperidad de una nación (política, filosofía y temas afines) con [Next.js](https://nextjs.org). **No es un producto mid** ni un think-tank publicado completo.

![Captura de pantalla](./src/app/opengraph-image.png)

## Honestidad (L7)

- **Bloque foco:** Fundamentos ([docs/es/block-fundamentos.md](./docs/es/block-fundamentos.md)).
- **Publicado** = nota ≥800 palabras + ≥2 URLs en Fuentes; el % real se muestra en la landing.
- **Three.js retirado** del build ([ADR 0001](./docs/adr/0001-drop-threejs.md)); mapas con MapLibre.
- La mayoría de apartados están *En preparación*; no vendas «25 temas maduros».

## Documentación del proyecto

Toda la documentación técnica está en **[docs/es/overview.md](./docs/es/overview.md)** ([versión en inglés](./docs/en/overview.md)).

## Características

- Catálogo temático en 7 bloques con badges honestos (*Con contenido* / *En preparación* / *Próximamente*)
- **Landing** con progreso editorial real (fracción y %)
- Arquitectura por features (`src/features/{tema}/`) con hubs TSX y notas Markdown
- Rutas dinámicas `/{tema}` y `/{tema}/...`
- Tema claro/oscuro (`next-themes`)
- Mapa MapLibre (orientación) + comparador de indicadores (Recharts)
- Export estático (`output: 'export'` → `out/`)
- Docs técnicas bilingües; skip-to-content en shells

## Tecnologías

| Área      | Stack                                                                         |
| --------- | ----------------------------------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) · [React 19](https://react.dev) |
| Lenguaje  | [TypeScript](https://www.typescriptlang.org)                                  |
| Estilos   | [Tailwind CSS 4](https://tailwindcss.com) · tokens CSS por tema               |
| Contenido | `gray-matter` · `react-markdown` · `remark-gfm`                               |
| UI        | `next-themes` · [Lucide](https://lucide.dev) · `clsx` / `tailwind-merge`      |
| Mapas     | [MapLibre GL](https://maplibre.org) (sin Three.js)                            |
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
├── docs/adr/             # decisiones (p. ej. drop Three.js)
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
| **Proyecto** | Demo editorial / Lab — notas en construcción; foco en profundidad de un bloque |
| **Autor**    | Fravelz                                                                     |
| **Licencia** | [Apache License 2.0](./LICENSE)                                             |

Detalle de arquitectura, temas, contenido y despliegue: [docs/es/overview.md](./docs/es/overview.md).
