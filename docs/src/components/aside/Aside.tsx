import type { JSX } from 'solid-js';
import { AsideToc } from './AsideToc';

export function Aside(props: {
  asideTop?: JSX.Element;
  asideBottom?: JSX.Element;
  asideOutlineBefore?: JSX.Element;
  asideOutlineAfter?: JSX.Element;
  asideAdsBefore?: JSX.Element;
  asideAdsAfter?: JSX.Element;
}) {
  return (
    <div class="flex grow flex-col">
      {props.asideTop}
      {props.asideOutlineBefore}
      <AsideToc />
      {props.asideOutlineAfter}
      <div class="spacer grow" />
      {props.asideAdsBefore}
      {props.asideAdsAfter}
      {props.asideBottom}
    </div>
  );
}
