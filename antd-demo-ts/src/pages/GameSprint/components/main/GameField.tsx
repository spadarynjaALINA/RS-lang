/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useEffect } from 'react';

import { getWords } from '../../../../handlers';
import { getRandomNum } from '../../utils/getRandomNum';
import { Button } from 'antd';
import ResultsWindow from './ResultsWindow';
import './game-field.css';
import { getCheckmarks } from '../../utils/getCheckmarks';

import { pushGameResults } from '../../utils/pushGameResults';
// import { getUserNormalWord } from '../../../../services/APIService';

const right = require('../../../../assets/audio/right.mp3');
const wrong = require('../../../../assets/audio/wrong.mp3');
const modalResults = require('../../../../assets/audio/modal_results.mp3');

export interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
  id: string;
  
}


function GameField(props: { group: number, page: number, isActive: boolean, location?:any }) {
  console.log(props.location);
  const [seconds, setSeconds] = useState(30);

  const [words, setWords] = useState([] as Word[]);
  const [randomWord, setRandomWord] = useState(getRandomNum(0, 4));
  const [randomTranslate, setRandomTranslate] = useState(getRandomNum(0, 4));
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(10);
  const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [isLastWord, setIsLastWord] = useState(false);
  const [page, setPage] = useState(props.page);
  useEffect(() => {

    if (localStorage.getItem('textbook')) {
      (getWords(props.group, page))
        .then((data) => {
          setWords(data);
        });
    } else {
      const arr = [];
      for (let i = page; i >= 0; i--) {
        arr.push(getWords(props.group, i));
      }
      Promise.all(arr).then((data) => {
        const arrData = data.flat();
        setWords(arrData);
      });
    }

  }, []);

  useEffect(() => {
    setUsedWords([...usedWords, randomWord]);
  }, [randomWord]);

  useEffect(() => {
    if (isLastWord && page > 1) {
      (getWords(props.group, page - 1))
        .then((data) => {
          setWords([...words, ...data]);
        });
      setPage(page - 1);
      setIsLastWord(false);
    } else if (isLastWord && page === 1) {
      setSeconds(0);
    }
  }, [isLastWord]);

  useEffect(() => {
    let interval: any = null;
    if (props.isActive) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!props.isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds <= 0) {
      clearInterval(interval);
      setShowModal(true);
      const audioShowModal = new Audio(modalResults);
      audioShowModal.play();
      pushGameResults(correctAnswers, wrongAnswers);
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);


  function nextQuestion() {
    if (!isLastWord) {
      let random;
      do {
        random = getRandomNum(0, words.length - 1);
      } while (usedWords.includes(random));
    
      setRandomWord(random);
      if (Math.random() < .5) {
        setRandomTranslate(random);
      } else {
        setRandomTranslate(getRandomNum(0, words.length - 1));
      }
    }


  }

  function compare(answer: boolean) {
    if (usedWords.length === words.length - 1) {
      setIsLastWord(true);
    }

    const audio = new Audio();
    const timer = document.querySelector<HTMLElement>('.fa-stopwatch');
    if ((randomWord === randomTranslate) === answer) {
      audio.src = right;
      audio.play();
      console.log('ПРАВИЛЬНЫЙ ОТВЕТ');
      setCorrectAnswers([...correctAnswers, {
        word: words[randomWord]?.word,
        audio: words[randomWord]?.audio,
        wordTranslate: words[randomWord]?.wordTranslate,
        id: words[randomWord]?.id,
      }]);
      setTotalScore(totalScore + currentPoints);
      setCountOfCorrectAnswers(countOfCorrectAnswers + 1);
      if (countOfCorrectAnswers === 3) {
        setCountOfCorrectAnswers(0);
        if (currentPoints !== 80) {
          setCurrentPoints(currentPoints * 2);
        }
      }
      if (!timer) throw new Error('err');
      timer.style.color = 'rgb(0, 255, 13)';
      timer.classList.add('fa-stopwatch-big');
      setTimeout(() => {
        timer.style.color = 'white';
        timer.classList.remove('fa-stopwatch-big');
      }, 300);
    } else {
      audio.src = wrong;
      audio.play();
      console.log('НЕПРАВИЛЬНЫЙ ОТВЕТ');
      setWrongAnswers([...wrongAnswers, {
        word: words[randomWord]?.word,
        audio: words[randomWord]?.audio,
        wordTranslate: words[randomWord]?.wordTranslate,
        id: words[randomWord]?.id,
      }]);
      setCountOfCorrectAnswers(0);
      setCurrentPoints(10);
      if (!timer) throw new Error('err');
      timer.style.color = 'red';
      timer.classList.add('fa-stopwatch-big');
      setTimeout(() => {
        timer.style.color = 'white';
        timer.classList.remove('fa-stopwatch-big');
      }, 300);
    }
  }

  const onKeydown = (e: KeyboardEvent) => {
    setTimeout(() => {
      if (e.code === 'ArrowLeft' && showModal === false) {
        compare(true);
        nextQuestion();
      } else if (e.code === 'ArrowRight' && showModal === false) {
        compare(false);
        nextQuestion();
      }
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeydown);
    return () => {
      window.removeEventListener('keyup', onKeydown);
    };
  });

  return (
    <div className='game-field'>
      <div className='game-timer'>
        <i className='fas fa-stopwatch'></i>
        <span className='game-seconds'>{seconds} s</span>
      </div>
      <div className='game-score'>
        <p className='game-points-per-word'>+ {currentPoints } очков за слово </p>
        {getCheckmarks(countOfCorrectAnswers)}
        <p className='game-points-per-word'>{totalScore } Score </p>
      </div>

      <div className='game-word-translate'>
        <div className='game-word'>{words[randomWord]?.word} - </div>
        
        <div className='game-translate'>{ words[randomTranslate]?.wordTranslate }</div>
      </div>
      <div className='game-buttons'>
        <Button className='game-left-button' onClick={() => {
          compare(true);
          nextQuestion();
        }
        }>ВЕРНО</Button>
        <Button className='game-right-button' onClick={() => {
          compare(false);
          nextQuestion();
        }
        }>НЕВЕРНО</Button>
      </div>
      { showModal ? 
        <ResultsWindow
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          score = {totalScore}/>
        : <div></div>
      }
    </div>
  );
}

export default GameField;