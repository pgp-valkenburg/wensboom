export const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export const easeInQuad = (x: number): number => x * x;

export const easeOutQuad = (x: number): number => 1 - Math.pow(1 - x, 3);
