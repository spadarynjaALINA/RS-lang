import './game-card.css';
import game1 from './../../../../../img/game1.jpeg';
import game3 from './../../../../../img/game3.jpeg';
import TextBookGameCards from './gameCard';
import { Redirect } from 'react-router-dom';

export function TextBookGameArea() {
  return (
    <div className='text_book__game_wrapper'>
      <a className='text_book__game-link' href='/Мини-игры'>
        <TextBookGameCards game={game1} />
      </a>
      <a className='text_book__game-link' href='#'>
        <TextBookGameCards game={game3} />
      </a>
    </div>
  );
}

export default TextBookGameArea;
