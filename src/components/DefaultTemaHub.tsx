import { RichTemaHub } from '@/components/RichTemaHub';
import { getTemaById, temaGroups } from '@/lib/temas/registry';

export function DefaultTemaHub({ temaId }: { temaId: string }) {
  const meta = getTemaById(temaId);
  if (!meta) return null;

  const groupLabel = temaGroups.find((g) => g.id === meta.group)?.label;

  return <RichTemaHub temaId={temaId} groupLabel={groupLabel} />;
}
