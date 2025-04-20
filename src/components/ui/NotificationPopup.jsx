import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useColorScheme } from '../../context/ColorSchemeContext';

const NotificationPopup = ({
  isOpen,
  onClose,
  notifications = [],
  title = "Notifications",
  onMarkAllAsRead
}) => {
  const { isDarkMode } = useTheme();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-16 right-4 z-50 w-80 rounded-xl shadow-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-900 text-white border border-gray-800' : 'bg-white text-gray-800 border border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <h3 className="font-medium">{title}</h3>
              <button
                onClick={onClose}
                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <i className='bx bx-x text-xl'></i>
              </button>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center">
                  <i className='bx bx-bell-off text-3xl opacity-50 mb-2'></i>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id || index}
                      className={`p-4 border-b last:border-b-0 ${isDarkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                    >
                      <div className="flex">
                        {/* Icon */}
                        {notification.iconName && (
                          <div className={`mr-3 p-2 rounded-full flex items-center justify-center w-10 h-10 ${
                            notification.type === 'success' ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                            notification.type === 'warning' ? (isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600') :
                            notification.type === 'error' ? (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600') :
                            (isDarkMode ? `bg-${currentScheme.primary}-900/30 text-${currentScheme.primary}-400` : `bg-${currentScheme.primary}-100 text-${currentScheme.primary}-600`)
                          }`}>
                            <i className={`bx ${notification.iconName}`}></i>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {notification.message && (
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.message}
                            </p>
                          )}
                          {notification.time && (
                            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {notification.time}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className={`p-3 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} text-center`}>
                <button
                  className={`text-sm ${isDarkMode ? `text-${currentScheme.primary}-400 hover:text-${currentScheme.primary}-300` : `text-${currentScheme.primary}-600 hover:text-${currentScheme.primary}-700`}`}
                  onClick={onMarkAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
