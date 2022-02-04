import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authorization from './pages/Header/Authorization/Authorization';
import Main from './pages/Main';
import Header from './pages/Header/Header';

function App() {
  return (
    <div className="App App-main">
      <Header/>
      <header className="App-header">
        <div className="App-link"><p >
          Our app will be here soon
        </p><img src={logo} className="App-logo" alt="logo" />
          <Main/>
       
         
        </div>
       
      
      </header>
    </div>
  );
}

export default App;
