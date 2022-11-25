import React, { memo, useMemo } from 'react';
import MangaBar from '../MangaBar/MangaBar';
import Manga from '../../types/Manga';
import Range from '../../types/Range';
import sortRanges from '../../utils/sortRanges';
import './chart.css';

function Chart({ manga }: { manga: Manga[] }) {
  const mangaElements = useMemo(() => {
    const ranges = new Map<string, Range>();
    manga.forEach(
      (manga) => {
        const key = JSON.stringify([manga.start, manga.end]);
        const mangaInRange = ranges.get(key);
        if (mangaInRange) {
          mangaInRange.manga.push(manga);
        } else {
          ranges.set(key, {
            start: manga.start,
            end: manga.end,
            manga: [manga],
          });
        }
      },
      [manga]
    );

    const rangesArray = Array.from(ranges.values());
    sortRanges(rangesArray);

    return rangesArray.map((range) => (
      <MangaBar key={range.manga[0].id} range={range}></MangaBar>
    ));
  }, [manga]);

  return <div className="chart">{mangaElements}</div>;
}

export default memo(Chart);
