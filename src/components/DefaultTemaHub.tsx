import { getTemaById } from '@/lib/temas/registry';

export function DefaultTemaHub({ temaId }: { temaId: string }) {
  const meta = getTemaById(temaId);
  if (!meta) return null;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">Tema</p>
        <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>
        <p className="text-lg text-[var(--text-muted)]">{meta.description}</p>
      </header>
      <p className="text-sm text-[var(--text-muted)]">
        Añade notas en{' '}
        <code className="rounded bg-[var(--bg-muted)] px-1">
          src/features/{temaId}/content/
        </code>{' '}
        o personaliza el hub en{' '}
        <code className="rounded bg-[var(--bg-muted)] px-1">
          {temaId}/{'{Nombre}'}Hub.tsx
        </code>
        .
      </p>
    </div>
  );
}
