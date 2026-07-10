'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';

export default function SenalesIntegridadPage() {
  return (
    <div className="space-y-6">
      <TemaIndicatorPage
        eyebrow="Ética política"
        title="Señales de integridad (proxy fiscal)"
        intro="Ingresos tributarios como % del PIB aproximan el alcance fiscal del Estado. A veces covarían con menor corrupción administrativa — y a menudo no. Esto no es el CPI ni ningún índice de percepción de corrupción."
        indicatorId="tax-revenue"
        indicatorTitle="Ingresos tributarios (% del PIB)"
        defaultCountries={['COL', 'CHL', 'MEX', 'DEU', 'KOR', 'NGA', 'ZAF', 'SWE']}
        relatedHref="/etica-politica/corrupcion-como-senal"
        relatedLabel="Corrupción como señal"
      />
      <div className="mx-auto max-w-4xl">
        <ScenarioCallout variant="uncertainty">
          Disclaimer: <strong>no es el CPI</strong> (Corruption Perceptions Index) ni
          un medidor de sobornos. Alta recaudación puede reflejar Estado de
          bienestar, rentismo o coerción fiscal. Baja recaudación puede ser
          informalidad, debilidad o diseño deliberado. Úsalo solo como contexto
          de capacidad estatal al discutir integridad.
        </ScenarioCallout>
      </div>
    </div>
  );
}
