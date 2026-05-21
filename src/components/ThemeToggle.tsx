'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/** Botones legibles sobre la barra del header (`onDarkBar` = barra oscura en tema claro). */
export function ThemeToggle({ onDarkBar = false }: { onDarkBar?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border',
          onDarkBar
            ? 'border-background/30 bg-background/10'
            : 'border-border bg-muted',
        )}
        aria-label="Tema"
        disabled
      />
    );
  }

  const cycle = () => {
    const current = theme === 'system' ? resolvedTheme : theme;
    if (current === 'dark') setTheme('light');
    else if (current === 'light') setTheme('dark');
    else setTheme('light');
  };

  const label =
    (theme === 'system' ? resolvedTheme : theme) === 'dark'
      ? 'Modo claro'
      : 'Modo oscuro';

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border text-base leading-none',
        onDarkBar
          ? 'border-background/35 bg-background/15 text-background hover:bg-background/25'
          : 'border-border bg-muted text-foreground',
      )}
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      {(theme === 'system' ? resolvedTheme : theme) === 'dark' ? '☀' : '☾'}
    </button>
  );
}
