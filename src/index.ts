import { LCSLengths } from './utils/lcs';

export enum Type {
  'IDLE',
  'ADD',
  'DELETE',
}

interface Data {
  type: Type;
  content: string;
}

export function generateDiff<T extends string | string[]>(
  original: T,
  modified: T
) {
  const length = LCSLengths(original, modified);
  const result: Data[] = [];

  function backtrack(i: number, j: number) {
    if (i >= 0 && j >= 0 && original[i] === modified[j]) {
      backtrack(i - 1, j - 1);
      result.push({ type: Type.IDLE, content: original[i] });
      return;
    }
    if (j > 0 && (i === 0 || length[i][j - 1] >= length[i - 1][j])) {
      backtrack(i, j - 1);
      result.push({ type: Type.ADD, content: modified[j] });
      return;
    }
    if (i > 0 && (j === 0 || length[i][j - 1] < length[i - 1][j])) {
      backtrack(i - 1, j);
      result.push({ type: Type.DELETE, content: original[i] });
    }
  }
  backtrack(original.length - 1, modified.length - 1);
  return result;
}
