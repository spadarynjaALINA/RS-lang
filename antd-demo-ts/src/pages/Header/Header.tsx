import React, { useContext } from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css'
import Authorization from './Authorization/Authorization'
import { Link } from 'react-router-dom';
import Context from './../../Context'
import { Modal } from 'antd';
import Login from './Authorization/Login/Login'
import CreateUser from './Authorization/CreatUser.tsx/CreateUser'
import { useLogin } from './Authorization/Login/LoginContext'
import {LoginProvider} from './Authorization/Login/LoginContext'
interface IBtnMenu {
  title: string,
  to: string
}

function Header() {
  const menuBtnData:IBtnMenu[] = [
    { title: 'Учебник',  to: '/Учебник'},
    { title: 'Мини-игры',to: '/Мини-игры' },
    { title: 'Статистика', to: '/Статистика' }
  ]
  
  const [visible2, setVisible2] = React.useState(false);
  const [confirmLoading2, setConfirmLoading2] = React.useState(false); 
  const [visible3, setVisible3] = React.useState(false);
  const [confirmLoading3, setConfirmLoading3] = React.useState(false);
  const [modalText3, setModalText3] = React.useState('Тут будет форма для выхода');
  const showModal = (v: number): void => {
   // if (v === 1) { setVisible1(true) };
    if (v === 2) { setVisible2(true) };
     if(v===3){ setVisible3(true)};  
  };
 
   const handleCancel2 = () => {
    console.log('Clicked cancel button');
    setVisible2(false);
  };
    const handleOk2 = () => {    
    setConfirmLoading2(true);
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading2(false);
      
    }, 2000);
  };
   const handleCancel3 = () => {
    console.log('Clicked cancel button');
    setVisible3(false);
  };
    const handleOk3 = () => {
    setModalText3('Выполняется выход');
    setConfirmLoading3(true);
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading3(false);
      setModalText3('Тут будет форма для выхода');
    }, 1000);
  };
  const {toggleLogin} = useLogin()
  return (
    <LoginProvider>
     <Context.Provider value ={{showModal}}>    
      <header className="Header" ><div className='logo-rs-lang'><Link className='logo-rs-lang link-logo' to="/"></Link> </div>       
      <Navigation menuBtnData={menuBtnData} />    
        <Authorization />
      <Login></Login>
       <Modal
        title="Регистрация"
        visible={visible2}
        onOk={handleOk2}
        confirmLoading={confirmLoading2}
        onCancel={handleCancel2}
      >
        <CreateUser></CreateUser>
      </Modal>

       <Modal
        title="Выход"
        visible={visible3}
        onOk={handleOk3}
        confirmLoading={confirmLoading3}
        onCancel={handleCancel3}
      >
        <p>{ modalText3}</p>
        </Modal>
    </header>
      </Context.Provider >
 </LoginProvider>
   
  );
   
}

export default Header;



