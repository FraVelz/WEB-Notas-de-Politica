import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'comunicacion-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Medios y polarización',
    items: [
      { label: 'Confianza en medios', href: `/${TEMA_ID}/confianza-en-medios` },
      {
        label: 'Polarización y escenarios',
        href: `/${TEMA_ID}/polarizacion-y-escenarios`,
      },
      {
        label: 'Contexto (Gini, proxy)',
        href: `/${TEMA_ID}/contexto-comunicacion`,
      },
    ],
  },
];
