import React, { memo } from 'react';
import Manga from '../../types/Manga';
import './cover.css';

function Cover({ manga }: { manga: Manga }) {
  return (
    <div key={manga.id} className="cover">
      <img
        className="cover-image"
        src={manga.image}
        alt={`${manga.name} Cover`}
      />
    </div>
  );
}

export default memo(Cover);
