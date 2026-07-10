'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function ContextoComunicacionPage() {
  return (
    <div className="space-y-6">
      <TemaIndicatorPage
        eyebrow="Comunicación política"
        title="Contexto social (proxy débil)"
        intro="El índice de Gini aproxima desigualdad de ingreso. Aquí se usa solo como telón de fondo de posibles clivajes sociales que alimentan audiencias enfrentadas — no mide confianza en medios, polarización afectiva ni calidad informativa."
        indicatorId="gini"
        indicatorTitle="Desigualdad (Gini)"
        defaultCountries={['COL', 'BRA', 'USA', 'SWE', 'ZAF', 'KOR', 'IND', 'DEU']}
        relatedHref="/comunicacion-politica/confianza-en-medios"
        relatedLabel="Confianza en medios"
      />
      <div className="mx-auto max-w-4xl">
        <ScenarioCallout variant="uncertainty">
          Caveat fuerte: un Gini alto no «causa» desinformación, ni un Gini bajo
          garantiza pluralismo sano. Úsalo para hipótesis sobre clivajes
          materiales; contrastá con encuestas de medios, libertad de prensa e
          indicadores de polarización cuando existan.
        </ScenarioCallout>
      </div>
    </div>
  );
}
