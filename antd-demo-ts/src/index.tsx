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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
createUser({
  email: 'vikalex11@mail.ru',
  password: 'secret1111',
});
loginUser({ email: 'vikalex11@mail.ru', password: 'secret1111' });
createUserWord({
  userId: '61fcc5d5b6bd2f0016faff91',
  wordId: '5e9f5ee35eb9e72bc21af716',
  word: {
    difficulty: 'weak',
    optional: { testFieldString: 'test', testFieldBoolean: true },
  },
});
