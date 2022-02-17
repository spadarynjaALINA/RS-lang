import React, { useEffect } from 'react';
import './Start-page.css';

function StartPage() {
  useEffect(() => {
    localStorage.setItem('textbook', '');
  }, []);
  return (
    <div className="App-start">
      <div className="App-start__about">
        <p >
          тут что-то будет написано про приложение
        </p>
      </div>
     
      <div className="App-start__team">
     
        <p >
         тут что-то будет написано про команду
        </p>
      </div>
    </div>   
    
  );
}

export default StartPage;