import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'democracia-y-elecciones';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Qué miden los índices',
        href: `/${TEMA_ID}/que-miden-los-indices`,
      },
      {
        label: 'Escenarios democráticos',
        href: `/${TEMA_ID}/escenarios-democraticos`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [
      { label: 'Señales', href: `/${TEMA_ID}/senales` },
    ],
  },
];
