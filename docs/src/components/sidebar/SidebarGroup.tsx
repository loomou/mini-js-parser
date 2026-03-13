import { For, Show, createEffect, createMemo } from 'solid-js';
import { useLocation } from '@solidjs/router';
import ChevronRightIcon from '~/assets/svg/chevron-right.svg?component-solid';
import type { SidebarItem } from '~/types';
import { useToggleSet } from '~/hooks/useToggleSet';
import { normalizeComparablePath } from '~/utils/path';
import { cn } from '~/utils/cn';
import { SidebarLink } from './SidebarLink';

interface SidebarTreeNode {
  key: string;
  item: SidebarItem;
  items?: SidebarTreeNode[];
}

function getSidebarItemLabel(item: SidebarItem) {
  return item.text ?? item.title ?? '';
}

function buildSidebarTree(items: SidebarItem[], prefix = ''): SidebarTreeNode[] {
  return items.map((item, index) => {
    const key = prefix ? `${prefix}-${index}` : `${index}`;
    return {
      key,
      item,
      items: item.items ? buildSidebarTree(item.items, key) : undefined,
    };
  });
}

function isSidebarNodeActive(node: SidebarTreeNode, currentPath: string): boolean {
  const normalizedCurrentPath = normalizeComparablePath(currentPath);
  const link = node.item.link ? normalizeComparablePath(node.item.link) : null;

  if (link && link === normalizedCurrentPath) {
    return true;
  }

  if (!node.items?.length) {
    return false;
  }

  return node.items.some((item) => isSidebarNodeActive(item, normalizedCurrentPath));
}

function collectDefaultOpenKeys(
  nodes: SidebarTreeNode[],
  currentPath: string,
  target = new Set<string>(),
): Set<string> {
  for (const node of nodes) {
    if (!node.items?.length) continue;

    const shouldOpen = node.item.collapsed !== true || isSidebarNodeActive(node, currentPath);

    if (shouldOpen) {
      target.add(node.key);
    }

    collectDefaultOpenKeys(node.items, currentPath, target);
  }

  return target;
}

export function SidebarGroup(props: { items: SidebarItem[]; onNavigate?: () => void }) {
  const location = useLocation();
  const openGroups = useToggleSet<string>();

  const tree = createMemo(() => buildSidebarTree(props.items));

  createEffect(() => {
    const keys = collectDefaultOpenKeys(tree(), location.pathname);
    openGroups.replace(keys);
  });

  const RenderNodes = (nodeProps: { nodes: SidebarTreeNode[] }) => (
    <For each={nodeProps.nodes}>
      {(node) => {
        const hasChildren = () => !!node.items?.length;
        const isOpen = () => openGroups.has(node.key);
        const label = () => getSidebarItemLabel(node.item);

        return (
          <div class="my-2 w-full">
            <Show
              when={hasChildren()}
              fallback={
                <Show
                  when={node.item.link}
                  fallback={
                    <p class="w-full py-1 text-sm font-medium text-gray-600 dark:text-slate-300">
                      {label()}
                    </p>
                  }
                >
                  <SidebarLink item={node.item} onNavigate={props.onNavigate} />
                </Show>
              }
            >
              <div
                role="button"
                tabIndex={0}
                class="m-1 flex w-full cursor-pointer items-center justify-between gap-2 py-1 text-left text-sm font-semibold tracking-wide text-gray-500 uppercase select-none hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-300"
                aria-expanded={isOpen()}
                onClick={() => openGroups.toggle(node.key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openGroups.toggle(node.key);
                  }
                }}
              >
                <span>{label()}</span>
                <ChevronRightIcon
                  aria-hidden="true"
                  class={cn('size-3 transition-transform duration-200', isOpen() && 'rotate-90')}
                />
              </div>
              <Show when={isOpen()}>
                <div class="mt-1 w-full pl-2 ">
                  <RenderNodes nodes={node.items ?? []} />
                </div>
              </Show>
            </Show>
          </div>
        );
      }}
    </For>
  );

  return (
    <div class="w-full">
      <RenderNodes nodes={tree()} />
    </div>
  );
}
