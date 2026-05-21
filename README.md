# Notas de Política

[English Version](./README.EN.md)

Repositorio de notas personales sobre **política, filosofía** y temas afines (historia, sociedad, ideas) construido con [Next.js](https://nextjs.org).

![Captura de pantalla](./public/screenshot.png)

## Características

- **Tema claro/oscuro**: Selector en la barra de navegación (sigue la preferencia del sistema por defecto)
- **Barra lateral**: Visible en todas las páginas, incluida la principal
- **Búsqueda**: Filtrado por título y descripción de cada página
- **Navegación**: Organizada por secciones (General, Países, Filosofía, Estadísticas, Proyectos)
- **Responsive**: Diseño adaptable a móviles y escritorio
- **Export estático**: Listo para Vercel, GitHub Pages u otro hosting estático

## Estructura del proyecto

```text
/
├── src/
│   ├── app/                # App Router de Next.js
│   │   ├── [[...slug]]/    # Rutas dinámicas de documentación
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/         # UI (sidebar, búsqueda, tema, markdown)
│   ├── content/
│   │   └── docs/           # Contenido en Markdown
│   └── lib/                # docs, navigation, utils (cn)
├── public/
│   ├── favicon.svg
│   └── screenshot.png
└── package.json
```

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| [Next.js](https://nextjs.org) | Framework (App Router, export estático) |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Renderizado de Markdown |
| [next-themes](https://github.com/pacocoursey/next-themes) | Tema claro/oscuro |
| pnpm | Gestor de paquetes |

## Desarrollo

```bash
pnpm install
pnpm dev
pnpm lint        # ESLint
pnpm format      # Prettier (+ orden de clases Tailwind)
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Genera el sitio estático en `out/`. Para previsualizar:

```bash
pnpm start
```

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta `NEXT_PUBLIC_SITE_URL` con la URL de producción.

## Contenido

- **General**: Estudio comparativo entre Colombia y países referentes
- **Países**: Notas por región (Suramérica, Asia)
- **Filosofía**: Ética, ideologías, teoría del Estado y pensamiento político
- **Estadísticas**: Datos de población y otros
- **Proyectos**: Ideas, consejos y propuestas

## Información

**Licencia:** Apache 2.0

**Author:** Fravelz
