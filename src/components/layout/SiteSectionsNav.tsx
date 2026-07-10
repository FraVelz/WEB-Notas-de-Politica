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
import { ChevronDown, Menu } from 'lucide-react';
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

function NavSectionsList({
  categoryId,
  sections,
  onNavigate,
  compact,
}: {
  categoryId: string;
  sections: (typeof navCategories)[number]['sections'];
  onNavigate: () => void;
  compact?: boolean;
}) {
  return (
    <ul
      className={cn(
        'm-0 list-none',
        compact ? 'px-1' : 'max-h-[min(18rem,55vh)] overflow-y-auto px-1',
      )}
      role="none"
    >
      {sections.map(({ group, temas }) => (
        <li
          key={group.id}
          role="none"
          className="not-first:mt-2 not-first:border-t not-first:border-border not-first:pt-2"
        >
          <a
            href={`/temas/${categoryId}#${group.id}`}
            role="menuitem"
            className={cn(
              'block rounded-sm px-2 text-sm font-semibold text-foreground no-underline outline-none hover:text-link',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]',
              compact ? 'min-h-11 py-2.5' : 'py-1',
            )}
            onClick={onNavigate}
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
                    className={cn(
                      'block rounded-sm px-2 text-sm leading-snug text-muted-foreground no-underline outline-none hover:text-link',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]',
                      compact ? 'min-h-11 py-2.5' : 'py-1',
                    )}
                    onClick={onNavigate}
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
  );
}

export function SiteSectionsNav({
  mobileOpen,
  onMobileOpenChange,
  hideMobileTrigger = false,
}: {
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  hideMobileTrigger?: boolean;
} = {}) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const mobileMenuOpen = mobileOpen ?? internalMobileOpen;
  const setMobileMenuOpen = onMobileOpenChange ?? setInternalMobileOpen;
  const navRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listId = useId();
  const mobilePanelId = `${listId}-mobile-panel`;
  const latestStateRef = useRef({ openCategoryId, mobileMenuOpen });
  latestStateRef.current = { openCategoryId, mobileMenuOpen };

  const closeDesktop = useCallback((returnFocusTo?: string) => {
    setOpenCategoryId(null);
    if (returnFocusTo) {
      requestAnimationFrame(() => {
        triggerRefs.current[returnFocusTo]?.focus();
      });
    }
  }, []);

  const closeMobile = useCallback((returnFocus = false) => {
    setMobileMenuOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => {
        mobileTriggerRef.current?.focus();
      });
    }
  }, []);

  const closeAll = useCallback(() => {
    closeDesktop();
    closeMobile();
  }, [closeDesktop, closeMobile]);
  const closeHandlersRef = useRef({ closeAll, closeDesktop, closeMobile });
  closeHandlersRef.current = { closeAll, closeDesktop, closeMobile };

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
          closeDesktop(categoryId);
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
            closeDesktop();
          } else if (!event.shiftKey && index === items.length - 1) {
            closeDesktop();
          }
          break;
        default:
          break;
      }
    },
    [closeDesktop],
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
            closeDesktop(categoryId);
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
          closeDesktop(categoryId);
          break;
        default:
          break;
      }
    },
    [closeDesktop, moveBetweenTriggers, open, openCategoryId],
  );

  useEffect(() => {
    if (!openCategoryId && !mobileMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        closeHandlersRef.current.closeAll();
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        const { mobileMenuOpen, openCategoryId } = latestStateRef.current;
        if (mobileMenuOpen) closeHandlersRef.current.closeMobile(true);
        else if (openCategoryId) {
          closeHandlersRef.current.closeDesktop(openCategoryId);
        }
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openCategoryId, mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) closeMobile();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [closeMobile]);

  return (
    <nav
      ref={navRef}
      className="relative w-full min-w-0"
      aria-label="Apartados del sitio"
    >
      <div className="md:hidden">
        {!hideMobileTrigger ? (
        <button
          ref={mobileTriggerRef}
          type="button"
          id={`${listId}-mobile-trigger`}
          aria-expanded={mobileMenuOpen}
          aria-controls={mobilePanelId}
          aria-haspopup="menu"
          className={cn(
            'inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 px-3',
            'text-sm font-medium text-foreground',
            'outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]',
            mobileMenuOpen && 'border-link bg-link-muted/40',
          )}
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setOpenCategoryId(null);
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Menu className="size-4 shrink-0 text-link" aria-hidden />
            Explorar secciones
          </span>
          <ChevronDown
            className={cn(
              'size-4 shrink-0 opacity-60 transition-transform',
              mobileMenuOpen && 'rotate-180',
            )}
            aria-hidden
          />
        </button>
        ) : null}

        <div
          id={mobilePanelId}
          role="menu"
          aria-labelledby={
            hideMobileTrigger ? undefined : `${listId}-mobile-trigger`
          }
          hidden={!mobileMenuOpen}
          className={cn(
            hideMobileTrigger
              ? 'fixed top-14 right-4 left-4 z-40 max-h-[min(70dvh,28rem)] overflow-y-auto overscroll-contain'
              : 'absolute top-[calc(100%+0.375rem)] right-0 left-0 z-40 max-h-[min(70dvh,28rem)] overflow-y-auto overscroll-contain',
            'rounded-lg border border-border bg-elevated py-2 shadow-[var(--shadow-theme)]',
          )}
        >
          {navCategories.map(({ category, sections }) => (
            <section
              key={category.id}
              className="not-first:mt-2 not-first:border-t not-first:border-border not-first:pt-2"
            >
              <a
                href={`/temas/${category.id}`}
                role="menuitem"
                className="mx-2 mb-1 block rounded-sm px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-link no-underline outline-none hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
                onClick={() => closeMobile()}
              >
                {category.label}
              </a>
              <NavSectionsList
                categoryId={category.id}
                sections={sections}
                onNavigate={() => closeMobile()}
                compact
              />
            </section>
          ))}
        </div>
      </div>

      <ul
        id={listId}
        role="menubar"
        aria-orientation="horizontal"
        className="m-0 hidden w-full list-none items-center justify-center gap-6 md:flex"
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
                href={`/temas/${category.id}`}
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
                onClick={() => closeDesktop()}
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
                tabIndex={-1}
                aria-labelledby={triggerId}
                hidden={!isOpen}
                onKeyDown={(event) =>
                  handlePanelKeyDown(event, category.id)
                }
                className={cn(
                  'absolute top-[calc(100%+0.25rem)] left-1/2 z-30 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2',
                  'rounded-md border border-border bg-elevated py-2 shadow-[var(--shadow-theme)]',
                )}
              >
                <a
                  href={`/temas/${category.id}`}
                  role="menuitem"
                  className="mx-2 mb-1 block rounded-sm px-2 py-1.5 text-xs font-medium text-link no-underline outline-none hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]"
                  onClick={() => closeDesktop()}
                >
                  Ver {category.label.toLowerCase()}
                </a>

                <NavSectionsList
                  categoryId={category.id}
                  sections={sections}
                  onNavigate={() => closeDesktop()}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
