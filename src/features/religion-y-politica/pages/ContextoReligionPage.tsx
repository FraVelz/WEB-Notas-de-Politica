'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function ContextoReligionPage() {
  return (
    <div className="space-y-6">
      <TemaIndicatorPage
        eyebrow="Religión y política"
        title="Contexto de desarrollo (no mide religión)"
        intro="La esperanza de vida es un resultado agregado de salud y condiciones materiales. Se muestra solo como telón de fondo de desarrollo humano al discutir arreglos Estado–religión — no tiene relación causal directa con fe, laicidad o pluralismo."
        indicatorId="life-expectancy"
        indicatorTitle="Esperanza de vida"
        defaultCountries={['COL', 'USA', 'JPN', 'IND', 'NGA', 'SAU', 'SWE', 'BRA']}
        relatedHref="/religion-y-politica/laicidad-y-pluralismo"
        relatedLabel="Laicidad y pluralismo"
      />
      <div className="mx-auto max-w-4xl">
        <ScenarioCallout variant="uncertainty">
          Caveat fuerte: este indicador <strong>no es un proxy de religión</strong>.
          Países con tradiciones distintas pueden compartir esperanza de vida
          similar, y viceversa. Úsalo únicamente para situar el nivel de
          desarrollo humano mientras lees debates de laicidad y poder
          confesional.
        </ScenarioCallout>
      </div>
    </div>
  );
}
