import TextBookLevelsCard from './level-card';

function TextBookLevels(props: any) {
  return (
    <div className='text_book__levels'>
      <TextBookLevelsCard
        id='1'
        level='A1'
        description='Easy'
        onClick={() => props.onClick(1)}
      />
      <TextBookLevelsCard
        level='A2'
        description='Easy'
        id='2'
        onClick={() => props.onClick(2)}
      />
      <TextBookLevelsCard
        level='B1'
        description='Medium'
        id='3'
        onClick={() => props.onClick(3)}
      />
      <TextBookLevelsCard
        level='B2'
        description='Medium'
        id='4'
        onClick={() => props.onClick(4)}
      />
      <TextBookLevelsCard
        level='C1'
        description='Hard'
        id='5'
        onClick={() => props.onClick(5)}
      />
      <TextBookLevelsCard
        level='C2'
        description='Hard'
        id='5'
        onClick={() => props.onClick(6)}
      />
    </div>
  );
}

export default TextBookLevels;
