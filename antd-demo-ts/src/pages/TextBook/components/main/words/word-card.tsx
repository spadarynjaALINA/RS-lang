import React from 'react';
import './word-card.css';
import {
  createUserWord,
  getUserWord,
  getOneWord,
} from '../../../../../services/APIService';

export interface CardComponentProps {
  word: {
    audio: string;
    audioExample: string;
    audioMeaning: string;
    // group: number;
    id: any;
    image: string;
    // page: number;
    textExample: string;
    textExampleTranslate: string;
    textMeaning: string;
    textMeaningTranslate: string;
    transcription: string;
    word: string;
    wordTranslate: string;
  };
  accessToken: any;
}

function TextBookWord(props: CardComponentProps) {
  if (props === undefined) throw new Error('error');
  let audio: HTMLAudioElement;
  audio = new Audio();
  function playAudio() {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    const srcs = [
      props.word?.audio,
      props.word?.audioMeaning,
      props.word?.audioExample,
    ];
    let current = 0;
    // if(!audio.paused) audio.pause();
    audio.src = `https://rs-lang-app-rss.herokuapp.com/${srcs[current]}`;
    audio.play();
    audio.onended = function () {
      current++;
      if (current === srcs.length) {
        return;
      }
      audio.src = `https://rs-lang-app-rss.herokuapp.com/${srcs[current]}`;
      audio.play();
    };
  }
  return (
    <div className='text_book__word'>
      <img
        src={`https://rs-lang-app-rss.herokuapp.com/${props.word?.image}`}
        alt='
associative picture'
        className='text_book__word-image'
      />
      <p className='text_book__word-word'>{props.word?.word}</p>
      <p className='text_book__word-translate'>{props.word?.wordTranslate}</p>
      <div className='text_book__word-transcription-audio-button'>
        <p className='text_book__word-transcription'>
          {props.word?.transcription}
        </p>
        <div className='text_book__word-audio-button' onClick={playAudio}>
          <i className='fas fa-volume-up'></i>
        </div>
      </div>
      <div className='text_book__word_actions'>
        {props.accessToken && (
          <button
            id='add-to-hard'
            onClick={() => {
              createUserWord(localStorage.getItem('userId'), props.word.id);
            }}
          >
            + в сложные слова
          </button>
        )}
        {props.accessToken && (
          <button
            id='delete word'
            onClick={() => {
              getUserWord(localStorage.getItem('userId'));
            }}
          >
            Удалить слово
          </button>
        )}
      </div>
      <p className='text_book__word-title'>Значение</p>
      <p
        className='text_book__word-text-meaning'
        dangerouslySetInnerHTML={{ __html: props.word?.textMeaning }}
      />
      <p className='text_book__word-text-meaning-translate'>
        {props.word?.textMeaningTranslate}
      </p>
      <p className='text_book__word-title'>Пример</p>
      <p
        className='text_book__word-text-example'
        dangerouslySetInnerHTML={{ __html: props.word?.textExample }}
      />
      <p className='text_book__word-text-example-translate'>
        {props.word?.textExampleTranslate}
      </p>
    </div>
  );
}

export default TextBookWord;
