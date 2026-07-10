import { cn } from '@/lib/utils';

export function SourceFooter({
  source,
  sourceUrl,
  year,
  note,
  fetchedAt,
  className,
}: {
  source: string;
  sourceUrl?: string;
  year?: string | number;
  note?: string;
  fetchedAt?: string;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        'space-y-1 border-t border-border pt-3 text-xs text-muted-foreground',
        className,
      )}
    >
      <p className="m-0">
        Fuente:{' '}
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link underline-offset-2 hover:underline"
          >
            {source}
          </a>
        ) : (
          source
        )}
        {year != null ? ` · periodo ${year}` : null}
        {fetchedAt
          ? ` · snapshot ${new Date(fetchedAt).toLocaleDateString('es')}`
          : null}
      </p>
      {note ? <p className="m-0">{note}</p> : null}
    </footer>
  );
}
