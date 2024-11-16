

import React from 'react';

const CustomerCard = ({ customer }) => {
  return (
    <div className="customer-card">
      <h3>{customer.name}</h3>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Appointment Time: {customer.appointmentTime}</p>
    </div>
  );
};

export default CustomerCard;
