import React, { useState, useEffect, Component } from 'react';
import { getWords } from '../../../../handlers';
import { getRandomNum } from '../../utils/getRandomNum';
import { Button } from 'antd';
import ResultsWindow from './ResultsWindow';
import './game-field.css';
import { getCheckmarks } from '../../utils/getCheckmarks';

const right = require('../../../../assets/audio/right.mp3');
const wrong = require('../../../../assets/audio/wrong.mp3');
const modalResults = require('../../../../assets/audio/modal_results.mp3');
interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
}

function GameField(props: {group: number, isActive: boolean}) {
  const [seconds, setSeconds] = useState(60);
  const [words, setWords] = useState([] as Word[]);
  const [randomWord, setRandomWord] = useState(0);
  const [randomTranslate, setRandomTranslate] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(10);
  const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  
  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 30; i++) {
      arr.push(getWords(props.group, i));
    }
    Promise.all(arr).then((data) => {
      console.log('-----------------');
      setWords(data.flat());
    })
  }, []);

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
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);

  // const onKeydown = (e: KeyboardEvent) => {
  //     if (e.code === 'ArrowLeft') {
  //       compare(true);
  //       nextQuestion();
  //       console.log('left');
  //       return;
  //     } else if (e.code === 'ArrowRight') {
  //       compare(false);
  //       nextQuestion();
  //       console.log('right');
  //       return;
  //     }
  // }

  // useEffect(() => {
  //   document.addEventListener('keydown', onKeydown);
  //   return () => {
  //     document.removeEventListener('keydown', onKeydown);
  //   };
  // }, []);

  function nextQuestion() {
    const random = getRandomNum(0, words.length);
    setRandomWord(random);
    if (Math.random() < .5) {
      setRandomTranslate(random);
    } else {
      setRandomTranslate(getRandomNum(0, words.length));
    }
    console.log(randomWord, randomTranslate)
  }

  function compare(answer: boolean) {
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
      }]);
      setTotalScore(totalScore + currentPoints);
      setCountOfCorrectAnswers(countOfCorrectAnswers + 1);
      if (countOfCorrectAnswers === 3) {
        setCountOfCorrectAnswers(0);
        if (currentPoints != 80) {
          setCurrentPoints(currentPoints * 2);
        }
      }
      if (!timer) throw new Error('err');
      timer.style.color = 'rgb(0, 255, 13)';
      timer.classList.add('fa-stopwatch-big');
      setTimeout(() => {
        timer.style.color = 'white';
        timer.classList.remove('fa-stopwatch-big');
      }, 300)
    } else {
      audio.src = wrong;
      audio.play();
      console.log('НЕПРАВИЛЬНЫЙ ОТВЕТ');
      setWrongAnswers([...wrongAnswers, {
        word: words[randomWord]?.word,
        audio: words[randomWord]?.audio,
        wordTranslate: words[randomWord]?.wordTranslate,
      }]);
      setCountOfCorrectAnswers(0);
      setCurrentPoints(10);
      if (!timer) throw new Error('err');
      timer.style.color = 'red';
      timer.classList.add('fa-stopwatch-big');
      setTimeout(() => {
        timer.style.color = 'white';
        timer.classList.remove('fa-stopwatch-big');
      }, 300)
    }
  }

  return (
    <div className='game-field'>
      <div className='game-timer'>
        <i className='fas fa-stopwatch'></i>
        <span className='game-seconds'>{seconds} s</span>
      </div>
      <div className='game-score'>
        <p>+ {currentPoints } очков за слово </p>
        {getCheckmarks(countOfCorrectAnswers)}
        <p>{totalScore } Score </p>
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
