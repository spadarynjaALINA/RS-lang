import React from 'react';

import './App.css';
import AppTextBook from './pages/TextBook';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './pages/Header/Header';
import StartPage from './pages/Start-page/Start-page';
import Footer  from './pages/Footer/Footer';
function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='App-main'>
          <Switch>

            <Route path='/Учебник'>
              <TextBook />
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

export default App;
function TextBook() {
  return (
    <div className='TextBookWrap'>
      <AppTextBook></AppTextBook>
    </div>
  );
}
function Games() {
  return <div className='GamesWrap'> тут будут игры</div>;
}
function Statistic() {
  return <div className='StatisticWrap'> тут будет статистика</div>;
}
