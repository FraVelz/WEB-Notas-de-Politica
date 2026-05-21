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
};

export type TemaGroup = {
  id: TemaGroupId;
  label: string;
  description: string;
};
