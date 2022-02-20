/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { JsxElement } from 'typescript';
import { getWords } from '../../../../handlers';
import { LevelButton } from '../LevelButton/LevelButton';
import { QuestionButton } from '../QuestionBtn/QuestionBtn';
import { getRandomNum } from './../Random';
import ResultsWindow from 'src/pages/GameSprint/components/main/ResultsWindow';
import './QuestionPageAudioCall.css';
interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
  transcription?: string;
  image?: any
  id:string
}

export function QuestionsPageAudioCall(props: { group: number, page: number, isActive: boolean }) {
 
  const [words, setWords] = useState([] as Word[]);
  const [showWord, setShowWord] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countQuestions, setCountQuestions] = useState(0);
  const limitQuestions = 10;
  const [startCount, setStartCount] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [btnWords, setBtnWords] = useState([] as number[]);
  const [getSort, setSort] = useState(true);  
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [page, setPage] = useState(props.page);
  const [totalScore, setTotalScore] = useState(0);
  const audio: HTMLAudioElement = new Audio(); 
  const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(0);
  const orderWords = useMemo(() => {   
    let arr = [0, 1, 2, 3, 4];
    arr = arr.sort(() => Math.random() - .5).map(item => item + startCount);
    return arr;
  }, [getSort]);  
 
  useEffect(() => {    
    
    if (localStorage.getItem('textbook')) {
      const func = async () => {
        const textbookArr: Word[] = [];
        const res = await(getWords(props.group, page));          
        const data1 = res.sort(() => Math.random() - .5);
        console.log(res);
        for (let i = 0; i < 10; i++) {
          textbookArr.push(data1[i]);
          console.log(textbookArr);
          const data2 = res.sort(() => Math.random() - .5);
          const a = textbookArr.length;
          for (let j = 0; j < data2.length; i++) {
            if (textbookArr.length < (a + 4) && data1[i] !== data2[j]) {
              textbookArr.push(data2[j]);
            }
          }
                         
          console.log(textbookArr, a);
        }
        setWords(textbookArr);
        console.log(textbookArr, words, 'textbook');
         
      };
      func();
    } else {
      setWords([]);
      const func = async () => {
        const arr = [];    
        for (let i = 0; i <= 30; i++) {
          arr.push(getWords(props.group, i));
        }
        const res = await Promise.all(arr);
        setWords(res.flat().sort(() => Math.random() - .5));
      };

      func();
    }
    
  }, []); 
 
  function getButtons() {
     
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => {   
        
        return (<QuestionButton id={`answerBtn${index + 1}`} isTrue={words[orderWords[index]]?.wordTranslate === words[startCount].wordTranslate} key={`question${index}`} text={`${index + 1} ${words[orderWords[index]]?.wordTranslate}`} onClick={() => {
          if (words[orderWords[index]]?.wordTranslate === words[startCount].wordTranslate) {
            setCorrectAnswers([...correctAnswers, {
              word: words[startCount]?.word,
              audio: words[startCount]?.audio,
              wordTranslate: words[startCount]?.wordTranslate,
              id: words[startCount]?.id,
            }]);
            setTotalScore(totalScore + 1);
            setCountOfCorrectAnswers(countOfCorrectAnswers + 1);
          } else {
            setWrongAnswers([...wrongAnswers, {
              word: words[startCount]?.word,
              audio: words[startCount]?.audio,
              wordTranslate: words[startCount]?.wordTranslate,
              id: words[startCount]?.id,
            }]);
          }
          setShowWord(true);
        }}></QuestionButton>);
      }) : null}
    </div>);     
  }

  function playAudio(word: number) {  
    
    if (!audio.paused) {
      audio.pause();
      return;
    } 
    if (words.length) audio.src = `https://rs-lang-app-rss.herokuapp.com/${words[word].audio
    }`;
   
    audio.play();
  }
  useEffect(() => {
    if (countQuestions !== limitQuestions)  playAudio(startCount);  
  }, [words.length, getSort]);
 
  
  return (
    <div  className = 'audioCall-wrap' >      
      {!showModal && <div className='audio-wrap'>
        {showWord ? <img className='show-words-image' src={`https://rs-lang-app-rss.herokuapp.com/${words[startCount]?.image}`}></img> : <i className='fas fa-volume-up ' id = 'volumeAudioCall' onClick={() => { playAudio(startCount); }}></i>}
        {showWord && <div className='answer-wrap'>
          <p className='show-word'> {`${words[startCount]?.word}  ${words[startCount]?.transcription} `}</p>
          <p className='show-translate'>{`${words[startCount]?.wordTranslate}` }</p>
        </div>}
      </div> }
      {(countQuestions === limitQuestions) ? <ResultsWindow
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        score = {totalScore}/>
      
        : !!words.length && getButtons()}
      
    
      {showWord ?
       
        (!showModal && <button className='next-btn' onClick={() => {         
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          
        }}>Следующий вопрос</button>) : (!!words.length && <button className='next-btn' onClick={() => {
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            // nextQuestion();   
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);  
            setWrongAnswers([...wrongAnswers, {
              word: words[startCount]?.word,
              audio: words[startCount]?.audio,
              wordTranslate: words[startCount]?.wordTranslate,
              id: words[startCount]?.id,
            }]);
          }
        }}>Я не знаю правильный ответ</button>)}
    </div>
  );
 
}


