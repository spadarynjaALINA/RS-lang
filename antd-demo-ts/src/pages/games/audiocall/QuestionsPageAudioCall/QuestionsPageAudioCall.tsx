/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';

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
  const [randomWord, setRandomWord] = useState(0);
  const [randomWord1, setRandomWord1] = useState(1);
  const [randomWord2, setRandomWord2] = useState(2);
  const [randomWord3, setRandomWord3] = useState(3);
  const [randomWord4, setRandomWord4] = useState(4);
  const [showWord, setShowWord] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [btnWords, setBtnWords] = useState([] as number[]);
  const [getSort, setSort] = useState(true);
  const arr0 = [0, 1, 2, 3, 4];
  const arr1 = useMemo(() => { return arr0.sort(() => Math.random() - .5); }, [getSort]);
  const btnArr: number[] = [];

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
  if (words.length){
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
    let random;
    do {
      random = getRandomNum(0, words.length);
    } while (usedWords.includes(random));    
      
   
    btnArr.push(random);

    const getRandom1 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord1(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
         
      }      
       
      
      btnArr.push(random);
    };
    const getRandom2 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord1(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
        
      }       
      btnArr.push(random);
    };
    const getRandom3 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord3(random); 
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
  
  return (
    <div  className = 'audioCall-wrap' >
      
      <div className='audio-wrap'>
        <i className='fas fa-volume-up' onClick={() => { playAudio(btnWords[0]); }}></i>
        {showWord ?  <div>{`${words[btnWords[0]]?.word}`}</div> : <></>}
      </div>
      {words.length ? <div className='question-btn-wrap'>
        <Button ghost shape="round" className="level-button"
          onClick={() => {
            if (arr1[0] === 0) console.log('true');
            setShowWord(true);
          }
      
          }>{`1 ${words[btnWords[arr1[0]]]?.word}`}</Button>
        <QuestionButton text={`2 ${words[btnWords[arr1[1]]]?.word}`} show={toggle}></QuestionButton>
        <QuestionButton text={`3 ${words[btnWords[arr1[2]]]?.word}`} hide={setShowModal}></QuestionButton>
        <QuestionButton text={`4 ${words[btnWords[arr1[3]]]?.word}`} hide={setShowModal}></QuestionButton>
        <QuestionButton text={`5 ${words[btnWords[arr1[4]]]?.word}`} show={setShowModal}></QuestionButton>
      </div> : <></>}
     
      {showModal ? <div className='audioCall-wrap'>это модальное окно</div> : <div></div>} 
      <button onClick={() => {
        setShowWord(false);
        nextQuestion();
        setSort(prev=>!prev);
      }}>Я не знаю правильный ответ</button>
    </div>
  );
 
}


