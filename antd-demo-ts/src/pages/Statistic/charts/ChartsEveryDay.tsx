import { Chart as ChartJS, registerables } from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';
import { getStatistics } from 'src/services/APIService';
ChartJS.register(...registerables);

export function ChartsEveryDay() {
  const [dataArr, setDataArr] = useState([] as string[]);
  const [wordsArr, setWordsArr] = useState([] as number[]);
  const [bgc, setBgc] = useState([] as string[]);
  const getRandomInt = ()=> {
    Math.floor(Math.random() * Math.floor(255));
    const red =  Math.floor(Math.random() * Math.floor(255));
    const green =  Math.floor(Math.random() * Math.floor(255));
    const blue =  Math.floor(Math.random() * Math.floor(255));
    const background = `rgba(${red}, ${green} ,${blue},0.5)`;
    return background;
  };



 
  useEffect(() => {
    const fn = async () => {
      const a = [] as string[];const b = [] as number[]; let c = [] as string[];
      await getStatistics(localStorage.getItem('userId')).then(res => {
        res.forEach((item:any )=> {
          a.push(item.date);
          b.push(item.newWords);
         
          setDataArr(a);
          setWordsArr(b);         
        });
        c = a.map(() => getRandomInt());
        setBgc(c);
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
            backgroundColor:bgc,
          },
        ],
   
      }}  />
    </div>
  );
}