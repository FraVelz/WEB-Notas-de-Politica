'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function ContextoPsicologiaPage() {
  return (
    <div className="space-y-6">
      <TemaIndicatorPage
        eyebrow="Psicología política"
        title="Contexto material (proxy débil)"
        intro="El Gini sitúa desigualdad de ingreso como telón de fondo de estrés social y clivajes. No mide sesgos cognitivos, identidad partidaria ni propensión al conflicto."
        indicatorId="gini"
        indicatorTitle="Desigualdad (Gini)"
        defaultCountries={['COL', 'BRA', 'USA', 'SWE', 'ZAF', 'JPN', 'IND', 'POL']}
        relatedHref="/psicologia-politica/sesgos-y-decision-colectiva"
        relatedLabel="Sesgos y decisión colectiva"
      />
      <div className="mx-auto max-w-4xl">
        <ScenarioCallout variant="uncertainty">
          Caveat: desigualdad alta puede correlacionar con desconfianza o
          polarización en algunos estudios y no en otros. La psicología política
          necesita encuestas, experimentos y etnografía — el Gini solo abre
          hipótesis sobre condiciones materiales.
        </ScenarioCallout>
      </div>
    </div>
  );
}
