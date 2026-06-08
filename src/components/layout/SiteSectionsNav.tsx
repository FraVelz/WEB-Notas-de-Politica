'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getNavCategoriesGrouped } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const navCategories = getNavCategoriesGrouped();

export function SiteSectionsNav() {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const listId = useId();

  const close = useCallback(() => setOpenCategoryId(null), []);

  useEffect(() => {
    if (!openCategoryId) return;

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
  }, [openCategoryId, close]);

  return (
    <nav
      ref={navRef}
      className="w-full min-w-0"
      aria-label="Apartados del sitio"
    >
      <ul
        id={listId}
        className="m-0 flex w-full list-none items-center justify-start gap-4 overflow-x-auto sm:justify-center sm:gap-5 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {navCategories.map(({ category, sections }) => {
          const isOpen = openCategoryId === category.id;
          const panelId = `${listId}-${category.id}`;

          return (
            <li
              key={category.id}
              className="group/nav relative flex shrink-0 items-center"
              onMouseEnter={() => setOpenCategoryId(category.id)}
              onMouseLeave={() =>
                setOpenCategoryId((id) => (id === category.id ? null : id))
              }
            >
              <a
                href={`/#${category.id}`}
                className={cn(
                  'inline-flex h-9 items-center text-sm font-medium no-underline',
                  'text-foreground/75 hover:text-foreground',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
                  isOpen && 'text-foreground',
                )}
                onClick={close}
              >
                {category.label}
              </a>
              <button
                type="button"
                className={cn(
                  'inline-flex h-9 w-6 cursor-pointer items-center justify-center',
                  'text-foreground/75 hover:text-foreground',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]',
                  isOpen && 'text-foreground',
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`Subsecciones de ${category.label}`}
                onClick={() =>
                  setOpenCategoryId((id) =>
                    id === category.id ? null : category.id,
                  )
                }
              >
                <ChevronDown
                  className={cn(
                    'size-3 shrink-0 opacity-50 transition-transform',
                    isOpen && 'rotate-180 opacity-80',
                  )}
                  aria-hidden
                />
              </button>

              <div
                id={panelId}
                className={cn(
                  'absolute top-[calc(100%+0.25rem)] right-0 z-30 w-[min(20rem,calc(100vw-2rem))]',
                  'rounded-md border border-border bg-elevated py-2 shadow-[var(--shadow-theme)]',
                  'sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
                  isOpen
                    ? 'pointer-events-auto visible opacity-100'
                    : 'pointer-events-none invisible opacity-0 max-md:hidden',
                  'md:group-hover/nav:pointer-events-auto md:group-hover/nav:visible md:group-hover/nav:opacity-100',
                  'transition-opacity duration-150',
                )}
                role="region"
                aria-label={category.label}
              >
                <a
                  href={`/#${category.id}`}
                  className="mx-2 mb-1 block px-2 py-1.5 text-xs font-medium text-link no-underline hover:underline"
                  onClick={close}
                >
                  Ver {category.label.toLowerCase()}
                </a>

                <ul className="m-0 max-h-[min(18rem,55vh)] list-none overflow-y-auto px-1">
                  {sections.map(({ group, temas }) => (
                    <li
                      key={group.id}
                      className="not-first:mt-2 not-first:border-t not-first:border-border not-first:pt-2"
                    >
                      <a
                        href={`/#${group.id}`}
                        className="block px-2 py-1 text-sm font-semibold text-foreground no-underline hover:text-link"
                        onClick={close}
                      >
                        {group.label}
                      </a>
                      {temas.length > 0 && (
                        <ul className="m-0 mt-0.5 list-none">
                          {temas.map((tema) => (
                            <li key={tema.id}>
                              <Link
                                href={`/${tema.id}`}
                                className="block px-2 py-1 text-sm leading-snug text-muted-foreground no-underline hover:text-link"
                                onClick={close}
                              >
                                {tema.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
