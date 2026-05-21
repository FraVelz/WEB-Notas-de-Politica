import type { Metadata } from 'next';
import { LandingShell } from '@/components/LandingShell';
import { InicioPage } from '@/features/inicio/InicioPage';
import { siteConfig } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Inicio',
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <LandingShell>
      <InicioPage />
    </LandingShell>
  );
}
