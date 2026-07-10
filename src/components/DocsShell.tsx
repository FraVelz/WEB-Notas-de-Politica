'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Home,
  LayoutGrid,
  Library,
} from 'lucide-react';
import {
  CommandPalette,
  CommandPaletteTrigger,
  useCommandPalette,
} from '@/components/ui/CommandPalette';
import { Sidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import type { DocMeta } from '@/lib/content/docs';
import type { NavItem } from '@/lib/navigation';
import { getFeatureNavIcons } from '@/lib/temas/navigation';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [icons, setIcons] = useState<Record<string, LucideIcon>>();
  const { open, setOpen } = useCommandPalette();
  const pathname = usePathname();
  const meta = getTemaById(temaId);
  const showSidebar = meta?.showSidebar === true;
  // Solo el hub raíz (/tema) es inmersivo; subpáginas como /indicadores deben hacer scroll.
  const immersiveHub =
    meta?.immersiveHub === true &&
    (pathname === `/${temaId}` || pathname === `/${temaId}/`);

  useEffect(() => {
    let cancelled = false;
    void getFeatureNavIcons(temaId).then((next) => {
      if (!cancelled) setIcons(next);
    });
    return () => {
      cancelled = true;
    };
  }, [temaId]);

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

  const shortTitle = meta?.title.replace(/ y .*$/, '') ?? temaId;

  return (
    <>
      <SiteHeader
        variant="tema"
        hideBrandLink={showSidebar && !immersiveHub}
      />
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        extraItems={extraItems}
      />
      <div
        className={cn(
          immersiveHub
            ? 'h-[calc(100vh-3.5rem)] overflow-hidden'
            : showSidebar
              ? 'min-h-screen'
              : 'min-h-[calc(100vh-3.5rem)]',
          showSidebar &&
            (sidebarCollapsed
              ? 'grid md:grid-cols-[4.5rem_1fr]'
              : 'grid md:grid-cols-[var(--width-sidebar)_1fr]'),
        )}
      >
        {showSidebar && sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-[14] cursor-default bg-black/30 md:hidden"
            aria-label="Cerrar menú"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {showSidebar && (
          <aside
            className={cn(
              'border-r border-border bg-muted/80 px-3 pt-4 pb-4 md:sticky md:top-0 md:h-screen md:overflow-hidden',
              'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-[15] max-md:w-[min(var(--width-sidebar),85vw)]',
              sidebarOpen ? 'max-md:block' : 'max-md:hidden',
            )}
          >
            <Sidebar
              navigation={navigation}
              temaId={temaId}
              title={shortTitle}
              quote={TEMA_QUOTES[temaId]}
              icons={icons}
              collapsed={sidebarCollapsed}
              onCollapseToggle={() => setSidebarCollapsed((c) => !c)}
              onCollapse={() => setSidebarOpen(false)}
            />
          </aside>
        )}
        <div
          className={cn(
            'min-w-0',
            immersiveHub && 'flex h-full min-h-0 flex-col',
          )}
        >
          {showSidebar && !immersiveHub ? (
            <div className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-5 backdrop-blur-md md:px-8">
              <p className="m-0 flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="size-3.5" strokeWidth={1.75} aria-hidden />
                Inicio
              </p>
              <div className="mx-auto hidden max-w-md flex-1 justify-center sm:flex">
                <CommandPaletteTrigger
                  onOpen={() => setOpen(true)}
                  className="w-full max-w-sm justify-start"
                  placeholder="Buscar en el archivo..."
                />
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground md:hidden"
                  aria-label="Abrir menú"
                  onClick={() => setSidebarOpen((o) => !o)}
                >
                  ☰
                </button>
                <Link
                  href={`/${temaId}`}
                  className="hidden size-9 items-center justify-center rounded-xl border border-border text-muted-foreground no-underline hover:text-link sm:inline-flex"
                  aria-label="Biblioteca del tema"
                  title="Biblioteca"
                >
                  <Library className="size-4" strokeWidth={1.75} />
                </Link>
                <Link
                  href="/estadisticas-mundiales/indicadores"
                  className="hidden size-9 items-center justify-center rounded-xl border border-border text-muted-foreground no-underline hover:text-link sm:inline-flex"
                  aria-label="Comparador"
                  title="Comparador"
                >
                  <BarChart3 className="size-4" strokeWidth={1.75} />
                </Link>
                <button
                  type="button"
                  className="hidden size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-link sm:inline-flex"
                  aria-label="Vista de layout"
                  title="Layout"
                >
                  <LayoutGrid className="size-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ) : null}
          <main
            className={cn(
              immersiveHub
                ? 'min-h-0 flex-1 overflow-hidden p-0'
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
