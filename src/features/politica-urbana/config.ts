import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'politica-urbana';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Ciudad',
    items: [
      { label: 'Ciudad y gobernanza', href: `/${TEMA_ID}/ciudad-y-gobernanza` },
      {
        label: 'Urbanización mundial',
        href: `/${TEMA_ID}/urbanizacion-mundial`,
      },
      { label: 'Urbanización (indicador)', href: `/${TEMA_ID}/urbanizacion` },
    ],
  },
];
