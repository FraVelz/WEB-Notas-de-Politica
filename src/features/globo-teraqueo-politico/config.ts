import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'globo-teraqueo-politico';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      { label: 'Leer el mapa político', href: `/${TEMA_ID}/leer-el-mapa` },
    ],
  },
];
