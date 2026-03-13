import { useLocation } from '@solidjs/router';
import { Show, type ParentProps } from 'solid-js';
import { Footer } from '~/components/footer/Footer';
import { Header } from '~/components/header/Header';

export function MainLayout(props: ParentProps) {
  const location = useLocation();
  const isHomeRoute = () => location.pathname === '/';

  return (
    <main class="flex min-h-screen w-full flex-col">
      <div class="m-auto flex min-h-180 w-full max-w-360 flex-1 flex-col">
        <div class="sticky top-0 z-50 flex-none">
          <Header />
        </div>

        <div class="flex-1">{props.children}</div>

        <Show when={isHomeRoute()}>
          <Footer />
        </Show>
      </div>
    </main>
  );
}
