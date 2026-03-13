import { For, Show, createSignal } from 'solid-js';
import MoreHorizontalIcon from '~/assets/svg/more-horizontal.svg?component-solid';
import { useHoverDelay } from '~/hooks/useHoverDelay';
import { useRoutePathClose } from '~/hooks/useRoutePathClose';
import type { SocialLink } from '~/types';
import { normalizeLink } from '~/utils/link';
import { SocialLinks } from '../social/SocialLinks';
import { SwitchAppearance } from '../switch/SwitchAppearance';

export function NavBarExtra(props: {
  show: boolean;
  langMenuLabel?: string;
  localeLinks?: { text: string; link: string }[];
  currentLangLabel?: string;
  appearanceEnabled: boolean;
  darkModeSwitchLabel?: string;
  socialLinks?: SocialLink[];
}) {
  const [open, setOpen] = createSignal(false);

  const hasExtraContent = () =>
    ((props.localeLinks?.length || 0) > 0 && !!props.currentLangLabel) ||
    props.appearanceEnabled ||
    !!props.socialLinks?.length;

  const { openMenu, closeMenu, clearTimer } = useHoverDelay({
    setOpen,
    delayMs: 120,
  });

  useRoutePathClose({
    when: open,
    onClose: () => {
      clearTimer();
      setOpen(false);
    },
  });

  return (
    <Show when={props.show && hasExtraContent()}>
      <div class="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
        <button
          type="button"
          class="flex h-9 w-9 cursor-pointer list-none items-center justify-center text-gray-600 transition-opacity hover:opacity-85 dark:text-white/80"
          aria-label="extra navigation"
          aria-expanded={open()}
        >
          <MoreHorizontalIcon class="h-4 w-4" aria-hidden="true" />
        </button>
        <Show when={open()}>
          <div
            class="absolute right-0 mt-2 min-w-56 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-slate-900"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Show when={(props.localeLinks?.length || 0) > 0 && !!props.currentLangLabel}>
              <div class="group translations pb-2">
                <p class="px-2 py-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {props.currentLangLabel}
                </p>
                <For each={props.localeLinks || []}>
                  {(locale) => (
                    <a
                      href={normalizeLink(locale.link)}
                      class="block rounded-md px-2 py-2 text-sm text-gray-600 hover:bg-zinc-200/40 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      {locale.text}
                    </a>
                  )}
                </For>
              </div>
            </Show>

            <Show when={props.appearanceEnabled}>
              <div class="group border-t border-zinc-200 py-2 dark:border-zinc-700">
                <div class="flex items-center justify-between px-2">
                  <p class="text-sm font-medium text-gray-600 dark:text-white/80">
                    {props.darkModeSwitchLabel || 'Appearance'}
                  </p>
                  <SwitchAppearance />
                </div>
              </div>
            </Show>

            <Show when={props.socialLinks?.length}>
              <div class="group border-t border-zinc-200 py-2 dark:border-zinc-700">
                <div class="px-2">
                  <SocialLinks links={props.socialLinks!} />
                </div>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </Show>
  );
}
