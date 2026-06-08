'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { getNavCategoriesGrouped } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const navCategories = getNavCategoriesGrouped();

function getFocusables(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    ),
  );
}

export function SiteSectionsNav() {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listId = useId();

  const close = useCallback((returnFocusTo?: string) => {
    setOpenCategoryId(null);
    if (returnFocusTo) {
      requestAnimationFrame(() => {
        triggerRefs.current[returnFocusTo]?.focus();
      });
    }
  }, []);

  const open = useCallback((categoryId: string, focusFirst = false) => {
    setOpenCategoryId(categoryId);
    if (focusFirst) {
      requestAnimationFrame(() => {
        const first = getFocusables(panelRefs.current[categoryId] ?? null)[0];
        first?.focus();
      });
    }
  }, []);

  const moveBetweenTriggers = useCallback(
    (direction: 1 | -1, current: HTMLElement) => {
      const triggers = navCategories
        .map((entry) => triggerRefs.current[entry.category.id])
        .filter((node): node is HTMLAnchorElement => node != null);
      const index = triggers.indexOf(current as HTMLAnchorElement);
      if (index === -1) return;
      const next = triggers[index + direction];
      next?.focus();
    },
    [],
  );

  const handlePanelKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, categoryId: string) => {
      const panel = panelRefs.current[categoryId];
      const items = getFocusables(panel ?? null);
      const index = items.indexOf(event.target as HTMLElement);

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          close(categoryId);
          break;
        case 'ArrowDown': {
          event.preventDefault();
          if (items.length === 0) return;
          items[(index + 1 + items.length) % items.length]?.focus();
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          if (items.length === 0) return;
          items[(index - 1 + items.length) % items.length]?.focus();
          break;
        }
        case 'Tab':
          if (event.shiftKey && index <= 0) {
            close();
          } else if (!event.shiftKey && index === items.length - 1) {
            close();
          }
          break;
        default:
          break;
      }
    },
    [close],
  );

  const handleTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>, categoryId: string) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          open(categoryId, true);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (openCategoryId === categoryId) {
            close(categoryId);
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          moveBetweenTriggers(-1, event.currentTarget);
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveBetweenTriggers(1, event.currentTarget);
          break;
        case 'Escape':
          event.preventDefault();
          close(categoryId);
          break;
        default:
          break;
      }
    },
    [close, moveBetweenTriggers, open, openCategoryId],
  );

  useEffect(() => {
    if (!openCategoryId) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close(openCategoryId);
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
        role="menubar"
        aria-orientation="horizontal"
        className="m-0 flex w-full list-none items-center justify-start gap-4 overflow-x-auto sm:justify-center sm:gap-5 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {navCategories.map(({ category, sections }) => {
          const isOpen = openCategoryId === category.id;
          const panelId = `${listId}-${category.id}`;
          const triggerId = `${listId}-trigger-${category.id}`;

          return (
            <li
              key={category.id}
              role="none"
              className="group/nav relative shrink-0"
              onMouseEnter={() => setOpenCategoryId(category.id)}
              onMouseLeave={() =>
                setOpenCategoryId((id) => (id === category.id ? null : id))
              }
            >
              <a
                ref={(node) => {
                  triggerRefs.current[category.id] = node;
                }}
                href={`/#${category.id}`}
                id={triggerId}
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  'inline-flex h-9 items-center gap-0.5 rounded-sm px-1.5 no-underline',
                  'text-sm font-medium text-foreground/75 hover:text-foreground',
                  'outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]',
                  isOpen && 'text-foreground',
                )}
                onClick={() => close()}
                onKeyDown={(event) =>
                  handleTriggerKeyDown(event, category.id)
                }
              >
                {category.label}
                <ChevronDown
                  className={cn(
                    'size-3 shrink-0 opacity-50 transition-transform',
                    isOpen && 'rotate-180 opacity-80',
                  )}
                  aria-hidden
                />
              </a>

              <div
                ref={(node) => {
                  panelRefs.current[category.id] = node;
                }}
                id={panelId}
                role="menu"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                onKeyDown={(event) =>
                  handlePanelKeyDown(event, category.id)
                }
                className={cn(
                  'absolute top-[calc(100%+0.25rem)] right-0 z-30 w-[min(20rem,calc(100vw-2rem))]',
                  'rounded-md border border-border bg-elevated py-2 shadow-[var(--shadow-theme)]',
                  'sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
                )}
              >
                <a
                  href={`/#${category.id}`}
                  role="menuitem"
                  className="mx-2 mb-1 block rounded-sm px-2 py-1.5 text-xs font-medium text-link no-underline outline-none hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
                  onClick={() => close()}
                >
                  Ver {category.label.toLowerCase()}
                </a>

                <ul className="m-0 max-h-[min(18rem,55vh)] list-none overflow-y-auto px-1" role="none">
                  {sections.map(({ group, temas }) => (
                    <li
                      key={group.id}
                      role="none"
                      className="not-first:mt-2 not-first:border-t not-first:border-border not-first:pt-2"
                    >
                      <a
                        href={`/#${group.id}`}
                        role="menuitem"
                        className="block rounded-sm px-2 py-1 text-sm font-semibold text-foreground no-underline outline-none hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
                        onClick={() => close()}
                      >
                        {group.label}
                      </a>
                      {temas.length > 0 && (
                        <ul className="m-0 mt-0.5 list-none" role="none">
                          {temas.map((tema) => (
                            <li key={tema.id} role="none">
                              <Link
                                href={`/${tema.id}`}
                                role="menuitem"
                                className="block rounded-sm px-2 py-1 text-sm leading-snug text-muted-foreground no-underline outline-none hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
                                onClick={() => close()}
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
