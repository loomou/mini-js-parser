import { useLocation } from '@solidjs/router';
import type { NavItem } from '~/types';
import { isActivePath } from '~/utils/active';
import { cn } from '~/utils/cn';
import { isExternalLink, normalizeLink } from '~/utils/link';

type LinkNavItem = Extract<NavItem, { link: string }>;

export function NavBarMenuLink(props: { item: LinkNavItem }) {
  const location = useLocation();
  const isExternal = () => isExternalLink(props.item.link);
  const isActive = () => isActivePath(location.pathname, props.item.link, props.item.activeMatch);

  return (
    <a
      class={cn(
        'flex items-center overflow-hidden px-3 py-2 font-heading text-base text-defaultllipsis whitespace-nowrap transition-opacity hover:text-default hover:opacity-85 dark:hover:text-electric',
        isActive() ? 'text-default dark:text-electric' : 'text-slate-900 dark:text-white',
      )}
      href={normalizeLink(props.item.link)}
      target={isExternal() ? '_blank' : undefined}
      rel={isExternal() ? 'noreferrer' : undefined}
      classList={{
        'sd-external-link-icon': isExternal(),
      }}
    >
      {props.item.text}
    </a>
  );
}
