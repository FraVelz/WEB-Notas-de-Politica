'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function CapacidadEstatalPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Teoría del Estado"
      title="Capacidad estatal (proxy fiscal)"
      intro="La recaudación tributaria sobre el PIB es una señal gruesa de capacidad extractiva: países con ratios altos suelen (no siempre) tener burocracias fiscales más densas. No mide legitimidad, calidad del gasto ni monopolio de la violencia. Léela como escenario tentativo junto a las notas de este tema."
      indicatorId="tax-revenue"
      indicatorTitle="Recaudación tributaria / PIB"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
