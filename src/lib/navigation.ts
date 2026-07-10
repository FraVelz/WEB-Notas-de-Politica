export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavItem[] };

export { globalNavigation as navigation } from '@/lib/temas/navigation';

export const siteConfig = {
  title: 'Web Prosperity · Prosperidad',
  version: '0.0.2',
  description:
    'Archivo para pensar la prosperidad de cualquier nación con ideas, datos y escenarios — tendencias e incertidumbre, no verdades absolutas',
  author: 'fravelz',
  license: 'Apache v2',
  keywords:
    'prosperidad, prosperidad nacional, política, filosofía, economía, geopolítica, estadísticas, escenarios, indicadores, gobernanza, estudios comparativos, World Bank',
};
