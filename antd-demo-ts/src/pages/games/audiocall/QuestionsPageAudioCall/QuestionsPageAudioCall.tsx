/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

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
  const [totalScore, setTotalScore] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [btnWords, setBtnWords] = useState([] as number[]);
  const [getSort, setSort] = useState(true);
  const [countQuestions, setCountQuestions] = useState(1);
  const [wronArr, setWronArr] = useState([] as number[]);
  const [rightArr, setRightArr] = useState([] as number[]);

  if (countQuestions === 11) {
    setShowModal(true);
    setCountQuestions(0);
  }
  
  const arr0 = [0, 1, 2, 3, 4];
  const arr1 = useMemo(() => { return arr0.sort(() => Math.random() - .5); }, [getSort]);
  const btnArr: number[] = [];
  const stylesRight = {
    borderColor: 'green',
    background: 'green',
  };
  const stylesWron = {
    borderColor: 'red', 
    background: 'red',
  };
  const styleQuestion = {
    borderColor: 'black', 
    background: 'transparent',
  };
  const [answerStyle, setAnswerStyle] = useState();
  console.log(answerStyle, 'стейт без значения');
  useEffect(() => {         
    const arr = [];    
    for (let i = 1; i <= 30; i++) {
      arr.push(getWords(props.group, i));
    }
    Promise.all(arr).then((data) => {
      setWords(data.flat());
      
      console.log(words, '<----promise all');
      const random1 = (getRandomNum(0, 599));
      const random2 = (getRandomNum(0, 599));
      const random3 = (getRandomNum(0, 599));
      const random4 = (getRandomNum(0, 599));
      const random5 = (getRandomNum(0, 599));
      btnArr.push(random1);
      btnArr.push(random2);
      btnArr.push(random3);
      btnArr.push(random4);
      btnArr.push(random5);
      setBtnWords(btnArr);
      console.log(words, '<-------promise all2');
    }).then(() => {
      console.log(btnArr, words, '<-----------2 then');
     
    });    
  }, []); 
  if (words.length && countQuestions < 11){
    const timer = setTimeout(() => {
      const word = btnWords[0];
      playAudio(word);
    }, 0); 
  }
  
  // useEffect(() => {
  //   if (words) {
  //     const word = btnWords[0];
  //     playAudio(word);
  //   }
  // });
  
  const toggle = () => setShowModal(prev => !prev);
  const audio: HTMLAudioElement = new Audio(); 
 
  
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
    if (countQuestions === 10) setWords([]);
    
    let random;
    do {
      random = getRandomNum(0, words.length);
    } while (usedWords.includes(random));  
    btnArr.push(random);

    const getRandom1 = () => {     
      random = getRandomNum(0, words.length);  
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;         
      }      
      btnArr.push(random);
    };

    const getRandom2 = () => {     
      random = getRandomNum(0, words.length);  
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;        
      }       
      btnArr.push(random);
    };

    const getRandom3 = () => {     
      random = getRandomNum(0, words.length);      
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
      }           
      btnArr.push(random);
    };

    const getRandom4 = () => {     
      random = getRandomNum(0, words.length);       
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
      }                
      btnArr.push(random);
    };

    getRandom1();
    getRandom2();
    getRandom3();
    getRandom4();   
    setBtnWords(btnArr);
    console.log(btnArr);
    
  }
  const setColorRight = ()=> {
    [...document.querySelectorAll('.level-button')].forEach((i) => {
      if (i.innerHTML.slice(8) === `${words[btnWords[0]]?.word}</span>`) { i.id = 'green'; } else {
        i.id = 'black';
      }
      console.log(i.innerHTML.slice(8), `${words[btnWords[0]]?.word}</span>`);
    });
  };
  
  return (
    <div  className = 'audioCall-wrap' >
      
      <div className='audio-wrap'>
        <i className='fas fa-volume-up' onClick={() => { playAudio(btnWords[0]); }}></i>
        {showWord ?  <div>{`${words[btnWords[0]]?.word}`}</div> : <></>}
      </div>
      {words.length ? <div className='question-btn-wrap'>

        <Button ghost shape="round" className="level-button answer1"
          onClick={() => {
            setColorRight();
            // if (arr1[0] === 0) {  }
            
            setShowWord(true);
          }      
          }>{`1 ${words[btnWords[arr1[0]]]?.word}`}</Button>
        
        <Button style={answerStyle} ghost shape="round" className="level-button answer2"
          onClick={() => {
            // if (arr1[1] === 0) { setAnswerStyle(stylesRight); } else {
            //   setAnswerStyle(stylesWron);
            // }
            setColorRight();
            setShowWord(true);
          }      
          }>{`2 ${words[btnWords[arr1[1]]]?.word}`}</Button>
        
        <QuestionButton text={`3 ${words[btnWords[arr1[2]]]?.word}`} hide={setShowModal}></QuestionButton>
        <QuestionButton text={`4 ${words[btnWords[arr1[3]]]?.word}`} hide={setShowModal}></QuestionButton>
        <QuestionButton text={`5 ${words[btnWords[arr1[4]]]?.word}`} show={setShowModal}></QuestionButton>
      </div> : <></>}
     
      {showModal ? <div className='audioCall-wrap audiocall-modal'>Здесь будут результаты
        <Button href='/Мини-игры/Аудиовызов' onClick={() => {
          console.log('back');
        }}>назад</Button> <Button href='/' onClick={() => {
          console.log('back');
        }}>главная</Button></div> : <div></div>} {showWord ? 
        <button onClick={() => {
          
          if (countQuestions < 11) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            nextQuestion();
            setSort(prev => !prev);
            // setAnswerStyle(styleQuestion);
          }
          console.log(countQuestions);
        }}>Следующий вопрос</button> : <button onClick={() => {
          if (countQuestions < 11) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            nextQuestion();
            setSort(prev => !prev);
            // setAnswerStyle(styleQuestion);
          }
        }}>Я не знаю правильный ответ</button>}
    </div>
  );
 
}


