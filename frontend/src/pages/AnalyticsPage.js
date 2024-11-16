import React from 'react';

const AnalyticsPage = () => {
  const stats = {
    totalAppointments: 50,
    completedAppointments: 45,
    missedAppointments: 5,
    date: '2024-11-16',
  };

  return (
    <div>
      <h2>Daily Analytics - {stats.date}</h2>
      <p>Total Appointments: {stats.totalAppointments}</p>
      <p>Completed: {stats.completedAppointments}</p>
      <p>Missed: {stats.missedAppointments}</p>
    </div>
  );
};

export default AnalyticsPage;
