import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'tecnologia-y-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Digital e IA',
    items: [
      { label: 'Estado digital', href: `/${TEMA_ID}/estado-digital` },
      { label: 'IA y poder público', href: `/${TEMA_ID}/ia-y-poder-publico` },
      {
        label: 'Adopción digital (I+D)',
        href: `/${TEMA_ID}/adopcion-digital`,
      },
    ],
  },
];
