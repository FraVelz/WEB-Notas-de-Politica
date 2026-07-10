import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'gobierno-y-estructura-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Comparativo general',
        href: `/${TEMA_ID}/general`,
      },
      {
        label: 'Sistemas de gobierno',
        href: `/${TEMA_ID}/sistemas-de-gobierno`,
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
