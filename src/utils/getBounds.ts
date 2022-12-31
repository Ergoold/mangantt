import { Range } from '../types';

export const getBounds = (ranges: Range[]) => ({
  earliest: Math.min(...ranges.map(({ start }) => start ?? Infinity)) - 1,
  latest: Math.max(...ranges.map(({ end }) => end ?? -Infinity)) + 1,
});
