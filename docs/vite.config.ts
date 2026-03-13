import type { ThemeConfig } from '~/types';
import { defineConfig } from 'vite';
import { nitroV2Plugin as nitro } from '@solidjs/vite-plugin-nitro-2';
import { solidStart } from '@solidjs/start/config';
import { createSolidBase, defineTheme } from '@kobalte/solidbase/config';
import tailwindcss from '@tailwindcss/vite';
import solidSvg from 'vite-plugin-solid-svg';
import { themeConfig } from './themes.config';

const theme = defineTheme({
  componentsPath: import.meta.resolve('./src/themes'),
});

const solidbase = createSolidBase<ThemeConfig>(theme);

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidSvg({
      defaultAsComponent: true,
    }),
    {
      name: 'fix-solidbase',
      enforce: 'pre',
      resolveId(id, importer) {
        if (importer?.includes('@kobalte/solidbase') && id.endsWith('.js')) {
          return this.resolve(id.replace(/\.js$/, ''), importer, {
            skipSelf: true,
          });
        }
      },
    },
    solidbase.plugin({
      title: 'Mini JS Parser',
      themeConfig,
      lang: 'zh-CN',
      markdown: {
        toc: {
          maxDepth: 3,
        },
      },
    }),
    solidStart(solidbase.startConfig()),
    nitro({
      prerender: {
        crawlLinks: true,
      },
    }),
  ],
});
