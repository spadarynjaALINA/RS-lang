import './game-card.css';

import game1 from './../../../../../img/game1-1.jpeg';
import game3 from './../../../../../img/game3-2.jpeg';
import TextBookGameCards from './gameCard';
import {TextBookGameCards2} from './gameCard2'
import { Navigate } from 'react-router';

import game1 from './../../../../../img/game1.jpeg';
import game3 from './../../../../../img/game3.jpeg';

import TextBookGameCards,{TextBookGameCards2} from './gameCard';


export function TextBookGameArea() {
  return (
    <div className='text_book__game_wrapper'>
      <a className='text_book__game-link' href='/Мини-игры'>
        <TextBookGameCards game={game1} />
      </a>
      
        <TextBookGameCards2 game={game3} />
      
    </div>
  );
}

export default TextBookGameArea;
