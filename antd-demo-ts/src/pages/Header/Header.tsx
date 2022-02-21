import React from 'react';
import { useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css';
import Authorization from './Authorization/Authorization';
import { Link } from 'react-router-dom';

import Context from './../../Context';
import { Modal } from 'antd';
import Login from './Authorization/Login/Login';
import { LoginProvider } from './Authorization/Login/LoginContext';
import { CreateUserProvider } from './Authorization/CreatUser/CreateUserContext';
import RegistrationForm from './Authorization/CreatUser/CreateUser';
import { ExitProvider } from './Authorization/Exit/ExitContext';
import Exit from './Authorization/Exit/Exit';
// import TextBookHeader from '../TextBook/components/header';

interface IBtnMenu {
  title: string;
  to: string;
}

function Header(props: any) {
  const menuBtnData: IBtnMenu[] = [
    { title: 'Учебник', to: '/textbook' },
    { title: 'Мини-игры', to: '/games' },
    { title: 'Статистика', to: '/statistic' },
  ];

  return (
    <>
      {/* <TextBookHeader accessToken={props.accessToken} /> */}
      <LoginProvider>
        <CreateUserProvider>
          <ExitProvider>
            <header className='header'>
              <Link className='logo-rs-lang link-logo' to='/'><div className='logo-area'>
                <div className=''>
                  <span className='logo-text'>JungleEng</span>
                </div>
                
              </div></Link>
              <Navigation menuBtnData={menuBtnData} />
              <Authorization accessToken={props.accessToken} />
              <Login></Login>
              <RegistrationForm></RegistrationForm>
              <Exit></Exit>
            </header>
          </ExitProvider>
        </CreateUserProvider>
      </LoginProvider>
    </>
  );
}

export default Header;
