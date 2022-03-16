import React from 'react';
import { Link } from 'react-router-dom';

export interface StandardComponentProps {
  game: any;
}
export function TextBookGameCards2(props: StandardComponentProps) {
  return (
   
    <div className="text_book__card-game">
     
      <img src={props.game} alt="card" />
      <div className="text_book__card-game-text">
        <div className=' text_book__card-game-title'>
          <h2>Аудиовызов</h2><span className="text_book__card-game-tezis2">Аудирование</span></div>
        <p>Прослушай слово и выбери правильный вариант ответа.</p>
      </div>
    </div>

    
  );
}
