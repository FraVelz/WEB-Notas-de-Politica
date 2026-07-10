import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'economia';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Prosperidad multidimensional',
        href: `/${TEMA_ID}/prosperidad-multidimensional`,
      },
      {
        label: 'Crecimiento y desigualdad',
        href: `/${TEMA_ID}/crecimiento-y-desigualdad`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [
      { label: 'Dashboard', href: `/${TEMA_ID}/dashboard` },
    ],
  },
];
