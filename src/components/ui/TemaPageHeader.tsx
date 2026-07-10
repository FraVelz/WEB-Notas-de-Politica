'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { TemaBreadcrumb } from '@/components/ui/TemaBreadcrumb';
import { getTemaIcon } from '@/lib/temas/icons';
import { cn } from '@/lib/utils';

function resolveTemaId(explicit: string | undefined, pathname: string) {
  if (explicit) return explicit;
  return pathname.split('/').filter(Boolean)[0] ?? '';
}

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
  const pathname = usePathname();
  const resolvedTemaId = resolveTemaId(temaId, pathname);
  const Icon = resolvedTemaId ? getTemaIcon(resolvedTemaId) : null;

  return (
    <div className={cn('space-y-4', className)}>
      {resolvedTemaId ? (
        <TemaBreadcrumb temaId={resolvedTemaId} currentLabel={title} />
      ) : null}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-elevated px-5 py-6 sm:px-7 sm:py-8">
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
            <h1 className="m-0 text-[1.75rem] font-semibold tracking-tight text-foreground min-[360px]:text-3xl sm:text-4xl">
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
    </div>
  );
}
