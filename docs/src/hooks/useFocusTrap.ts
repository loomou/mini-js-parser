import { createEffect, onCleanup, type Accessor } from 'solid-js';

type MaybeAccessor<T> = T | Accessor<T>;

function read<T>(value: MaybeAccessor<T>) {
  return typeof value === 'function' ? (value as Accessor<T>)() : value;
}

export function useFocusTrap(options: {
  enabled: MaybeAccessor<boolean>;
  containerId?: string;
  getContainer?: () => HTMLElement | null | undefined;
  selector?: string;
  autoFocus?: boolean;
}) {
  let firstFocusableEl: HTMLElement | null = null;
  let lastFocusableEl: HTMLElement | null = null;

  const selector =
    options.selector ?? 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const deactivate = () => {
    if (typeof document === 'undefined') return;

    document.removeEventListener('keydown', handleTabKey);
    firstFocusableEl = null;
    lastFocusableEl = null;
  };

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl?.focus();
        event.preventDefault();
      }
      return;
    }

    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl?.focus();
      event.preventDefault();
    }
  };

  const getContainer = () => {
    if (typeof document === 'undefined') return null;
    if (options.getContainer) return options.getContainer() ?? null;
    if (!options.containerId) return null;
    return document.getElementById(options.containerId);
  };

  const activate = () => {
    const container = getContainer();
    if (!container || typeof document === 'undefined') return;

    const focusableElements = container.querySelectorAll(selector);
    if (focusableElements.length === 0) return;

    firstFocusableEl = focusableElements[0] as HTMLElement;
    lastFocusableEl = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (options.autoFocus !== false) {
      firstFocusableEl.focus();
    }

    document.addEventListener('keydown', handleTabKey);
  };

  createEffect(() => {
    if (!read(options.enabled)) {
      deactivate();
      return;
    }

    queueMicrotask(activate);
    onCleanup(deactivate);
  });

  onCleanup(deactivate);

  return {
    deactivate,
  };
}
