'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { TemaHeaderStyle } from '@/lib/temas/skins';
import { siteConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function SiteHeader({
  trailing,
  tema,
}: {
  trailing?: React.ReactNode;
  /** Cuando se navega dentro de /[tema] */
  tema?: { id: string; title: string; headerStyle?: TemaHeaderStyle };
}) {
  const { resolvedTheme } = useTheme();
  const headerStyle = tema?.headerStyle ?? 'default';
  const isDark = resolvedTheme === 'dark';
  /** Inverted = barra con color del texto principal (negra en claro, clara en oscuro). */
  const invertedBar = headerStyle === 'inverted';
  const toggleOnDarkBar = invertedBar && !isDark;

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center gap-3 border-b px-5 py-3',
        invertedBar && 'border-foreground bg-foreground text-background',
        headerStyle === 'accent-band' &&
          'border-border bg-muted text-foreground',
        headerStyle === 'default' && 'border-border bg-elevated text-foreground',
      )}
    >
      {tema ? (
        <nav
          className="flex min-w-0 flex-1 items-center gap-2 text-sm"
          aria-label="Ubicación"
        >
          <Link
            href="/"
            className={cn(
              'shrink-0 font-medium no-underline',
              invertedBar
                ? 'text-background/85 hover:text-background'
                : 'text-muted-foreground hover:text-link',
            )}
          >
            ← Inicio
          </Link>
          <span
            className={cn(
              'shrink-0 opacity-50',
              invertedBar && 'text-background',
            )}
            aria-hidden
          >
            /
          </span>
          <Link
            href={`/${tema.id}`}
            className={cn(
              'truncate font-semibold no-underline',
              invertedBar
                ? 'text-background hover:text-background'
                : 'text-foreground hover:text-link',
            )}
          >
            {tema.title}
          </Link>
        </nav>
      ) : (
        <Link
          href="/"
          className="text-lg font-semibold whitespace-nowrap text-foreground no-underline hover:text-link"
        >
          {siteConfig.title}
        </Link>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-3">
        {trailing}
        <ThemeToggle onDarkBar={toggleOnDarkBar} />
      </div>
    </header>
  );
}
