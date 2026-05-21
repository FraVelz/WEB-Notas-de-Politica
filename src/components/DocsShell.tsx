'use client';

import { useState } from 'react';
import { DocsSearch } from '@/components/DocsSearch';
import { Sidebar } from '@/components/Sidebar';
import { SiteHeader } from '@/components/SiteHeader';
import type { DocMeta } from '@/lib/content/docs';
import type { NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function DocsShell({
  docs,
  navigation,
  children,
}: {
  docs: DocMeta[];
  navigation: NavItem[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SiteHeader
        trailing={
          <>
            <DocsSearch docs={docs} />
            <button
              type="button"
              className="inline-flex cursor-pointer rounded-md border border-border bg-muted px-2.5 py-1.5 text-foreground md:hidden"
              aria-label="Abrir menú"
              onClick={() => setSidebarOpen((o) => !o)}
            >
              ☰
            </button>
          </>
        }
      />
      <div className="grid min-h-[calc(100vh-3.5rem)] md:grid-cols-[var(--width-sidebar)_1fr]">
        <aside
          className={cn(
            'border-r border-border bg-muted px-3 pt-4 pb-8 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto',
            'max-md:fixed max-md:inset-x-0 max-md:top-14 max-md:z-[15] max-md:h-auto max-md:w-[min(var(--width-sidebar),85vw)]',
            sidebarOpen ? 'max-md:block' : 'max-md:hidden',
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar navigation={navigation} />
          </div>
        </aside>
        <main className="px-5 py-6 pb-12 md:px-8">{children}</main>
      </div>
    </>
  );
}
