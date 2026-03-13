import { useLocation } from '@solidjs/router';
import { createEffect, on, type Accessor } from 'solid-js';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useRoutePathClose(options: { onClose: () => void; when?: MaybeAccessor<boolean> }) {
  const location = useLocation();
  const when = options.when ?? true;

  createEffect(
    on(
      () => location.pathname,
      () => {
        if (!read(when)) return;
        options.onClose();
      },
      { defer: true },
    ),
  );
}
