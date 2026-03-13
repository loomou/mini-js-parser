import { For, createEffect, createMemo } from 'solid-js';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useCurrentSidebarItems } from '~/hooks/useCurrentSidebarItems';
import { cn } from '~/utils/cn';
import { SidebarGroup } from './SidebarGroup';

export function Sidebar(props: {
  open?: boolean;
  onClose?: () => void;
  variant?: 'overlay' | 'static';
}) {
  const isOverlay = () => props.variant !== 'static';
  const isOpen = createMemo(() => (isOverlay() ? !!props.open : true));

  const sidebarItems = useCurrentSidebarItems();
  const groupedItems = createMemo(() => sidebarItems().map((item) => [item]));

  useBodyScrollLock({
    strategy: 'overflow',
    locked: () => isOverlay() && isOpen(),
  });

  let navEl: HTMLElement | undefined;

  createEffect(() => {
    if (!isOverlay() || !isOpen()) return;
    queueMicrotask(() => navEl?.focus());
  });

  return sidebarItems().length ? (
    <aside
      class={cn(
        isOverlay()
          ? 'shadow-3 fixed top-0 bottom-0 left-0 z-80 w-[calc(100vw-64px)] max-w-[320px] -translate-x-[calc(100%+1rem)] overflow-x-hidden overflow-y-auto bg-slate-50 px-8 py-5 pb-24 opacity-0 transition-opacity duration-500 dark:bg-slate-900'
          : 'w-sidebar shrink-0 px-6 py-6',
      )}
      classList={{
        'opacity-100 visible translate-x-0 transition-opacity duration-250 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]':
          isOverlay() && isOpen(),
      }}
      ref={(el) => (navEl = el)}
      onClick={(e) => e.stopPropagation()}
    >
      <nav class="outline-0" aria-labelledby="sidebar-aria-label" tabIndex={-1}>
        <For each={groupedItems()}>
          {(items, index) => (
            <div
              classList={{
                'mt-3 pt-1 border-t border-zinc-200 dark:border-zinc-700': index() > 0,
              }}
            >
              <SidebarGroup items={items} onNavigate={props.onClose} />
            </div>
          )}
        </For>
      </nav>
    </aside>
  ) : null;
}
