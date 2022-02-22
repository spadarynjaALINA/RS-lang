/* eslint @typescript-eslint/no-var-requires: "off" */
import React, { useState, useEffect } from 'react';

import { getWords } from '../../../../handlers';
import { getFullUserWords } from '../../../../services/APIService';
import { getRandomNum } from '../../utils/getRandomNum';
import { Button } from 'antd';
import ResultsWindow from './ResultsWindow';
import './game-field.css';
import { getCheckmarks } from '../../utils/getCheckmarks';
import { pushGameResults } from '../../utils/pushGameResults';

const right = require('../../../../assets/audio/right.mp3');
const wrong = require('../../../../assets/audio/wrong.mp3');
const modalResults = require('../../../../assets/audio/modal_results.mp3');

export interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
  id: string;
  
}

function GameField(props: { group: number, page: number, isActive: boolean }) {
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
  const [page, setPage] = useState(props.page);
  const [isDisabled, setIsDisabled] = useState(true);
  const [maxSerie, setMaxSerie] = useState<number[]>([]);
  useEffect(() => {

    if (localStorage.getItem('textbook')) {
      (getWords(props.group, page))
        .then(async (data) => {
          const easyWords = await getFullUserWords(localStorage.getItem('userId'));
          const dataFiltered = data.filter((word: Word) => !easyWords.includes(word.id));
          setWords(dataFiltered);
          setIsDisabled(false);
        });
    } else {
      const arr = [];
      for (let i = page; i >= 0; i--) {
        arr.push(getWords(props.group, i));
      }
      Promise.all(arr).then((data) => {
        const arrData = data.flat();
        setWords(arrData);
        setIsDisabled(false);
      });
    }

  }, []);

  useEffect(() => {
    setUsedWords([...usedWords, randomWord]);
  }, [randomWord]);

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
      const maxCount = (maxSerie.join('').split('0').map(i=>i.length).sort((a, b)=>b - a ))[0];
      pushGameResults(correctAnswers, wrongAnswers, 'sprint', maxCount);
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);


  function nextQuestion() {
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

  function compare(answer: boolean) {
    const audio = new Audio();
    const timer = document.querySelector<HTMLElement>('.fa-stopwatch');
    if ((randomWord === randomTranslate) === answer) {
      audio.src = right;
      audio.play();
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
      setMaxSerie([...maxSerie, 1]);
    } else {
      audio.src = wrong;
      audio.play();
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
      setMaxSerie([...maxSerie, 0]);
    }
  }

  const asyncCompare = async (answer: boolean) => {
    setIsDisabled(true);
    if (page > 1) {
      const data = await getWords(props.group, page - 1);
      const easyWords = await getFullUserWords(localStorage.getItem('userId'));
      const dataFiltered = data.filter((word: Word) => !easyWords.includes(word.id));
      setWords([...words, ...dataFiltered]);
      setPage(page - 1);
      compare(answer);
      nextQuestion();
    } else if (page === 1) {
      setSeconds(0);
    }
    setIsDisabled(false);
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (!isDisabled) {
      if (e.code === 'ArrowLeft' && showModal === false) {
        if (usedWords.length === words.length - 1) {
          asyncCompare(true);
        } else {
          compare(true);
          nextQuestion();
        }
      } else if (e.code === 'ArrowRight' && showModal === false) {
        if (usedWords.length === words.length - 1) {
          asyncCompare(false);
        } else {
          compare(false);
          nextQuestion();
        }
      }
    }
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
        <Button id='game-left-button' disabled={isDisabled} onClick={() => {
          if (usedWords.length === words.length - 1) {
            asyncCompare(true);
          } else {
            compare(true);
            nextQuestion();
          }
        }
        }>ВЕРНО</Button>
        <Button id='game-right-button' disabled={isDisabled} onClick={() => {
          if (usedWords.length === words.length - 1) {
            asyncCompare(false);
          } else {
            compare(false);
            nextQuestion();
          }
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