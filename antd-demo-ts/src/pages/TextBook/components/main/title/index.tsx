export interface StandardComponentProps {
  title?: string;
  subtitle?: string;
  text?: string;
  nameClass: string;
}

function TextBookTitle(props: StandardComponentProps) {
  return (
    <div className='text_book__title_wrapper'>
      <div className='text_book__title'>
        <span>{props.title}</span>
        <i className={props.nameClass}></i>
        <span>{props.subtitle}</span>
      </div>
      <div className='text_book__subtitle'>{props.text}</div>
    </div>
  );
}

export default TextBookTitle;
