
import React, { useState, useEffect } from 'react';
import CustomerCard from '../components/CostumerCard';
import NextButton from '../components/NextButton';
import Loading from '../components/Loading';
import { fetchCustomers } from '../api/api';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error loading customers:', error));
  }, []);

  const nextCustomer = () => {
    if (currentIndex < customers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CustomerCard customer={customers[currentIndex]} />
      <NextButton onClick={nextCustomer} />
    </div>
  );
};

export default AdminDashboard;
