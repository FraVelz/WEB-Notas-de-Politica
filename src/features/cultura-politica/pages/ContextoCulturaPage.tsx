'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function ContextoCulturaPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Cultura política"
      title="Urbanización como contexto"
      intro="Porcentaje de población urbana: señal demográfica de densidad, anonimato y diversidad potencial. Contextualiza cambios de normas; no mide confianza, tolerancia ni valores postmaterialistas."
      indicatorId="urban-population"
      indicatorTitle="Población urbana (%)"
      defaultCountries={['COL', 'MEX', 'USA', 'DEU', 'IND', 'NGA', 'JPN', 'ETH']}
      relatedHref="/cultura-politica/valores-y-normas"
      relatedLabel="Valores y normas"
    />
  );
}
