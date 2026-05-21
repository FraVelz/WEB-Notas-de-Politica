import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'estadisticas-mundiales';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Datos',
    items: [{ label: 'Población', href: `/${TEMA_ID}/poblacion` }],
  },
];
