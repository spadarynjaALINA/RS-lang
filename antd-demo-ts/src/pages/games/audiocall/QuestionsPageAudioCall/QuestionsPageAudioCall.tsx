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
  if (countQuestions === limitQuestions) {
    setShowModal(true);
    setCountQuestions(0);
  }
  const red = {
    background:'red',
    
  };

  const green = {
    background:'green',
    
  };
  const allWords = useMemo(() => {
    console.log('ollwords');
    return words;
  }, [words.length]); 
  const orderWords = useMemo(() => {
    console.log('orderword', words);
   
    let arr = [0, 1, 2, 3, 4];
    arr = arr.sort(() => Math.random() - .5).map(item => item + startCount);
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
    console.log('тут функция гетбаттонс', words, allWords, `${ 1} ${words[orderWords[2]].word}`, orderWords);
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => (
        <QuestionButton  key={`question${index}`} text={ `${index + 1} ${allWords[orderWords[i]].word}` } onClick={()=>{setShowWord(true);}}></QuestionButton>
      )) : ''}
    </div>);     
  }
  // const getPropForBtns = () => {
  //   orderWords.map((i, index) => {
  // {key={`question${index}`} text={ `${index + 1} ${allWords[orderWords[i]].word}` } onClick={()=>{setShowWord(true)}
  // }
  //  };
 
  function playAudio(word: number) {  
    console.log('тут функция аудио');
    if (!audio.paused) {
      audio.pause();
      return;
    } 
    if (words.length) audio.src = `https://rs-lang-app-rss.herokuapp.com/${words[word].audio
    }`;
   
    audio.play();
  }
  useEffect(() => {
    playAudio(startCount);
  }, [allWords.length, getSort]);
  console.log(startCount, orderWords[0]);
  function nextQuestion() {  
    console.log('тут функция следующий вопрос', countQuestions);
    if (countQuestions === 9) setWords([]);   
  }
  
  return (
    <div  className = 'audioCall-wrap' >      
      <div className='audio-wrap'>
        <i className='fas fa-volume-up' onClick={() => { playAudio(startCount); }}></i>
        {showWord && <div>
          
          {`${words[startCount]?.word}`}</div>}
      </div>
      {!!words.length && <div>
        <QuestionButton text={ `1 ${allWords[orderWords[0]].word}` } onClick ={()=>{
          playAudio(startCount); setShowWord(true);
          
        }} key='1answer' style ={orderWords[0] == startCount ? green : red}></QuestionButton>
        <QuestionButton text={`2 ${allWords[orderWords[1]].word}`} onClick={() => { playAudio(startCount);setShowWord(true); }} key='2answer'></QuestionButton>
        <QuestionButton text={`3 ${allWords[orderWords[2]].word}`} onClick={() => { playAudio(startCount);setShowWord(true); }} key='3answer'></QuestionButton>
        <QuestionButton text={`4 ${allWords[orderWords[3]].word}`} onClick={() => { playAudio(startCount);setShowWord(true); }} key='4answer'></QuestionButton>
        <QuestionButton text={ `5 ${allWords[orderWords[4]].word}` } onClick ={()=>{playAudio(startCount);setShowWord(true);}} key='5answer'></QuestionButton></div>}
      {showModal && <div className='audioCall-wrap audiocall-modal'>Здесь будут результаты
        <Button href='/Мини-игры/Аудиовызов' onClick={() => {
          console.log('back');
        }}>назад</Button> <Button href='/' onClick={() => {
          console.log('back');
        }}>главная</Button></div>} {showWord ?
       
        <button onClick={() => {         
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          
        }}>Следующий вопрос</button> : <button onClick={() => {
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            nextQuestion();   
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);            
          }
        }}>Я не знаю правильный ответ</button>}
    </div>
  );
 
}


