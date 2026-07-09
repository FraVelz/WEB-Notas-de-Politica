export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavItem[] };

export { globalNavigation as navigation } from '@/lib/temas/navigation';

export const siteConfig = {
  title: 'Web Prosperity · Prosperidad',
  version: '0.0.2',
  description:
    'Web Prosperity: espacio para la búsqueda de la prosperidad de una nación, explorada en sentido amplio — política, filosofía, economía, geopolítica y datos',
  author: 'fravelz',
  license: 'Apache v2',
  keywords:
    'prosperidad, prosperidad nacional, nación, política, filosofía, pensamiento político, ética, ideologías, análisis, Colombia, Latinoamérica, estudios comparativos, gobernanza, historia, estadísticas',
};
