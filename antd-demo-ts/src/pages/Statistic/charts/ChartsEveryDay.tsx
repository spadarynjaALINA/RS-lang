import { Chart as ChartJS, registerables } from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';
import { getStatistics } from 'src/services/APIService';
ChartJS.register(...registerables);

export function ChartsEveryDay() {
  const [dataArr, setDataArr] = useState([] as string[]);
  const [wordsArr, setWordsArr] = useState([] as number[]);
  useEffect(() => {
    const fn = async () => {
      const a = [] as string[];const b = [] as number[];
      await getStatistics(localStorage.getItem('userId')).then(res => {
        res.reverse().forEach((item:any )=> {
          a.push(item.date);
          b.push(item.newWords);
          setDataArr(a);
          setWordsArr(b);         
        });      
      });     
    };
    fn();
  }, []);
 
 
  return (
    <div className='alltime-words'>
      <Bar data={{
        labels:  dataArr,
        datasets: [
          {     
            label:'Новых слов в день',
            data: wordsArr,
         
          },
        ],
   
      }} />
    </div>
  );
}