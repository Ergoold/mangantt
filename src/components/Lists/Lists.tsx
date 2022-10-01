import React, { memo, useMemo } from 'react';
import './lists.css';

function Lists({ lists }: { lists: string[] }) {
  const listElements = useMemo(
    () =>
      lists.map((name) => (
        <div key={name} className="list">
          {name}
        </div>
      )),
    [lists]
  );

  return <div className="lists">{listElements}</div>;
}

export default memo(Lists);
