import React, { useState, useEffect} from 'react';
import { getWords } from '../../../../handlers';
import { QuestionButton } from '../QuestionBtn/QuestionBtn';
import { getRandomNum } from './../Random'
import './QuestionPageAudioCall.css'
interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
}
export function QuestionsPageAudioCall(props: {group: number, isActive: boolean}) {
 const [words, setWords] = useState([] as Word[]);
 const [randomWord, setRandomWord] = useState(0);
 const [showModal, setShowModal] = useState(false);
 const [totalScore, setTotalScore] = useState(0);
 const [usedWords, setUsedWords] = useState<number[]>([]);
   useEffect(() => {
    setRandomWord(getRandomNum(0, 599));
    
   const arr = [];
    for (let i = 1; i <= 30; i++) {
      arr.push(getWords(props.group,1));
    }
    Promise.all(arr).then((data) => {
     setWords(data.flat());
     console.log(data)
    })
  }, []);
 return (
  <div className='audioCall-wrap'>
   <div className='audio-wrap'>
    <i className='fas fa-volume-up'></i>
   </div>

   <div className='question-btn-wrap'>
    <QuestionButton text='1'></QuestionButton>
    <QuestionButton text='2'></QuestionButton>
    <QuestionButton text='3'></QuestionButton>
    <QuestionButton text='4'></QuestionButton>
    <QuestionButton text='5'></QuestionButton>
   </div>
   {showModal? <div className='audioCall-wrap'>это модальное окно</div>:<div></div>}
   </div>
)
 
}
