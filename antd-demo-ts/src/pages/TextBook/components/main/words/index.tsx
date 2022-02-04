/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import TextBookWordList from './wordList';
import { getWordsGroup } from '../../../../../services/APIService';

interface Word {
  word: string;
}
export const getWords = async () => {
  const data = await getWordsGroup();

  return data;
};
getWords();

function TextBookWordsContainer() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords().then((data) => {
      console.log(data[1]);
      setWords(data);
    });
  }, []);

  console.log(words);

  return (
    <div className='text__book_word-container'>
      <div className='text__book_word-greed'>
        {[...Array(20)].map((_, i) => (
          <TextBookWordList key={i} />
        ))}
        {words.map((word: Word) => {
          {
            console.log(word.word);
          }
          <b className='text__book_word_one'>{word.word}</b>;
        })}
      </div>
      <div className='text__book_word-details'></div>
    </div>
  );
}

export default TextBookWordsContainer;
