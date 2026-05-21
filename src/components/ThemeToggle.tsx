'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="h-9 w-9 rounded-md border border-border bg-muted"
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
      className="h-9 w-9 cursor-pointer rounded-md border border-border bg-muted text-base leading-none text-foreground"
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      {(theme === 'system' ? resolvedTheme : theme) === 'dark' ? '☀' : '☾'}
    </button>
  );
}
