import type { ComponentType } from 'react';

type TsxPageLoader = () => Promise<{ default: ComponentType }>;

const customTsxPages: Record<string, Record<string, TsxPageLoader>> = {
  inicio: {
    bienvenida: () =>
      import('@/features/inicio/components/BienvenidaPage').then((m) => ({
        default: m.BienvenidaPage,
      })),
  },
  'estadisticas-mundiales': {
    mapa: () =>
      import('@/features/estadisticas-mundiales/pages/MapaPage'),
    indicadores: () =>
      import('@/features/estadisticas-mundiales/pages/IndicadoresPage'),
  },
  economia: {
    dashboard: () =>
      import('@/features/economia/pages/DashboardEconomiaPage'),
  },
  'derecho-y-constitucion': {
    comparador: () =>
      import('@/features/derecho-y-constitucion/pages/ComparadorInstitucionalPage'),
  },
  'sociologia-politica': {
    desigualdad: () =>
      import('@/features/sociologia-politica/pages/DesigualdadPage'),
  },
  filosofia: {
    tensiones: () => import('@/features/filosofia/pages/TensionesPage'),
  },
  'teoria-del-estado': {
    capacidad: () =>
      import('@/features/teoria-del-estado/pages/CapacidadEstatalPage'),
  },
  'gobierno-y-estructura-politica': {
    comparador: () =>
      import(
        '@/features/gobierno-y-estructura-politica/pages/ComparadorGobiernoPage'
      ),
  },
  'ideologias-politicas': {
    matriz: () =>
      import('@/features/ideologias-politicas/pages/MatrizIdeologiasPage'),
  },
  'democracia-y-elecciones': {
    senales: () =>
      import('@/features/democracia-y-elecciones/pages/SenalesDemocraciaPage'),
  },
  'relaciones-internacionales-y-geopolitica': {
    'ficha-comparativa': () =>
      import(
        '@/features/relaciones-internacionales-y-geopolitica/pages/FichaComparativaPage'
      ),
  },
  historia: {
    timeline: () => import('@/features/historia/pages/TimelinePage'),
  },
  'seguridad-y-defensa': {
    homicidios: () =>
      import('@/features/seguridad-y-defensa/pages/HomicidiosPage'),
  },
  'politicas-publicas': {
    'metricas-evaluacion': () =>
      import('@/features/politicas-publicas/pages/MetricasEvaluacionPage'),
  },
  'comunicacion-politica': {
    'contexto-comunicacion': () =>
      import('@/features/comunicacion-politica/pages/ContextoComunicacionPage'),
  },
  'etica-politica': {
    'senales-integridad': () =>
      import('@/features/etica-politica/pages/SenalesIntegridadPage'),
  },
  'tecnologia-y-politica': {
    'adopcion-digital': () =>
      import('@/features/tecnologia-y-politica/pages/AdopcionDigitalPage'),
  },
  'medio-ambiente-y-recursos': {
    emisiones: () =>
      import('@/features/medio-ambiente-y-recursos/pages/EmisionesPage'),
  },
  'psicologia-politica': {
    'contexto-psicologia': () =>
      import('@/features/psicologia-politica/pages/ContextoPsicologiaPage'),
  },
  'corrientes-y-modelos-modernos': {
    modelos: () =>
      import('@/features/corrientes-y-modelos-modernos/pages/ModelosPage'),
  },
  'religion-y-politica': {
    'contexto-religion': () =>
      import('@/features/religion-y-politica/pages/ContextoReligionPage'),
  },
  'cultura-politica': {
    'contexto-cultura': () =>
      import('@/features/cultura-politica/pages/ContextoCulturaPage'),
  },
  'politica-y-ciencia': {
    'inversion-id': () =>
      import('@/features/politica-y-ciencia/pages/InversionIDPage'),
  },
  'politica-urbana': {
    urbanizacion: () =>
      import('@/features/politica-urbana/pages/UrbanizacionPage'),
  },
  'poder-y-control-social': {
    'contexto-poder': () =>
      import('@/features/poder-y-control-social/pages/ContextoPoderPage'),
  },
};

const pageMeta: Record<string, Record<string, { title: string; description?: string }>> =
  {
    inicio: {
      bienvenida: {
        title: 'Prosperidad',
        description:
          'Web Prosperity — búsqueda de la prosperidad de una nación: política, filosofía e ideas para comprender el mundo',
      },
    },
    'estadisticas-mundiales': {
      mapa: {
        title: 'Mapa mundial',
        description:
          'Mapa MapLibre para situar países y fronteras; el comparador de indicadores lleva las series con fuentes',
      },
      indicadores: {
        title: 'Comparador de indicadores',
        description:
          'Compara PIB, esperanza de vida, Gini y más entre cualquier país — señales para escenarios, no verdades absolutas',
      },
    },
    economia: {
      dashboard: {
        title: 'Dashboard económico',
        description:
          'PIB per cápita y contraste entre países como señales, no como veredicto de prosperidad',
      },
    },
    'derecho-y-constitucion': {
      comparador: {
        title: 'Comparador institucional',
        description:
          'Ingresos tributarios como señal imperfecta de capacidad estatal entre países',
      },
    },
    'sociologia-politica': {
      desigualdad: {
        title: 'Desigualdad (Gini)',
        description:
          'Compara desigualdad de ingreso entre países y plantea escenarios de movilidad',
      },
    },
    filosofia: {
      tensiones: {
        title: 'Tensiones filosóficas',
        description:
          'Esperanza de vida como contexto débil para debatir prosperidad y buena vida',
      },
    },
    'teoria-del-estado': {
      capacidad: {
        title: 'Capacidad estatal',
        description:
          'Señales de capacidad fiscal entre países — escenarios, no dogmas',
      },
    },
    'gobierno-y-estructura-politica': {
      comparador: {
        title: 'Comparador de gobierno',
        description:
          'Contraste de ingreso entre diseños institucionales — hipótesis abiertas',
      },
    },
    'ideologias-politicas': {
      matriz: {
        title: 'Matriz de ideologías',
        description:
          'Herramienta de análisis de corrientes × valores — sin ranking moral',
      },
    },
    'democracia-y-elecciones': {
      senales: {
        title: 'Señales y contexto',
        description:
          'Contexto económico junto a la democracia — no sustituye índices especializados',
      },
    },
    'relaciones-internacionales-y-geopolitica': {
      'ficha-comparativa': {
        title: 'Ficha comparativa',
        description:
          'Compara ingreso entre países para escenarios geopolíticos',
      },
    },
    historia: {
      timeline: {
        title: 'Línea de tiempo comparada',
        description:
          'Hitos institucionales multi-región como hipótesis, no teleología',
      },
    },
    'seguridad-y-defensa': {
      homicidios: {
        title: 'Homicidios',
        description:
          'Indicador de homicidios con advertencias de comparabilidad',
      },
    },
    'politicas-publicas': {
      'metricas-evaluacion': {
        title: 'Métricas de evaluación',
        description:
          'I+D y otras señales para evaluar políticas como hipótesis',
      },
    },
    'comunicacion-politica': {
      'contexto-comunicacion': {
        title: 'Contexto de comunicación',
        description:
          'Desigualdad como proxy débil de clivajes — con límites explícitos',
      },
    },
    'etica-politica': {
      'senales-integridad': {
        title: 'Señales de integridad',
        description:
          'Proxies fiscales imperfectos — no sustituyen índices de corrupción',
      },
    },
    'tecnologia-y-politica': {
      'adopcion-digital': {
        title: 'Adopción digital / I+D',
        description:
          'Gasto en I+D como señal de capacidad tecnológica del Estado',
      },
    },
    'medio-ambiente-y-recursos': {
      emisiones: {
        title: 'Emisiones de CO₂',
        description:
          'Emisiones per cápita para escenarios clima–desarrollo',
      },
    },
    'psicologia-politica': {
      'contexto-psicologia': {
        title: 'Contexto psicológico-social',
        description:
          'Desigualdad como contexto — no mide sesgos cognitivos directamente',
      },
    },
    'corrientes-y-modelos-modernos': {
      modelos: {
        title: 'Modelos e ingreso',
        description:
          'PIB per cápita junto a debates de modelos económicos',
      },
    },
    'religion-y-politica': {
      'contexto-religion': {
        title: 'Contexto desarrollo',
        description:
          'Señal de desarrollo solo como trasfondo — no mide religión',
      },
    },
    'cultura-politica': {
      'contexto-cultura': {
        title: 'Urbanización y cultura',
        description:
          'Urbanización como contexto de cambio cultural-político',
      },
    },
    'politica-y-ciencia': {
      'inversion-id': {
        title: 'Inversión en I+D',
        description:
          'Gasto en investigación como señal de política científica',
      },
    },
    'politica-urbana': {
      urbanizacion: {
        title: 'Urbanización',
        description:
          'Población urbana entre países — escenarios de gobernanza local',
      },
    },
    'poder-y-control-social': {
      'contexto-poder': {
        title: 'Alcance estatal',
        description:
          'Ingresos tributarios como proxy imperfecto de alcance del Estado',
      },
    },
  };

export function getTsxStaticPaths(): { tema: string; slug: string[] }[] {
  const paths: { tema: string; slug: string[] }[] = [];

  for (const [tema, pages] of Object.entries(customTsxPages)) {
    for (const slug of Object.keys(pages)) {
      paths.push({ tema, slug: slug.split('/') });
    }
  }

  return paths;
}

export async function resolveTemaTsxPage(
  temaId: string,
  slug: string,
): Promise<ComponentType | null> {
  const loader = customTsxPages[temaId]?.[slug];
  if (!loader) return null;

  const mod = await loader();
  return mod.default;
}

export function getTsxPageMeta(
  temaId: string,
  slug: string,
): { title: string; description?: string } | null {
  return pageMeta[temaId]?.[slug] ?? null;
}

/** Herramientas TSX registradas para un tema (hubs / “Explorar”). */
export function getTemaTsxTools(
  temaId: string,
): Array<{ slug: string; href: string; title: string; description?: string }> {
  const pages = customTsxPages[temaId];
  if (!pages) return [];
  return Object.keys(pages).map((slug) => {
    const meta = pageMeta[temaId]?.[slug];
    return {
      slug,
      href: `/${temaId}/${slug}`,
      title: meta?.title ?? slug,
      description: meta?.description,
    };
  });
}
