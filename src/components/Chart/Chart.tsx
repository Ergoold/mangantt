import React, { memo, useMemo } from 'react';
import MangaBar from '../MangaBar/MangaBar';
import Manga from '../../types/Manga';
import './chart.css';

function Chart({ manga }: { manga: Manga[] }) {
  const mangaElements = useMemo(() => {
    return manga.map((manga) => (
      <MangaBar key={manga.id} manga={manga}></MangaBar>
    ));
  }, [manga]);

  return <div className="chart">{mangaElements}</div>;
}

export default memo(Chart);
