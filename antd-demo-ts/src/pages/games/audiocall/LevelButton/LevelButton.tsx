import React from "react";
import { Button } from 'antd'
import './LevelButton.css'
interface ILevelButton {
 group: string
 onClick1: any;
  onClick2:any
  text: string;
}

export function LevelButton(props: ILevelButton) {
  return (
      <Button ghost shape="round" className="level-button"
    onClick={() => {
     console.log('click')
     props.onClick1(props.group);
     props.onClick2();
    }
      
      
        }>{props.text}</Button>
  )
}