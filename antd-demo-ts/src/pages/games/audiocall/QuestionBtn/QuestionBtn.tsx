import React, { useState } from 'react';
import { Button } from 'antd';

interface ILevelButton {
  show?:any
  text: string;
  hide?: any
  onClick: any
  key: string
  className?: string
  style?: any
  isTrue:boolean
}

export function QuestionButton(props: ILevelButton) {
  const [isClick, setIsClick] = useState(false);
  const red = {
    background: 'red',
  };
  const green = {
    background: 'green',
  };
  const black = {
    background:'none',
  };
  return (
    <Button ghost shape="round" className="level-button" style={isClick &&  (props.isTrue ? green : red) || black}
      onClick={() => {
        setIsClick(true);
        props.onClick();
      }}>{props.text}</Button>
  );
}