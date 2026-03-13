export function lockBodyScrollFixed() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = '0';

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockBodyScrollFixed() {
  if (typeof document === 'undefined') return;

  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.body.style.paddingRight = '';
}

export function setBodyOverflowLocked(locked: boolean) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  if (locked) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return;
  }

  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}
