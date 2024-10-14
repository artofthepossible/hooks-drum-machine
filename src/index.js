/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DrumMachine from './DrumMachine';

ReactDOM.createRoot(document.getElementById('root')).render(<DrumMachine />);
*/
// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
//import App from './App';
import DrumMachine from './DrumMachine';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<DrumMachine />);
