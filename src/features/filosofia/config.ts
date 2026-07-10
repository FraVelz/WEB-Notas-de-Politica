import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  Zap,
} from 'lucide-react';
import type { NavItem } from '@/lib/navigation';

export const TEMA_ID = 'filosofia';

export const SIDEBAR_QUOTE =
  'La filosofía no da respuestas fáciles, enseña a preguntar mejor.';

export const HUB_TAGS = ['Ética', 'Política', 'Sociedad'] as const;

export const navIcons: Record<string, LucideIcon> = {
  '/filosofia': Home,
  '/filosofia/introduccion': BookOpen,
  '/filosofia/prosperidad-como-pregunta': FileText,
  '/filosofia/tensiones': Zap,
  '/estadisticas-mundiales/indicadores': BarChart3,
};

export const nav: NavItem[] = [
  {
    label: 'Navegación',
    items: [
      { label: 'Resumen', href: '/filosofia' },
    ],
  },
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
    items: [
      { label: 'Tensiones filosóficas', href: '/filosofia/tensiones' },
      {
        label: 'Comparador de indicadores',
        href: '/estadisticas-mundiales/indicadores',
      },
    ],
  },
];
