import React, {useContext} from 'react';
import './Authorization.css'
import { Button, Menu, Modal } from 'antd';
import Context from '../../../Context';
import SubMenu from 'antd/lib/menu/SubMenu';

function Authorization() {
 const {showModal} = useContext(Context)
  return (   
    // <Button type='ghost' className='Authorization' onClick={() =>  ToggleUserMenu()
    //  }> </Button>
    <Menu className='Authorization'  >
      <SubMenu>
        <Menu.Item className='sub1' key={2} onClick={()=>{showModal(1)}}>Войти</Menu.Item>
        <Menu.Item className='sub2'key={3}onClick={()=>{showModal(2)}}>Зарегистрироваться</Menu.Item>
       <Menu.Item className='sub3'key={4}onClick={()=>{showModal(3)}}>Выйти</Menu.Item>
       
 </SubMenu>
      
    </Menu>
    
  );
}

export default Authorization;
