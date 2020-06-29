import { generateDiff, DiffType } from '.';

test('Lines Diff', () => {
  const original = ['abcde', 'fghijk'];
  const modefied = ['abcde', 'fghjk'];
  expect(generateDiff(original, modefied)).toEqual([
    { type: DiffType.IDLE, content: original[0] },
    { type: DiffType.DELETE, content: original[1] },
    { type: DiffType.ADD, content: modefied[1] },
  ]);
});

test('Chars Diff', () => {
  const original = 'abcde';
  const modefied = 'abfde';
  expect(generateDiff(original, modefied)).toEqual([
    { type: DiffType.IDLE, content: 'a' },
    { type: DiffType.IDLE, content: 'b' },
    { type: DiffType.DELETE, content: 'c' },
    { type: DiffType.ADD, content: 'f' },
    { type: DiffType.IDLE, content: 'd' },
    { type: DiffType.IDLE, content: 'e' },
  ]);
});
