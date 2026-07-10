import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'cultura-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Normas y variación',
    items: [
      { label: 'Valores y normas', href: `/${TEMA_ID}/valores-y-normas` },
      { label: 'Variación regional', href: `/${TEMA_ID}/variacion-regional` },
      {
        label: 'Contexto (urbanización)',
        href: `/${TEMA_ID}/contexto-cultura`,
      },
    ],
  },
];
