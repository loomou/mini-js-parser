import { useLocation, type RouteSectionProps } from '@solidjs/router';
import { Match, Switch, ErrorBoundary } from 'solid-js';
import { MainLayout } from '~/layouts/MainLayout';
import { DocLayout } from '~/layouts/DocLayout';
import { ThemeProvider } from '~/context/ThemeContext';
import { NotFound } from '~/layouts/NotFound';

export default function (props: RouteSectionProps) {
  const location = useLocation();
  const isDocsRoute = () => location.pathname === '/docs' || location.pathname.startsWith('/docs/');

  return (
    <ErrorBoundary fallback={<NotFound />}>
      <ThemeProvider>
        <MainLayout>
          <Switch>
            <Match when={isDocsRoute()}>
              <DocLayout>{props.children}</DocLayout>
            </Match>
            <Match when>{props.children}</Match>
          </Switch>
        </MainLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
