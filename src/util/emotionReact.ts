import {
  SerializedStyles,
  css as innerCss,
  ComponentSelector,
  Keyframes,
  CSSObject,
} from '@emotion/react';

export * from '@emotion/react';

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export type InterpolationPrimitive =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject;

export interface FunctionCSSInterpolation {
  (): CSSInterpolation;
}

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation;

export function css(
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation | FunctionCSSInterpolation>
): SerializedStyles {
  return innerCss(
    template,
    ...args.map((interpolation) => {
      if (typeof interpolation === `function`) {
        return interpolation();
      }
      return interpolation;
    }),
  );
}
