import { ChartData, ScatterDataPoint } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getStatistics } from 'src/services/APIService';
ChartJS.register(...registerables);
export function ChartsAllDay() {
  const [dataArr, setDataArr] = useState([] as string[]);
  const [wordsArr, setWordsArr] = useState([] as number[]);
  useEffect(() => {
    const fn = async () => {
      const a = [] as string[];const b = [] as number[];
      await getStatistics(localStorage.getItem('userId')).then(res => {
        res.forEach((item:any )=> {
          a.push(item.date);
          b.push(item.easy ? item.easy : 0);
          setDataArr(a);
          setWordsArr(b);         
        }); 
      
      });     
    };
    fn();
  }, []);
  
  
  return (
    <div className='alltime-progress'>
      <Line data={{ labels: dataArr,
        datasets: [{
          label: 'Количество изученных слов',
          data: wordsArr,
          backgroundColor:'rgba(127,49,231, 0.7)',
        }] }} />
    </div>
  );
}