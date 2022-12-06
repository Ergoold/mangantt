import { getEarliest, getLatest } from './rangesUtils';
import { Range } from '../types';

export const sortRanges = (ranges: Range[]) => {
  const columns = toColumns(ranges);
  const rows = toRows(columns);

  return [...ranges].sort(compareRanges(rows, columns));
};

const toColumns = (ranges: Range[]) => {
  const earliest = getEarliest(ranges);
  const latest = getLatest(ranges);

  const columns = fill<Range[]>(() => [], earliest, latest);

  ranges.forEach((range) => columns[range.start ?? earliest].push(range));

  columns.forEach((column) => column.sort(compareLengths));

  return columns;
};

const fill = <Type>(factory: () => Type, from: number, to: number) => {
  const array: Type[] = [];

  for (let i = from; i < to; i++) {
    array[i] = factory();
  }

  return array;
};

const compareLengths = (a: Range, b: Range) => {
  const aLength = length(a);
  const bLength = length(b);

  if (aLength < bLength) return 1;
  if (bLength < aLength) return -1;

  return 0;
};

const length = (r: Range) =>
  (r.end ?? Number.MAX_SAFE_INTEGER) - (r.start ?? Number.MIN_SAFE_INTEGER);

const toRows = (columns: Range[][]) => {
  const rows: Range[][] = [];

  columns.forEach((column) => slot(column, rows));

  return rows;
};

const slot = (column: Range[], rows: Range[][]) => {
  let rowIndex = 0;

  column.forEach((range) => {
    for (; ; rowIndex++) {
      const row = rows[rowIndex];

      if (!row) {
        rows[rowIndex] = [range];
        break;
      } else if (endsBeforeStartOf(row, range)) {
        row.push(range);
        break;
      }
    }
  });
};

const endsBeforeStartOf = (row: Range[], range: Range) =>
  (row[row.length - 1].end ?? Infinity) < (range.start ?? -Infinity);

const compareRanges =
  (rows: Range[][], columns: Range[][]) => (a: Range, b: Range) => {
    const aRow = indexOfArrayIncluding(rows, a);
    const bRow = indexOfArrayIncluding(rows, b);

    if (aRow < bRow) return -1;
    if (bRow < aRow) return 1;

    const aColumn = indexOfArrayIncluding(columns, a);
    const bColumn = indexOfArrayIncluding(columns, b);

    if (aColumn < bColumn) return -1;
    if (bColumn < aColumn) return 1;

    return 0;
  };

const indexOfArrayIncluding = <Type>(arrays: Type[][], element: Type) =>
  arrays.findIndex((array) => array && array?.includes(element));
