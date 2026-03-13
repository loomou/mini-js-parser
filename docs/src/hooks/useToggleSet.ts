import { createSignal } from 'solid-js';

export function useToggleSet<T>(initial?: Iterable<T>) {
  const [values, setValues] = createSignal(new Set(initial ?? []));

  const has = (key: T) => values().has(key);

  const toggle = (key: T) => {
    setValues((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const reset = (nextValues?: Iterable<T>) => {
    setValues(new Set(nextValues ?? []));
  };

  const replace = (nextValues: Iterable<T>) => {
    setValues(new Set(nextValues));
  };

  return {
    values,
    has,
    toggle,
    reset,
    replace,
  };
}
