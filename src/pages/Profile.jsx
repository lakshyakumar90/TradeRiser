import React, { useState } from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { useColorScheme } from '../context/ColorSchemeContext';

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { colorScheme } = useColorScheme();
  
  // User profile data - in a real app, this would come from an API or context
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Financial Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    bio: 'Experienced investor with a focus on technology and renewable energy sectors. Looking to diversify my portfolio with new opportunities.',
    joinDate: 'January 2022',
    plan: 'Premium',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactor: true,
      lastLogin: 'Today at 9:30 AM',
      devices: 2
    }
  });
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...profile});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]: checked
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        My Profile
      </motion.h1>
      
      {/* Profile Overview */}
      <Card padding="p-5" delay={1}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-auto flex flex-col items-center">
            <img 
              src={profile.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="mt-4 text-center">
              <button 
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors text-sm`}
              >
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.email}</p>
              </div>
              
              <div className="mt-2 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${colorScheme}-100 text-${colorScheme}-800 dark:bg-${colorScheme}-900/30 dark:text-${colorScheme}-400`}>
                  {profile.plan} Plan
                </span>
              </div>
            </div>
            
            <p className="mb-4">{profile.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Phone:</span> {profile.phone}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Location:</span> {profile.city}, {profile.state}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Member since:</span> {profile.joinDate}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Last login:</span> {profile.security.lastLogin}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">Devices:</span> {profile.security.devices} active devices
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-medium">2FA:</span> {profile.security.twoFactor ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 rounded-lg bg-${colorScheme}-600 text-white hover:bg-${colorScheme}-700 transition-colors`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Edit Profile Form */}
      {isEditing && (
        <Card 
          title="Edit Profile" 
          padding="p-5" 
          delay={2}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  First Name
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Address
                </label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  City
                </label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  State
                </label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Zip Code
                </label>
                <input 
                  type="text" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className={`block mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bio
              </label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              ></textarea>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Notification Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-notifications"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleCheckboxChange}
                    className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  />
                  <label htmlFor="email-notifications" className="ml-2">Email Notifications</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-notifications"
                    name="push"
                    checked={formData.notifications.push}
                    onChange={handleCheckboxChange}
                    className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  />
                  <label htmlFor="push-notifications" className="ml-2">Push Notifications</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sms-notifications"
                    name="sms"
                    checked={formData.notifications.sms}
                    onChange={handleCheckboxChange}
                    className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
                      isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  />
                  <label htmlFor="sms-notifications" className="ml-2">SMS Notifications</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors`}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className={`px-4 py-2 rounded-lg bg-${colorScheme}-600 text-white hover:bg-${colorScheme}-700 transition-colors`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Account Activity */}
      <Card 
        title="Account Activity" 
        padding="p-5" 
        delay={3}
      >
        <div className="space-y-4">
          {[
            { action: 'Login', device: 'Chrome on Windows', location: 'New York, USA', time: 'Today at 9:30 AM' },
            { action: 'Password Changed', device: 'Chrome on Windows', location: 'New York, USA', time: 'Yesterday at 6:45 PM' },
            { action: 'Login', device: 'Safari on iPhone', location: 'New York, USA', time: 'Yesterday at 12:30 PM' },
            { action: 'Profile Updated', device: 'Chrome on Windows', location: 'New York, USA', time: '3 days ago at 2:15 PM' },
            { action: 'Login', device: 'Chrome on Windows', location: 'Boston, USA', time: '5 days ago at 10:20 AM' }
          ].map((activity, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-center`}
            >
              <div className={`p-2 rounded-full mr-3 ${
                activity.action === 'Login' 
                  ? `bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400` 
                  : `bg-${colorScheme}-100 text-${colorScheme}-600 dark:bg-${colorScheme}-900/20 dark:text-${colorScheme}-400`
              }`}>
                <i className={`bx ${
                  activity.action === 'Login' 
                    ? 'bx-log-in' 
                    : activity.action === 'Password Changed' 
                      ? 'bx-lock-alt' 
                      : 'bx-user'
                } text-xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{activity.action}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</span>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activity.device} • {activity.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Subscription */}
      <Card 
        title="Subscription" 
        padding="p-5" 
        delay={4}
      >
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-4`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{profile.plan} Plan</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Billed monthly • Next billing on March 15, 2024
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`}>
              Active
            </span>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Real-time market data</span>
              <i className='bx bx-check text-green-500'></i>
            </div>
            <div className="flex justify-between">
              <span>Portfolio analysis tools</span>
              <i className='bx bx-check text-green-500'></i>
            </div>
            <div className="flex justify-between">
              <span>Advanced charting</span>
              <i className='bx bx-check text-green-500'></i>
            </div>
            <div className="flex justify-between">
              <span>Priority customer support</span>
              <i className='bx bx-check text-green-500'></i>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button className={`px-4 py-2 rounded-lg bg-${colorScheme}-600 text-white hover:bg-${colorScheme}-700 transition-colors`}>
              Upgrade Plan
            </button>
            <button className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
              Billing History
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button className={`text-sm ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}>
            Cancel Subscription
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
