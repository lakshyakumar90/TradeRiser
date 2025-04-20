import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ColorSchemeProvider } from './context/ColorSchemeContext';
import { MarketDataProvider } from './context/MarketDataContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
// ColorSchemeDemo removed - functionality moved to Settings
import TimeBasedDataDemo from './pages/TimeBasedDataDemo';


const App = () => {
  return (
    <ThemeProvider>
      <ColorSchemeProvider>
        <NotificationProvider>
          <MarketDataProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="market" element={<Market />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="data" element={<TimeBasedDataDemo />} />
                </Route>
              </Routes>
            </Router>
          </MarketDataProvider>
        </NotificationProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  );
};

export default App;