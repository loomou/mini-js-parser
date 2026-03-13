import { onMount } from 'solid-js';
import type { SocialLink } from '~/types';
import { cn } from '~/utils/cn';

export function SocialLink(props: { link: SocialLink; me?: boolean; onClick?: () => void }) {
  let el: HTMLAnchorElement | undefined;

  onMount(() => {
    const span = el?.children[0];
    if (!(span instanceof HTMLElement)) return;
    if (!span.className.startsWith('i-social-')) return;

    const style = getComputedStyle(span);
    if (style.maskImage === 'none' && style.webkitMaskImage === 'none') {
      span.style.setProperty(
        '--icon',
        `url('https://api.iconify.design/simple-icons/${props.link.icon}.svg')`,
      );
    }
  });

  const iconClass = `i-social-${props.link.icon}`;
  const rel = props.me ? 'me noopener' : 'noopener';

  return (
    <a
      ref={(r) => (el = r)}
      class="no-icon flex h-9 w-9 items-center justify-center text-gray-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
      href={props.link.link}
      aria-label={props.link.ariaLabel ?? props.link.icon}
      target="_blank"
      rel={rel}
      onClick={props.onClick}
    >
      <span class={cn(iconClass, 'h-5 w-5 fill-current')} />
    </a>
  );
}
