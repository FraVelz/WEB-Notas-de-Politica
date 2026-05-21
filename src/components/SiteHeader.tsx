'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
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
  /** `landing` = título del sitio; `tema` = solo enlace a / */
  variant?: 'landing' | 'tema';
}) {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-elevated">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {variant === 'tema' ? (
          <Link href="/" className={cn(headerLinkClass, 'text-sm font-medium')}>
            ← Inicio
          </Link>
        ) : (
          <Link
            href="/"
            className={cn(
              headerLinkClass,
              'max-w-[min(100%,20rem)] text-lg font-semibold whitespace-nowrap',
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
    </header>
  );
}
