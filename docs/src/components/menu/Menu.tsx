import { For, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { MenuGroup } from './MenuGroup';
import { MenuLink } from './MenuLink';

export type MenuItem =
  | { text: string; link: string }
  | { text?: string; items: { text: string; link: string }[] };

export function Menu(props: { items?: MenuItem[]; children?: JSX.Element }) {
  return (
    <div class="VPMenu max-h-[calc(100vh-var(--vp-nav-height))] min-w-32 overflow-y-auto rounded-sm border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-700 dark:bg-slate-900">
      <Show when={props.items?.length}>
        <div class="items">
          <For each={props.items!}>
            {(item, index) =>
              'link' in item ? (
                <MenuLink item={item} />
              ) : (
                <MenuGroup text={item.text} items={item.items} withDivider={index() > 0} />
              )
            }
          </For>
        </div>
      </Show>
      {props.children}
    </div>
  );
}
