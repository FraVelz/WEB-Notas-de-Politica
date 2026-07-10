import type { Metadata } from 'next';
import { LandingShell } from '@/components/LandingShell';
import { TemasCatalogPage } from '@/features/inicio/components/TemasCatalogPage';

export const metadata: Metadata = {
  title: 'Todos los temas',
  description:
    'Catálogo completo de apartados por eje y subtema: teoría, poder, debate y datos.',
};

export default function TemasPage() {
  return (
    <LandingShell>
      <TemasCatalogPage />
    </LandingShell>
  );
}
