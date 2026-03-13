import { createMemo, type Accessor } from 'solid-js';
import type { SidebarItem } from '~/types';
import { normalizeComparablePath } from '~/utils/path';

interface FlatSidebarItem {
  text: string;
  link: string;
}

function getSidebarItemLabel(item: SidebarItem) {
  return item.text ?? item.title ?? '';
}

function flattenSidebarItems(items: SidebarItem[]): FlatSidebarItem[] {
  const flat: FlatSidebarItem[] = [];

  const walk = (nodes: SidebarItem[]) => {
    for (const node of nodes) {
      if (node.link) {
        flat.push({
          text: getSidebarItemLabel(node) || node.link,
          link: node.link,
        });
      }
      if (node.items?.length) {
        walk(node.items);
      }
    }
  };

  walk(items);
  return flat;
}

export function useDocPrevNext(options: {
  items: Accessor<SidebarItem[]>;
  pathname: Accessor<string>;
}) {
  const flatItems = createMemo(() => flattenSidebarItems(options.items()));

  const activeIndex = createMemo(() => {
    const currentPath = normalizeComparablePath(options.pathname());
    return flatItems().findIndex((item) => normalizeComparablePath(item.link) === currentPath);
  });

  const prev = createMemo(() => {
    const index = activeIndex();
    return index > 0 ? flatItems()[index - 1] : null;
  });

  const next = createMemo(() => {
    const index = activeIndex();
    return index >= 0 && index < flatItems().length - 1 ? flatItems()[index + 1] : null;
  });

  return {
    flatItems,
    activeIndex,
    prev,
    next,
  };
}
