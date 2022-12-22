import { memo, useMemo } from 'react';
import { MangaBarProps } from './types';
import { Cover } from '..';
import './manga-bar.css';

export const MangaBar = memo(({ range, earliest, latest }: MangaBarProps) => {
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

  const style = useMemo(
    () => ({
      background: range.manga[0].color ?? '#ffffff',
      gridColumnStart: bounds.start - earliest,
      gridColumnEnd: bounds.end - earliest,
    }),
    [range.manga, bounds, earliest]
  );

  const className = useMemo(
    () => `${range.start ? 'round-start' : ''} ${range.end ? 'round-end' : ''}`,
    [range.start, range.end]
  );

  return (
    <div style={style} className={className}>
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
});
