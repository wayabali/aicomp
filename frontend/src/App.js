import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Station from './pages/Station';
import Analytics from './pages/AnalyticsPage'

import Report from './pages/Report';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<LoginPage />} />
        
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/Station" element={<Station />} />
                <Route path="/Report" element={<Report />} />
                <Route path="/Statistics" element={<Analytics/>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

