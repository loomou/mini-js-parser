export function scrollToAnchor(
  href: string,
  options?: { offset?: number; behavior?: ScrollBehavior; updateUrl?: boolean },
) {
  if (typeof window === 'undefined') return false;
  const hash = href.startsWith('#') ? href : new URL(href, window.location.href).hash;
  if (!hash) return false;
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;
  const navHeightRaw = getComputedStyle(document.documentElement)
    .getPropertyValue('--sd-nav-height')
    .trim();
  const navHeight = Number.parseInt(navHeightRaw, 10);
  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
  const computedOffset = Number.isFinite(navHeight) && navHeight > 0 ? navHeight : headerHeight;
  const offset = options?.offset ?? computedOffset + 12;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: options?.behavior ?? 'smooth' });
  if (options?.updateUrl !== false && window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `#${id}`);
  }
  return true;
}

export function navigateToAnchor(href: string) {
  if (typeof window === 'undefined') return false;
  if (scrollToAnchor(href)) return true;

  const hash = href.startsWith('#') ? href : new URL(href, window.location.href).hash;
  if (!hash) return false;

  window.location.hash = hash;
  return true;
}
