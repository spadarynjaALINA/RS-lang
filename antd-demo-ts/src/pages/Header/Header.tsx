import React from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css'
import Authorization from './Authorization/Authorization'
import { Link } from 'react-router-dom';

interface IBtnMenu {
  title: string,
  to: string
}

function Header() {
  const menuBtnData:IBtnMenu[] = [
    { title: 'Учебник',  to: '/Учебник'},
    { title: 'Миниигры',to: '/Миниигры' },
    { title: 'Статистика', to: '/Статистика' }
  ]
   
 
  return (
    
    <header className="Header"><div className='logo-rs-lang'><Link className='logo-rs-lang link-logo' to="/"></Link> </div> 
      
      <Navigation menuBtnData={menuBtnData} />    
        <Authorization />
       
    </header>
   
  );
}

export default Header;

