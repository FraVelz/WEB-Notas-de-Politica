import type { ComponentType } from 'react';
import type { NavItem } from '@/lib/navigation';
import type { TemaDefinition } from '@/lib/temas/types';

/**
 * Copiar esta carpeta a src/features/{id} y reemplazar:
 * - TEMA_ID, titulos, nav, pages
 */
export const TEMA_ID = 'mi-tema';

export const temaMeta: Pick<
  TemaDefinition,
  'id' | 'title' | 'description' | 'group' | 'hub'
> = {
  id: TEMA_ID,
  title: 'Título del tema',
  description: 'Descripción corta para tarjetas y SEO.',
  group: 'fundamentos',
  hub: 'tsx',
};

/** Sidebar solo visible dentro de /{TEMA_ID}/* */
export const nav: NavItem[] = [
  { label: 'Resumen', href: `/${TEMA_ID}` },
  {
    label: 'Sección ejemplo',
    items: [
      { label: 'Introducción', href: `/${TEMA_ID}/ejemplo/introduccion` },
    ],
  },
];

/**
 * Páginas TSX bajo el tema (slug relativo → componente).
 * El catch-all comprueba aquí antes de buscar .md
 */
export const tsxPages: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  // 'mapa': () => import('./pages/MapaPage'),
};
