import React from 'react';
import Navigation from './Navigation/Navigation';
import './Header.css';
import Authorization from './Authorization/Authorization';
import { Link } from 'react-router-dom';
import Context from './../../Context';
import { Modal } from 'antd';
import Login from './Authorization/Login.tsx/Login';
import CreateUser from './Authorization/CreatUser.tsx/CreateUser';
import TextBookHeader from '../TextBook/components/header';
interface IBtnMenu {
  title: string;
  to: string;
}

function Header(props: any) {
  const menuBtnData: IBtnMenu[] = [
    { title: 'Учебник', to: '/Учебник' },
    { title: 'Мини-игры', to: '/Мини-игры' },
    { title: 'Статистика', to: '/Статистика' },
  ];

  const [visible1, setVisible1] = React.useState(false);
  const [confirmLoading1, setConfirmLoading1] = React.useState(false);

  const [visible2, setVisible2] = React.useState(false);
  const [confirmLoading2, setConfirmLoading2] = React.useState(false);
  const [modalText2, setModalText2] = React.useState(
    'Тут будет форма для регистрации'
  );
  const [visible3, setVisible3] = React.useState(false);
  const [confirmLoading3, setConfirmLoading3] = React.useState(false);
  const [modalText3, setModalText3] = React.useState(
    'Тут будет форма для выхода'
  );

  const showModal = (v: number): void => {
    if (v === 1) {
      setVisible1(true);
    }
    if (v === 2) {
      setVisible2(true);
    }
    if (v === 3) {
      setVisible3(true);
    }
  };
  const handleCancel1 = () => {
    console.log('Clicked cancel button');
    setVisible1(false);
  };
  const handleOk1 = () => {
    setConfirmLoading1(true);
    setTimeout(() => {
      setVisible1(false);
      setConfirmLoading1(false);
    }, 2000);
  };

  const handleCancel2 = () => {
    console.log('Clicked cancel button');
    setVisible2(false);
  };
  const handleOk2 = () => {
    setModalText2('Выполняется регистрация');
    setConfirmLoading2(true);
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading2(false);
      setModalText2('Тут будет форма для регистрации');
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
  return (
    <>
      <TextBookHeader accessToken={props.accessToken} />
      <Context.Provider value={{ showModal }}>
        {' '}
        <header className='header'>
          <div className='logo-area'>
            <div className='logo-rs-lang'>
              <Link className='logo-rs-lang link-logo' to='/'></Link>{' '}
            </div>
            <span className='logo-text'>JungleEng</span>
          </div>
          <Navigation menuBtnData={menuBtnData} />
          <Authorization accessToken={props.accessToken} />
          <Modal
            title='Вход'
            visible={visible1}
            onOk={handleOk1}
            confirmLoading={confirmLoading1}
            onCancel={handleCancel1}
            footer={[]}
          >
            <Login onLogin={props.onLogin}></Login>
          </Modal>

          <Modal
            title='Регистрация'
            visible={visible2}
            onOk={handleOk2}
            confirmLoading={confirmLoading2}
            onCancel={handleCancel2}
          >
            <CreateUser></CreateUser>
          </Modal>

          <Modal
            title='Выход'
            visible={visible3}
            onOk={handleOk3}
            confirmLoading={confirmLoading3}
            onCancel={handleCancel3}
          >
            <p>{modalText3}</p>
          </Modal>
        </header>
      </Context.Provider>
    </>
  );
}

export default Header;
