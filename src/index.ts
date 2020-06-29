import { LCSLength } from './utils/lcs';

export enum DiffType {
  'IDLE',
  'ADD',
  'DELETE',
}

interface DiffLine {
  type: DiffType;
  content: string;
}

export function generateLinesDiff(original: string[], modified: string[]) {
  const common = LCSLength<string[]>(original, modified);
  const result: DiffLine[] = [];

  function backtrack(originalIndex: number, modifiedIndex: number) {
    if (originalIndex < 0 && modifiedIndex < 0) return;
    if (originalIndex < 0) {
      backtrack(originalIndex, modifiedIndex - 1);
      result.push({ type: DiffType.ADD, content: modified[modifiedIndex] });
      return;
    }
    if (modifiedIndex < 0) {
      backtrack(originalIndex - 1, modifiedIndex);
      result.push({ type: DiffType.DELETE, content: original[originalIndex] });
      return;
    }
    if (original[originalIndex] === modified[modifiedIndex]) {
      backtrack(originalIndex - 1, modifiedIndex - 1);
      result.push({ type: DiffType.IDLE, content: original[originalIndex] });
      return;
    }
    if (
      common[originalIndex][modifiedIndex - 1] >=
      common[originalIndex - 1][modifiedIndex]
    ) {
      backtrack(originalIndex, modifiedIndex - 1);
      result.push({ type: DiffType.ADD, content: modified[modifiedIndex] });
      return;
    }
    backtrack(originalIndex - 1, modifiedIndex);
    result.push({ type: DiffType.DELETE, content: original[originalIndex] });
  }
  backtrack(original.length - 1, modified.length - 1);
  return result;
}
