import React, { useState } from 'react';

import './App.css';
import AppTextBook from './pages/TextBook';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './pages/Header/Header';
import StartPage from './pages/Start-page/Start-page';

import Footer  from './pages/Footer/Footer';

import TextBookHeader from './pages/TextBook/components/header';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div className='App'>
        {/*accessToken && <h1>WE ARE AUTH!!!!!!!!!</h1>*/}

        <Header onLogin={setAccessToken} accessToken={accessToken} />
        <main className='App-main'>
          <Switch>
            <Route path='/Учебник'>
              <TextBook accessToken={accessToken} />
            </Route>
            <Route path='/Мини-игры'>
              <Games />
            </Route>
            <Route path='/Статистика'>
              <Statistic />
            </Route>
            <Route path='/'>
              <StartPage />
             
            </Route>

          </Switch>
          
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

function TextBook(props: any) {
  return (
    <div className='TextBookWrap'>
      <AppTextBook accessToken={props.accessToken}></AppTextBook>
    </div>
  );
}
function Games() {
  return <div className='GamesWrap'> тут будут игры</div>;
}
function Statistic() {
  return <div className='StatisticWrap'> тут будет статистика</div>;
}
export default App;
