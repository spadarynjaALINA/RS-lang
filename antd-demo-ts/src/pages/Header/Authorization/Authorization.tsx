import { useEffect } from 'react';
import './Authorization.css';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useLogin } from './Login/LoginContext';
import { useCreateUser } from './CreatUser/CreateUserContext';
import { useExit } from './Exit/ExitContext';

function Authorization(props: any) {
  const { toggleExit } = useExit();
  const { toggleLogin } = useLogin();
  const { toggleCreateUser } = useCreateUser();

  return (
    <div className='authorization-area'>
      <Menu className={props.accessToken ? 'auth' : 'Authorization'}>
        <SubMenu key={'sub1'}>
          <Menu.Item className='sub1' key={2} onClick={toggleLogin}>
            Войти
          </Menu.Item>
          <Menu.Item className='sub2' key={3} onClick={toggleCreateUser}>
            Зарегистрироваться
          </Menu.Item>
          <Menu.Item className='sub3' key={4} onClick={toggleExit}>
            Выйти
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Authorization;
