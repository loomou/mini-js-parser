import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { cn } from '~/utils/cn';
import { isExternalLink, normalizeLink } from '~/utils/link';

export interface MenuLinkItem {
  text: string;
  link: string;
}

export function MenuLink(
  props: { item: MenuLinkItem } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const [local, others] = splitProps(props, ['item', 'class', 'classList']);
  const isExternal = () => isExternalLink(local.item.link);
  const href = () => normalizeLink(local.item.link);

  return (
    <a
      {...others}
      href={href()}
      target={others.target ?? (isExternal() ? '_blank' : undefined)}
      rel={others.rel ?? (isExternal() ? 'noreferrer' : undefined)}
      class={cn(
        'block rounded-md px-2 py-2 text-sm text-gray-600 hover:bg-zinc-200/40 hover:text-default dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-electric dark:hover:text-white',
        local.class,
      )}
      classList={{
        'vp-external-link-icon': isExternal(),
        ...(local.classList || {}),
      }}
    >
      {local.item.text}
    </a>
  );
}
