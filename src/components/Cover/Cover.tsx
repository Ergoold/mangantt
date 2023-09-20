import { memo } from 'react';
import { CoverProps } from './types';
import './cover.css';

export const Cover = memo(({ manga: { name, image } }: CoverProps) => (
  <div className="cover">
    <img
      className="cover-image"
      src={image ?? undefined}
      alt={`${name} Cover`}
    />
  </div>
));
