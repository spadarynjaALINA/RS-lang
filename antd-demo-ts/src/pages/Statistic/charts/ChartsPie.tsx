import { Chart as ChartJS, registerables } from 'chart.js';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerables);

export function ChartsPie() {
  const [charData, setCharData] = useState({ labels: ['изучено', ' осталось' ],
    datasets: [
      {
        
        data: [4, 5],
        backgroundColor:['rgba(0, 0, 0, 0.8)', 'rgba(23, 122, 57, 0.8)'],
      }], 
  });
 
  useEffect(() => {
    setCharData({
      labels: ['изучено слов', ' осталось изучить'],
      datasets: [
        {          
          data: [1, 99],
          backgroundColor:['rgba(0, 0, 0, 0.8)'],
         
        },
      ],
   
    });
  });
  return (
    <div className='allwords-circle'>
      <Doughnut data={charData} />
    </div>
  );
}