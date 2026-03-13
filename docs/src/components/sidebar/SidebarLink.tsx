import { useLocation } from '@solidjs/router';
import type { SidebarItem } from '~/types';
import { cn } from '~/utils/cn';
import { normalizeComparablePath } from '~/utils/path';

export function SidebarLink(props: { item: SidebarItem; onNavigate?: () => void }) {
  const location = useLocation();

  const link = () => props.item.link ?? '#';
  const label = () => props.item.text ?? props.item.title ?? '';
  const isActive = () =>
    !!props.item.link &&
    normalizeComparablePath(location.pathname) === normalizeComparablePath(props.item.link);

  return (
    <a
      class={cn(
        'block w-full py-1 text-sm leading-6 font-medium no-underline hover:text-default dark:hover:text-electric',
        isActive() ? 'text-default dark:text-electric' : 'text-gray-600 dark:text-slate-300',
      )}
      href={link()}
      onClick={props.onNavigate}
    >
      <p>{label()}</p>
    </a>
  );
}
