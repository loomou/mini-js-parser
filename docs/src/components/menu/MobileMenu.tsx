import { useLocation, useNavigate } from '@solidjs/router';
import { For, Show, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useEscapeClose } from '~/hooks/useEscapeClose';
import { useFocusTrap } from '~/hooks/useFocusTrap';
import { useRoutePathClose } from '~/hooks/useRoutePathClose';
import { useToggleSet } from '~/hooks/useToggleSet';
import type { NavItem, SocialLink, ThemeLogo } from '~/types';
import ChevronDownIcon from '~/assets/svg/chevron-down.svg?component-solid';
import CloseIcon from '~/assets/svg/close.svg?component-solid';
import { isExternalLink, normalizeLink, normalizePath } from '~/utils/link';
import { normalizeComparablePath } from '~/utils/path';
import { cn } from '~/utils/cn';
import { Logo } from '../logo/Logo';
import { SocialLinks } from '../social/SocialLinks';
import { SwitchAppearance } from '../switch/SwitchAppearance';

interface LocaleLink {
  text: string;
  link: string;
}
type DropdownNavItem = Extract<NavItem, { items: unknown[] }>;
type NavLinkItem = Extract<NavItem, { link: string }>;
type DropdownChildItem = DropdownNavItem['items'][number];
type DropdownGroupItem = Extract<DropdownChildItem, { items: unknown[] }>;
type DropdownLinkItem = Extract<DropdownChildItem, { link: string }>;

function isDropdownNavItem(item: NavItem): item is DropdownNavItem {
  return 'items' in item && Array.isArray(item.items);
}

function isNavLinkItem(item: NavItem): item is NavLinkItem {
  return 'link' in item && typeof item.link === 'string';
}

function isDropdownGroupItem(item: DropdownChildItem): item is DropdownGroupItem {
  return 'items' in item && Array.isArray(item.items);
}

function isDropdownLinkItem(item: DropdownChildItem): item is DropdownLinkItem {
  return 'link' in item && typeof item.link === 'string';
}

export function MobileMenu(props: {
  open: boolean;
  nav: NavItem[];
  showLogo?: boolean;
  logo?: ThemeLogo;
  title?: string;
  socialLinks?: SocialLink[];
  langMenuLabel?: string;
  localeLinks?: LocaleLink[];
  currentLangLabel?: string;
  darkModeSwitchLabel?: string;
  onClose: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const expandedAccordions = useToggleSet<number>();
  const [languageMenuOpen, setLanguageMenuOpen] = createSignal(false);

  const isActive = (link: string) => {
    const path = normalizePath(link);
    return !!path && normalizeComparablePath(location.pathname) === path;
  };

  const close = () => {
    expandedAccordions.reset();
    setLanguageMenuOpen(false);
    props.onClose();
  };

  const handleNavClick = (event: MouseEvent, link: string) => {
    const path = normalizePath(link);
    if (!path) {
      close();
      return;
    }

    event.preventDefault();
    navigate(path);
    close();
  };

  const linkTarget = (link: string) => (isExternalLink(link) ? '_blank' : undefined);
  const linkRel = (link: string) => (isExternalLink(link) ? 'noreferrer' : undefined);

  const renderTopLevelLink = (item: NavLinkItem): JSX.Element => (
    <a
      href={normalizeLink(item.link)}
      onClick={(event) => handleNavClick(event, item.link)}
      target={linkTarget(item.link)}
      rel={linkRel(item.link)}
      class="block px-4 py-3 font-sans text-lg text-slate-900 dark:text-white"
      classList={{
        'bg-slate-900/10 dark:bg-white/10': isActive(item.link),
        'vp-external-link-icon': isExternalLink(item.link),
      }}
    >
      {item.text}
    </a>
  );

  const renderChildLink = (item: { text: string; link: string }): JSX.Element => (
    <a
      href={normalizeLink(item.link)}
      onClick={(event) => handleNavClick(event, item.link)}
      target={linkTarget(item.link)}
      rel={linkRel(item.link)}
      class="block px-4 py-2 font-sans text-base text-gray-600 hover:text-slate-900 dark:text-white/80 dark:hover:text-white"
      classList={{
        'bg-slate-900/10 dark:bg-white/10': isActive(item.link),
        'vp-external-link-icon': isExternalLink(item.link),
      }}
    >
      {item.text}
    </a>
  );

  useBodyScrollLock({
    strategy: 'fixed',
    locked: () => props.open,
  });

  useRoutePathClose({
    when: () => props.open,
    onClose: close,
  });

  useEscapeClose({
    enabled: () => props.open,
    onClose: close,
  });

  useFocusTrap({
    enabled: () => props.open,
    containerId: 'mobile-menu',
  });

  return (
    <Show when={props.open}>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        class="fixed inset-0 z-1001 bg-slate-50 lg:hidden dark:bg-slate-900"
      >
        <section class="flex h-full flex-col">
          <div class="flex w-full items-center justify-between py-5 pr-5 pl-5">
            <div class="flex min-w-0 items-center gap-2">
              <Show when={props.showLogo && props.logo}>
                <Logo logo={props.logo!} onClick={close} />
              </Show>
              <Show when={props.title}>
                <a
                  href={props.logo?.href ?? '/'}
                  onClick={close}
                  class="truncate text-sm font-semibold text-slate-900 dark:text-white"
                >
                  {props.title}
                </a>
              </Show>
            </div>
            <button
              onClick={close}
              aria-label="Close navigation menu"
              class="-mr-2 p-2 text-slate-900 transition-opacity hover:opacity-70 dark:text-white"
              type="button"
            >
              <CloseIcon class="block size-6 cursor-pointer" aria-hidden="true" />
            </button>
          </div>

          <div
            class="flex flex-col overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style="height: calc(100vh - 88px);"
          >
            <nav class="w-full flex-1 pt-6 pb-8">
              <ul class="space-y-1">
                <For each={props.nav}>
                  {(navItem, index) => (
                    <li>
                      {(() => {
                        if (!isDropdownNavItem(navItem)) {
                          return isNavLinkItem(navItem) ? renderTopLevelLink(navItem) : null;
                        }

                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => expandedAccordions.toggle(index())}
                              class="flex w-full items-center justify-between px-4 py-3 font-sans text-lg text-slate-900 dark:text-white"
                              aria-expanded={expandedAccordions.has(index())}
                            >
                              <span>{navItem.text}</span>
                              <ChevronDownIcon
                                class={cn(
                                  'size-4 transition-transform duration-200',
                                  expandedAccordions.has(index()) && 'rotate-180',
                                )}
                                aria-hidden="true"
                              />
                            </button>

                            <Show when={expandedAccordions.has(index())}>
                              <ul class="space-y-1 pl-4">
                                <For each={navItem.items}>
                                  {(childItem) => {
                                    if (isDropdownGroupItem(childItem)) {
                                      return (
                                        <li>
                                          <Show when={childItem.text}>
                                            <p class="px-4 pt-3 pb-1 text-xs font-semibold tracking-wider text-gray-600/70 uppercase dark:text-white/50">
                                              {childItem.text}
                                            </p>
                                          </Show>
                                          <ul class="space-y-1">
                                            <For each={childItem.items}>
                                              {(nestedItem) => (
                                                <li>{renderChildLink(nestedItem)}</li>
                                              )}
                                            </For>
                                          </ul>
                                        </li>
                                      );
                                    }

                                    return isDropdownLinkItem(childItem) ? (
                                      <li>{renderChildLink(childItem)}</li>
                                    ) : null;
                                  }}
                                </For>
                              </ul>
                            </Show>
                          </>
                        );
                      })()}
                    </li>
                  )}
                </For>
              </ul>
            </nav>

            <div class="tick-left tick-right relative mt-auto w-full border-t border-zinc-200 pt-6 pb-12 dark:border-zinc-700">
              <div class="space-y-6">
                <Show when={(props.localeLinks?.length || 0) > 0 && !!props.currentLangLabel}>
                  <div class="px-4">
                    <button
                      type="button"
                      onClick={() => setLanguageMenuOpen((value) => !value)}
                      class="flex w-full items-center justify-between text-sm font-medium text-gray-600 dark:text-white/80"
                      aria-expanded={languageMenuOpen()}
                    >
                      <span>{props.langMenuLabel || 'Language'}</span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        class={cn(
                          'size-4 transition-transform duration-200',
                          languageMenuOpen() && 'rotate-180',
                        )}
                      />
                    </button>
                    <Show when={languageMenuOpen()}>
                      <ul class="mt-3 space-y-1">
                        <For each={props.localeLinks || []}>
                          {(locale) => (
                            <li>
                              <a
                                href={normalizeLink(locale.link)}
                                onClick={(event) => handleNavClick(event, locale.link)}
                                class="block py-2 text-sm text-slate-900 transition-opacity hover:opacity-70 dark:text-white"
                              >
                                {locale.text}
                              </a>
                            </li>
                          )}
                        </For>
                      </ul>
                    </Show>
                  </div>
                </Show>

                <div class="flex items-center justify-between px-4">
                  <span class="text-sm font-medium text-gray-600 dark:text-white/80">
                    {props.darkModeSwitchLabel || 'Appearance'}
                  </span>
                  <SwitchAppearance />
                </div>

                <Show when={props.socialLinks?.length}>
                  <div class="flex items-center justify-center gap-4 pt-4">
                    <SocialLinks links={props.socialLinks!} onLinkClick={close} />
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Show>
  );
}
