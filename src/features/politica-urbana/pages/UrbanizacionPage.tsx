'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function UrbanizacionPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Política urbana"
      title="Urbanización comparada"
      intro="Porcentaje de población urbana según definiciones nacionales. Útil para situar la escala del desafío de gobernanza urbana; no mide calidad de vivienda, informalidad ni fragmentación metropolitana."
      indicatorId="urban-population"
      indicatorTitle="Población urbana (%)"
      defaultCountries={['COL', 'BRA', 'USA', 'CHN', 'IND', 'NGA', 'DEU', 'KEN']}
      relatedHref="/politica-urbana/urbanizacion-mundial"
      relatedLabel="Urbanización mundial"
    />
  );
}
