import React from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css'
import Authorization from './Authorization/Authorization'
import { Link } from 'react-router-dom';
import Context from './../../Context'
import { Modal } from 'antd';

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
   
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Тут будет форма для входа');
 
  const showModal = ():void => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
    const handleOk = () => {
    setModalText('Выполняется вход');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  return (
    
    <Context.Provider value ={{showModal}}> <header className="Header"><div className='logo-rs-lang'><Link className='logo-rs-lang link-logo' to="/"></Link> </div> 
      
      <Navigation menuBtnData={menuBtnData} />    
        <Authorization />
     <Modal
        title="Вход"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{ modalText}</p>
      </Modal>
    </header></Context.Provider>
   
   
  );
   
}

export default Header;

