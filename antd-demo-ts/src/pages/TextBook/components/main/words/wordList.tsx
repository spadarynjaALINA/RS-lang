export interface StandardComponentProps {
  word: string;
  id: string;
  translate: string;
  onClick: any;
}
//let arrActiveBtn: Array<HTMLElement> = [];
/*const onClick = (e: React.MouseEvent) => {
  arrActiveBtn.forEach((el) => {
    el.classList.remove('active');
  });
  const target = e.target as HTMLElement;
  arrActiveBtn.push(target);
  target.classList.add('active');
};*/

function TextBookWordList(props: StandardComponentProps) {
  return (
    <div
      className='text__book_word'
      id={props.id}
      onClick={() => props.onClick(props.id)}
    >
      <p>{props.word}</p>
      <p className='text__book_word_translate'>{props.translate}</p>
    </div>
  );
}

export default TextBookWordList;
