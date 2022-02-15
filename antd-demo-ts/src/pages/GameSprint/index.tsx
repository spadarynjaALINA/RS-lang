import React, {useState, useEffect} from 'react';
import StartPageGameSprint from './components/main/StartPageGameSprint';
import GameField from './components/main/GameField';

function SprintGame() {

  // useEffect(() => {
  //   localStorage.setItem('textbook', '');
  // }, [])

  const [isStartPage, setIsStartPage] = useState(true);
  const [group, setGroup] = useState(0);
  const [isActive, setIsActive] = useState(false);
  console.log(group);
  return (
    <div>
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
            isActive={ isActive }/>
      }
    </div></div>
  )
}

export default SprintGame;