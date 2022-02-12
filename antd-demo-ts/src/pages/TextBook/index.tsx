import TextBookHeader from './components/header';
import TextBookTitle from './components/main/title';
import TextBookLevels from './components/main/levels';
import TextBookPagination from './components/main/pagination';
import TextBookWordsContainer from './components/main/words';
import { useState } from 'react';
import TextBookGameCards, { TextBookGameArea } from './components/main/game';

function AppTextBook(props: any) {
  const mainWrapper = document.getElementById('app-header') as HTMLElement;
  if (mainWrapper !== null && !mainWrapper.classList.contains('hidden')) {
    mainWrapper.classList.add('hidden');
  }
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(0);

  return (
    <div className='text_book' id='text_book'>
      <TextBookTitle
        title='Учебник'
        subtitle='Словарь'
        text='Уровни сложности слов'
        nameClass='fas fa-brain'
      />
      <TextBookLevels onClick={setGroup} accessToken={props.accessToken} />
      <TextBookTitle title='Слова' subtitle='' text='' nameClass='' />
      <TextBookWordsContainer
        page={page}
        group={group}
        accessToken={props.accessToken}
      />
      <TextBookPagination onClick={setPage} page={page} />
      <TextBookTitle
        title='Игры'
        subtitle=''
        text='Закрепи новые знания с помощью увлекательных игр'
        nameClass=''
      />
      <TextBookGameArea />
    </div>
  );
}

export default AppTextBook;
