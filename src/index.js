import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import DrumMachine from './DrumMachine';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <DrumMachine />
  </React.StrictMode>
);
