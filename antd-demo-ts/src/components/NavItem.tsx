import React, { FC } from 'react';

import { Button } from 'antd';
import './NavItem.css';
import { Link } from 'react-router-dom';


interface IBtnMenu {
  title: string,
  to:string
}


const NavItem = (props: { btn: IBtnMenu })=> {
  return (
    <li className="NavItem">    
      <Button type='ghost' className='Nav-btn'> <Link className='nav-link' to={props.btn.to}>{props.btn.title}</Link></Button>
     
    </li>  
  );
};

export default NavItem;