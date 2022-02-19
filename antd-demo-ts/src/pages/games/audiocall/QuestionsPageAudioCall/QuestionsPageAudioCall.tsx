/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  transcription: string;
  image:any
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
     
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => {   
        
        return (<QuestionButton id={ `answerBtn${index + 1}`}isTrue={words[orderWords[index]]?.wordTranslate === words[startCount].wordTranslate} key={`question${index}`} text={ `${index + 1} ${words[orderWords[index]]?.wordTranslate}` } onClick={()=>{setShowWord(true);}}></QuestionButton>);
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
 
  
  return (
    <div  className = 'audioCall-wrap' >      
      {!showModal && <div className='audio-wrap'>
        {showWord ? <img className='show-words-image' src={`https://rs-lang-app-rss.herokuapp.com/${words[startCount]?.image}`}></img> : <i className='fas fa-volume-up ' id = 'volumeAudioCall' onClick={() => { playAudio(startCount); }}></i>}
        {showWord && <div className='answer-wrap'>
          <p className='show-word'> {`${words[startCount]?.word}  ${words[startCount]?.transcription} `}</p>
          <p className='show-translate'>{`${words[startCount]?.wordTranslate}` }</p>
        </div>}
      </div> }
      {(countQuestions === limitQuestions) ? <div className='audioCall-wrap audiocall-modal'>
        <h2>Результаты</h2><div className='right-wrap'><h4>ошибок<span>{ }</span></h4></div><div className='wrong-wrap'><h4>знаю<span>{ }</span></h4></div>
        <Link to='/textbook'> <Button>назад</Button></Link>
        <Link to='/'><Button >главная</Button></Link></div> : !!words.length && getButtons() }
      
    
      {showWord ?
       
        (!showModal && <button className='next-btn' onClick={() => {         
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          
        }}>Следующий вопрос</button>) : (!!words.length && <button className='next-btn' onClick={() => {
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


