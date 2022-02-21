import './Statistic.css';

interface IStatistic {
  newWords?: number
  percentWords?: number
  lernedWords?:number
}
export function Statistic({ newWords = 0, percentWords = 0, lernedWords = 0 } :IStatistic) {

  return (
    <div className='statistic-wrap'>
      <h2 className='statistic-title-h2'>Статистика</h2>
      <div className='today-wrap'>
        <h3 className='statistic-title'>Сегодня</h3>
        <div className='today-statistic-wrap'>
          <div className='today-word'>
            <h4 className='statistic-subtitle'>Всего</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Изученных:{lernedWords}</p>
       
          </div>
          <div className='today-sprint'>
            <h4 className='statistic-subtitle'>Спринт</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных::{lernedWords}</p>
          </div>
          <div className='today-audiocall'>
            <h4 className='statistic-subtitle'>Аудиовызов</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных:{lernedWords}</p>
          </div>
        </div>
      </div>
      <div className='alltime-wrap'>
        <h3 className='statistic-title'>Все время</h3>
        <div className='alltime-statistic-wrap'>
          <div className='alltime-word'><h4 className='statistic-subtitle'>Всего</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Изученных:{lernedWords}</p></div>
          <div className='alltime-sprint'><h4 className='statistic-subtitle'>Спринт</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных:{lernedWords}</p></div>
          <div className='alltime-audiocall'><h4 className='statistic-subtitle'>Аудиовызов</h4>
            <p className='statistic-description'>Новых слов:{newWords}</p>
            <p className='statistic-description'>Процент правильных:{percentWords}</p>
            <p className='statistic-description'>Максимальная серия правильных:{lernedWords}</p></div>
        </div></div>
   
    </div>
  );
}