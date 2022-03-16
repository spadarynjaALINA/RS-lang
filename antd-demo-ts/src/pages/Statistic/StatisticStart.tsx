import { Statistic } from 'antd';
import { useEffect, useState } from 'react';

export function StatisticStart() {
  const [authorized, setAuthorized] = useState(localStorage.getItem('userId'));
  useEffect(() => {
    setAuthorized(localStorage.getItem('userId'));
  });
  return (
    <div className='statistic-start'> 
      <h2>Статистика доступна только для зарегистрированных пользователей</h2>
      <p>Пожалуйста, войдите в аккаунт или зарегистрируйтесь.</p>
    </div>
  );
}