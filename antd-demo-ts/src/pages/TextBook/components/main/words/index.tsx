import TextBookWordList from './wordList';
import { getWordsGroup } from '../../../../../services/APIService';
import { addWords } from './utils';

export const getWords = async () => {
  const response = await getWordsGroup();
  for (const words of response) {
    console.log(words.word);
    // addWords(words.word);
  }
};
getWords();

function TextBookWordsContainer() {
  return (
    <div className='text__book_word-container'>
      <div className='text__book_word-greed'>
        {[...Array(20)].map((_, i) => (
          <TextBookWordList key={i} />
        ))}
      </div>
      <div className='text__book_word-details'></div>
    </div>
  );
}

export default TextBookWordsContainer;
