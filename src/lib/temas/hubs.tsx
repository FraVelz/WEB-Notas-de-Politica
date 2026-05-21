import type { ComponentType } from 'react';
import { DefaultTemaHub } from '@/components/DefaultTemaHub';

const customHubs: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  filosofia: () =>
    import('@/features/filosofia/FilosofiaHub').then((m) => ({
      default: m.FilosofiaHub,
    })),
};

export async function resolveTemaHub(
  temaId: string,
): Promise<ComponentType<{ temaId: string }>> {
  const loader = customHubs[temaId];
  if (loader) {
    const mod = await loader();
    return mod.default as ComponentType<{ temaId: string }>;
  }
  return DefaultTemaHub;
}
