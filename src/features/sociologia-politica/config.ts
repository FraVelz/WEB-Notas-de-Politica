import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'sociologia-politica';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Confianza e instituciones',
        href: `/${TEMA_ID}/confianza-e-instituciones`,
      },
      {
        label: 'Movilidad y desigualdad',
        href: `/${TEMA_ID}/movilidad-y-desigualdad`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [
      { label: 'Desigualdad', href: `/${TEMA_ID}/desigualdad` },
    ],
  },
];
