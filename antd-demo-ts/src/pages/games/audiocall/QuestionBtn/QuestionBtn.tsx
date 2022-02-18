import React from 'react';
import { Button } from 'antd';

interface ILevelButton {
  show?:any
  text: string;
  hide?: any
  onClick: any
  key: string
  className?: string
  style?:any
}

export function QuestionButton(props: ILevelButton) {
  return (
    <Button ghost shape="round" className="level-button" style={props.style}
      onClick={()=>{props.onClick();} }>{props.text}</Button>
  );
}