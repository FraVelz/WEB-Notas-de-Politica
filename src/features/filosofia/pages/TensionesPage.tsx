'use client';

import Link from 'next/link';
import { CountryCompare } from '@/components/ui/CountryCompare';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaBreadcrumb } from '@/components/ui/TemaBreadcrumb';

export default function TensionesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <TemaBreadcrumb
        temaId="filosofia"
        currentLabel="Tensiones: valores y señales débiles"
      />
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">
          Filosofía
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Tensiones: valores y señales débiles
        </h1>
        <p className="text-lg text-muted-foreground">
          Libertad, igualdad, orden y sostenibilidad pueden chocar. La esperanza
          de vida es un proxy muy débil de «vida buena»: resume salud agregada,
          no justicia ni autonomía. Sirve solo como contexto empírico mientras
          lees las tensiones normativas.
        </p>
        <p className="text-sm text-muted-foreground">
          Relacionado:{' '}
          <Link
            href="/filosofia/prosperidad-como-pregunta"
            className="text-link underline-offset-2 hover:underline"
          >
            Prosperidad como pregunta
          </Link>
          {' · '}
          <Link
            href="/estadisticas-mundiales/indicadores"
            className="text-link underline-offset-2 hover:underline"
          >
            Comparador global
          </Link>
        </p>
      </header>

      <ScenarioCallout variant="uncertainty">
        Un país con esperanza de vida alta puede ser injusto o poco libre; uno
        con esperanza más baja puede estar mejorando rápido en otras
        dimensiones. No uses esta gráfica para «ganar» un debate filosófico.
      </ScenarioCallout>

      <ScenarioCallout variant="scenario">
        Prueba anclar en tu país y en peers de distintas regiones. Pregunta:
        ¿qué trade-offs estarías dispuesto a aceptar para mover esta señal — y
        cuáles no?
      </ScenarioCallout>

      <CountryCompare
        indicatorId="life-expectancy"
        title="Esperanza de vida (proxy débil, solo contexto)"
        defaultCountries={['COL', 'DEU', 'KOR', 'ZAF', 'IND', 'BRA']}
      />
    </div>
  );
}
