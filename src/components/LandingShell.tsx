import { SiteHeader } from '@/components/SiteHeader';

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="w-full">{children}</main>
    </>
  );
}
