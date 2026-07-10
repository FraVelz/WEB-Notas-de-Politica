'use client';

import { TemaIndicatorPage } from '@/components/ui/TemaIndicatorPage';

export default function AdopcionDigitalPage() {
  return (
    <TemaIndicatorPage
      eyebrow="Tecnología y política"
      title="Capacidad tecnológica (I+D)"
      intro="Gasto en investigación y desarrollo como % del PIB: contexto de intensidad innovadora agregada. No mide madurez del e-gobierno, inclusión digital ni calidad ética de los algoritmos públicos."
      indicatorId="rd-gdp"
      indicatorTitle="I+D (% del PIB)"
      defaultCountries={['COL', 'KOR', 'ISR', 'USA', 'DEU', 'CHN', 'ZAF', 'IND']}
      relatedHref="/tecnologia-y-politica/estado-digital"
      relatedLabel="Estado digital"
    />
  );
}
