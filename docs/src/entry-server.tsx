// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { getHtmlProps } from '@kobalte/solidbase/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html {...getHtmlProps()}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script
            innerHTML={`
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `}
          />
          {assets}
        </head>
        <body>
          <div id="app" class="bg-slate-50 dark:bg-slate-900">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
