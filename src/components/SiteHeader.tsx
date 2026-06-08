'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SiteSectionsNav } from '@/components/layout/SiteSectionsNav';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const headerLinkClass = cn(
  'site-header-link inline-flex h-9 shrink-0 items-center justify-center',
  'rounded-md px-1 no-underline',
);

export function SiteHeader({
  trailing,
  variant = 'landing',
}: {
  trailing?: React.ReactNode;
  /** `landing` = título del sitio + nav por apartados; `tema` = solo enlace a / */
  variant?: 'landing' | 'tema';
}) {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-elevated">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {variant === 'tema' ? (
            <Link href="/" className={cn(headerLinkClass, 'text-sm font-medium')}>
              ← Inicio
            </Link>
          ) : (
            <Link
              href="/"
              className={cn(
                headerLinkClass,
                'max-w-[min(100%,14rem)] text-base font-semibold whitespace-nowrap sm:max-w-[min(100%,20rem)] sm:text-lg',
              )}
            >
              {siteConfig.title}
            </Link>
          )}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {trailing}
            <ThemeToggle />
          </div>
        </div>

        {variant === 'landing' && <SiteSectionsNav />}
      </div>
    </header>
  );
}
