import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TemaBreadcrumb } from '@/components/ui/TemaBreadcrumb';
import { cn } from '@/lib/utils';
import type { DocMeta } from '@/lib/content/docs';

export function DocArticleChrome({
  temaId,
  title,
  description,
  siblings,
  children,
}: {
  temaId: string;
  title: string;
  description?: string;
  siblings: DocMeta[];
  children: React.ReactNode;
}) {
  const more = siblings.filter((d) => d.title !== title).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <TemaBreadcrumb temaId={temaId} currentLabel={title} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="article-lead m-0 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>

      <div className="article">{children}</div>

      {more.length > 0 ? (
        <footer className="space-y-3 border-t border-border pt-6">
          <h2 className="m-0 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Más en este tema
          </h2>
          <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
            {more.map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className={cn(
                    'group flex items-start gap-2 rounded-xl border border-border bg-elevated px-3 py-3',
                    'no-underline transition-all duration-150',
                    'hover:-translate-y-0.5 hover:border-link hover:bg-link-muted',
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground group-hover:text-link">
                      {doc.title}
                    </span>
                    {doc.description ? (
                      <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                        {doc.description}
                      </span>
                    ) : null}
                  </span>
                  <ChevronRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-link"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </div>
  );
}
