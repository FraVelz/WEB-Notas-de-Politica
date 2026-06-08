import type { ComponentType } from 'react';

type TsxPageLoader = () => Promise<{ default: ComponentType }>;

const customTsxPages: Record<string, Record<string, TsxPageLoader>> = {
  inicio: {
    bienvenida: () =>
      import('@/features/inicio/components/BienvenidaPage').then((m) => ({
        default: m.BienvenidaPage,
      })),
  },
};

export function getTsxStaticPaths(): { tema: string; slug: string[] }[] {
  const paths: { tema: string; slug: string[] }[] = [];

  for (const [tema, pages] of Object.entries(customTsxPages)) {
    for (const slug of Object.keys(pages)) {
      paths.push({ tema, slug: slug.split('/') });
    }
  }

  return paths;
}

export async function resolveTemaTsxPage(
  temaId: string,
  slug: string,
): Promise<ComponentType | null> {
  const loader = customTsxPages[temaId]?.[slug];
  if (!loader) return null;

  const mod = await loader();
  return mod.default;
}

export function getTsxPageMeta(
  temaId: string,
  slug: string,
): { title: string; description?: string } | null {
  if (temaId === 'inicio' && slug === 'bienvenida') {
    return {
      title: 'Prosperidad',
      description:
        'Web Prosperity — política, filosofía e ideas para comprender el mundo',
    };
  }
  return null;
}
