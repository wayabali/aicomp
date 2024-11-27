import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Tickets from './pages/Tickets';
import Analytics from './pages/AnalyticsPage'
import Settings from './pages/Settings'

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
                <Route path="/statistiques" element={<Analytics/>} />
                <Route path="/Settings" element={<Settings/>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

