import React, { useState, useEffect, useRef } from 'react';
import './word-card.css';
import {
  createHardUserWord,
  createLearnedUserWord,
  getUserWord,
} from '../../../../../services/APIService';
import { getOneWord } from '../../../../../services/APIService';
import {
  getUserNormalWord,
  getUserWords,
  updateUserNormalWord,
  createUserNormalWord,
} from '../../../../../services/APIService';

export interface CardComponentProps {
  word: {
    audio: string;
    audioExample: string;
    audioMeaning: string;
    id: any;
    image: string;
    textExample: string;
    textExampleTranslate: string;
    textMeaning: string;
    textMeaningTranslate: string;
    transcription: string;
    word: string;
    wordTranslate: string;
    difficulty: string;
  };
  accessToken: any;
  onDelete: any;
  color: string;
  learned: boolean;
  difficult: boolean;
  wordTranslate: string;
  difficulty: string;
  id: string;
}

function TextBookWord(props: CardComponentProps | any) {
  const [word, setWord] = useState(props.word);

  const [answer, setAnswer] = useState<any>([]);

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

  useEffect(() => {
    if (props.wordID !== undefined) {
      getOneWord(props.wordID).then(setWord);
    }
  }, [props.wordID]);

  useEffect(() => {
    if (props.word?.id != undefined) {
      getUserNormalWord(localStorage.getItem('userId'), props.word?.id).then(
        setAnswer,
      );
    }
  }, [props.word]);

  if (props === undefined) throw new Error('error');

  const audio: HTMLAudioElement = new Audio();

  function playAudio() {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    const srcs = [word?.audio, word?.audioMeaning, word?.audioExample];
    console.log(srcs);
    let current = 0;
    if (!audio.paused) audio.pause();
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

  const addToUserWords = (wordId: string, difficulty: string) => {
    getUserWords(localStorage.getItem('userId'))
      .then(async (userWords) => {
        if (userWords.includes(wordId)) {
          const userWord = await getUserNormalWord(localStorage.getItem('userId'), wordId);
          updateUserNormalWord(localStorage.getItem('userId'), wordId, userWord.optional.countRight, userWord.optional.countWrong, difficulty);
          setWord(
            Object.assign(word, {
              difficulty: difficulty,
              optional: {
                countRight: userWord.optional.countRight,
                countWrong: userWord.optional.countWrong,
              },
            }),
          );
          console.log(`слово исправлено как ${difficulty}`, userWord);
        } else {
          createUserNormalWord(localStorage.getItem('userId'), wordId, 0, 0, difficulty);
          console.log(`создано новое ${difficulty} слово`);
          setWord(
            Object.assign(word, {
              difficulty: difficulty,
              optional: {
                countRight: 0,
                countWrong: 0,
              },
            }),
          );
        }
      });
  };

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
          <i className='fas fa-volume-up ${props.color} '></i>
        </div>
      </div>
      <div className='text_book__word_actions'>
        {props.accessToken && (
          <button
            id='add-to-hard'
            className={props.color}
            onClick={() => {
              addToUserWords(props.word.id, 'hard');
            }}
          >
            + в сложные слова
          </button>
        )}
        {props.accessToken && (
          <button
            id='delete-word'
            className={props.color}
            onClick={() => {
              getUserWord(localStorage.getItem('userId'));
            }}
          >
            {!props.wordID && (
              <span
                onClick={() => {
                  addToUserWords(props.word.id, 'easy');
                }}
              >
                Слово изучено
              </span>
            )}
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
      <p className='text_book__word-title'>Ответы в играх: </p>
      <div className='statistics'>
        <div>
          <p className={props.color}>Правильных ответов:</p>
          <b>{answer?.optional?.countRight || 0}</b>
        </div>
      </div>
    </div>
  );
}

export default TextBookWord;