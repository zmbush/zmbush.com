/* eslint-disable no-undef */
declare module '*.svg' {
  import type { SVGProps } from 'react';

  const content: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  export default content;
}
