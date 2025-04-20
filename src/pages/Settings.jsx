import React from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import ColorSchemeSelector from '../components/ui/ColorSchemeSelector';
import { useTheme } from '../context/ThemeContext';
import { useColorScheme } from '../context/ColorSchemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        Settings
      </motion.h1>

      {/* Appearance */}
      <Card
        title="Appearance"
        padding="p-5"
        delay={1}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Theme</h3>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={!isDarkMode ? undefined : toggleTheme}
                className={`w-40 h-24 rounded-lg border-2 cursor-pointer overflow-hidden ${
                  !isDarkMode
                    ? 'border-blue-500'
                    : isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="h-full bg-white">
                  <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="p-2">
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                  </div>
                </div>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isDarkMode ? undefined : toggleTheme}
                className={`w-40 h-24 rounded-lg border-2 cursor-pointer overflow-hidden ${
                  isDarkMode
                    ? 'border-blue-500'
                    : isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="h-full bg-gray-900">
                  <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-2">
                    <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  </div>
                  <div className="p-2">
                    <div className="h-2 w-3/4 bg-gray-700 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-gray-700 rounded mb-1"></div>
                    <div className="h-2 w-5/6 bg-gray-700 rounded"></div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

          <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className="text-lg font-medium mb-2">Color Scheme</h3>
            <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Customize the appearance of the application by selecting a color scheme.
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-3`}>
              <ColorSchemeSelector />
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Current color scheme: <span className="font-medium capitalize">{colorScheme}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Account */}
      <Card
        title="Account"
        padding="p-5"
        delay={2}
      >
        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium text-lg">Alex Johnson</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>alex.johnson@example.com</p>
              <div className="mt-2">
                <button className={`px-3 py-1 text-sm rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  First Name
                </label>
                <input
                  type="text"
                  value="Alex"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last Name
                </label>
                <input
                  type="text"
                  value="Johnson"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value="alex.johnson@example.com"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Phone
                </label>
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card
        title="Notifications"
        padding="p-5"
        delay={3}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive email updates about your account activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive push notifications on your mobile device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Price Alerts</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notified when stocks in your watchlist change significantly</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Market News</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive updates about important market events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card
        title="Security"
        padding="p-5"
        delay={4}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
