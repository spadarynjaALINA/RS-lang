import React, { useState, useEffect, useRef } from 'react';
import './word-card.css';
import { getUserWord } from '../../../../../services/APIService';
import { getOneWord } from '../../../../../services/APIService';
import {
  getUserNormalWord,
  getUserWords,
  updateUserNormalWord,
  createUserNormalWord,
  getStatistics,
  getFullUserWords,
  updateStatistics,
} from '../../../../../services/APIService';
import { Stat } from '../../../../GameSprint/utils/pushGameResults';

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
  onChangeDifficulty: any;
  color: string;
  learned: boolean;
  difficult: boolean;
  wordTranslate: string;
  difficulty: string;
  id: string;
}

function TextBookWord(props: CardComponentProps | any) {
  const [word, setWord] = useState(props.word);

  const [answer, setAnswer] = useState<any>({});

  const date = new Date();
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dataR = `${date.getDate()}.${month}`;

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

  useEffect(() => {
    if (props.wordID !== undefined) {
      getOneWord(props.wordID).then(setWord);
    }
  }, [props.wordID]);

  useEffect(() => {
    if (props.word?.id !== undefined) {
      getUserNormalWord(localStorage.getItem('userId'), props.word?.id).then(
        (data) => {
          setAnswer(data);
        },
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
    getUserWords(localStorage.getItem('userId')).then(async (userWords) => {
      if (userWords.includes(wordId)) {
        const userWord = await getUserNormalWord(
          localStorage.getItem('userId'),
          wordId,
        );
        updateUserNormalWord(
          localStorage.getItem('userId'),
          wordId,
          userWord.optional.countRight,
          userWord.optional.countWrong,
          difficulty,
        );
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
        createUserNormalWord(
          localStorage.getItem('userId'),
          wordId,
          0,
          0,
          difficulty,
        );
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
    })
      .then(() => {
        getStatistics(localStorage.getItem('userId')).then(async (statArray: Stat[]) => {
          const easyWords = await getFullUserWords(localStorage.getItem('userId'));
          // console.log(statArray);
          if (statArray[statArray.length - 1]?.date === dataR) {
            // console.log('дата совпала');
            const statArr = [...statArray.slice(0, statArray.length - 1), {
              date: dataR,
              sprintRight: statArray[statArray.length - 1].sprintRight,
              sprintWrong: statArray[statArray.length - 1].sprintWrong,
              sprintMax: statArray[statArray.length - 1].sprintMax,
              audioCallRight: statArray[statArray.length - 1].audioCallRight,
              audioCallWrong: statArray[statArray.length - 1].audioCallWrong,
              audioCallMax: statArray[statArray.length - 1].audioCallMax,
              newWords: statArray[statArray.length - 1].newWords,
              easy: easyWords.length,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
            //   .then(() => {
            //   getStatistics(localStorage.getItem('userId')).then((statArray3: Stat[]) => {
            //     console.log(statArray3);
            //   });
            // });
          } else {
            // console.log('дата  НЕ совпала', dataR, statArray[statArray.length - 1]?.date);
            const statArr = [...statArray.slice(0, statArray.length), {
              date: dataR,
              sprintRight: statArray[statArray.length - 1].sprintRight,
              sprintWrong: statArray[statArray.length - 1].sprintWrong,
              sprintMax: statArray[statArray.length - 1].sprintMax,
              audioCallRight: statArray[statArray.length - 1].audioCallRight,
              audioCallWrong: statArray[statArray.length - 1].audioCallWrong,
              audioCallMax: statArray[statArray.length - 1].audioCallMax,
              newWords: statArray[statArray.length - 1].newWords,
              easy: easyWords.length,
            }];
            updateStatistics(localStorage.getItem('userId'),
              statArr,
            );
            // .then(() => {
            //   getStatistics(localStorage.getItem('userId')).then((statArray3: Stat[]) => {
            //     console.log(statArray3);
            //   });
            // });
          }
        });
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
              props.onChangeDifficulty(props.word.id, 'hard');
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
                  props.onChangeDifficulty(props.word.id, 'easy');
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
      <div className='statistics'>
        {' '}
        <p className='text_book__word-title'>Ответы в играх:</p>
        <span className={props.color}>
          Правильных ответов:<b>{answer?.optional?.countRight || 0}</b>
        </span>{' '}
      </div>

      <div className=''>
        <div>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default TextBookWord;
