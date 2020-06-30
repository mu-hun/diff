import { generateDiff, Type } from '.';

test('Lines Diff', () => {
  const original = ['abcde', 'fghijk'];
  const modefied = ['abcde', 'fghjk'];
  expect(generateDiff(original, modefied)).toEqual([
    { type: Type.IDLE, content: original[0] },
    { type: Type.DELETE, content: original[1] },
    { type: Type.ADD, content: modefied[1] },
  ]);
});

test('Chars Diff', () => {
  const original = 'abcde';
  const modefied = 'abfde';
  expect(generateDiff(original, modefied)).toEqual([
    { type: Type.IDLE, content: 'a' },
    { type: Type.IDLE, content: 'b' },
    { type: Type.DELETE, content: 'c' },
    { type: Type.ADD, content: 'f' },
    { type: Type.IDLE, content: 'd' },
    { type: Type.IDLE, content: 'e' },
  ]);
});
