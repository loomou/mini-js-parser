import { Show } from 'solid-js';
import { useSolidBaseContext } from '@kobalte/solidbase/client';
import type { ThemeConfig } from '~/types';

export function Footer() {
  const ctx = useSolidBaseContext<ThemeConfig>();
  const footer = () => ctx.config().themeConfig?.footer;

  return (
    <footer class="z-footer relative border-t border-zinc-200 bg-slate-50 px-6 py-8 md:p-8 dark:border-zinc-700 dark:bg-slate-900">
      <div class="mx-auto text-center">
        <Show when={footer()?.brand}>
          <p class="text-sm leading-6 font-medium text-gray-600 dark:text-slate-300">
            {footer()?.brand}
          </p>
        </Show>
        <Show when={footer()?.copyright}>
          <p class="text-sm leading-6 font-medium text-gray-600 dark:text-slate-300">
            {footer()?.copyright}
          </p>
        </Show>
      </div>
    </footer>
  );
}
