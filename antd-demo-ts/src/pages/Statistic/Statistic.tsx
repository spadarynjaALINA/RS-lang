import { useEffect, useState } from 'react';
import { getFullUserWords, getStatistics } from 'src/services/APIService';
import { ChartsAllDay } from './charts/ChartsAllDays';
import { ChartsEveryDay } from './charts/ChartsEveryDay';
import { ChartsPie } from './charts/ChartsPie';
import './Statistic.css';

interface Stat {
  date?: string;
  sprintRight?: number;
  sprintWrong?: number;
  sprintMax: number;
  audioCallRight: number;
  audioCallWrong: number;
  audioCallMax: number;
  newWords: number;
}
interface IGetData {
  id?: string,
  learnedWords?: number,
  optional?: {
    longStat?: {
      stat?:Stat
    }
  }
}
export function Statistic() {
  const [maxSprint, setMaxSprint] = useState(0);
  const [SprintWron, setSprintWron] = useState(0); 
  const [SprintRight, setSprintRight] = useState(0);
  const [maxAudioCall, setmaxAudioCall] = useState(0);
  const [AudioCallWron, setAudioCallWron] = useState(0); 
  const [audioCallRight, setAudioCallRight] = useState(0);
  const [easy, setEasy] = useState(0);
  const day = new Date;
  const month = day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
  const data = `${day.getDate()}.${month}`;
  useEffect(() => {
    const fn = async () => {
      await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setMaxSprint(arr[arr.length - 1].sprintMax);
       
      });
      await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setmaxAudioCall(arr[arr.length - 1].audioCallMax);
       
      });
      await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setAudioCallWron(arr[arr.length - 1].audioCallWrong);
       
      }); await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setAudioCallRight(arr[arr.length - 1].audioCallRight);
       
      }); await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setSprintWron(arr[arr.length - 1].sprintWrong);
       
      }); await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setSprintRight(arr[arr.length - 1].sprintRight);
      
      });
     
      await getStatistics(localStorage.getItem('userId')).then((arr: any) => {
        setSprintRight(arr[arr.length - 1].newWords);
      });
      
      await getFullUserWords(localStorage.getItem('userId')).then((d)=>setEasy(d.length));
    };
    fn();
  }, []);
  
       
  return (
    <div className='statistic-wrap'>
      <h2 className='statistic-title-h2'>Статистика</h2>
      <div className='today-wrap'>
        <h3 className='statistic-title'>Сегодня</h3>
        <div className='today-statistic-wrap'>
          <div className='today-word'>
            <h4 className='statistic-subtitle'>Всего</h4>
            <p className='statistic-description'>Новых слов:{SprintRight + SprintWron + audioCallRight + AudioCallWron}</p>
            <p className='statistic-description'>Процент правильных:{`${(SprintRight + SprintWron + audioCallRight + AudioCallWron) === 0 ? 0 : (((SprintRight + audioCallRight) / (SprintRight + SprintWron + audioCallRight + AudioCallWron)) * 100).toFixed(2) }%`}</p>
            <p className='statistic-description'>Изученных:{easy}</p>
       
          </div>
          <div className='today-sprint'>
            <h4 className='statistic-subtitle'>Спринт</h4>
            <p className='statistic-description'>Новых слов:{SprintRight + SprintWron}</p>
            <p className='statistic-description'>Процент правильных:{`${((SprintRight + SprintWron) === 0 ? 0 : SprintRight / (SprintRight + SprintWron) * 100).toFixed(2)}%`}</p>
            <p  className='statistic-description'>Максимальная серия правильных:{ maxSprint}</p>
          </div>
          <div className='today-audiocall'>
            <h4 className='statistic-subtitle'>Аудиовызов</h4>
            <p className='statistic-description'>Новых слов:{ audioCallRight + AudioCallWron}</p>
            <p className='statistic-description'>Процент правильных:{`${((audioCallRight + AudioCallWron) === 0 ? 0 : audioCallRight / (audioCallRight + AudioCallWron) * 100).toFixed(2)}%`}</p>
            <p className='statistic-description'>Максимальная серия правильных:{maxAudioCall}</p>
          </div>
        </div>
      </div>
      <div className='alltime-wrap'>
        <h3 className='statistic-title'>Все время</h3>
        <div className='alltime-statistic-wrap'>
          <ChartsEveryDay/>
          <ChartsAllDay/>
          <ChartsPie/>
        </div>
      </div>
    </div>
  );
}