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
export function ChartsAllDay() {
  const [charData, setCharData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{                 
      data: [1, 2, 3, 4, 5, 6, 7],          
    }],   
  });
  
  useEffect(() => {
   
    setCharData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{                 
        data: [1, 2, 3, 4, 5, 6, 7],          
      }],   
    });
  
  
    
   
  }, []);
  console.log(charData);
  return (
    <div className='alltime-progress'>
      <Line data={charData} />
    </div>
  );
}