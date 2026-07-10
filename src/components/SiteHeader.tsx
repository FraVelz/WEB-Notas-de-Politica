'use client';

import Link from 'next/link';
import { Bookmark, Compass } from 'lucide-react';
import { CommandPaletteHost } from '@/components/ui/CommandPalette';
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
    <header
      className={cn(
        'site-header sticky top-0 z-20 border-b border-border',
        variant === 'landing'
          ? 'surface-glass bg-elevated/70'
          : 'bg-elevated',
      )}
    >
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6',
          variant === 'landing'
            ? 'max-w-7xl grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-2 py-2 md:grid-cols-[auto_minmax(0,1fr)_auto] md:grid-rows-1 md:gap-x-6 md:py-0 md:h-14'
            : 'max-w-none flex h-14 items-center gap-3 sm:gap-6',
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
            className="site-header-link col-start-1 row-start-1 inline-flex max-w-[12rem] shrink-0 items-center gap-2.5 no-underline sm:max-w-none"
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-link-muted text-link"
              aria-hidden
            >
              <Compass className="size-4" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-[0.12em] text-foreground uppercase">
                Prosperidad
              </span>
              <span className="hidden truncate text-[0.65rem] text-muted-foreground sm:block">
                Conocimiento para el futuro
              </span>
            </span>
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
          {variant === 'landing' ? (
            <>
              <CommandPaletteHost />
              <ThemeToggle />
              <button
                type="button"
                className="hidden size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground sm:inline-flex"
                aria-label="Marcadores (próximamente)"
                title="Marcadores (próximamente)"
              >
                <Bookmark className="size-4" strokeWidth={1.75} />
              </button>
            </>
          ) : (
            <>
              {trailing}
              {!trailing ? <ThemeToggle /> : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
