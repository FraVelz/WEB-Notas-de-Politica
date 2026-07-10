'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu } from 'lucide-react';
import { CommandPaletteHost } from '@/components/ui/CommandPalette';
import { BookmarksMenu } from '@/components/ui/BookmarksMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SiteSectionsNav } from '@/components/layout/SiteSectionsNav';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function SiteHeader({
  trailing,
  variant = 'landing',
  hideBrandLink = false,
  backHref = '/',
}: {
  trailing?: React.ReactNode;
  /** `landing` = marca + nav; `tema` = enlace atrás + nav */
  variant?: 'landing' | 'tema';
  /** Oculta “← Atrás” cuando el shell ya tiene top bar propia */
  hideBrandLink?: boolean;
  /** Destino del enlace “← Atrás” en variante tema */
  backHref?: string;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (variant === 'tema' && hideBrandLink) {
    return null;
  }

  return (
    <header
      className={cn(
        'site-header sticky top-0 z-20 border-b border-border',
        variant === 'landing' ? 'surface-glass bg-elevated/70' : 'bg-elevated',
      )}
    >
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6',
          variant === 'landing'
            ? 'relative flex h-14 max-w-7xl items-center gap-2 sm:gap-3 md:gap-6'
            : 'flex h-14 max-w-none items-center gap-3 sm:gap-6',
        )}
      >
        {variant === 'tema' ? (
          <Link
            href={backHref}
            className="site-header-link inline-flex shrink-0 items-center text-sm font-medium text-foreground no-underline sm:text-base"
          >
            ← Atrás
          </Link>
        ) : (
          <Link
            href="/"
            title={siteConfig.title}
            className="site-header-link inline-flex max-w-[11rem] shrink-0 items-center gap-2 no-underline min-[380px]:max-w-[13rem] sm:max-w-none sm:gap-2.5"
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-link-muted text-link"
              aria-hidden
            >
              <Compass className="size-4" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
                Prosperidad
              </span>
              <span className="hidden truncate text-[0.65rem] text-muted-foreground sm:block">
                Conocimiento para el futuro
              </span>
            </span>
          </Link>
        )}

        {variant === 'landing' && (
          <div className="min-w-0 md:flex-1">
            <SiteSectionsNav
              mobileOpen={mobileNavOpen}
              onMobileOpenChange={setMobileNavOpen}
              hideMobileTrigger
            />
          </div>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {variant === 'landing' ? (
            <>
              <CommandPaletteHost
                compactTrigger
                placeholder="Buscar en Prosperidad..."
              />
              <ThemeToggle />
              <BookmarksMenu className="hidden sm:block" />
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Abrir menú de secciones"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                <Menu className="size-4" strokeWidth={1.75} />
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
