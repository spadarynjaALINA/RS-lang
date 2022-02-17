import TextBookTitle from './components/main/title';
import TextBookLevels from './components/main/levels';
import TextBookPagination from './components/main/pagination';
import TextBookWordsContainer from './components/main/words';
import { useState, useEffect } from 'react';
import { TextBookGameArea } from './components/main/game';

function AppTextBook(props: any) {
  const mainWrapper = document.getElementById('app-header') as HTMLElement;
  if (mainWrapper !== null && !mainWrapper.classList.contains('hidden')) {
    mainWrapper.classList.add('hidden');
  }
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(0);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
    localStorage.setItem('group', group.toString());
  }, [page, group]);

  useEffect(() => {
    localStorage.setItem('textbook', 'true');
  }, []);

  let color = 'yellow';
  switch (group) {
    case 0:
      color = 'yellow';
      break;
    case 1:
      color = 'green';
      break;
    case 2:
      color = 'blue';
      break;
    case 3:
      color = 'pink';
      break;
    case 4:
      color = 'violet';
      break;
    case 5:
      color = 'aqua';

      break;
    case 6:
      color = 'grey';
  }

  return (
    <div className='text_book' id='text_book'>
      <TextBookTitle
        title='Учебник'
        subtitle='Словарь'
        text='Уровни сложности слов'
        nameClass='fas fa-brain'
      />
      <TextBookLevels
        onClick={setGroup}
        accessToken={props.accessToken}
        color={color}
      />
      <TextBookTitle title='Слова' subtitle='' text='' nameClass='' />
      <TextBookWordsContainer
        page={page}
        group={group}
        accessToken={props.accessToken}
        color={color}
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
