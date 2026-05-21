export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavItem[] };

export const navigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'General',
    items: [{ label: 'General', href: '/general' }],
  },
  {
    label: 'Países',
    items: [
      {
        label: 'Suramérica',
        items: [
          { label: 'Colombia', href: '/paises/suramerica/colombia' },
          { label: 'Ecuador', href: '/paises/suramerica/ecuador' },
        ],
      },
      {
        label: 'Asia',
        items: [
          { label: 'China', href: '/paises/asiaticos/china' },
          { label: 'Corea del Sur', href: '/paises/asiaticos/corea-del-sur' },
        ],
      },
    ],
  },
  {
    label: 'Filosofía',
    items: [{ label: 'Introducción', href: '/filosofia' }],
  },
  {
    label: 'Estadísticas',
    items: [{ label: 'Población', href: '/estadistica/poblacion' }],
  },
  {
    label: 'Proyectos',
    items: [{ label: 'General', href: '/proyectos/general' }],
  },
];

export const siteConfig = {
  title: 'Notas de Política',
  description:
    'Notas personales sobre política, filosofía e ideas para comprender el mundo — estudios comparativos, análisis y reflexión',
  author: 'Fravelz',
  keywords:
    'política, filosofía, pensamiento político, ética, ideologías, notas personales, análisis, Colombia, Latinoamérica, estudios comparativos, gobernanza, historia, estadísticas',
};
