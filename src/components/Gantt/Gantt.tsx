import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../Chart/Chart';
import useManga from '../../hooks/useManga';
import './gantt.css';

function Gantt() {
  const { username } = useParams();

  const { manga } = useManga(username!);

  return (
    <div className="gantt">
      <Chart manga={manga}></Chart>
    </div>
  );
}

export default memo(Gantt);
