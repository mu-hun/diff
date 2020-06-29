import { LCSLengths } from './lcs';

test('Search Longest common subsequence length', () => {
  const first = 'abcdfghjqz';
  const second = 'abcdefgijkrxyz';
  expect(LCSLengths(first, second)[first.length][second.length]).toBe(8);
});
