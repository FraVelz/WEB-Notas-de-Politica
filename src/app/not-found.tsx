import type { Metadata } from 'next';
import { LandingShell } from '@/components/LandingShell';
import { NotFoundPage } from '@/components/NotFoundPage';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <LandingShell>
      <NotFoundPage />
    </LandingShell>
  );
}
