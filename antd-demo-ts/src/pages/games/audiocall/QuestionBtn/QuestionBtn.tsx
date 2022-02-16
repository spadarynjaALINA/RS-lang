import React from "react";
import { Button } from 'antd'

interface ILevelButton {
 
  text: string;
}

export function QuestionButton(props: ILevelButton) {
  return (
      <Button ghost shape="round" className="level-button"
    onClick={() => {
     console.log('click')
    
    }
      
      
        }>{props.text}</Button>
  )
}