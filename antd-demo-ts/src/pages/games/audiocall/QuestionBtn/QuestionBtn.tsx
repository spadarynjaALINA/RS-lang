import React from 'react';
import { Button } from 'antd';

interface ILevelButton {
  show?:any
  text: string;
  hide?:any
}

export function QuestionButton(props: ILevelButton) {
  return (
    <Button ghost shape="round" className="level-button"
      onClick={() => {
        props.show(true);
        console.log('click');
        props.hide(false);
      }
      
      
      }>{props.text}</Button>
  );
}