import { MouseEvent, useEffect, useState } from 'react';
import { getOneWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  setActive: any;
  active: any;
  word: any | null;
  wordId: string | null;
  onClick: any;
  id: any;
  group: number | boolean;
  color: string;
}

function TextBookWordList(props: StandardComponentProps) {
  const [word, setWord] = useState(props.word);

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

  useEffect(() => {
    if (props.wordId) {
      getOneWord(props.wordId).then(setWord);
    }
  }, [props.wordId]);

  if (!word) {
    return null;
  }

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
        {(props.word?.learned && <span className='learned'></span>) ||
          (props.word?.difficult && <span className='difficult'></span>)}
      </div>
    </div>
  );
}

export default TextBookWordList;
