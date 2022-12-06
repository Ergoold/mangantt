import { memo } from 'react';
import { CoverProps } from './types';
import './cover.css';

const Cover = ({ manga }: CoverProps) => (
  <div key={manga.id} className="cover">
    <img
      className="cover-image"
      src={manga.image}
      alt={`${manga.name} Cover`}
    />
  </div>
);

export default memo(Cover);
