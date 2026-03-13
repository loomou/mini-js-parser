import { Show } from 'solid-js';
import type { TableOfContentsItemData } from '@kobalte/solidbase/client';
import OutlineListIcon from '~/assets/svg/outline-list.svg?component-solid';
import { TocTree } from '../toc/TocTree';

export function AsideToc(props: { toc: TableOfContentsItemData[] }) {
  const hasToc = () => props.toc.length > 0;

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
          <TocTree
            toc={props.toc}
            getListClass={(depth) => (depth === 0 ? 'relative z-10' : 'pl-4 pr-4')}
            linkClass="outline-link block leading-7 text-[13px] font-normal text-gray-600 dark:text-slate-300 whitespace-nowrap overflow-hidden text-defaultllipsis no-underline hover:text-default dark:hover:text-electric hover:duration-250 [&.active]:text-default dark:[&.active]:text-electric [&.active]:duration-250"
          />
        </div>
      </nav>
    </Show>
  );
}
