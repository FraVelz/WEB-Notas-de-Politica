import type { NavItem } from '@/lib/navigation';

export const nav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Bienvenida', href: '/inicio/bienvenida' },
];

/** Página TSX: registro canónico en `src/lib/temas/tsx-pages.tsx` */
export const tsxPages = {
  bienvenida: '@/features/inicio/components/BienvenidaPage',
} as const;
