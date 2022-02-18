/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { JsxElement } from 'typescript';
import { getWords } from '../../../../handlers';
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
  if (countQuestions === limitQuestions) {
    setShowModal(true);
    setCountQuestions(0);
  }

  const ollWords = useMemo(() => {
    console.log('ollwords');
    return words;
  }, [words.length]); 
  const orderWords = useMemo(() => {
    console.log('orderword');
    setStartCount(prev => prev + 5);
    let arr = [0, 1, 2, 3, 4];
    arr = arr.sort(() => Math.random() - .5).map(item=>item + startCount);
    return arr;
  }, [getSort]);  
  console.log(words, startCount, orderWords, 'рендер страницы');
  useEffect(() => {         
    const arr = [];    
    for (let i = 1; i <= 30; i++) {
      arr.push(getWords(props.group, i));
    }
    Promise.all(arr).then((data) => {
      setWords(data.flat().sort(() => Math.random() - .5));     
    });    
  }, []); 
 
  function GetButtons() { 
    console.log('тут функция гетбаттонс', words, ollWords, `${ 1} ${words[orderWords[2]].word}`, orderWords);
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => (
        <QuestionButton  key={`question${index}`} text={ `${index + 1} ${ollWords[orderWords[i]].word}` } onClick={()=>{setShowWord(true);}}></QuestionButton>
      )) : ''}
    </div>);     
  }
  // const getPropForBtns = () => {
  //   console.log(тут будет)
  // }
 
  function playAudio(word: number ) {    
    if (!audio.paused) {
      audio.pause();
      return;
    } 
    if (words.length) audio.src = `https://rs-lang-app-rss.herokuapp.com/${words[word].audio
    }`;
   
    audio.play();
  }
  
  function nextQuestion() {  
    if (countQuestions === 9) setWords([]);   
  }
  
  return (
    <div  className = 'audioCall-wrap' >      
      <div className='audio-wrap'>
        <i className='fas fa-volume-up' onClick={() => { playAudio(startCount); }}></i>
        {showWord && <div>
          
          {`${words[startCount]?.word}`}</div>}
      </div>
      {!!words.length && <GetButtons></GetButtons>}
     
      {showModal && <div className='audioCall-wrap audiocall-modal'>Здесь будут результаты
        <Button href='/Мини-игры/Аудиовызов' onClick={() => {
          console.log('back');
        }}>назад</Button> <Button href='/' onClick={() => {
          console.log('back');
        }}>главная</Button></div>} {showWord ?
       
        <button onClick={() => {         
          if (countQuestions < limitQuestions) {
            // setCountQuestions(prev => prev + 1);
            // setShowWord(false);
            // nextQuestion();
           
            setSort(prev => !prev);
          }
          
        }}>Следующий вопрос</button> : <button onClick={() => {
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            nextQuestion();   
           
            setSort(prev => !prev);            
          }
        }}>Я не знаю правильный ответ</button>}
    </div>
  );
 
}


