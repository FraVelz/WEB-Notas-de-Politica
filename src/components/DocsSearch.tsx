'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { DocMeta } from '@/lib/docs';

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
          doc.slug.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [docs, query]);

  const hrefFor = (slug: string) => (slug ? `/${slug}` : '/');

  return (
    <div className="search">
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
      />
      {open && query && results.length > 0 && (
        <ul className="search-results">
          {results.map((doc) => (
            <li key={doc.slug}>
              <Link href={hrefFor(doc.slug)} onClick={() => setQuery('')}>
                <span className="search-title">{doc.title}</span>
                {doc.description && (
                  <span className="search-desc">{doc.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
