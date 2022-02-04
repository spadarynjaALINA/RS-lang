import React, { FC } from 'react';

import { Button } from 'antd';
import './NavItem.css';

interface IBtnMenu {
  title:string
}

const NavItem = (props: { btn: IBtnMenu })=> {
  return(
  <li className="NavItem">    
      <Button type='ghost' className='Nav-btn'>{props.btn.title }</Button>
    </li>  
)}

export default NavItem;