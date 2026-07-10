'use client';

import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaPageHeader } from '@/components/ui/TemaPageHeader';

/** Página reutilizable: un indicador + marco epistémico del tema. */
export function TemaIndicatorPage({
  temaId,
  eyebrow,
  title,
  intro,
  indicatorId,
  indicatorTitle,
  defaultCountries,
  relatedHref,
  relatedLabel,
}: {
  temaId?: string;
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
      <TemaPageHeader
        temaId={temaId}
        eyebrow={eyebrow}
        title={title}
        description={intro}
        relatedHref={relatedHref ?? '/estadisticas-mundiales/como-leer-indicadores'}
        relatedLabel={relatedLabel ?? 'Cómo leer los indicadores'}
      />

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
