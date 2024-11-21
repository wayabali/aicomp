import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { logoutAdmin } from '../api/api';
import baridi from '../styles/baridi.png'
import '../styles/NavigationBar.css';

const getUserRole = () => {
  return localStorage.getItem('userRole');   // Fares badlha alahsab databse manba3d
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const role = getUserRole();

  const handleLogout = () => {
    logoutAdmin();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="sidebar-content">
     
        <div className="logo-section">
          <img
            src={baridi} 
            alt="Algerie Poste Logo"
            className="sidebar-logo"
          />
        </div>

        
        <ul className="sidebar-links">
          {isAuthenticated() && (
            <>
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> Tickets
                </Link>
              </li>
              {role === 'admin' && (
                <>
                  <li>
                    <Link to="/analytics">
                      <i className="fas fa-chart-bar"></i> Statistiques
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <i className="fas fa-cogs"></i> Settings
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
