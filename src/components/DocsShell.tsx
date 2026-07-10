'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BarChart3, LayoutGrid, Library } from 'lucide-react';
import {
  CommandPalette,
  CommandPaletteTrigger,
  useCommandPalette,
} from '@/components/ui/CommandPalette';
import { Sidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import type { DocMeta } from '@/lib/content/docs';
import type { NavItem } from '@/lib/navigation';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

const TEMA_QUOTES: Record<string, string> = {
  filosofia:
    'La filosofía no da respuestas fáciles, enseña a preguntar mejor.',
};

export function DocsShell({
  docs,
  navigation,
  temaId,
  children,
}: {
  docs: DocMeta[];
  navigation: NavItem[];
  temaId: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { open, setOpen } = useCommandPalette();
  const meta = getTemaById(temaId);
  const showSidebar = meta?.showSidebar === true;
  const immersiveHub = meta?.immersiveHub === true;

  const extraItems = useMemo(
    () =>
      docs.map((doc) => ({
        href: doc.href,
        title: doc.title,
        description: doc.description,
        group: 'Notas',
      })),
    [docs],
  );

  const headerTrailing = useMemo(
    () =>
      showSidebar ? (
        <>
          <CommandPaletteTrigger
            onOpen={() => setOpen(true)}
            compact
            className="hidden min-w-[12rem] sm:inline-flex"
          />
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href={`/${temaId}`}
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground no-underline hover:text-link"
              aria-label="Biblioteca del tema"
              title="Biblioteca"
            >
              <Library className="size-4" strokeWidth={1.75} />
            </Link>
            <Link
              href="/estadisticas-mundiales/indicadores"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground no-underline hover:text-link"
              aria-label="Comparador"
              title="Comparador"
            >
              <BarChart3 className="size-4" strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-link"
              aria-label="Vista de layout"
              title="Layout"
            >
              <LayoutGrid className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-muted px-2.5 text-foreground md:hidden"
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            ☰
          </button>
        </>
      ) : undefined,
    [setOpen, showSidebar, temaId],
  );

  const shortTitle = meta?.title.replace(/ y .*$/, '') ?? temaId;

  return (
    <>
      <SiteHeader variant="tema" trailing={headerTrailing} />
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        extraItems={extraItems}
      />
      <div
        className={cn(
          immersiveHub
            ? 'h-[calc(100vh-3.5rem)] overflow-hidden'
            : 'min-h-[calc(100vh-3.5rem)]',
          showSidebar && 'grid md:grid-cols-[var(--width-sidebar)_1fr]',
        )}
      >
        {showSidebar && sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 top-14 z-[14] cursor-default bg-black/30 md:hidden"
            aria-label="Cerrar menú"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {showSidebar && (
          <aside
            className={cn(
              'border-r border-border bg-muted/80 px-3 pt-4 pb-4 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-hidden',
              'max-md:fixed max-md:inset-x-0 max-md:top-14 max-md:z-[15] max-md:h-[calc(100vh-3.5rem)] max-md:w-[min(var(--width-sidebar),85vw)]',
              sidebarOpen ? 'max-md:block' : 'max-md:hidden',
            )}
          >
            <Sidebar
              navigation={navigation}
              temaId={temaId}
              title={shortTitle}
              quote={TEMA_QUOTES[temaId]}
              onCollapse={() => setSidebarOpen(false)}
            />
          </aside>
        )}
        <div className="min-w-0">
          {showSidebar && !immersiveHub ? (
            <div className="relative flex h-12 items-center border-b border-border px-5 md:px-8">
              <p className="m-0 text-sm text-muted-foreground">Inicio</p>
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
                <div className="pointer-events-auto w-full max-w-sm px-4">
                  <CommandPaletteTrigger
                    onOpen={() => setOpen(true)}
                    className="w-full justify-start"
                  />
                </div>
              </div>
            </div>
          ) : null}
          <main
            className={cn(
              immersiveHub
                ? 'h-full overflow-hidden p-0'
                : cn(
                    'py-6 pb-12',
                    showSidebar
                      ? 'px-5 md:px-8'
                      : 'mx-auto w-full max-w-6xl px-4 sm:px-6',
                  ),
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
