# Autocommit (Conventional Commits — Notas de Política)

Usar cuando el usuario pida **hacer commit** del trabajo actual y quiera mensajes **coherentes con el historial del proyecto**, priorizando **Conventional Commits** y evitando el estilo antiguo de varios prefijos encadenados en una sola línea (`feat: ... feat: ...`).

## Cuándo ejecutar

- El usuario invoca este comando o pide explícitamente **commit** / **autocommit**.
- **No** crear commits si el usuario no lo pidió (regla general del proyecto).

## Antes de commitear (siempre)

En paralelo cuando tenga sentido:

1. `git status` — archivos modificados y sin seguimiento.
2. `git diff` — qué cambió (staged y unstaged).
3. `git log -15 --oneline` — tono y tipos usados recientemente.

**No** incluir en el commit:

- Secretos (`.env`, credenciales, etc.).
- Artefactos de build: `.next/`, `out/` (deben estar ignorados; si aparecen, no añadirlos).
- Copias sueltas en la raíz (`app/`, `components/`, `content/`, `lib/` fuera de `src/`) — el código canónico está en **`src/`**.
- **`Co-authored-by: Cursor`** ni ningún pie de coautoría del agente. Los commits son del autor humano del repo.

## Formas de mensaje (elegir una)

### A) Formato lista — **preferido** si el commit toca **varias áreas** del repo

Cada línea del mensaje (asunto + cuerpo) sigue **exactamente**:

`<type>(<scope>): <acción en imperativo, inglés, sin punto final>`

- **`type`:** `feat`, `fix`, `docs`, `refactor`, `chore`, `build`, etc.
- **`scope`:** zona afectada (ver tabla más abajo).
- **Primera línea:** la que resume mejor el conjunto; es la que muestra `git log --oneline`.
- **Líneas siguientes:** una por **bloque lógico** del diff (misma plantilla). Línea en blanco opcional entre la primera y el resto (Git separa asunto y cuerpo).
- **Sin** párrafos narrativos largos entre líneas; cada línea debe ser autónoma.

Ejemplo (migración + docs):

```text
refactor(frontend): migrate docs site from Astro to Next.js App Router

docs(readme): align bilingual README with src/ layout and scripts
chore(setup): add eslint, prettier, and pnpm workspace config
```

### B) Formato clásico — un commit **pequeño** o un solo tema

Una línea de asunto; cuerpo opcional en **frases completas** (inglés) si hace falta contexto; pies `BREAKING CHANGE:` si aplica.

```text
<type>(<scope opcional>): <descripción breve en imperativo>

Optional body explaining why this change was needed, in full sentences.

BREAKING CHANGE: only if consumers must migrate.
```

Si el `type` ya es `docs` y todo el cambio es genérico, puede usarse **sin** scope: `docs: fix broken links in README`.

---

## Tipos (`type`) — priorizar

| Tipo       | Uso en este repo                                                            |
| ---------- | --------------------------------------------------------------------------- |
| `feat`     | Nueva página, sección de contenido, UI o comportamiento visible.            |
| `fix`      | Corrección de bug o regresión (rutas, tema, búsqueda, build).               |
| `docs`     | `README.md`, `README.EN.md`, comandos en `.cursor/commands/`.               |
| `style`    | Formato, Prettier; sin cambiar lógica.                                      |
| `refactor` | Reestructuración sin cambiar comportamiento observable.                     |
| `perf`     | Rendimiento.                                                                |
| `test`     | Tests (si se añaden).                                                       |
| `build`    | Build, dependencias, `next.config.ts`.                                      |
| `ci`       | CI / despliegue.                                                            |
| `chore`    | `.gitignore`, scripts auxiliares, limpieza de restos de migración.          |

**Evitar** tipos no estándar (`delete:`, `update:` como tipo único). Preferir `refactor:` / `chore:` con descripción clara.

## Scopes (`scope`) — este repositorio

| Scope        | Cuándo usarlo                                              |
| ------------ | ---------------------------------------------------------- |
| `readme`     | `README.md` / `README.EN.md`                               |
| `setup`      | Tooling: ESLint, Prettier, `package.json`, `tsconfig`      |
| `frontend`   | App Router, componentes, estilos, tema                     |
| `content`    | Markdown en `src/content/docs/`                            |
| `navigation` | `src/lib/navigation.ts`, rutas del sidebar                 |
| `search`     | Búsqueda de documentación                                  |
| `seo`        | Metadata, `siteConfig`, Open Graph                         |
| `cursor`     | Comandos o reglas en `.cursor/`                             |
| `deps`       | Solo bump de dependencias                                  |

Otros scopes (`auth`, `learning`, …) solo si el diff lo justifica; no copiar ejemplos de otros proyectos.

## Descripción y estilo

- **Inglés** en asunto y cuerpo del commit.
- Imperativo: _add_, _fix_, _update_, _remove_, no _added_ / _fixes_.
- **~72 caracteres** en la primera línea cuando sea razonable.
- No encadenar `feat: ... feat: ...` en una sola línea (patrón antiguo del historial).

## Ejemplos rápidos (formato clásico)

```text
feat(content): add filosofia introduction page
fix(navigation): correct sidebar link for estadistica section
docs(readme): document static export output in out/
refactor(frontend): extract DocsShell layout wrapper
chore(setup): ignore .next and out build directories
```

## Cómo crear el commit

1. Añadir solo lo necesario: `git add -p` o rutas concretas bajo `src/`, `public/`, configs en raíz.
2. Mensaje con **heredoc** (sin líneas `Co-authored-by` al final):

**Formato lista (varios cambios):**

```bash
git commit -m "$(cat <<'EOF'
docs(readme): tighten main README sections ES/EN

docs(setup): document pnpm scripts and env variables
chore(cursor): sync update-docs and auto-commits commands
EOF
)"
```

**Formato clásico (un tema + cuerpo):**

```bash
git commit -m "$(cat <<'EOF'
feat(seo): add site keywords and Open Graph metadata

Align layout metadata with siteConfig in navigation module.
EOF
)"
```

3. `git status` para verificar.
4. Si un **hook** rechaza el commit: corregir y **nuevo** commit; no usar `--no-verify` salvo petición explícita del usuario.

## Romper compatibilidad (`BREAKING CHANGE`)

```text
feat(content)!: move all docs under src/content/docs

BREAKING CHANGE: Markdown paths outside src/content/docs are no longer read.
```

## Resumen para el agente

- Diff + log antes de redactar.
- Commits que tocan **muchas carpetas** → **formato lista** (`type(scope): acción` por línea).
- Commits **atómicos** → formato clásico o una sola línea lista.
- Mensaje del commit en **inglés**; respuesta al usuario en **español** salvo que pida otro idioma.
- No commitear `.next/`, `out/` ni duplicados de migración en la raíz del repo.
- **Nunca** añadir `Co-authored-by: Cursor` (ni variantes). Si un hook o plantilla lo inserta, quitarlo antes de cerrar el commit.
