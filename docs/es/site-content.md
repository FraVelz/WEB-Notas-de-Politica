# Contenido publicado del sitio

Las notas que ven los visitantes **no** van en `docs/`. Van en:

```text
src/features/{tema}/content/
```

Ejemplo: `src/features/filosofia/content/introduccion.md` → URL `/filosofia/introduccion`.

## Frontmatter

```yaml
---
title: Título de la página
description: Resumen para SEO y búsqueda
---
```

## Ensayo (Markdown) vs interactivo (TSX)

- **Markdown** (`content/*.md`): marco conceptual, ejemplos multi-región, sección «qué no sabemos / límites», fuentes.
- **TSX** (`pages/` + registro en `src/lib/temas/tsx-pages.tsx`): comparadores de países, gráficos, timelines.
- Datos mundiales: `public/data/indicators/` (generar con `pnpm data:fetch`).

## Voz epistémica

- Hablar de **tendencias**, **probabilidades** y **escenarios**, no de verdades absolutas.
- Correlación ≠ causalidad. Toda cifra con **fuente + año**.
- Un lector de cualquier país debe poder situar el suyo; no asumir un único «nosotros».
- Usar `ScenarioCallout` / `SourceFooter` en páginas con datos.

## Enlaces internos

Usar siempre el prefijo del tema:

```markdown
[Colombia](/relaciones-internacionales-y-geopolitica/paises/suramerica/colombia)
[Comparativo](/gobierno-y-estructura-politica/general)
```

## Imágenes

Colocar en `src/features/{tema}/assets/` y referenciar con ruta relativa o desde `public/` si son globales.

## Sidebar

Tras añadir páginas, actualizar `src/features/{tema}/config.ts` (`nav`) para que aparezcan en el menú lateral de ese tema.

## Contenido con rutas hoy

| Tema | Archivos |
| --- | --- |
| `inicio` | `content/bienvenida.md` |
| `filosofia` | `content/introduccion.md` |
| `gobierno-y-estructura-politica` | `content/general.md` |
| `relaciones-internacionales-y-geopolitica` | `content/paises/**` |
| `estadisticas-mundiales` | `content/poblacion.md` |
| `politicas-publicas` | `content/proyectos/general.md` |
