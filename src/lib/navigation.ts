export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavItem[] };

export { globalNavigation as navigation } from '@/lib/temas/navigation';

export const siteConfig = {
  title: 'Web Prosperity · Prosperidad',
  version: '0.0.2',
  description:
    'Web Prosperity: espacio para explorar prosperidad en sentido amplio — política, filosofía, economía y datos para comprender el mundo',
  author: 'fravelz',
  license: 'Apache v2',
  keywords:
    'prosperidad, política, filosofía, pensamiento político, ética, ideologías, análisis, Colombia, Latinoamérica, estudios comparativos, gobernanza, historia, estadísticas',
};
