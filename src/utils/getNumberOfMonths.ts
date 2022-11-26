import { FuzzyDate } from '../types';

export const getNumberOfMonths = (date: FuzzyDate) =>
  date.year && date.month && date.year * 12 + date.month;
