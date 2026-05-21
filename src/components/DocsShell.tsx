'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DocsSearch } from '@/components/DocsSearch';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { DocMeta } from '@/lib/docs';
import { siteConfig } from '@/lib/navigation';

export function DocsShell({
  docs,
  children,
}: {
  docs: DocMeta[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-title">
          {siteConfig.title}
        </Link>
        <div className="header-actions">
          <DocsSearch docs={docs} />
          <ThemeToggle />
          <button
            type="button"
            className="menu-button"
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </header>
      <div className="layout">
        <aside
          className={sidebarOpen ? 'sidebar open' : 'sidebar'}
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </aside>
        <main className="main">{children}</main>
      </div>
    </>
  );
}
