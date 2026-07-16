import { SiteHeader } from '@/components/SiteHeader';
import { SkipToContent } from '@/components/SkipToContent';

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="w-full" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
