import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'poder-y-control-social';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Control y contención',
    items: [
      {
        label: 'Mecanismos de control',
        href: `/${TEMA_ID}/mecanismos-de-control`,
      },
      {
        label: 'Resistencia y contrapesos',
        href: `/${TEMA_ID}/resistencia-y-contrapesos`,
      },
      {
        label: 'Alcance estatal (proxy fiscal)',
        href: `/${TEMA_ID}/contexto-poder`,
      },
    ],
  },
];
