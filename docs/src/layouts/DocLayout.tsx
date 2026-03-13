import { createSignal, Show, type ParentProps } from 'solid-js';
import { Aside } from '~/components/aside/Aside';
import { Pagination } from '~/components/pagination/Pagination';
import { MobileNav } from '~/components/nav/MobileNavBar';
import { Sidebar } from '~/components/sidebar/Sidebar';

export function DocLayout(props: ParentProps) {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div class="flex">
      <div class="w-sidebar top-nav sticky h-[calc(100vh-var(--nav-height))] shrink-0 overflow-x-hidden overflow-y-auto border-r border-zinc-200 max-lg:hidden dark:border-zinc-700">
        <Sidebar variant="static" />
      </div>

      <div class="flex flex-1 flex-col">
        <div class="sticky top-20.25 z-10 xl:hidden">
          <MobileNav open={sidebarOpen()} onOpenMenu={() => setSidebarOpen(true)} />
        </div>
        <article class="flex flex-1 flex-col px-6 py-8 font-sans text-slate-900 lg:px-10 lg:py-10 dark:text-slate-50">
          {props.children}
          <Pagination />
        </article>
      </div>

      <div class="top-nav sticky h-[calc(100vh-var(--nav-height))] w-66 overflow-y-auto p-6 max-xl:hidden border-l border-zinc-200 dark:border-zinc-700">
        <Aside />
      </div>

      <Show when={sidebarOpen()}>
        <div class="fixed inset-0 z-70 bg-black/40 lg:hidden" onClick={closeSidebar}>
          <Sidebar open={sidebarOpen()} onClose={closeSidebar} />
        </div>
      </Show>
    </div>
  );
}
