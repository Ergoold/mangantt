import { FuzzyDate } from '../types';

const getNumberOfMonths = (date: FuzzyDate) =>
  date.year && date.month && date.year * 12 + date.month;

export default getNumberOfMonths;
