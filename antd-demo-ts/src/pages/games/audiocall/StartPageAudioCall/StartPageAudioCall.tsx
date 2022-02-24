import React, { useEffect, useState } from 'react';
import './StartPageAudioCall.css';
import { Button } from 'antd';
import { LevelButton } from '../LevelButton/LevelButton';
import { getWords } from '../../../../handlers';
import { getFullUserWords } from '../../../../services/APIService';
import { Word } from '../../../GameSprint/components/main/GameField';

export default function StartPageAudioCall(props: any) {
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
      (getWords(+(group), +(page)))
        .then(async (data) => {
          const easyWords = await getFullUserWords(localStorage.getItem('userId'));
          let dataFiltered: Word[] = data.filter((word: Word) => !easyWords.includes(word.id));
          while (dataFiltered.length < 5 && +(page as string) > 1) {
            page = (+(page as string) - 1).toString();
            const prevPageWords = await getWords(+(group), +(page));
            const prevFiltered = prevPageWords.filter((word: Word) => !easyWords.includes(word.id));
            dataFiltered = [...dataFiltered, ...prevFiltered];
            // console.log('доступные слова', dataFiltered);
          }
          if (dataFiltered.length < 5) {
            setNotEnough(true);
          }
        });
    }
    
  }, []);

  
  return (
    <div className="audioCall-wrap">
      <h2  className="audioCall-wrap-title">Аудиовызов</h2>
      <p  className="audioCall-wrap-p">С помощью этой игры ты сможешь лучше понимать английскую речь на слух.</p>
     
      {!startPage ? <>
        <p className='start-from-menu'>Выбери уровень:</p>
        <div className="level-wrap">
          <LevelButton
            group='0'
            onClick1={props.onClick2}
            onClick2={setStartDisable}
            text='A1' />
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
          {/* //      </div></> : <div className='start-from-textbook'>В игре будут использоваться слова со страницы учебника</div>}
  //    <Button type='primary' className="game-btn" disabled={startDisable} onClick={() => {  */}

        </div></>
        : notEnough ? <div className='start-from-textbook'>На этой и предыдущих страницах недостаточно слов для игры</div>
          : <div className='start-from-textbook'>В игре будут использоваться слова со страницы учебника</div>}
      <Button type='primary' className="start-btn" disabled={startDisable || notEnough} onClick={() => {

       
        props.onClick1(false);
        props.onClick3(true);
      }}>Начать</Button>
    </div>
  
  );
}