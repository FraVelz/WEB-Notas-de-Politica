import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'medio-ambiente-y-recursos';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Energía y clima',
    items: [
      { label: 'Energía y desarrollo', href: `/${TEMA_ID}/energia-y-desarrollo` },
      {
        label: 'Escenarios climáticos',
        href: `/${TEMA_ID}/escenarios-climaticos`,
      },
      { label: 'Emisiones (CO₂)', href: `/${TEMA_ID}/emisiones` },
    ],
  },
];
