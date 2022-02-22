import { useEffect, useState } from 'react';
import { getFullUserWords } from 'src/services/APIService';
import { ChartsAllDay } from './charts/ChartsAllDays';
import { ChartsEveryDay } from './charts/ChartsEveryDay';
import { ChartsPie } from './charts/ChartsPie';
import './Statistic.css';

interface IStatistic {
  newWords?: number
  percentWords?: number
  lernedWords?: number
  allwordsPercent?:number
}
export function Statistic({ newWords = 0, percentWords = 0, lernedWords = 0, allwordsPercent }: IStatistic) {
  const day = new Date;
  const month = day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
  const data = `${day.getDate()}.${month}`;
  
  return (
    <div className='statistic-wrap'>
      <h2 className='statistic-title-h2'>Статистика</h2>
      <div className='today-wrap'>
        <h3 className='statistic-title'>Сегодня</h3>
        <div className='today-statistic-wrap'>
          <div className='today-word'>
            <h4 className='statistic-subtitle'>Всего</h4>
            <p className='statistic-description'>Новых слов:{data}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Изученных:{lernedWords}</p>
       
          </div>
          <div className='today-sprint'>
            <h4 className='statistic-subtitle'>Спринт</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных:{lernedWords}</p>
          </div>
          <div className='today-audiocall'>
            <h4 className='statistic-subtitle'>Аудиовызов</h4>
            <p className='statistic-description'>Новых слов:{ Date.now()}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных:{lernedWords}</p>
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

