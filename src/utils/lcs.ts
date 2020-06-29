export function LCSLengths<T extends string | string[]>(first: T, second: T) {
  const common: number[][] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (let i = 0; i < first.length + 1; i++) {
    common.push(new Array(second.length + 1).fill(0));
  }

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex++) {
    for (let secondIndex = 1; secondIndex <= second.length; secondIndex++) {
      if (first[firstIndex] === second[secondIndex]) {
        common[firstIndex][secondIndex] =
          1 + common[firstIndex - 1][secondIndex - 1];
      } else {
        common[firstIndex][secondIndex] = Math.max(
          common[firstIndex][secondIndex - 1],
          common[firstIndex - 1][secondIndex]
        );
      }
    }
  }
  return common;
}
