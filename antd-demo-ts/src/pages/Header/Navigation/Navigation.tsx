import React from 'react';
import NavItem from '../../../components/NavItem';
import './Navigation.css'
interface IBtnMenu {
  title: string,
   to:string
}



function Navigation(props: { menuBtnData: IBtnMenu[]; }) {
  
  return (

    <nav className="Navigation">
      <ul className='nav-list'>
        {props.menuBtnData.map((btn, index, links) => {
          return <NavItem btn={btn} key={index}/>
       })}
        
     </ul>
    </nav>
  );
}

export default Navigation;