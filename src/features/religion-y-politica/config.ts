import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'religion-y-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Fe y poder',
    items: [
      { label: 'Laicidad y pluralismo', href: `/${TEMA_ID}/laicidad-y-pluralismo` },
      {
        label: 'Religión, poder y prosperidad',
        href: `/${TEMA_ID}/religion-poder-y-prosperidad`,
      },
      {
        label: 'Contexto desarrollo (no religión)',
        href: `/${TEMA_ID}/contexto-religion`,
      },
    ],
  },
];
