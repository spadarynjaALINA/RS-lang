import TextBookWordList from './wordList';

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
