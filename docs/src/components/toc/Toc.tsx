import { For, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import { type TableOfContentsItemData, useCurrentPageData } from '@kobalte/solidbase/client';
import { navigateToAnchor } from '~/utils/anchor';

interface FlattenedTocItem {
  href: string;
  title: string;
  depth: number;
}

interface HeadingElementItem extends FlattenedTocItem {
  el?: HTMLElement;
}

function getAnchorIdFromHref(href: string): string {
  if (!href) return '';

  const hash = href.startsWith('#')
    ? href
    : href.includes('#')
      ? href.slice(href.indexOf('#'))
      : '';
  if (!hash) return '';

  const id = hash.replace(/^#/, '');
  if (!id) return '';

  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

function flattenToc(items: TableOfContentsItemData[]): FlattenedTocItem[] {
  const output: FlattenedTocItem[] = [];
  const stack = items
    .slice()
    .reverse()
    .map((item) => ({ item, depth: 0 }));

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    output.push({
      href: current.item.href,
      title: current.item.title,
      depth: current.depth,
    });

    const children = current.item.children ?? [];
    for (let i = children.length - 1; i >= 0; i -= 1) {
      stack.push({ item: children[i], depth: current.depth + 1 });
    }
  }

  return output;
}

export function Toc(props: {
  listClass?: string;
  itemClass?: string;
  linkClass: string;
  indentPx?: number;
}) {
  const data = useCurrentPageData();
  const toc = () => data()?.toc ?? [];

  const [currentSection, setCurrentSection] = createSignal<string>();
  const [headingElements, setHeadingElements] = createSignal<HeadingElementItem[]>([]);

  const syncCurrentByScroll = () => {
    let current: string | undefined;

    for (const heading of headingElements()) {
      if (!heading.el) continue;
      if (heading.el.getBoundingClientRect().top < 300) {
        current = heading.href;
      }
    }

    setCurrentSection(current);
  };

  createEffect(
    on(toc, (tocItems) => {
      if (!tocItems.length) {
        setHeadingElements([]);
        setCurrentSection(undefined);
        return;
      }

      const flattened = flattenToc(tocItems);
      setHeadingElements(
        flattened.map((item) => {
          const id = getAnchorIdFromHref(item.href);
          const el = id ? (document.getElementById(id) ?? undefined) : undefined;

          return { ...item, el };
        }),
      );

      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (hash) {
        const active = flattened.find((item) => item.href === hash);
        if (active) {
          setCurrentSection(active.href);
          return;
        }
      }

      queueMicrotask(syncCurrentByScroll);
    }),
  );

  onMount(() => {
    syncCurrentByScroll();

    const onScroll = () => syncCurrentByScroll();
    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        syncCurrentByScroll();
        return;
      }

      const hasMatch = headingElements().some((item) => item.href === hash);
      if (hasMatch) {
        setCurrentSection(hash);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    onCleanup(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    });
  });

  return (
    <ul class={props.listClass}>
      <For each={headingElements()}>
        {(item) => (
          <li
            class={props.itemClass}
            style={{
              'padding-left': `${(props.indentPx ?? 16) * item.depth}px`,
            }}
          >
            <a
              href={item.href}
              class={props.linkClass}
              classList={{ active: currentSection() === item.href }}
              title={item.title}
              onClick={(event) => {
                event.preventDefault();
                setCurrentSection(item.href);
                navigateToAnchor(item.href);
              }}
            >
              {item.title}
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
