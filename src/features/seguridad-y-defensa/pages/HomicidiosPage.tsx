'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function HomicidiosPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Seguridad y defensa"
      title="Homicidios en perspectiva comparada"
      intro="Tasa de homicidios por 100.000 habitantes como señal de violencia letal registrada. Útil para escenarios de seguridad cotidiana; frágil como ranking moral o prueba de una sola política."
      indicatorId="homicide"
      indicatorTitle="Homicidios (por 100.000)"
      defaultCountries={['COL', 'MEX', 'BRA', 'USA', 'JPN', 'ZAF', 'DEU', 'NGA']}
      relatedHref="/seguridad-y-defensa/violencia-y-comparabilidad"
      relatedLabel="Violencia y comparabilidad"
    />
  );
}
