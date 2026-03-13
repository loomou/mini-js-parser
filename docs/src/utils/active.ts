import { normalizePath } from './link';
import { normalizeComparablePath } from './path';

export function isActiveMatch(routePath: string | undefined, activeMatch?: string) {
  if (!routePath || !activeMatch) return false;
  try {
    return new RegExp(activeMatch).test(routePath);
  } catch {
    return false;
  }
}

export function isActivePath(routePath: string | undefined, link: string, activeMatch?: string) {
  if (isActiveMatch(routePath, activeMatch)) return true;
  if (!routePath) return false;
  const path = normalizePath(link);
  return !!path && normalizeComparablePath(path) === normalizeComparablePath(routePath);
}

export function hasActiveChild(routePath: string | undefined, item: unknown): boolean {
  if (!routePath || !item || typeof item !== 'object') return false;

  if ('link' in item && typeof item.link === 'string') {
    const activeMatch =
      'activeMatch' in item && typeof item.activeMatch === 'string' ? item.activeMatch : undefined;
    return isActivePath(routePath, item.link, activeMatch);
  }

  if ('items' in item && Array.isArray(item.items)) {
    return item.items.some((child) => hasActiveChild(routePath, child));
  }

  return false;
}
