import { FuzzyDate } from '../types';

export const getNumberOfMonths = ({ year, month }: FuzzyDate) =>
  year && month && year * 12 + month;
