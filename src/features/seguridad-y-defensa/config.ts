import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'seguridad-y-defensa';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Violencia y escenarios',
    items: [
      {
        label: 'Violencia y comparabilidad',
        href: `/${TEMA_ID}/violencia-y-comparabilidad`,
      },
      {
        label: 'Escenarios de seguridad',
        href: `/${TEMA_ID}/escenarios-de-seguridad`,
      },
      { label: 'Homicidios (indicador)', href: `/${TEMA_ID}/homicidios` },
    ],
  },
];
