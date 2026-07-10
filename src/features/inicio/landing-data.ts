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

export function getLandingKpis() {
  const temas = getTemasForLanding();
  const docs = getAllDocs().filter((d) => d.slug !== '');
  const tools = temas.reduce((n, t) => n + getTemaTsxTools(t.id).length, 0);
  const active = temas.filter((t) => t.status === 'active').length;

  return [
    {
      label: 'Temas',
      value: String(temas.length),
      hint: 'Apartados del archivo',
      color: '#3b82f6',
      icon: 'book' as const,
    },
    {
      label: 'Artículos',
      value: docs.length > 0 ? `${docs.length}+` : '0',
      hint: 'Notas y ensayos',
      color: '#10b981',
      icon: 'file' as const,
    },
    {
      label: 'Herramientas',
      value: String(tools),
      hint: 'Comparadores e interactivos',
      color: '#a855f7',
      icon: 'wrench' as const,
    },
    {
      label: 'Ejes',
      value: '4',
      hint: 'Grandes bloques de navegación',
      color: '#f59e0b',
      icon: 'globe' as const,
    },
    {
      label: 'Activos',
      value: String(active),
      hint: 'Con contenido publicado',
      color: '#06b6d4',
      icon: 'users' as const,
    },
    {
      label: 'Cobertura',
      value: '100%',
      hint: 'Catálogo indexado',
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
