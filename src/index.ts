import { LCSLengths } from './utils/lcs';

export enum DiffType {
  'IDLE',
  'ADD',
  'DELETE',
}

interface DiffLine {
  type: DiffType;
  content: string;
}

export function generateDiff<T extends string | string[]>(
  original: T,
  modified: T
) {
  const common = LCSLengths(original, modified);
  const result: DiffLine[] = [];

  function backtrack(i: number, j: number) {
    if (i >= 0 && j >= 0 && original[i] === modified[j]) {
      backtrack(i - 1, j - 1);
      result.push({ type: DiffType.IDLE, content: original[i] });
      return;
    }
    if (j > 0 && (i === 0 || common[i][j - 1] >= common[i - 1][j])) {
      backtrack(i, j - 1);
      result.push({ type: DiffType.ADD, content: modified[j] });
      return;
    }
    if (i > 0 && (j === 0 || common[i][j - 1] < common[i - 1][j])) {
      backtrack(i - 1, j);
      result.push({ type: DiffType.DELETE, content: original[i] });
    }
  }
  backtrack(original.length - 1, modified.length - 1);
  return result;
}
