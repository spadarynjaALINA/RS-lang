import TextBookLevelsCard from './level-card';

function TextBookLevels(props: any) {
  const deleteActive = () => {
    const actives = document.getElementsByClassName('text__book_word') as any;
    [...actives].forEach((element: any) => {
      element.classList.remove(`active-${props.color}`);
    });
    const active = document.getElementById('0');
    active?.classList.add(`active-${props.color}`);
  };
  return (
    <div className='text_book__levels'>
      <TextBookLevelsCard
        active=''
        level='A1'
        description='Easy'
        color='yellow'
        onClick={() => {
          props.onClick(0);
          deleteActive();
          
        }}
      />
      <TextBookLevelsCard
        active=''
        level='A2'
        description='Easy'
        color='green'
        onClick={() => {
          props.onClick(1);
          deleteActive();
        }}
      />
      <TextBookLevelsCard
        active=''
        level='B1'
        description='Medium'
        color='blue'
        onClick={() => {
          props.onClick(2);
          deleteActive();
        }}
      />
      <TextBookLevelsCard
        active=''
        level='B2'
        description='Medium'
        color='pink'
        onClick={() => {
          props.onClick(3);
          deleteActive();
        }}
      />
      <TextBookLevelsCard
        active=''
        level='C1'
        description='Hard'
        color='violet'
        onClick={() => {
          props.onClick(4);
          deleteActive();
        }}
      />

      <TextBookLevelsCard
        active=''
        level='C2'
        description='Hard'
        color='aqua'
        onClick={() => {
          props.onClick(5);
          deleteActive();
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
            deleteActive();
          }}
        />
      )}
    </div>
  );
}

export default TextBookLevels;
