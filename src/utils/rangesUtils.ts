import { Range } from '../types';

const getEarliest = (ranges: Range[]) =>
  Math.min(...ranges.map((range) => range.start ?? Infinity)) - 1;

const getLatest = (ranges: Range[]) =>
  Math.max(...ranges.map((range) => range.end ?? -Infinity)) + 1;

export { getEarliest, getLatest };
