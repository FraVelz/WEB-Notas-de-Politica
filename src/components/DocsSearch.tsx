'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { DocMeta } from '@/lib/content/docs';

export function DocsSearch({ docs }: { docs: DocMeta[] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return docs
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(q) ||
          doc.description?.toLowerCase().includes(q) ||
          doc.href.toLowerCase().includes(q) ||
          doc.tema.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [docs, query]);

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Buscar…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Buscar en la documentación"
        className="w-[min(14rem,40vw)] rounded-md border border-border bg-muted px-2.5 py-1.5 text-sm text-foreground"
      />
      {open && query && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+0.25rem)] right-0 z-30 m-0 min-w-64 max-w-[22rem] list-none rounded-md border border-border bg-elevated p-1 shadow-[var(--shadow-theme)]"
        >
          {results.map((doc) => (
            <li key={doc.href} role="option">
              <Link
                href={doc.href}
                onClick={() => setQuery('')}
                className="block rounded px-2.5 py-2 no-underline hover:bg-muted"
              >
                <span className="block text-sm font-semibold text-foreground">
                  {doc.title}
                </span>
                {doc.description && (
                  <span className="block text-xs text-muted-foreground">
                    {doc.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
