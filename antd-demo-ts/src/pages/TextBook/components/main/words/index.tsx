import React, { useState, useEffect } from 'react';

import { getWords } from '../../../../../handlers';
import TextBookWordList from './wordList';

export interface Word {
  word: string;
  id: string;
  wordTranslate: string;
}
export interface StandardComponentProps {
  page: number;
  group: number;
}

function TextBookWordsContainer(props: StandardComponentProps) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords(props.group, props.page).then((data) => {
      setWords(data);
    });
  }, [props.page, props.group]);

  return (
    <div className='text__book_word-container'>
      <div className='text__book_word-greed'>
        {words.map((word: Word, i) => (
          <TextBookWordList
            key={i}
            word={word.word}
            id={word.id}
            translate={word.wordTranslate}
          />
        ))}
      </div>
      <div className='text__book_word-details'></div>
    </div>
  );
}

export default TextBookWordsContainer;

/*{[...Array(20)].map((_, i) => (
          <TextBookWordList key={i} />
        ))}*/
