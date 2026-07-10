import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'derecho-y-constitucion';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Familias constitucionales',
        href: `/${TEMA_ID}/familias-constitucionales`,
      },
      {
        label: 'Diseño de poderes',
        href: `/${TEMA_ID}/diseno-de-poderes`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [
      { label: 'Comparador', href: `/${TEMA_ID}/comparador` },
    ],
  },
];
