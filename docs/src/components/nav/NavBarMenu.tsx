import { For } from 'solid-js';
import type { NavItem } from '~/types';
import { NavBarMenuGroup } from './NavBarMenuGroup';
import { NavBarMenuLink } from './NavBarMenuLink';

type DropdownNavItem = Extract<NavItem, { items: unknown[] }>;
type NavLinkItem = Extract<NavItem, { link: string }>;

function isDropdownNavItem(item: NavItem): item is DropdownNavItem {
  return 'items' in item && Array.isArray(item.items);
}

function isNavLinkItem(item: NavItem): item is NavLinkItem {
  return 'link' in item && typeof item.link === 'string';
}

export function NavBarMenu(props: { nav: NavItem[] }) {
  return (
    <nav class={'flex items-center'}>
      <For each={props.nav}>
        {(item) =>
          isDropdownNavItem(item) ? (
            <NavBarMenuGroup item={item} />
          ) : isNavLinkItem(item) ? (
            <NavBarMenuLink item={item} />
          ) : null
        }
      </For>
    </nav>
  );
}
