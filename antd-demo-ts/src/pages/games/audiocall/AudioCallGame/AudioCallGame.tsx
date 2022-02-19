import React, { useState } from 'react';

import StartPageAudioCall from '../StartPageAudioCall/StartPageAudioCall';
import { QuestionsPageAudioCall } from '../QuestionsPageAudioCall/QuestionsPageAudioCall';

function AudioCallGame() {
  const [isStartPage, setIsStartPage] = useState(true);
  const [group, setGroup] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <div className='game-wrap'>
      {
        isStartPage
          ? (
            <StartPageAudioCall
              onClick1={setIsStartPage}
              onClick2={setGroup}
              onClick3={setIsActive}
            />
          )
          : (
            <QuestionsPageAudioCall
              group={group}
              isActive={isActive}
            />
          )
      }
    </div>
  );
}

export default AudioCallGame;
