# Architecture

## Routes (App Router)

| Route | Type | Code source |
| --- | --- | --- |
| `/` | TSX | `src/features/inicio/InicioPage.tsx` |
| `/{tema}` | TSX (hub) | `src/features/{tema}/*Hub.tsx` or `DefaultTemaHub` |
| `/{tema}/...` | Markdown or TSX | `src/features/{tema}/content/**` or `pages/` |

`{tema}` catalog: `src/lib/temas/registry.ts`.

## `src/` layout

```text
src/
├── app/
│   ├── page.tsx                 # /
│   ├── [tema]/page.tsx          # topic hub
│   └── [tema]/[...slug]/page.tsx   # at least one segment (required)
├── components/                  # shell, Markdown, topic, search
├── features/
│   ├── _template/               # copy when creating a topic
│   ├── inicio/
│   └── {tema}/                  # one folder per registry entry
│       ├── config.ts            # topic sidebar
│       ├── {Name}Hub.tsx        # optional
│       ├── content/             # published notes (.md)
│       ├── pages/               # TSX under the topic
│       └── assets/
└── lib/
    ├── content/docs.ts          # Markdown loading per feature
    └── temas/
        ├── registry.ts
        ├── navigation.ts
        ├── paths.ts
        └── hubs.tsx
```

`/[tema]` and `/[tema]/[...slug]` cannot both be optional `[[...slug]]`: Next.js treats them as the same specificity. The hub lives in `[tema]/page.tsx` and notes in `[tema]/[...slug]/page.tsx` (**required** catch-all).

## Page resolver (`/{tema}/...`)

1. TSX page registered in `config.tsxPages`? → render TSX  
2. `.md` in `features/{tema}/content/`? → `<Markdown />`  
3. Otherwise → 404  

## Topic hub (`/{tema}`)

- Custom hubs: e.g. `FilosofiaHub.tsx` (registered in `lib/temas/hubs.tsx`)
- Other topics: `DefaultTemaHub` until a custom hub is added

## Per-section styling (`/{tema}`)

- `src/app/[tema]/layout.tsx` wraps the section in `TemaScope`.
- Grayscale palettes in `src/lib/temas/skins.ts` (by group or `skin` in `registry.ts`; base tokens in `globals.css`).
- Header on `/[tema]`: only **← Home** + theme toggle (title lives in hub or note).
- `showSidebar: false` in the registry hides the aside (e.g. `estadisticas-mundiales`).
- Globe hub: global map via [mapcn](https://mapcn.vercel.app/docs/arcs) (`src/components/ui/map.tsx`, `GloboTerraqueoPoliticoHub.tsx`).
- Landing `/` uses header with site title.
- Different look: `skin: 'atlas'` in the registry or edit tokens in `skins.ts`.

## Creating a new topic

1. Add entry in `src/lib/temas/registry.ts`
2. `node scripts/scaffold-all-temas.mjs` or `./scripts/scaffold-tema.sh {id} {PascalName}`
3. Customize `config.ts` (sidebar) and optionally `{Name}Hub.tsx`
4. Add notes under `content/`

Template: `src/features/_template/`.

## Historical URL migration

| Before | Now |
| --- | --- |
| `/general` | `/gobierno-y-estructura-politica/general` |
| `/paises/...` | `/relaciones-internacionales-y-geopolitica/paises/...` |
| `/estadistica/poblacion` | `/estadisticas-mundiales/poblacion` |
| `/proyectos/general` | `/politicas-publicas/proyectos/general` |
| `/filosofia` (MD only) | `/filosofia` (TSX hub) + `/filosofia/introduccion` |
