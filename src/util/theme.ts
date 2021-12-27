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
}

const rgbShort = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const rgbLong = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
function Color(
  colorOrR: string | number,
  gIn: number = 0,
  bIn: number = 0,
  aIn: number = 1,
): ColorLike {
  let r: number;
  let g: number;
  let b: number;
  let a: number = 1;

  if (typeof colorOrR === 'string') {
    const c = colorOrR;
    {
      const m = c.match(rgbShort);
      if (m) {
        r = parseInt(m[1], 16) * 0x11;
        g = parseInt(m[2], 16) * 0x11;
        b = parseInt(m[3], 16) * 0x11;
      }
    }
    {
      const m = c.match(rgbLong);
      if (m) {
        r = parseInt(m[1], 16);
        g = parseInt(m[2], 16);
        b = parseInt(m[3], 16);
      }
    }
  } else {
    r = colorOrR;
    g = gIn;
    b = bIn;
    a = aIn;
  }

  return Object.assign(
    () => {
      if (a >= 1 || a <= 0) {
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      }
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    {
      lighten(magnitude: number) {
        return Color(r + magnitude, g + magnitude, b + magnitude, a);
      },

      darken(magnitude: number) {
        return Color(r - magnitude, g - magnitude, b - magnitude, a);
      },

      alpha(alpha: number) {
        return Color(r, g, b, alpha);
      },
    },
  );
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
