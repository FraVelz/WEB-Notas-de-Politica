import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'historia';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Instituciones y tiempo',
    items: [
      {
        label: 'Patrones institucionales',
        href: `/${TEMA_ID}/patrones-institucionales`,
      },
      {
        label: 'Líneas de tiempo comparadas',
        href: `/${TEMA_ID}/lineas-de-tiempo-comparadas`,
      },
      { label: 'Línea de tiempo interactiva', href: `/${TEMA_ID}/timeline` },
    ],
  },
];
