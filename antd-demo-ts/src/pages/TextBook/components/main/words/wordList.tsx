export interface StandardComponentProps {
  word?: string;
}
let arrActiveBtn: Array<HTMLElement> = [];
const onClick = (e: React.MouseEvent) => {
  arrActiveBtn.forEach((el) => {
    el.classList.remove('active');
  });
  const target = e.target as HTMLElement;

  arrActiveBtn.push(target);
  target.classList.add('active');
};
function TextBookWordList(props: StandardComponentProps) {
  return (
    <div className='text__book_word' onClick={onClick}>
      {props.word}
    </div>
  );
}

export default TextBookWordList;
