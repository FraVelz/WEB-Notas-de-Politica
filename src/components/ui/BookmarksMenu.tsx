'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, Clock3, Trash2, X } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

const dateTimeFormatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

function formatWhen(ts: number) {
  try {
    return dateTimeFormatter.format(new Date(ts));
  } catch {
    return '';
  }
}

export function BookmarksMenu({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { bookmarks, continueReading, removeBookmark } = useBookmarks();

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    requestAnimationFrame(() => closeRef.current?.focus());
    const FOCUSABLE =
      "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusables = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener('keydown', handleKeyDown);
    return () => {
      panel.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current?.isConnected) {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-xl border border-border',
          'text-muted-foreground hover:text-foreground',
          open && 'border-link text-link',
        )}
        aria-label="Marcadores"
        aria-expanded={open}
        aria-controls={panelId}
        title="Marcadores"
        onClick={() => setOpen((v) => !v)}
      >
        <Bookmark className="size-4" strokeWidth={1.75} />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Marcadores guardados"
          className={cn(
            'absolute top-[calc(100%+0.5rem)] right-0 z-40 w-[min(22rem,calc(100vw-2rem))]',
            'overflow-hidden rounded-2xl border border-border bg-elevated shadow-[var(--shadow-theme)]',
          )}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
            <p className="m-0 text-sm font-semibold text-foreground">
              Marcadores
            </p>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
            {continueReading ? (
              <div className="mb-2 rounded-xl border border-border bg-muted/40 p-2.5">
                <p className="m-0 flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
                  <Clock3 className="size-3" aria-hidden />
                  Continuar leyendo
                </p>
                <Link
                  href={continueReading.href}
                  className="mt-1.5 block text-sm font-medium text-foreground no-underline hover:text-link"
                  onClick={() => setOpen(false)}
                >
                  {continueReading.title}
                </Link>
                <p className="m-0 mt-0.5 text-xs text-muted-foreground">
                  {formatWhen(continueReading.visitedAt)}
                </p>
              </div>
            ) : null}

            {bookmarks.length === 0 ? (
              <p className="m-0 px-2 py-6 text-center text-sm text-muted-foreground">
                Aún no hay marcadores. Usa el icono de marcador en una página
                para guardarla aquí.
              </p>
            ) : (
              <ul className="m-0 list-none space-y-1 p-0">
                {bookmarks.map((item) => (
                  <li key={item.href}>
                    <div className="group flex items-start gap-1 rounded-xl hover:bg-muted/60">
                      <Link
                        href={item.href}
                        className="min-w-0 flex-1 px-2.5 py-2 no-underline"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block text-sm font-medium text-foreground group-hover:text-link">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {item.href}
                        </span>
                      </Link>
                      <button
                        type="button"
                        className="mt-1.5 mr-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-70 hover:text-foreground group-hover:opacity-100"
                        aria-label={`Quitar ${item.title}`}
                        onClick={() => removeBookmark(item.href)}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function BookmarkToggle({
  href,
  title,
  temaId,
  className,
}: {
  href: string;
  title?: string;
  temaId?: string;
  className?: string;
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(href);

  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-xl border border-border',
        active
          ? 'border-link bg-link-muted text-link'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      aria-label={active ? 'Quitar de marcadores' : 'Guardar en marcadores'}
      aria-pressed={active}
      title={active ? 'Quitar de marcadores' : 'Guardar en marcadores'}
      onClick={() => toggleBookmark({ href, title, temaId })}
    >
      {active ? (
        <BookmarkCheck className="size-4" strokeWidth={1.75} />
      ) : (
        <Bookmark className="size-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
