import React from 'react';
import StartPageGameSprint from './components/main';
import GameField from './components/main/GameField';

function SprintGame() {
  return (
    <div>
      <StartPageGameSprint/>
      <br />
      <GameField />
    </div>
  )
}

export default SprintGame;