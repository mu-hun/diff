export function LCSLengths<T extends string | string[]>(first: T, second: T) {
  const length: number[][] = [];
  for (let i = 0; i < first.length + 1; i++) {
    length.push(new Array(second.length + 1).fill(0));
  }

  for (let i = 1; i <= first.length; i++) {
    for (let j = 1; j <= second.length; j++) {
      if (first[i] === second[j]) {
        length[i][j] = 1 + length[i - 1][j - 1];
      } else {
        length[i][j] = Math.max(length[i][j - 1], length[i - 1][j]);
      }
    }
  }
  return length;
}
