import { memo, useMemo } from 'react';
import { ChartProps } from './types';
import { MangaBar } from '..';
import { getEarliest, getLatest, sortRanges, toRanges } from '../../utils';
import './chart.css';

const Chart = ({ manga }: ChartProps) => {
  const mangaBars = useMemo(() => {
    const ranges = toRanges(manga);
    const earliest = getEarliest(ranges);
    const latest = getLatest(ranges);

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
};

export default memo(Chart);
