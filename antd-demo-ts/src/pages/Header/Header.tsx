import React from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css'
import Authorization from './Authorization/Authorization'
import { Link } from 'react-router-dom';
import Login from './Authorization/Login/Login'
import { LoginProvider } from './Authorization/Login/LoginContext'
import {CreateUserProvider} from './Authorization/CreatUser/CreateUserContext'
import RegistrationForm from './Authorization/CreatUser/CreateUser';
import {ExitProvider} from './Authorization/Exit/ExitContext'
import Exit from './Authorization/Exit/Exit';
interface IBtnMenu {
  title: string,
  to: string
}

function Header() {
  const menuBtnData:IBtnMenu[] = [
    { title: 'Учебник',  to: '/Учебник'},
    { title: 'Мини-игры',to: '/Мини-игры' },
    { title: 'Статистика', to: '/Статистика' }]  

  return (
    <LoginProvider>
       <CreateUserProvider>
     <ExitProvider>    
      <header className="Header" ><div className='logo-rs-lang'><Link className='logo-rs-lang link-logo' to="/"></Link> </div>       
        <Navigation menuBtnData={menuBtnData} />    
        <Authorization />
        <Login></Login>
        <RegistrationForm></RegistrationForm>
        <Exit></Exit>
    </header>
        </ExitProvider >
         </CreateUserProvider>
 </LoginProvider>
   
  );   
}

export default Header;



