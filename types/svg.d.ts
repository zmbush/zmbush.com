/* eslint-disable no-undef */
// eslint-disable-next-line quotes
declare module '*.svg' {
  import type { SVGProps } from 'react';

  const content: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default content;
}
