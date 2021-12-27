import chroma, { Color as ChromaColor } from 'chroma-js';

/* eslint-disable no-bitwise */
export const breakpointValues = {
  xxs: 0,
  xs: 400,
  sm: 600,
  article: 750,
  md: 900,
  lg: 1200,
  xl: 1536,
};
const unit = 'px';
const step = 5;

export type Breakpoint = keyof typeof breakpointValues;

interface ColorLike {
  (): string;
  lighten(magnitude: number): ColorLike;
  darken(magnitude: number): ColorLike;
  alpha(alpha: number): ColorLike;
  do(f: (color: ChromaColor) => ChromaColor): ColorLike;
}

function Color(colorIn: string | number | ChromaColor): ColorLike {
  const color = chroma(colorIn);
  return Object.assign(() => color.hex(), {
    do(f: (color: ChromaColor) => ChromaColor) {
      return Color(f(color));
    },

    lighten(magnitude: number) {
      return Color(color.brighten(magnitude));
    },

    darken(magnitude: number) {
      return Color(color.darken(magnitude));
    },

    alpha(alpha: number) {
      return Color(color.alpha(alpha));
    },
  });
}

const theme = {
  breakpoints: {
    up: (bp: Breakpoint | number) => {
      const value = typeof bp === 'number' ? bp : breakpointValues[bp];
      return `@media (min-width: ${value}${unit})`;
    },
    down: (bp: Breakpoint | number) => {
      const value = typeof bp === 'number' ? bp : breakpointValues[bp];
      return `@media (max-width: ${value - step / 100}${unit})`;
    },
  },
  colors: {
    primary: {
      dark: Color('#1976d2'),
      light: Color('#bbdefb'),
      base: Color('#2196f3'),
    },
    text: {
      base: Color('#FFFFFF'),
      primary: Color('#212121'),
      secondary: Color('#757575'),
    },
    accent: Color('#607d8b'),
    divider: Color('#BDBDBD'),
  },
};

export default theme;
