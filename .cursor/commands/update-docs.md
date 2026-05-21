# Actualizar documentación (Notas de Política)

Usar cuando el usuario pida **actualizar la documentación**, **sincronizar README** o invoque este comando.

## Dónde vive cada cosa

| Tipo | Ubicación |
| --- | --- |
| **Documentación del proyecto** | `docs/` (arquitectura, temas, desarrollo) |
| **Presentación del repo** | `README.md`, `README.EN.md` (breve + enlaces a `docs/`) |
| **Comandos del agente** | `.cursor/commands/` |
| **Notas publicadas del sitio** | `src/features/{tema}/content/` — **no** mover a `docs/` |

**No** crear README ni guías largas dentro de `src/`. Solo código y contenido publicado.

## Fuentes de verdad (revisar antes de escribir)

| Área | Dónde mirar |
| --- | --- |
| Temas y grupos | `src/lib/temas/registry.ts`, `docs/temas.md` |
| Rutas | `src/app/page.tsx`, `src/app/[tema]/`, `docs/arquitectura.md` |
| Markdown publicado | `src/features/*/content/`, `src/lib/content/docs.ts` |
| Nav por tema | `src/features/{tema}/config.ts` |
| Nav global | `src/lib/temas/navigation.ts` |
| Hubs TSX | `src/lib/temas/hubs.tsx`, `src/features/*/*Hub.tsx` |
| UI | `src/components/` |
| Scripts | `package.json`, `docs/desarrollo.md` |
| Tooling | `eslint.config.mjs`, `.prettierrc`, `next.config.ts` |

Ignorar restos en raíz (`content/`, `app/`, `lib/` sueltos) si aparecen.

## Archivos a mantener

| Archivo | Rol |
| --- | --- |
| `docs/README.md` | Índice de `docs/` |
| `docs/arquitectura.md` | Rutas, features, resolver |
| `docs/temas.md` | Tabla de temas (alineada con registry) |
| `docs/contenido-del-sitio.md` | Dónde escribir `.md` publicados |
| `docs/desarrollo.md` | Scripts, env, build |
| `README.md` / `README.EN.md` | Resumen + enlaces a `docs/` |
| `.cursor/commands/auto-commits.md` | Commits |
| Este archivo | Guía del comando |

## README (ES y EN)

Mantener **cortos**: descripción, enlace a `docs/`, quick start, árbol mínimo.  
Detalle de arquitectura, temas y URLs → **`docs/`**, no duplicar páginas enteras en README.

Secciones sugeridas:

1. Título + enlace al otro idioma
2. Enlace a **`docs/`**
3. Características (bullets)
4. Inicio rápido (`pnpm install`, `pnpm dev`)
5. Estructura resumida (docs + src/features)
6. Licencia y autor

## Cuándo actualizar `docs/temas.md`

Si cambia `src/lib/temas/registry.ts` (nuevo tema, título, grupo).

## Cuándo actualizar `docs/contenido-del-sitio.md`

Si cambian convenciones de rutas, frontmatter o tabla de contenido migrado.

## Commits

Usar `.cursor/commands/auto-commits.md` — tipo `docs`, scope `readme` o `setup` según el bloque.

## Resumen para el agente

- **`docs/`** = documentación del proyecto.
- **`src/features/*/content/`** = notas del sitio (contenido público).
- **Borrar** cualquier `.md` de documentación que aparezca en `src/` (salvo contenido publicado y ejemplo en `_template/content/`).
- README ES + EN en par; detalle en `docs/`.
