'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteConfig } from '@/lib/navigation';

export function SiteHeader({
  trailing,
}: {
  trailing?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-elevated px-5 py-3">
      <Link
        href="/"
        className="text-lg font-semibold whitespace-nowrap text-foreground no-underline hover:text-accent"
      >
        {siteConfig.title}
      </Link>
      <div className="ml-auto flex items-center gap-3">
        {trailing}
        <ThemeToggle />
      </div>
    </header>
  );
}
