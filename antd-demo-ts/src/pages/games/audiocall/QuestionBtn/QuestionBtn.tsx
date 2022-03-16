import React, { useState } from 'react';
import { Button } from 'antd';
import { getHeapCodeStatistics } from 'v8';

interface ILevelButton {
  show?:any
  text: string;
  hide?: any
  onClick: any
  key: string
  className?: string
  style?: any
  disabled?:boolean
  id:string
}

export function QuestionButton(props: ILevelButton) {
 
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
    <Button ghost id={props.id} shape="round" className="level-button" style={props.style}
      onClick={() => {
      
        props.onClick();
      }  } disabled={props.disabled}>{props.text}</Button>
  );
}