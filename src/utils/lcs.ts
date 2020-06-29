export function LCSLengths<T extends string | string[]>(first: T, second: T) {
  const common: number[][] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (let i = 0; i < first.length + 1; i++) {
    common.push(new Array(second.length + 1).fill(0));
  }

  for (let i = 1; i <= first.length; i++) {
    for (let j = 1; j <= second.length; j++) {
      if (first[i] === second[j]) {
        common[i][j] = 1 + common[i - 1][j - 1];
      } else {
        common[i][j] = Math.max(common[i][j - 1], common[i - 1][j]);
      }
    }
  }
  return common;
}
