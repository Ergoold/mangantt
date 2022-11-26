import { Range } from '../types';

export const getEarliest = (ranges: Range[]) =>
  Math.min(...ranges.map((range) => range.start ?? Infinity)) - 1;

export const getLatest = (ranges: Range[]) =>
  Math.max(...ranges.map((range) => range.end ?? -Infinity)) + 1;
