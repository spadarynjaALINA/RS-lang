/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { JsxElement } from 'typescript';
import { getWords } from '../../../../handlers';
import { LevelButton } from '../LevelButton/LevelButton';
import { QuestionButton } from '../QuestionBtn/QuestionBtn';
import { getRandomNum } from './../Random';
import './QuestionPageAudioCall.css';
interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
}

export function QuestionsPageAudioCall(props: { group: number, isActive: boolean }) {
 
  const [words, setWords] = useState([] as Word[]);
  const [showWord, setShowWord] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countQuestions, setCountQuestions] = useState(0);
  const limitQuestions = 10;
  const [startCount, setStartCount] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [btnWords, setBtnWords] = useState([] as number[]);
  const [getSort, setSort] = useState(true);  
  const [wronArr, setWronArr] = useState([] as number[]);
  const [rightArr, setRightArr] = useState([] as number[]);
  const audio: HTMLAudioElement = new Audio(); 
 
  const orderWords = useMemo(() => {   
    let arr = [0, 1, 2, 3, 4];
    arr = arr.sort(() => Math.random() - .5).map(item => item + startCount);
    return arr;
  }, [getSort]);  
  

  useEffect(() => {      
    const func = async () => {
      const arr = [];    
      for (let i = 1; i <= 30; i++) {
        arr.push(getWords(props.group, i));
      }
      const res = await Promise.all(arr);
      setWords(res.flat().sort(() => Math.random() - .5));
    };
    func();
  }, []); 
 
  function getButtons() {
    console.log(words[startCount]); 
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => {   
        
        return  (<QuestionButton isTrue={words[orderWords[index]]?.wordTranslate === words[startCount].wordTranslate} key={`question${index}`} text={ `${index + 1} ${words[orderWords[index]]?.wordTranslate}` } onClick={()=>{setShowWord(true);}}></QuestionButton>);
      }) : null}
    </div>);     
  }

  function playAudio(word: number) {  
    
    if (!audio.paused) {
      audio.pause();
      return;
    } 
    if (words.length) audio.src = `https://rs-lang-app-rss.herokuapp.com/${words[word].audio
    }`;
   
    audio.play();
  }
  useEffect(() => {
    if (countQuestions !== limitQuestions)  playAudio(startCount);  
  }, [words.length, getSort]);
 
  // function nextQuestion() {    
  //   if (countQuestions === 9) setWords([]);   
  // }
  
  return (
    <div  className = 'audioCall-wrap' >      
      {!showModal && <div className='audio-wrap'>
        <i className='fas fa-volume-up volume-audiocall' onClick={() => { playAudio(startCount); }}></i>
        {showWord && <div>
          
          {`${words[startCount]?.word}, ${words[startCount]?.wordTranslate}`}</div>}
      </div> }
      {(countQuestions === limitQuestions) ? <div className='audioCall-wrap audiocall-modal'>Здесь будут результаты
        <Button href='/Мини-игры/Аудиовызов' onClick={() => {
          console.log('back');
        }}>назад</Button> <Button href='/' onClick={() => {
          console.log('back');
        }}>главная</Button></div> : !!words.length && getButtons() }
      
    
      {showWord ?
       
        (!showModal && <button onClick={() => {         
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          
        }}>Следующий вопрос</button>) : (!!words.length && <button onClick={() => {
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();   
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);            
          }
        }}>Я не знаю правильный ответ</button>)}
    </div>
  );
 
}


