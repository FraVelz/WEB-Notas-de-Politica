'use client';

import Link from 'next/link';
import { ScenarioCallout } from '@/components/ui/ScenarioCallout';
import { TemaPageHeader } from '@/components/ui/TemaPageHeader';

const milestones = [
  {
    year: '1648',
    region: 'Europa → difusión global',
    title: 'Westfalia como símbolo de soberanía territorial',
    hypothesis:
      'Si el Estado-nación se consolida como unidad dominante, sube la probabilidad de guerras interestatales «clásicas» y de burocracias territoriales — pero no garantiza derechos ni prosperidad.',
  },
  {
    year: '1868',
    region: 'Japón / eco en Asia',
    title: 'Restauración Meiji y modernización estatal',
    hypothesis:
      'Bajo amenaza externa, coaliciones reformistas pueden elevar capacidad administrativa e industrial en pocas décadas; el costo político y social es contingente, no un precio fijo.',
  },
  {
    year: '1945–60',
    region: 'Asia, África, Caribe',
    title: 'Descolonización y nuevos Estados',
    hypothesis:
      'Independencia formal eleva soberanía jurídica; la capacidad fiscal y judicial suele rezagarse. Escenarios van desde consolidación gradual hasta fragmentación o captura elite.',
  },
  {
    year: '1948',
    region: 'Orden global (desigual)',
    title: 'Declaración Universal y arquitectura de posguerra',
    hypothesis:
      'Normas internacionales y finanzas (Bretton Woods) condicionan políticas domésticas; la adhesión formal no predice cumplimiento ni redistribución interna.',
  },
  {
    year: '1978–',
    region: 'China → efectos mundiales',
    title: 'Reforma y apertura sin liberalización política plena',
    hypothesis:
      'Crecimiento alto es compatible con diseños no liberales en algunos escenarios; exportar el patrón sin las mismas condiciones demográficas, geográficas y de coalición es una apuesta frágil.',
  },
  {
    year: '1989–91',
    region: 'Europa del Este / global',
    title: 'Fin de la Guerra Fría',
    hypothesis:
      'El colapso de un bloque abre ventanas de reforma; también eleva incertidumbre, privatizaciones desiguales y nostalgia autoritaria. La transición no es unidireccional.',
  },
  {
    year: '1994–',
    region: 'África austral / símbolo global',
    title: 'Fin del apartheid en Sudáfrica',
    hypothesis:
      'Transición negociada puede estabilizar reglas formales; desigualdad heredada y violencia urbana pueden persistir — el cambio constitucional no borra estructuras socioeconómicas de golpe.',
  },
  {
    year: '2008–',
    region: 'Global (Norte y Sur)',
    title: 'Crisis financiera y reordenamiento de expectativas',
    hypothesis:
      'Choques macroeconómicos desplazan coaliciones: más regulación aquí, austeridad allá, auge de populismos. Un mismo shock produce escenarios institucionales distintos según buffers fiscales y confianza.',
  },
] as const;

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-8">
      <TemaPageHeader
        temaId="historia"
        eyebrow="Historia"
        title="Línea de tiempo institucional"
        description="Marcadores multi-región para formular hipótesis sobre capacidad, contención y legitimidad. No son hitos de un destino único."
        relatedHref="/historia/lineas-de-tiempo-comparadas"
        relatedLabel="Líneas de tiempo comparadas"
      />

      <ScenarioCallout variant="scenario">
        Cada fecha altera <em>probabilidades</em> (reforma, reversión,
        estancamiento). Dos países pueden compartir el año y divergir en
        resultado: anota coaliciones, recursos y shocks externos antes de
        inferir causalidad.
      </ScenarioCallout>

      <ol className="relative m-0 list-none space-y-0 border-l-2 border-link/30 pl-0">
        {milestones.map((m) => (
          <li key={m.year + m.title} className="relative pb-10 pl-8 last:pb-0">
            <span
              className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-link bg-elevated shadow-[var(--shadow-theme)]"
              aria-hidden
            />
            <div className="rounded-xl border border-border bg-elevated p-4 shadow-[var(--shadow-theme)] transition-colors hover:border-link/40">
              <p className="m-0 text-xs font-semibold tracking-wide text-link uppercase">
                {m.year} · {m.region}
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                {m.title}
              </h2>
              <ScenarioCallout variant="uncertainty" className="mt-3">
                {m.hypothesis}
              </ScenarioCallout>
            </div>
          </li>
        ))}
      </ol>

      <ScenarioCallout variant="trend">
        Para contrastar resultados contemporáneos (ingreso, impuestos,
        seguridad), usa el{' '}
        <Link
          href="/estadisticas-mundiales/indicadores"
          className="text-link underline-offset-2 hover:underline"
        >
          comparador de indicadores
        </Link>
        : son snapshots, no veredictos históricos. También:{' '}
        <Link
          href="/historia/patrones-institucionales"
          className="text-link underline-offset-2 hover:underline"
        >
          patrones institucionales
        </Link>
        .
      </ScenarioCallout>
    </div>
  );
}
