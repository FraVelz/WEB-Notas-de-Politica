'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function FichaComparativaPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Geopolítica"
      title="Ficha comparativa de ingreso"
      intro="El PIB per cápita sitúa la escala material de países que aparecen en las fichas regionales (p. ej. Colombia, Ecuador, Nigeria, Alemania, China, Corea). No mide poder militar, influencia diplomática ni calidad de alianzas. Úsalo para anclar escenarios de dependencia comercial o de convergencia, no como ranking geopolítico."
      indicatorId="gdp-per-capita"
      indicatorTitle="PIB per cápita (contexto material)"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
