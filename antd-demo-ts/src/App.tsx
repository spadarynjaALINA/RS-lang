
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Games from './pages/games/Games';
import AppTextBook from './pages/TextBook';
import SprintGame from './pages/GameSprint';
import './App.css';
import Header from './pages/Header/Header';
import StartPage from './pages/Start-page/Start-page';
import Footer from './pages/Footer/Footer';
import AudioCallGame from './pages/games/audiocall/AudioCallGame/AudioCallGame';

// import TextBookHeader from './pages/TextBook/components/header';
function TextBook(props: any) {
  return (
    <div className="TextBookWrap">

      <AppTextBook accessToken={props.accessToken} />
    </div>
  );
}

function Statistic() {
  return <div className="StatisticWrap"> тут будет статистика</div>;
}
function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  let footer = true;
  return (
    <Router>

      <div className="App">

        <Header onLogin={setAccessToken} accessToken={accessToken} />
        <main className="App-main">
          <Switch>
            <Route path="/Учебник">
              <TextBook accessToken={accessToken} />
              {footer = true}
            </Route>
            <Route path='/Мини-игры/Аудиовызов'>
              <AudioCallGame></AudioCallGame>
              {footer = false}
            </Route>
            <Route path='/Мини-игры/Спринт'>
              {footer = false}
              <SprintGame />
              {footer = true}
            </Route>
            <Route path='/Мини-игры'>
              <Games></Games>
              {footer = true}
            </Route>              
            <Route path='/Статистика'>

 
              <Statistic />
              {footer = true}
            </Route>

            <Route path='/'>
              <StartPage />  
              {footer = true}
            </Route>
          </Switch>          
        </main>
        {footer ? <Footer></Footer> : <></>} 

      </div>
    </Router>
  );
}

export default App;
