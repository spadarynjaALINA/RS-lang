import React, {useState} from 'react';
import StartPageGameSprint from './components/main/StartPageGameSprint';
import GameField from './components/main/GameField';

function SprintGame() {
  const [isStartPage, setIsStartPage] = useState(true);
  const [group, setGroup] = useState(0);
  const [isActive, setIsActive] = useState(false);
  console.log(group);
  return (
    <div>
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
    </div>
  )
}

export default SprintGame;