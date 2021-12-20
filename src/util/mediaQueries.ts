export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};
const unit = 'px';
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
