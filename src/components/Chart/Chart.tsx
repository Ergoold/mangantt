import { memo, useMemo } from 'react';
import { ChartProps } from './types';
import { MangaBar } from '..';
import { getBounds, sortRanges, toRanges } from '../../utils';
import './chart.css';

export const Chart = memo(({ manga }: ChartProps) => {
  const mangaBars = useMemo(() => {
    const ranges = toRanges(manga);
    const { earliest, latest } = getBounds(ranges);

    return sortRanges(ranges).map((range) => (
      <MangaBar
        key={range.manga[0].id}
        range={range}
        earliest={earliest}
        latest={latest}
      />
    ));
  }, [manga]);

  return <div className="chart">{mangaBars}</div>;
});
