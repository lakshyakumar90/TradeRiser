import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { useColorScheme } from '../context/ColorSchemeContext';

const Notifications = () => {
  const { isDarkMode } = useTheme();
  const { notifications, markAsRead, markAllAsRead, clearAllNotifications } = useNotifications();
  const { colorScheme, colorSchemes } = useColorScheme();
  const currentScheme = colorSchemes[colorScheme];

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = notification.date || 'Today';
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  // Sort dates with Today and Yesterday first, then other dates
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Notifications
        </motion.h1>

        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={markAllAsRead}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors text-sm`}
            disabled={!notifications.some(n => !n.read)}
          >
            Mark All as Read
          </button>
          <button
            onClick={clearAllNotifications}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors text-sm`}
            disabled={notifications.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card padding="p-5" delay={1}>
          <div className="text-center py-10">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${isDarkMode ? `bg-${currentScheme.primary}-900/30` : `bg-${currentScheme.primary}-100`}`}>
                <i className={`bx bx-bell-off text-4xl ${currentScheme.textClass}`}></i>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">No Notifications</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md mx-auto`}>
              You don't have any notifications at the moment. When you receive notifications, they will appear here.
            </p>
          </div>
        </Card>
      ) : (
        sortedDates.map((date, dateIndex) => (
          <Card 
            key={date} 
            title={date} 
            padding="p-0" 
            delay={dateIndex + 1}
          >
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {groupedNotifications[date].map((notification, index) => {
                const iconMap = {
                  success: "bx-check-circle",
                  warning: "bx-error",
                  error: "bx-x-circle",
                  info: "bx-info-circle",
                };
                
                const iconName = notification.iconName || iconMap[notification.type] || "bx-bell";
                
                return (
                  <div 
                    key={notification.id || index}
                    className={`p-4 ${
                      notification.read 
                        ? isDarkMode ? 'bg-gray-900' : 'bg-white' 
                        : isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    } transition-colors relative`}
                  >
                    <div className="flex">
                      {/* Icon */}
                      <div className={`mr-3 p-2 rounded-full flex items-center justify-center w-10 h-10 ${
                        notification.type === 'success' ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                        notification.type === 'warning' ? (isDarkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600') :
                        notification.type === 'error' ? (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600') :
                        (isDarkMode ? `bg-${currentScheme.primary}-900/30 text-${currentScheme.primary}-400` : `bg-${currentScheme.primary}-100 text-${currentScheme.primary}-600`)
                      }`}>
                        <i className={`bx ${iconName}`}></i>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center">
                            {notification.time && (
                              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mr-3`}>
                                {notification.time}
                              </span>
                            )}
                            {!notification.read && (
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className={`text-xs ${isDarkMode ? `text-${currentScheme.primary}-400 hover:text-${currentScheme.primary}-300` : `text-${currentScheme.primary}-600 hover:text-${currentScheme.primary}-700`}`}
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                        {notification.message && (
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {notification.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 ${currentScheme.bgClass} rounded-r-md`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))
      )}

      <Card
        title="Notification Settings"
        padding="p-5"
        delay={sortedDates.length + 1}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive notifications via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentScheme.primary}-300 dark:peer-focus:ring-${currentScheme.primary}-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-${currentScheme.primary}-600`}></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentScheme.primary}-300 dark:peer-focus:ring-${currentScheme.primary}-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-${currentScheme.primary}-600`}></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive notifications via SMS
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${currentScheme.primary}-300 dark:peer-focus:ring-${currentScheme.primary}-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-${currentScheme.primary}-600`}></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
