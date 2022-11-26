import React, { memo, useMemo } from 'react';
import MangaBar from '../MangaBar/MangaBar';
import Manga from '../../types/Manga';
import sortRanges from '../../utils/sortRanges';
import toRanges from '../../utils/toRanges';
import './chart.css';

function Chart({ manga }: { manga: Manga[] }) {
  const mangaBars = useMemo(() => {
    const ranges = toRanges(manga);
    sortRanges(ranges);

    return ranges.map((range) => (
      <MangaBar key={range.manga[0].id} range={range}></MangaBar>
    ));
  }, [manga]);

  return <div className="chart">{mangaBars}</div>;
}

export default memo(Chart);
