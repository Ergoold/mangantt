import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Chart, NotFound } from '..';
import { useManga } from '../../hooks';
import './gantt.css';

function Gantt() {
  const { username } = useParams();

  const result = useManga(username!);

  return result.status === 'success' ? (
    <div className="gantt">
      <Chart manga={result.result} />
    </div>
  ) : (
    <NotFound />
  );
}

export default memo(Gantt);
