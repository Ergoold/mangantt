import { memo } from 'react';
import { MangaBarProps } from './types';
import { Cover } from '..';
import './manga-bar.css';

export const MangaBar = memo(
  ({ range: { start, end, manga }, earliest, latest }: MangaBarProps) => {
    const barStart = start ?? earliest + 1;
    const barEnd = (end ?? latest - 1) + 1;
    const barSize = barEnd - barStart;

    const mangaCount = manga.length;
    const largeCoverCount = mangaCount > barSize ? barSize - 1 : mangaCount;

    const covers = manga.map((manga, i) => (
      <Cover key={manga.id} manga={manga} />
    ));

    const largeCovers = covers.slice(0, largeCoverCount);
    const smallCovers = covers.slice(largeCoverCount);

    const style = {
      background: manga[0].color ?? '#ffffff',
      gridColumnStart: barStart - earliest,
      gridColumnEnd: barEnd - earliest,
    };

    const className = `${start ? 'round-start' : ''} ${end ? 'round-end' : ''}`;

    return (
      <div style={style} className={className}>
        <div>
          {largeCovers.length > 0 && (
            <div className="covers">{largeCovers}</div>
          )}
          {smallCovers.length > 0 && (
            <div className="covers small-covers">{smallCovers}</div>
          )}
        </div>
      </div>
    );
  }
);
