import React from 'react';
import TextBookHeader from './header/header';
import TextBookTitle from './main/title';
import TextBookLevels from './main/levels';
import TextBookPagination from './main/pagination';
import TextBookWordsContainer from './main/wordContainer';

function AppTextBook() {
  const mainWrapper = document.getElementById('app-header') as HTMLElement;
  if (mainWrapper !== null && !mainWrapper.classList.contains('hidden')) {
    mainWrapper.classList.add('hidden');
  }

  return (
    <div className='text_book' id='text_book'>
      <TextBookHeader></TextBookHeader>
      <TextBookTitle
        title='Учебник'
        subtitle='Словарь'
        text='Уровни сложности слов'
        nameClass='fas fa-brain'
      ></TextBookTitle>
      <TextBookLevels></TextBookLevels>
      <TextBookTitle
        title='Слова'
        subtitle=''
        text=''
        nameClass=''
      ></TextBookTitle>
      <TextBookWordsContainer></TextBookWordsContainer>
      <TextBookPagination></TextBookPagination>
    </div>
  );
}

export default AppTextBook;
