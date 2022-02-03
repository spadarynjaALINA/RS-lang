import TextBookWord from './word-card';
import WordGreedContainer from './wordList';
import TextBookWordList from './wordList';

function TextBookWordsContainer() {
  return (
    <div className='text__book_word-container'>
      <TextBookWordList></TextBookWordList>
      <div className='text__book_word-details'></div>
    </div>
  );
}

export default TextBookWordsContainer;
