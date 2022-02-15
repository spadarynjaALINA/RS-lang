import { useState, useEffect } from 'react';
import TextBookWord from './word-card';
import { getWords } from '../../../../../handlers';
import TextBookWordList from './wordList';
import { getUserWord, deleteWord } from '../../../../../services/APIService';

export interface Word {
  word: string;
  id: string;
  wordTranslate: string;
}
export interface StandardComponentProps {
  page: number;
  group: number;
  accessToken: any;
}

function TextBookWordsContainer(props: StandardComponentProps) {
  const [words, setWords] = useState([]);
  const [card, setCard] = useState(0);

  const [wordsForId, setWordsId] = useState([]);

  useEffect(() => {
    setCard(0);
  }, [props.group]);

  useEffect(() => {
    if (props.group !== 6) {
      getWords(props.group, props.page).then((data) => {
        setWords(data);
        setWordsId([]);
      });
    } else {
      getUserWord(localStorage.getItem('userId')).then((words: any) => {
        setWordsId(words);
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
        {words.map((word: Word, i) => (
          <TextBookWordList
            id={i}
            key={i}
            word={word}
            wordId={null}
            onClick={setCard}
          />
        ))}

        {wordsForId.map((wordId: any, i) => (
          <TextBookWordList
            id={i}
            key={i}
            word={null}
            wordId={wordId}
            onClick={setCard}
          />
        ))}
      </div>
      <div className='text__book_word-details'>
        {props.group !== 6 && (
          <TextBookWord word={words[card]} accessToken={props.accessToken} />
        )}
        {props.group === 6 && wordsForId.length !== 0 && (
          <TextBookWord
            wordID={wordsForId[card]}
            word={null}
            accessToken={props.accessToken}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

export default TextBookWordsContainer;
