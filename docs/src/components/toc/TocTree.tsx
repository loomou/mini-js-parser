import { For, Show } from 'solid-js';
import type { TableOfContentsItemData } from '@kobalte/solidbase/client';
import { navigateToAnchor } from '~/utils/anchor';

export function TocTree(props: {
  toc: TableOfContentsItemData[];
  getListClass?: (depth: number) => string | undefined;
  linkClass: string;
}) {
  const RenderList = (listProps: { items: TableOfContentsItemData[]; depth: number }) => (
    <ul class={props.getListClass?.(listProps.depth)}>
      <For each={listProps.items}>
        {(item) => (
          <li>
            <a
              class={props.linkClass}
              href={item.href}
              title={item.title}
              onClick={(event) => {
                event.preventDefault();
                navigateToAnchor(item.href);
              }}
            >
              {item.title}
            </a>
            <Show when={item.children?.length}>
              <RenderList items={item.children!} depth={listProps.depth + 1} />
            </Show>
          </li>
        )}
      </For>
    </ul>
  );

  return <RenderList items={props.toc} depth={0} />;
}
