
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Games from './pages/games/Games';
import AppTextBook from './pages/TextBook';
import SprintGame from './pages/GameSprint';
import './App.css';
import Header from './pages/Header/Header';
import StartPage from './pages/Start-page/Start-page';
import Footer from './pages/Footer/Footer';
import AudioCallGame from './pages/games/audiocall/AudioCallGame/AudioCallGame';
import { Team } from './pages/Team/Team';
import { About } from './pages/About/About';
import { Statistic } from './pages/Statistic/Statistic';
import { StatisticStart } from './pages/Statistic/StatisticStart';


function TextBook(props: any) {
  
  return (
    <div className="TextBookWrap">

      <AppTextBook accessToken={props.accessToken} />
    </div>
  );
}



function App() {
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  // useEffect(() => {
  //   setAccessToken(localStorage.getItem('token'));
  // }, [localStorage.getItem('token')]);
  
  return (
    <Router>
      <div className="App">
        <Header onLogin={setAccessToken} accessToken={accessToken} />
        <main className="App-main">
          <Switch>
            <Route path="/textbook">
              <TextBook accessToken={accessToken} />
              
            </Route>
            <Route path='/games/audiocall'>
              <AudioCallGame></AudioCallGame>
             
            </Route>
            <Route path='/games/sprint'>
             
              <SprintGame />
             
            </Route>
            <Route path='/games'>
              <Games></Games>
             
            </Route>              
            <Route path='/statistic'> 
              {accessToken ? <Statistic /> : <StatisticStart />    }      
              
            </Route>
            <Route path='/about'> 
              <About />            
              
            </Route>
            <Route path='/team'> 
              <Team />
              
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
