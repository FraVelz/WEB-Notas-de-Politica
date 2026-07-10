'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function DashboardEconomiaPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Economía"
      title="Dashboard de señales económicas"
      intro="El PIB per cápita sitúa el ingreso medio entre países. Léelo junto al Gini y a otros resultados (salud, seguridad): un percentil alto en ingreso no implica baja desigualdad ni prosperidad multidimensional. Cambia el país ancla para plantear escenarios, no para coronar un modelo único."
      indicatorId="gdp-per-capita"
      indicatorTitle="PIB per cápita (señal de ingreso medio)"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
