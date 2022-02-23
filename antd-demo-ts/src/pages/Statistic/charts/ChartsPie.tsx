import { Chart as ChartJS, registerables } from 'chart.js';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';
import { getFullUserWords, getLearnedWord, getStatistics, updateStatistics } from 'src/services/APIService';
ChartJS.register(...registerables);

export function ChartsPie() {
  
  const [easy, setEasy] = useState(0);
  if (localStorage.getItem('userId')) {
    useEffect(() => {
      const fn = async () => {
        const r = await getFullUserWords(localStorage.getItem('userId')).then((data)=>setEasy(data.length));
        
        
      };
      fn();
      
    }, []);
  }
  
  
 
  const [charData, setCharData] = useState({ labels: ['изучено', ' осталось' ],
    datasets: [
      {
        
        data: [0, 3600 - easy],
        backgroundColor: ['rgba(24, 49, 116, 0.8)', 'rgba(211, 225,119, 0,3)'],
        borderWidth:0,
      }], 
  });
  const percent = (easy / 3600).toFixed(3);
  useEffect(() => {
   
    setCharData({
      labels: ['изучено слов', ' осталось изучить'],
      datasets: [
        {          
          data: [easy, 3600 - easy ],
          backgroundColor:['rgba(37, 144, 97, 0.8)', 'rgba(241, 49, 116, 0.9)' ],
          borderWidth:0,
        },
      ],
   
    });
  }, [easy]);
  return (
    <div className='allwords-circle'>
      <span className='inner-data'>{ `${percent}%`}</span>
      <Doughnut data={charData} />
    </div>
  );
}

