import React from 'react';
import logo from '../../img/logo.png';

import { Button } from 'antd';

function TextBookHeader() {
  return (
    <div className='text_book__header_wrapper'>
      <div className='text_book__header'>
        <div className='icon-text'>
          <img className='menu-burger' src={logo}></img>
          <div>SpaceEng.</div>
        </div>
        <Button type='primary' shape='circle'>
          Вход
        </Button>
      </div>
    </div>
  );
}

export default TextBookHeader;
