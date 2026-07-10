'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function DesigualdadPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Sociología política"
      title="Desigualdad de ingreso (Gini)"
      intro="El coeficiente de Gini resume la desigualdad de ingreso en un solo número: útil para situar países, insuficiente para hablar de movilidad, riqueza o poder. Un Gini más bajo no prueba mayor cohesión social; un Gini alto no prueba por sí solo inmovilidad. Contrasta con las notas sobre confianza y movilidad."
      indicatorId="gini"
      indicatorTitle="Desigualdad de ingreso (Gini)"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
