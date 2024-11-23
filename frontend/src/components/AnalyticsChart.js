import React from 'react';
import { Bar } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const data = {
    labels: ['8-9 AM', '9-10 AM', '10-11 AM'],
    datasets: [
      {
        label: 'Activity Level',
        data: [30, 50, 70],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default AnalyticsChart;
