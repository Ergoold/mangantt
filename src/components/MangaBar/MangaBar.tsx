import React, { memo, useMemo } from 'react';
import { MangaBarProps } from './types';
import { Cover } from '..';
import './manga-bar.css';

function MangaBar({ range, earliest, latest }: MangaBarProps) {
  const background = useMemo(
    () => range.manga[0].color ?? '#ffffff',
    [range.manga]
  );

  const bounds = useMemo(
    () => ({
      start: range.start ?? earliest + 1,
      end: (range.end ?? latest - 1) + 1,
    }),
    [range.start, earliest, range.end, latest]
  );

  const covers = useMemo(() => {
    const allCovers = range.manga.map((manga) => (
      <Cover key={manga.id} manga={manga} />
    ));

    const shownCovers = bounds.end - bounds.start;

    return {
      shown: allCovers.slice(0, shownCovers),
      hover: allCovers.slice(shownCovers),
    };
  }, [range.manga, bounds]);

  return (
    <div
      style={{
        background,
        gridColumnStart: bounds.start - earliest,
        gridColumnEnd: bounds.end - earliest,
      }}
      className={`${range.start ? 'round-start' : ''} ${
        range.end ? 'round-end' : ''
      }`}
    >
      <div>
        <div className="covers">{covers.shown}</div>
        {covers.hover.length > 0 && (
          <div className="hover-covers round-start round-end">
            {covers.hover}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MangaBar);
