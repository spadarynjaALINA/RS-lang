import React, { useState, useEffect } from 'react';
import './word-card.css';
import {
  createUserWord,
  getUserWord,
} from '../../../../../services/APIService';
import { getOneWord } from '../../../../../services/APIService';

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
  onDelete: any;
}

function TextBookWord(props: CardComponentProps | any) {
  const [word, setWord] = useState(props.word);

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

  useEffect(() => {
    if (props.wordID !== undefined) {
      getOneWord(props.wordID).then(setWord);
    }
  }, [props.wordID]);

  if (props === undefined) throw new Error('error');

  const  audio: HTMLAudioElement = new Audio();
 
  function playAudio() {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    const srcs = [word?.audio, word?.audioMeaning, word?.audioExample];
    console.log(srcs);
    let current = 0;
    // if(!audio.paused) audio.pause();
    audio.src = `https://rs-lang-app-rss.herokuapp.com/${srcs[current]}`;
    console.log(audio.src);
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
        src={`https://rs-lang-app-rss.herokuapp.com/${word?.image}`}
        alt='
associative picture'
        className='text_book__word-image'
      />
      <p className='text_book__word-word'>{word?.word}</p>
      <p className='text_book__word-translate'>{word?.wordTranslate}</p>
      <div className='text_book__word-transcription-audio-button'>
        <p className='text_book__word-transcription'>{word?.transcription}</p>
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
            id='delete-word'
            onClick={() => {
              getUserWord(localStorage.getItem('userId'));
            }}
          >
            <b>{!props.wordID && 'Слово изучено'}</b>
            {props.wordID && (
              <span
                onClick={() => {
                  props.onDelete(word.id);
                }}
              >
                Удалить слово
              </span>
            )}
          </button>
        )}
      </div>
      <p className='text_book__word-title'>Значение</p>
      <p
        className='text_book__word-text-meaning'
        dangerouslySetInnerHTML={{ __html: word?.textMeaning }}
      />
      <p className='text_book__word-text-meaning-translate'>
        {word?.textMeaningTranslate}
      </p>
      <p className='text_book__word-title'>Пример</p>
      <p
        className='text_book__word-text-example'
        dangerouslySetInnerHTML={{ __html: word?.textExample }}
      />
      <p className='text_book__word-text-example-translate'>
        {word?.textExampleTranslate}
      </p>
    </div>
  );
}

export default TextBookWord;
