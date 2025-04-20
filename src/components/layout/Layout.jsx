import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, themeColors } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? themeColors.background.primary : 'bg-gray-50'} ${isDarkMode ? themeColors.text.primary : 'text-gray-900'}`}>
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
      <Header toggleMobileMenu={toggleMobileMenu} />

      <main className="pt-16 md:ml-64 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
