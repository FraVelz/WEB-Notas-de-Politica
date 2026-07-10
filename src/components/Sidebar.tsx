'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  CircleDot,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookmarksMenu } from '@/components/ui/BookmarksMenu';
import type { NavItem } from '@/lib/navigation';
import { getTemaIcon } from '@/lib/temas/icons';
import { cn } from '@/lib/utils';

function NavLink({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon?: LucideIcon;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const showActive = pathname === href;
  const ItemIcon = Icon ?? CircleDot;

  return (
    <Link
      href={href}
      title={label}
      className={cn(
        'flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm no-underline transition-colors duration-150',
        collapsed && 'justify-center px-0',
        showActive
          ? 'bg-link font-medium text-white shadow-[0_0_24px_rgb(59_130_246/35%)]'
          : 'text-muted-foreground hover:bg-link-muted/60 hover:text-link',
      )}
    >
      <ItemIcon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
      {!collapsed ? <span className="truncate">{label}</span> : null}
    </Link>
  );
}

function NavGroup({
  item,
  icons,
  collapsed,
}: {
  item: NavItem;
  icons?: Record<string, LucideIcon>;
  collapsed?: boolean;
}) {
  if ('href' in item) {
    return (
      <NavLink
        href={item.href}
        label={item.label}
        icon={icons?.[item.href]}
        collapsed={collapsed}
      />
    );
  }

  if (collapsed) {
    return (
      <ul className="m-0 list-none space-y-0.5 p-0">
        {item.items.map((child) => (
          <li
            key={
              'href' in child
                ? `${child.href}-${child.label}`
                : child.label
            }
          >
            <NavGroup item={child} icons={icons} collapsed />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-0.5">
      <p className="m-0 px-2.5 py-2 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
        {item.label}
      </p>
      <ul className="m-0 list-none space-y-0.5 p-0">
        {item.items.map((child) => (
          <li
            key={
              'href' in child
                ? `${child.href}-${child.label}`
                : child.label
            }
          >
            <NavGroup item={child} icons={icons} collapsed={collapsed} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sidebar({
  navigation,
  temaId,
  title,
  subtitle = 'Archivo de conocimiento',
  quote,
  icons,
  collapsed = false,
  onCollapseToggle,
  onCollapse,
}: {
  navigation: NavItem[];
  temaId?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  icons?: Record<string, LucideIcon>;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
  onCollapse?: () => void;
}) {
  const Icon = temaId ? getTemaIcon(temaId) : BookOpen;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {(title || temaId) && (
        <div
          className={cn(
            'mb-5 flex items-start gap-3 px-1',
            collapsed && 'justify-center',
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-link/30 bg-link-muted text-link">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-semibold text-foreground">
                {title ?? 'Apartado'}
              </p>
              <p className="m-0 truncate text-xs text-muted-foreground">
                {subtitle}
              </p>
            </div>
          ) : null}
        </div>
      )}

      <nav
        aria-label="Documentación"
        className="min-h-0 flex-1 space-y-4 overflow-y-auto"
      >
        <ul className="m-0 list-none space-y-3 p-0">
          {navigation.map((item) => (
            <li key={'href' in item ? item.href : item.label}>
              <NavGroup item={item} icons={icons} collapsed={collapsed} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {quote && !collapsed ? (
          <blockquote className="surface-glass m-0 rounded-xl px-3 py-3 text-xs leading-relaxed text-muted-foreground italic">
            “{quote}”
            <footer className="mt-2 not-italic text-[0.65rem] tracking-wide uppercase opacity-70">
              Archivo de conocimiento
            </footer>
          </blockquote>
        ) : null}
        <div
          className={cn(
            'flex items-center gap-2 px-1',
            collapsed && 'flex-col justify-center',
          )}
        >
          {!collapsed ? (
            <span
              className="flex size-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground"
              aria-hidden
            >
              N
            </span>
          ) : null}
          <div
            className={cn(
              'flex items-center gap-1',
              collapsed ? 'flex-col' : 'ml-auto',
            )}
          >
            {!collapsed ? <BookmarksMenu /> : null}
            <ThemeToggle />
            {onCollapseToggle ? (
              <button
                type="button"
                onClick={onCollapseToggle}
                className="hidden size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground md:inline-flex"
                aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
              >
                {collapsed ? (
                  <PanelLeftOpen className="size-4" />
                ) : (
                  <PanelLeftClose className="size-4" />
                )}
              </button>
            ) : null}
            {onCollapse ? (
              <button
                type="button"
                onClick={onCollapse}
                className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Cerrar menú"
              >
                <PanelLeftClose className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
