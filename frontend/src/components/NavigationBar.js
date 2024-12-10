import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Assuming you have an isAuthenticated function
import { logoutAdmin } from '../api/api'; // API call for logout
import baridi from '../styles/baridi.png';
import '../styles/NavigationBar.css';

// Get user role from localStorage
const getUserRole = () => {
  return localStorage.getItem('userRole');   // Update to fetch from your DB after user login
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const role = getUserRole();

  const handleLogout = () => {
    logoutAdmin();  // Call the logout API
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');  // Redirect to the login page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);  // Toggle sidebar open/close state
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
                <Link to="/tickets">
                  <i className="fas fa-home"></i> Tickets
                </Link>
              </li>
              {role === 'admin' && (
                <>
                  <li>
                    <Link to="/statistiques">
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
