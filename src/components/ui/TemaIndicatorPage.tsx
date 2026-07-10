'use client';

import Link from 'next/link';
import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

/** Página reutilizable: un indicador + marco epistémico del tema. */
export function TemaIndicatorPage({
  eyebrow,
  title,
  intro,
  indicatorId,
  indicatorTitle,
  defaultCountries,
  relatedHref,
  relatedLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  indicatorId: string;
  indicatorTitle: string;
  defaultCountries?: string[];
  relatedHref?: string;
  relatedLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{intro}</p>
        {relatedHref && relatedLabel ? (
          <p className="text-sm text-muted-foreground">
            Relacionado:{' '}
            <Link
              href={relatedHref}
              className="text-link underline-offset-2 hover:underline"
            >
              {relatedLabel}
            </Link>
          </p>
        ) : null}
      </header>

      <ScenarioCallout variant="scenario">
        Elige el país que te interese como ancla. Los contrastes sugieren
        escenarios posibles; no demuestran un único camino a la prosperidad.
      </ScenarioCallout>

      <CountryCompare
        indicatorId={indicatorId}
        title={indicatorTitle}
        defaultCountries={defaultCountries}
      />
    </div>
  );
}
