import { useEffect, useState } from 'react';
import { getOneWord } from '../../../../../services/APIService';

export interface StandardComponentProps {
  word: any | null;
  wordId: string | null;
  onClick: any;
}
//let arrActiveBtn: Array<HTMLElement> = [];
/*const onClick = (e: React.MouseEvent) => {
  arrActiveBtn.forEach((el) => {
    el.classList.remove('active');
  });
  const target = e.target as HTMLElement;
  arrActiveBtn.push(target);
  target.classList.add('active');
};*/

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
    <div className='text__book_word'>
      <p>{word.word}</p>
      <p className='text__book_word_translate'>{word.wordTranslate}</p>
    </div>
  );
}

export default TextBookWordList;
