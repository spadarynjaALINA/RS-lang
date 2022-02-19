import './game-card.css';

import game1 from './../../../../../img/game1-1.jpeg';
import game3 from './../../../../../img/game3-2.jpeg';
import TextBookGameCards from './gameCard';
import { TextBookGameCards2 } from './gameCard2';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';



export function TextBookGameArea() {
  return (
    <div className='text_book__game_wrapper'>
      {/* <a className='text_book__game-link' href='/Мини-игры/Спринт'>  </a> */}
      <Link to={'games/sprint'}><TextBookGameCards game={game1} /></Link> 
    
         
      <Link to={'games/audiocall'}><TextBookGameCards2 game={game3} /></Link>
      
    </div>
  );
}

export default TextBookGameArea;
