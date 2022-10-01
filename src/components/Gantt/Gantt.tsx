import React, { memo, useState } from 'react';
import Chart from '../Chart/Chart';
import Input from '../Input/Input';
import Lists from '../Lists/Lists';
import useManga from '../../hooks/useManga';
import './gantt.css';

function Gantt() {
  const [userName, setUserName] = useState('');
  const { lists, manga } = useManga(userName);

  return (
    <div className="gantt">
      <Chart manga={manga}></Chart>
      <Input value={userName} onChange={setUserName}></Input>
      <Lists lists={lists}></Lists>
    </div>
  );
}

export default memo(Gantt);
