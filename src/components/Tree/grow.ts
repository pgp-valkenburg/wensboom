export const grow =
  (growth: number, easingFn: (x: number) => number = (x) => x) =>
  (max: number, startAt = 0, min = 0): number => {
    if (growth < startAt) return min;
    const factor = (growth - startAt) / (1 - startAt);
    const x = easingFn(factor);

    return max * x + min * (1 - x);
  };
