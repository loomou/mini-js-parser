import type { ThemeLogo } from '~/types';

export function Logo(props: {
  logo: ThemeLogo;
  href?: string;
  onClick?: () => void;
  alt?: string;
}) {
  const lightSrc = () => props.logo?.light ?? props.logo?.src;
  const darkSrc = () => props.logo?.dark ?? props.logo?.src;
  const singleSrc = () => lightSrc() ?? darkSrc();
  const hasBoth = () => !!lightSrc() && !!darkSrc() && lightSrc() !== darkSrc();
  const href = () => props.logo?.href ?? props.href ?? '/';
  const alt = () => props.logo?.alt ?? props.alt ?? '';
  return (
    <a href={href()} onClick={props.onClick} class="-mx-2 flex items-center justify-center px-2">
      {hasBoth() ? (
        <>
          <img
            src={lightSrc()}
            alt={alt()}
            class="block h-4 dark:hidden"
            aria-hidden={alt() ? undefined : true}
          />
          <img
            src={darkSrc()}
            alt={alt()}
            class="hidden h-4 dark:block"
            aria-hidden={alt() ? undefined : true}
          />
        </>
      ) : (
        <img
          src={singleSrc()}
          alt={alt()}
          class="block h-4"
          aria-hidden={alt() ? undefined : true}
        />
      )}
    </a>
  );
}
