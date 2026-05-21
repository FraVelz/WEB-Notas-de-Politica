import type { NavItem } from '@/lib/navigation';

/** Recoge enlaces planos de una navegación anidada en un solo recorrido. */
export function collectNavLinks(
  items: NavItem[],
): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  for (const item of items) {
    if ('href' in item) {
      links.push(item);
      continue;
    }
    for (const child of item.items) {
      if ('href' in child) links.push(child);
    }
  }
  return links;
}

/** Enlaces planos que cumplen un predicado, en un solo recorrido. */
export function collectNavLinksWhere(
  items: NavItem[],
  predicate: (link: { label: string; href: string }) => boolean,
): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  for (const item of items) {
    if ('href' in item) {
      if (predicate(item)) links.push(item);
      continue;
    }
    for (const child of item.items) {
      if ('href' in child && predicate(child)) links.push(child);
    }
  }
  return links;
}
