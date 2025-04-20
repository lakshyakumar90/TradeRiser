import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import { useColorScheme } from '../../context/ColorSchemeContext';
import NotificationPopup from '../ui/NotificationPopup';

const Header = ({ toggleMobileMenu }) => {
  const { isDarkMode, toggleTheme, themeColors, getSchemeClasses } = useTheme();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];
  const schemeClasses = getSchemeClasses(colorScheme);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(prev => !prev);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <header className={`fixed top-0 right-0 z-30 w-full md:w-[calc(100%-16rem)] transition-all duration-300 enhanced-glass ${isDarkMode ? themeColors.text.primary : 'text-gray-800'}`}>
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        {/* Left side - Mobile menu button and page title */}
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            onClick={toggleMobileMenu}
          >
            <i className='bx bx-menu text-2xl'></i>
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileSearch}
            className={`p-2 rounded-lg md:hidden ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <i className={`bx bx-search text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`}></i>
          </motion.button>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className={`bx bx-search ${isDarkMode ? 'text-white' : 'text-gray-700'}`}></i>
            </div>
            <input
              type="text"
              className={`block w-48 lg:w-64 p-2 pl-10 text-sm rounded-lg enhanced-input ${
                isDarkMode
                  ? `bg-gray-800 border-gray-700 placeholder-gray-400 text-white focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`
                  : `bg-gray-50 border border-gray-300 text-gray-900 focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`
              }`}
              placeholder="Search stocks, ETFs..."
            />
          </div>

          {/* Mobile Search Overlay */}
          {isMobileSearchOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black bg-opacity-50 md:hidden">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="relative p-2">
                  <input
                    type="text"
                    className={`w-full p-2 pl-10 pr-10 text-sm rounded-lg enhanced-input ${
                      isDarkMode
                        ? `bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`
                        : `bg-gray-50 border border-gray-300 text-gray-900 focus:ring-${currentScheme.primary}-500 focus:border-${currentScheme.primary}-500`
                    }`}
                    placeholder="Search stocks, ETFs..."
                    autoFocus
                  />
                  <div className="absolute inset-y-0 left-0 flex  items-center pl-4 pointer-events-none">
                    <i className={`bx bx-search ${isDarkMode ? 'text-white' : 'text-gray-700'}`}></i>
                  </div>
                  <button
                    onClick={toggleMobileSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    <i className={`bx bx-x text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg enhanced-button ${
              isDarkMode
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'} text-xl`}></i>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotifications}
            className={`p-2 rounded-lg relative ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className='bx bx-bell text-xl'></i>
            {unreadCount > 0 && (
              <span className={`absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-xs text-white ${schemeClasses.primary} rounded-full enhanced-pulse`}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </motion.button>

          {/* Notification Popup */}
          <NotificationPopup
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            notifications={notifications}
            title={`Notifications (${unreadCount})`}
            onMarkAllAsRead={handleMarkAllAsRead}
          />

          {/* User menu */}
          <Link to="/profile">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User profile"
                className="w-8 h-8 rounded-full"
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
