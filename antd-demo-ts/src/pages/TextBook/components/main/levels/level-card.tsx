export interface StandardComponentProps {
  level: string;
  description: string;
  color: string;
  active: string;
  onChange: any;
}

function TextBookLevelsCard(props: any) {
  return (
    <button
      className='text_book__level_card'
      onClick={props.onClick}
      onChange={props.onChange}
    >
      <div className='left-part'>{props.description}</div>
      <div className={`square-part ${props.color} ${props.active}`}></div>

      <div className='right-part'>{props.level}</div>
    </button>
  );
}

export default TextBookLevelsCard;
