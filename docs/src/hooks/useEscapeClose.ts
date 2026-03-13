import { onCleanup, onMount, type Accessor } from 'solid-js';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useEscapeClose(options: { onClose: () => void; enabled?: MaybeAccessor<boolean> }) {
  const enabled = options.enabled ?? true;

  onMount(() => {
    if (typeof document === 'undefined') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (!read(enabled)) return;
      options.onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    onCleanup(() => document.removeEventListener('keydown', onKeyDown));
  });
}
