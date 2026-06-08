'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SiteSectionsNav } from '@/components/layout/SiteSectionsNav';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const brandLinkClass = cn(
  'site-header-link inline-flex shrink-0 items-center no-underline',
  'text-sm font-semibold text-foreground sm:text-base',
);

export function SiteHeader({
  trailing,
  variant = 'landing',
}: {
  trailing?: React.ReactNode;
  /** `landing` = marca + nav; `tema` = enlace a inicio */
  variant?: 'landing' | 'tema';
}) {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-elevated">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        {variant === 'tema' ? (
          <Link href="/" className={cn(brandLinkClass, 'font-medium')}>
            ← Inicio
          </Link>
        ) : (
          <Link href="/" className={brandLinkClass}>
            <span className="sm:hidden">Prosperidad</span>
            <span className="hidden sm:inline">{siteConfig.title}</span>
          </Link>
        )}

        {variant === 'landing' && (
          <div className="min-w-0 flex-1">
            <SiteSectionsNav />
          </div>
        )}

        <div
          className={cn(
            'flex shrink-0 items-center gap-2 sm:gap-3',
            variant === 'tema' && 'ml-auto',
          )}
        >
          {trailing}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
