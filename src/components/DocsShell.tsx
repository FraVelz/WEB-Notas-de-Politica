'use client';

import { useState } from 'react';
import { DocsSearch } from '@/components/DocsSearch';
import { Sidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import type { DocMeta } from '@/lib/content/docs';
import type { NavItem } from '@/lib/navigation';
import { getTemaById } from '@/lib/temas/registry';
import { cn } from '@/lib/utils';

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
  const meta = getTemaById(temaId);
  const showSidebar = meta?.showSidebar !== false;

  return (
    <>
      <SiteHeader
        variant="tema"
        trailing={
          showSidebar ? (
            <>
              <DocsSearch docs={docs} />
              <button
                type="button"
                className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-muted px-2.5 text-foreground md:hidden"
                aria-label="Abrir menú"
                onClick={() => setSidebarOpen((o) => !o)}
              >
                ☰
              </button>
            </>
          ) : undefined
        }
      />
      <div
        className={cn(
          'min-h-[calc(100vh-3.5rem)]',
          showSidebar &&
            'grid md:grid-cols-[var(--width-sidebar)_1fr]',
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
              'border-r border-border bg-muted px-3 pt-4 pb-8 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto',
              'max-md:fixed max-md:inset-x-0 max-md:top-14 max-md:z-[15] max-md:h-auto max-md:w-[min(var(--width-sidebar),85vw)]',
              sidebarOpen ? 'max-md:block' : 'max-md:hidden',
            )}
          >
            <Sidebar navigation={navigation} />
          </aside>
        )}
        <main
          className={cn(
            'py-6 pb-12',
            showSidebar
              ? 'px-5 md:px-8'
              : 'mx-auto w-full max-w-6xl px-4 sm:px-6',
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}
