import { LCS } from './lcs';

test('Search Longest common subsequence', () => {
  expect(LCS('abcdfghjqz', 'abcdefgijkrxyz')).toBe('abcdfgjz');
});
