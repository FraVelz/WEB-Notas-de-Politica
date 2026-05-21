'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, type NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link href={href} className={cn('nav-link', active && 'active')}>
      {label}
    </Link>
  );
}

function NavGroup({ item }: { item: NavItem }) {
  if ('href' in item) {
    return <NavLink href={item.href} label={item.label} />;
  }

  return (
    <details className="nav-group" open>
      <summary className="nav-group-label">{item.label}</summary>
      <ul className="nav-list">
        {item.items.map((child) => (
          <li key={'href' in child ? child.href : child.label}>
            <NavGroup item={child} />
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Documentación">
      <ul className="nav-list nav-list-root">
        {navigation.map((item) => (
          <li key={'href' in item ? item.href : item.label}>
            <NavGroup item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
