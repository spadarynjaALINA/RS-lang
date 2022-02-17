import './game-start-page.css';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { LevelButton } from './levelButton';

function StartPageGameSprint(props: any) {
  const [startDisable, setStartDisable] = useState(true);
  const [startPage, setStartPage] = useState(false);

  useEffect(() => {
    setStartPage(Boolean(localStorage.getItem('textbook')));
    if (startPage === true) {
      setStartDisable(false);
    }

  }, [startPage]);

  return (
    <div className='game-container'>
      <div className='game-text-container'>
        <p className='game-title'>Спринт</p>
        <p className='game-rules'>Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.</p>
      </div>
      {!startPage ?
        <div className='game-level-selector'>
          <LevelButton
            group='0'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='A1'
          />
          <LevelButton
            group='1'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='A2'
          />
          <LevelButton
            group='2'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='B1'
          />
          <LevelButton
            group='3'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='B2'
          />
          <LevelButton
            group='4'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='C1'
          />
          <LevelButton
            group='5'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='C2'
          />
        </div> : <div className='game-level-selector'>
          <p className='game-rules'> Игра запуститься со словами с текущей страницы, затем добавяться слова с предыдущих страниц. </p>
        </div>}
      <Button type='primary' shape='round' className='game-start-button'
        disabled={startDisable} onClick={() => {
          props.onClick1(false);
          props.onClick3(true);
        }
        }>Начать</Button>
    </div>
  );
}

export default StartPageGameSprint;