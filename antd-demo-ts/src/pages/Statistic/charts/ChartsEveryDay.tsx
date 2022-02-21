import { ChartData, ScatterDataPoint } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
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
  });
  return (
    <div className='alltime-words'>
      <Line data={charData} />
    </div>
  );
}