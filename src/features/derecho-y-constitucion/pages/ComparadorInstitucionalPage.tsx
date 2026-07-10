'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function ComparadorInstitucionalPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Derecho y constitución"
      title="Comparador institucional (proxy de capacidad)"
      intro="La recaudación tributaria como porcentaje del PIB es un proxy imperfecto de capacidad estatal: sugiere cuánto recursos puede movilizar el fisco, no la calidad de la constitución, la independencia judicial ni el Estado de derecho. Úsalo solo como señal de contexto junto a las notas sobre familias jurídicas y diseño de poderes."
      indicatorId="tax-revenue"
      indicatorTitle="Recaudación tributaria / PIB (proxy débil de capacidad)"
      defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      relatedHref="/estadisticas-mundiales/indicadores"
      relatedLabel="Comparador global"
    />
  );
}
