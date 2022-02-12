import React, { useState } from 'react';
import { Button } from 'antd';
import './results-window.css';

interface ResultsProps {
  word: string;
  audio: string;
  wordTranslate: string;
}

function ResultsWindow(props: {
  correctAnswers: ResultsProps[],
  wrongAnswers: ResultsProps[],
  score: number
}) {

  function playAudio(src: string) {
    let audio: HTMLAudioElement;
    audio = new Audio();
    if (!audio.paused) {
      return;
    }

    audio.src = `https://rs-lang-app-rss.herokuapp.com/${src}`;
    audio.play();
  }

  return (
    <div className='modal-window'>
      <h2>Результат игры спринт {props.score} очков</h2>
      <h3>Ошибки <span className='title-count-wrong'> { props.wrongAnswers.length } </span></h3>
      <ul className='game-results'>
        {props.wrongAnswers.map(item => {
            return <li className='wrong-answer' key={item.word}>
              <div className="game-sound-button">
                <i className='fas fa-volume-up' onClick={() => {
                  playAudio(item.audio);
              }}></i>
              </div>
              <span >{item.word}</span>
              <span className='game-result-translate'> - {item.wordTranslate}</span>
            </li>
        })}
      </ul>
      <h3>Правильные ответы <span className='title-count-correct'> { props.correctAnswers.length } </span></h3>
      <ul className='game-results'>
        {props.correctAnswers.map(item => {
            return <li className='correct-answer' key={item.word}>
            <div className="game-sound-button">
              <i className='fas fa-volume-up' onClick={() => {
                playAudio(item.audio);
            }}></i>
            </div>
            <span >{item.word}</span>
              <span className='game-result-translate'> - {item.wordTranslate}</span>
          </li>
        })}
      </ul>
      <div>
      <Button href='/Учебник'>В учебник</Button>
      <Button href='/'>На главную</Button>
      </div>
    </div>
  )
}

export default ResultsWindow;