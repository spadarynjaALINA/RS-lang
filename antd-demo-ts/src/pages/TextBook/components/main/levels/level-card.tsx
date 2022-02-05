export interface StandardComponentProps {
  level?: string;
  description: string;
}

function TextBookLevelsCard(props: any) {
  return (
    <button className='text_book__level_card' onClick={props.onClick}>
      <div className='left-part'>{props.description}</div>
      <div className='square-part'></div>
      <div className='right-part'>{props.level}</div>
    </button>
  );
}

export default TextBookLevelsCard;
