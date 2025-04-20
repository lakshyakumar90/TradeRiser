import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ title, value, change, changePercentage, icon, color = 'blue', index = 0 }) => {
  const { isDarkMode } = useTheme();
  const isPositive = change >= 0;
  
  const getColorClass = () => {
    switch(color) {
      case 'blue': return isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600';
      case 'green': return isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600';
      case 'purple': return isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-600';
      case 'orange': return isDarkMode ? 'bg-orange-900/20 text-orange-400' : 'bg-orange-100 text-orange-600';
      case 'red': return isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600';
      default: return isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`rounded-xl shadow-sm p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {(change !== undefined && changePercentage !== undefined) && (
            <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span>
                {isPositive ? '+' : ''}{change}
                {' '}
                ({isPositive ? '+' : ''}{changePercentage}%)
              </span>
              <i className={`bx ${isPositive ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} ml-1`}></i>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-full ${getColorClass()}`}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
