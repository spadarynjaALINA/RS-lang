import { useEffect, useState } from 'react';
import { getOneWord, getUserWord } from '../../../../../services/APIService';
import { CardComponentProps } from './word-card';
import { getUserNormalWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  setActive: any;
  active: any;
  word: CardComponentProps | null;
  wordId: string | null;
  onClick: any;
  onChangeDifficulty: any;
  id: any;
  group: number | boolean;
  color: string;
}

function TextBookWordList(props: StandardComponentProps) {
  const [word, setWord] = useState(props.word);
  const [answer, setAnswer] = useState<any>([]);

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

  useEffect(() => {
    if (props.wordId) {
      getOneWord(props.wordId).then(setWord);
    }
  }, [props.wordId]);

  useEffect(() => {
    if (props.word?.id !== undefined) {
      getUserNormalWord(localStorage.getItem('userId'), props.word?.id).then(
        (data) => {
          setAnswer(data);

          props.onChangeDifficulty(props.word?.id, data?.difficulty);
        },
      );
    }
  }, [props.word]);

  if (!word) {
    return null;
  }

  return (
    <div
      className={
        props.group !== 6
          ? 'text__book_word_wrapper'
          : 'text__book_word_wrapper_group6'
      }
      onClick={() => {
        props.setActive(props.id);
      }}
    >
      <div
        className={
          props.group !== 6
            ? `text__book_word ${props.active ? `active-${props.color}` : ''}`
            : `text__book_word_group6 ${
                props.active ? `active-${props.color}` : ''
              }`
        }
        id={props.id}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <p>{word.word}</p>

        <p className='text__book_word_translate'>{word.wordTranslate}</p>

        {word?.difficulty === 'easy' && <span className='learned'></span>}
        {props.word?.difficulty === 'easy' && <span className='learned'></span>}

        {props.word?.difficulty === 'hard' && (
          <span className='difficult'></span>
        )}
      </div>
    </div>
  );
}

export default TextBookWordList;
