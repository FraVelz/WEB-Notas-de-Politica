'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        'block rounded px-2 py-1.5 text-sm no-underline',
        active
          ? 'bg-accent-muted font-medium text-accent-strong'
          : 'text-muted-foreground hover:bg-accent-muted hover:text-accent',
      )}
    >
      {label}
    </Link>
  );
}

function NavGroup({ item }: { item: NavItem }) {
  if ('href' in item) {
    return <NavLink href={item.href} label={item.label} />;
  }

  return (
    <details className="m-0" open>
      <summary className="cursor-pointer list-none px-2 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase [&::-webkit-details-marker]:hidden">
        {item.label}
      </summary>
      <ul className="m-0 list-none pl-2">
        {item.items.map((child) => (
          <li key={'href' in child ? child.href : child.label}>
            <NavGroup item={child} />
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Sidebar({ navigation }: { navigation: NavItem[] }) {
  return (
    <nav aria-label="Documentación">
      <ul className="m-0 list-none space-y-1 p-0">
        {navigation.map((item) => (
          <li key={'href' in item ? item.href : item.label}>
            <NavGroup item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
