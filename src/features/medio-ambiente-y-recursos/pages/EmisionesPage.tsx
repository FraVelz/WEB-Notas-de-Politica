'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function EmisionesPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Medio ambiente y recursos"
      title="Emisiones de CO₂ per cápita"
      intro="Emisiones territoriales por persona: señal de intensidad carbónica contemporánea. No captura responsabilidad histórica acumulada ni la huella de consumo importado."
      indicatorId="co2-per-capita"
      indicatorTitle="CO₂ per cápita"
      defaultCountries={['COL', 'USA', 'CHN', 'DEU', 'IND', 'NGA', 'QAT', 'SWE']}
      relatedHref="/medio-ambiente-y-recursos/escenarios-climaticos"
      relatedLabel="Escenarios climáticos"
    />
  );
}
