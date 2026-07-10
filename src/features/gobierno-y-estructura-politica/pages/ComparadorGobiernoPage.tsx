'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function ComparadorGobiernoPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Gobierno"
      title="Comparador de contexto económico-fiscal"
      intro="Ni el PIB per cápita ni la recaudación definen un sistema de gobierno. Aquí usamos el ingreso medio como contexto: sitúa la escala material en la que operan presidencias, parlamentos y federaciones. Para capacidad extractiva, cruza con tax-revenue en el comparador global; para diseño institucional, lee las notas de este tema."
      indicatorId="gdp-per-capita"
      indicatorTitle="PIB per cápita (contexto, no tipología de gobierno)"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
