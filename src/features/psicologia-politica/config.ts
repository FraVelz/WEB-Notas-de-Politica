import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'psicologia-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Mente y conflicto',
    items: [
      {
        label: 'Sesgos y decisión colectiva',
        href: `/${TEMA_ID}/sesgos-y-decision-colectiva`,
      },
      {
        label: 'Identidad y conflicto',
        href: `/${TEMA_ID}/identidad-y-conflicto`,
      },
      {
        label: 'Contexto (Gini, proxy)',
        href: `/${TEMA_ID}/contexto-psicologia`,
      },
    ],
  },
];
