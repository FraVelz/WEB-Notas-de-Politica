'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { getTemasForLanding } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

export type CommandItem = {
  href: string;
  title: string;
  description?: string;
  group?: string;
};

const temaItems: CommandItem[] = getTemasForLanding().map((t) => ({
  href: `/${t.id}`,
  title: t.title,
  description: t.description,
  group: 'Temas',
}));
const EMPTY_COMMAND_ITEMS: CommandItem[] = [];

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { open, setOpen };
}

export function CommandPaletteTrigger({
  onOpen,
  className,
  compact,
  placeholder = 'Buscar…',
}: {
  onOpen: () => void;
  className?: string;
  compact?: boolean;
  placeholder?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 text-sm text-muted-foreground',
        'hover:border-link/40 hover:text-foreground',
        compact
          ? 'w-9 justify-center px-0 sm:w-auto sm:min-w-[14rem] sm:px-3'
          : 'min-w-[14rem]',
        className,
      )}
      aria-label={`${placeholder} (⌘K)`}
    >
      <Search className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="hidden flex-1 truncate text-left sm:inline">
        {placeholder}
      </span>
      <kbd className="hidden rounded border border-border bg-elevated px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

export function CommandPalette({
  open,
  onOpenChange,
  extraItems = EMPTY_COMMAND_ITEMS,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extraItems?: CommandItem[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const items = useMemo(() => {
    const all = [...extraItems, ...temaItems];
    const seen = new Set<string>();
    const unique = all.filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
    const q = query.trim().toLowerCase();
    if (!q) return unique.slice(0, 12);
    return unique
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.href.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [extraItems, query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActive(0);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  const go = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[min(12vh,6rem)] pb-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-[#05070a]/75 backdrop-blur-md"
        aria-label="Cerrar búsqueda"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en Prosperidad"
        className={cn(
          'relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl',
          'border border-border bg-elevated shadow-[0_24px_80px_rgb(0_0_0/55%)]',
          'max-h-[min(32rem,calc(100vh-8rem))]',
        )}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) =>
                  Math.min(i + 1, Math.max(items.length - 1, 0)),
                );
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && items[active]) {
                e.preventDefault();
                go(items[active].href);
              }
            }}
            placeholder="Buscar temas, notas…"
            className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Buscar temas y notas"
            aria-controls={listId}
            aria-autocomplete="list"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
            esc
          </kbd>
        </div>
        <ul
          id={listId}
          className="m-0 min-h-0 flex-1 list-none overflow-y-auto overscroll-contain p-2"
          role="listbox"
        >
          {items.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              Sin resultados
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.href} role="option" aria-selected={i === active}>
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'block rounded-xl px-3 py-2.5 no-underline',
                    i === active ? 'bg-link-muted' : 'hover:bg-muted',
                  )}
                >
                  <span className="block text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
}

export function CommandPaletteHost({
  extraItems,
  triggerClassName,
  compactTrigger,
  placeholder = 'Buscar en Prosperidad...',
}: {
  extraItems?: CommandItem[];
  triggerClassName?: string;
  compactTrigger?: boolean;
  placeholder?: string;
}) {
  const { open, setOpen } = useCommandPalette();
  return (
    <>
      <CommandPaletteTrigger
        onOpen={() => setOpen(true)}
        className={triggerClassName}
        compact={compactTrigger}
        placeholder={placeholder}
      />
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        extraItems={extraItems}
      />
    </>
  );
}
