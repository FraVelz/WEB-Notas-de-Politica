'use client';

import Link from 'next/link';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaBreadcrumb } from '@/components/ui/TemaBreadcrumb';

const corrientes = [
  'Liberalismo económico',
  'Liberalismo igualitario',
  'Socialdemocracia',
  'Conservadurismo',
  'Socialismos',
  'Nacionalismos',
] as const;

/** Orientación didáctica (− / ○ / +), no puntuación moral ni ranking. */
const matriz: Record<
  (typeof corrientes)[number],
  { economia: string; igualdad: string; tradicion: string }
> = {
  'Liberalismo económico': {
    economia: '+',
    igualdad: '○/−',
    tradicion: '○',
  },
  'Liberalismo igualitario': {
    economia: '○',
    igualdad: '+',
    tradicion: '○/−',
  },
  Socialdemocracia: {
    economia: '○',
    igualdad: '+',
    tradicion: '○',
  },
  Conservadurismo: {
    economia: '○/+',
    igualdad: '○',
    tradicion: '+',
  },
  Socialismos: {
    economia: '−',
    igualdad: '+',
    tradicion: '○/−',
  },
  Nacionalismos: {
    economia: '○',
    igualdad: '○',
    tradicion: '+',
  },
};

export default function MatrizIdeologiasPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <TemaBreadcrumb
        temaId="ideologias-politicas"
        currentLabel="Matriz orientativa de corrientes"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">
          Ideologías
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Matriz orientativa de corrientes
        </h1>
        <p className="text-lg text-muted-foreground">
          Cruce simplificado entre familias ideológicas y tres ejes: libertad
          económica, igualdad/redistribución y tradición/autoridad. Las celdas
          son hipótesis de énfasis típico (+ alto, ○ mixto/variable, − bajo), no
          un veredicto sobre qué corriente es «mejor» ni una medición de
          partidos reales.
        </p>
        <p className="text-sm text-muted-foreground">
          Relacionado:{' '}
          <Link
            href="/ideologias-politicas/mapa-de-corrientes"
            className="text-link underline-offset-2 hover:underline"
          >
            Mapa de corrientes
          </Link>
          {' · '}
          <Link
            href="/ideologias-politicas/valores-en-tension"
            className="text-link underline-offset-2 hover:underline"
          >
            Valores en tensión
          </Link>
        </p>
      </header>

      <ScenarioCallout variant="scenario">
        Usa la matriz para formular preguntas («¿dónde situarías un partido de
        tu país?»), no para etiquetar enemigos. Los híbridos y las excepciones
        son la norma.
      </ScenarioCallout>

      <ScenarioCallout variant="uncertainty">
        Etiquetas como «liberal» o «conservador» cambian de significado entre
        regiones. Un nacionalismo de izquierda y uno de derecha pueden compartir
        celda en «tradición» y divergir en economía.
      </ScenarioCallout>

      <div className="relative overflow-x-auto rounded-xl border border-border">
        <p className="m-0 border-b border-border bg-muted/40 px-3 py-1.5 text-[0.7rem] text-muted-foreground md:hidden">
          Desliza horizontalmente para ver todas las columnas
        </p>
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Matriz de corrientes ideológicas por ejes de libertad económica,
            igualdad y tradición
          </caption>
          <thead>
            <tr className="border-b border-border bg-elevated">
              <th scope="col" className="px-3 py-2 font-semibold">
                Corriente
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Libertad económica
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Igualdad
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Tradición
              </th>
            </tr>
          </thead>
          <tbody>
            {corrientes.map((nombre) => {
              const row = matriz[nombre];
              return (
                <tr key={nombre} className="border-b border-border last:border-0">
                  <th scope="row" className="px-3 py-2 font-medium">
                    {nombre}
                  </th>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {row.economia}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {row.igualdad}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {row.tradicion}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground">
        Leyenda: <span className="text-foreground">+</span> énfasis típico alto
        · <span className="text-foreground">○</span> mixto o muy variable ·{' '}
        <span className="text-foreground">−</span> énfasis típico bajo. No es
        una escala cardinal ni un ranking.
      </p>
    </div>
  );
}
