import { useLocation } from '@solidjs/router';
import { Show } from 'solid-js';
import { useCurrentSidebarItems } from '~/hooks/useCurrentSidebarItems';
import { useDocPrevNext } from '~/hooks/useDocPrevNext';
import { normalizeLink } from '~/utils/link';

export function Pagination() {
  const location = useLocation();
  const sidebarItems = useCurrentSidebarItems();
  const { prev, next } = useDocPrevNext({
    items: sidebarItems,
    pathname: () => location.pathname,
  });

  return (
    <Show when={prev() || next()}>
      <footer class="mt-16">
        <nav
          class="prev-next grid gap-2 border-t border-zinc-200 pt-6 sm:grid-cols-2 sm:gap-4 dark:border-zinc-700"
          aria-labelledby="doc-footer-aria-label"
        >
          <div class="pager">
            <Show when={prev()}>
              {(item) => (
                <a
                  class="pager-link block rounded-lg border border-zinc-200 px-4 py-3 no-underline hover:border-electric dark:border-zinc-700 dark:hover:border-default"
                  href={normalizeLink(item().link)}
                >
                  <span class=" block text-xs font-medium text-gray-600 dark:text-slate-300">
                    Previous page
                  </span>
                  <span class=" block text-sm font-medium text-default dark:text-electric">
                    {item().text}
                  </span>
                </a>
              )}
            </Show>
          </div>
          <div class="pager">
            <Show when={next()}>
              {(item) => (
                <a
                  class="pager-link next ml-auto block rounded-lg border border-zinc-200 px-4 py-3 text-right no-underline hover:border-electric dark:border-zinc-700 dark:hover:border-default"
                  href={normalizeLink(item().link)}
                >
                  <span class="desc block text-xs font-medium text-gray-600 dark:text-slate-300">
                    Next page
                  </span>
                  <span class="title block text-sm font-medium text-default dark:text-electric">
                    {item().text}
                  </span>
                </a>
              )}
            </Show>
          </div>
        </nav>
      </footer>
    </Show>
  );
}
