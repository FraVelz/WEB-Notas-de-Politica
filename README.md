# Notas de Política

[English Version](./README.EN.md)

Repositorio de notas personales sobre política construido con [Astro](https://astro.build) y [Starlight](https://starlight.astro.build).

![Captura de pantalla](./public/screenshot.png)

## Características

- **Tema claro/oscuro**: Selector integrado en la barra de navegación (claro, oscuro, automático)
- **Barra lateral**: Visible en todas las páginas, incluida la principal
- **Búsqueda**: Índice de búsqueda con Pagefind
- **Navegación**: Organizada por secciones (General, Países, Estadísticas, Proyectos)
- **Responsive**: Diseño adaptable a móviles y escritorio

## Estructura del proyecto

``` text
/
├── public/                 # Archivos estáticos
│   ├── favicon.svg
│   └── screenshot.png      # Imagen para previsualización en redes
├── src/
│   ├── content/
│   │   └── docs/           # Contenido en Markdown
│   │       ├── index.md    # Página principal
│   │       ├── general.md  # Estudio comparativo
│   │       ├── paises/
│   │       │   ├── suramerica/  (colombia, ecuador)
│   │       │   └── asiaticos/   (china, corea-del-sur)
│   │       ├── estadistica/
│   │       │   └── poblacion.md
│   │       └── proyectos/
│   │           └── general.md
│   ├── styles/
│   │   └── custom.css      # Colores del tema
│   └── content.config.ts
├── astro.config.mjs
└── package.json
```

## Tecnologías

| Tecnología                                 | Uso                              |
| ------------------------------------------ | -------------------------------- |
| [Astro](https://astro.build)               | Framework web                    |
| [Starlight](https://starlight.astro.build) | Tema de documentación            |
| [Pagefind](https://pagefind.app)           | Búsqueda (incluido en Starlight) |
| pnpm                                       | Gestor de paquetes               |

## Contenido

- **General**: Estudio comparativo entre Colombia y países referentes
- **Países**: Notas por región (Suramérica, Asia)
- **Estadísticas**: Datos de población y otros
- **Proyectos**: Ideas, consejos y propuestas

## Información

**Licencia:** Apache 2.0

**Author:** Fravelz
