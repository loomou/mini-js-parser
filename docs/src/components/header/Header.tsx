import { Show, createSignal } from 'solid-js';
import { useSolidBaseContext } from '@kobalte/solidbase/client';
import CloseIcon from '~/assets/svg/close.svg?component-solid';
import MenuIcon from '~/assets/svg/menu.svg?component-solid';
import { Logo } from '../logo/Logo';
import { MobileMenu } from '../menu/MobileMenu';
import { NavBarAppearance } from '../nav/NavBarAppearance';
import { NavBarExtra } from '../nav/NavBarExtra';
import { NavBarMenu } from '../nav/NavBarMenu';
import { NavBarSocialLinks } from '../nav/NavBarSocialLinks';
import { ThemeConfig } from '~/types';

export function Header() {
  const ctx = useSolidBaseContext<ThemeConfig>();
  const config = ctx.config();
  const title = config.title;
  const nav = ctx.config().themeConfig!.nav;
  const logo = ctx.config().themeConfig?.logo;
  const showLogo = !!(logo?.src || logo?.light || logo?.dark);
  const socialLinks = ctx.config().themeConfig!.socialLinks;

  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((value) => !value);

  return (
    <div class="w-full">
      <header class="wrapper relative flex items-center justify-between border-b border-zinc-200 bg-slate-50 px-6 py-5 dark:border-zinc-700 dark:bg-slate-900">
        <div class="flex gap-10 self-stretch">
          <div class="flex min-w-0 items-center gap-2">
            <Show when={showLogo}>
              <Logo logo={logo!} />
            </Show>
            <Show when={title}>
              <a
                href={logo?.href ?? '/'}
                class="truncate text-base font-semibold text-slate-900 dark:text-white"
              >
                {title}
              </a>
            </Show>
          </div>

          <div class="hidden items-center gap-4 lg:flex">
            <NavBarMenu nav={nav} />
          </div>
        </div>

        <div class="flex items-center gap-2 lg:gap-4">
          <div class="hidden items-center gap-4 lg:flex xl:hidden">
            <NavBarExtra show appearanceEnabled={true} socialLinks={socialLinks} />
          </div>

          <div class="hidden items-center gap-4 md:max-xl:hidden xl:flex">
            <NavBarAppearance />
            <NavBarSocialLinks links={socialLinks} />
          </div>

          <button
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen()}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            class="-mr-2 cursor-pointer p-2 text-slate-900 transition-opacity hover:opacity-70 lg:hidden dark:text-white"
            type="button"
          >
            <Show
              when={mobileMenuOpen()}
              fallback={<MenuIcon class="block size-6" aria-hidden="true" />}
            >
              <CloseIcon class="block size-6" aria-hidden="true" />
            </Show>
          </button>
        </div>
      </header>

      <div class="wrapper tick-left tick-right relative h-0" />

      <MobileMenu
        open={mobileMenuOpen()}
        nav={nav}
        showLogo={showLogo}
        logo={logo}
        title={title}
        socialLinks={socialLinks}
        onClose={closeMobileMenu}
      />
    </div>
  );
}
