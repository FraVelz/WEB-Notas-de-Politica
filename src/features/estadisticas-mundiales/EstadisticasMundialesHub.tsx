import { RichTemaHub } from '@/components/RichTemaHub';

export function EstadisticasMundialesHub({
  temaId = 'estadisticas-mundiales',
}: {
  temaId?: string;
}) {
  return (
    <RichTemaHub
      temaId={temaId}
      groupLabel="Datos"
      tags={['Globo 3D', 'Indicadores', 'Comparador']}
      guidingQuestions={[
        '¿Qué cambia en tu lectura de un país cuando pasas del mapa a un indicador concreto?',
        'Si dos países tienen PIB similar pero trayectorias demográficas distintas, ¿qué escenarios de prosperidad se abren?',
        '¿Qué sesgos introduces al elegir una sola capa (población, PIB, área) sobre el globo?',
      ]}
    />
  );
}
