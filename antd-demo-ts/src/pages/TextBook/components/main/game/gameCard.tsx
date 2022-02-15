export interface StandardComponentProps {
  game: any;
}
export function TextBookGameCards(props: StandardComponentProps) {
  return (
    <div className='text_book__card-game'>
      <img src={props.game} alt='card'></img>
      <div className='text_book__card-game-text'>
        <div className='text_book__card-game-tezis'>Функционал игры</div>
        <h2>Название игры</h2>
        <p>Сделай то, что требует от тебя игра.</p>
      </div>
    </div>
  );
}
export function TextBookGameCards2(props: StandardComponentProps) {
  return (
    <div className='text_book__card-game'>
      <img src={props.game} alt='card'></img>
      <div className='text_book__card-game-text'>
        <div className='text_book__card-game-tezis'>Аудирование</div>
        <h2>Аудиовызов</h2>
        <p>Прослушай слово и выбери правильный вариант ответа.</p>
      </div>
    </div>
  );
}
export default TextBookGameCards;

