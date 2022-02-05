/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { getWords } from '../../../../../handlers';
import TextBookWordList from './wordList';

import { Word } from '../../../../../interfaces';

getWords();

function TextBookWordsContainer() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords().then((data) => {
      setWords(data);
    });
  }, []);

  return (
    <div className='text__book_word-container'>
      <div className='text__book_word-greed'>
        {words.map((word: Word) => (
          <span className='text__book_word'>{word.word}</span>
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
