import './game-start-page.css';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { LevelButton } from './levelButton';
import { getWords } from '../../../../handlers';
import { getFullUserWords } from '../../../../services/APIService';
import { Word } from './GameField';

function StartPageGameSprint(props: any) {
  const [startDisable, setStartDisable] = useState(true);
  const [startPage, setStartPage] = useState(false);
  const [notEnough, setNotEnough] = useState(false);

  useEffect(() => {
    setStartPage(Boolean(localStorage.getItem('textbook')));
    if (startPage === true) {
      setStartDisable(false);
    }
  }, [startPage]);

  useEffect(() => {
    if (localStorage.getItem('textbook')) {
      let page = localStorage.getItem('page');
      if (!page) throw new Error('');
      const group = localStorage.getItem('group');
      if (!group) throw new Error('');
      getWords(+group, +page).then(async (data) => {
        const easyWords = await getFullUserWords(
          localStorage.getItem('userId'),
        );
        let dataFiltered: Word[] = data.filter(
          (word: Word) => !easyWords.includes(word.id),
        );
        while (dataFiltered.length < 10 && +(page as string) > 1) {
          page = (+(page as string) - 1).toString();
          const prevPageWords = await getWords(+group, +page);
          const prevFiltered = prevPageWords.filter(
            (word: Word) => !easyWords.includes(word.id),
          );
          dataFiltered = [...dataFiltered, ...prevFiltered];
          // console.log('доступные слова', dataFiltered);
        }
        if (dataFiltered.length < 10) {
          setNotEnough(true);
        }
      });
    }
  }, []);

  return (
    <div className='game-container'>
      <div className='game-text-container'>
        <p className='game-title'>Спринт</p>
        <p className='game-rules'>
          Спринт - тренировка на скорость. Попробуй угадать как можно больше
          слов за 30 секунд.
        </p>
      </div>
      {!startPage ? (
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
        </div>
      ) : notEnough ? (
        <div className='game-level-selector'>
          <p className='game-rules'>
            {' '}
            На этой и предыдущих страницах не достаточно слов для игры.{' '}
          </p>
        </div>
      ) : (
        <div className='game-level-selector'>
          <p className='game-rules'>
            {' '}
            Игра запуститься со словами с текущей страницы, затем добавяться
            слова с предыдущих страниц.{' '}
          </p>
        </div>
      )}
      <Button
        type='primary'
        shape='round'
        id='startBtn'
        className='game-start-button'
        disabled={startDisable || notEnough}
        onClick={() => {
          props.onClick1(false);
          props.onClick3(true);
        }}
      >
        Начать
      </Button>
    </div>
  );
}

export default StartPageGameSprint;
