import { Statistic } from 'antd';
import { useEffect, useState } from 'react';

export function StatisticStart() {
  const [authorized, setAuthorized] = useState(localStorage.getItem('userId'));
  useEffect(() => {
    setAuthorized(localStorage.getItem('userId'));
  });
  return (
    <div > 
      {authorized ? <Statistic/> : <div></div> }
    </div>
  );
}