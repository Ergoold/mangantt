import React, { memo } from 'react';
import Manga from '../../types/Manga';
import './manga-bar.css';

function MangaBar({ manga }: { manga: Manga }) {
  return (
    <div
      style={{
        background: manga.color ?? '#ffffff',
        gridColumnStart: (manga.start ?? 2) - 1,
        gridColumnEnd: (manga.end ?? 10) + 1 - 1,
      }}
      className={`${manga.start ? 'round-start' : ''} ${
        manga.end ? 'round-end' : ''
      }`}
    ></div>
  );
}

export default memo(MangaBar);
