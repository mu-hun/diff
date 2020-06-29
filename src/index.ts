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

  function backtrack(firstIndex: number, secondIndex: number) {
    if (firstIndex < 0 && secondIndex < 0) return;
    if (firstIndex < 0) {
      Add();
      return;
    }
    if (secondIndex < 0) {
      Delete();
      return;
    }
    if (original[firstIndex] === modified[secondIndex]) {
      backtrack(firstIndex - 1, secondIndex - 1);
      result.push({ type: DiffType.IDLE, content: original[firstIndex] });
      return;
    }
    if (
      common[firstIndex][secondIndex - 1] >= common[firstIndex - 1][secondIndex]
    ) {
      Add();
      return;
    }
    Delete();

    function Add() {
      backtrack(firstIndex, secondIndex - 1);
      result.push({ type: DiffType.ADD, content: modified[secondIndex] });
    }
    function Delete() {
      backtrack(firstIndex - 1, secondIndex);
      result.push({ type: DiffType.DELETE, content: original[firstIndex] });
    }
  }
  backtrack(original.length - 1, modified.length - 1);
  return result;
}
