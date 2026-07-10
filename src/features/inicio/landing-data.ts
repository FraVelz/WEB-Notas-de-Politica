import type { LucideIcon } from 'lucide-react';
import {
  Landmark,
  Map as MapIcon,
  Megaphone,
  Swords,
} from 'lucide-react';
import { getAllDocs } from '@/lib/content/docs';
import {
  getNavCategoriesGrouped,
  getTemasForLanding,
} from '@/lib/temas/registry';
import { getTemaTsxTools } from '@/lib/temas/tsx-pages';
import type { TemaNavCategoryId } from '@/lib/temas/types';

export const FEATURED_TEMA_IDS = [
  'filosofia',
  'economia',
  'historia',
  'estadisticas-mundiales',
  'relaciones-internacionales-y-geopolitica',
  'etica-politica',
] as const;

export const EJE_VISUAL: Record<
  TemaNavCategoryId,
  { image: string; glow: string; accent: string }
> = {
  'marco-teorico': {
    image: '/landing/ejes/marco.webp',
    glow: 'rgb(59 130 246 / 45%)',
    accent: '#3b82f6',
  },
  'poder-y-accion': {
    image: '/landing/ejes/poder.webp',
    glow: 'rgb(16 185 129 / 45%)',
    accent: '#10b981',
  },
  'debate-actual': {
    image: '/landing/ejes/debate.webp',
    glow: 'rgb(168 85 247 / 45%)',
    accent: '#a855f7',
  },
  datos: {
    image: '/landing/ejes/datos.webp',
    glow: 'rgb(6 182 212 / 45%)',
    accent: '#06b6d4',
  },
};

export const EJE_ICONS: Record<TemaNavCategoryId, LucideIcon> = {
  'marco-teorico': Landmark,
  'poder-y-accion': Swords,
  'debate-actual': Megaphone,
  datos: MapIcon,
};

/** KPIs de presentación alineados al mockup (marketing layout). */
export function getLandingKpis() {
  return [
    {
      label: 'Temas',
      value: '26',
      hint: 'Apartados del archivo',
      color: '#3b82f6',
      icon: 'book' as const,
    },
    {
      label: 'Artículos',
      value: '54',
      hint: 'Notas y ensayos',
      color: '#10b981',
      icon: 'file' as const,
    },
    {
      label: 'Herramientas',
      value: '18',
      hint: 'Comparadores e interactivos',
      color: '#a855f7',
      icon: 'wrench' as const,
    },
    {
      label: 'Indicadores',
      value: '150+',
      hint: 'Series y métricas',
      color: '#f59e0b',
      icon: 'globe' as const,
    },
    {
      label: 'Países',
      value: '200+',
      hint: 'Cobertura comparativa',
      color: '#06b6d4',
      icon: 'users' as const,
    },
    {
      label: 'Independiente',
      value: '100%',
      hint: 'Sin paywall ni ads',
      color: '#f43f5e',
      icon: 'clock' as const,
    },
  ];
}

export function getEjeCounts(categoryId: TemaNavCategoryId) {
  const entry = getNavCategoriesGrouped().find(
    (c) => c.category.id === categoryId,
  );
  if (!entry) return { temas: 0, articulos: 0, herramientas: 0 };

  const allDocs = getAllDocs();
  const temas = entry.sections.flatMap((s) => s.temas);
  const articulos = temas.reduce(
    (n, t) =>
      n + allDocs.filter((d) => d.tema === t.id && d.slug !== '').length,
    0,
  );
  const herramientas = temas.reduce(
    (n, t) => n + getTemaTsxTools(t.id).length,
    0,
  );
  return { temas: temas.length, articulos, herramientas };
}

export function getFeaturedTemas() {
  const byId = new Map(getTemasForLanding().map((t) => [t.id, t]));
  return FEATURED_TEMA_IDS.map((id) => byId.get(id)).filter(
    (t): t is NonNullable<typeof t> => t != null,
  );
}
