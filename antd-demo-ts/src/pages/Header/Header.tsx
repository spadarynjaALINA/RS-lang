import React from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css'
import Authorization from './Authorization/Authorization'
interface IBtnMenu {
  title:string
}

function Header() {
  const menuBtnData:IBtnMenu[] = [
    { title: 'Учебник' },
    { title: 'Миниигры' },
    { title: 'Статистика' }
  ]
   
  
  return (
    <header className="Header">
    <div className='logo-rs-lang'></div> 
   
      <Navigation menuBtnData={menuBtnData} />    
   
     <Authorization/>
    </header>
  );
}

export default Header;