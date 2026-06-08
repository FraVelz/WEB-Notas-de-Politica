# Arquitectura

## Rutas (App Router)

| Ruta | Tipo | Origen en código |
| --- | --- | --- |
| `/` | TSX | `src/features/inicio/InicioPage.tsx` |
| `/{tema}` | TSX (hub) | `src/features/{tema}/*Hub.tsx` o `DefaultTemaHub` |
| `/{tema}/...` | Markdown o TSX | `src/features/{tema}/content/**` o `pages/` |

Catálogo de `{tema}`: `src/lib/temas/registry.ts`.

## Estructura `src/`

```text
src/
├── app/
│   ├── page.tsx                 # /
│   ├── [tema]/page.tsx          # hub del tema
│   └── [tema]/[...slug]/page.tsx   # al menos un segmento (no opcional)
├── components/                  # shell, Markdown, tema, búsqueda
├── features/
│   ├── _template/               # copiar al crear un tema
│   ├── inicio/
│   └── {tema}/                  # un folder por entrada del registry
│       ├── config.ts            # sidebar del tema
│       ├── {Nombre}Hub.tsx      # opcional
│       ├── content/             # notas publicadas (.md)
│       ├── pages/               # TSX bajo el tema
│       └── assets/
└── lib/
    ├── content/docs.ts          # lectura de Markdown por feature
    └── temas/
        ├── registry.ts
        ├── navigation.ts
        ├── paths.ts
        └── hubs.tsx
```

`/[tema]` y `/[tema]/[...slug]` no pueden ser ambos `[[...slug]]` opcional: Next.js los trata como la misma especificidad. Por eso el hub va en `[tema]/page.tsx` y las notas en `[tema]/[...slug]/page.tsx` (catch-all **obligatorio**).

## Resolver de página (`/{tema}/...`)

1. ¿Existe página TSX registrada en `config.tsxPages`? → render TSX  
2. ¿Existe `.md` en `features/{tema}/content/`? → `<Markdown />`  
3. Si no → 404  

## Hub del tema (`/{tema}`)

- Hubs personalizados: p. ej. `FilosofiaHub.tsx` (registro en `lib/temas/hubs.tsx`)
- Resto de temas: `DefaultTemaHub` hasta que se implemente un hub propio

## Estilo por apartado (`/{tema}`)

- `src/app/[tema]/layout.tsx` envuelve todo el apartado en `TemaScope`.
- Paletas en escala de grises en `src/lib/temas/skins.ts` (por grupo o `skin` en `registry.ts`; tokens base en `globals.css`).
- Cabecera en `/[tema]`: solo **← Inicio** + toggle de tema (el título va en el hub o la nota).
- `showSidebar: true` en el registry activa el aside de docs (por defecto no se muestra).
- Hub del globo: mapa global con [mapcn](https://mapcn.vercel.app/docs/arcs) (`src/components/ui/map.tsx`, `GloboTerraqueoPoliticoHub.tsx`).
- La landing `/` usa cabecera con el título del sitio.
- Para un look distinto: `skin: 'atlas'` en el registry o edita tokens en `skins.ts`.

## Crear un tema nuevo

1. Añadir entrada en `src/lib/temas/registry.ts`
2. `node scripts/scaffold-all-temas.mjs` o `./scripts/scaffold-tema.sh {id} {PascalName}`
3. Personalizar `config.ts` (sidebar) y opcionalmente `{Nombre}Hub.tsx`
4. Añadir notas en `content/`

Plantilla: `src/features/_template/`.

## Migración histórica (URLs antiguas)

| Antes | Ahora |
| --- | --- |
| `/general` | `/gobierno-y-estructura-politica/general` |
| `/paises/...` | `/relaciones-internacionales-y-geopolitica/paises/...` |
| `/estadistica/poblacion` | `/estadisticas-mundiales/poblacion` |
| `/proyectos/general` | `/politicas-publicas/proyectos/general` |
| `/filosofia` (solo MD) | `/filosofia` (hub TSX) + `/filosofia/introduccion` |
