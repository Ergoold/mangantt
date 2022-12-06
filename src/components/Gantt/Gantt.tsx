import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Chart, NotFound } from '..';
import { Loading } from '../../assets';
import { useManga } from '../../hooks';
import './gantt.css';

const Gantt = () => {
  const { username } = useParams();

  const result = useManga(username!);

  return result.status === 'success' ? (
    <div className="gantt">
      <Chart manga={result.result} />
    </div>
  ) : result.status === 'loading' ? (
    <Loading />
  ) : (
    <NotFound />
  );
};

export default memo(Gantt);
