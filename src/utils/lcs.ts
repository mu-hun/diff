export function LCSLength<T extends string | string[]>(first: T, second: T) {
  const common: number[][] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const __ in first) {
    common.push(new Array(second.length + 1).fill(0));
  }

  for (let firstIndex = 1; firstIndex < first.length; firstIndex++) {
    for (let secondIndex = 1; secondIndex < second.length; secondIndex++) {
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

export function LCS<T extends string | string[]>(first: T, second: T) {
  function backtrack(firstIndex: number, secondIndex: number): string {
    if (firstIndex === -1 || secondIndex === -1) return '';
    if (first[firstIndex] == second[secondIndex])
      return backtrack(firstIndex - 1, secondIndex - 1) + first[firstIndex];
    if (
      common[firstIndex][secondIndex - 1] >= common[firstIndex - 1][secondIndex]
    ) {
      return backtrack(firstIndex, secondIndex - 1);
    }

    return backtrack(firstIndex - 1, secondIndex);
  }

  const common = LCSLength(first, second);

  return backtrack(first.length - 1, second.length - 1);
}
