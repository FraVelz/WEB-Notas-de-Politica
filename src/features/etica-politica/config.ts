import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'etica-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Integridad y normas',
    items: [
      {
        label: 'Corrupción como señal',
        href: `/${TEMA_ID}/corrupcion-como-senal`,
      },
      { label: 'Marcos normativos', href: `/${TEMA_ID}/marcos-normativos` },
      {
        label: 'Señales de integridad (proxy)',
        href: `/${TEMA_ID}/senales-integridad`,
      },
    ],
  },
];
