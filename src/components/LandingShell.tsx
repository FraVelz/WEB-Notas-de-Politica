import { SiteHeader } from '@/components/SiteHeader';

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        {children}
      </main>
    </>
  );
}
