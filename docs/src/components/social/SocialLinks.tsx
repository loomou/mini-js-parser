import { For } from 'solid-js';
import type { SocialLink as SocialLinkType } from '~/types';
import { cn } from '~/utils/cn';
import { SocialLink } from './SocialLink';

export function SocialLinks(props: {
  links: SocialLinkType[];
  me?: boolean;
  onLinkClick?: () => void;
  class?: string;
}) {
  return (
    <div class={cn('flex justify-center', props.class)}>
      <For each={props.links}>
        {(l) => <SocialLink link={l} me={props.me} onClick={props.onLinkClick} />}
      </For>
    </div>
  );
}
