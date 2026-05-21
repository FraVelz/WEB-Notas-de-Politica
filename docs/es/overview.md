# Documentación del proyecto

Toda la documentación **técnica y de arquitectura** del repositorio en español vive aquí.  
El código de la aplicación está en `src/`. Las **notas públicas del sitio** (Markdown que se publican) están en `src/features/*/content/`, no en esta carpeta.

## Índice

| Documento                            | Contenido                                       |
| ------------------------------------ | ----------------------------------------------- |
| [architecture.md](./architecture.md) | Rutas, features, resolver de páginas, carpetas  |
| [topics.md](./topics.md)             | Catálogo de los 25 temas y grupos de la landing |
| [site-content.md](./site-content.md) | Dónde escribir notas Markdown y URLs            |
| [development.md](./development.md)   | Scripts, entorno, lint, build y despliegue      |

## Lectura rápida

- **¿Dónde va una nota nueva?** → `src/features/{tema}/content/` ([site-content.md](./site-content.md))
- **¿Qué temas existen?** → `src/lib/temas/registry.ts` y [topics.md](./topics.md)
- **¿Cómo crear un tema?** → [architecture.md](./architecture.md) + `src/features/_template/`

## Fuera de `docs/`

| Archivo                                      | Rol                                            |
| -------------------------------------------- | ---------------------------------------------- |
| [README.md](../../README.md)                 | Presentación del repo (ES)                     |
| [README.EN.md](../../README.EN.md)           | Presentación del repo (EN)                     |
| [.cursor/commands/](../../.cursor/commands/) | Comandos del agente (commits, actualizar docs) |
