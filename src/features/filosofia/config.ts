import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'filosofia';

export const nav: NavItem[] = [
  { label: 'Resumen', href: '/filosofia' },
  {
    label: 'Notas',
    items: [
      { label: 'Introducción', href: '/filosofia/introduccion' },
    ],
  },
];
