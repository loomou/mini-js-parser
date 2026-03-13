import type { JSX } from 'solid-js';
import { useCurrentPageData } from '@kobalte/solidbase/client';
import { AsideToc } from './AsideToc';

export function Aside(props: {
  asideTop?: JSX.Element;
  asideBottom?: JSX.Element;
  asideOutlineBefore?: JSX.Element;
  asideOutlineAfter?: JSX.Element;
  asideAdsBefore?: JSX.Element;
  asideAdsAfter?: JSX.Element;
}) {
  const pageData = useCurrentPageData();
  const toc = () => pageData()?.toc ?? [];

  return (
    <div class="flex grow flex-col">
      {props.asideTop}
      {props.asideOutlineBefore}
      <AsideToc toc={toc()} />
      {props.asideOutlineAfter}
      <div class="spacer grow" />
      {props.asideAdsBefore}
      {props.asideAdsAfter}
      {props.asideBottom}
    </div>
  );
}
