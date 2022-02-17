import { MouseEvent, useEffect, useState } from 'react';
import { getOneWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  word: any | null;
  wordId: string | null;
  onClick: any;
  id: any;
}
const arrActiveBtn: Array<HTMLElement> = [];
const onClick = (e: React.MouseEvent) => {
  arrActiveBtn.forEach((el) => {
    el.classList.remove('active');
  });
  const target = e.currentTarget as HTMLElement;
  arrActiveBtn.push(target);
  target.classList.add('active');
};

/*function addToDifficult(e: MouseEvent) {
  let target = e.currentTarget;
  let btn = document.getElementById('add-to-hard');
  btn?.addEventListener('click', () => {
    if (!target.classList.contains('learned')) {
      target.classList.add('difficult');
    }
  });
}*/

/*function addToLearned(data: any) {
  let btn = document.getElementById('delete-word');
  btn?.addEventListener('click', () => {
    data.classList.add('learned');
  });
}*/

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
    <div className='text__book_word_wrapper' id={props.id} onClick={onClick}>
      <div
        className='text__book_word'
        id={props.id}
        onClick={(e) => {
          props.onClick(props.id);
          //addToDifficult(e);
        }}
      >
        <p>{word.word}</p>
        <p className='text__book_word_translate'>{word.wordTranslate}</p>
      </div>
    </div>
  );
}

export default TextBookWordList;
