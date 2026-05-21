import type { NavItem } from '@/lib/navigation';
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
  try {
    const mod = await import(`@/features/${temaId}/config`);
    return (mod.nav as NavItem[]) ?? defaultFeatureNav(temaId);
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
