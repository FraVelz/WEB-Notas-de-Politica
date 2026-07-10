import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getTemaIcon } from '@/lib/temas/icons';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

/** Miga de pan: hub del tema → página actual. */
export function TemaBreadcrumb({
  temaId,
  currentLabel,
}: {
  temaId: string;
  currentLabel: string;
}) {
  const meta = getTemaById(temaId);
  const Icon = getTemaIcon(temaId);

  return (
    <nav
      aria-label="Miga de pan"
      className="flex flex-wrap items-center gap-1.5 text-sm"
    >
      <Link
        href={`/${temaId}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5',
          'text-muted-foreground no-underline transition-colors',
          'hover:bg-link-muted hover:text-link',
        )}
      >
        <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
        {meta?.title ?? temaId}
      </Link>
      <ChevronRight
        className="size-3.5 text-muted-foreground"
        aria-hidden
      />
      <span className="font-medium text-foreground">{currentLabel}</span>
    </nav>
  );
}
