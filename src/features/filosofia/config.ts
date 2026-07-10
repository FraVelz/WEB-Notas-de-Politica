import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'filosofia';

export const nav: NavItem[] = [
  { label: 'Resumen', href: '/filosofia' },
  {
    label: 'Notas',
    items: [
      { label: 'Introducción', href: '/filosofia/introduccion' },
      {
        label: 'Prosperidad como pregunta',
        href: '/filosofia/prosperidad-como-pregunta',
      },
    ],
  },
  {
    label: 'Interactivo',
    items: [{ label: 'Tensiones', href: '/filosofia/tensiones' }],
  },
];
