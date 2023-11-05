const breakPointsUp = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const breakPointsDown = {
  xs: breakPointsUp.sm - 1,
  sm: breakPointsUp.md - 1,
  md: breakPointsUp.lg - 1,
  lg: breakPointsUp.xl - 1,
  xl: breakPointsUp.xxl - 1,
};

export const mediaUp = (n: keyof typeof breakPointsUp) => {
  const size = breakPointsUp[n];
  const result = `@media (min-width: ${size}px)`;
  return result
};

export const mediaDown = (n: string) => {
  const bpArray = Object.keys(breakPointsUp).map((key) => [
    key,
    breakPointsDown[key as keyof typeof breakPointsDown],
  ]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result as string;
};
