import { LandingShell } from '@/components/LandingShell';
import { InicioPage } from '@/features/inicio/InicioPage';

export default function HomePage() {
  return (
    <LandingShell>
      <InicioPage />
    </LandingShell>
  );
}
