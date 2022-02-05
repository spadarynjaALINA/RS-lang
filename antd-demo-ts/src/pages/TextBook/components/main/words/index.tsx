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
        {[...Array(20)].map((_, i) => (
          <TextBookWordList key={i} />
        ))}
        {words.map((word: Word) => {
          <div className='text__book_word_one'>{word.word}</div>;
        })}
      </div>
      <div className='text__book_word-details'></div>
    </div>
  );
}

export default TextBookWordsContainer;
