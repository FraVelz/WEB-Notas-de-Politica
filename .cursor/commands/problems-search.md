# Auditoría global de problemas (`/problems-search`)

## Cuándo ejecutar

- El usuario invoca **`/problems-search`** o pide una **búsqueda / auditoría global** de problemas que puedan afectar la web.
- No implica corregir nada salvo que el usuario lo pida después; el objetivo primero es **inventariar y priorizar**.

## Objetivo

Recorrer el proyecto de forma **sistemática**, desde lo **más global y crítico** hasta lo **más local y menor impacto**, y entregar un informe ordenado por **prioridad** (no por carpeta al azar).

Considerar siempre el **impacto en producción** (usuarios, SEO, seguridad, build/CI, i18n, rendimiento, accesibilidad) y la **probabilidad** de que el problema ocurra en la web desplegada.

## Qué debe hacer el asistente

1. **Ejecutar comprobaciones automáticas** cuando sea posible (sin saltar hooks ni alterar git config):
   - `pnpm run lint`
   - `pnpm run build` con `NEXT_PUBLIC_SITE_URL=https://fravelz.vercel.app` (como en CI)
   - Opcional si aporta valor: `pnpm run format:check`
2. **Revisar el código y la configuración** según las áreas del apartado «Factores y prioridades» (abajo).
3. **No inventar problemas**: cada hallazgo debe citar archivo/ruta o salida de comando; si algo es hipótesis, marcarlo como *posible* y qué comprobaría.
4. **Respetar reglas del repo** al evaluar estructura (p. ej. `.cursor/rules/component-scope.mdc`).
5. **No commitear ni pushear** salvo petición explícita del usuario.

## Factores y prioridades (de mayor a menor)

Usar esta escala en el informe:

| Nivel | Etiqueta | Criterio orientativo |
| ----- | -------- | -------------------- |
| **P0** | Crítico | Rompe build, CI, despliegue, rutas principales, seguridad grave o pérdida de funcionalidad visible. |
| **P1** | Alto | SEO/metadata roto, i18n incompleto en rutas públicas, errores runtime probables, accesibilidad que bloquea uso, regresión clara de UX. |
| **P2** | Medio | Lint/types, rendimiento notable, duplicación, incumplimiento de convenciones del repo, deuda que facilita bugs. |
| **P3** | Bajo | Estilo, nombres, docs desactualizadas, mejoras opcionales, nitpicks sin impacto inmediato en usuarios. |

### 1. Global e infraestructura (P0–P1)

- **Build y CI**: `.github/workflows/ci.yml`, scripts en `package.json`, lockfile, variables de entorno necesarias en build (p. ej. `NEXT_PUBLIC_SITE_URL`).
- **Config Next**: `next.config.ts`, `src/proxy.ts`, rutas bajo `src/app/`, `not-found`, redirecciones de idioma.
- **Secretos y env**: `.env` en git, `.env.example` vs uso real, valores hardcodeados sensibles.
- **Dependencias**: versiones obsoletas con CVE conocidos (mencionar solo si hay evidencia razonable).

### 2. Rutas, App Router y datos (P0–P1)

- Rutas rotas o inconsistentes (`[lang]`, `projects/[slug]`, `certifications`).
- `generateStaticParams` / params inválidos.
- Datos en `src/utils/data/` (proyectos, certificados): slugs, URLs, imágenes faltantes, idiomas `es` / `en` / `ru` / `zh` desalineados.
- Imports rotos o referencias a assets inexistentes.

### 3. i18n y contenido público (P1)

- JSON en `public/locals/`, `getTranslations`, claves faltantes entre idiomas.
- Textos hardcodeados en UI que deberían traducirse.
- Selector de idioma y rutas por locale.

### 4. SEO, metadata y URL pública (P1)

- `generateMetadata`, `metadataBase` en `layout.tsx`, Open Graph, `sitemap.ts`, `robots.txt`.
- `getSiteUrl()` / `NEXT_PUBLIC_SITE_URL` coherentes entre entornos.
- Imágenes OG/twitter y rutas absolutas correctas.

### 5. Rendimiento y experiencia (P1–P2)

- Bundles pesados, GSAP/animaciones sin respeto a `prefers-reduced-motion`.
- Imágenes sin optimizar, LCP, hidratación innecesaria (`"use client"` de más).
- Scripts de terceros o bloqueo del hilo principal.

### 6. Accesibilidad (P1–P2)

- Contraste, foco visible, teclado, `aria-*`, labels en formularios (`contact`), modales (PDF, búsqueda).
- Iconos decorativos vs informativos, jerarquía de encabezados.

### 7. UI, layout y arquitectura (P2)

- Componentes en `src/components/` que solo usa una feature (regla **component-scope**).
- Duplicación entre `features/` y `app/_components/`.
- Estilos globales (`globals.css`) vs módulos CSS locales.

### 8. Calidad de código y mantenimiento (P2–P3)

- ESLint/TypeScript (vía lint y build).
- Código muerto, exports sin uso, TODOs antiguos.
- Inconsistencias con `docs/es/structure.md` y documentación EN/ES.

### 9. Detalle y pulido (P3)

- Prettier/formato, nombres de archivos, comentarios obsoletos, pequeñas mejoras de copy o UX sin riesgo.

## Formato del informe (obligatorio)

Responder en **español**, con esta estructura:

```markdown
## Resumen ejecutivo
- X críticos (P0), Y altos (P1), …
- 1–3 frases: qué duele más y qué conviene atacar primero.

## P0 — Crítico
- [ ] **Título breve** — archivo/ruta — impacto — sugerencia de fix (1 línea)

## P1 — Alto
…

## P2 — Medio
…

## P3 — Bajo
…

## Comprobaciones ejecutadas
- Lista de comandos corridos y si pasaron o fallaron.

## Sin hallazgos relevantes
- Áreas revisadas donde no se detectó nada (opcional, breve).
```

- Máximo **~15–25 ítems** con impacto real; agrupar nitpicks en un solo bullet en P3 si hay muchos.
- Si no hay P0/P1, decirlo explícitamente y destacar el siguiente paso recomendado (p. ej. solo P2 de estructura).

## Resumen para el agente

- Auditoría **de lo global a lo específico**, multi-factor, priorizada P0→P3.
- Evidencia con rutas y salidas de comandos; hipótesis marcadas como tales.
- Informe estructurado; **no** aplicar fixes masivos sin que el usuario lo pida.
