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
    lighten: (color: string, magnitude: number) => {
      const hexColor = color.replace(`#`, ``);
      if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        if (r > 255) r = 255;
        if (r < 0) r = 0;
        let g = (decimalColor & 0x0000ff) + magnitude;
        if (g > 255) g = 255;
        if (g < 0) g = 0;
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        if (b > 255) b = 255;
        if (b < 0) b = 0;
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
      }
      return hexColor;
    },
    darken: (color: string, magnitude: number) => theme.colors.lighten(color, -magnitude),
    alpha: (color: string, magnitude: number) => {
      const hexColor = color.replace(`#`, ``);
      if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        const r = decimalColor >> 16;
        const g = decimalColor & 0x0000ff;
        const b = (decimalColor >> 8) & 0x00ff;
        return `rgba(${r}, ${b}, ${g}, ${magnitude})`;
      }
      return hexColor;
    },
    primary: {
      dark: '#1976d2',
      light: '#bbdefb',
      base: '#2196f3',
    },
    text: {
      base: '#FFFFFF',
      primary: '#212121',
      secondary: '#757575',
    },
    accent: '#607d8b',
    divider: '#BDBDBD',
  },
};

export default theme;
