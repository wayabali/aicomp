import React, { useState } from 'react'; // Import React and useState hook
import { Link, useNavigate } from 'react-router-dom'; // Import navigation hooks
import { isAuthenticated } from '../utils/auth'; // Assuming you have an isAuthenticated function
import { logoutAdmin } from '../api/api'; // API call for logout
import baridi from '../styles/baridi.png'; // Logo image
import '../styles/NavigationBar.css'; // CSS for navigation bar

// Get user role from localStorage
const getUserRole = () => {
  return localStorage.getItem('userRole'); // Update to fetch from your DB after user login
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const role = getUserRole(); // Get the user role

  const handleLogout = () => {
    logoutAdmin(); // Call the logout API
    localStorage.removeItem('authToken'); // Remove auth token from localStorage
    localStorage.removeItem('userRole'); // Remove user role from localStorage
    navigate('/'); // Redirect to the login page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
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
                <Link to="/reports">
                  <i className="fas fa-file-alt"></i> Reports
                </Link>
              </li>
              <li>
                <Link to="/stations">
                  <i className="fas fa-bus"></i> Stations
                </Link>
              </li>
              {role === 'admin' && (
                <>
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