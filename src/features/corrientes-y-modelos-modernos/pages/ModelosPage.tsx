'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function ModelosPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Corrientes y modelos modernos"
      title="Ingreso como contexto de modelos"
      intro="PIB per cápita sitúa niveles de ingreso promedio entre países. Sirve para comparar resultados materiales agregados de distintos capitalismos e híbridos — no demuestra la superioridad moral o institucional de un modelo."
      indicatorId="gdp-per-capita"
      indicatorTitle="PIB per cápita"
      defaultCountries={['COL', 'CHL', 'KOR', 'DEU', 'USA', 'CHN', 'NGA', 'SWE']}
      relatedHref="/corrientes-y-modelos-modernos/modelos-en-competencia"
      relatedLabel="Modelos en competencia"
    />
  );
}
