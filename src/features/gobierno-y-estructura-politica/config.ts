import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'gobierno-y-estructura-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Estudios',
    items: [
      {
        label: 'Comparativo general',
        href: `/${TEMA_ID}/general`,
      },
    ],
  },
];
