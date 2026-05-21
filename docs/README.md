# Documentación del proyecto

Toda la documentación **técnica y de arquitectura** del repositorio vive aquí.  
El código de la aplicación está en `src/`. Las **notas públicas del sitio** (Markdown que se publican) están en `src/features/*/content/`, no en esta carpeta.

## Índice

| Documento | Contenido |
| --- | --- |
| [arquitectura.md](./arquitectura.md) | Rutas, features, resolver de páginas, carpetas |
| [temas.md](./temas.md) | Catálogo de los 25 temas y grupos de la landing |
| [contenido-del-sitio.md](./contenido-del-sitio.md) | Dónde escribir notas Markdown y URLs |
| [desarrollo.md](./desarrollo.md) | Scripts, entorno, lint, build y despliegue |

## Lectura rápida

- **¿Dónde va una nota nueva?** → `src/features/{tema}/content/` ([contenido-del-sitio.md](./contenido-del-sitio.md))
- **¿Qué temas existen?** → `src/lib/temas/registry.ts` y [temas.md](./temas.md)
- **¿Cómo crear un tema?** → [arquitectura.md](./arquitectura.md) + `src/features/_template/`

## Fuera de `docs/`

| Archivo | Rol |
| --- | --- |
| [README.md](../README.md) | Presentación del repo (ES) |
| [README.EN.md](../README.EN.md) | Presentación del repo (EN) |
| [.cursor/commands/](../.cursor/commands/) | Comandos del agente (commits, actualizar docs) |
