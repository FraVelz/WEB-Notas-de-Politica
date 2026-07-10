import Link from 'next/link';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { getDocsByTema } from '@/lib/content/docs';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

export function RichTemaHub({
  temaId,
  groupLabel,
  guidingQuestions = [],
  children,
}: {
  temaId: string;
  groupLabel?: string;
  guidingQuestions?: string[];
  children?: React.ReactNode;
}) {
  const meta = getTemaById(temaId);
  if (!meta) return null;

  const docs = getDocsByTema(temaId).filter((d) => d.slug !== '');

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        {groupLabel ? (
          <p className="text-sm text-muted-foreground">{groupLabel}</p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-lg text-muted-foreground">{meta.description}</p>
      </header>

      <ScenarioCallout variant="scenario" title="Cómo leer este apartado">
        Aquí no hay verdades absolutas: hay marcos, tendencias y escenarios
        posibles. Los datos ayudan a situar un país —el tuyo u otro— frente a
        peers y al mundo; no sustituyen el juicio ni demuestran causalidad por
        sí solos.
      </ScenarioCallout>

      {guidingQuestions.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Preguntas guía</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
            {guidingQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {children}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Notas publicadas</h2>
        {docs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay notas en{' '}
            <code className="rounded bg-muted px-1">
              src/features/{temaId}/content/
            </code>
            .
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {docs.map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className={cn(
                    'block rounded-lg border border-border px-4 py-3',
                    'hover:bg-link-muted hover:text-link',
                  )}
                >
                  <span className="font-medium">{doc.title}</span>
                  {doc.description ? (
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {doc.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
