import { createEffect, onCleanup, type Accessor } from 'solid-js';
import { lockBodyScrollFixed, setBodyOverflowLocked, unlockBodyScrollFixed } from '~/utils/dom';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useBodyScrollLock(options: {
  locked: MaybeAccessor<boolean>;
  strategy?: 'fixed' | 'overflow';
}) {
  const strategy = options.strategy ?? 'fixed';

  createEffect(() => {
    const locked = read(options.locked);

    if (strategy === 'fixed') {
      if (locked) lockBodyScrollFixed();
      else unlockBodyScrollFixed();
      return;
    }

    setBodyOverflowLocked(locked);
  });

  onCleanup(() => {
    if (strategy === 'fixed') {
      unlockBodyScrollFixed();
      return;
    }

    setBodyOverflowLocked(false);
  });
}
