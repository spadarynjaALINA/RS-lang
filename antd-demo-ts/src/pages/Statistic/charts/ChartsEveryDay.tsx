import { Chart as ChartJS, registerables } from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerables);

export function ChartsEveryDay() {
  const [charData, setCharData] = useState({ labels: ['a', 'b', ' c', 'd'],
    datasets: [
      {
        
        data: [4, 5, 7, 8],
       
      }], 
  });
 
  useEffect(() => {
    setCharData({
      labels: ['a', ' b', ' c', 'd'],
      datasets: [
        {          
          data: [4, 5, 7, 8],
         
        },
      ],
   
    });
  }, []);
  return (
    <div className='alltime-words'>
      <Bar data={charData} />
    </div>
  );
}