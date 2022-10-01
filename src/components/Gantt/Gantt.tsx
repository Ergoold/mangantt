import React, { memo } from 'react';
import Chart from '../Chart/Chart';
import Input from '../Input/Input';
import Lists from '../Lists/Lists';
import useManga from '../../hooks/useManga';
import './gantt.css';

function Gantt() {
  const { lists, manga } = useManga();

  return (
    <div className="gantt">
      <Chart manga={manga}></Chart>
      <Input></Input>
      <Lists lists={lists}></Lists>
    </div>
  );
}

export default memo(Gantt);
