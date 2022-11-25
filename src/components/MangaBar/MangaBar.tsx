import React, { memo, useMemo } from 'react';
import Cover from '../Cover/Cover';
import Range from '../../types/Range';
import './manga-bar.css';

function MangaBar({ range }: { range: Range }) {
  const background = useMemo(
    () => range.manga[0].color ?? '#ffffff',
    [range.manga]
  );

  const covers = useMemo(
    () => range.manga.map((manga) => <Cover key={manga.id} manga={manga} />),
    [range.manga]
  );

  return (
    <div
      style={{
        background,
        gridColumnStart: (range.start ?? 2) - 1,
        gridColumnEnd: (range.end ?? 12 - 1) + 1 - 1,
      }}
      className={`${range.start ? 'round-start' : ''} ${
        range.end ? 'round-end' : ''
      }`}
    >
      <div>
        <div className="covers">{covers}</div>
        <div className="hover-covers round-start round-end">{covers}</div>
      </div>
    </div>
  );
}

export default memo(MangaBar);
