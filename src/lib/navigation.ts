export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavItem[] };

export { globalNavigation as navigation } from '@/lib/temas/navigation';

export const siteConfig = {
  title: 'Notas de Política',
  version: '0.0.2',
  description:
    'Notas personales sobre política, filosofía e ideas para comprender el mundo — estudios comparativos, análisis y reflexión',
  author: 'Fravelz',
  keywords:
    'política, filosofía, pensamiento político, ética, ideologías, notas personales, análisis, Colombia, Latinoamérica, estudios comparativos, gobernanza, historia, estadísticas',
};
