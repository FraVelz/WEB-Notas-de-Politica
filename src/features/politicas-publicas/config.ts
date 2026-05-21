import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'politicas-publicas';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Proyectos',
    items: [{ label: 'General', href: `/${TEMA_ID}/proyectos/general` }],
  },
];
