'use client';

import { getTemaById } from '@/lib/temas/registry';

const meta = getTemaById('estadisticas-mundiales')!;

export function EstadisticasMundialesHub({ temaId: _temaId }: { temaId?: string }) {
  return (
    <section className="border-b border-border pb-8">
      <p className="m-0 mb-2 text-sm font-semibold tracking-widest text-link uppercase">
        Datos
      </p>
      <h1 className="m-0 text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
        {meta.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {meta.description}
      </p>
    </section>
  );
}
