import React, { useState } from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

const NotificationsDemo = () => {
  const { isDarkMode } = useTheme();
  const { addNotification, clearAllNotifications } = useNotifications();

  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');

  const handleAddNotification = () => {
    if (!notificationTitle) return;

    const iconMap = {
      success: "bx-check-circle",
      warning: "bx-error",
      error: "bx-x-circle",
      info: "bx-info-circle",
    };

    addNotification({
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      iconName: iconMap[notificationType],
    });

    // Reset form
    setNotificationTitle('');
    setNotificationMessage('');
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        Notifications Demo
      </motion.h1>

      <Card
        title="Create Notification"
        padding="p-5"
        delay={1}
      >
        <div className="space-y-4">
          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Title
            </label>
            <input
              type="text"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="Notification title"
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Message
            </label>
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Notification message (optional)"
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Type
            </label>
            <select
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={clearAllNotifications}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}
            >
              Clear All Notifications
            </button>
            <button
              onClick={handleAddNotification}
              disabled={!notificationTitle}
              className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                !notificationTitle ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Add Notification
            </button>
          </div>
        </div>
      </Card>

      <Card
        title="Instructions"
        padding="p-5"
        delay={2}
      >
        <div className="space-y-4">
          <p>This demo page allows you to create custom notifications that will appear in the notification popup.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Fill in the notification title (required)</li>
            <li>Add an optional message</li>
            <li>Select the notification type</li>
            <li>Click "Add Notification" to create a new notification</li>
            <li>Click the bell icon in the header to see your notifications</li>
          </ol>
          <p>You can also clear all notifications using the "Clear All Notifications" button.</p>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsDemo;
