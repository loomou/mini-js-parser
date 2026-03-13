import { onCleanup, type Accessor } from 'solid-js';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useHoverDelay(options: {
  setOpen: (open: boolean) => void;
  delayMs?: number;
  enabled?: MaybeAccessor<boolean>;
}) {
  const delayMs = options.delayMs ?? 120;
  const enabled = options.enabled ?? true;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const clearTimer = () => {
    if (!closeTimer) return;
    clearTimeout(closeTimer);
    closeTimer = undefined;
  };

  const openMenu = () => {
    if (!read(enabled)) return;
    clearTimer();
    options.setOpen(true);
  };

  const closeMenu = () => {
    if (!read(enabled)) return;
    clearTimer();
    closeTimer = setTimeout(() => options.setOpen(false), delayMs);
  };

  onCleanup(clearTimer);

  return {
    openMenu,
    closeMenu,
    clearTimer,
  };
}
