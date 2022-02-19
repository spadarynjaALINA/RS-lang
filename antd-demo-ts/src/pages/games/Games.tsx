
import React, { useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import './Games.css';
import TextBookGameCards from './../TextBook/components/main/game/gameCard';
import { TextBookGameCards2 } from './../TextBook/components/main/game/gameCard2';
import game3 from './../../img/game3-1.jpeg';
import game1 from './../../img/game1-1.jpeg';
import AudioCall from './audiocall/StartPageAudioCall/StartPageAudioCall';

export default function Games() {
  const match = useRouteMatch();
  useEffect(() => {
    localStorage.setItem('textbook', '');
  }, []);
  return ( 
    <div className="games-wrap">
      <div className="games-item-wrap"> <Link to={`${match.url}/sprint`}>
        <TextBookGameCards game={game1}></TextBookGameCards>
      </Link></div>
      <div className="games-item-wrap"> <Link to={`${match.url}/audiocall`}>
        <TextBookGameCards2 game={game3}></TextBookGameCards2>
      </Link></div>
    </div>  
  );

}