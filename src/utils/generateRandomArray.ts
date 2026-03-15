export const generateRandomArray = (
  size: number,
  min: number = 10,
  max: number = 250
): number[] => {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
};
