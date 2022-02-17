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
  const wordsArr: Word[] = [];
  useEffect(() => {      
    setRandomWord(getRandomNum(0, 599));
    setRandomWord1(getRandomNum(0, 599));
    setRandomWord2(getRandomNum(0, 599));
    setRandomWord3(getRandomNum(0, 599));
    setRandomWord4(getRandomNum(0, 599));
    const arr = [];    
    for (let i = 1; i <= 30; i++) {
      arr.push(getWords(props.group, i));
    }
    Promise.all(arr).then((data) => {
      setWords(data.flat());
      data.flat().forEach(i => {        
        wordsArr.push(i);
      });
      console.log(wordsArr, words);
    }).then(() => {
      playAudio();
      console.log('play');
    }); 
   
  }, []);
  let btnArr: number[] = [];
  const toggle = () => setShowModal(prev => !prev);
  const audio: HTMLAudioElement = new Audio();
  const rand0 = useMemo(()=>{     
    let random;
    random = getRandomNum(0, 599);   
    while ( btnArr.includes(random)) {     
      const a = Math.floor(Math.random() * (words.length - 1));
      random = a;
    }
    btnArr.push(random);
    return random;
  }, [wordsArr.length]); 
  console.log(rand0, 'rand0', btnArr);
 
  function playAudio() {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    
    const a = randomWord == undefined ? btnArr[0] : randomWord;
    audio.src = `https://rs-lang-app-rss.herokuapp.com/${words[a].audio
    }`;   
    audio.play();
    console.log(a, words[a]);
    btnArr = [];
  }
  
  const arr0 = [0, 1, 2, 3, 4];
  const arr1 = useMemo(()=>{return arr0.sort(() => Math.random() - .5);}, [getSort]);


  console.log(btnArr, btnWords);
  useEffect(() => {
    if (words.length) {
      playAudio();       
    }
  });
  
  function nextQuestion() {  
    let random;
    do {
      random = getRandomNum(0, words.length);
    } while (usedWords.includes(random));    
    setRandomWord(random);      
   
    btnArr.push(random);

    const getRandom1 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord1(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
        setRandomWord1(random); 
      }      
      setRandomWord1(random); 
      
      btnArr.push(random);
    };
    const getRandom2 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord1(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
        setRandomWord2(random); 
      }      
      setRandomWord2(random); 
      
      btnArr.push(random);
    };
    const getRandom3 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord3(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
        setRandomWord3(random); 
      }      
      setRandomWord1(random); 
   
      btnArr.push(random);
    };
    const getRandom4 = () => {     
      random = getRandomNum(0, words.length);       
      setRandomWord4(random); 
      while (usedWords.includes(random) && btnArr.includes(random)) {     
        const a = Math.floor(Math.random() * (words.length - 1));
        random = a;
        setRandomWord4(random); 
      }      
      setRandomWord4(random); 
    
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
    <div className='audioCall-wrap'>
      <div className='audio-wrap'>
        <i className='fas fa-volume-up' onClick={() => { playAudio(); }}></i>
        {showWord ?  <div>{`${words[btnWords[0]]?.word}`}</div> : <></>}
      </div>
      
      <div className='question-btn-wrap'>       
        <Button ghost shape="round" className="level-button"
          onClick={() => {
            if (arr1[0] === 0) console.log('true');
            setShowWord(true);           
          }     
      
          }>{`1 ${words[btnWords[arr1[0]]]?.word}`}</Button>
        <QuestionButton text={`2 ${words[btnWords[arr1[1]]]?.word}`} show={toggle}></QuestionButton>
        <QuestionButton text={`3 ${words[btnWords[arr1[2]]]?.word}`}hide={setShowModal}></QuestionButton>
        <QuestionButton text={`4 ${words[btnWords[arr1[3]]]?.word}`}hide={setShowModal}></QuestionButton>
        <QuestionButton text={`5 ${words[btnWords[arr1[4]]]?.word}`}show={setShowModal}></QuestionButton>
      </div>
      {showModal ? <div className='audioCall-wrap'>это модальное окно</div> : <div></div>}
      <button onClick={() => {
        setShowWord(false);
        nextQuestion();
        setSort(prev=>!prev);
      }}>Я не знаю правильный ответ</button>
    </div>
  );
 
}


