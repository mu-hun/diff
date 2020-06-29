import { generateLinesDiff, DiffType } from '.';

const original = ['abcde', 'fghijk'];
const modefied = ['abcde', 'fghjk'];

test('Lines Diff', () => {
  expect(generateLinesDiff(original, modefied)).toEqual([
    { type: DiffType.IDLE, content: original[0] },
    { type: DiffType.DELETE, content: original[1] },
    { type: DiffType.ADD, content: modefied[1] },
  ]);
});
