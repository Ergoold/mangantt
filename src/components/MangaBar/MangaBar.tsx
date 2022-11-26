import React, { memo, useMemo } from 'react';
import { Cover } from '..';
import { Range } from '../../types';
import './manga-bar.css';

const earliest = 2;
const latest = 12;

function MangaBar({ range }: { range: Range }) {
  const background = useMemo(
    () => range.manga[0].color ?? '#ffffff',
    [range.manga]
  );

  const bounds = useMemo(
    () => ({
      start: range.start ?? earliest,
      end: (range.end ?? latest - 1) + 1,
    }),
    [range.start, range.end]
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
        gridColumnStart: bounds.start - earliest + 1,
        gridColumnEnd: bounds.end - earliest + 1,
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
