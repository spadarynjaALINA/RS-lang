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
        <div className='text_book__card-game-tezis'>Перевод на скорость</div>
        <h2>Спринт</h2>
        <p>Как можно быстрее определи, верный перевод слова или нет</p>
      </div>
    </div>
  );
}
// export function TextBookGameCards2(props: StandardComponentProps) {
 
//   return (
//    <Link to='/Мини-игры'>
//     <div className='text_book__card-game' >
//         {/* <Navigate to='/Мини-игры'/>  */}
//       <img src={props.game} alt='card'></img>
//       <div className='text_book__card-game-text'>
//         <div className='text_book__card-game-tezis'>Аудирование</div>
//         <h2>Аудиовызов</h2>
//         <p>Прослушай слово и выбери правильный вариант ответа.</p>
//       </div>
//     </div></Link>
//   );
// }
export default TextBookGameCards;

