import type { LucideIcon } from 'lucide-react';
import type { NavItem } from '@/lib/navigation';

type FeatureConfigModule = {
  nav?: NavItem[];
  navIcons?: Record<string, LucideIcon>;
};

/** Imports estáticos para que el bundler pueda hacer code-splitting por feature. */
export const featureConfigLoaders: Record<
  string,
  () => Promise<FeatureConfigModule>
> = {
  inicio: () => import('@/features/inicio/config'),
  filosofia: () => import('@/features/filosofia/config'),
  'teoria-del-estado': () => import('@/features/teoria-del-estado/config'),
  'gobierno-y-estructura-politica': () =>
    import('@/features/gobierno-y-estructura-politica/config'),
  'ideologias-politicas': () => import('@/features/ideologias-politicas/config'),
  'democracia-y-elecciones': () =>
    import('@/features/democracia-y-elecciones/config'),
  'relaciones-internacionales-y-geopolitica': () =>
    import('@/features/relaciones-internacionales-y-geopolitica/config'),
  economia: () => import('@/features/economia/config'),
  'derecho-y-constitucion': () =>
    import('@/features/derecho-y-constitucion/config'),
  'sociologia-politica': () => import('@/features/sociologia-politica/config'),
  historia: () => import('@/features/historia/config'),
  'seguridad-y-defensa': () => import('@/features/seguridad-y-defensa/config'),
  'politicas-publicas': () => import('@/features/politicas-publicas/config'),
  'comunicacion-politica': () =>
    import('@/features/comunicacion-politica/config'),
  'etica-politica': () => import('@/features/etica-politica/config'),
  'tecnologia-y-politica': () =>
    import('@/features/tecnologia-y-politica/config'),
  'medio-ambiente-y-recursos': () =>
    import('@/features/medio-ambiente-y-recursos/config'),
  'psicologia-politica': () => import('@/features/psicologia-politica/config'),
  'corrientes-y-modelos-modernos': () =>
    import('@/features/corrientes-y-modelos-modernos/config'),
  'religion-y-politica': () => import('@/features/religion-y-politica/config'),
  'cultura-politica': () => import('@/features/cultura-politica/config'),
  'politica-y-ciencia': () => import('@/features/politica-y-ciencia/config'),
  'politica-urbana': () => import('@/features/politica-urbana/config'),
  'poder-y-control-social': () =>
    import('@/features/poder-y-control-social/config'),
  'estadisticas-mundiales': () =>
    import('@/features/estadisticas-mundiales/config'),
  'globo-teraqueo-politico': () =>
    import('@/features/globo-teraqueo-politico/config'),
};
