export const breakpoints = {
  xxs: 0,
  xs: 40,
  sm: 60,
  article: 75,
  md: 90,
  lg: 120,
  xl: 153.6,
};
const unit = 'rem';
const step = 5;

export type Breakpoint = keyof typeof breakpoints;

export const up = (bp: Breakpoint | number) => {
  const value = typeof bp === 'number' ? bp : breakpoints[bp];
  return `@media (min-width: ${value}${unit})`;
};
export const down = (bp: Breakpoint | number) => {
  const value = typeof bp === 'number' ? bp : breakpoints[bp];
  return `@media (max-width: ${value - step / 100}${unit})`;
};
