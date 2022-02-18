import { useState } from 'react';
import TextBookLevelsCard from './level-card';

function TextBookLevels(props: any) {
  const [activeLevelId, setActiveLevel] = useState(0);

  return (
    <div className='text_book__levels'>
      <TextBookLevelsCard
        level='A1'
        description='Easy'
        color='yellow'
        active={activeLevelId === 0}
        onClick={() => {
          props.onClick(0);
          setActiveLevel(0);
        }}
      />
      <TextBookLevelsCard
        level='A2'
        description='Easy'
        color='green'
        active={activeLevelId === 1}
        onClick={() => {
          props.onClick(1);
          setActiveLevel(1);
        }}
      />
      <TextBookLevelsCard
        level='B1'
        description='Medium'
        color='blue'
        active={activeLevelId === 2}
        onClick={() => {
          props.onClick(2);
          setActiveLevel(2);
        }}
      />
      <TextBookLevelsCard
        level='B2'
        description='Medium'
        color='pink'
        active={activeLevelId === 3}
        onClick={() => {
          props.onClick(3);
          setActiveLevel(3);
        }}
      />
      <TextBookLevelsCard
        level='C1'
        description='Hard'
        color='violet'
        active={activeLevelId === 4}
        onClick={() => {
          props.onClick(4);
          setActiveLevel(4);
        }}
      />

      <TextBookLevelsCard
        level='C2'
        description='Hard'
        color='aqua'
        active={activeLevelId === 5}
        onClick={() => {
          props.onClick(5);
          setActiveLevel(5);
        }}
      />

      {props.accessToken && (
        <TextBookLevelsCard
          level='D.W'
          description='Difficult'
          color='gray'
          active={activeLevelId === 6}
          onClick={() => {
            props.onClick(6);
            setActiveLevel(6);
          }}
        />
      )}
    </div>
  );
}

export default TextBookLevels;
