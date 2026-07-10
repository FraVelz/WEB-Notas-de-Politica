'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function InversionIDPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Política y ciencia"
      title="Inversión en I+D"
      intro="Gasto en investigación y desarrollo como % del PIB: intensidad agregada de inversión en conocimiento. No distingue calidad, campo (civil/militar) ni uso efectivo de la evidencia en políticas."
      indicatorId="rd-gdp"
      indicatorTitle="I+D (% del PIB)"
      defaultCountries={['COL', 'BRA', 'KOR', 'DEU', 'USA', 'CHN', 'ZAF', 'FIN']}
      relatedHref="/politica-y-ciencia/inversion-en-conocimiento"
      relatedLabel="Inversión en conocimiento"
    />
  );
}
