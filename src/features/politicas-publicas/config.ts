import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'politicas-publicas';

export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Evaluación y diseño',
    items: [
      {
        label: 'Evaluación como hipótesis',
        href: `/${TEMA_ID}/evaluacion-como-hipotesis`,
      },
      { label: 'Diseño y evidencia', href: `/${TEMA_ID}/diseno-y-evidencia` },
      {
        label: 'Métricas de evaluación',
        href: `/${TEMA_ID}/metricas-evaluacion`,
      },
    ],
  },
  {
    label: 'Proyectos',
    items: [{ label: 'Notas de proyectos', href: `/${TEMA_ID}/proyectos/general` }],
  },
];
