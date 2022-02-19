import React, { useState, useEffect } from 'react';
import TextBookWord, { CardComponentProps } from './word-card';
import { getWords } from '../../../../../handlers';
import TextBookWordList from './wordList';
import {
  getUserWord,
  deleteWord,
  getHardWord,
} from '../../../../../services/APIService';

export interface StandardComponentProps {
  page: number;
  group: number;
  accessToken: any;
  color: string;
}

function TextBookWordsContainer(props: StandardComponentProps) {
  const [words, setWords] = useState([]);
  const [card, setCard] = useState(0);

  const [wordsForId, setWordsId] = useState([]);
  const [activeId, setActive] = useState(0);

  useEffect(() => {
    setCard(0);
    setActive(0);
  }, [props.group]);

  useEffect(() => {
    setActive(0);
    if (props.group !== 6) {
      getWords(props.group, props.page).then((data) => {
        setWords(data);

        setWordsId([]);
      });
    } else {
      getUserWord(localStorage.getItem('userId')).then((word: any) => {
        setWordsId(word);

        setWords([]);
      });
    }
  }, [props.page, props.group]);

  const onDelete = (wordId: string) => {
    deleteWord(localStorage.getItem('userId'), wordId).then(() => {
      setWordsId(wordsForId.filter((word) => word !== wordId));
    });
  };

  return (
    <div className='text__book_word-container'>
      <div className='text__book_word-greed'>
        {words.map((word: CardComponentProps, i) => (
          <TextBookWordList
            id={i}
            key={i}
            word={word}
            wordId={null}
            onClick={setCard}
            group={props.group}
            color={props.color}
            setActive={setActive}
            active={i === activeId}
          />
        ))}

        {wordsForId.map((wordId: any, i) => (
          <TextBookWordList
            id={i}
            key={i}
            word={null}
            wordId={wordId}
            onClick={setCard}
            group={props.group}
            color={props.color}
            setActive={setActive}
            active={i === activeId}
          />
        ))}
      </div>
      <div className='text__book_word-details'>
        {props.group !== 6 && (
          <TextBookWord
            word={words[card]}
            accessToken={props.accessToken}
            color={props.color}
          />
        )}
        {props.group === 6 && wordsForId.length !== 0 && (
          <TextBookWord
            wordID={wordsForId[card]}
            word={null}
            accessToken={props.accessToken}
            onDelete={onDelete}
            color={props.color}
          />
        )}
      </div>
    </div>
  );
}

export default TextBookWordsContainer;