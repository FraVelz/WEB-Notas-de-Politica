import { cn } from '@/lib/utils';

/** Enlace de salto al contenido principal (a11y). */
export function SkipToContent({
  href = '#main-content',
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'absolute top-0 left-4 z-[100] -translate-y-[120%] rounded-lg bg-elevated px-4 py-2.5',
        'text-sm font-semibold text-foreground shadow-[var(--shadow-theme)]',
        'outline outline-2 outline-offset-2 outline-[var(--focus-ring)]',
        'focus:translate-y-3',
        className,
      )}
    >
      Saltar al contenido
    </a>
  );
}
