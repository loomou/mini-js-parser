import { Show, createSignal } from 'solid-js';
import { useCurrentPageData } from '@kobalte/solidbase/client';
import ChevronRightIcon from '~/assets/svg/chevron-right.svg?component-solid';
import { useClickOutside } from '~/hooks/useClickOutside';
import { useEscapeClose } from '~/hooks/useEscapeClose';
import { useRoutePathClose } from '~/hooks/useRoutePathClose';
import { cn } from '~/utils/cn';
import { Toc } from '../toc/Toc';

export function MobileNavBarDropdown(props: { title?: string; returnToTopLabel?: string }) {
  const [open, setOpen] = createSignal(false);
  const pageData = useCurrentPageData();
  let mainEl: HTMLDivElement | undefined;
  let itemsEl: HTMLDivElement | undefined;

  const title = () => props.title ?? 'On this page';
  const returnToTopLabel = () => props.returnToTopLabel ?? 'Return to top';
  const hasToc = () => (pageData()?.toc ?? []).length > 0;

  const close = () => setOpen(false);

  useEscapeClose({
    enabled: open,
    onClose: close,
  });

  useRoutePathClose({
    when: open,
    onClose: close,
  });

  useClickOutside({
    enabled: open,
    getContainer: () => mainEl,
    onOutside: close,
  });

  const scrollToTop = (e?: MouseEvent) => {
    e?.preventDefault();
    close();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const toggle = () => {
    if (!hasToc()) {
      scrollToTop();
      return;
    }
    setOpen((value) => !value);
  };

  const onItemClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.outline-link')) return;
    if (itemsEl) itemsEl.style.transition = 'none';
    queueMicrotask(close);
  };

  return (
    <div ref={(el) => (mainEl = el)}>
      <button
        type="button"
        class={cn(
          'flex items-center gap-1 px-4 py-2 text-xs leading-6 font-medium hover:text-slate-900 md:text-sm dark:hover:text-slate-50',
          open() ? 'text-slate-900 dark:text-slate-50' : 'text-gray-600 dark:text-slate-300',
        )}
        onClick={toggle}
      >
        <span class="menu-text">{hasToc() ? title() : returnToTopLabel()}</span>
        <ChevronRightIcon
          aria-hidden="true"
          class={cn('size-3 transition-transform duration-250', open() ? 'rotate-90' : 'rotate-0')}
        />
      </button>
      <Show when={open()}>
        <div
          class="shadow-3 absolute top-14 right-4 left-4 grid max-h-[calc(var(--sd-vh,100vh)-86px)] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
          ref={(el) => (itemsEl = el)}
          onClick={onItemClick}
        >
          <div>
            <a
              class="block px-4 text-sm leading-12 font-medium text-electric dark:text-default"
              href="#"
              onClick={scrollToTop}
            >
              {returnToTopLabel()}
            </a>
          </div>
          <div class="py-2 outline outline-slate-200 dark:outline-slate-700">
            <Toc
              listClass="mt-1 space-y-1 text-[13px]"
              itemClass="pl-4 pr-4"
              linkClass="outline-link block leading-6 text-gray-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50 [&.active]:text-electric dark:[&.active]:text-default"
            />
          </div>
        </div>
      </Show>
    </div>
  );
}
