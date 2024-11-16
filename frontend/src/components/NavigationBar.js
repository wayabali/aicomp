// src/components/NavigationBar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { logoutAdmin } from '../api/api';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {isAuthenticated() && (
          <>
            <li><Link to="/">Appointments</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
