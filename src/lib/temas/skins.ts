import { getTemaById } from '@/lib/temas/registry';
import type {
  TemaDefinition,
  TemaGroupId,
  TemaSkinId,
} from '@/lib/temas/types';

export type TemaHeaderStyle = 'default' | 'inverted' | 'accent-band';

export type { TemaSkinId };

type SkinTokens = {
  bg: string;
  bgMuted: string;
  bgElevated: string;
  text: string;
  textMuted: string;
  border: string;
  accentLow: string;
  accent: string;
  accentHigh: string;
  accentOn: string;
  selectionBg: string;
  selectionText: string;
  focusRing: string;
  shadow: string;
  fontFamily?: string;
  headerStyle?: TemaHeaderStyle;
};

type SkinPreset = { light: SkinTokens; dark: SkinTokens };

/** Paleta base blanco y negro (alineada con globals.css). */
const monoLight: SkinTokens = {
  bg: '#f5f5f5',
  bgMuted: '#ebebeb',
  bgElevated: '#ffffff',
  text: '#0a0a0a',
  textMuted: '#525252',
  border: '#d4d4d4',
  accentLow: '#e5e5e5',
  accent: '#171717',
  accentHigh: '#000000',
  accentOn: '#ffffff',
  selectionBg: '#171717',
  selectionText: '#ffffff',
  focusRing: '#0070f3',
  shadow: '0 8px 24px rgb(0 0 0 / 8%)',
  headerStyle: 'default',
};

/** Oscuro alineado con nextjs.org (negro #000, blanco #fff, muted #888). */
const monoDark: SkinTokens = {
  bg: '#000000',
  bgMuted: '#0a0a0a',
  bgElevated: '#0a0a0a',
  text: '#ffffff',
  textMuted: '#888888',
  border: '#333333',
  accentLow: '#1a1a1a',
  accent: '#ffffff',
  accentHigh: '#ffffff',
  accentOn: '#000000',
  selectionBg: '#ffffff',
  selectionText: '#000000',
  focusRing: '#0070f3',
  shadow: '0 0 0 1px rgb(255 255 255 / 12%)',
  headerStyle: 'default',
};

function preset(
  light: Partial<SkinTokens> = {},
  dark: Partial<SkinTokens> = {},
): SkinPreset {
  return {
    light: { ...monoLight, ...light },
    dark: { ...monoDark, ...dark },
  };
}

const defaultByGroup: Record<TemaGroupId, TemaSkinId> = {
  fundamentos: 'parchment',
  'sistemas-e-ideas': 'atlas',
  instituciones: 'institution',
  'estado-en-accion': 'archive',
  'debate-contemporaneo': 'forum',
  'sociedad-y-poder': 'garden',
  datos: 'ledger',
};

/** Variantes en escala de grises: misma lógica B/N, tonos y tipografía ligeramente distintos. */
const presets: Record<TemaSkinId, SkinPreset> = {
  default: preset(),
  parchment: preset(
    {
      bg: '#f4f4f2',
      bgMuted: '#e8e8e6',
      border: '#cfcfcb',
      headerStyle: 'accent-band',
      fontFamily:
        '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
    },
    {
      headerStyle: 'accent-band',
      fontFamily:
        '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
    },
  ),
  institution: preset(
    { bg: '#f3f3f4', bgMuted: '#e6e6e8', headerStyle: 'inverted' },
    { headerStyle: 'inverted' },
  ),
  atlas: preset(
    { bg: '#f2f3f3', bgMuted: '#e4e6e6', headerStyle: 'accent-band' },
    { headerStyle: 'accent-band' },
  ),
  ledger: preset(
    {
      bg: '#f6f6f6',
      fontFamily:
        'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
    },
    {
      fontFamily:
        'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
    },
  ),
  forum: preset(
    { bg: '#f7f6f5', bgMuted: '#eceae8', headerStyle: 'inverted' },
    { headerStyle: 'inverted' },
  ),
  archive: preset(
    { bg: '#f6f5f3', bgMuted: '#eae8e4', headerStyle: 'accent-band' },
    { headerStyle: 'accent-band' },
  ),
  signal: preset(
    { bg: '#f4f4f6', bgMuted: '#e8e8ec', headerStyle: 'inverted' },
    { headerStyle: 'inverted' },
  ),
  garden: preset(),
};

function tokensToDeclarations(tokens: SkinTokens): string {
  const lines = [
    `--bg: ${tokens.bg}`,
    `--bg-muted: ${tokens.bgMuted}`,
    `--bg-elevated: ${tokens.bgElevated}`,
    `--text: ${tokens.text}`,
    `--text-muted: ${tokens.textMuted}`,
    `--border: ${tokens.border}`,
    `--accent-low: ${tokens.accentLow}`,
    `--accent: ${tokens.accent}`,
    `--accent-high: ${tokens.accentHigh}`,
    `--accent-on: ${tokens.accentOn}`,
    `--selection-bg: ${tokens.selectionBg}`,
    `--selection-text: ${tokens.selectionText}`,
    `--focus-ring: ${tokens.focusRing}`,
    `--shadow: ${tokens.shadow}`,
  ];
  if (tokens.fontFamily) {
    lines.push(`--font-tema: ${tokens.fontFamily}`);
  }
  return lines.join('; ');
}

export function resolveSkinId(tema: TemaDefinition): TemaSkinId {
  return tema.skin ?? defaultByGroup[tema.group] ?? 'default';
}

export function getTemaSkin(temaId: string) {
  const meta = getTemaById(temaId);
  const skinId = meta ? resolveSkinId(meta) : 'default';
  const presetDef = presets[skinId];
  return {
    id: skinId,
    headerStyle: presetDef.light.headerStyle ?? 'default',
    css: buildTemaSkinCss(temaId, presetDef),
  };
}

function buildTemaSkinCss(temaId: string, presetDef: SkinPreset): string {
  const selector = `[data-tema="${temaId}"]`;
  const light = tokensToDeclarations(presetDef.light);
  const dark = tokensToDeclarations(presetDef.dark);
  return [
    `${selector}{${light}}`,
    `:root[data-theme="dark"] ${selector}, [data-theme="dark"] ${selector}{${dark}}`,
  ].join('\n');
}
