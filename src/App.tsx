import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Gantt, NotFound } from './components';
import './app.css';

export const App = memo(() => (
  <div className="app">
    <Routes>
      <Route path="/:username" element={<Gantt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
));
