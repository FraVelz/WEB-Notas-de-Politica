'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function ContextoPoderPage() {
  return (
    <div className="space-y-6">
      <TemaIndicatorPage
        eyebrow="Poder y control social"
        title="Alcance estatal (proxy fiscal)"
        intro="Ingresos tributarios como % del PIB aproximan la capacidad del Estado para extraer recursos y, con ello, parte de su alcance administrativo. No miden vigilancia, libertad ni calidad democrática."
        indicatorId="tax-revenue"
        indicatorTitle="Ingresos tributarios (% del PIB)"
        defaultCountries={['COL', 'MEX', 'USA', 'DEU', 'KOR', 'NGA', 'SWE', 'ZAF']}
        relatedHref="/poder-y-control-social/mecanismos-de-control"
        relatedLabel="Mecanismos de control"
      />
      <div className="mx-auto max-w-4xl">
        <ScenarioCallout variant="uncertainty">
          Caveat: alta recaudación puede ir con Estado de bienestar contenido o
          con extracción autoritaria. Baja recaudación puede ser debilidad,
          informalidad o diseño liberal. Úsalo como proxy de{' '}
          <em>state reach</em> fiscal, no como índice de control social ni de
          opresión.
        </ScenarioCallout>
      </div>
    </div>
  );
}
