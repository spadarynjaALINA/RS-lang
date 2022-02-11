import React, { useState, useEffect } from 'react';
import { getWords } from '../../../../handlers';
import { getRandomNum } from '../../utils/getRandomNum';

import { Button } from 'antd';
import './game-field.css';

interface Word {
  word: string;
  wordTranslate: string;
}

function GameField(props: {group: number, isActive: boolean}) {
  const [seconds, setSeconds] = useState(30);
  const [words, setWords] = useState([] as Word[]);
  const [randomWord, setRandomWord] = useState(0);
  const [randomTranslate, setRandomTranslate] = useState(0);
  const [answers, setAnswers] = useState < {word: string, answer: boolean}[]>([]);
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
      console.log(answers);
    }
    return () => clearInterval(interval);
  }, [props.isActive, seconds]);

  function nextQuestion() {
    const random = getRandomNum(0, words.length);
    setRandomWord(random);
    if (Math.random() < .3) {
      setRandomTranslate(random);
    } else {
      setRandomTranslate(getRandomNum(0, words.length));
    }
  }

  function compare(answer: boolean) {
    if ((randomWord === randomTranslate) === answer) {
      console.log('ПРАВИЛЬНЫЙ ОТВЕТ');
      setAnswers([...answers, { word: words[randomWord]?.word, answer: true }]);
    } else {
      console.log('НЕПРАВИЛЬНЫЙ ОТВЕТ');
      setAnswers([...answers, { word: words[randomWord]?.word, answer: false }]);
    }
  }

  return (
    <div className='game-field'>
      <div className='game-timer'>
        <i className='fas fa-stopwatch'></i>
        <span className='game-seconds'>{seconds} s</span>
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
    </div>
  );
}

export default GameField;
