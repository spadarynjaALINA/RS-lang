import React, { useState, useEffect } from 'react';
import StartPageGameSprint from './components/main/StartPageGameSprint';
import GameField from './components/main/GameField';

function SprintGame() {
  const [isStartPage, setIsStartPage] = useState(true);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('textbook')) {
      setPage(+(localStorage.getItem('page') as string));
      setGroup(+(localStorage.getItem('group') as string));
    } else {
      setPage(30);
    }
  }, []);

  return (
    <div className='GamesWrap'>
      {
        isStartPage ?
          <StartPageGameSprint
            onClick1={setIsStartPage}
            onClick2={setGroup}
            onClick3={setIsActive}
          />
          : <GameField
            group={group}
            page={page}
            isActive={isActive} />
      }
    </div>
  );
}

export default SprintGame;