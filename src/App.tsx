import React, { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Gantt, NotFound } from './components';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:username" element={<Gantt />} />
          <Route path="/" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default memo(App);
