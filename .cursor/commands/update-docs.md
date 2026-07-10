# Actualizar un archivo `.md` (Web Prosperity)

Usar cuando el usuario pida **actualizar un documento**, **revisar un `.md`**, **sincronizar el par en otro idioma** o invoque este comando **con la ruta de un archivo**.

## Modos

- **Por defecto / `@` archivos:** ortografía + sync del par bilingüe (según idioma fuente).
- **`sync-en` / "sincronizar a inglés":** tomar `README.md` (y docs ES si aplica) como
  **fuente** y **actualizar o crear** el espejo EN (`README.EN.md` / `README.en.md`). No
  reescribir el ES salvo typos. En el EN, la cabecera debe incluir:
  `This document is in English. [Versión en español](./README.md)`.

## Entrada

- El usuario **debe indicar** el archivo (ruta relativa al repo), por ejemplo:
  - `docs/es/architecture.md`
  - `docs/en/topics.md`
  - `src/features/politicas-publicas/content/proyectos/general.md`
- Si no indica archivo, preguntar cuál antes de continuar.

## Ámbitos del repo

| Tipo | Ubicación | Par en otro idioma |
| --- | --- | --- |
| Documentación del proyecto (ES) | `docs/es/` | `docs/en/` (mismo nombre de archivo) |
| Documentación del proyecto (EN) | `docs/en/` | `docs/es/` (mismo nombre de archivo) |
| Notas publicadas del sitio | `src/features/{tema}/content/` | No hay par automático salvo que exista otro `.md` equivalente acordado por el usuario |

**Regla del proyecto:** todo `.md` en `docs/es/` y `docs/en/` se trata como **generado por IA** (usar flujo IA aunque falte la marca; añadirla al guardar). Las notas en `src/features/.../content/` solo son IA si tienen la marca o el usuario lo indica.

**No** mover notas del sitio a `docs/`. **No** crear guías largas en `src/` fuera de `content/`.

## Marca de contenido generado por IA

Un archivo **es IA** si incluye **al menos una línea** de bloquequote (`>`) con este patrón (mayúsculas/minúsculas flexibles):

```text
> **Generado con IA.** Última actualización: YYYY-MM-DD.
```

Variantes aceptables al detectar (normalizar al guardar al formato de arriba):

- `> Generado con IA.`
- `> Contenido generado por IA.`
- `> *Generado con IA.* Última actualización: …`

**Ubicación recomendada:** al final del archivo, **antes** de `> **Autor:** …` si existe.

### Si el usuario dice que un archivo es IA pero no tiene marca

1. Añadir la línea de marca con **la fecha de hoy** (`YYYY-MM-DD`, zona del usuario o UTC si no se indica).
2. Continuar el flujo **“archivo IA”** (sección siguiente).

### Si el usuario dice que un archivo **no** es IA pero tiene marca

1. Eliminar solo la línea de marca IA (no tocar otras citas `>` del cuerpo).
2. Continuar el flujo **“archivo no IA”**.

## Flujo: archivo **generado por IA**

1. **Leer** el archivo indicado y su **par en el otro idioma** si aplica (`docs/es/X` ↔ `docs/en/X`).
2. **Revisar contra el código** cuando sea documentación de proyecto (ver tabla “Fuentes de verdad” abajo): rutas, temas, scripts, convenciones.
3. **Actualizar el contenido** para que refleje el estado actual del repo (hechos, rutas, tablas, enlaces). Mejorar redacción solo si ayuda a la claridad; no reescribir por gusto.
4. **Corregir** ortografía, gramática y enlaces rotos encontrados.
5. **Actualizar la marca IA** en **ambos** archivos del par (si existe par):
   - `> **Generado con IA.** Última actualización: <fecha de hoy>.`
6. **Sincronizar el otro idioma** con la **misma información factual** (rutas, IDs de temas, comandos, paths de código **sin traducir**; títulos descriptivos en tablas sí pueden traducirse en `docs/en/`).
7. **Frontmatter** (`title`, `description`): alinear sentido entre idiomas si hay par.
8. **Resumen breve** al usuario: qué cambió y qué archivos se tocaron.

## Flujo: archivo **no generado por IA**

1. **Leer** el archivo y su par en el otro idioma si aplica.
2. **Solo** corrección de **ortografía y gramática** (y puntuación obvia). **No** reestructurar, **no** añadir secciones nuevas, **no** “modernizar” el tono del autor.
3. **No** añadir la marca de IA salvo petición explícita del usuario.
4. **Actualizar la versión en el otro idioma**: mismo alcance (solo correcciones equivalentes en el par `docs/es/` ↔ `docs/en/`). Mantener paridad factual; no inventar contenido nuevo.
5. Si el par no existe y el archivo está en `docs/es/` o `docs/en/`, **avisar** al usuario; no crear el par salvo que lo pida.
6. **Resumen breve** al usuario.

## Fuentes de verdad (documentación de proyecto)

| Área | Dónde mirar |
| --- | --- |
| Temas y grupos | `src/lib/temas/registry.ts`, `docs/es/topics.md`, `docs/en/topics.md` |
| Rutas | `src/app/`, `docs/es/architecture.md`, `docs/en/architecture.md` |
| Markdown publicado | `src/features/*/content/`, `src/lib/content/docs.ts`, `docs/es/site-content.md`, `docs/en/site-content.md` |
| Nav por tema | `src/features/{tema}/config.ts` |
| Nav global | `src/lib/temas/navigation.ts` |
| Scripts | `package.json`, `docs/es/development.md`, `docs/en/development.md` |

Ignorar restos sueltos en raíz (`content/`, `app/`, `lib/` fuera de `src/`) si aparecen.

## Contenido publicado (`src/features/.../content/`)

- Revisar enlaces internos con prefijo de tema (`/filosofia/...`, etc.).
- Respetar frontmatter existente.
- Citas o notas al pie con `>` en el cuerpo **no** cuentan como marca IA; solo la línea de **Generado con IA**.
- Si hay `> **Autor:** …`, conservar salvo error ortográfico.

## Commits

**No** commitear salvo petición explícita. Si commitea, usar `.cursor/commands/auto-commits.md` — tipo `docs`, scope acorde al archivo (`content`, `setup`, etc.).

## Resumen para el agente

| Condición | Acción |
| --- | --- |
| Tiene marca `> **Generado con IA.**` | Actualizar contenido + código + par ES/EN + fecha en la marca |
| No tiene marca IA | Solo ortografía/gramática + par ES/EN |
| Usuario: “es IA” | Añadir marca + flujo IA |
| Usuario: “no es IA” | Quitar marca + flujo no IA |
| Archivo en `src/features/.../content/` | Sin par ES/EN por defecto; foco en el archivo indicado |
