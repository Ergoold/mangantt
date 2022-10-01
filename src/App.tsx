import React, { memo } from 'react';
import Gantt from './components/Gantt/Gantt';
import './app.css';

function App() {
  return (
    <div className="app">
      <Gantt></Gantt>
    </div>
  );
}

export default memo(App);
