import type {
  TemaDefinition,
  TemaGroup,
  TemaNavCategory,
} from './types';

/** Etiquetas de los bloques de la landing */
export const temaGroups: TemaGroup[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    description:
      'Base teórica: cómo debería funcionar una sociedad y el Estado.',
  },
  {
    id: 'sistemas-e-ideas',
    label: 'Sistemas e ideas',
    description:
      'Ideologías, participación ciudadana y relaciones entre países.',
  },
  {
    id: 'instituciones',
    label: 'Instituciones',
    description: 'Economía, ley y vínculo entre sociedad y poder.',
  },
  {
    id: 'estado-en-accion',
    label: 'Estado en acción',
    description: 'Historia del poder, seguridad y políticas públicas.',
  },
  {
    id: 'debate-contemporaneo',
    label: 'Debate contemporáneo',
    description: 'Comunicación, ética y tecnología aplicadas al poder.',
  },
  {
    id: 'sociedad-y-poder',
    label: 'Sociedad y poder',
    description:
      'Cultura, religión, ciencia, ciudad y control social en el presente.',
  },
  {
    id: 'datos',
    label: 'Datos',
    description: 'Estadísticas y contexto cuantitativo mundial.',
  },
];

/**
 * Títulos mayores del header (pocos, fijos). Cada uno agrupa secciones de `temaGroups`.
 * Al añadir un tema nuevo, asígnalo a un `group`; el bloque del header se deduce de aquí.
 */
export const temaNavCategories: TemaNavCategory[] = [
  {
    id: 'marco-teorico',
    label: 'Marco teórico',
    description:
      'Base conceptual: sociedad, ideas que la organizan e instituciones que la sostienen.',
    groups: ['fundamentos', 'sistemas-e-ideas', 'instituciones'],
  },
  {
    id: 'poder-y-accion',
    label: 'Poder y acción',
    description: 'Cómo se ejerce el poder y cómo se manifiesta en la sociedad.',
    groups: ['estado-en-accion', 'sociedad-y-poder'],
  },
  {
    id: 'debate-actual',
    label: 'Debate actual',
    description:
      'Temas del presente: comunicación, ética y tecnología aplicadas al poder.',
    groups: ['debate-contemporaneo'],
  },
  {
    id: 'datos',
    label: 'Datos',
    description: 'Estadísticas y contexto cuantitativo para entender el mundo.',
    groups: ['datos'],
  },
];

/**
 * Catálogo de temas (features).
 * URL: /{id} → hub · /{id}/cualquier/ruta → content/*.md o pages/*.tsx
 */
export const temas: TemaDefinition[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    description: 'Página principal y archivo de bienvenida.',
    group: 'fundamentos',
    order: 0,
    status: 'active',
    hub: 'tsx',
    hiddenOnLanding: true,
    skin: 'default',
  },
  // —— Fundamentos ——
  {
    id: 'filosofia',
    title: 'Filosofía y filosofía política',
    description:
      'Base teórica de cómo debería funcionar una sociedad.',
    group: 'fundamentos',
    order: 1,
    status: 'planned',
    hub: 'tsx',
    skin: 'parchment',
  },
  {
    id: 'teoria-del-estado',
    title: 'Teoría del Estado',
    description: 'Cómo nace, funciona y se legitima el Estado.',
    group: 'fundamentos',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'gobierno-y-estructura-politica',
    title: 'Gobierno y estructura política',
    description: 'Cómo se organiza el poder.',
    group: 'fundamentos',
    order: 3,
    status: 'planned',
    hub: 'tsx',
    skin: 'institution',
  },

  // —— Sistemas e ideas ——
  {
    id: 'ideologias-politicas',
    title: 'Ideologías políticas',
    description:
      'Sistemas de ideas sobre cómo debe organizarse la sociedad.',
    group: 'sistemas-e-ideas',
    order: 1,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'democracia-y-elecciones',
    title: 'Democracia y elecciones',
    description: 'Cómo participa la población.',
    group: 'sistemas-e-ideas',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'relaciones-internacionales-y-geopolitica',
    title: 'Relaciones internacionales y geopolítica',
    description: 'Relaciones de poder entre países.',
    group: 'sistemas-e-ideas',
    order: 3,
    status: 'planned',
    hub: 'tsx',
    skin: 'atlas',
  },

  // —— Instituciones ——
  {
    id: 'economia',
    title: 'Economía y economía política',
    description: 'Relación entre economía y poder.',
    group: 'instituciones',
    order: 1,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'derecho-y-constitucion',
    title: 'Derecho y constitución',
    description: 'Normas que organizan el poder.',
    group: 'instituciones',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'sociologia-politica',
    title: 'Sociología política',
    description: 'Cómo interactúan sociedad y poder.',
    group: 'instituciones',
    order: 3,
    status: 'planned',
    hub: 'tsx',
  },

  // —— Estado en acción ——
  {
    id: 'historia',
    title: 'Historia e historia política',
    description: 'Evolución histórica del poder.',
    group: 'estado-en-accion',
    order: 1,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'seguridad-y-defensa',
    title: 'Seguridad y defensa',
    description: 'Uso de fuerza y control interno.',
    group: 'estado-en-accion',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'politicas-publicas',
    title: 'Políticas públicas',
    description: 'Cómo se diseñan soluciones estatales.',
    group: 'estado-en-accion',
    order: 3,
    status: 'planned',
    hub: 'tsx',
  },

  // —— Debate contemporáneo ——
  {
    id: 'comunicacion-politica',
    title: 'Comunicación política',
    description:
      'Cómo se transmite y manipula la información política.',
    group: 'debate-contemporaneo',
    order: 1,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'etica-politica',
    title: 'Ética política',
    description: 'Problemas morales del poder.',
    group: 'debate-contemporaneo',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'tecnologia-y-politica',
    title: 'Tecnología y política',
    description: 'Digitalización, datos y poder.',
    group: 'debate-contemporaneo',
    order: 3,
    status: 'planned',
    hub: 'tsx',
  },

  // —— Sociedad y poder ——
  {
    id: 'medio-ambiente-y-recursos',
    title: 'Medio ambiente y recursos',
    description: 'Política ecológica y energética.',
    group: 'sociedad-y-poder',
    order: 1,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'psicologia-politica',
    title: 'Psicología política',
    description: 'Cómo piensa y actúa la gente políticamente.',
    group: 'sociedad-y-poder',
    order: 2,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'corrientes-y-modelos-modernos',
    title: 'Corrientes y modelos modernos',
    description: 'Temas contemporáneos.',
    group: 'sociedad-y-poder',
    order: 3,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'religion-y-politica',
    title: 'Religión y política',
    description: 'Fe, instituciones y poder público.',
    group: 'sociedad-y-poder',
    order: 4,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'cultura-politica',
    title: 'Cultura política',
    description: 'Símbolos, identidad y hábitos políticos.',
    group: 'sociedad-y-poder',
    order: 5,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'politica-y-ciencia',
    title: 'Política y ciencia',
    description: 'Evidencia, investigación y decisiones públicas.',
    group: 'sociedad-y-poder',
    order: 6,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'politica-urbana',
    title: 'Política urbana',
    description: 'Ciudad, territorio y gobernanza local.',
    group: 'sociedad-y-poder',
    order: 7,
    status: 'planned',
    hub: 'tsx',
  },
  {
    id: 'poder-y-control-social',
    title: 'Poder y control social',
    description: 'Mecanismos de dominación y resistencia.',
    group: 'sociedad-y-poder',
    order: 8,
    status: 'planned',
    hub: 'tsx',
  },

  // —— Datos ——
  {
    id: 'estadisticas-mundiales',
    title: 'Estadísticas mundiales generales',
    description: 'Datos globales para contextualizar la política.',
    group: 'datos',
    order: 1,
    status: 'active',
    hub: 'tsx',
    immersiveHub: true,
  },
  {
    id: 'globo-teraqueo-politico',
    title: 'Globo terráqueo político',
    description: 'Mapa global interactivo para ver mejor las fronteras y los países.',
    group: 'datos',
    order: 2,
    status: 'active',
    hub: 'tsx',
  },
];

export function getTemasForLanding() {
  return temas.filter((t) => !t.hiddenOnLanding);
}

export function getTemaById(id: string): TemaDefinition | undefined {
  return temas.find((t) => t.id === id);
}

export function getTemasByGroup(groupId: TemaDefinition['group']) {
  return temas
    .filter((t) => t.group === groupId)
    .sort((a, b) => a.order - b.order);
}

export function getTemasGrouped() {
  return temaGroups.map((group) => ({
    group,
    temas: getTemasByGroup(group.id).filter((t) => !t.hiddenOnLanding),
  }));
}

export function getNavCategoriesGrouped() {
  const groupedByGroupId = new Map(
    getTemasGrouped().map((entry) => [entry.group.id, entry]),
  );

  return temaNavCategories.map((category) => ({
    category,
    sections: category.groups
      .map((groupId) => groupedByGroupId.get(groupId))
      .filter((entry): entry is NonNullable<typeof entry> => entry != null),
  }));
}
