import type { JSX } from 'solid-js';
import { children } from 'solid-js';
import { cn } from '~/utils/cn';

export function Switch(props: {
  title?: string;
  ariaChecked: boolean;
  onClick: () => void;
  children?: JSX.Element;
}) {
  const resolvedChildren = children(() => props.children);

  return (
    <button
      class="relative block h-5.5 w-10 shrink-0 rounded-full border border-slate-300 bg-white transition-colors duration-250 hover:border-electric dark:border-slate-600 dark:bg-gray-800 dark:hover:border-default"
      type="button"
      role="switch"
      title={props.title}
      aria-checked={props.ariaChecked}
      onClick={props.onClick}
    >
      <span
        class={cn(
          'absolute top-px left-px h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-250 dark:bg-black',
          props.ariaChecked && 'translate-x-4.5',
        )}
      >
        {(() => {
          const child = resolvedChildren();
          return child ? (
            <span class="relative block h-4.5 w-4.5 overflow-hidden rounded-full">{child}</span>
          ) : null;
        })()}
      </span>
    </button>
  );
}
