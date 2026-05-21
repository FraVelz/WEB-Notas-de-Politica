import type { NavItem } from '@/lib/navigation';
import { featureConfigLoaders } from './feature-config-loaders';
import { getTemaById, temas } from './registry';

/** Navegación global (landing): inicio + todos los temas */
export const globalNavigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  ...temas.map((t) => ({
    label: t.title,
    href: `/${t.id}`,
  })),
];

export async function getFeatureNavigation(
  temaId: string,
): Promise<NavItem[]> {
  const load = featureConfigLoaders[temaId];
  if (!load) return defaultFeatureNav(temaId);
  try {
    const mod = await load();
    return mod.nav ?? defaultFeatureNav(temaId);
  } catch {
    return defaultFeatureNav(temaId);
  }
}

function defaultFeatureNav(temaId: string): NavItem[] {
  const meta = getTemaById(temaId);
  return [
    { label: 'Resumen', href: `/${temaId}` },
    ...(meta
      ? [{ label: meta.title, href: `/${temaId}` }]
      : []),
  ];
}
