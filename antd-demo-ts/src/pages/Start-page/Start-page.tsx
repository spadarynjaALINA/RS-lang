
import React from 'react';
import { Link } from 'react-router-dom';
import './Start-page.css';

function StartPage() {

  return (
    <div className="App-start">
      <div className="App-start__about">
        <p >
          Запоминайте английские слова легко! Изучайте слова в учебнике и тренеруйтесь в мини-играх. Повторяйте каждый день для улучшения результатов.
        </p>
        <Link to='/about'>  <button>Подробнее</button></Link>
      </div>
     
      <div className="App-start__team">
     
        <p >
        Мы - команда начинающих разработчиков в рамках курса Rolling Scopes school JavaScript/Front-end представляем вам приложение для изучения английского языка написанное с помощью библиотеки React.
        </p>
        <Link to='/team'>  <button>Подробнее</button></Link>
      </div>
    </div>   

    
  );
}

export default StartPage;
