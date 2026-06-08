/** Grupo visual en la landing (/) */
export type TemaGroupId =
  | 'fundamentos'
  | 'sistemas-e-ideas'
  | 'instituciones'
  | 'estado-en-accion'
  | 'debate-contemporaneo'
  | 'sociedad-y-poder'
  | 'datos';

export type TemaStatus = 'planned' | 'stub' | 'active';

/** Cómo se renderiza la página principal /[tema] */
export type TemaHubKind = 'tsx' | 'md';

/** Paleta visual del apartado (ver lib/temas/skins.ts). Si se omite, se usa la del grupo. */
export type TemaSkinId =
  | 'default'
  | 'parchment'
  | 'institution'
  | 'atlas'
  | 'ledger'
  | 'forum'
  | 'archive'
  | 'signal'
  | 'garden';

export type TemaDefinition = {
  /** Segmento de URL: /[id] y /[id]/... */
  id: string;
  title: string;
  /** Una línea para tarjetas y SEO */
  description: string;
  group: TemaGroupId;
  /** Orden dentro del grupo en la landing */
  order: number;
  status: TemaStatus;
  /** Hub del tema: casi siempre TSX */
  hub: TemaHubKind;
  /** Si true, no aparece en la grid de / (p. ej. inicio) */
  hiddenOnLanding?: boolean;
  /** Estilo propio bajo /[tema]; por defecto según `group` */
  skin?: TemaSkinId;
  /** Si true, muestra sidebar de docs (p. ej. apartados con muchas notas) */
  showSidebar?: boolean;
};

export type TemaGroup = {
  id: TemaGroupId;
  label: string;
  description: string;
};

/** Bloques mayores del header (3–4); agrupan varios `TemaGroup` */
export type TemaNavCategoryId =
  | 'marco-teorico'
  | 'poder-y-accion'
  | 'debate-actual'
  | 'datos';

export type TemaNavCategory = {
  id: TemaNavCategoryId;
  label: string;
  /** Secciones menores de la landing (`temaGroups`) incluidas en este bloque */
  groups: TemaGroupId[];
};
