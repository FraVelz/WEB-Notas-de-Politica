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
