import React, { useEffect, useState } from 'react';

import StartPageAudioCall from '../StartPageAudioCall/StartPageAudioCall';
import { QuestionsPageAudioCall } from '../QuestionsPageAudioCall/QuestionsPageAudioCall';

function AudioCallGame() {
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
               page={page}
              isActive={isActive}
            />
          )
      }
    </div>
  );
}

export default AudioCallGame;
