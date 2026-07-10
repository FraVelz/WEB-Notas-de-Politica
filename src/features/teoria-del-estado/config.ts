import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'teoria-del-estado';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Legitimidad y capacidad',
        href: `/${TEMA_ID}/legitimidad-y-capacidad`,
      },
      {
        label: 'Estado fuerte / débil',
        href: `/${TEMA_ID}/escenarios-estado-fuerte-debil`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [
      { label: 'Capacidad estatal', href: `/${TEMA_ID}/capacidad` },
    ],
  },
];
