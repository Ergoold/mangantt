import React, { memo, useMemo } from 'react';
import { MangaBar } from '..';
import { Manga } from '../../types';
import { sortRanges, toRanges } from '../../utils';
import { getEarliest, getLatest } from '../../utils';
import './chart.css';

function Chart({ manga }: { manga: Manga[] }) {
  const mangaBars = useMemo(() => {
    const ranges = toRanges(manga);
    const earliest = getEarliest(ranges);
    const latest = getLatest(ranges);

    sortRanges(ranges);

    return ranges.map((range) => (
      <MangaBar
        key={range.manga[0].id}
        range={range}
        earliest={earliest}
        latest={latest}
      />
    ));
  }, [manga]);

  return <div className="chart">{mangaBars}</div>;
}

export default memo(Chart);
