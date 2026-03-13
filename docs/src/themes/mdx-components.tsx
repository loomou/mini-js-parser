import { Show, splitProps, type JSX, type ParentProps } from 'solid-js';
import { cn } from '~/utils/cn';

type DirectiveType =
  | 'info'
  | 'note'
  | 'tip'
  | 'important'
  | 'warning'
  | 'danger'
  | 'caution'
  | 'details'
  | 'tab-group'
  | 'tab';

export const strong = (props: JSX.HTMLAttributes<HTMLElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <strong {...rest} class={cn('font-semibold', local.class)}>
      {local.children}
    </strong>
  );
};

const headingAnchorClass =
  '[&>.header-anchor]:absolute [&>.header-anchor]:top-0 [&>.header-anchor]:left-0 [&>.header-anchor]:-ml-[0.87em] [&>.header-anchor]:font-medium [&>.header-anchor]:select-none [&>.header-anchor]:opacity-0 [&>.header-anchor]:no-underline [&:hover>.header-anchor]:opacity-100 [&>.header-anchor:focus]:opacity-100';

export const h1 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h1
      {...rest}
      class={cn(
        `relative text-[28px] leading-10 font-semibold tracking-[-0.02em] outline-none md:text-[32px] ${headingAnchorClass}`,
        local.class,
      )}
    >
      {local.children}
    </h1>
  );
};

export const h2 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h2
      {...rest}
      class={cn(
        `relative mt-12 mb-4 border-t border-zinc-200 pt-6 text-2xl leading-8 font-semibold tracking-[-0.02em] outline-none dark:border-zinc-700 [&>.header-anchor]:top-6 ${headingAnchorClass}`,
        local.class,
      )}
    >
      {local.children}
    </h2>
  );
};

export const h3 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h3
      {...rest}
      class={cn(
        `relative mt-8 text-[20px] leading-7 font-semibold tracking-[-0.01em] outline-none ${headingAnchorClass}`,
        local.class,
      )}
    >
      {local.children}
    </h3>
  );
};

export const h4 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h4
      {...rest}
      class={cn(
        `relative mt-6 text-[18px] leading-6 font-semibold tracking-[-0.01em] outline-none ${headingAnchorClass}`,
        local.class,
      )}
    >
      {local.children}
    </h4>
  );
};

export const h5 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h5
      {...rest}
      class={cn(`relative font-semibold outline-none ${headingAnchorClass}`, local.class)}
    >
      {local.children}
    </h5>
  );
};

export const h6 = (props: JSX.HTMLAttributes<HTMLHeadingElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h6
      {...rest}
      class={cn(`relative font-semibold outline-none ${headingAnchorClass}`, local.class)}
    >
      {local.children}
    </h6>
  );
};

export const p = (props: JSX.HTMLAttributes<HTMLParagraphElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <p {...rest} class={cn('my-4 leading-7 text-slate-900 dark:text-slate-50', local.class)}>
      {local.children}
    </p>
  );
};

export const summary = (props: JSX.HTMLAttributes<HTMLElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <summary {...rest} class={cn('my-4 text-slate-900 dark:text-slate-50', local.class)}>
      {local.children}
    </summary>
  );
};

export const blockquote = (props: JSX.BlockquoteHTMLAttributes<HTMLQuoteElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <blockquote
      {...rest}
      class={cn(
        'my-4 border-l-2 border-zinc-200 pl-4 text-gray-600 dark:border-zinc-700 dark:text-slate-300 [&>p]:m-0 [&>p]:text-base',
        local.class,
      )}
    >
      {local.children}
    </blockquote>
  );
};

export const a = (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <a
      {...rest}
      class={cn(
        'font-medium text-default underline underline-offset-2 hover:text-royal-blue dark:text-electric dark:hover:text-cornflower-blue',
        local.class,
      )}
    >
      {local.children}
    </a>
  );
};

export const ul = (props: JSX.HTMLAttributes<HTMLUListElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <ul {...rest} class={cn('my-4 list-disc pl-5 text-slate-900 dark:text-slate-50', local.class)}>
      {local.children}
    </ul>
  );
};

export const ol = (props: JSX.HTMLAttributes<HTMLOListElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <ol
      {...rest}
      class={cn('my-4 list-decimal pl-5 text-slate-900 dark:text-slate-50', local.class)}
    >
      {local.children}
    </ol>
  );
};

export const li = (props: JSX.HTMLAttributes<HTMLLIElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <li
      {...rest}
      class={cn(
        'text-slate-900 dark:text-slate-50 [&+li]:mt-2 [&>ol]:mt-2 [&>ul]:mt-2',
        local.class,
      )}
    >
      {local.children}
    </li>
  );
};

export const table = (props: JSX.HTMLAttributes<HTMLTableElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <table {...rest} class={cn('my-5 block border-collapse overflow-x-auto', local.class)}>
      {local.children}
    </table>
  );
};

export const thead = (props: JSX.HTMLAttributes<HTMLTableSectionElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <thead {...rest} class={local.class}>
      {local.children}
    </thead>
  );
};

export const tbody = (props: JSX.HTMLAttributes<HTMLTableSectionElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <tbody {...rest} class={local.class}>
      {local.children}
    </tbody>
  );
};

export const tr = (props: JSX.HTMLAttributes<HTMLTableRowElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <tr
      {...rest}
      class={cn(
        'border-t border-zinc-200 bg-slate-50 even:bg-slate-100 dark:border-zinc-700 dark:bg-slate-900 dark:even:bg-slate-800',
        local.class,
      )}
    >
      {local.children}
    </tr>
  );
};

export const th = (props: JSX.ThHTMLAttributes<HTMLTableHeaderCellElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <th
      {...rest}
      class={cn(
        'border border-zinc-200 bg-slate-100 px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:border-zinc-700 dark:bg-slate-800 dark:text-slate-300',
        local.class,
      )}
    >
      {local.children}
    </th>
  );
};

export const td = (props: JSX.TdHTMLAttributes<HTMLTableCellElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <td
      {...rest}
      class={cn(
        'border border-zinc-200 px-4 py-2 text-sm text-slate-900 dark:border-zinc-700 dark:text-slate-50',
        local.class,
      )}
    >
      {local.children}
    </td>
  );
};

export const hr = (props: JSX.HTMLAttributes<HTMLHRElement>) => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <hr
      {...rest}
      class={cn('my-4 border-0 border-t border-zinc-200 dark:border-zinc-700', local.class)}
    />
  );
};

export const pre = (props: JSX.HTMLAttributes<HTMLPreElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <pre
      {...rest}
      class={cn(
        'relative z-1 my-4 overflow-x-auto rounded-lg bg-slate-900 dark:bg-slate-950 [&>code]:block [&>code]:w-fit [&>code]:min-w-full [&>code]:px-6 [&>code]:py-5 [&>code]:leading-(--sd-code-line-height) [&>code]:text-(--sd-code-font-size)',
        local.class,
      )}
    >
      {local.children}
    </pre>
  );
};

export const code = (props: JSX.HTMLAttributes<HTMLElement>) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <code
      {...rest}
      class={cn(
        'rounded bg-indigo-50 px-1.5 py-0.75 text-(--sd-code-font-size) dark:bg-slate-800',
        local.class,
      )}
    >
      {local.children}
    </code>
  );
};

export const DirectiveContainer = (
  props: {
    type: DirectiveType;
    title?: string;
    codeGroup?: string;
    tabNames?: string;
    withTsJsToggle?: string;
  } & ParentProps,
) => {
  if (props.type === 'tab') return <>{props.children}</>;

  if (props.type === 'tab-group') {
    return <div class="my-4">{props.children}</div>;
  }

  if (props.type === 'details') {
    return (
      <details
        class="my-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
        data-custom-container="details"
      >
        <summary class="cursor-pointer font-medium">{props.title ?? props.type}</summary>
        <div class="mt-2">{props.children}</div>
      </details>
    );
  }

  return (
    <div
      class="my-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
      data-custom-container={props.type}
    >
      <Show when={props.title !== ' '}>
        <span class="mb-2 block text-sm font-semibold">{props.title ?? props.type}</span>
      </Show>
      {props.children}
    </div>
  );
};

export const Steps = (props: ParentProps) => <div class="[&>*+*]:mt-4">{props.children}</div>;

export const Step = (props: ParentProps) => <div>{props.children}</div>;

export const nav = (props: ParentProps<JSX.HTMLAttributes<HTMLElement>>) => (
  <nav {...props}>{props.children}</nav>
);

export const ssr = (props: ParentProps) => <>{props.children}</>;
export const spa = () => <></>;
export const response = (props: ParentProps) => <span>{props.children}</span>;
export const unknown = (props: ParentProps) => <span>{props.children}</span>;
