import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'estadisticas-mundiales';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  { label: 'Mapa', href: `/${TEMA_ID}/mapa` },
  {
    label: 'Datos',
    items: [
      { label: 'Comparador de indicadores', href: `/${TEMA_ID}/indicadores` },
      { label: 'Cómo leer los indicadores', href: `/${TEMA_ID}/como-leer-indicadores` },
      { label: 'Población', href: `/${TEMA_ID}/poblacion` },
    ],
  },
];
