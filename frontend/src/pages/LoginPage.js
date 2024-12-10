import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import imagesystem from '../styles/system.jpg';
import buses from '../styles/Bus.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const mockUser = {
      username: 'admin', 
      password: '1234', 
      role: false, 
      authToken: 'fakeAuthToken1234', 
    };

    if (username === mockUser.username && password === mockUser.password) {
      localStorage.setItem('authToken', mockUser.authToken);  // Store auth token
      localStorage.setItem('userRole', mockUser.role);  // Store user role
      navigate('/settings');  // Redirect to settings page
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <div className="logo-placeholder">
              <img src={buses} alt="buses logo" />
            </div>
            <h1>WELCOME BACK</h1>
            <form onSubmit={handleLogin}>
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                id="username"
                placeholder="A2659B2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Code*</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Loading...' : 'Connecter'}
              </button>
            </form>
          </div>

          <div className="login-right">
            <div className="illustration">
              <img src={imagesystem} alt="Ticket System Illustration" />
            </div>
            <h2>Buses system</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
