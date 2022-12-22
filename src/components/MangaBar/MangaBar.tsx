import { memo, useMemo } from 'react';
import { MangaBarProps } from './types';
import { Cover } from '..';
import './manga-bar.css';

export const MangaBar = memo(
  ({ range: { start, end, manga }, earliest, latest }: MangaBarProps) => {
    const bounds = useMemo(
      () => ({
        start: start ?? earliest + 1,
        end: (end ?? latest - 1) + 1,
      }),
      [start, earliest, end, latest]
    );

    const { shown, hover } = useMemo(() => {
      const allCovers = manga.map((manga) => (
        <Cover key={manga.id} manga={manga} />
      ));

      const shownCovers = bounds.end - bounds.start;

      return {
        shown: allCovers.slice(0, shownCovers),
        hover: allCovers.slice(shownCovers),
      };
    }, [manga, bounds]);

    const style = useMemo(
      () => ({
        background: manga[0].color ?? '#ffffff',
        gridColumnStart: bounds.start - earliest,
        gridColumnEnd: bounds.end - earliest,
      }),
      [manga, bounds, earliest]
    );

    const className = useMemo(
      () => `${start ? 'round-start' : ''} ${end ? 'round-end' : ''}`,
      [start, end]
    );

    return (
      <div style={style} className={className}>
        <div>
          <div className="covers">{shown}</div>
          {hover.length > 0 && (
            <div className="hover covers round-start round-end">{hover}</div>
          )}
        </div>
      </div>
    );
  }
);
