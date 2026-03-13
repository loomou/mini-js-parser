export function normalizeComparablePath(path: string | undefined) {
  if (!path) return '/';
  const raw = path.trim();
  if (!raw) return '/';
  const pathname = raw.split('#')[0]?.split('?')[0] ?? '/';
  const next = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return next.endsWith('/') && next !== '/' ? next.slice(0, -1) : next;
}
