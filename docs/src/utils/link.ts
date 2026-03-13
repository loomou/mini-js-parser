import { normalizeComparablePath } from './path';

export function isExternalLink(link: string) {
  return /^[a-z]+:\/\//i.test(link);
}

export function normalizePath(link: string) {
  if (!link) return '/';
  if (isExternalLink(link)) return null;
  const raw = link.startsWith('#') ? link.slice(1) : link;
  return normalizeComparablePath(raw);
}

export function normalizeLink(link: string | undefined) {
  if (!link) return '/';
  const path = normalizePath(link);
  if (!path) return link;
  return `${path}`;
}
