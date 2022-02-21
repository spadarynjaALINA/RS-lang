
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
        <div className='start-btn-wrap'>
          <Link className='start' to='/about'>  <button className='nav-link start-link'>Подробнее о приложении</button></Link></div>
      </div>
     
      <div className="App-start__team">
     
        <p >
        Мы - команда начинающих разработчиков в рамках курса<b> Rolling Scopes school JavaScript/Front-end</b> представляем вам приложение для изучения английского языка написанное с помощью библиотеки <b>React</b>.
        </p>
        <div  className='start-btn-wrap'><Link className='start' to='/team'>  <button className='nav-link start-link' >Подробнее о нас</button></Link></div>
      </div>
    </div>   

    
  );
}

export default StartPage;
