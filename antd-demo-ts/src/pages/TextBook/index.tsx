import TextBookHeader from './components/header';
import TextBookTitle from './components/main/title';
import TextBookLevels from './components/main/levels';
import TextBookPagination from './components/main/pagination';
import TextBookWordsContainer from './components/main/words';
import { useState } from 'react';

function AppTextBook() {
  const mainWrapper = document.getElementById('app-header') as HTMLElement;
  if (mainWrapper !== null && !mainWrapper.classList.contains('hidden')) {
    mainWrapper.classList.add('hidden');
  }
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(0);

  return (
    <div className='text_book' id='text_book'>
      <TextBookHeader></TextBookHeader>
      <TextBookTitle
        title='Учебник'
        subtitle='Словарь'
        text='Уровни сложности слов'
        nameClass='fas fa-brain'
      ></TextBookTitle>
      <TextBookLevels onClick={setGroup}></TextBookLevels>
      <TextBookTitle
        title='Слова'
        subtitle=''
        text=''
        nameClass=''
      ></TextBookTitle>
      <TextBookWordsContainer page={page} group={group} />
      <TextBookPagination onClick={setPage} page={page} />
      <TextBookTitle
        title='Игры'
        subtitle=''
        text='Закрепи новые знания с помощью увлекательных игр'
        nameClass=''
      />
    </div>
  );
}

export default AppTextBook;
