import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { loginUser } from './services/APIService';
import { createUser } from './services/APIService';
import { createUserWord } from './services/APIService';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
// createUser({ "email": "alalalsls@mail.ru", "password": "secret2222" }).then(data=>loginUser(data))
//loginUser({ email: 'alina@mail.ru', password: 'secret2222' });
