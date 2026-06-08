'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getTemasGrouped } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const grouped = getTemasGrouped();

export function SiteSectionsNav() {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const listId = useId();

  const close = useCallback(() => setOpenGroupId(null), []);

  useEffect(() => {
    if (!openGroupId) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openGroupId, close]);

  return (
    <nav
      ref={navRef}
      className="border-t border-border"
      aria-label="Apartados del sitio"
    >
      <ul
        id={listId}
        className="m-0 flex list-none gap-0.5 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {grouped.map(({ group, temas: items }) => {
          const isOpen = openGroupId === group.id;
          const panelId = `${listId}-${group.id}`;

          return (
            <li
              key={group.id}
              className="group/nav relative shrink-0"
              onMouseEnter={() => setOpenGroupId(group.id)}
              onMouseLeave={() => setOpenGroupId((id) => (id === group.id ? null : id))}
            >
              <button
                type="button"
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium',
                  'border-border bg-elevated text-muted-foreground',
                  'hover:border-link hover:bg-link-muted hover:text-link',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
                  isOpen && 'border-link bg-link-muted text-link',
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenGroupId((id) => (id === group.id ? null : group.id))
                }
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    'size-3.5 shrink-0 opacity-70 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>

              <div
                id={panelId}
                className={cn(
                  'absolute top-full left-0 z-30 mt-1 min-w-[14rem] max-w-[min(18rem,calc(100vw-2rem))]',
                  'rounded-lg border border-border bg-elevated py-1 shadow-[var(--shadow-theme)]',
                  'max-md:right-0 max-md:left-auto',
                  isOpen
                    ? 'pointer-events-auto visible opacity-100'
                    : 'pointer-events-none invisible opacity-0 max-md:hidden',
                  'md:group-hover/nav:pointer-events-auto md:group-hover/nav:visible md:group-hover/nav:opacity-100',
                  'transition-opacity duration-150',
                )}
                role="region"
                aria-label={group.label}
              >
                <a
                  href={`/#${group.id}`}
                  className="block border-b border-border px-3 py-2 text-xs font-semibold tracking-wide text-link uppercase no-underline hover:bg-link-muted"
                  onClick={close}
                >
                  Ver sección · {group.label}
                </a>
                <ul className="m-0 max-h-[min(16rem,50vh)] list-none overflow-y-auto p-1">
                  {items.map((tema) => (
                    <li key={tema.id}>
                      <Link
                        href={`/${tema.id}`}
                        className="block rounded-md px-2 py-1.5 text-sm leading-snug text-foreground no-underline hover:bg-muted hover:text-link"
                        onClick={close}
                      >
                        {tema.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
