/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { JsxElement, setSyntheticLeadingComments } from 'typescript';
import { getWords } from '../../../../handlers';
import { LevelButton } from '../LevelButton/LevelButton';
import { QuestionButton } from '../QuestionBtn/QuestionBtn';
import { getRandomNum } from './../Random';
import ResultsWindow from 'src/pages/GameSprint/components/main/ResultsWindow';
import './QuestionPageAudioCall.css';
import { getUserWords, getFullUserWords } from 'src/services/APIService';
import { pushGameResults } from 'src/pages/GameSprint/utils/pushGameResults';
interface Word {
  word: string;
  wordTranslate: string;
  audio: string;
  transcription?: string;
  image?: any
  id: string
  difficulty?:string
}
interface Style {
  background:'string'
}
export function QuestionsPageAudioCall(props: { group: number, page: number, isActive: boolean }) {
 
  const [words, setWords] = useState([] as Word[]);
  const [showWord, setShowWord] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countQuestions, setCountQuestions] = useState(0);
  const [limitQuestions, setLimitQuestions] = useState(10);
  const [startCount, setStartCount] = useState(0);
  const [usedWords, setUsedWords] = useState<number[]>([]);
  const [btnWords, setBtnWords] = useState([] as number[]);
  const [getSort, setSort] = useState(true);  
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [page, setPage] = useState(props.page);
  const [totalScore, setTotalScore] = useState(0);
  const audio: HTMLAudioElement = new Audio(); 
  const [visible, setvisible] = useState(false);
  const [styled, setStyled] = useState([] as any[]);
  const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const orderWords = useMemo(() => {   
    let arr = [0, 1, 2, 3, 4];
    arr = arr.sort(() => Math.random() - .5).map(item => item + startCount);
    return arr;
  }, [getSort]);  
  const red = {
    background: 'red',
  };
  const green = {
    background: '#88d295',
  };
  const black = {
    background:'none',
  };
  useEffect(() => {    
    
    if (localStorage.getItem('textbook')) {
      let pageTemp = page;
      const func = async () => {
        const used = await getFullUserWords(localStorage.getItem('userId'));
        const result = await (getWords(props.group, page));
        let res: Word[] = result.filter((word: Word) => !used.includes(word.id));
        while (res.length < 5 && pageTemp > 1) { // вот тут мин количество слов для игры
            pageTemp -= 1;
            const prevPageWords = await getWords(props.group, pageTemp);
            const prevFiltered = prevPageWords.filter((word: Word) => !used.includes(word.id));
            res = [...res, ...prevFiltered];
          }

        console.log(used, '<-used', res, '<--filtered arr');
        if (res.length < 10)setLimitQuestions(res.length);
        res.sort(() => Math.random() - .5);
        const arr1 = res.slice(0, 10);
        const textbookArr = arr1.map((el:Word) => {
          const arr = [el];
          const arr2 = [...res].sort(() => Math.random() - .5).filter(e => e.id !== el.id);
          return arr.concat(arr2.slice(0, 4));
        });

        const textbookArr1 = textbookArr.flat(1);
        setWords(textbookArr1);
        console.log(textbookArr1);
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
  const arr: any = [];
  useEffect(() => {
    setStyled(arr);
  }, [visible]);
 
  function getButtons() {
   
    return (<div className='question-btn-wrap'>
      {words.length ? orderWords.map((i, index) => {
        if (words[orderWords[index]]?.wordTranslate === words[startCount].wordTranslate) { arr.push(green); } else {
          arr.push(black);
          
        }
        console.log(arr);
        return (<QuestionButton id={`answerBtn${index + 1}`} style={visible ? styled[index] : black} key={`question${index}`} text={`${index + 1} ${words[orderWords[index]]?.wordTranslate}`} disabled={ disabled}onClick={() => {
          setDisabled(true);
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
            arr[index] = red;
            setStyled(arr);
            console.log(styled, arr, '<---styled');
            setWrongAnswers([...wrongAnswers, {
              word: words[startCount]?.word,
              audio: words[startCount]?.audio,
              wordTranslate: words[startCount]?.wordTranslate,
              id: words[startCount]?.id,
            }]);
          } 
          
          console.log(arr);
          setvisible(true);
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
    if (countQuestions !== limitQuestions) playAudio(startCount);  
    if (countQuestions === limitQuestions)pushGameResults(correctAnswers, wrongAnswers);
  }, [words.length, getSort]);

  function changeAnswer(i: number) {
    if (!disabled) {
      setDisabled(true);
      if (words[orderWords[i]]?.wordTranslate === words[startCount].wordTranslate) {
            
        setCorrectAnswers([...correctAnswers, {
          word: words[startCount]?.word,
          audio: words[startCount]?.audio,
          wordTranslate: words[startCount]?.wordTranslate,
          id: words[startCount]?.id,
        }]);
           
        setTotalScore(totalScore + 1);
        setCountOfCorrectAnswers(countOfCorrectAnswers + 1);
      } else {
        arr[0] = red;
        setStyled(arr);
        console.log(styled, arr, '<---styled');
        setWrongAnswers([...wrongAnswers, {
          word: words[startCount]?.word,
          audio: words[startCount]?.audio,
          wordTranslate: words[startCount]?.wordTranslate,
          id: words[startCount]?.id,
        }]);
      } 
          
      console.log(arr);
      setvisible(true);
      setShowWord(true);
    }
  }
  const onKeydown = (e: KeyboardEvent) => {
    setTimeout(() => {
      if (e.code === 'ArrowRight') {
        if (countQuestions < limitQuestions) {
            
          setWrongAnswers([...wrongAnswers, {
            word: words[startCount]?.word,
            audio: words[startCount]?.audio,
            wordTranslate: words[startCount]?.wordTranslate,
            id: words[startCount]?.id,
          }]);
          setShowWord(true);
          setvisible(true);
          setDisabled(true);
        }
      } else if (e.code === 'Enter' || e.code === 'Space') {
        if (showWord) {
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          setDisabled(false);
          setvisible(false);
        }
      } else if (e.code === 'Digit1') {
        changeAnswer(0);
      } else if (e.code === 'Digit2') {
        changeAnswer(1);
      } else if (e.code === 'Digit3') {
        changeAnswer(2);
      } else if (e.code === 'Digit4') {
        changeAnswer(3);
      } else if (e.code === 'Digit5') {
        changeAnswer(4);
      }
        
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeydown);
    return () => {
      window.removeEventListener('keyup', onKeydown);
    };
  });

  return (
    <div  className = 'audioCall-wrap ' >      
      {!showModal && <div className='audio-wrap'>
        {showWord ? <img className='show-words-image' src={`https://rs-lang-app-rss.herokuapp.com/${words[startCount]?.image}`}></img> : <i className='fas fa-volume-up ' id = 'volumeAudioCall' onClick={() => { playAudio(startCount); }}></i>}
        {showWord && <div className='answer-wrap'>
          <p className='show-word'> <span className='answer'>{`${words[startCount]?.word}`} </span> {`${words[startCount]?.transcription} ${words[startCount]?.wordTranslate}` } </p>
        
        </div>}
      </div> }
      {(countQuestions === limitQuestions) ? <ResultsWindow
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        score = {totalScore}/>      
        : !!words.length && getButtons()}      
    
      {showWord ?       
        (!showModal && <button className='next-btn start-link' onClick={() => {         
          if (countQuestions < limitQuestions) {
            setCountQuestions(prev => prev + 1);
            setShowWord(false);
            setStartCount(prev => prev + 5);
            setSort(prev => !prev);
          }
          setDisabled(false);
          setvisible(false);
        }}>Следующий вопрос</button>) : (!!words.length && <button className='next-btn start-link' onClick={() => {
          if (countQuestions < limitQuestions) {
            
            setWrongAnswers([...wrongAnswers, {
              word: words[startCount]?.word,
              audio: words[startCount]?.audio,
              wordTranslate: words[startCount]?.wordTranslate,
              id: words[startCount]?.id,
            }]);
            setShowWord(true);
            setvisible(true);
            setDisabled(true);
          }
        }}>Не знаю</button>)}
    </div>
  );
 
}


