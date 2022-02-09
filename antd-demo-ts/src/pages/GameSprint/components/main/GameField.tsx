import React, {useState, useEffect} from 'react';
// import { clearInterval } from 'timers';
import { Button } from 'antd';
import './game-field.css'
function GameField() {
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }
  
  function reset() {
    setSeconds(30);
    setIsActive(false);
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds <= 0) clearInterval(interval) 
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className='game-field'>
      <div className='game-timer'>
        <i className='fas fa-stopwatch'></i>
        <span>{seconds} s</span>
      </div>
      <div>
        <Button onClick={toggle}>Start</Button>
        <Button onClick={reset}>Stop</Button>
      </div>
      <div className='game-word-translate'>
        <div className='game-word'>Word</div>
        <div className='game-translate'>Перевод</div>
      </div>
      <div className='game-buttons'>
        <Button className='game-left-button'>ВЕРНО</Button>
        <Button className='game-right-button'>НЕВЕРНО</Button>
      </div>
    </div>
  );
}

export default GameField;
