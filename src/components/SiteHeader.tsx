'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SiteSectionsNav } from '@/components/layout/SiteSectionsNav';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function SiteHeader({
  trailing,
  variant = 'landing',
}: {
  trailing?: React.ReactNode;
  /** `landing` = marca + nav; `tema` = enlace a inicio + nav */
  variant?: 'landing' | 'tema';
}) {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-elevated">
      <div
        className={cn(
          'mx-auto w-full max-w-6xl px-4 sm:px-6',
          variant === 'landing'
            ? 'grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-2 py-2 md:grid-cols-[auto_minmax(0,1fr)_auto] md:grid-rows-1 md:gap-x-6 md:py-0 md:h-14'
            : 'flex h-14 items-center gap-3 sm:gap-6',
        )}
      >
        {variant === 'tema' ? (
          <Link
            href="/"
            className="site-header-link inline-flex shrink-0 items-center text-sm font-medium text-foreground no-underline sm:text-base"
          >
            ← Inicio
          </Link>
        ) : (
          <Link
            href="/"
            title={siteConfig.title}
            className="site-header-link col-start-1 row-start-1 inline-flex max-w-[9rem] shrink-0 items-center truncate text-sm font-semibold text-foreground no-underline sm:max-w-[11rem] md:max-w-none md:text-base"
          >
            Prosperidad
          </Link>
        )}

        {variant === 'landing' && (
          <div className="col-span-2 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1">
            <SiteSectionsNav />
          </div>
        )}

        <div
          className={cn(
            'flex shrink-0 items-center gap-2 sm:gap-3',
            variant === 'landing'
              ? 'col-start-2 row-start-1 justify-self-end md:col-start-3'
              : 'ml-auto',
          )}
        >
          {trailing}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
