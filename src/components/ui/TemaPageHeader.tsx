import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getTemaIcon } from '@/lib/temas/icons';
import { cn } from '@/lib/utils';

export function TemaPageHeader({
  temaId,
  eyebrow,
  title,
  description,
  relatedHref,
  relatedLabel,
  className,
}: {
  temaId?: string;
  eyebrow: string;
  title: string;
  description?: string;
  relatedHref?: string;
  relatedLabel?: string;
  className?: string;
}) {
  const Icon = temaId ? getTemaIcon(temaId) : null;

  return (
    <header
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-elevated px-5 py-6 sm:px-7 sm:py-8',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-10 size-44 rounded-full bg-link/10 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        {Icon ? (
          <div
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-xl',
              'border border-link/30 bg-link-muted text-link',
            )}
            aria-hidden
          >
            <Icon className="size-6" strokeWidth={1.75} />
          </div>
        ) : null}
        <div className="min-w-0 space-y-2">
          <p className="m-0 text-sm font-semibold tracking-widest text-link uppercase">
            {eyebrow}
          </p>
          <h1 className="m-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="m-0 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
          {relatedHref && relatedLabel ? (
            <Link
              href={relatedHref}
              className={cn(
                'inline-flex items-center gap-1 pt-1 text-sm font-medium text-link',
                'no-underline underline-offset-2 hover:underline',
              )}
            >
              {relatedLabel}
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
