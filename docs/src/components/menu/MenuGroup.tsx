import { For, Show } from 'solid-js';
import { cn } from '~/utils/cn';
import { MenuLink } from './MenuLink';

export function MenuGroup(props: {
  text?: string;
  items: { text: string; link: string }[];
  withDivider?: boolean;
}) {
  return (
    <div
      class={cn(
        'group',
        props.withDivider && 'mt-3 border-t border-zinc-200/70 pt-3 dark:border-zinc-700/70',
      )}
    >
      <Show when={props.text}>
        <div class="px-2 py-1 text-xs tracking-wide text-gray-600/70 uppercase dark:text-white/50">
          {props.text}
        </div>
      </Show>
      <For each={props.items}>{(item) => <MenuLink item={item} />}</For>
    </div>
  );
}
