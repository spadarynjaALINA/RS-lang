import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { loginUser } from './services/APIService';
import { createUser } from './services/APIService';
import { createHardUserWord } from './services/APIService';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
