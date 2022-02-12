import React, {useContext} from 'react';
import './Authorization.css'
import { Menu } from 'antd';
import Context from '../../../Context';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useLogin } from './Login/LoginContext';
function Authorization() {
  const { showModal } = useContext(Context)
  const {toggleLogin}=useLogin() 
  return (       
    <Menu className='Authorization'>
      <SubMenu key={'sub1'}>
        <Menu.Item className='sub1' key={2} onClick={toggleLogin}>Войти</Menu.Item>
        <Menu.Item className='sub2'key={3}onClick={()=>{showModal(2)}}>Зарегистрироваться</Menu.Item>
       <Menu.Item className='sub3'key={4}onClick={()=>{showModal(3)}}>Выйти</Menu.Item>       
     </SubMenu>      
    </Menu>    
  );
}

export default Authorization;
