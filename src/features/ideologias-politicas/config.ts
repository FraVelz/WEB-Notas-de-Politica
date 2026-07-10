import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'ideologias-politicas';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Notas',
    items: [
      {
        label: 'Mapa de corrientes',
        href: `/${TEMA_ID}/mapa-de-corrientes`,
      },
      {
        label: 'Valores en tensión',
        href: `/${TEMA_ID}/valores-en-tension`,
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [{ label: 'Matriz', href: `/${TEMA_ID}/matriz` }],
  },
];
