# Published site content

Notes visitors see **do not** go in `docs/`. They go in:

```text
src/features/{tema}/content/
```

Example: `src/features/filosofia/content/introduccion.md` → URL `/filosofia/introduccion`.

## Frontmatter

```yaml
---
title: Page title
description: Summary for SEO and search
---
```

## Internal links

Always use the topic prefix:

```markdown
[Colombia](/relaciones-internacionales-y-geopolitica/paises/suramerica/colombia)
[Overview](/gobierno-y-estructura-politica/general)
```

## Images

Place in `src/features/{tema}/assets/` and reference with a relative path, or from `public/` if global.

## Sidebar

After adding pages, update `src/features/{tema}/config.ts` (`nav`) so they appear in that topic’s sidebar.

## Content with routes today

| Topic | Files |
| --- | --- |
| `inicio` | `content/bienvenida.md` |
| `filosofia` | `content/introduccion.md` |
| `gobierno-y-estructura-politica` | `content/general.md` |
| `relaciones-internacionales-y-geopolitica` | `content/paises/**` |
| `estadisticas-mundiales` | `content/poblacion.md` |
| `politicas-publicas` | `content/proyectos/general.md` |
