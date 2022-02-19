
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
  console.log(location.href);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  
  return (
    <Router>
      <div className="App">
        <Header onLogin={setAccessToken} accessToken={accessToken} />
        <main className="App-main">
          <Switch>
            <Route path="/Учебник">
              <TextBook accessToken={accessToken} />
              
            </Route>
            <Route path='/Мини-игры/Аудиовызов'>
              <AudioCallGame></AudioCallGame>
             
            </Route>
            <Route path='/Мини-игры/Спринт'>
             
              <SprintGame />
             
            </Route>
            <Route path='/Мини-игры'>
              <Games></Games>
             
            </Route>              
            <Route path='/Статистика'>

 
              <Statistic />
              
            </Route>

            <Route path='/'>
              <StartPage />  
              
            </Route>
          </Switch>          
        </main>
        {location.href} <Footer></Footer>

      </div>
    </Router>
  );
}

export default App;
