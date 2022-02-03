export interface StandardComponentProps {
  level?: string;
  description: string;
}
function TextBookLevelsCard(props: StandardComponentProps) {
  return (
    <button className='text_book__level_card'>
      <div className='left-part'>{props.description}</div>
      <div className='square-part'></div>
      <div className='right-part'>{props.level}</div>
    </button>
  );
}

export default TextBookLevelsCard;
