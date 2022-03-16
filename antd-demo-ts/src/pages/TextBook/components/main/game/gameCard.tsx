import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export interface StandardComponentProps {
  game: any;
}
export function TextBookGameCards(props: StandardComponentProps) {
  return (
    
    <div className='text_book__card-game'>
      <img src={props.game} alt='card'></img>
      <div className='text_book__card-game-text'>
        
        <div className=' text_book__card-game-title'><h2>Спринт</h2><span className='text_book__card-game-tezis'>Перевод на скорость</span></div> 
        <p>Как можно быстрее определи, верный перевод слова или нет</p>
      </div>
    </div>
  );
}

export default TextBookGameCards;

