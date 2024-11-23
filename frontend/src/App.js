import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Tickets from './pages/Tickets';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/Tickets" element={<Tickets />} />
              </Routes>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
         
            <DashboardPage />
         
      }
     />

      </Routes>
    </Router>
  );
};

export default App;
