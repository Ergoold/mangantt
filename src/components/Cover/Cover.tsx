import { memo } from 'react';
import { CoverProps } from './types';
import './cover.css';

export const Cover = memo(({ manga }: CoverProps) => (
  <div key={manga.id} className="cover">
    <img
      className="cover-image"
      src={manga.image ?? undefined}
      alt={`${manga.name} Cover`}
    />
  </div>
));
