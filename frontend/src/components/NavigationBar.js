import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { isAuthenticated } from '../utils/auth'; 
import { logoutAdmin } from '../api/api'; // API call for logout
import Bus from '../styles/Bus.png';
import '../styles/NavigationBar.css';

const getUserRole = () => {
  return localStorage.getItem('userRole'); 
};

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const role = getUserRole(); 

  const handleLogout = () => {
    logoutAdmin(); 
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('userRole'); 
    navigate('/'); 
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
            src={Bus}
            alt="Bus"
            className="sidebar-logo"
          />
        </div>

        <ul className="sidebar-links">
            <>
              <li>
                <Link to="/Station">
                  <i className="fas fa-home"></i> Station
                </Link>
              </li>
              
                <>
                  <li>
                    <Link to="/Report">
                      <i className="fas fa-cogs"></i> Reports
                    </Link>
                  </li>
                </>
                <>
                  <li>
                    <Link to="/Statistics">
                      <i className="fas fa-cogs"></i> Statistics
                    </Link>
                  </li>
                </>
              
            </>
        
        </ul>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;