import { useEffect, useState } from 'react';
import { getOneWord } from '../../../../../services/APIService';
import { CardComponentProps } from './word-card';
import { getUserNormalWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  setActive: any;
  active: any;
  word: CardComponentProps | null;
  wordId: string | null;
  onClick: any;
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
        setAnswer,
      );
    }
  }, [props.word]);

  if (!word) {
    return null;
  }

  console.log(answer.difficulty);
  return (
    <div
      className='text__book_word_wrapper'
      onClick={() => {
        props.setActive(props.id);
      }}
    >
      <div
        className={`text__book_word ${
          props.active ? `active-${props.color}` : ''
        }`}
        id={props.id}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <p>{word.word}</p>

        <p className='text__book_word_translate'>{word.wordTranslate}</p>

        {props.word?.difficulty === 'easy' ||
          (answer?.difficulty === 'easy' && <span className='learned'></span>)}
        {props.word?.difficulty === 'hard' && (
          <span className='difficult'></span>
        )}
      </div>
    </div>
  );
}

export default TextBookWordList;
