'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function MetricasEvaluacionPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Políticas públicas"
      title="Métricas para evaluar (con cautela)"
      intro="Gasto en I+D como porcentaje del PIB: señal de inversión en conocimiento y capacidad tecnológica. No mide la calidad de un programa concreto ni prueba que «más I+D» cause prosperidad en todos los contextos."
      indicatorId="rd-gdp"
      indicatorTitle="I+D (% del PIB)"
      defaultCountries={['COL', 'CHL', 'KOR', 'DEU', 'USA', 'ZAF', 'IND', 'ISR']}
      relatedHref="/politicas-publicas/evaluacion-como-hipotesis"
      relatedLabel="Evaluación como hipótesis"
    />
  );
}
