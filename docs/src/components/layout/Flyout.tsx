import { Show, createSignal } from 'solid-js';
import type { JSX, ParentProps } from 'solid-js';
import { useHoverDelay } from '~/hooks/useHoverDelay';
import { cn } from '~/utils/cn';

export function Flyout(
  props: ParentProps<{
    class?: string;
    classList?: Record<string, boolean>;
    contentClass: string;
    button: (open: boolean) => JSX.Element;
    trigger?: 'hover' | 'click';
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>,
) {
  const [internalOpen, setInternalOpen] = createSignal(false);
  const isControlled = () => props.open !== undefined;
  const open = () => (isControlled() ? !!props.open : internalOpen());
  const trigger = () => props.trigger ?? 'hover';

  const setOpen = (next: boolean) => {
    if (!isControlled()) {
      setInternalOpen(next);
    }
    props.onOpenChange?.(next);
  };

  const { openMenu, closeMenu } = useHoverDelay({
    setOpen,
    delayMs: 120,
    enabled: () => trigger() === 'hover',
  });

  return (
    <div
      class={cn('relative', props.class)}
      classList={props.classList}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {props.button(open())}
      <Show when={open()}>
        <div class={props.contentClass} onMouseEnter={openMenu} onMouseLeave={closeMenu}>
          {props.children}
        </div>
      </Show>
    </div>
  );
}
