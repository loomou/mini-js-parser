import { useLocation } from '@solidjs/router';
import type { NavItem } from '~/types';
import { hasActiveChild } from '~/utils/active';
import { cn } from '~/utils/cn';
import { Flyout } from '../layout/Flyout';
import { Menu } from '../menu/Menu';

type DropdownNavItem = Extract<NavItem, { items: unknown[] }>;

export function NavBarMenuGroup(props: { item: DropdownNavItem }) {
  const location = useLocation();
  const isActive = () => hasActiveChild(location.pathname, props.item);

  return (
    <Flyout
      class="sdNavBarMenuGroup"
      classList={{ active: isActive() }}
      contentClass="absolute top-full left-0 mt-2"
      button={(open) => (
        <button
          type="button"
          aria-expanded={open}
          class={cn(
            'flex cursor-pointer list-none items-center overflow-hidden px-3 py-2 font-heading text-base text-defaultllipsis whitespace-nowrap transition-opacity hover:text-default hover:opacity-85 dark:hover:text-electric',
            isActive() ? 'text-default dark:text-electric' : 'text-slate-900 dark:text-white',
          )}
        >
          {props.item.text}
        </button>
      )}
    >
      <Menu items={props.item.items} />
    </Flyout>
  );
}
