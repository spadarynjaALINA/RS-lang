import TextBookLevelsCard from './level-card';

function TextBookLevels(props: any) {
  return (
    <div className='text_book__levels'>
      <TextBookLevelsCard
        active=''
        level='A1'
        description='Easy'
        color='yellow'
        onClick={() => {
          props.onClick(0);
        }}
      />
      <TextBookLevelsCard
        active=''
        level='A2'
        description='Easy'
        color='green'
        onClick={() => {
          props.onClick(1);
        }}
      />
      <TextBookLevelsCard
        active=''
        level='B1'
        description='Medium'
        color='blue'
        onClick={() => {
          props.onClick(2);
        }}
      />
      <TextBookLevelsCard
        active=''
        level='B2'
        description='Medium'
        color='pink'
        onClick={() => {
          props.onClick(3);
        }}
      />
      <TextBookLevelsCard
        active=''
        level='C1'
        description='Hard'
        color='violet'
        onClick={() => {
          props.onClick(4);
        }}
      />

      <TextBookLevelsCard
        active=''
        level='C2'
        description='Hard'
        color='aqua'
        onClick={() => {
          props.onClick(5);
        }}
      />

      {props.accessToken && (
        <TextBookLevelsCard
          active=''
          level='D.W'
          description='Difficult'
          color='gray'
          onClick={() => {
            props.onClick(6);
          }}
        />
      )}
    </div>
  );
}

export default TextBookLevels;
