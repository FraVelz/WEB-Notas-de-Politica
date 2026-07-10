'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

function subscribeMounted() {
  return () => {};
}

function getClientMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

/** Botones legibles sobre la barra del header (`onDarkBar` = barra oscura en tema claro). */
export function ThemeToggle({ onDarkBar = false }: { onDarkBar?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );

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

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';
  const label = isDark ? 'Modo claro' : 'Modo oscuro';

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border',
        onDarkBar
          ? 'border-background/35 bg-background/15 text-background hover:bg-background/25'
          : 'border-border bg-muted text-foreground hover:text-link',
      )}
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <Sun className="size-4" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="size-4" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
