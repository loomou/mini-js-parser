import { Show } from 'solid-js';
import { useCurrentPageData } from '@kobalte/solidbase/client';
import OutlineListIcon from '~/assets/svg/outline-list.svg?component-solid';
import { Toc } from '../toc/Toc';

export function AsideToc() {
  const pageData = useCurrentPageData();
  const hasToc = () => (pageData()?.toc ?? []).length > 0;

  return (
    <Show when={hasToc()}>
      <nav aria-labelledby="doc-outline-aria-label">
        <div class="content relative text-[13px] font-medium">
          <div
            aria-level="2"
            class="outline-title flex items-center gap-2 text-xs leading-8 font-medium tracking-wide text-gray-600 uppercase dark:text-slate-300"
            id="doc-outline-aria-label"
            role="heading"
          >
            <OutlineListIcon class="block size-4" aria-hidden="true" />
            On this page
          </div>
          <Toc
            listClass="relative z-10"
            itemClass="pr-4"
            linkClass="outline-link block overflow-hidden text-ellipsis whitespace-nowrap leading-7 text-[13px] font-normal text-gray-600 no-underline hover:text-electric hover:duration-250 dark:text-slate-300 dark:hover:text-default [&.active]:text-electric [&.active]:duration-250 dark:[&.active]:text-default"
          />
        </div>
      </nav>
    </Show>
  );
}
