import React, { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gantt from './components/Gantt/Gantt';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:username" element={<Gantt />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default memo(App);
