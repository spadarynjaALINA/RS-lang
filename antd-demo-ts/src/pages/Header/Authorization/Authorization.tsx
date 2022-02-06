import React from 'react';
import './Authorization.css'
import { Button } from 'antd';

function Authorization() {
  return (   
     <Button type='ghost' className='Authorization' onClick={()=>console.log('click')}> </Button>
  );
}

export default Authorization;