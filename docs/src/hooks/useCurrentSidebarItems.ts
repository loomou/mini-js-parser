import { useLocation } from '@solidjs/router';
import { useSolidBaseContext } from '@kobalte/solidbase/client';
import { createMemo } from 'solid-js';
import type { SidebarItem, ThemeConfig } from '~/types';
import { normalizeComparablePath } from '~/utils/path';

function resolveSidebarItems(
  sidebar: Record<string, SidebarItem[]>,
  routePath: string,
): SidebarItem[] {
  const currentPath = normalizeComparablePath(routePath);
  const entries = Object.entries(sidebar).sort((a, b) => b[0].length - a[0].length);

  for (const [rawKey, items] of entries) {
    const key = normalizeComparablePath(rawKey);
    if (currentPath === key || (key !== '/' && currentPath.startsWith(`${key}/`))) {
      return items;
    }
    if (key === '/' && currentPath.startsWith('/')) {
      return items;
    }
  }

  return [];
}

export function useCurrentSidebarItems() {
  const location = useLocation();
  const ctx = useSolidBaseContext<ThemeConfig>();

  return createMemo<SidebarItem[]>(() => {
    const sidebar = ctx.config().themeConfig?.sidebar ?? {};
    return resolveSidebarItems(sidebar, location.pathname);
  });
}
