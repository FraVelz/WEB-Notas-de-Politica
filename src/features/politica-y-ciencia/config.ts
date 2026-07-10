import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'politica-y-ciencia';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Evidencia y conocimiento',
    items: [
      {
        label: 'Evidencia en políticas',
        href: `/${TEMA_ID}/evidencia-en-politicas`,
      },
      {
        label: 'Inversión en conocimiento',
        href: `/${TEMA_ID}/inversion-en-conocimiento`,
      },
      { label: 'Inversión I+D (indicador)', href: `/${TEMA_ID}/inversion-id` },
    ],
  },
];
