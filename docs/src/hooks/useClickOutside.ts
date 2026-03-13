import { createEffect, onCleanup, type Accessor } from 'solid-js';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useClickOutside(options: {
  getContainer: () => HTMLElement | null | undefined;
  onOutside: (event: MouseEvent) => void;
  enabled?: MaybeAccessor<boolean>;
  eventName?: 'click' | 'mousedown';
}) {
  const enabled = options.enabled ?? true;
  const eventName = options.eventName ?? 'click';

  createEffect(() => {
    if (typeof document === 'undefined') return;
    if (!read(enabled)) return;

    const handler = (event: MouseEvent) => {
      const container = options.getContainer();
      const target = event.target;

      if (!container || !(target instanceof Node)) return;
      if (container.contains(target)) return;

      options.onOutside(event);
    };

    document.addEventListener(eventName, handler);
    onCleanup(() => document.removeEventListener(eventName, handler));
  });
}
