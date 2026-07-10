import { RichTemaHub } from '@/components/RichTemaHub';

export function FilosofiaHub({ temaId = 'filosofia' }: { temaId?: string }) {
  return (
    <RichTemaHub
      temaId={temaId}
      groupLabel="Fundamentos"
      guidingQuestions={[
        '¿Qué ideas de «buena vida» o justicia suelen justificar el poder en distintas tradiciones?',
        'Si dos sociedades priorizan libertad e igualdad de forma distinta, ¿qué escenarios de prosperidad se abren o se cierran?',
        '¿Qué tensiones filosóficas aparecen cuando medimos prosperidad solo con indicadores agregados?',
      ]}
    />
  );
}
