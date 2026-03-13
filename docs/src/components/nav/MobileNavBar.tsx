import { type TableOfContentsItemData, useCurrentPageData } from '@kobalte/solidbase/client';
import MenuIcon from '~/assets/svg/menu.svg?component-solid';
import { MobileNavBarDropdown } from './MobileNavBarDropdown';

export function MobileNav(props: {
  open: boolean;
  onOpenMenu: () => void;
  title?: string;
  returnToTopLabel?: string;
  menuLabel?: string;
}) {
  const pageData = useCurrentPageData();
  const toc = (): TableOfContentsItemData[] => pageData()?.toc ?? [];

  return (
    <div class="sticky z-40 w-full border-b border-zinc-200 bg-slate-50 dark:border-zinc-700 dark:bg-slate-900">
      <div class="flex items-center justify-between px-6 py-3">
        <button
          class="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-slate-900 md:text-sm lg:hidden dark:text-slate-300 dark:hover:text-slate-50"
          aria-expanded={props.open}
          aria-controls="VPSidebarNav"
          onClick={props.onOpenMenu}
          type="button"
        >
          <MenuIcon class="block size-4" aria-hidden="true" />
          <span class="menu-text">{props.menuLabel ?? 'Menu'}</span>
        </button>
        <MobileNavBarDropdown
          toc={toc()}
          title={props.title}
          returnToTopLabel={props.returnToTopLabel}
        />
      </div>
    </div>
  );
}
