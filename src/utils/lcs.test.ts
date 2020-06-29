import { LCS } from './lcs';

test('Search Longest common subsequence', () => {
  expect(LCS<string>('abcdfghjqz', 'abcdefgijkrxyz')).toBe('abcdfgjz');
});
