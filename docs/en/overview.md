# Project documentation

**Web Prosperity** is a space for the **pursuit of a nation’s prosperity**, explored in a broad sense (politics, philosophy, economics, geopolitics, and data).

All **technical and architecture** documentation for this repository in English lives here.  
Application code is in `src/`. **Published site notes** (Markdown visitors see) are in `src/features/*/content/`, not in this folder.

## Index

| Document                             | Contents                                   |
| ------------------------------------ | ------------------------------------------ |
| [architecture.md](./architecture.md) | Routes, features, page resolver, folders   |
| [topics.md](./topics.md)             | Catalog of 25 topics and landing groups    |
| [site-content.md](./site-content.md) | Where to write published Markdown and URLs |
| [development.md](./development.md)   | Scripts, environment, lint, build, deploy  |

## Quick reference

- **Where does a new note go?** → `src/features/{topic}/content/` ([site-content.md](./site-content.md))
- **What topics exist?** → `src/lib/temas/registry.ts` and [topics.md](./topics.md)
- **How to create a topic?** → [architecture.md](./architecture.md) + `src/features/_template/`

## Outside `docs/`

| File                                         | Role                                  |
| -------------------------------------------- | ------------------------------------- |
| [README.md](../../README.md)                 | Repo presentation (ES)                |
| [README.EN.md](../../README.EN.md)           | Repo presentation (EN)                |
| [.cursor/commands/](../../.cursor/commands/) | Agent commands (commits, update docs) |
