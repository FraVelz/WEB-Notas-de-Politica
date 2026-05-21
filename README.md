# Notas de Política

[English Version](./README.EN.md)

Repositorio de notas personales sobre **política, filosofía** y temas afines, construido con [Next.js](https://nextjs.org).

![Captura de pantalla](./public/screenshot.png)

## Documentación del proyecto

Toda la documentación técnica está en **[docs/](./docs/)**:

- [Arquitectura y features](./docs/arquitectura.md)
- [Catálogo de temas](./docs/temas.md)
- [Contenido publicado del sitio](./docs/contenido-del-sitio.md)
- [Desarrollo y despliegue](./docs/desarrollo.md)

## Características

- **Tema claro/oscuro** con selector en la barra
- **Un feature por tema** (`src/features/{tema}/`) con hub TSX y notas en Markdown
- **Landing** en `/` con índice por grupos (registry)
- **Búsqueda** por título y descripción
- **Export estático** (`out/`) para Vercel o GitHub Pages

## Inicio rápido

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) — más comandos en [docs/desarrollo.md](./docs/desarrollo.md).

## Estructura (resumen)

```text
/
├── docs/           # documentación del proyecto (no contenido público)
├── src/
│   ├── app/        # rutas /, /[tema], /[tema]/...
│   ├── features/   # un folder por tema + content/ con las notas
│   ├── components/
│   └── lib/temas/  # registry.ts
└── public/
```

## Información

**Licencia:** Apache 2.0 · **Autor:** Fravelz
