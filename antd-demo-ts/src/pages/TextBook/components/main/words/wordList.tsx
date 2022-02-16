import { MouseEvent, useEffect, useState } from 'react';
import { getOneWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  word: any | null;
  wordId: string | null;
  onClick: any;
  id: any;
  group: number | boolean;
  color: string;
}

/*
function addToDifficult(e: MouseEvent) {
  const target = e.currentTarget;
  const btn = document.getElementById('add-to-hard');
  btn?.addEventListener('click', () => {
    if (!target.classList.contains('learned')) {
      target.classList.add('difficult');
    }
  });
}

function addToLearned(e: MouseEvent) {
  const target = e.currentTarget;
  const btn = document.getElementById('delete-word');
  btn?.addEventListener('click', () => {
    target.classList.add('learned');
  });
}
*/

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

  const arrActiveBtn: Array<HTMLElement> = [];

  const showActive = (e: React.MouseEvent) => {
    document
      .getElementsByClassName(`active-${props.color}`)[0]
      .classList.remove(`active-${props.color}`);
    arrActiveBtn.forEach((el) => {
      el.classList.remove('active');
    });
    const target = e.currentTarget as HTMLElement;
    arrActiveBtn.push(target);
    target.classList.add(`active-${props.color}`);
  };

  return (
    <div className='text__book_word_wrapper'>
      <div
        className={
          props.id !== 0
            ? 'text__book_word'
            : `text__book_word active-${props.color}`
        }
        id={props.id}
        onClick={(e) => {
          props.onClick(props.id);
          showActive(e);
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
