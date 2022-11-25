import React, { memo, useMemo } from 'react';
import MangaBar from '../MangaBar/MangaBar';
import Manga from '../../types/Manga';
import Range from '../../types/Range';
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

    const earliest =
      Math.min(...rangesArray.map((range) => range.start ?? Number.MAX_VALUE)) -
      1;
    const latest =
      Math.max(...rangesArray.map((range) => range.end ?? Number.MIN_VALUE)) +
      1;
    const buckets: Range[][] = [];
    for (let i = earliest; i < latest; i++) {
      buckets[i] = [];
    }
    rangesArray.forEach((range) => {
      if (!range.start) {
        buckets[earliest].push(range);
      } else {
        buckets[range.start].push(range);
      }
    });

    return Array.from(rangesArray.values()).map((range) => (
      <MangaBar key={range.manga[0].id} range={range}></MangaBar>
    ));
  }, [manga]);

  return <div className="chart">{mangaElements}</div>;
}

export default memo(Chart);
