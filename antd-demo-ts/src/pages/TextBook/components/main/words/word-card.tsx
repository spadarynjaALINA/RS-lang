import React from "react";
import './word-card.css';

export interface CardComponentProps {
  word: {
    audio: string;
    audioExample: string;
    audioMeaning: string;
    // group: number;
    id: string;
    image: string;
    // page: number;
    textExample: string;
    textExampleTranslate: string;
    textMeaning: string;
    textMeaningTranslate: string;
    transcription: string;
    word: string;
    wordTranslate: string;
  }
}

function TextBookWord(props: CardComponentProps) {
  if (props === undefined) throw new Error('error');
  let audio: HTMLAudioElement;
  audio = new Audio();
  function playAudio() {
    
    if (!audio.paused) {
      audio.pause();
      return;
    }
    const srcs = [props.word?.audio, props.word?.audioMeaning, props.word?.audioExample];
    let current = 0;
    // if(!audio.paused) audio.pause();
    audio.src = `https://rs-lang-app-rss.herokuapp.com/${srcs[current]}`;
    audio.play();
    audio.onended = function () {  
      current++;    
      if (current === srcs.length) {
        return;
      }
      audio.src = `https://rs-lang-app-rss.herokuapp.com/${srcs[current]}`;
      audio.play(); 
    }   
  }
  return <div className='text_book__word'>
    <img src={`https://rs-lang-app-rss.herokuapp.com/${props.word?.image}`} alt="
associative picture" className="text_book__word-image" />
    <p className="text_book__word-word">{ props.word?.word }</p>
    <p className="text_book__word-translate">{ props.word?.wordTranslate }</p>
    <div className="text_book__word-transcription-audio-button">
      <p className="text_book__word-transcription">{ props.word?.transcription }</p>
      <button className="text_book__word-audio-button" onClick={playAudio}>
        <svg className="svg-sound" focusable='false' viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
        </svg>
      </button>
    </div>
    <p className="text_book__word-title">Значение</p>
    <p className="text_book__word-text-meaning"dangerouslySetInnerHTML={{__html: props.word?.textMeaning}}/>
    <p className="text_book__word-text-meaning-translate">{ props.word?.textMeaningTranslate }</p>
    <p className="text_book__word-title">Пример</p>
    <p className="text_book__word-text-example" dangerouslySetInnerHTML={{__html: props.word?.textExample}}/>
    <p className="text_book__word-text-example-translate">{ props.word?.textExampleTranslate }</p>
  </div>;
}

export default TextBookWord;
